// Build-time prerender: render the SPA once in headless Chrome and write the
// fully-rendered HTML back to docs/index.html, so the page's content and meta
// exist in the initial HTML response (crawlers, link unfurlers, no-JS readers).
// The bundle <script> is preserved, so JS still takes over for interactivity.
// Degrades gracefully (ships the CSR build) if Chrome is unavailable.
import { spawn, spawnSync } from "node:child_process";
import { writeFileSync, existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const here = dirname(fileURLToPath(import.meta.url));
const docs = join(here, "..", "docs");
const indexPath = join(docs, "index.html");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 4317;
const profile = "/tmp/tbb-prerender-profile";

if (!existsSync(CHROME)) {
  console.warn("[prerender] Chrome not found — shipping the client-rendered build unchanged.");
  process.exit(0);
}

const server = spawn("python3", ["-m", "http.server", String(PORT), "--directory", docs], {
  stdio: "ignore",
});

try {
  await sleep(900);
  rmSync(profile, { recursive: true, force: true });
  const res = spawnSync(
    CHROME,
    [
      "--headless=old",
      "--disable-gpu",
      "--no-sandbox",
      "--virtual-time-budget=9000",
      `--user-data-dir=${profile}`,
      "--dump-dom",
      `http://localhost:${PORT}/index.html`,
    ],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: 25000, killSignal: "SIGKILL" }
  );
  // Chrome --dump-dom prints the rendered DOM but does not always self-exit; the
  // timeout above caps it. stdout still holds the captured DOM when that fires.
  const html = res.stdout || "";
  if (html.includes('<div id="root"></div>') || !html.includes("Norton Museum")) {
    console.error("[prerender] #root did not render expected body content — leaving CSR build in place.");
    process.exit(1);
  }
  const out = html.startsWith("<!DOCTYPE") || html.startsWith("<!doctype")
    ? html
    : "<!doctype html>\n" + html;
  writeFileSync(indexPath, out);
  console.log(`[prerender] wrote docs/index.html (${out.length} bytes, content + meta inlined).`);
} finally {
  server.kill();
  rmSync(profile, { recursive: true, force: true });
}
