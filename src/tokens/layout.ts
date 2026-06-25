/**
 * layout.ts — the single source of truth for how this site is composed.
 *
 * Parallel to motion.ts. Where motion.ts governs how the site moves, this governs
 * how it is structured. The thesis the site argues is that coherence comes from a
 * governed system, not a repeated decorative mark, so the site practices it: one
 * set of measures, one rule weight, one section-numbering format, applied
 * everywhere. To restructure the site, change it here, never inline in a section.
 *
 * This file is the replacement for a logo-derived "frame" primitive. A brand
 * system is a set of defined tokens applied with discipline; this is that, made
 * literal. Editorial judgment lives in the grid, not in an ornament.
 */

/** Line-length measures. Prose stays readable; notes and labels stay tight. */
export const measure = {
  prose: "64ch",
  note: "38ch",
  narrow: "28ch",
  headline: "18ch",
} as const;

/** Hairline rule weights. One vocabulary for every divider on the site. */
export const rule = {
  hair: "1px solid",
  accent: "2px solid",
} as const;

/** Container + surface tokens, per the brand guidelines. */
export const surface = {
  maxWidth: "1180px",
  cardRadius: "8px",
  pillRadius: "100px",
  glyphRadius: "22%",
  /** Card shadow. Lift, never glow. */
  cardShadow: "0 22px 48px -30px rgba(36, 31, 29, 0.45)",
} as const;

/** The editorial column grid. Two registers: the analytical row and the hero split. */
export const columns = {
  /** Hero case: a wide argument column beside a tighter spec register. */
  hero: "minmax(0, 1.3fr) minmax(0, 1fr)",
  /** Analytical row: a fixed label gutter beside a flexible body. */
  row: "minmax(0, 22ch) minmax(0, 1fr)",
  /** The opening claim and its confounder, held side by side. */
  claim: "minmax(0, 38ch) minmax(0, 38ch)",
} as const;

/**
 * Section numbering. The site reads as a numbered argument (01, 02, 03), the same
 * device the author's own site uses. Format once, here, so every section label is
 * identical in construction.
 */
export const sectionNumber = (n: number): string => `0${n}`;

/** Stagger for sequenced reveals (questions, rows). One cadence, reused. */
export const stagger = (i: number, step = 0.08): number => i * step;
