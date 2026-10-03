# Ceylon Nooks: traveller dashboard redesign (trial project, v2)

Open `index.html` in a browser. It's one file plus the `img/` folder, with no build step.

The prototype pretends it's **Thursday 24 Sep 2026, 10:00 in Colombo**:
- The Sigiriya climb is tomorrow, inside the 48-hour window, so cancelling becomes a refund *request*.
- The Mirissa whale trip is still free to cancel. Cancel it to see the full-refund flow and the timeline update.

## The idea

The current draft is an account page: a welcome banner, stat boxes, and then the trip. This redesign is built around the **trip**. The night before pickup, a traveller in Sri Lanka needs four things: what time, where, who to call, and what happens if plans change. Everything on the page is ordered by that.

1. **The next trip is the hero.** It uses a full-bleed photo of the place, with a pickup "ticket" on top: the time in large type, a countdown, the meeting point with real Google Maps directions, the host with call and message buttons, and a voucher code to show at pickup.
2. **The money is up front.** Instead of policy text, every upcoming trip says what you'd get back if you cancelled now: "$384.00 back" or "ask for up to $384.00". The trip details show a timeline from booking to pickup, with the 48-hour line and a marker for now.
3. **One timeline instead of three tabs.**
   - Trips run in date order with large day numbers and a dashed **Today** line.
   - Past trips sit above it, with a one-tap star review.
   - Cancelled trips stay where they were, greyed out, with a four-step refund tracker.
   - A quiet filter (All / Upcoming / Past / Cancelled) is there for travellers with many bookings.
4. **"Your Sri Lanka" map.** A real outline of the island (Natural Earth data) with the trips plotted and joined in date order. Done, next (pulsing), upcoming, cancelled and saved places each look different. Hovering a pin highlights the matching trip, and clicking it opens the details. No other marketplace dashboard has this, and it fits a Sri Lanka-only brand.

## What the meeting asked for

| From the call | Where it is |
| --- | --- |
| Upcoming trips | Hero ticket and timeline |
| Purchased add-ons, service fee | Trip details → **What you paid** (add-ons listed, fee explained in one line) |
| Host contact | Ticket and trip details: call, message, SLTDA licence badge |
| Calendar integration | **Add to calendar** has a real Google Calendar link, an Outlook link and a downloadable `.ics` with a 30-minute alarm |
| 48-hour cancellation policy | Refund amount on every trip, the policy timeline, and a "How refunds work" dialog |
| Cancel flow | 3 steps: what you get back → reason → confirm. The wording and amounts change inside and outside 48 hours |
| Reschedule | **Change date**: pick from available days, with fully booked and peak-price days marked |
| Chat stays as built | The Messages tab is a placeholder for the existing chat. Trip buttons deep-link into the right thread |
| Match the current theme | Only the style guide's tokens: `--cn-*` colours, Bricolage Grotesque and Manrope, radius scale 8/12/18/22 |

Also included:
- A tickable packing list for each trip.
- A day plan with times.
- A "Before tomorrow's pickup" checklist, which is what drives the 40% profile completion.
- A copy button for the booking number.
- Plan a trip (saved places), Profile and Settings.

## Quality checks

- Responsive at 1440, 900 and 390 px, with no horizontal scroll. On phones the ticket moves below the photo.
- Keyboard: arrow keys move between tabs, Esc closes dialogs, focus is visible, and map pins can be reached with Tab.
- `prefers-reduced-motion` turns off the pulse and the sliding panel.
- No console errors.

## To confirm with Akila

1. **Inside 48 hours:** the traveller can *request* a refund, the host decides within 24 hours, and the service fee is kept. Outside 48 hours: automatic full refund, fee included.
2. The host's phone number appears 24 hours before pickup, as in the current draft.
3. The support number (+94 11 200 0000), the peak-day surcharge and the reschedule rules are placeholders.
4. Photos below are Creative Commons stand-ins until listing photos are wired in.

## Photo credits

| File | Photo | Licence |
| --- | --- | --- |
| `img/sigiriya.jpg` | [Sigiriya Rock](https://www.flickr.com/photos/78898908@N00/5505127124), Santhosh Janardhanan | CC BY-SA 2.0 |
| `img/mirissa-whale.jpg` | [Blue whale](https://www.flickr.com/photos/61554530@N02/7278365288), Kenny Ross | CC BY 2.0 |
| `img/ella-nine-arch.jpg` | [Nine Arch Bridge, Ella](https://www.flickr.com/photos/63503049@N03/54059115555), travelourplanet.com | CC BY 2.0 |
| `img/kandy-temple.jpg` | [Temple of the Tooth](https://www.flickr.com/photos/47850033@N08/41814880980), Nithi clicks | CC BY 2.0 |
| `img/galle-fort.jpg` | [Alley in Galle Fort](https://www.flickr.com/photos/19396720@N00/6753207585), Gane | CC BY 2.0 |
| `img/adams-peak.jpg` | [Adam's Peak](https://www.flickr.com/photos/60210556@N03/6945753283), Lakpura LLC | CC BY 2.0 |
| `img/pidurangala.jpg` | [Pidurangala Rock](https://www.flickr.com/photos/60210556@N03/7821826468), Lakpura LLC | CC BY 2.0 |

Island outline: Natural Earth 1:10m, public domain.
