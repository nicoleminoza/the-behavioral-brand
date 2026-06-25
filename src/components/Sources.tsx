/**
 * Sources.tsx — the discrete "Sources & References" mechanism each benchmark
 * carries. A quiet metadata block, not body copy.
 *
 * A case may carry either a prose credit (a sentence with inline links, via
 * `credits`) or a plain list of references (via `sources`). The prose form wins
 * when both exist.
 */

import { credits, sources } from "../data/cases";
import { caseAccent } from "../tokens/color";

export default function Sources({ id }: { id: string }) {
  const credit = credits[id];
  const list = sources[id] ?? [];
  if (!credit && !list.length) return null;

  return (
    <div style={{ marginTop: "1.25rem" }}>
      <p className="eyebrow" style={{ color: caseAccent, marginBottom: "0.5rem" }}>
        Further Exploration
      </p>

      {credit ? (
        <p
          className="mono"
          style={{ fontSize: "var(--step--1)", color: "var(--fog)", lineHeight: 1.6 }}
        >
          {credit.map((seg, i) =>
            seg.url ? (
              <a
                key={i}
                className="source-link"
                href={seg.url}
                target="_blank"
                rel="noreferrer"
              >
                {seg.text}
              </a>
            ) : (
              <span key={i}>{seg.text}</span>
            )
          )}
        </p>
      ) : (
        <ul style={{ listStyle: "none", display: "grid", gap: "0.3rem" }}>
          {list.map((s, i) => (
            <li
              key={i}
              className="mono"
              style={{ fontSize: "var(--step--1)", color: "var(--fog)" }}
            >
              {s.url ? (
                <a
                  className="source-link"
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              ) : (
                <span>{s.label}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
