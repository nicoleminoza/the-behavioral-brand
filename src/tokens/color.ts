/**
 * color.ts — the site's color registers, aligned to the brand guidelines
 * (nicoleminoza.com/brand-guidelines.html). One governed place for color.
 *
 * Arc: authority first (a dark Ink band) opening to warmth at the close (Paper).
 * Accent discipline follows the guideline: terracotta marks labels, rules, and
 * figures only, never body text or whole content. Plum is the primary, reserved
 * for the close and a single CTA. Restraint is the credibility signal.
 */

/** Neutral ink + paper system. The constant beneath every register. */
export const ink = {
  /** Text / default. Warm near-black. */
  ink: "#241F1D",
  /** Surface. Warm paper. */
  paper: "#FAF6F1",
  /** Secondary surface. */
  paper2: "#F2EADF",
  /** Muted text. */
  soft: "#5D534C",
  /** Tertiary text / faint labels. */
  faint: "#A99D90",
  /** Hairline rule on light ground. */
  rule: "#E6DCCF",
  /** Hairline rule on the dark Ink band. */
  ruleDark: "#3A322E",
} as const;

/** Brand marks. Primary + the single accent. */
export const brand = {
  /** Primary. */
  plum: "#6B2C41",
  /** Accent only: labels, rules, figures. Never body text. */
  terracotta: "#C07A44",
  /** Reserved for warnings only. */
  crimson: "#9D2235",
} as const;

/** 01 Premise — authority. Emphasis treatment: Paper on Ink. */
export const premise = {
  bg: ink.ink,
  fg: ink.paper,
  accent: brand.terracotta,
} as const;

/** 02 Evidence — the benchmarks. The dark Ink band continues; each case carries its own register. */
export const evidence = {
  bg: ink.ink,
  fg: ink.paper,
  rule: ink.ruleDark,
} as const;

/** 03 Implication — the close. Warm Paper, the payoff the opening withheld. */
export const implication = {
  bg: ink.paper,
  fg: ink.ink,
  accent: brand.plum,
} as const;

/**
 * The single structural accent for a case (rule lines, the spec register, the
 * eyebrow figure). Per the guidelines, mechanics are told apart by their label,
 * not by color: terracotta is the only accent.
 */
export const caseAccent = brand.terracotta;
