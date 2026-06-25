/**
 * CaseStudyBlock.tsx — two registers for the nine benchmarks.
 *
 * Editorial judgment is itself a brand-leadership signal, so the nine are tiered,
 * not flattened. Three heroes (one per mechanic) get full depth: a Performing-Type
 * headline and a structured spec register. The other six get a tighter analytical
 * row. Knowing what to emphasize is part of the work the site is arguing for.
 *
 * Color marks structure, never floods content: the mechanic accent tints the rule
 * line, the eyebrow, and the spec register's keys, while the prose stays neutral.
 */

import { motion } from "framer-motion";
import PerformingType from "./PerformingType";
import Sources from "./Sources";
import { caseAccent, evidence } from "../tokens/color";
import { columns, rule } from "../tokens/layout";
import { spring } from "../tokens/motion";
import { mechanicLabels, type CaseStudy } from "../data/cases";

function OutcomeNote({ outcome }: { outcome: NonNullable<CaseStudy["outcome"]> }) {
  return (
    <div style={{ marginTop: "1.5rem", maxWidth: "52ch" }}>
      <p style={{ fontFamily: "var(--display)", fontSize: "var(--step-1)" }}>
        {outcome.stat}
      </p>
      <p
        style={{
          marginTop: "0.5rem",
          fontSize: "var(--step--1)",
          color: "var(--fog)",
          fontStyle: "italic",
        }}
      >
        {outcome.caveat}
      </p>
    </div>
  );
}

/** The hero's spec register: the case as governed data, not decoration. */
function SpecRegister({ c, accent }: { c: CaseStudy; accent: string }) {
  const rows: [string, string][] = [
    ["Partner", c.partner],
    ["Place", c.location],
    ["Year", String(c.year)],
    ["Mechanic", mechanicLabels[c.mechanic]],
    ["Mode", "Performs, not depicts"],
  ];
  return (
    <dl
      style={{
        borderTop: `${rule.accent} ${accent}`,
        display: "grid",
        gap: 0,
      }}
    >
      {rows.map(([key, val]) => (
        <div
          key={key}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 8ch) 1fr",
            gap: "1rem",
            padding: "0.7rem 0",
            borderBottom: `${rule.hair} ${evidence.rule}`,
            alignItems: "baseline",
          }}
        >
          <dt className="mono" style={{ color: accent, fontSize: "var(--step--1)" }}>
            {key}
          </dt>
          <dd style={{ fontSize: "var(--step--1)", color: "var(--paper)" }}>{val}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Hero register: full kinetic depth. */
export function HeroCase({ c }: { c: CaseStudy }) {
  const accent = caseAccent;
  return (
    <article
      style={{
        padding: "calc(var(--gutter) * 1.4) var(--gutter)",
        borderTop: `${rule.hair} ${evidence.rule}`,
      }}
    >
      <div
        style={{
          display: "grid",
          gap: "var(--gutter)",
          gridTemplateColumns: columns.hero,
          alignItems: "start",
        }}
      >
        <div>
          <p className="eyebrow" style={{ color: accent }}>
            {mechanicLabels[c.mechanic]} · {c.partner} · {c.year}
          </p>
          <PerformingType
            text={c.name}
            style={{ fontSize: "var(--step-3)", margin: "0.3em 0 0.4em" }}
          />
          <p style={{ marginBottom: "1.2rem" }}>{c.problem}</p>
          <p style={{ color: "var(--fog)" }}>{c.solution}</p>
          <p
            style={{
              marginTop: "1.5rem",
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "var(--step-1)",
              lineHeight: 1.3,
              borderLeft: `${rule.accent} ${accent}`,
              paddingLeft: "1.2rem",
            }}
          >
            {c.thesis}
          </p>
          {c.outcome && <OutcomeNote outcome={c.outcome} />}
          <Sources id={c.id} />
        </div>

        {/* The spec register carries the case as governed data, the editorial
            equivalent of the chassis: structure holds it, color marks the structure. */}
        <SpecRegister c={c} accent={accent} />
      </div>
    </article>
  );
}

/** Analytical register: the tighter six. */
export function CaseRow({ c }: { c: CaseStudy }) {
  const accent = caseAccent;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={spring.reveal}
      style={{
        padding: "calc(var(--gutter) * 0.9) var(--gutter)",
        borderTop: `${rule.hair} ${evidence.rule}`,
        display: "grid",
        gap: "var(--gutter)",
        gridTemplateColumns: columns.row,
        alignItems: "baseline",
      }}
    >
      <div>
        <p className="eyebrow" style={{ color: accent }}>
          {mechanicLabels[c.mechanic]}
        </p>
        <h3 style={{ fontSize: "var(--step-2)", margin: "0.3em 0 0.2em" }}>
          {c.name}
        </h3>
        <p style={{ color: "var(--fog)", fontSize: "var(--step--1)" }}>
          {c.partner} · {c.location} · {c.year}
        </p>
      </div>
      <div>
        <p style={{ marginBottom: "1rem" }}>{c.solution}</p>
        <p
          style={{
            fontStyle: "italic",
            fontFamily: "var(--serif)",
            borderLeft: `${rule.accent} ${accent}`,
            paddingLeft: "1rem",
          }}
        >
          {c.thesis}
        </p>
        {c.outcome && (
          <p
            style={{
              marginTop: "1rem",
              fontSize: "var(--step--1)",
              color: "var(--fog)",
            }}
          >
            <strong style={{ color: "var(--paper)" }}>{c.outcome.stat}</strong>{" "}
            {c.outcome.caveat}
          </p>
        )}
      </div>
    </motion.article>
  );
}
