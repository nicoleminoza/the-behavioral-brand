# Builds print-ready HTML (1080x1350 per slide) for nine LinkedIn carousels,
# styled to The Behavioral Brand. Convert to PDF with headless Chrome.
import os

OUT = os.path.dirname(os.path.abspath(__file__))

FONTS = ("https://fonts.googleapis.com/css2?family=Recursive:wght@400..800"
         "&family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..500"
         "&family=Hanken+Grotesk:wght@400..600&family=Spline+Sans+Mono:wght@400..600&display=swap")

CSS = """
*{margin:0;padding:0;box-sizing:border-box}
@page{size:1080px 1350px;margin:0}
html,body{background:#fff}
@import url('%s');
.slide{width:1080px;height:1350px;padding:96px 90px;display:flex;flex-direction:column;
 position:relative;overflow:hidden;page-break-after:always;font-family:'Hanken Grotesk',system-ui,sans-serif}
.slide:last-child{page-break-after:auto}
.paper{background:#faf6f1;color:#241f1d}
.ink{background:#241f1d;color:#faf6f1}
.eb{font-family:'Spline Sans Mono',monospace;font-size:30px;letter-spacing:.17em;text-transform:uppercase;color:#c07a44;line-height:1.5}
.big{font-family:'Recursive',sans-serif;font-weight:660;font-size:98px;line-height:1.03;letter-spacing:-.02em;margin-top:48px}
.serif{font-family:'Newsreader',serif;font-weight:560;font-size:72px;line-height:1.16;margin-top:46px}
.body{font-size:38px;line-height:1.5;color:#5d534c;margin-top:44px;max-width:24ch}
.ink .body{color:#b8a89a}
.rule{height:2px;background:#e6dccf;margin:60px 0 32px}.ink .rule{background:#3a322e}
.mech{font-family:'Spline Sans Mono',monospace;font-size:30px;letter-spacing:.05em;color:#5d534c}.ink .mech{color:#a99d90}
.thesis{font-family:'Newsreader',serif;font-style:italic;font-size:74px;line-height:1.24;border-left:7px solid #c07a44;padding-left:44px;margin-top:52px}
.sub{font-family:'Spline Sans Mono',monospace;font-size:31px;letter-spacing:.03em;color:#5d534c;line-height:1.55;margin-top:48px}
.fig{font-family:'Newsreader',serif;font-weight:600;font-size:150px;line-height:1;letter-spacing:-.02em;color:#c07a44;margin-top:40px}
.figlab{font-size:38px;line-height:1.42;color:#241f1d;margin-top:26px;max-width:22ch}
.cav{font-family:'Spline Sans Mono',monospace;font-size:27px;letter-spacing:.02em;color:#a99d90;line-height:1.55;margin-top:auto;max-width:34ch}
.detail{font-family:'Newsreader',serif;font-size:60px;line-height:1.28;margin-top:46px;max-width:20ch}
.link{font-family:'Spline Sans Mono',monospace;font-size:33px;letter-spacing:.03em;color:#c07a44;margin-top:44px}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end}
.wm{font-family:'Spline Sans Mono',monospace;font-size:27px;letter-spacing:.2em;text-transform:uppercase;color:#a99d90}
.idx{font-family:'Spline Sans Mono',monospace;font-size:30px;color:#c07a44;letter-spacing:.05em}
""" % FONTS


def cover(c):
    return f'''<div class="slide paper">
  <div class="eb">{c["catalyst"]}</div>
  <div class="big">{c["name"]}</div>
  <div class="rule"></div>
  <div class="mech">{c["partner"]} · {c["year"]} · {c["mech_short"]}</div>
  <div class="foot"><span class="wm">The Behavioral Brand</span><span class="idx">01 / 06</span></div>
</div>'''

def trigger(c):
    return f'''<div class="slide paper">
  <div class="eb">The Trigger · 02</div>
  <div class="serif">{c["trigger_h"]}</div>
  <div class="body">{c["trigger_b"]}</div>
  <div class="foot"><span class="wm">The Behavioral Brand</span><span class="idx">02 / 06</span></div>
</div>'''

def move(c):
    return f'''<div class="slide ink">
  <div class="eb">The Move · 03</div>
  <div class="big" style="font-size:82px">{c["move_h"]}</div>
  <div class="body">{c["move_b"]}</div>
  <div class="foot"><span class="wm">The Behavioral Brand</span><span class="idx">03 / 06</span></div>
</div>'''

def principle(c):
    return f'''<div class="slide paper">
  <div class="eb">The Principle · 04</div>
  <div class="thesis">{c["thesis"]}</div>
  <div class="sub">{c["sub"]}</div>
  <div class="foot"><span class="wm">The Behavioral Brand</span><span class="idx">04 / 06</span></div>
</div>'''

def evidence(c):
    e = c["evidence"]
    return f'''<div class="slide paper">
  <div class="eb">The Evidence · 05</div>
  <div class="fig">{e["fig"]}</div>
  <div class="figlab">{e["lab"]}</div>
  <div class="cav">{e["caveat"]}</div>
  <div class="foot" style="margin-top:44px"><span class="wm">The Behavioral Brand</span><span class="idx">05 / 06</span></div>
</div>'''

def detail(c):
    return f'''<div class="slide paper">
  <div class="eb">The Detail · 05</div>
  <div class="detail">{c["detail"]}</div>
  <div class="foot"><span class="wm">The Behavioral Brand</span><span class="idx">05 / 06</span></div>
</div>'''

def argument(c):
    return f'''<div class="slide ink">
  <div class="eb">The Argument · 06</div>
  <div class="big" style="font-size:88px">Brand is behavior, not image.</div>
  <div class="body">Nine landmark cultural rebrands, read by what forced the decision. Not by how they look. By what they do.</div>
  <div class="link">nicoleminoza.com/the-behavioral-brand</div>
  <div class="foot"><span class="wm">Nicole Miñoza</span><span class="idx">06 / 06</span></div>
</div>'''


def render(c):
    five = evidence(c) if c.get("evidence") else detail(c)
    slides = cover(c) + trigger(c) + move(c) + principle(c) + five + argument(c)
    return f"<!doctype html><html><head><meta charset='utf-8'><style>{CSS}</style></head><body>{slides}</body></html>"


CAROUSELS = [
 {
  "id":"01-norton","name":"Norton Museum of Art","catalyst":"Expansion Shock",
  "partner":"Koto","year":2023,"mech_short":"Container",
  "trigger_h":"A Norman Foster expansion delivered the building. The brand spoke in a dozen voices.",
  "trigger_b":"Programming, development, and marketing had each accumulated their own visual language. The fragmentation was operational, not aesthetic.",
  "move_h":"A frame, not a logo.",
  "move_b":"A modular geometric frame derived from the museum’s own architectural proportions. Color belongs to the frame, never the content inside it, so exhibition palettes coexist without conflict. It scales from app icon to gallery wall.",
  "thesis":"The brand does not compete with the art. It frames the art.",
  "sub":"Coherence comes from structural geometry, not visual repetition.",
  "detail":"The frame is the one consistent variable. Every show changes what sits inside it; the geometry never moves. That is why it holds.",
 },
 {
  "id":"02-guggenheim","name":"Solomon R. Guggenheim","catalyst":"Expansion Shock",
  "partner":"Pentagram","year":2024,"mech_short":"Container",
  "trigger_h":"Four houses. New York, Venice, Bilbao, Abu Dhabi. No unified identity.",
  "trigger_b":"A governance problem more than a design one: one brand holding authority across Latin and Arabic, from blue-chip retrospectives to local commissions.",
  "move_h":"One system, two registers.",
  "move_b":"A fixed geometric wordmark carries institutional authority. A family of free-form, morphing G-marks carries each location’s energy. Authority at the institution; freedom at the exhibition.",
  "thesis":"Hold the institution’s authority in one fixed wordmark, and each location’s freedom in a changing one.",
  "sub":"The brand stops forcing a single expression on four different houses.",
  "detail":"The wordmark never bends. The G-marks never stop moving. The tension between them is the whole system.",
 },
 {
  "id":"03-brooklyn","name":"Brooklyn Museum","catalyst":"Milestone Reckoning",
  "partner":"Other Means","year":2024,"mech_short":"Container",
  "trigger_h":"A bicentennial with a trap: honor 200 years without the homage becoming a pose.",
  "trigger_b":"Signal a contemporary institution while carrying two centuries of history, and keep the signal from reading as costume.",
  "move_h":"The building supplied the device.",
  "move_b":"Two punctuation dots that frame names across the facade became structural: they bookend the logo, serve as bullets, anchor signage. Ligatures merge the double-C of Brooklyn and the M-U of Museum into a dense, proprietary object.",
  "thesis":"The most durable brand elements are pulled from the institution’s own material history.",
  "sub":"The more specific, the harder to copy.",
  "detail":"The dots were already on the facade. The rebrand noticed them, and made them load-bearing.",
 },
 {
  "id":"04-nhm","name":"Natural History Museum","catalyst":"Milestone Reckoning",
  "partner":"Pentagram + Nomad","year":2023,"mech_short":"Kinetic",
  "trigger_h":"A 150th anniversary, and a mission shift: from passive archive to active planetary advocate.",
  "trigger_b":"Without losing the accessibility and delight that made it one of the UK’s most-visited institutions.",
  "move_h":"Four motion behaviors, system-deep.",
  "move_b":"Ripple, Grow, Pulsate, Orbit govern how every asset animates. The circular mark is motion-derived. Sound-reactive dinosaurs and dodos are native brand behaviors, not campaign assets.",
  "thesis":"When the mission is transformation, the brand must perform the transformation.",
  "sub":"Motion embedded at the system level is sustainable. Motion as a campaign layer is not.",
  "evidence":{"fig":"+22%","lab":"5.69M visits in the rebrand year, with a further record the year after.",
   "caveat":"Institution-reported and independently verifiable, but post-pandemic recovery is a significant confounder and cannot be disaggregated from any brand effect."},
 },
 {
  "id":"05-sf-symphony","name":"San Francisco Symphony","catalyst":"Leadership & Relevance",
  "partner":"COLLINS + Dinamo","year":2022,"mech_short":"Kinetic",
  "trigger_h":"Classical music read as frozen. Inaccessible. Digitally irrelevant.",
  "trigger_b":"A new artistic director, Esa-Pekka Salonen. The job: reposition as pioneering and digitally fluent, without condescending to the subscribers who sustain it.",
  "move_h":"A typeface that performs sound.",
  "move_b":"A bespoke variable font whose letterforms grow, slant, compress, and stretch in real time to acoustic input. The Symphosizer let anyone generate the brand in motion with their own voice. It does not represent music. It performs it.",
  "thesis":"The brand does not represent music. It performs it.",
  "sub":"Brand is an amplifier. Its return depends entirely on what it is amplifying.",
  "evidence":{"fig":"+19%","lab":"year-over-year donor participation, with attendance rising to 74% of capacity.",
   "caveat":"Agency-reported, not independently audited. Salonen’s concurrent arrival is a material confounder. The defensible read: brand made a transformation already underway legible at once. It amplified. It did not cause."},
 },
 {
  "id":"06-young-vic","name":"The Young Vic Theatre","catalyst":"Leadership & Relevance",
  "partner":"venturethree","year":2022,"mech_short":"Kinetic",
  "trigger_h":"One theatre, two audiences that pull in opposite directions.",
  "trigger_b":"Touring productions need authority. Community-embedded work needs accessibility. Optimize for either and you fracture the identity that needed unifying.",
  "move_h":"One typeface, variable by context.",
  "move_b":"Letterforms expand, contract, and deform by the content they name and the room they appear in. Every touchpoint was designed animated first, then adapted to static, reversing the usual process.",
  "thesis":"Behavioral consistency replaces visual sameness.",
  "sub":"One shape-shifting typeface lets a community workshop and an international premiere share a single voice at different volumes.",
  "detail":"Designed in motion first. The static versions are screenshots of a brand built to move.",
 },
 {
  "id":"07-leeum","name":"Leeum Museum of Art","catalyst":"Leadership & Relevance",
  "partner":"Wolff Olins","year":2022,"mech_short":"Kinetic",
  "trigger_h":"A reopening with a new mandate: become a space of convergence, not a prestige object observed from a distance.",
  "trigger_b":"Representation would produce exactly the static mark the mandate moved away from. The identity had to perform convergence, not depict it.",
  "move_h":"The name, held in motion.",
  "move_b":"‘Leeum’ in severely distorted variable type forms a hypnotic half-crescent. At a glance, an abstract object; with attention, the letterforms. In motion it mimics a rolling tube, a shifting beacon, a colliding system of lines.",
  "thesis":"A mark that behaves like its idea is harder to forget than one that only points at it.",
  "sub":"Hold the mark in motion and it behaves like the convergence the museum promises.",
  "evidence":{"fig":"13k → 20k","lab":"monthly visitors, before and after the rebrand.",
   "caveat":"Agency-reported (Wolff Olins), not independently audited."},
 },
 {
  "id":"08-pica","name":"Perth Institute of Contemporary Arts","catalyst":"Leadership & Relevance",
  "partner":"Block","year":2024,"mech_short":"Place",
  "trigger_h":"Thirty years, a real international reputation, and an identity that looked generic doing it.",
  "trigger_b":"PICA programmed boundary-testing work under a brand that did not match its ambition. The brief was one line: Cultivating the Provocative.",
  "move_h":"A wordmark built from a building.",
  "move_b":"Every glyph is derived from the geometry of PICA’s heritage tower: its curves, angles, and window proportions. The forms are slightly strange but pleasing because they carry the logic of a building, not of typographic convention. And any green is PICA green: in trees, clothing, the work itself.",
  "thesis":"A typeface drawn from one building’s geometry can belong to no other institution, in no other place.",
  "sub":"What cannot be transplanted cannot be copied. That is the whole point.",
  "detail":"The color isn’t in a swatch. PICA green is whatever green is already in the room: the trees, the crowd, the work.",
 },
 {
  "id":"09-national-ballet","name":"National Ballet of Canada","catalyst":"Leadership & Relevance",
  "partner":"Bruce Mau Design","year":2024,"mech_short":"Place",
  "trigger_h":"An identity unchanged in nearly 20 years, in a category with a barrier problem.",
  "trigger_b":"Perceived exclusivity self-selects audiences out before they see a single performance. The brief: demolish the barrier without erasing the gravitas built over decades.",
  "move_h":"The mark and the text are one act.",
  "move_b":"A custom glyph makes the logo and body copy a single continuous typographic action. Type the mark, keep typing, the narrative flows without interruption. A shift to lowercase softens the register; motion is in the system from the start.",
  "thesis":"Make a brand frictionless to deploy, and people use it as designed.",
  "sub":"You engineer the gap between intention and execution out of the system, instead of training around it.",
  "detail":"No lockups to misuse, no clear-space to violate. You type, and the brand is correct by construction.",
 },
]

for c in CAROUSELS:
    path = os.path.join(OUT, c["id"] + ".html")
    with open(path, "w") as f:
        f.write(render(c))
    print("wrote", c["id"] + ".html")
print("done:", len(CAROUSELS), "carousels")
