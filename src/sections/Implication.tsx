/**
 * Implication.tsx — Act 03 of the argument. The close.
 *
 * No named institution is the subject; the site ends on the argument, not a
 * client. The argument states its own limit before the questions: brand amplifies
 * real value and cannot manufacture it. The four questions that precede any rebrand
 * are framed institution-agnostically. The most senior move is to leave the reader
 * holding the question, then sign it: a restrained colophon establishes the
 * author's standing without front-loading a resume. Warmth, withheld until now,
 * arrives.
 */

import { motion } from "framer-motion";
import PerformingType from "../components/PerformingType";
import { implication } from "../tokens/color";
import { measure, rule, stagger } from "../tokens/layout";
import { duration, spring } from "../tokens/motion";

const accent = implication.accent;

const questions = [
  "Does the institution have value worth amplifying, or is it asking brand to manufacture value it hasn’t built?",
  "What is the institution’s behavioral metaphor, and which mechanic performs it: a frame, a force, or a place?",
  "Is the board prepared to fund brand as capital infrastructure, not a communications line item?",
  "How does a leadership transition interact with brand evolution, and which should lead?",
];

export default function Implication() {
  return (
    <section
      style={{
        background: implication.bg,
        color: implication.fg,
        padding: "calc(var(--gutter) * 2) var(--gutter)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
        <span className="mono" style={{ color: accent, fontSize: "var(--step-0)" }}>
          03
        </span>
        <span className="eyebrow" style={{ color: accent }}>
          The Implication
        </span>
      </div>

      <PerformingType
        text="None of them built a new logo."
        style={{
          fontSize: "var(--step-3)",
          color: implication.fg,
          margin: "0.3em 0 0.5em",
          maxWidth: measure.headline,
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: duration.slow }}
        style={{ fontSize: "var(--step-1)", maxWidth: "48ch", lineHeight: 1.35 }}
      >
        Every institution in this analysis made its brand investment at a specific
        moment of change: a new building, a leadership transition, a centennial, a
        reopening. Each treated that moment as a deliberate decision about how it
        presents itself, and each built a behavioral system that performs what the
        institution does.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: duration.slow, delay: 0.1 }}
        style={{
          fontFamily: "var(--display)",
          fontWeight: 500,
          fontSize: "var(--step-2)",
          lineHeight: 1.08,
          letterSpacing: "-0.01em",
          maxWidth: "34ch",
          margin: "calc(var(--gutter) * 1.1) 0",
        }}
      >
        Brand does not create value. It makes existing value legible to the people
        whose engagement compounds it.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: duration.slow }}
        style={{ fontSize: "var(--step-1)", maxWidth: "48ch", lineHeight: 1.35, marginBottom: "1.2rem" }}
      >
        Done well, brand is not a cost line. It is the cheapest compounding growth an
        institution owns: attention it has already earned, made legible enough to
        act on. Usage deepens, retention rises, and the spend pays its own way. The
        cases here did not buy that growth. They performed their way into it.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: duration.slow }}
        style={{ fontSize: "var(--step-1)", maxWidth: "48ch", lineHeight: 1.35 }}
      >
        That is the limit of the argument. An institution with no distinct value to
        amplify gets a louder version of nothing, and a discerning audience reads
        motion with no argument beneath it as decoration. Every case here shares one
        precondition: the value was already real, and only the brand lagged behind
        it.
      </motion.p>

      <p
        style={{
          marginTop: "calc(var(--gutter) * 1.2)",
          marginBottom: "1.5rem",
          fontFamily: "var(--display)",
          fontSize: "var(--step-1)",
          color: accent,
          letterSpacing: "-0.01em",
        }}
      >
        Four questions that precede the investment.
      </p>

      {/* The four questions, held in a governed grid: structure carries them, the
          accent marks the structure, the content stays neutral. */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderTop: `${rule.accent} ${accent}`,
          borderLeft: `${rule.hair} ${implication.fg}22`,
        }}
      >
        {questions.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...spring.reveal, delay: stagger(i) }}
            style={{
              padding: "2rem",
              borderRight: `${rule.hair} ${implication.fg}22`,
              borderBottom: `${rule.hair} ${implication.fg}22`,
            }}
          >
            <span className="mono" style={{ color: accent }}>{`0${i + 1}`}</span>
            <p style={{ fontSize: "var(--step-1)", marginTop: "0.6rem", lineHeight: 1.25 }}>
              {q}
            </p>
          </motion.div>
        ))}
      </div>

      <p
        style={{
          marginTop: "calc(var(--gutter) * 1.5)",
          fontStyle: "italic",
          fontFamily: "var(--serif)",
          fontSize: "var(--step-1)",
          maxWidth: measure.prose,
        }}
      >
        Nine institutions, one move: each chose to behave like what it already was,
        at the moment that being understood mattered most. The logo was never the
        question.
      </p>

      {/* Colophon. The thesis is the credential; this signs it, subordinate and
          last. The board role names BIMA as the author's standing, not as the
          thesis's subject: the argument stays institution-agnostic above. */}
      <footer
        style={{
          marginTop: "calc(var(--gutter) * 2)",
          paddingTop: "1.5rem",
          borderTop: `${rule.hair} ${implication.fg}33`,
          maxWidth: measure.prose,
          display: "grid",
          gap: "0.8rem",
        }}
      >
        <p className="mono" style={{ fontSize: "var(--step--1)", color: accent }}>
          Nicole Miñoza
        </p>
        <p style={{ fontSize: "var(--step--1)", color: implication.fg }}>
          Product and product marketing leadership at Adobe, 2002 to 2026. Board of
          directors, Bainbridge Island Museum of Art. Global advisor for How Women
          Lead, counseling senior women leaders on brand, marketing, and communications.
        </p>
        <p style={{ fontStyle: "italic", fontFamily: "var(--serif)", color: implication.fg }}>
          I make this argument from inside the room where boards decide what brand
          is worth.
        </p>
        <p
          className="mono"
          style={{
            marginTop: "0.6rem",
            fontSize: "var(--step--1)",
            color: "var(--soft)",
            maxWidth: measure.prose,
            lineHeight: 1.6,
          }}
        >
          Method: nine benchmarks. Two (Koto’s Norton, venturethree’s Young Vic)
          sparked this analysis; the other seven were surfaced through design-press
          research and the originating agencies’ case studies. Sources are credited
          per case.
        </p>
        {/* Each typeface name set in its own face: the credit doubles as a specimen. */}
        <p style={{ fontSize: "var(--step--1)", color: "var(--soft)" }}>
          Typeset in{" "}
          <span className="vf-name" style={{ fontFamily: "var(--display)" }}>
            Recursive
          </span>
          ,{" "}
          <span className="vf-name" style={{ fontFamily: "var(--serif)" }}>
            Newsreader
          </span>
          ,{" "}
          <span className="vf-name" style={{ fontFamily: "var(--sans)" }}>
            Hanken Grotesk
          </span>
          , and{" "}
          <span className="vf-name" style={{ fontFamily: "var(--mono)" }}>
            Spline Sans Mono
          </span>
          .
        </p>
      </footer>

      {/* The single call to action: returns the reader to her full Product/PMM
          identity rather than soliciting a brand engagement. */}
      <div style={{ marginTop: "calc(var(--gutter) * 1.5)" }}>
        <a className="cta" href="https://nicoleminoza.com">
          See the rest of my work
        </a>
      </div>
    </section>
  );
}
