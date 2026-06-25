# The Behavioral Brand

*Why institutions that perform their values outgrow the ones that describe them.*

An interactive thesis on brand as institutional infrastructure, built from a
nine-institution benchmark analysis. A portfolio piece positioning the author for a
VP of Brand / Communications / Product Marketing role in tech/B2B. Not a rebrand. A
numbered scroll argument.

## Run it

```bash
npm install
npm run dev      # local dev server with hot reload
```

Open the URL Vite prints. Move your cursor across the headlines and scroll, the
type performs. Open any card in the Evidence grid for its full brief, sources, and
credits.

```bash
npm run build    # production build to /dist
npm run preview  # serve the production build
```

## The argument (three acts)

1. **Premise** (`sections/Premise.tsx`) — the thesis headline, a tight first-person
   standpoint (two lenses, bridged to a universal principle), then the dilemma led
   by the confounder.
2. **Evidence** (`sections/Evidence.tsx`) — three heroes at full depth (SF Symphony,
   Norton, PICA), then the six supporting cases as an **Interactive Executive
   Summary Grid**: understated cards that expand an inline drawer on click.
3. **Implication** (`sections/Implication.tsx`) — the transferable insight, the
   limit of the argument, four questions, and a closing colophon. No client is the
   subject; the site ends on the question, then signs it.

## The argument, expressed as architecture

Coherence comes from a governed system, not a decorative mark.

- **`src/tokens/motion.ts`** — springs and type-axis ranges; the motion vocabulary.
- **`src/tokens/layout.ts`** — measures, rules, grid, numbering, surface tokens.
- **`src/tokens/color.ts`** — per-section registers + the brand palette. Color marks
  structure (rules, labels, the spec register), never the content inside it.
- **`src/components/SectionHeader.tsx`** — the numbered-section primitive.
- **`src/components/PerformingType.tsx`** — the variable-font kinetic headline.
- **`src/components/CaseGrid.tsx`** — the interactive grid + expand drawer.
- **`src/components/Sources.tsx`** / **`BrandAssets.tsx`** — references and finished-
  asset placeholders on every case.
- **`src/data/cases.ts`** — the nine institutions, plus card summaries and sources.

## Brand system

Aligned to nicoleminoza.com/brand-guidelines.html. Palette: Plum (primary),
Terracotta (the single accent), Ink, Paper. Type: Recursive (kinetic headlines
only), Newsreader (headlines and pull-quotes), Hanken Grotesk (sans body, 17/1.62),
Spline Sans Mono (labels). Motion stays disciplined: nothing bounces, nothing loops.

## Note on the kinetic studies

These components interpret the *mechanics* the benchmark institutions used. They are
original, clean-room work, never reproductions of any institution's real marks,
typefaces, or assets. The Finished Brand Assets blocks are placeholders for the
author's own or licensed imagery.

## Stack

Vite + React + TypeScript + Framer Motion. No backend; deploys as a static build.
