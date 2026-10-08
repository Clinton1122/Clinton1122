# Header

Global, sticky after 80px of scroll, always on `surface-inverse`.

- **Utility bar** `.lm-utility`: 13px `sun` text, three facts (made in Nigeria, the two phone lines). Static. The PRD asks to keep the old marquee here; this system replaces it with static text, because moving text costs data, can't be read on a phone and fails reduced-motion users. Confirm with the content owner.
- **Main row** `.lm-nav`: wordmark, then Products · Solutions · Prices · Why Lumey · Support · Buy (Products, Solutions, Why Lumey and Buy open dropdowns; Products is a two-column mega-menu, Portable and Heavy Duty). "Prices" stays a top-level link, as the PRD asks. Blog moves to the footer to lighten the row.
- **CTAs**: secondary "Find my PowerBox", primary "Talk to us on WhatsApp".
- Below 1024px everything collapses into `.lm-burger`; the floating WhatsApp button stays visible.

The wordmark is set in type (`display`, 125% width, weight 900) because no logo file was supplied. Replace `.lm-wordmark` with the real logo SVG as soon as it is available. The consumer provides `aria-current="page"` on the active link.
