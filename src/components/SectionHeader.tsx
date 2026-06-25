/**
 * SectionHeader.tsx — the recurring structural primitive of the site.
 *
 * This is the chassis, expressed as an editorial system rather than a logo-derived
 * mark. Every act of the argument opens the same way: a numbered label, a stated
 * claim, an optional gloss. Coherence comes from this repetition of structure;
 * variation comes from the content and the register each section carries. The
 * numbering (01 / 02 / 03) frames the site as a numbered argument, not a brochure.
 */

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { sectionNumber } from "../tokens/layout";
import { measure } from "../tokens/layout";
import { behavior, scrollAxis } from "../tokens/motion";
import { useScrollWeight } from "../lib/useScrollWeight";

interface SectionHeaderProps {
  /** 1-based act number. Rendered as 01, 02, 03. */
  index: number;
  /** Short kicker beside the number, e.g. "The Premise". */
  kicker: string;
  /** The section's stated claim. The largest line in the header. */
  claim: string;
  /** Optional supporting gloss beneath the claim. */
  gloss?: string;
  /** Accent for the number and rule, defaults to the inherited fog. */
  accent?: string;
  /** Foreground for the claim, inherits if omitted. */
  color?: string;
}

export default function SectionHeader({
  index,
  kicker,
  claim,
  gloss,
  accent = "var(--fog)",
  color,
}: SectionHeaderProps) {
  const reduce = useReducedMotion() ?? false;
  const claimRef = useRef<HTMLHeadingElement>(null);
  useScrollWeight(claimRef, scrollAxis.weight);

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={behavior.arrive}
      style={{ display: "grid", gap: "0.8rem" }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
        <span
          className="mono"
          style={{ color: accent, fontSize: "var(--step-0)", letterSpacing: "0.1em" }}
        >
          {sectionNumber(index)}
        </span>
        <span className="eyebrow">{kicker}</span>
      </div>

      <h2
        ref={claimRef}
        className="vf"
        style={{ fontSize: "var(--step-2)", maxWidth: "22ch", color }}
      >
        {claim}
      </h2>

      {gloss && (
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "var(--step-1)",
            color: "var(--fog)",
            maxWidth: measure.prose,
          }}
        >
          {gloss}
        </p>
      )}
    </motion.header>
  );
}
