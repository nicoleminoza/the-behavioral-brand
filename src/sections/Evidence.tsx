/**
 * Evidence.tsx — Act 02 of the argument. The nine benchmarks.
 *
 * Lead with the three heroes (one per mechanic) at full narrative depth, then the
 * six supporting cases as an Interactive Executive Summary Grid: understated cards
 * that open on demand. Knowing what to put forward at full volume and what to hold
 * in reserve is itself the argument. Catalyst rides along as a label on each card.
 */

import SectionHeader from "../components/SectionHeader";
import { HeroCase } from "../components/CaseStudyBlock";
import CaseGrid from "../components/CaseGrid";
import OperatorCase from "../components/OperatorCase";
import { heroes, supporting } from "../data/cases";
import { caseAccent, evidence } from "../tokens/color";
import { measure } from "../tokens/layout";

export default function Evidence() {
  return (
    <section style={{ background: evidence.bg, color: evidence.fg }}>
      <div style={{ padding: "var(--gutter)", paddingTop: "calc(var(--gutter) * 2)" }}>
        <SectionHeader
          index={2}
          kicker="The Evidence"
          claim="Each treated a moment of change as the occasion to perform what it does."
        />
        <p style={{ marginTop: "1.5rem", color: "var(--fog)", maxWidth: measure.prose }}>
          None of them built a new logo. Each built a behavioral system. Read by
          catalyst, the trigger that forced the decision, the pattern is legible:
          the institutions earning attention chose specificity over minimalism, and
          behavior over image.
        </p>
      </div>

      {/* Three heroes, one per mechanic, at full depth. */}
      <div style={{ padding: "0 var(--gutter)" }}>
        <p className="eyebrow" style={{ color: caseAccent }}>
          Three heroes · one per mechanic
        </p>
      </div>
      {heroes.map((c) => (
        <HeroCase key={c.id} c={c} />
      ))}

      {/* The supporting six, as an interactive summary grid. */}
      <div
        style={{
          padding: "calc(var(--gutter) * 1.6) var(--gutter) var(--gutter)",
        }}
      >
        <p className="eyebrow" style={{ color: caseAccent }}>
          The supporting six · read on demand
        </p>
        <p style={{ color: "var(--fog)", maxWidth: measure.prose, marginTop: "0.5rem" }}>
          Six more, each labeled by catalyst. Open any card for the full brief, its
          sources, and asset credits.
        </p>
      </div>
      <CaseGrid items={supporting} />

      {/* Nine observed, one built: the operator proof, the author's own work. */}
      <div style={{ padding: "calc(var(--gutter) * 1.8) var(--gutter) 0" }}>
        <p className="eyebrow" style={{ color: caseAccent }}>
          Nine observed · one built
        </p>
        <p style={{ color: "var(--fog)", maxWidth: measure.prose, marginTop: "0.5rem" }}>
          The nine above are other people’s work, read from the outside. This one I
          ran from the inside, at platform scale.
        </p>
      </div>
      <OperatorCase />
    </section>
  );
}
