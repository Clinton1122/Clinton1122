# Partner side of cancellations (Milestone 3)

Designed 25 Nov 2026, in the shell and parts from `../plan`. Figma: page **Partner cancellation**, in seven sections. Each design is clean; the explanations are in section 7.

| Section | Screens |
| --- | --- |
| 1 Reply to a request | Reply page (Agree a refund, half), plus the reply panel for Offer another date, Keep my policy (missing reason), It was on our side, Sent, Window closed |
| 2 Request details and phone reply | Request with our team (desktop), reply on a phone (Agree a refund, Offer another date), reply sent |
| 3 Partner cancels | Cancel a whole day (desktop, from Bookings), cancel one booking (phone) |
| 4 Policy card | Listing form step 4, Custom with 3 tiers, with a live "what travellers will see" preview and the pay later date |
| 5 Messages | New request email, WhatsApp messages, and which event sends what |
| 6 Payouts and statement | Money tab payout with refund lines (on the booking, and after an earlier payout), a payout where refunds are more than earnings (carried forward, phone), monthly statement page 2 with refund lines |
| 7 Notes | How the screens fit together, and how refunds show in payouts and statements |

Already in the plan: the Refunds list (desktop and phone) and the phone Today view and cancel-a-day sheet.

Numbers follow Akila's pricing model (26 Nov): the traveller pays the partner's price + VAT 18% (collected for the partner) + a 10% service fee. The partner receives their price − 10% commission + VAT − the VAT handling fee (4.42% of the VAT). A refund is a percentage of the partner's price; the same percentage of the VAT and service fee goes back too, and 5% of the amount refunded is kept as a processing fee (none when the partner cancels). Commission is 10% in the examples; each partner's own rate is set in admin. Payouts don't show "Traveller paid", a transfer fee or an exchange fee.

Files: `Ceylon-Partner-Cancellation.html` (all screens, standalone), `screens/*.png`, `screens/source.html` and `screens/build.js` (build with the plan's `v2.html` styles).

Partner side of cancellations is complete. Payout files: `Ceylon-Partner-Payouts.html`, `screens/y1-y4.png`, `screens/source-money.html`.
