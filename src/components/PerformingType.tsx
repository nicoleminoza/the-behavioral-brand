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
 * Two deliberate craft decisions:
 *  - Weight is a WORD-level property; slant is per-letter. A word blooms to a
 *    single cohesive weight so it never reads as uneven color, while individual
 *    letters nearest the reader lean the most. The word stays a word; the letters
 *    still perform.
 *  - On first view the line performs itself once (a reading-order bloom), so the
 *    behavior is demonstrated before any input. A static reader still sees it move.
 *
 * Restraint is the law (see motion.ts). Weight and slant move across deliberately
 * narrow bands. With prefers-reduced-motion the type resolves to a single static state.
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
  useCallback,
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

/** Per-letter registration: element, cached center, and its slant spring. */
interface LetterReg {
  el: HTMLSpanElement;
  slant: MotionValue<number>;
  cx: number;
  cy: number;
}
/** Per-word registration: the shared weight spring and its letter indices. */
interface WordReg {
  weight: MotionValue<number>;
  idxs: number[];
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/** Entrance timing: a one-time reading-order bloom on first view. */
const ENTRANCE_MS = 1800;
const ENTRANCE_SIGMA = 2.2; // bloom width, in letters

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

  const letters = useRef<(LetterReg | null)[]>([]);
  const words = useRef<WordReg[]>([]);
  const proximity = useRef<number[]>([]);

  // Pointer position in viewport coordinates, updated outside React state.
  const pointer = useRef({ x: -9999, y: -9999, active: false });
  // Whether the pointer is over this headline. A hover lifts the whole line.
  const hovering = useRef(false);
  // Timestamp the entrance performance began (set on first in-view frame).
  const entranceStart = useRef<number | null>(null);

  // Scroll velocity → a baseline the whole headline shares.
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const totalLetters = useMemo(
    () => Array.from(text).filter((ch) => ch !== " ").length,
    [text]
  );

  const registerLetter = useCallback((reg: LetterReg | null, index: number) => {
    letters.current[index] = reg;
  }, []);
  const registerWord = useCallback(
    (wordId: number, weight: MotionValue<number>, idxs: number[]) => {
      words.current[wordId] = { weight, idxs };
    },
    []
  );

  // Cache letter centers. Recompute on resize and scroll only (cheap), never per frame.
  useEffect(() => {
    if (reduce) return;
    const measure = () => {
      for (const reg of letters.current) {
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

  // The loop. Slant is per-letter (pointer proximity + entrance bloom); weight is
  // the max of a word's letters, so the whole word blooms as one cohesive unit.
  useAnimationFrame((t) => {
    if (reduce || !inView || !words.current.length) return;

    // One-time entrance: a bloom that sweeps through the line in reading order.
    if (entranceStart.current === null) entranceStart.current = t;
    const elapsed = t - entranceStart.current;
    const entranceOn = elapsed < ENTRANCE_MS;
    const lead = entranceOn
      ? easeInOut(Math.min(1, elapsed / ENTRANCE_MS)) * (totalLetters - 1)
      : -1;

    const v = Math.abs(scrollVelocity.get());
    const scrollBaseline = Math.min(v / perform.scrollDivisor, 1) * perform.scrollPeak;
    const hoverBase = hovering.current ? perform.hover : 0;
    const base = Math.max(scrollBaseline, hoverBase);

    const p = pointer.current;
    const prox = proximity.current;
    const regs = letters.current;
    const sigma = reach / 2;

    for (let i = 0; i < regs.length; i++) {
      const reg = regs[i];
      if (!reg) {
        prox[i] = 0;
        continue;
      }
      let near = 0;
      if (p.active) {
        const dx = reg.cx - p.x;
        const dy = reg.cy - p.y;
        const dist = Math.hypot(dx, dy);
        near = Math.exp(-(dist * dist) / (2 * sigma * sigma));
      }
      if (entranceOn) {
        const di = i - lead;
        const e = Math.exp(-(di * di) / (2 * ENTRANCE_SIGMA * ENTRANCE_SIGMA));
        if (e > near) near = e;
      }
      const target = Math.min(1, Math.max(base, near));
      reg.slant.set(target); // per-letter slant
      prox[i] = target;
    }

    // Per-word weight = the strongest target among the word's letters.
    const ws = words.current;
    for (let w = 0; w < ws.length; w++) {
      const wd = ws[w];
      if (!wd) continue;
      let m = base;
      for (const idx of wd.idxs) {
        if (prox[idx] > m) m = prox[idx];
      }
      wd.weight.set(Math.min(1, m));
    }
  });

  // Group letters into words. Each word is one inline-block that stays whole, so
  // the headline only ever breaks at spaces, never mid-word. Letters keep a stable
  // global index so the animation registries stay aligned.
  type Token =
    | { kind: "word"; id: number; letters: { ch: string; i: number }[] }
    | { kind: "space" };
  const tokens = useMemo<Token[]>(() => {
    const out: Token[] = [];
    let word: { ch: string; i: number }[] = [];
    let wordId = 0;
    Array.from(text).forEach((ch, i) => {
      if (ch === " ") {
        if (word.length) {
          out.push({ kind: "word", id: wordId++, letters: word });
          word = [];
        }
        out.push({ kind: "space" });
      } else {
        word.push({ ch, i });
      }
    });
    if (word.length) out.push({ kind: "word", id: wordId++, letters: word });
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
      {tokens.map((t) =>
        t.kind === "space" ? (
          " "
        ) : (
          <Word
            key={`w${t.id}`}
            wordId={t.id}
            letters={t.letters}
            registerWord={registerWord}
            registerLetter={registerLetter}
            staticState={reduce}
          />
        )
      )}
    </Tag>
  );
}

/**
 * A word. Owns the single weight spring its letters share, so the word blooms as
 * one cohesive unit rather than as a gradient of mismatched glyph weights.
 */
function Word({
  wordId,
  letters,
  registerWord,
  registerLetter,
  staticState,
}: {
  wordId: number;
  letters: { ch: string; i: number }[];
  registerWord: (id: number, weight: MotionValue<number>, idxs: number[]) => void;
  registerLetter: (reg: LetterReg | null, i: number) => void;
  staticState: boolean;
}) {
  const weight = useSpring(0, spring.calm);
  const idxs = useMemo(() => letters.map((l) => l.i), [letters]);

  useEffect(() => {
    if (staticState) return;
    registerWord(wordId, weight, idxs);
  }, [staticState, registerWord, wordId, weight, idxs]);

  return (
    <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {letters.map((l) => (
        <Letter
          key={l.i}
          char={l.ch}
          index={l.i}
          wordWeight={weight}
          register={registerLetter}
          staticState={staticState}
        />
      ))}
    </span>
  );
}

/**
 * One letter. Owns its own slant spring (independent, per-letter lean) and reads
 * its word's shared weight spring, so weight is cohesive and slant is expressive.
 */
function Letter({
  char,
  index,
  wordWeight,
  register,
  staticState,
}: {
  char: string;
  index: number;
  wordWeight: MotionValue<number>;
  register: (reg: LetterReg | null, i: number) => void;
  staticState: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const slant = useSpring(0, spring.calm);
  // The springs drive the axis custom properties; CSS maps them to
  // font-variation-settings. Weight comes from the word, slant from this letter.
  const fontWght = useTransform(wordWeight, (v) =>
    Math.round(lerp(typeAxes.weight.rest, typeAxes.weight.peak, v))
  );
  const fontSlnt = useTransform(slant, (v) =>
    lerp(typeAxes.slant.rest, typeAxes.slant.peak, v).toFixed(2)
  );

  useEffect(() => {
    if (staticState || !ref.current) return;
    register({ el: ref.current, slant, cx: 0, cy: 0 }, index);
    return () => register(null, index);
  }, [register, index, slant, staticState]);

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
