# WhatsAppButton

WhatsApp is the checkout for this business, so it gets the primary treatment, not a support-link treatment.

- Inline: a primary `.lm-btn` with the chat icon (`.lm-wa-icon`) and a label from the PRD ("Talk to us on WhatsApp", "Order on WhatsApp", "Send this result to us on WhatsApp").
- Floating: `.lm-wa-fab`, 56px `sun` disc with a 2px `ink` ring and `shadow-float`, fixed bottom-right and lifted by the safe-area inset. On mobile it is the only part of the header that never collapses into the menu. Give it `aria-label`.

The consumer provides the `wa.me/2347062878273` link with a pre-filled `?text=` naming the model, the chosen option (box only or with panels), the price and the page URL, so sales can see where the chat came from.

The icon is a generic chat glyph, not WhatsApp's trademark logo; swap in the official asset only from WhatsApp's brand resources.
