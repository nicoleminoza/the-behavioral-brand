/**
 * App.tsx — the argument, assembled.
 *
 * Three acts, read as a numbered argument: Premise (the dilemma) → Evidence (the
 * nine benchmarks) → Implication (the questions that precede any rebrand). The
 * whole site composes from one governed system, motion.ts for how it moves and
 * layout.ts for how it is structured: coherence through structure, variation
 * within it.
 */

import Premise from "./sections/Premise";
import Evidence from "./sections/Evidence";
import Implication from "./sections/Implication";

export default function App() {
  return (
    <main>
      <Premise />
      <Evidence />
      <Implication />
    </main>
  );
}
