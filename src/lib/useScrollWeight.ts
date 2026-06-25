/**
 * useScrollWeight — drift a headline's weight as it nears viewport center.
 *
 * For serif (Newsreader) headlines the per-letter Performing Type engine does not
 * touch. An IntersectionObserver activates a requestAnimationFrame loop only while
 * the element is on screen; each frame does one read (the element's position) and
 * one write (the `--font-wght` custom property), so there is no layout thrashing
 * beyond the headline itself. Disciplined: a narrow range, nothing that bounces or
 * loops. Honors prefers-reduced-motion by resting at the low weight.
 */

import { useEffect } from "react";
import type { RefObject } from "react";

export function useScrollWeight(
  ref: RefObject<HTMLElement | null>,
  range: { rest: number; peak: number }
) {
  const { rest, peak } = range;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Baseline immediately, so the headline rests at the intended weight even
    // before the observer activates (and degrades gracefully if it never does).
    el.style.setProperty("--font-wght", String(rest));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let active = false;
    let raf = 0;

    const loop = () => {
      if (!active) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = r.top + r.height / 2;
      const proximity = 1 - Math.min(1, Math.abs(center - vh / 2) / (vh / 2));
      el.style.setProperty(
        "--font-wght",
        String(Math.round(rest + (peak - rest) * proximity))
      );
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(loop);
        }
      },
      { threshold: 0 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, rest, peak]);
}
