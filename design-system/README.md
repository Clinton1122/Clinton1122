Lumey Energy makes PowerBox solar generators in Akure for Nigerian homes and businesses. The site sells eight models at published prices, mostly to people on a phone, and closes the sale on WhatsApp. Everything here serves three jobs: show the price, help people pick the right size, and prove the company is real and reachable.

## Voice

Bold, plain-spoken Nigerian English. Concrete over vague. Write it the way the PRD does.

- Lead with the reader's problem (fuel, generator noise, NEPA, imported solar nobody can fix), then the Lumey answer. *"You are not paying for electricity. You are paying to survive without it."*
- Use real numbers: naira with the ₦ symbol and thousands separators (₦700,000, not 700k or N700,000), watts, watt-hours, appliances by name. *"Runs your fridge, freezer, microwave, washing machine and induction cooker."* Never "efficient energy solutions".
- Local words people use: NEPA, wahala, "pay small small", keg, compound, hostel.
- Say what a model doesn't do as clearly as what it does. Every product row has "Not for".
- Sentence case for headings and buttons. No exclamation marks, no emoji, no "No 1 in Nigeria", no invented stats or testimonials. A missing fact stays out of the page; it is never filled with a placeholder.
- Buttons are verb-first and say where they lead: "Find my PowerBox", "Order on WhatsApp", "See all prices".

## Colour

Black, white and one yellow. The page alternates `surface` (white), `surface-alt` (light grey) and `surface-inverse` (black) sections; at most one section per page is full `sun` (the sizing band, `.lm-ground-sun`).

- Text: `ink` and `ink-muted` on `surface`, `surface-alt` and `sun-soft`; `ink-inverse` and `ink-inverse-muted` on `surface-inverse` and `surface-inverse-raised`; `on-sun` (always black) on any `sun` fill.
- `sun` is a fill and an accent. It may be text only on black (headings in black cards, stat figures, the utility bar). Yellow text on white fails contrast: use `sun-ink` there.
- `sun-soft` tints price columns and the highlighted model in comparison tables.
- `alert` and `alert-soft` are for the troubleshooting safety panel and form errors only.
- Every text pair above meets 4.5:1 in both themes. The dark theme exists so the system holds up in dark mode; the site launches in light, with the black sections giving it its contrast.

## Type

Three faces from Google Fonts. Self-host them at build time (subset to Latin plus ₦) so a phone on mobile data fetches about 100KB once.

- `display` (Archivo, at 112–125% width): headings and prices only. Styles `display-xl`, `display`, `heading-2`, `heading-3`, `heading-4`, `price-xl`, `price`. Headings get `text-wrap: balance`.
- `sans` (IBM Plex Sans): everything people read. `body` (16px; never smaller on mobile), `body-lg` for subheads, `body-strong`, `small` for footnotes.
- `mono` (IBM Plex Mono): the spec-plate voice. `label` (uppercase, 0.08em tracking) for eyebrows, series names and table headers; `spec` for ratings like `2kW (2.5kVA) · 2,600Wh`.
- Every price and every column of figures uses tabular numerals. Prices are set heavier than the text around them and are never grey.
- Running text stays within `measure` (65ch).

## Space, shape and layout

- 4px base. `space-4` is the mobile gutter, `space-8` the desktop gutter. Sections are padded `space-16` on mobile and `space-24` on desktop. Content maxes out at `content-max`.
- Lumey is square: `radius-0` for sections, cards, tables and product rows; `radius-sm` for buttons, inputs and chips; `radius-full` only for the WhatsApp button and step markers.
- Borders, not shadows. `shadow-float` is only for things that float over content: the sticky buy-bar, the WhatsApp button, open menus.
- The 2px `sun` rule under an H1 (`.lm-rule`) and the 2px `sun` top rule on capability blocks are the brand's recurring mark.
- Every tap target is at least `tap-min` (44px). Comparison tables scroll sideways inside their own container with the model column frozen; the page body never scrolls sideways.

## Components

The components are CSS (`components/bundle.css`, prefix `lm-`) over plain server-rendered HTML; there is no JavaScript bundle. Load `tokens.css`, then `bundle.css`. Small scripts are allowed only for the series tabs, the price toggle, the sticky bar and the sizing tool, and each must still work without JavaScript: both prices and every FAQ answer are always in the HTML.

Put a component on a ground by wrapping its section in `.lm-ground`, `.lm-ground-alt`, `.lm-ground-inverse` or `.lm-ground-sun`; buttons, links and focus rings adapt to the ground.

## Imagery

Real Nigerian homes, shops and the Akure production floor only. Never stock: one reverse image search that lands on a stock library costs more trust than the photo earns.

- Product shots: three-quarter studio angle, the same for every model; black backgrounds for heavy duty, light for portable; put a person or a doorway in at least one heavy-duty shot for scale.
- In-context shots: daylight or warm indoor light, the appliances visibly running, the unit present but not posed.
- Until a photo exists, its slot shows the PRD's filename (for example `lumey-powerbox-2600-kitchen-running.jpg`), never a substitute.
- Serve AVIF or WebP with `srcset`, at most 1600px wide; the hero image is the only one loaded eagerly.

## Iconography

Almost none. The PRD rules out icons on the problem cards and capability blocks; use the large numeral or the yellow rule instead. The only icons are functional ones: the WhatsApp chat glyph, menu, plus and minus on the FAQ, arrows on text links. Draw them as 2px-stroke inline SVGs in `currentColor`.

No logo file was supplied, so the wordmark is set in type ("LUMEY" in `display` at 125% width, weight 900, with a `sun` full stop). Replace it with the official logo SVG when it arrives; nothing else here depends on it.

## Motion

Quiet and brief. Sections fade up 16px over 300ms with an 80ms stagger between cards; stat figures count up once. Everything is visible at rest before any animation runs, and `prefers-reduced-motion` turns all of it off. No marquees, carousels that auto-advance, autoplay video or parallax over 8%.

## Focus and accessibility

- Keyboard focus is a 2px solid `focus` ring with a 2px offset. On black grounds the ring is `focus-inverse` (yellow); on yellow fills it is black.
- Status and warnings never rely on colour alone. The alert panel carries a "!" marker and a written title, and "Not for" lists are written words.
- Phone numbers and addresses are selectable text with tap-to-call links.
