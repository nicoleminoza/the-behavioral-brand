# How Institutions Behave

**Brand is behavior, not image.** An interactive thesis on what happens when an institution’s positioning is expressed through the product, experience, and operating choices, not just its visual identity.

**Read it:** [nicoleminoza.com/how-institutions-behave](https://nicoleminoza.com/how-institutions-behave)

[hib-hero.webm](https://github.com/user-attachments/assets/ecba4fe0-cf0e-4e8f-9b14-4bc22d6f053d)

## The question

What changes when positioning stops being something an organization says and becomes something the product, customer experience, and organization consistently do?

## The argument

None of the nine institutions built a new logo. Each treated a moment of change (a new building, a leadership transition, a centennial, a reopening) as the occasion to build a behavioral system that performs what the institution does.

**Brand does not create value. It makes existing value legible to the people whose engagement compounds it.**

The limit is stated plainly: an institution with no distinct value to amplify gets a louder version of nothing.

The essay runs in three acts:

1. **Premise:** the thesis, the standpoint, and the tension cultural institutions face between prestige and access.
2. **Evidence:** three cases at full depth, one per mechanic, then six supporting cases in an expandable grid, each with its brief and sources.
3. **Implication:** the transferable insight, the limit of the argument, and four questions a board should answer before funding a brand investment.

## Why it applies beyond museums

Cultural institutions make brand decisions in public, so the mechanics are easy to see. The same problem appears in any organization aligning a brand across a portfolio, product, and market: at scale, the brand either performs inside the product and customer experience or it fails.

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

## The build

The site makes the same argument in code: coherence comes from a governed system, not a decorative mark.
- Design system: motion, layout, color, and type are controlled through shared tokens rather than page-by-page styling.
- Interaction: custom kinetic typography responds to cursor and scroll input, so movement carries meaning rather than serving as decoration.
- Evidence model: the nine institutions, case summaries, and source material are structured as data, making the benchmark consistent and reusable.
- Original studies: the kinetic experiments interpret the mechanics used by the benchmark institutions; they are not reproductions of any institution’s work.

Stack: Vite, React, TypeScript, and Framer Motion, with custom type using Recursive, Newsreader, Hanken Grotesk, and Spline Sans Mono. No backend; the site deploys as a static build.

## Run it locally

```bash
npm install
npm run dev       # dev server with hot reload
npm run build     # production build to /dist
npm run preview   # serve the production build
```

## Author

[Nicole Miñoza](https://nicoleminoza.com), product and product marketing leader; former Adobe Director of Product Management. Board member, Bainbridge Island Museum of Art.
