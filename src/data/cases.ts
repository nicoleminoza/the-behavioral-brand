/**
 * cases.ts — the nine benchmark institutions as data, not markup.
 *
 * Grouped by strategic CATALYST (the institutional trigger), not by design
 * mechanic. Catalyst is what a brand-leadership audience pattern-matches on: the
 * trigger that forced the decision is the most legible way to read the nine.
 *
 * `mechanic` is retained because the three hero cases are chosen one per mechanic.
 * `outcome` carries its own caveat; the whole site refuses unqualified causation.
 */

export type Mechanic = "container" | "kinetic" | "place";
export type Catalyst = "expansion" | "milestone" | "leadership";

export interface Outcome {
  stat: string;
  caveat: string;
}

export interface CaseStudy {
  id: string;
  name: string;
  partner: string;
  location: string;
  year: number;
  mechanic: Mechanic;
  catalyst: Catalyst;
  hero: boolean;
  problem: string;
  solution: string;
  thesis: string;
  outcome?: Outcome;
}

export const catalystLabels: Record<Catalyst, { title: string; gloss: string }> = {
  expansion: {
    title: "Expansion Shock",
    gloss: "The building wrote a check the brand couldn’t cash.",
  },
  milestone: {
    title: "Milestone Reckoning",
    gloss: "An anniversary forcing a decision about past versus future.",
  },
  leadership: {
    title: "Leadership & Relevance",
    gloss: "A new director, or a crisis in how the whole category is seen, forces the question.",
  },
};

export const mechanicLabels: Record<Mechanic, string> = {
  container: "Container & Framing",
  kinetic: "Kinetic & Motion-First",
  place: "Place-Derived Typography",
};

export const cases: CaseStudy[] = [
  // ── Expansion Shock ──────────────────────────────────────────────
  {
    id: "norton",
    name: "Norton Museum of Art",
    partner: "Koto",
    location: "West Palm Beach",
    year: 2023,
    mechanic: "container",
    catalyst: "expansion",
    hero: true,
    problem:
      "A Norman Foster expansion delivered the building, but decades of accumulated visual languages left programming, development, and marketing speaking in different voices. The fragmentation was operational, not aesthetic.",
    solution:
      "A modular geometric frame derived from the museum’s own architectural proportions, a universal viewport for all content. Color belongs to the frame, never the content inside it, so exhibition palettes coexist without conflict. The geometry scales from app icon to gallery wall because it is the consistent variable, not a fixed image.",
    thesis:
      "The brand does not compete with the art. It frames the art. Coherence comes from structural geometry, not visual repetition.",
  },
  {
    id: "guggenheim",
    name: "Solomon R. Guggenheim",
    partner: "Pentagram / Harry Pearce",
    location: "Global",
    year: 2024,
    mechanic: "container",
    catalyst: "expansion",
    hero: false,
    problem:
      "Four locations across New York, Venice, Bilbao, and the forthcoming Abu Dhabi without a unified global identity. The brief was a governance problem: one brand, one constellation, many experiences, holding authority across bilingual Latin and Arabic requirements and programming that ranges from blue-chip retrospectives to local commissions.",
    solution:
      "A dual-register system. A custom geometric wordmark in a modular layout framework carries institutional authority; a family of free-form, morphing G-marks carries expressive energy per location. One system, two modes: authority at the institutional level, energy at the exhibition level.",
    thesis:
      "Hold the institution’s authority in one fixed wordmark and each location’s freedom in a changing one. The brand stops forcing a single expression on four different houses.",
  },
  // ── Milestone Reckoning ──────────────────────────────────────────
  {
    id: "brooklyn",
    name: "Brooklyn Museum",
    partner: "Other Means",
    location: "New York",
    year: 2024,
    mechanic: "container",
    catalyst: "milestone",
    hero: false,
    problem:
      "A bicentennial rebrand facing a specific tension: honor 200 years of history while signaling a contemporary institution, without the signal becoming a pose.",
    solution:
      "The building itself supplied the expressive device. Two punctuation dots that historically frame names across the facade became structural: they bookend the logo, serve as bullets, anchor signage. Ligatures merge the double-Cs of Brooklyn and the M-U of Museum, making the name a dense, proprietary object.",
    thesis:
      "The most durable brand elements are pulled from the institution’s own material history. The more specific, the harder to copy.",
  },
  {
    id: "nhm",
    name: "Natural History Museum",
    partner: "Pentagram / Marina Willer + Nomad",
    location: "London",
    year: 2023,
    mechanic: "kinetic",
    catalyst: "milestone",
    hero: false,
    problem:
      "A 150th anniversary demanding a shift from ‘passive archive of the natural world’ to ‘active catalyst for planetary advocacy’, while keeping the accessibility and delight that made it one of the UK’s most-visited institutions.",
    solution:
      "A system organized around four named motion behaviors, Ripple, Grow, Pulsate, Orbit, that govern how every asset animates. The circular mark is motion-derived. Sound-reactive dinosaurs and dodos are native brand behaviors, not campaign assets. The brand performs the mission: its assets move the way an advocate moves, addressed to the visitor.",
    thesis:
      "When the mission is transformation, not collection, the brand must perform the transformation. Motion embedded at the system level is sustainable; motion as a campaign layer is not.",
    outcome: {
      stat: "5.69M visits in the rebrand year, +22% over the prior year; a further record the year after.",
      caveat:
        "Institution-reported and independently verifiable, but post-pandemic recovery is a significant confounder and cannot be disaggregated from any brand effect.",
    },
  },
  // ── Leadership & Relevance ───────────────────────────────────────
  {
    id: "sf-symphony",
    name: "San Francisco Symphony",
    partner: "COLLINS + Dinamo",
    location: "San Francisco",
    year: 2022,
    mechanic: "kinetic",
    catalyst: "leadership",
    hero: true,
    problem:
      "Classical music carried a perception problem: frozen, inaccessible, digitally irrelevant. Under new artistic director Esa-Pekka Salonen, the Symphony needed to reposition as pioneering and digitally fluent, without condescending to the subscribers who sustained it.",
    solution:
      "A bespoke variable typeface whose letterforms respond in real time to acoustic input, growing, slanting, compressing, stretching by what they hear. The Symphosizer let any user generate the brand in motion through their own sound. The brand does not represent music; it performs it, in visual form.",
    thesis:
      "A brand that performs its subject in real time is not a logo. It is the institution’s argument made visible. Brand is an amplifier; its return depends entirely on what it is amplifying.",
    outcome: {
      stat: "A 19% year-over-year increase in donor participation; attendance rising to 74% of capacity.",
      caveat:
        "Agency-reported (COLLINS), not independently audited. Salonen’s concurrent arrival is a material confounder. The defensible read: brand made a transformation already underway legible to donors and media at once. It amplified; it did not cause.",
    },
  },
  {
    id: "young-vic",
    name: "The Young Vic Theatre",
    partner: "venturethree",
    location: "London",
    year: 2022,
    mechanic: "kinetic",
    catalyst: "leadership",
    hero: false,
    problem:
      "Programming that ranges from internationally touring productions to deeply community-embedded participatory work. A brand optimized for prestige would alienate the community; one optimized for accessibility would undercut the authority needed to attract major artists. Two registers would fracture the very identity that needed unifying.",
    solution:
      "A variable-weight typeface whose letterforms expand, contract, and deform by the content they name and the context they appear in. A community event and an international premiere share one typographic voice that shifts physical form to signal scale. Every touchpoint was designed in its animated state first, then adapted to static, reversing the conventional process.",
    thesis:
      "Behavioral consistency replaces visual sameness. One typeface that changes shape to match a program’s scale lets a community workshop and an international premiere share a single voice at different volumes.",
  },
  {
    id: "leeum",
    name: "Leeum Museum of Art",
    partner: "Wolff Olins",
    location: "Seoul",
    year: 2022,
    mechanic: "kinetic",
    catalyst: "leadership",
    hero: false,
    problem:
      "A post-pandemic reopening with a new mandate: become an open space of convergence where ideas and people intersect, not a prestige institution observed from a respectful distance. The identity had to perform convergence, not represent it, because representation would produce exactly the static mark the mandate moved away from.",
    solution:
      "The word ‘Leeum’ in severely distorted variable type forms a hypnotic half-crescent of flowing line. At a glance it reads as an abstract object; sustained attention reveals the letterforms. In motion it mimics a rolling tube, a shifting beacon, a colliding system of lines, embodying convergence behaviorally rather than by label.",
    thesis:
      "Hold the mark in motion and it behaves like the convergence the museum promises. A mark that behaves like its idea is harder to forget than one that only points at it.",
    outcome: {
      stat: "Monthly visitors rose from 13,000 to over 20,000 following the rebrand.",
      caveat: "Agency-reported (Wolff Olins), not independently audited.",
    },
  },
  {
    id: "pica",
    name: "Perth Institute of Contemporary Arts",
    partner: "Block",
    location: "Perth",
    year: 2024,
    mechanic: "place",
    catalyst: "leadership",
    hero: true,
    problem:
      "After 30 years and a genuine international reputation, PICA programmed boundary-testing work and looked generic doing it. Its identity did not match its intellectual ambition. The brief was a single declaration: Cultivating the Provocative.",
    solution:
      "The entire custom wordmark was derived from the geometry of PICA’s heritage building, the entrance tower’s curves, angles, and window proportions translated directly into glyph construction. The letterforms are slightly strange but pleasing because they carry the logic of a building, not of typographic convention. And any green is PICA green, whether in surrounding trees, visitor clothing, or the work itself. The institution’s color is the living environment around it.",
    thesis:
      "A typeface drawn from one building’s geometry can belong to no other institution, in no other place. What cannot be transplanted cannot be copied, and that is the whole point.",
  },
  {
    id: "national-ballet",
    name: "National Ballet of Canada",
    partner: "Bruce Mau Design",
    location: "Toronto",
    year: 2024,
    mechanic: "place",
    catalyst: "leadership",
    hero: false,
    problem:
      "An identity unchanged in nearly 20 years, and a category carrying a persistent accessibility problem: perceived exclusivity and gatekeeping that self-selects audiences out before they encounter a single performance. The brief: demolish the barrier without erasing the gravitas built over decades.",
    solution:
      "A custom glyph makes the logo and body copy a single continuous typographic action, type the mark, keep typing, the narrative flows without interruption or realignment. The brand and the text are the same act. A shift to lowercase softens the register without sacrificing precision; motion is embedded in the system from the start, not bolted on.",
    thesis:
      "Make a brand frictionless to deploy and people use it as designed. You engineer the gap between intention and execution out of the system instead of training around it.",
  },
];

export const heroes = cases.filter((c) => c.hero);
export const supporting = cases.filter((c) => !c.hero);
export const byCatalyst = (k: Catalyst) => cases.filter((c) => c.catalyst === k);

/** A single reference. `url` empty means a placeholder awaiting a real link. */
export interface Source {
  label: string;
  url?: string;
}

/**
 * One-sentence card line for the Executive Summary Grid: a metric where one
 * exists and is defensible, the core challenge otherwise.
 */
export const summaries: Record<string, string> = {
  norton: "A Norman Foster expansion the brand couldn’t keep pace with.",
  guggenheim: "One institution, four houses, two alphabets.",
  brooklyn: "A 200-year-old museum that had to read as contemporary.",
  nhm: "Visits rose 22% in the rebrand year, with a post-pandemic confounder.",
  "sf-symphony":
    "Donor participation rose 19% as classical music shed its frozen image.",
  "young-vic": "One voice for community work and international premieres.",
  leeum: "Monthly visitors rose from 13,000 to over 20,000.",
  pica: "Thirty years of provocative work behind a generic-looking brand.",
  "national-ballet": "Dropping the velvet rope without losing the gravitas.",
};

/**
 * Sources & references per case, primary-first: the originating agency's own case
 * study (or the institution's announcement) leads, design-press coverage follows
 * as corroboration. Norton and Young Vic are the two rebrands that sparked the
 * analysis (seen in the TLDR Design newsletter); the other seven were surfaced
 * through design-press research. Add `url` to any entry to make it a live link.
 */
export const sources: Record<string, Source[]> = {
  norton: [
    {
      label: "Creative Boom",
      url: "https://www.creativeboom.com/news/koto-rebrands-the-norton-museum-of-art-with-an-identity-where-art-truly-meets-life/",
    },
  ],
  "young-vic": [
    {
      label: "It’s Nice That",
      url: "https://www.itsnicethat.com/articles/venturethree-young-vic-graphic-design-project-280526",
    },
  ],
  guggenheim: [
    { label: "Pentagram portfolio", url: "https://www.pentagram.com/work/guggenheim-3/story" },
    { label: "Creative Review", url: "https://www.creativereview.co.uk/pentagram-guggenheim-rebrand/" },
    {
      label: "Brand New / UnderConsideration",
      url: "https://www.underconsideration.com/brandnew/archives/new_logo_and_identity_for_guggenheim_by_pentagram.php",
    },
    {
      label: "Creative Boom",
      url: "https://www.creativeboom.com/news/pentagram-unveils-a-unified-global-identity-for-the-guggenheim/",
    },
  ],
  "sf-symphony": [
    { label: "COLLINS portfolio", url: "https://wearecollins.com/case-studies/san-francisco-symphony/" },
    {
      label: "The Brand Identity",
      url: "https://the-brandidentity.com/project/collins-dinamo-make-classical-contemporary-responsive-identity-sf-symphony",
    },
    { label: "TypeRoom", url: "https://www.typeroom.eu/collins-san-francisco-symphony-variable-type" },
    {
      label: "Print Magazine",
      url: "https://www.printmag.com/branding-identity-design/collins-new-identity-for-the-san-francisco-symphony-brings-the-noise/",
    },
  ],
  nhm: [
    { label: "Pentagram portfolio", url: "https://www.pentagram.com/work/natural-history-museum" },
    { label: "Nomad Studio", url: "https://www.nomadstudio.com/work/natural-history-museum" },
    {
      label: "It’s Nice That",
      url: "https://www.itsnicethat.com/news/pentagram-nomad-natural-history-museum-graphic-design-190723",
    },
    { label: "Creative Review", url: "https://www.creativereview.co.uk/natural-history-museum-branding/" },
    {
      label: "BP&O",
      url: "https://bpando.org/2023/08/24/museum-branding-motion-graphics-pentagram-nomad-natural-history-museum-london/",
    },
  ],
  leeum: [
    { label: "Wolff Olins case study", url: "https://www.wolffolins.com/work/leeum" },
    {
      label: "It’s Nice That",
      url: "https://www.itsnicethat.com/news/wolff-olins-leeum-museum-of-art-graphic-design-060922",
    },
    { label: "Creative Review", url: "https://www.creativereview.co.uk/leeum-museum-branding/" },
    {
      label: "Brand New / UnderConsideration",
      url: "https://www.underconsideration.com/brandnew/archives/new_logo_and_identity_for_leeum_museum_of_art_by_wolff_olins.php",
    },
  ],
  "national-ballet": [
    { label: "Bruce Mau Design", url: "https://www.brucemaudesign.com/news/creative-boom-features-nboc-rebrand" },
    {
      label: "Print Magazine",
      url: "https://www.printmag.com/branding-identity-design/bruce-mau-design-the-national-ballet-of-canada-new-identity/",
    },
    { label: "Creative Boom", url: "https://www.creativeboom.com/news/rebrand-of-the-national-ballet-of-canada/" },
    {
      label: "Transform Magazine",
      url: "https://www.transformmagazine.net/articles/2024/the-national-ballet-of-canada-unveils-inviting-rebrand/",
    },
  ],
  pica: [
    { label: "Block portfolio", url: "https://www.blockbranding.com/work/perth-institute-of-contemporary-arts" },
    {
      label: "It’s Nice That",
      url: "https://www.itsnicethat.com/articles/block-pica-identity-graphic-design-project-141024",
    },
    {
      label: "The Brand Identity",
      url: "https://the-brandidentity.com/project/block-bends-the-rules-of-branding-in-its-identity-for-the-perth-institute-of-contemporary-arts",
    },
  ],
  brooklyn: [
    { label: "Brooklyn Museum announcement", url: "https://www.brooklynmuseum.org/stories/new-brand" },
    {
      label: "Print Magazine",
      url: "https://www.printmag.com/branding-identity-design/the-brooklyn-museum-unveils-a-bold-rebrand-for-its-200th-anniversary/",
    },
    {
      label: "Creative Boom",
      url: "https://www.creativeboom.com/news/the-brooklyn-museum-unveils-its-new-look-with-its-200-year-history-at-its-heart/",
    },
  ],
};

/** A headline figure for the operator case: a number and what it measures. */
export interface Metric {
  value: string;
  label: string;
}

/**
 * The operator case — the author's own work at Adobe Type (2012–2026). Distinct
 * from the nine benchmarks she observed: this is the one she led, the proof she has
 * built brand at scale, not only analyzed it, and the tech/B2B product-brand proof
 * the cultural corpus lacks. Figures are from her résumé and timeline; the
 * retention figure is flagged as correlational to keep the confounder discipline.
 */
export const operatorCase = {
  id: "adobe-fonts",
  product: "Adobe Fonts",
  role: "Senior PMM to Director of Product Management · Adobe Type · 2012–2026",
  scope: "Led six product managers across a ~75-person organization.",
  problem:
    "Typekit was powerful and peripheral: a web-font tool most Creative Cloud members never noticed, buried a menu deep. The work was to make typography behave like a reason to stay, not a setting.",
  solution:
    "Rebranded Typekit into Adobe Fonts, a core membership benefit, and built the system beneath it. One text engine unified across twelve Creative Cloud apps. A usage-based royalty model that aligned foundry incentives with growth. Source Han Sans, the first open-source Pan-CJK typeface, extending the brand across Chinese, Japanese, and Korean by default. Typography stopped being a tool and became a behavior members lived inside.",
  thesis:
    "A brand that performs makes a product’s value legible, and legible value compounds. Adoption deepened, retention rose, and typography became the highest self-reported membership value of any Adobe service. Brand was not the cost line. It was the line that compounded.",
  metrics: [
    { value: "+40%", label: "monthly active users in the rebrand’s first year" },
    { value: "42%", label: "less churn among members who adopted Adobe Fonts" },
    { value: "Zero", label: "foundry losses through the rebrand" },
  ] as Metric[],
  caveat:
    "Retention is correlational; adopters self-select. The defensible read: typography deepened engagement at scale, it did not single-handedly retain.",
} as const;
