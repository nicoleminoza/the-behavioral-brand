/**
 * PerformingType.tsx — the Performing Type Engine. The site's showpiece.
 *
 * The SF Symphony's Symphosizer deformed letterforms in response to sound, proving
 * classical music is kinetic, not frozen. We can't rely on audio on a portfolio
 * site, and we will not touch the Symphony's actual assets, so this is a clean-room
 * interpretation of the *mechanic*: letterforms that respond, in real time, to the
 * reader's own behavior. Input signals are scroll velocity and pointer proximity.
 *
 * The thesis the component embodies: a brand that performs its subject is not a
 * logo, it is the institution's argument made visible. Here, the argument is
 * "brand is behavior," and the headline literally behaves.
 *
 * Restraint is the law (see motion.ts). Weight and slant move across deliberately
 * narrow bands. A discerning reader notices; a casual one feels it. With
 * prefers-reduced-motion the type resolves to a single composed static state.
 */

import {
  motion,
  useAnimationFrame,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
  type MotionStyle,
} from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ElementType,
} from "react";
import { perform, spring, typeAxes, variationSettings } from "../tokens/motion";

interface PerformingTypeProps {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** How far (px) the pointer reaches before a letter stops responding. */
  reach?: number;
}

interface Registration {
  el: HTMLSpanElement;
  intensity: MotionValue<number>;
  cx: number;
  cy: number;
}

export default function PerformingType({
  text,
  as = "h1",
  className,
  style,
  reach = 180,
}: PerformingTypeProps) {
  const reduce = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(containerRef, { amount: 0.3 });
  const registry = useRef<Registration[]>([]);

  // Pointer position in viewport coordinates, updated outside React state.
  const pointer = useRef({ x: -9999, y: -9999, active: false });

  // Whether the pointer is over this headline. A hover lifts the whole line.
  const hovering = useRef(false);

  // Scroll velocity → a baseline performance level the whole headline shares.
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const register = useMemo(
    () => (reg: Registration | null, index: number) => {
      if (reg) registry.current[index] = reg;
    },
    []
  );

  // Cache letter centers. Recompute on resize and scroll only (cheap), never per frame.
  useEffect(() => {
    if (reduce) return;
    const measure = () => {
      for (const reg of registry.current) {
        if (!reg?.el) continue;
        const r = reg.el.getBoundingClientRect();
        reg.cx = r.left + r.width / 2;
        reg.cy = r.top + r.height / 2;
      }
    };
    measure();
    const onScroll = () => requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  // The loop. Combine a shared scroll baseline with per-letter pointer proximity,
  // then push each letter's spring toward its target. The spring smooths the rest.
  useAnimationFrame(() => {
    if (reduce || !inView) return;

    const v = Math.abs(scrollVelocity.get());
    const scrollBaseline =
      Math.min(v / perform.scrollDivisor, 1) * perform.scrollPeak;
    const hoverBase = hovering.current ? perform.hover : 0;

    const p = pointer.current;
    for (const reg of registry.current) {
      if (!reg) continue;
      let proximity = 0;
      if (p.active) {
        const dx = reg.cx - p.x;
        const dy = reg.cy - p.y;
        const dist = Math.hypot(dx, dy);
        // Gaussian falloff: full at the cursor, ~0 by `reach`.
        proximity = Math.exp(-(dist * dist) / (2 * (reach / 2) ** 2));
      }
      const target = Math.min(1, Math.max(scrollBaseline, hoverBase, proximity));
      reg.intensity.set(target);
    }
  });

  // Group letters into words. Each word is one inline-block that stays whole, so
  // the headline only ever breaks at spaces, never mid-word (and never collapses
  // to one glyph per line in a narrow column). Letters keep a stable global index
  // so the animation registry stays aligned.
  type Token =
    | { kind: "word"; letters: { ch: string; i: number }[] }
    | { kind: "space" };
  const tokens = useMemo<Token[]>(() => {
    const out: Token[] = [];
    let word: { ch: string; i: number }[] = [];
    Array.from(text).forEach((ch, i) => {
      if (ch === " ") {
        if (word.length) {
          out.push({ kind: "word", letters: word });
          word = [];
        }
        out.push({ kind: "space" });
      } else {
        word.push({ ch, i });
      }
    });
    if (word.length) out.push({ kind: "word", letters: word });
    return out;
  }, [text]);

  const Tag = motion[as as "h1"] ?? motion.h1;

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={{ fontFamily: "var(--display)", ...style }}
      aria-label={text}
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
    >
      {tokens.map((t, ti) =>
        t.kind === "space" ? (
          " "
        ) : (
          <span
            key={`w${ti}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {t.letters.map((l) => (
              <Letter
                key={l.i}
                char={l.ch}
                index={l.i}
                register={register}
                staticState={reduce}
              />
            ))}
          </span>
        )
      )}
    </Tag>
  );
}

/**
 * One letter. Owns its own spring so deformation is independent and smooth.
 * Registers its element + intensity value up to the parent loop.
 */
function Letter({
  char,
  index,
  register,
  staticState,
}: {
  char: string;
  index: number;
  register: (reg: Registration | null, i: number) => void;
  staticState: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const intensity = useSpring(0, spring.calm);
  // The spring drives the axis custom properties; CSS maps them to
  // font-variation-settings. This is the reusable engine API: any element can
  // animate the same --font-wght / --font-slnt with a plain CSS transition.
  const fontWght = useTransform(intensity, (v) =>
    Math.round(
      typeAxes.weight.rest + (typeAxes.weight.peak - typeAxes.weight.rest) * v
    )
  );
  const fontSlnt = useTransform(intensity, (v) =>
    (typeAxes.slant.rest + (typeAxes.slant.peak - typeAxes.slant.rest) * v).toFixed(2)
  );

  useEffect(() => {
    if (staticState || !ref.current) return;
    register({ el: ref.current, intensity, cx: 0, cy: 0 }, index);
    return () => register(null, index);
  }, [register, index, intensity, staticState]);

  // Reduced motion: one composed static weight, engine off.
  if (staticState) {
    return (
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          fontVariationSettings: variationSettings(0.42),
        }}
      >
        {char}
      </span>
    );
  }

  const vfStyle = {
    display: "inline-block",
    willChange: "font-variation-settings",
    fontVariationSettings: '"wght" var(--font-wght), "slnt" var(--font-slnt)',
    "--font-wght": fontWght,
    "--font-slnt": fontSlnt,
  } as unknown as MotionStyle;

  return (
    <motion.span ref={ref} aria-hidden="true" style={vfStyle}>
      {char}
    </motion.span>
  );
}
