# Ceylon Nooks: Traveller dashboard revamp (trial project)

A clickable prototype of the tourist account dashboard. It covers the trial scope agreed with Akila Liyanage on 3 Oct 2026: 1 week, USD 80, invoiced in AUD.

Open `index.html` in any browser. It is one self-contained file with no build step. Fonts load from Google Fonts.

## Scope from the call → where it lives

| Asked for in the meeting | In the prototype |
| --- | --- |
| Upcoming trips | Next-up card plus the **Upcoming / Past / Cancelled & refunds** list |
| Purchased add-ons and service fee | Trip drawer → **Price breakdown** (base, `+` add-ons, service fee, total, card) |
| Host contact details | Host row on the next-up card and in the drawer. The number shows 24 h before pickup and also goes on the offline voucher |
| Calendar integration | "Add to calendar" menu (Google / Apple .ics / Outlook), mini calendar with trip days, "Sync all trips" |
| 48-hour cancellation policy | Policy timeline (booked → 48 h cut-off → trip) on every upcoming trip, green or amber depending on state |
| Cancel flow | 3 steps: impact → reason → confirm, ending on a success screen. The copy changes inside and outside the 48 h window |
| Reschedule flow | "Change date" modal with available, fully booked and peak-price slots |
| Chat stays untouched | The Messages tab is a placeholder for the existing chat module. Trip cards deep-link into it |
| Match the current theme | Uses only the tokens from the Ceylon style guide: `--cn-*` colours, Bricolage Grotesque + Manrope, radii 8/12/18/22/pill |

## What's new compared to the AI draft

- **Countdown strip** in the hero ("Sigiriya sunrise climb in 18 h 30 min · set an alarm for 4:00 AM").
- **Visual cancellation timeline** instead of a single line of text, so the traveller sees where "now" sits against the 48 h cut-off.
- **Voucher with QR**, saved for offline use. Useful where data is patchy outside the main towns.
- **Day plan / itinerary** inside the trip drawer.
- **Refund tracker** on cancelled trips (Requested → Host approved → Sent to card → In your account).
- **Review prompt** with inline star rating on past trips, plus "Book again".
- **"Before you go" checklist** that drives the 40 % profile completion: phone, emergency contact, dietary needs.
- **Help panel**: cancellation explainer, support chat, 24/7 phone line.
- Profile and Settings tabs (reminders tied to the 48 h cut-off, WhatsApp, calendar auto-sync, currency, cards).
- Responsive down to 390 px with no horizontal scroll. Keyboard-friendly tabs, Esc closes dialogs, visible focus rings.

## Assumptions to confirm with Akila

1. **Refunds within 48 h**: modelled as "request a refund; the host decides within 24 h; the service fee is kept". Outside 48 h: automatic full refund including the fee.
2. **Host phone**: shown 24 h before pickup, as in the current draft.
3. The **support phone number** and **reschedule rules** (host confirms; price difference on peak days) are placeholders.
4. **Plan a trip** is shown as "Coming soon" with saved ideas. Its full design is out of trial scope.
5. **Photos**: illustrated placeholders stand in until real listing photos are wired up.

Mock "now" in the prototype is **Thu 24 Sep 2026, 10:00 (Colombo)**, so Sigiriya is tomorrow and inside the 48 h window, and Mirissa is still free to cancel. Try cancelling each one to see both paths.
