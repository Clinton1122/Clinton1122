# Ceylon Nooks: traveller dashboard redesign (trial project, v3)

**To view it, open `Ceylon-Traveller-Dashboard.html`.** It's a single self-contained file with the photos embedded, so it works on its own, by email or offline. `index.html` plus the `img/` folder is the editable source.

**Figma file:** [Akila](https://www.figma.com/design/OdrpDe2uSi0tu6Gsb1Rp1L/Akila). It has five pages: Cover; Read me (design decisions); Desktop 1440 (7 numbered sections, 25 frames); Mobile 390 (4 sections, 11 frames); Foundations and components. Frames are named by device, section and step, for example `D 03.2 Step 2 — reason`.

The prototype pretends it's **Thursday 24 Sep 2026, 10:00 in Colombo**:
- The Sigiriya climb is tomorrow, inside the 48-hour window, so cancelling becomes a refund *request* reviewed by the team.
- The Mirissa whale trip is still free to cancel. Cancel it to see the refund (total minus the 5% processing fee) and the list update.

## The idea

The current draft is an account page: a welcome banner, stat boxes, and then the trip. This redesign is built around the **trip**. The night before pickup, a traveller in Sri Lanka needs four things: what time, where, who to call, and what happens if plans change. Everything on the page is ordered by that.

1. **The next trip is the hero.** It uses a full-bleed photo of the place, with a pickup "ticket" on top: the time in large type, a countdown, the meeting point with real Google Maps directions, the host with call and message buttons, and a voucher code to show at pickup.
2. **Clear status, quiet cancel.** Each booking shows one total and either "Free cancellation until …" or "Confirmed". The trip details show a policy timeline from booking to pickup, with the 48-hour line and a marker for now.
3. **Trips in the order people look for them.** **Upcoming** comes first, soonest at the top, below a dashed **Today** line. **Past trips** come next, newest first, with a one-tap star review. **Cancelled and refunds** comes last, with a four-step refund tracker. Category chips (All, Experiences, Stays, Transportation) sit above.
4. **"Your Sri Lanka" map.** A real outline of the island (Natural Earth data) with the trips plotted and joined in date order. Done, next (pulsing), upcoming, cancelled and saved places each look different. Hovering a pin highlights the matching trip, and clicking it opens the details. No other marketplace dashboard has this, and it fits a Sri Lanka-only brand.

## v3: changes from the 7 Oct feedback call

| Feedback | What changed |
| --- | --- |
| Use the live site's font | **Inter** everywhere, in weights 400 to 700. The display font was removed. Neutral greys match the site: ink `#18181B`, body `#3F3F46`, muted `#71717A`, border `#E8E8EB`. |
| Two navigation layers | The **site header is unchanged**: utility bar, logo, ENG/USD, Service, Place to go, Thing to do, Itinerary, search, saved and avatar. No account links are added to it. The account area has its **own second row of tabs**: My bookings, Plan a trip, Saved, Messages, Profile, Settings and payments, Help centre. |
| "My trips" → **My bookings** | Shows everything purchased, with a category filter: All, Experiences, and Stays and Transportation (shown as "Soon" until they launch). |
| **Plan a trip** is a planner | One plan has stops, with a nights stepper for each place, ideas attached to each stop, travel partners and invites. **Get custom offers** lets you request offers from hosts and see each one's status. An offer that is accepted and paid moves to My bookings. Saved ideas can be added to a stop. |
| Cancel is less prominent | Cancel is a muted text link at the bottom of the Cancellation policy panel, after "Try changing the date first". Primary actions are Change date and Add to calendar. In the dialog, **Keep booking** is the primary button. |
| One price total | Each booking shows one total, "Includes taxes and fees". The breakdown (experience, add-ons, VAT when the provider is registered, service fee, coupon) is behind **See price details**. |
| Refund rules | **More than 48h before pickup:** self-serve cancel, refunding the total minus a **5% payment processing fee**. Ceylon Nooks keeps no platform fee. **Inside 48h:** a **refund request**, not a cancellation. It needs a reason (flight delay, illness, family emergency, weather or something else), takes notes and **evidence uploads**, and the team reviews it within 2 working days. The booking stays active meanwhile. The panel is labelled "Ceylon Nooks standard policy" so a provider's own policy can replace it. The policy dialog also covers Book now, pay later. |
| Rounded buttons like the site | All buttons are pills (999px radius), weight 600. |
| Travel partners in Profile | Profile → **Travel partners**: see who has joined, see pending invites, remove people, invite by email. Partners are reused in plans. |
| Empty states | The footer link **"Preview as a new traveller"** switches to a no-bookings account. It shows a welcome card with Explore and Start a plan buttons and popular places, plus empty states for the list, map, plan and saved pages. |
| Mobile | Hamburger drawer with Explore and My account sections, matching the site's mobile header. The account tabs scroll sideways under the greeting. On phones, trip details open full screen with "‹ My bookings". |

## Kept from v2

- Every screen and trip has its own address (`#bookings`, `#plan`, `#trip/sigiriya`, `#profile`). Browser Back closes a trip, and a refresh keeps your place.
- The avatar opens the account menu.
- Add to calendar: a Google Calendar link, an Outlook link and an `.ics` download.
- Change date: shows available days, with fully booked and poya-day prices marked.
- Packing list, day plan and host contact with SLTDA badge.
- The "Your Sri Lanka" map and the "Before tomorrow's pickup" checklist.

## Quality checks

- Responsive at 1440 and 390 px, with no horizontal scroll.
- No console errors across all pages, both cancel flows, the empty-state preview, the plan steppers and the partner invite. Tested in Chromium with Playwright.
- Keyboard: Esc closes dialogs and focus is visible. `prefers-reduced-motion` is respected.

## Still to confirm with Akila

1. Inside 48 hours: can the review approve a partial refund? (The copy currently says "full, partial or none".)
2. Will provider-specific policies be shown in place of the standard panel, or next to it?
3. Book now, pay later: when is the card charged? This decides when free cancellation ends for those bookings.
4. The support number and poya-day surcharge are placeholders.

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
