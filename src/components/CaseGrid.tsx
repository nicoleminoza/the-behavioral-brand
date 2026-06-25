/**
 * CaseGrid.tsx — the Interactive Executive Summary Grid for the six supporting
 * cases. Understated typography cards (company, year, one-sentence line); a click
 * expands an inline drawer beneath that row with the full brief, sources, and
 * asset credit. Editorial judgment as interaction: the detail is there on demand,
 * never forced on the reader.
 */

import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sources from "./Sources";
import { caseAccent, evidence } from "../tokens/color";
import { rule } from "../tokens/layout";
import { spring } from "../tokens/motion";
import {
  catalystLabels,
  mechanicLabels,
  summaries,
  type CaseStudy,
} from "../data/cases";

const COLS = 3;

function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

export default function CaseGrid({ items }: { items: CaseStudy[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const rows = chunk(items, COLS);

  return (
    <div style={{ borderTop: `${rule.hair} ${evidence.rule}` }}>
      {rows.map((row, ri) => {
        const open = row.find((c) => c.id === openId) ?? null;
        return (
          <Fragment key={ri}>
            <div
              className="case-grid-row"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
              }}
            >
              {row.map((c) => {
                const isOpen = c.id === openId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    className="case-card"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : c.id)}
                    style={{
                      textAlign: "left",
                      background: isOpen ? "rgba(0,0,0,0.18)" : "transparent",
                      border: "none",
                      borderLeft: `${rule.hair} ${evidence.rule}`,
                      borderBottom: `${rule.hair} ${evidence.rule}`,
                      color: "inherit",
                      cursor: "pointer",
                      font: "inherit",
                      padding: "calc(var(--gutter) * 0.7) var(--gutter)",
                      transition: "background 180ms ease",
                    }}
                  >
                    <p className="eyebrow" style={{ color: caseAccent }}>
                      {catalystLabels[c.catalyst].title}
                    </p>
                    <h3
                      className="case-card-name"
                      style={{ fontSize: "var(--step-1)", margin: "0.45em 0 0.3em" }}
                    >
                      {c.name}
                    </h3>
                    <p
                      className="mono"
                      style={{ fontSize: "var(--step--1)", color: "var(--fog)" }}
                    >
                      {mechanicLabels[c.mechanic]} · {c.year}
                    </p>
                    <p style={{ marginTop: "0.7rem", color: "var(--paper)" }}>
                      {summaries[c.id]}
                    </p>
                    <span
                      className="mono"
                      aria-hidden="true"
                      style={{
                        display: "inline-block",
                        marginTop: "0.9rem",
                        fontSize: "var(--step--1)",
                        color: caseAccent,
                      }}
                    >
                      {isOpen ? "Close −" : "Read brief +"}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key={open.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={spring.reveal}
                  style={{
                    overflow: "hidden",
                    background: "rgba(0,0,0,0.18)",
                    borderBottom: `${rule.accent} ${caseAccent}`,
                  }}
                >
                  <Drawer c={open} />
                </motion.div>
              )}
            </AnimatePresence>
          </Fragment>
        );
      })}
    </div>
  );
}

function Drawer({ c }: { c: CaseStudy }) {
  return (
    <div
      className="case-drawer"
      style={{
        padding: "var(--gutter)",
        display: "grid",
        gap: "var(--gutter)",
        gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
        alignItems: "start",
      }}
    >
      <div>
        <p style={{ marginBottom: "1rem" }}>{c.problem}</p>
        <p style={{ color: "var(--fog)", marginBottom: "1.2rem" }}>{c.solution}</p>
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
        {c.outcome && (
          <p style={{ marginTop: "1.2rem", fontSize: "var(--step--1)", color: "var(--fog)" }}>
            <strong style={{ color: "var(--paper)" }}>{c.outcome.stat}</strong>{" "}
            {c.outcome.caveat}
          </p>
        )}
      </div>
      <div>
        <Sources id={c.id} />
      </div>
    </div>
  );
}
