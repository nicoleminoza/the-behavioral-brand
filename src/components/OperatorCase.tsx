/**
 * OperatorCase.tsx — the one case the author led, not observed.
 *
 * Adobe Type (2012–2026), rendered at full depth with a metrics register in place
 * of the benchmark spec register. This is the operator proof: brand built at
 * platform scale, by her hands, and the tech/B2B product-brand example the nine
 * cultural cases do not supply. The retention figure carries its confounder, the
 * same discipline applied to every benchmark.
 */

import PerformingType from "./PerformingType";
import Sources from "./Sources";
import { caseAccent } from "../tokens/color";
import { rule } from "../tokens/layout";
import { operatorCase } from "../data/cases";

export default function OperatorCase() {
  const c = operatorCase;
  return (
    <article
      style={{
        padding: "calc(var(--gutter) * 1.4) var(--gutter) calc(var(--gutter) * 2)",
        borderTop: `${rule.accent} ${caseAccent}`,
      }}
    >
      <PerformingType
        text={c.product}
        style={{ fontSize: "var(--step-3)", margin: "0.1em 0 0.2em", maxWidth: "14ch" }}
      />
      <p
        className="mono"
        style={{
          color: "var(--fog)",
          fontSize: "var(--step--1)",
          marginBottom: "0.4rem",
        }}
      >
        {c.role}
      </p>
      <p
        style={{
          color: "var(--paper)",
          fontSize: "var(--step--1)",
          marginBottom: "var(--gutter)",
        }}
      >
        {c.scope}
      </p>

      <div
        className="case-drawer"
        style={{
          display: "grid",
          gap: "var(--gutter)",
          gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 1fr)",
          alignItems: "start",
        }}
      >
        <div>
          <p style={{ marginBottom: "1.2rem" }}>{c.problem}</p>
          <p style={{ color: "var(--fog)", marginBottom: "1.5rem" }}>{c.solution}</p>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "var(--step-1)",
              lineHeight: 1.3,
              borderLeft: `${rule.accent} ${caseAccent}`,
              paddingLeft: "1.2rem",
            }}
          >
            {c.thesis}
          </p>
          <p
            style={{
              marginTop: "1.2rem",
              fontSize: "var(--step--1)",
              color: "var(--fog)",
              fontStyle: "italic",
            }}
          >
            {c.caveat}
          </p>
          <Sources id={c.id} />
        </div>

        {/* Metrics register: figures in the serif, per the brand guideline. */}
        <dl
          style={{
            display: "grid",
            gap: "1.3rem",
            borderTop: `${rule.accent} ${caseAccent}`,
            paddingTop: "1.3rem",
            margin: 0,
          }}
        >
          {c.metrics.map((m, i) => (
            <div key={i}>
              <dt
                style={{
                  fontFamily: "var(--serif)",
                  fontWeight: 600,
                  fontSize: "var(--step-2)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: caseAccent,
                }}
              >
                {m.value}
              </dt>
              <dd
                style={{
                  margin: "0.35rem 0 0",
                  fontSize: "var(--step--1)",
                  color: "var(--fog)",
                }}
              >
                {m.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
