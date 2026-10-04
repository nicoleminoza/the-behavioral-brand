# How Institutions Behave

**Brand is behavior, not image.** An interactive essay on why institutions that perform their values outgrow the ones that describe them, built from a benchmark of nine cultural-institution rebrands.

**Read it:** [nicoleminoza.com/how-institutions-behave](https://nicoleminoza.com/how-institutions-behave)

[hib-hero.webm](https://github.com/user-attachments/assets/ecba4fe0-cf0e-4e8f-9b14-4bc22d6f053d)

## The argument

None of the nine institutions built a new logo. Each treated a moment of change (a new building, a leadership transition, a centennial, a reopening) as the occasion to build a behavioral system that performs what the institution does.

**Brand does not create value. It makes existing value legible to the people whose engagement compounds it.**

The limit is stated plainly: an institution with no distinct value to amplify gets a louder version of nothing.

The essay runs in three acts:

1. **Premise:** the thesis, the standpoint, and the tension cultural institutions face between prestige and access.
2. **Evidence:** three cases at full depth, one per mechanic, then six supporting cases in an expandable grid, each with its brief and sources.
3. **Implication:** the transferable insight, the limit of the argument, and four questions a board should answer before funding a brand investment.

## The benchmark

| Institution | Mechanic | Year |
|---|---|---|
| **Norton Museum of Art** (Koto) | Container & framing | 2023 |
| **San Francisco Symphony** (COLLINS + Dinamo) | Kinetic & motion-first | 2022 |
| **Perth Institute of Contemporary Arts** (Block) | Place-derived typography | 2024 |
| Solomon R. Guggenheim Museum | Container & framing | 2024 |
| Brooklyn Museum | Container & framing | 2024 |
| Natural History Museum | Kinetic & motion-first | 2023 |
| The Young Vic Theatre | Kinetic & motion-first | 2022 |
| Leeum Museum of Art | Kinetic & motion-first | 2022 |
| National Ballet of Canada | Place-derived typography | 2024 |

The first three are covered in depth. Every case is credited to its sources.

## How the evidence is handled

Every outcome on the site carries its confounders in plain sight: new leadership, post-pandemic recovery, programming changes. Agency-reported numbers are labeled as agency-reported. The argument rests on directional evidence and design logic, not a causal claim.

## Why it applies beyond museums

Cultural institutions make their brand decisions in public, so the mechanics are easy to see. The problem is the same for any organization aligning a brand across a portfolio, a product and a market: at scale, the brand either performs inside the product or it fails.

## The build

The site makes the same argument in code: coherence comes from a governed system, not a decorative mark.

- **Tokens** (`src/tokens/`): motion, layout and color. Color marks structure, never the content inside it.
- **Performing type** (`src/components/PerformingType.tsx`): variable-font headlines that respond to the cursor and scroll.
- **Case grid** (`src/components/CaseGrid.tsx`): the expandable evidence grid.
- **Case data** (`src/data/cases.ts`): the nine institutions, summaries and sources.

The kinetic studies interpret the mechanics the benchmark institutions used. They are original work, not reproductions of any institution's marks, typefaces or assets.

**Stack:** Vite, React, TypeScript, Framer Motion. Typeset in Recursive, Newsreader, Hanken Grotesk and Spline Sans Mono. No backend; deploys as a static build.

## Run it locally

```bash
npm install
npm run dev       # dev server with hot reload
npm run build     # production build to /dist
npm run preview   # serve the production build
```

## Author

[Nicole Miñoza](https://nicoleminoza.com), product and product marketing leader. 23 years at Adobe, most recently Director of Product Management. Board member, Bainbridge Island Museum of Art.
