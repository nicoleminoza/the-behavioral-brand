/**
 * Premise.tsx — Act 01 of the argument. The dilemma, stated plainly.
 *
 * Thesis first: the Performing-Type headline leads, so "brand is behavior" is
 * demonstrated before a word of body copy is read. A tight standpoint follows,
 * naming the two vantage points the read comes from and bridging the cultural
 * cases to a universal, transferable principle. The dilemma closes the act, led
 * by the asterisk (the confounder) rather than a statistic. Authority first;
 * warmth is earned later, at the close.
 */

import { motion } from "framer-motion";
import PerformingType from "../components/PerformingType";
import { premise } from "../tokens/color";
import { columns, measure } from "../tokens/layout";
import { duration } from "../tokens/motion";

export default function Premise() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: premise.bg,
        color: premise.fg,
        padding: "var(--section-pad) var(--gutter)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(2.5rem, 7vh, 6rem)",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.slow }}
        style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}
      >
        <span className="mono" style={{ color: premise.accent, fontSize: "var(--step-0)" }}>
          01
        </span>
        <span className="eyebrow" style={{ color: premise.accent }}>
          The Premise
        </span>
      </motion.div>

      <div>
        <PerformingType
          text="Brand is behavior, not image."
          style={{
            fontSize: "var(--step-3)",
            color: premise.fg,
            margin: "0.2em 0",
            maxWidth: "13ch",
            lineHeight: 1.04,
          }}
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, delay: 0.3 }}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "var(--step-1)",
            fontStyle: "italic",
            color: premise.fg,
            opacity: 0.85,
            maxWidth: measure.narrow,
            lineHeight: 1.25,
          }}
        >
          Why institutions that perform their values outgrow the ones that
          describe them.
        </motion.p>
      </div>

      {/* The standpoint. Names the two vantage points and bridges the cultural
          corpus to a universal principle, so the read positions for any
          brand-leadership context, not the cultural sector alone. */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: duration.slow }}
        style={{
          maxWidth: measure.prose,
          paddingTop: "1.25rem",
          borderTop: `2px solid ${premise.accent}`,
        }}
      >
        <p className="eyebrow" style={{ color: premise.accent, marginBottom: "0.9rem" }}>
          Standpoint
        </p>
        <p style={{ color: premise.fg, fontSize: "var(--step-0)", lineHeight: 1.55 }}>
          Two seats taught me to read brand this way: two decades building global
          type systems that had to scale across products, platforms, and markets,
          and a board seat inside an institution moving through structural change. I
          have run brand from inside product, where it has to perform or it dies, not
          from a function that only describes it. The examples here are cultural
          institutions because their brand decisions play out in public, measured and
          debated. The mechanics are not theirs alone. Any organization aligning a
          brand across a portfolio, a product, and a market is solving the same
          problem, and at scale the brand either performs or it fails.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: duration.slow }}
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: columns.claim,
          alignItems: "start",
        }}
      >
        <p style={{ color: premise.fg, opacity: 0.9 }}>
          Cultural institutions show the tension most plainly, pressed from two
          directions at once. Prestige and philanthropy concentrate where design
          credibility meets the quality of the programming. The community mandate
          demands warmth and access. Optimize for one audience and you quietly lose
          the other.
        </p>
        <p
          style={{
            color: premise.fg,
            opacity: 0.7,
            fontSize: "var(--step--1)",
            borderLeft: `2px solid ${premise.accent}`,
            paddingLeft: "1rem",
          }}
        >
          A note before any number appears on this site. The cases that follow
          carry their confounders in plain sight: new leadership, post-pandemic
          recovery, programming shifts. None of these outcomes prove brand as sole
          cause. The argument rests on directional evidence and design logic, not a
          clean causal claim. That restraint is the point.
        </p>
      </motion.div>
    </section>
  );
}
