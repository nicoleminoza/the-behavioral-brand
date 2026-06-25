/**
 * motion.ts — the single source of truth for how this site moves.
 *
 * This file is the argument. A mature brand has a single defined motion vocabulary
 * that any contributor can implement without per-asset creative direction. This
 * file *is* that vocabulary. Every spring and every type axis range lives here, set
 * once. Restraint is enforced at the system level, not negotiated per component.
 *
 * Design rule: subtle but discernible. A discerning viewer notices the response;
 * a casual one feels it without naming it. The axis ranges below are deliberately
 * narrow for exactly that reason.
 */

import type { Transition } from "framer-motion";

/** Springs. One named spring per behavior. Never inline a spring in a component. */
export const spring = {
  /** The default. Calm, slightly damped, no overshoot. Used for type deformation. */
  calm: { type: "spring", stiffness: 120, damping: 26, mass: 1 } satisfies Transition,
  /** Decisive entrance. A touch more energy so elements settle with intention. */
  assemble: { type: "spring", stiffness: 180, damping: 30, mass: 1 } satisfies Transition,
  /** Reveals. Soft entrance for text and section transitions. */
  reveal: { type: "spring", stiffness: 90, damping: 24, mass: 1 } satisfies Transition,
} as const;

/** Durations for tween-based fades where a spring would be wrong. */
export const duration = {
  fast: 0.35,
  base: 0.6,
  slow: 1.1,
} as const;

/**
 * Variable-font axis ranges for the Performing Type Engine.
 *
 * These are the guardrails on "subtle but discernible." Weight moves across a
 * perceptible-but-restrained band; slant stays shallow so the type leans rather
 * than topples. The Recursive font carries these axes natively.
 *
 * `rest` is the neutral state; `peak` is the maximum reachable under full input.
 * The engine interpolates between them off scroll velocity and pointer proximity.
 */
export const typeAxes = {
  /** Book to authoritative. A visible, deliberate shift that stops short of shouting. */
  weight: { rest: 360, peak: 620, axis: "wght" },
  /** A shallow, intentional lean. The type leans, it never topples. */
  slant: { rest: 0, peak: -7, axis: "slnt" },
  casual: { rest: 0, peak: 0.3, axis: "CASL" },
} as const;

/**
 * Drive levels for the Performing Type engine. Disciplined, not high-impact:
 * scroll alone reaches `scrollPeak`, a hover settles at `hover`. Neither maxes
 * the axis, so the response reads as intentional rather than as a gimmick.
 * Tune the whole engine's intensity from here.
 */
export const perform = {
  /** How far scroll velocity alone pushes the axis (0..1). */
  scrollPeak: 0.7,
  /** Where a hovered headline settles (0..1). */
  hover: 0.9,
  /** Larger = scroll must be faster to reach scrollPeak. */
  scrollDivisor: 2000,
} as const;

/**
 * Scroll-proximity weight range for the serif (Newsreader) section headlines,
 * which the per-letter engine above does not drive. Applied through the
 * `--font-wght` CSS custom property by `useScrollWeight`. Disciplined per the brand
 * guideline: a narrow drift as the headline nears viewport center, no bounce, no
 * loop. The interactive-card hover stops live in index.css (`--wght-book` /
 * `--wght-bold`), the single home for CSS-driven axis values.
 */
export const scrollAxis = {
  weight: { rest: 440, peak: 600 },
} as const;

/**
 * Named motion behaviors, this site's equivalent of the Natural History Museum's
 * Ripple / Grow / Pulsate / Orbit. A behavior is a reusable intent, not a one-off
 * animation. Components reference these by name.
 */
export const behavior = {
  /** Content composes into place from off-screen, then settles. */
  compose: spring.assemble,
  /** Type leans into the reader's attention and relaxes when it leaves. */
  perform: spring.calm,
  /** A section composes itself as it enters the viewport. */
  arrive: spring.reveal,
} as const;

/** Honor the user's OS-level reduced-motion preference. Read once, used everywhere. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Compose a `font-variation-settings` string from a 0..1 intensity value.
 * 0 = rest, 1 = peak. The engine drives `intensity` from a spring so the type
 * never jumps. This is the only place axis math lives.
 */
export function variationSettings(intensity: number): string {
  const lerp = (a: number, b: number) => a + (b - a) * intensity;
  const w = Math.round(lerp(typeAxes.weight.rest, typeAxes.weight.peak));
  const s = lerp(typeAxes.slant.rest, typeAxes.slant.peak).toFixed(2);
  const c = lerp(typeAxes.casual.rest, typeAxes.casual.peak).toFixed(3);
  return `"wght" ${w}, "slnt" ${s}, "CASL" ${c}`;
}
