/**
 * BrandAssets.tsx — placeholder blocks for finished brand assets.
 *
 * Clean image treatment with attribution fields, ready to receive real imagery
 * and creator credits. Holds the layout so the case reads complete; the captions
 * are explicit placeholders, never mistaken for finished credits. Clean-room
 * note: these frames are for the author's own or licensed imagery, never a
 * reproduction of an institution's actual marks.
 */

import { caseAccent } from "../tokens/color";
import { surface } from "../tokens/layout";

export default function BrandAssets({ credit }: { credit: string }) {
  return (
    <div style={{ marginTop: "var(--gutter)" }}>
      <p className="eyebrow" style={{ color: caseAccent, marginBottom: "0.7rem" }}>
        Finished Brand Assets
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "0.9rem",
        }}
      >
        {[0, 1].map((i) => (
          <figure key={i} style={{ display: "grid", gap: "0.5rem", margin: 0 }}>
            <div
              style={{
                aspectRatio: "4 / 3",
                background: "var(--paper-2)",
                borderRadius: surface.cardRadius,
                display: "grid",
                placeItems: "center",
              }}
            >
              <span
                className="mono"
                style={{ fontSize: "var(--step--1)", color: "var(--soft)" }}
              >
                Asset placeholder
              </span>
            </div>
            <figcaption
              className="mono"
              style={{ fontSize: "var(--step--1)", color: "var(--fog)" }}
            >
              [caption] · Credit: {credit} [+ creator]
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
