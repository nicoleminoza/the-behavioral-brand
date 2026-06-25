import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // Relative base so the build works under any sub-directory
  // (e.g. nicoleminoza.com/the-behavioral-brand). Safe here: single-page, no routing.
  base: "./",
  // Build into docs/ so GitHub Pages can serve it via "Deploy from a branch".
  build: { outDir: "docs" },
  plugins: [react()],
});
