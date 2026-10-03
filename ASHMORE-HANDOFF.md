# Ashmore Dentistry Redesign — Full Project Handoff

**Prepared for:** Clinton (Clintontheuiuxguy) — to hand to another AI or designer and continue without loss of context.
**Date:** 3 October 2026
**Status:** Five design directions built. Client has rejected directions 1–2 outright; Clinton has rejected 3–5. **No direction is approved. The project is behind and the hero/art-direction problem is unsolved.**

---

## 0. READ THIS FIRST — the honest state of play

If you are a new AI picking this up: do not start by producing another homepage variant. Five have been built and none landed. The failure is **not** colour, type or layout. It is **photography and art direction**, and secondarily **structure**. Read §6 (what was rejected and why) before writing any code.

The single most important unresolved fact: **the client's reference sites are built on professionally shot studio photography of people. Ashmore has no such photography.** Every direction has tried to close that gap with code, grading and stock. It cannot be closed that way. Either art-direct new imagery properly, or change the design strategy to one that does not depend on photography at all.

---

## 1. The engagement

| | |
|---|---|
| **Client** | Dr George Abdemalek (spelling unconfirmed — may be Abdelmalek), Ashmore Dentistry |
| **Referred by** | Samuel Abdelmalek |
| **Designer** | Clinton — UI/UX designer, brand "Clintontheuiuxguy" |
| **Fee** | A$1,500 |
| **Timeline** | 2 weeks |
| **Payment** | Being resolved via Upwork — **not confirmed as of this handoff** |
| **Scope** | Complete redesign. Homepage + Anxious Patients page are the two core deliverables, plus sitemap/IA, design system, and a Figma handoff file |
| **Client's stated want** | "similar to the other websites I sent you but with Ashmore's feeling… More animations, more prompts etc" |

### Critical client facts (verified, not assumed)
- **Ashmore Dentistry is in Ballarat, Victoria — NOT the Gold Coast.** "Ashmore" is the name of their heritage building, not a suburb reference. Early work wrongly assumed Gold Coast. Do not repeat this.
- Their real tagline, recovered from the existing site: **"Welcome to our house."**
- Brand coral: **`#F58D94`**
- Existing site's visual identity: black-and-white architectural photography of the heritage building
- Payment options they offer: **Zip Pay** and **DentiCare**
- The heritage building is genuinely their strongest owned asset

---

## 2. HARD CONSTRAINTS — these are non-negotiable and carry over

### 2.1 Never invent
Do **not** fabricate, under any circumstances:
- testimonials or patient quotes
- credentials, qualifications, awards
- years of experience
- patient statistics or numbers treated
- treatment outcomes or success rates
- medical or clinical claims
- prices, fees or guarantees

Use **clearly-labelled placeholders** instead. Clinton's instruction was explicit: *"use generic place holders instead of asking for supply."* Placeholders are fine; invented facts are not. Throughout the existing builds these are marked with a `.tbc` class.

### 2.2 The Ahpra / compliance flag
Australia's National Law **s133** restricts the use of **testimonials** in advertising a regulated health service, and there are constraints around **before/after imagery**. Two pages that were approved in the IA depend on these.

**This was raised as a flag, not as legal advice.** George must confirm the position with his own compliance or professional-indemnity adviser. Do not present any version of this as settled legal guidance, and do not design a testimonial-dependent page as if the question is resolved.

### 2.3 Brand mark
**Every deliverable carries the wordmark "Clintontheuiuxguy."** Not "Lumify" — Lumify Studio is Clinton's agency brand and is dormant until the personal brand launches.

### 2.4 The design bar (from a previous client rejection — standing rules)
These came out of a PM rejection on a different project and now apply to everything built for Clinton:
- **No drop shadows**
- **No bordered card grids**
- **No recycled or un-art-directed photography**
- **No demo widgets on client-facing pages**
- Guiding principle: **"the photograph is the interface"**
- Load the `anti-ai-slop-uiux` guidance before designing
- **Never ship Clinton something you have not rendered and looked at yourself.** Render it, open the image, inspect it. This rule exists because it was broken before.

### 2.5 Other
- Keep Clinton's schooling / student status out of all work content unless he asks.
- Dental Boutique's hero video (`Website-header-1.mp4`) was downloaded **for research only.** It must never be reused, republished or shipped.

---

## 3. Reference sites — what they measurably do

George supplied four inspiration sites. Their live computed styles were measured rather than guessed. The decisive finding:

### Dental Boutique's hero is the key insight
Their hero video was pulled and inspected frame by frame. It is **1920×1080, 25fps, 5.2 MB, autoplay / loop / muted**, and it is **not** clinic b-roll and **not** a procedure. It is:

> **A cut sequence of real patients, studio-lit against a black backdrop, each laughing to camera for two to three seconds, then cut.**

The "liveliness" comes from **the cuts between human faces** — not from camera movement, not from effects, not from parallax.

### What this implies
- A dental hero that works is **a parade of human faces**, shot consistently.
- Procedure footage is actively wrong for this audience. Three of four candidate stock clips were rejected for showing masks, blue gloves and open mouths — exactly what a nervous patient does not want to see first.
- The references are about **people**. Ashmore's rejected directions 1 and 2 were both about **the building**. That is precisely why George said they felt the same as his current site.

### George's rejection of directions 1–2, verbatim
> "very similar look to the current website" … "This feels too similar" … "I'd like to make it similar to the other websites I sent you but with Ashmore's feeling" … "More animations, more prompts etc"

---

## 4. Asset inventory

### 4.1 Real Ashmore assets (recovered from their existing site and from Clinton's photos)
Location: `%LOCALAPPDATA%\Temp\claude\C--Users-HomePC-Downloads\e9f7c757-8a17-4f7e-96d0-4528c09d2bf6\scratchpad\web\`

> ⚠️ **This is a session scratchpad and has been observed to clear between sessions.** Durable copies exist in `C:\Users\HomePC\Downloads\ashmore-dentistry-prototype\img\`. **Copy everything somewhere permanent before continuing.**

| File(s) | What it is |
|---|---|
| `logo.png` | Ashmore logo (also `C:\Users\HomePC\Downloads\ashmore logo grey.png`) |
| `hero.jpg`, `hero.mp4`, `hero-poster.jpg` | Hero plate + video derived from Clinton's `IMG_3978.MOV` |
| `elevation.jpg`, `street.jpg`, `verandah.jpg`, `frieze.jpg` | Heritage building — architectural |
| `p-*.jpg` (8 files) | Staff portraits, greyscale, 480×600 |
| `w-*.jpg` (10 files) | Same, warm duotone grade |
| `seq-*.jpg` (8 files) | **Hero-grade 880×1100 uniform frames** for the animated portrait sequence |
| `s-hero.jpg`, `s-consult.jpg`, `s-generations.jpg` | **Unsplash stand-ins**, graded to match. Must be replaced before launch. |

**Staff covered by portraits:** george, aba, anna, david, lauren, plutarch, sam, sophie.

**Name→face mapping was verified from the live site's DOM, not from filenames.** Filenames are camera serials (e.g. `2Y6A2589.jpg` = Dr George). Do not infer identity from a filename.

### 4.2 Known photography defects — the actual blocker
- **Dr Plutarch** — source file is roughly 300px wide. Unusable at hero scale.
- **Dr Anna** — has a **circular mask baked into the pixels**. Cannot be cropped out.
- **Dr David** — shot on a white backdrop while the others are on brick. Inconsistent.
- All staff shots: mixed available light, varying crops, varying distance. No consistent studio look.
- **There is no patient photography at all.** The references are built on it.

### 4.3 Derived colour values (measured for accessibility)
```
--cream:      #FBF6F2
--blush:      #F4E6E1
--ink:        #241E1D
--mute:       #7B6E6B
--faint:      #A99C98
--coral:      #F58D94   /* brand coral — decorative only, fails as text */
--coral-deep: #A93F49   /* accessible coral for text on light backgrounds */
--coral-dark-bg: #FCB4B9 /* accessible coral for text over photography */
--hair:       #E8DAD5
--r: 22px
```
Type: **Newsreader** (300 / 300 italic) display + **Archivo** (400 / 500 / 600) UI.

Hero contrast was measured and fixed: white text went from 2.88:1 to **5.76:1**, coral from 1.25:1 to **3.39:1**, via pooled radial + linear scrims. Method: sample the **brightest** pixel behind the text, convert sRGB→linear luminance, compute worst case. Do not eyeball contrast — measure it.

---

## 5. Deliverables that exist

### 5.1 Published artifacts (all **private** — must be shared from the Share menu before sending to George)
| Artifact | URL |
|---|---|
| Design Direction (strategy doc) | `claude.ai/artifact/QLiq1T373uiBqseZ3nFLYQ` |
| Prototype v1 (9 versions) | `claude.ai/artifact/XNp1jf9pbhjEkKQYpsfDvz` |
| Direction Two — dark cinematic | `claude.ai/artifact/LjYK5C6j4kQsecS3FPmcC6` |
| Direction Three — warm blush | `claude.ai/artifact/Y2v6F5qpY2WmePEGTKo81s` |
| Direction Four — rebuilt architecture | `claude.ai/artifact/A3p73NcngqFPazyAmCmneH` |
| **Direction Five — animated hero (latest)** | `claude.ai/artifact/SNCP9HUhRbhMgkYPiNoCVU` |

### 5.2 Source HTML
`…\scratchpad\ashmore-v5.html` (27 KB) is the current build. `v2`, `v3`, `v4`, `ashmore-prototype.html` and `ashmore-direction.html` are also there.

### 5.3 Figma
File key **`xlk8RSn5P8RPiN3g98hId2`**
| Page | Node | Notes |
|---|---|---|
| `ARCHIVE` | — | Stale html.to.design import, no images |
| `Sitemap & IA` | `20:3` | Complete |
| `Landing Page — Desktop` | `23:3` | 1440×7791, 16 images placed |
| `Components` | — | 9 components built |

Variable collection **`Ashmore / Brand`** = 11 colours + 7 spacing steps.

**Figma work still outstanding:** cover page, foundations documentation, named text and effect styles, variable code-syntax, Code Connect, Button hover/focus states, Team card image-swap property.

⚠️ **The Figma file reflects an earlier direction, not v5.** It is not a current handoff.

### 5.4 Exports in `C:\Users\HomePC\Downloads\`
- `ashmore-dentistry-prototype\` (folder with `img\`)
- `ashmore-dentistry-prototype.zip`
- `ashmore-dentistry-prototype-standalone.html`
- `ashmore-figma-landing-page.png`
- `ashmore-figma-sitemap-ia.png`

---

## 6. What was rejected, and the diagnosis each time

This is the most valuable section. Do not re-walk these paths.

| # | Direction | Rejected by | Reason | Diagnosis |
|---|---|---|---|---|
| 1 | Cream + serif + terracotta | Clinton | *"looks like an AI slop"* | Cream + serif + terracotta is a **named AI-default cluster.** Rebuilt on the real recovered brand instead. |
| 1 & 2 | Building-led | **George** | *"very similar look to the current website… This feels too similar"* | Both were about **the building.** His references are about **people.** |
| 3 | Warm blush | Clinton | *"i honestly do not like this at alll"* | A structured diagnostic question established the cause: **photography and structure**, explicitly **not** colour or type. Clinton's answer: *"The photography is the ceiling, Structure and flow are wrong"* + *"Generate art-directed photography."* |
| 4 | Rebuilt architecture | Clinton | *"this is still not good"* | Architecture improved but hero was static. Request: *"the hero section should be an animation, something lively… it might be a video in the background."* |
| 5 | Animated portrait sequence | Clinton | *"i don't like what you have done"* | **Current failure. Unresolved.** |

### Clinton's escalating pressure — quote these to yourself before shipping anything
> *"i really need to impress him"*
> *"where we are going is still very far so i need you to buckle up"*
> *"do you want me to loose my job"*

**He is exposed on this.** A referral brought him the job; the client is unhappy; the fee is unconfirmed. Treat velocity and visible quality as requirements, not nice-to-haves.

---

## 7. What Direction Five actually does (the thing just rejected)

So you know what has been tried. The hero's right-hand card cycles all nine clinicians: cross-fade every 2.6s, 0.85s fade, 7s slow scale push-in, live caption with name + role, progress dots. Pauses when scrolled out of view or when the tab is hidden. Holds a single frame under `prefers-reduced-motion`.

```html
<div class="seq" id="seq" aria-label="The clinicians at Ashmore Dentistry">
  <img class="fr on" src="img/seq-george.jpg" alt="Dr George Abdemalek"
       data-n="Dr George Abdemalek" data-r="Dentist">
  <!-- 7 more -->
  <div class="seq-dots" id="dots" aria-hidden="true"></div>
  <div class="seq-cap"><b id="seqName">Dr George Abdemalek</b><span id="seqRole">Dentist</span></div>
</div>
```
```css
.seq .fr {
  position:absolute; inset:0; width:100%; height:100%;
  object-fit:cover; object-position:center 20%;
  opacity:0; transform:scale(1.07); transition:opacity .85s ease;
}
.seq .fr.on {
  opacity:1; transform:scale(1);
  transition:opacity .85s ease, transform 7s linear;
}
```
```js
function start(){ if(!reduce && !timer) timer = setInterval(function(){ show((idx+1)%frames.length); }, 2600); }
new IntersectionObserver(function(es){
  es.forEach(function(e){ e.isIntersecting ? start() : stop(); });
}, { threshold: 0.2 }).observe(document.getElementById('seq'));
document.addEventListener('visibilitychange', function(){ document.hidden ? stop() : start(); });
```

Headline: *"You'll know **who you're seeing** before you sit down."* — intended to be self-evidencing, since you watch every face while reading it.

**Why it likely still fails:** the mechanism is correct but the source frames are staff portraits in mixed light, not studio-lit people laughing to camera. It reads as a slideshow of headshots, not as a living hero. **This is the photography ceiling again, in a new costume.**

---

## 8. Reusable technical patterns

### 8.1 Fail-safe scroll reveal
Content must never be parked at `opacity:0` without a guarantee it will be revealed — if JS fails the page goes blank. Opt **in** via a class, with a timeout safety net.
```html
<script>(function(){var ok='IntersectionObserver' in window&&!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);if(ok)document.documentElement.className+=' js-rv';})();</script>
```
```css
.js-rv .rv{opacity:0;transform:translateY(14px);transition:opacity .5s ease-out,transform .5s cubic-bezier(.16,.84,.32,1)}
.js-rv .rv.in{opacity:1;transform:none}
```
Plus `setTimeout(revealAll, 4000)`.

### 8.2 Headless Chrome render (this machine)
```
--headless=new --force-device-scale-factor=1 --window-size=W,H
--virtual-time-budget=... --run-all-compositor-stages-before-draw --screenshot
```

### 8.3 Media processing
ffmpeg / ffprobe for HEIC→JPG, grading (`eq`, `colorbalance`, `colorchannelmixer`), cropping, contact-sheet tiling, H.264 encode, boomerang via `reverse` + `concat`.

---

## 9. Traps — every one of these cost real time

1. **ffmpeg on HEIC rejects `-vf`** — "Filtergraph was specified for a stream fed from a complex filtergraph." Drop `-vf`; scale in a second pass.
2. **Bash heredocs blow up (`ENAMETOOLONG`) on large HTML.** Use a file-write tool, not a heredoc.
3. **Headless Chrome enforces a ~500px minimum window width.** `--window-size=390` renders a 500px layout and crops it, which looks exactly like mobile overflow. A reported "mobile overflow" was a false alarm because of this. **Test real mobile in a 390px-wide iframe**, and verify by injecting a script that reports `viewport`, `scrollWidth` and offending elements.
4. **`vh` units inflate in tall screenshots.** Pin heights via a capture-only stylesheet override.
5. **`sub` is a reserved awk function** — don't use it as a variable name.
6. **Figma `upload_assets` silently no-ops in large batches.** Fourteen uploads all returned `success:true` and none committed. **Batch ≤4 and verify fills after every batch.** Multipart `-F` fails; use `curl --data-binary` with an explicit Content-Type.
7. **"Images not showing" was a stale desktop-app image cache**, reported three times, verified correct four ways. Small files loaded, large ones didn't. Fix: `Help → Troubleshooting → Clear cache and relaunch`.
8. **Figma auto-layout containers default to white fills** — clear them on structural frames.
9. **Figma CSS specificity collisions** — `.proof-grid b` beat `.tbc`; needed `.proof-grid b.tbc` and `.team span.tbc`.
10. **A `max-width` on an element that also carried `.shell` won**, producing a 6-line h1 with a mid-word hyphen break and a tagline clipped under the nav. Put the constraint on the h1 itself; use a non-breaking hyphen `&#8209;`.
11. **The scratchpad `assets\` folder cleared between sessions.** Recover from `web\` or `Downloads\ashmore-dentistry-prototype\img\`.
12. **`python` on this machine is a Windows Store stub.** It does not run.
13. **Higgsfield: 0 credits, free plan.** Generation via it is unavailable.

---

## 10. Open questions — George must answer these

Design decisions are blocked on them. Chase them in writing.

1. **Booking platform** — which system, and can it be embedded or only linked?
2. **Sedation / sleep dentistry** — what does it clinically involve at Ashmore? Needed for the Anxious Patients page and it must not be invented.
3. **After-hours emergency rule** — what actually happens when someone calls at 9pm?
4. **Ahpra position** — his compliance / indemnity adviser's answer on testimonials and before/after imagery. **Two approved pages depend on this.**
5. **Team roster reconciliation** — Rebecca Smith vs Samantha Georgeallis (conflicting); Dr Sam Saeed appears only as a filename with no profile.
6. **Higher-resolution portraits** for Dr Plutarch and Dr David. And ideally a reshoot of all nine.
7. **Sign-off on the added Payment & Plans page** (proposed, not in the original brief).
8. **Correct surname spelling** — Abdemalek or Abdelmalek?

---

## 11. The recommended next move

The photography gap is the long pole and five rounds of code have not closed it. Two viable paths:

**Path A — fix the input.** One studio afternoon: nine staff against a seamless backdrop, consistent lighting, plus a handful of consenting patients. A shot list, lighting setup and direction notes were offered to Clinton but not yet written. This is the only route that genuinely matches the references. It costs George money and a day, so it needs selling.

**Path B — change the strategy.** Design something that does not depend on photography it does not have: typographic, motion-led, illustrative, or built on the heritage architecture as *texture* rather than as *subject*. Weaker against the references but deliverable inside two weeks with existing assets. **Note that building-led framing already failed with George once** — any architecture-based approach must be structurally different from directions 1–2, not a re-skin.

**Also still owed regardless of path:** the **Anxious Patients** page. It is half the brief's value and has never been built. A direction that holds across two pages is far more convincing than a sixth homepage. There is an open question Clinton has not answered: port the chosen direction into Figma first, or build Anxious Patients first.

### If you are the next AI, start here
1. Copy the asset folders somewhere permanent (§4.1) — the scratchpad is volatile.
2. Read §6 so you do not rebuild a rejected direction.
3. Ask Clinton to choose **Path A or Path B** before writing any code. Do not produce a sixth unbriefed homepage.
4. Render and visually inspect anything before showing it to him (§2.4).

---

*Prepared for Clinton — Clintontheuiuxguy*

---

## 12. Corrections and new facts — 3 October 2026 (checked against the live site and the WhatsApp brief)

Source: `ashmoredentistry.com.au` homepage, read 3 Oct 2026, plus the original WhatsApp thread with George.

### Resolved from the live site
- **Surname:** the clinic's own site spells it **Abdemalek** everywhere. Use that unless George corrects it. (§10 Q8)
- **Team roster (9 clinicians):**
  - Dentists: Dr George Abdemalek, Dr Anna Taylor, Dr Aba Saeed, Dr Plutarch Deliyannis, Dr Sam Saeed, Dr David Attia (Dental Surgeon)
  - Oral Health Therapists: Lauren Rodda, Sophie Norden, Samantha Georgeallis
  - **Rebecca Smith is not on the site.** Dr Sam Saeed *is* listed. (§10 Q5 mostly resolved)
  - The 8 portrait sets (§4.1) cover everyone **except Samantha Georgeallis**. That explains the 8-vs-9 mismatch in §7.
- **Booking:** there's no third-party booking widget. "Book Now" jumps to `#contact`, which only lists phone, email and address. Unless George uses an unlisted system, booking is by phone or email today. (§10 Q1 is now a simpler question: "Do you want online booking added, and through which system?")
- **Contact:** 11 Drummond Street South, Ballarat 3350 · (03) 5331 1959 · hello@ashmoredentistry.com.au
- **Hours:** Mon–Wed and Fri 8:45am–6pm, Thu 8:45am–8pm (as published on the site; confirm with George before using)
- **Services (13):** Hygiene + Prevention, Crowns + Veneers, Invisalign, Kids Dental, Wisdom Teeth, Sleep Dentistry, Emergency Treatment, Bleaching, Braces, Anxious Patients, Implants, Fillings, Root Canals
- **History (published by the clinic, safe to reuse):** Ashmore House was built during Ballarat's gold rush in the late 1800s. The practice has served the community for 35 years and rebranded in 2019 from Ballarat Essential Dental.
- **Live-site tagline:** "Creating a family practice that will last a lifetime."

### Not confirmed
- **"Welcome to our house."** §1 says this was recovered from the existing site, but it doesn't appear in the homepage text. It may be in an image or on an older version. Confirm with George before treating it as his tagline.
- **Sleep Dentistry, Anxious Patients and Emergency Treatment** appear only as labels, with no description. §10 Q2 and Q3 are still open.

### From the WhatsApp brief
- George asked for a **complete multi-page site**, not a better single landing page. Five homepage directions and zero inner pages is the wrong balance for what he asked for.
- **Deposit:** 60% upfront (A$900) was invoiced through Upwork to Accounts@ashmoredentistry.com.au. The thread ends with George unable to find where to accept it. **Treat the deposit as unpaid until Upwork shows it funded.** Resolve this before more design rounds.
- Clinton's asset request asked George for **patient testimonials and before/after images**. George may send them expecting them to be used, so tell him about the Ahpra flag (§2.2) *before* he spends time collecting them.
- Timeline: kickoff was about 4 Sept on a 2-week timeline. As of 3 Oct the project is about two weeks over.
