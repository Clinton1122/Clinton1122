# Button

Three kinds of call to action, matching the PRD's `[CTA — primary]`, `[CTA — secondary]` and `[CTA — text link]`.

- **Primary** `.lm-btn.lm-btn-primary`: `sun` fill, `on-sun` label. One per section, for the thing the section exists to do ("Find my PowerBox", "Order on WhatsApp"). On light grounds it carries a 1px `ink` border so the yellow reads against white.
- **Secondary** `.lm-btn.lm-btn-secondary`: outline in the ground's ink colour. The alternative route ("See all prices").
- **Text link** `.lm-link.lm-link-arrow`: underlined in `sun`, arrow appended by CSS. For the PRD's "→" links inside body copy.

The consumer provides an `<a>` (navigation) or `<button>` (in-page action) and the label. Labels are the PRD's exact words: verb first, sentence case, no exclamation marks.

Do: stack both CTAs full-width on mobile with `.lm-row.lm-cta-stack`, primary on top. Don't: two primary buttons side by side; yellow buttons on a `sun` ground (use `.lm-ground-sun`, which inverts them to black).
