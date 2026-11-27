# Partner dashboard: the rest of the tabs (27 Nov 2026)

In Figma on the page **Partner dashboard**, in 8 sections. The screens use the same header, tab tray and tokens as the cancellation screens.

| Section | Screens |
|---|---|
| 1 · Today | What needs the partner first, at full size (refund reply with its countdown, unanswered message), then today's trips by time, next payout, a weather warning and this week's numbers. Desktop and phone. |
| 2 · Bookings and a booking | Upcoming bookings grouped by day; a booking's page with facts, the traveller, the policy as dates with a "Today" marker, notes for the team and the money receipt (pricing model). Phone: bottom of the booking page. |
| 3 · Cancelling an accepted booking | Akila asked for this, made hard to reach (see below). |
| 4 · Listings | Live, with our team, draft (progress) and paused. |
| 5 · Messages | Inbox, thread with quick replies, booking context on the right. |
| 6 · Money | Statements (monthly PDFs, year totals for VAT, commission and VAT handling fee) and Bank details (changes checked by our team). Payouts were designed earlier. |
| 7 · Account | Business and VAT details, WhatsApp and email settings per message type, team roles. |
| 8 · Notes | How the tabs link, the cancel flow and questions for Akila. |

## Cancelling an accepted booking (deliberately hard to reach)

1. The booking page has no cancel button. Only a grey line at the very bottom: "Something wrong with this booking? Get help with this booking".
2. **What's the problem?** lists alternatives first: move to another date, change guide or vehicle, message the traveller, cancel a day for weather, ask our partner team. "Cancel this booking" is a quiet link below them.
3. **Cancel form:** reason and a note are required, proof optional. It shows what happens (traveller gets everything back with no fee, partner isn't paid, the slot closes, this is their Nth cancellation in 12 months), and the partner must type the booking reference and tick a box.
4. Within 48 hours of the trip, online cancelling is blocked: the partner has to call the partner team.
5. After sending, our team checks within 2 hours and may call to save the booking. The traveller is only told and refunded once our team confirms.

## Open questions for Akila

- Should our team check every partner cancellation (as designed), or should it be instant?
- Is 48 hours the right cut-off for "call us instead"?
- What happens after repeated cancellations (design says listings are reviewed at 3 in 12 months)? Any penalty fee?
- Whole-day weather cancellations don't count against the partner. Agreed?
- The partner team phone and WhatsApp numbers are placeholders.

## Files

- `gen_dash.py` generates `dash.html`; build and render with the plan folder's `build4.js dash` (same pipeline as the other boards).
- `screens/dash-z1.png` to `dash-z15.png`.
