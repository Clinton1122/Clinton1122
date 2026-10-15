# Ceylon Nooks: Milestone 2

Scope agreed on the 8 Oct call ($250, tools included): homepage redesign, checkout page, category template page, travel tools pages, and listing page fixes (cancellation options, photo gallery, trust badges).

## Pages

Each page has two versions. Open the `Ceylon-…` file: it's a single file with the photos embedded, and the pages link to each other, so you can click from the homepage through to a booking. The lower-case file is the editable build that uses the photos in `../ceylon-traveller-dashboard/img/`.

| Page | Open | What's in it |
| --- | --- | --- |
| Homepage | `Ceylon-Homepage.html` | Homepage v3 (15 Oct): Akila's header, natural search, List your business band |
| Listing | `Ceylon-Listing.html` | Kandy Cultural City Tour, with the booking widget, trust signals, gallery and host badges |
| Checkout | `Ceylon-Checkout.html` | Opens from Reserve now on the listing |
| Confirmation | `Ceylon-Confirmation.html` | Opens after Confirm and pay |
| Category template | `Ceylon-Category.html` | Culture and heritage tours |
| Tools hub | `Ceylon-Tools.html` | All 13 tools; the 7 agreed for this milestone are live, the rest say Soon |
| Tools | `Ceylon-Tool-Quiz.html`, `-Best-Time`, `-Travel-Times`, `-Budget`, `-Visa`, `-First-24-Hours`, `-Packing-List` | One page per tool |

## Akila's feedback, round 2 (15 Oct)

From "Feedback - Homepage, tools and other pages designs". The category template needed no changes.

**Header, on every page.** Akila's existing navigation: logo, flag with "ENG | USD", Service, Place to go, Thing to do, Itinerary, a "Search here.." pill, then Register and Login. When signed in, Register and Login become a heart and the avatar. Each menu item opens a dropdown: hover on desktop, click or keyboard too. In Figma these are N 01 to N 04. On phones the menu is a drawer with the same four sections as accordions.

**Natural search.** The header search and the homepage search understand mixed queries such as "3 day safari near Yala": a trip length, an activity and a place. They show about 10 suggestions: a "Search for …" row, what was understood as chips, then experiences and places. On phones the search icon opens a full-screen search with a clear button.

**Homepage v3.**
- A quieter hero where the search is the focus.
- Search tabs: Experiences, plus Stays and Transportation marked Coming soon.
- Search fields:
  - Explore: "Activity, experience, landmark or tour name…"
  - Start date: "When do you want to go?", with flexible-date chips
  - Travellers: "Add travellers"
- One orange Search button.
- The map stays but is quieter.
- The page has more colour and photography: photo tiles for "Start with what you want to do", a dark "How booking works" band and traveller reviews.
- The planning kit sign-up is gone.
- "List your business" is now a full orange band with benefits and two buttons.
- The homepage is now built from `src/pages/homepage.html` like the other pages.

**Checkout v2.**
- **Steps:** one step at a time with "Step x of 4":
  1. Your details
  2. Pickup
  3. When to pay
  4. Payment method

  A finished step collapses to a summary with Edit.
- **Your details:** prefilled from the account. A "booking for someone else" checkbox adds a separate lead traveller.
- **Pickup:** includes the reassurance note.
- **When to pay:** orange radio buttons, as in the existing design. The cancellation lines follow the choice.
- **Payment method:** card, Google Pay, Apple Pay and Alipay.
- **Summary card:**
  - "Your trip", with a Change link that opens one sheet for the date, time and travellers.
  - The cancellation line.
  - The service fee, with a tooltip.
  - A quiet "Apply promo code" link. To try the messages, use WELCOME10 (valid), EXPIRED20 (invalid or expired) and BIGDEAL (not valid for this service).
- **Trust lines:** the secure wallet line ("We've got your back…"), No hidden fees, Secure payments, and Help when you need it (help.ceylonnooks.com). There is no call-support line.

**Login in checkout step 1 (agreed with Akila, 15 Oct).** Reserve now goes straight to checkout. Login happens in step 1, never before checkout and never after payment.
- Logged out: Continue with Google or Apple, or enter a name and email. The booking is saved to a new account for that email, and the step says so before payment. No password is needed now; the confirmation email has a link to set one, and the confirmation page says the account is ready.
- If the email already has an account, an inline "Looks like you already have an account" box asks for the password, with "Email me a login link" and "Use a different email". Try john.carter@example.com.
- Logged in: the account details are prefilled, with "Not you?" to switch.
- The listing's prototype controls have an Account switch to try both states.

**Confirmation.** No site header or footer, only the logo and a small © line.

## Listing page (13 Oct)

Built on Akila's Kandy Cultural City Tour design from the Previous design page in Figma.

**Booking widget trust signals** follow the trust-link spec (akilaliyanage.com/trust-link):

| Scenario | When | Rows under Reserve now |
| --- | --- | --- |
| 1 | More than 5 days before the start | Free cancellation (opens popup 4) and Reserve now & pay later (opens popup 5) |
| 2 | 48 hours to 5 days before | Free cancellation, plus a grey "Pay now required" row |
| 3 | 48 hours or less, or a non-refundable listing | One amber "Non-refundable" row (opens popup 4, state B) |

- **Popup 4, Cancellation policy:** state A (free cancellation date, the three rules) or state B (non-refundable, exceptional circumstances). Both states show the fee box: booking amount, refund entitlement, 5% gateway fee (minimum USD 1) and the amount returned. All amounts come from the actual booking total.
- **Popup 5, Reserve now & pay later:** the four steps with real dates (today, charge date, start), and what happens if you cancel before or after the charge. Only reachable from scenario 1.
- Both popups are a centred dialog on desktop and a bottom sheet on phones.
- **Host's own policy:** the free cancellation row becomes "Aravinda's cancellation policy" with a short summary and a "Read Aravinda's full policy" link that scrolls to the Cancellation policy section on the page.
- **Cancellation options:** the listing setting is one of Ceylon Nooks policy, host's own policy or non-refundable, plus whether pay later is offered. The widget, the policy section, category cards, checkout and confirmation all read the same setting.
- **Free cancellation ends exactly 48 hours before the start time** (e.g. an 8:00 AM tour on 28 Oct can be cancelled until 8:00 AM on 26 Oct). The spec examples say 11:59 PM; this follows the 48-hour rule we agreed. Flag if Akila prefers the end of the day.
- **Gallery:** the grid opens a full-screen photo tour (one wide photo, then two side by side, no categories for tours). Tapping a photo opens a viewer with a counter, arrows, thumbnails, keyboard arrows and swipe on phones, with a "Swipe for the next photo" hint. On phones the hero is a single photo with "1 / 10" and "Show all 10 photos". Placeholder until the Homely screenshots arrive.
- **Trust badges:** "Registered with Sri Lanka Tourism" (SLTDA) and "Police clearance checked" sit on the host card, and as small badges. Each opens a sheet saying what was checked and when. Both are optional; the card adjusts when a host has one or none.
- **Prototype controls** (bottom left) switch the date scenario, policy type, pay later and host credentials so every state can be reviewed.

## Checkout and confirmation (13 Oct, replaced by checkout v2 above)

- **Checkout** has no site menu: the logo, "Secure checkout" and the booking only, like Airbnb's. Sections: your trip (date, time and travellers editable in place), choose when to pay, pickup, lead traveller, card, cancellation policy, then one confirm button.
- **Choose when to pay:** "Pay now" or "Reserve now, pay later" (USD 0 today, the total on the charge date). Pay later is greyed out within 5 days of the tour. Changing the date shows which dates allow pay later, free cancellation or no refund.
- Errors appear under each field, with a summary above the button. Promo code: try WELCOME10.
- **Confirmation** shows the booking reference, what happens next as a timeline (reminder, charge date, end of free cancellation, host contact, pickup), the receipt, add to calendar (Google, Outlook, .ics), message the host and a link to My bookings.

## Category template (13 Oct)

Culture and heritage tours is the example. The template has:

- the category intro, stats and photos
- sub-category chips with counts
- sticky filters: destination, length, price, free cancellation, pay later, private, SLTDA registered
- sort, "show more" with progress, and an empty state with Clear filters
- good-to-know cards, destinations, FAQ and long-form SEO text

It also carries title and description tags, a canonical URL, and structured data for breadcrumbs, FAQ and the listings shown.

## Trip tools (13 Oct)

All tools share one trip: dates, travellers, places and travel style, set from the dark bar under the header. It's saved in the browser, so answers carry from tool to tool (signed-in travellers would keep it on their account in the build).

- **Traveller quiz:** five questions, then a travel style, a route with nights and tours that fit. Saves the style and route to the trip.
- **Best time to go:** pick months (or use your dates) to see which regions are dry, a month-by-month chart, what's on, and poya days during your trip.
- **Travel times:** car, train and bus times between 17 places, with tips, your route's driving per day (long days flagged) and times from one place to everywhere.
- **Budget:** simple, comfortable or luxury, days and group, plus big-ticket extras. Gives a total range, per person per day, a breakdown and ways to save, in the chosen currency.
- **Visa and entry:** passport, purpose and length of stay give the verdict, cost, stay length, apply-by date, steps and an airport checklist. **The visa rules and fees are sample data and must be checked against eta.gov.lk before launch.**
- **First 24 hours:** a checklist from before you fly to the first night, which changes with landing time and first stop (late arrivals far from the airport are told to stay in Negombo first).
- **Packing list:** built from regions, month and activities, with a reason on each item ("For Ella", "January showers"). Tick, add your own, copy or print.

Travel times, weather patterns and prices are typical figures for the prototype. Poya days are worked out from the full moon and can be a day out.

## Homepage v2 (9 Oct, replaced by homepage v3 above)

Rebuilt on the structure of Akila's homepage demo (akilaliyanage.com/homepage), in the Ceylon Nooks brand: Inter, orange and neutral greys, no green. Decisions agreed with Clinton:

- **Search:** Tours and Activities tabs, searched separately. Stays and transport show a "Soon" tag in the header, the search and the "Start with what you want to do" section, and can't be clicked.
- **Currency switcher** in the header: USD, AUD, EUR, GBP and JPY. Prices on the page convert (rates of 9 Oct 2026, for the prototype only).
- **Hero map:** tap a place to see its region, a short description, the best months and a link to its guide.
- **Sections, in his order:**
  - Trust bar
  - Start with what you want to do
  - Where to go (8 destinations) and Top attractions
  - New on Ceylon Nooks
  - See every cost, plus the founder quote (initials until there's a photo)
  - How booking works
  - Free tools
  - FAQ
  - Search-engine text
  - Planning kit signup
  - List your business
  - Footer
- **Listing cards** show the cancellation policy: free cancellation up to 48 hours before, reserve now pay later, or the host's own policy.
- **Logo:** the real Ceylon Nooks logo (`assets/ceylon-logo.svg`, from the Figma file). Listings and prices are sample content, and photos are Creative Commons stand-ins.

## Old palettes and outdated pages (13 Oct)

- The master Figma file has no colour styles or variables, and no palette swatches apart from the current Foundations page (orange and neutral greys). The AI-generated palettes from the call aren't in this file.
- Green and blue are gone from every Milestone 2 page: policy lines on homepage cards are now orange, and weather "monsoon" is a darker grey.
- In Figma, the "Previous design" page is renamed "(old, reference only, do not build)". The early homepage page is marked superseded by the Milestone 2 page.
- The Developer handoff page has a new "Milestone 2 rules" card.

## How the pages are built

`src/` holds the shared parts (styles, icons, header, footer, currency switcher, booking rules, trip tools) and one template per page in `src/pages/`. Run `python3 src/build.py` to rebuild every page and its single-file copy.

## Photo credits (new photos)

| File | Photo | Licence |
| --- | --- | --- |
| `anuradhapura.jpg` | [Anuradhapura, Jetavanaramaya Dagoba](https://www.flickr.com/photos/67769030@N07/6501713131), Arian Zwegers | CC BY 2.0 |
| `jaffna.jpg` | [Nallur Kandaswamy Kovil](https://www.flickr.com/photos/79721788@N00/44292459955), D-Stanley | CC BY 2.0 |
| `colombo.jpg` | [Kite Flying on Galle Face Green](https://www.flickr.com/photos/58314390@N08/6330794507), Andrew from Sydney | CC BY 2.0 |
| `trincomalee.jpg` | [Trincomalee Beach, Sri Lanka](https://www.flickr.com/photos/43296902@N00/39842113), Dennis S. Hurd | CC0 |

The other photos are credited in the dashboard README.
