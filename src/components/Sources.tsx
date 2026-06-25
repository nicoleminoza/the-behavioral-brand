/**
 * Sources.tsx — the discrete "Sources & References" mechanism every case carries.
 *
 * A quiet metadata block, not body copy: a mono label and a list of references.
 * Where a link exists it is set; where it does not, the entry is marked pending so
 * the placeholder is visible and never reads as a finished citation.
 */

import { sources } from "../data/cases";
import { caseAccent } from "../tokens/color";

export default function Sources({ id }: { id: string }) {
  const list = sources[id] ?? [];
  if (!list.length) return null;

  return (
    <div style={{ marginTop: "1.25rem" }}>
      <p className="eyebrow" style={{ color: caseAccent, marginBottom: "0.5rem" }}>
        Sources &amp; References
      </p>
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
    </div>
  );
}
