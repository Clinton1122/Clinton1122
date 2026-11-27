# Lumey Energy: website brand guide

For the developer building the new Lumey website. Everything here matches the Figma file:
https://www.figma.com/design/lyqlofnAeGi7G4MAPSAJ01/Lumey-energy-redesign
(Desktop: page "Desktop (dark) — final". Mobile: page "Mobile (dark) — final".)

Where this guide and Figma disagree, Figma wins. Tell the designer so this guide can be fixed.

---

## 1. Brand in one line

**Maker of Nigeria's best power stations and solar generators.** The site is dark, warm and confident. Yellow is the brand colour, used sparingly so it always means "look here" or "act here".

Slogan (in use until the CEO confirms a final one): **"The future of power, *built here.*"**

---

## 2. Colour

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0B0A08` | Page background |
| `--surface` | `#16130F` | Cards, inputs, footer |
| `--surface-2` | `#211C16` | Raised cards, chat bubbles |
| `--section-alt` | `#201C16` | Every second section panel (see 5. Sections) |
| `--yellow` | `#FEDC22` | Brand yellow: primary buttons, section tags, accents, prices |
| `--ink` | `#14100C` | Text and icons on yellow |
| `--tint` | `#2A220C` | Warm "highlight" panels (commercial, verify, store) with a yellow border at 35–45% opacity |
| `--white` | `#FFFFFF` | Headings. Body text uses white at 65–75% opacity |
| `--warning` | `#FF9933` | Interest and instalment warnings, "to confirm" notes |
| `--whatsapp` | `#25D366` | WhatsApp buttons only |
| `--klump` | `#3340BF` | Klump badge only |

Rules:
- Never put the yellow PowerBox on a flat yellow background. Use a dark card with a yellow outline or a soft yellow glow.
- Never use yellow text on white or white text on yellow.
- Muted text is white at reduced opacity. Do not introduce greys.

---

## 3. Typography

| Role | Font | Desktop | Mobile |
|---|---|---|---|
| Hero headline (H1) | Poppins SemiBold/Bold, −2% tracking, 105% line height | 64–76px | 36–40px |
| Section heading (H2) | Poppins SemiBold/Bold | 56px | 32–36px |
| Card title | Poppins SemiBold | 20–26px | 16–20px |
| Body | Poppins Regular | 16–18px, 145% line height | 14–15px |
| Small / meta | Poppins Medium | 12–14px | 11–13px |
| **Accent words** | **Instrument Serif Italic**, yellow | same size as the heading | same |

The signature style: the second half of most headings switches to *Instrument Serif Italic* in yellow, for example "One box. *Every kind of day.*" Use it once per heading, never in body text.

Fonts: Poppins (400, 500, 600, 700) and Instrument Serif (Italic), both on Google Fonts.

---

## 4. Section labels and headings

The CEO's top priority: **every section must be easy to spot while scrolling.**

Each section opens with a **section header**:
1. A **solid yellow tag** (`--yellow` background, `--ink` text): Poppins Bold, UPPERCASE, 6–10% letter spacing, 12px radius, with a small ink dot on the left.
   - Desktop: 22px text, padding 14px × 24px.
   - Mobile: 15px text, padding 11px × 16px.
2. A **thin yellow line** that runs from the tag to the edge of the section (yellow at 35% opacity, 2–3px high).
3. The section heading (H2) directly below it.

Do not shrink the tags on smaller screens beyond the mobile size above.

---

## 5. Sections, layout and spacing

- **Desktop canvas:** 1440px wide. Content sits inside a 16px page margin (1408px).
- **Mobile canvas:** 390px wide with a 12px page margin.
- **Section separation:** sections alternate between `--bg` (no panel) and a `--section-alt` panel with a 28px radius (24px on mobile). This is what makes each section read as separate.
- **Section padding:** 72px sides and 64–88px top/bottom on desktop; 16–20px on mobile.
- **Radius:** sections 28px, cards 20–24px, small cards and inputs 14–16px, buttons and chips fully rounded (999px).
- **Gap between sections:** 16px (12px on mobile).

---

## 6. Buttons

| Type | Style |
|---|---|
| Primary | `--yellow` pill, `--ink` text (Poppins SemiBold/Bold), with a round ink circle holding a yellow → arrow on the right |
| Secondary | Transparent pill, white text, 1px white border at 18–20% opacity, yellow arrow circle |
| WhatsApp | `--whatsapp` pill, ink text |
| "Add to cart" | Small pill with a cart icon; yellow for accessories, outlined for other models |

Every button needs hover (slight lift + brighter) and focus (2px yellow outline) states. Minimum touch height on mobile: 44px.

---

## 7. Imagery

- **Use real Lumey photos first.** Folders: `design/ai-references/3-people-and-team/` (team and customers), `design/ai-references/5-victor-powerbox-images/` (product shots), and the cut-outs in `design/ai-references/1-product-cutouts-transparent/`.
- **AI images are temporary.** Any image whose PowerBox or people look artificial must be replaced as real project photos arrive (the CEO's instruction). The Gallery page is the place to collect real photos.
- **Product shots** are transparent cut-outs on a dark background with a soft yellow glow behind them.
- **The heavy-duty PowerBox** (the wheeled box) must appear next to the portable ones wherever the full range is shown, so people know Lumey also makes big units.
- **Photo scrims:** text over a photo always has a dark gradient behind it.

---

## 8. Logo

- Yellow mark with "Lumey Energy" in white, on dark backgrounds only.
- In the menu, the tagline "Maker of Nigeria's best power stations and solar generators" sits beside the logo, separated by a thin divider.
- Keep clear space around the logo equal to the height of the mark.

---

## 9. Voice and copy

- Plain, warm, confident. Short sentences.
- Speak to Nigerian reality: "NEPA", "pay small small", "no fuel, no noise".
- Always say **PowerBox** (one word, capital B).
- **Instalments must always say that interest applies** (Klump). This is a CEO requirement.
- Mark unconfirmed figures as "to confirm" until they are real. Never invent numbers.

---

## 10. Motion (suggested)

- Hero carousel: 6–7 seconds per slide, crossfade. Pause when the visitor hovers or touches it.
- On the sunset hero, the sun can rise slowly and the light can shimmer across the panels (CSS only, subtle).
- Respect `prefers-reduced-motion`: turn all of this off.
