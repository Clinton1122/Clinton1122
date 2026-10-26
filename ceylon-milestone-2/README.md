# Ceylon Nooks: Milestone 2

Scope agreed on the 8 Oct call ($250, tools included): homepage redesign, checkout page, category template page, travel tools pages, and listing page fixes (cancellation options, photo gallery, trust badges).

## Pages

Each page has two versions. Open the `Ceylon-…` file: it's a single file with the photos embedded, and the pages link to each other, so you can click from the homepage through to a booking. The lower-case file is the editable build that uses the photos in `../ceylon-traveller-dashboard/img/`.

| Page | Open | What's in it |
| --- | --- | --- |
| Homepage | `Ceylon-Homepage.html` | Homepage v4 (17 Oct): Experiences search, map with place card, dark trust bar, Akila's copy |
| Listing | `Ceylon-Listing.html` | Kandy Cultural City Tour, with the booking widget, trust signals, gallery and host badges |
| Host profile | `Ceylon-Host-Profile.html` | Aravinda's public profile, opened from "View profile" or "Hosted by Aravinda" on the listing |
| Checkout | `Ceylon-Checkout.html` | Opens from Reserve now on the listing |
| Confirmation | `Ceylon-Confirmation.html` | Opens after Confirm and pay |
| Category template | `Ceylon-Category.html` | Culture and heritage tours |
| Tools hub | `Ceylon-Tools.html` | All 13 tools; 8 are live (the 7 agreed for this milestone plus Phrase cards), the rest say Soon |
| Tools | `Ceylon-Tool-Quiz.html`, `-Best-Time`, `-Travel-Times`, `-Budget`, `-Visa`, `-First-24-Hours`, `-Packing-List`, `-Phrase-Cards` | One page per tool |

## Akila's feedback, round 7 (26 Oct)

- **Input fields in dark mode** were hard to tell apart from their cards. Every field now has its own lighter fill (`--dk-field`) and a border at 3:1 contrast (`--cn-input` is now #6B6B73 in dark). Fields drawn as a box rather than a bare input (the header search, the homepage search bar, the booking widget's date and travellers box, the checkout card number box) get the same treatment. Light mode is unchanged. The rules are at the end of the dark block in `src/base.css`.
- **Payment status on the traveller dashboard:** see "v6" in `ceylon-traveller-dashboard/README.md`.

## Akila's feedback, round 6 (24 Oct): host profile page

Akila was happy with everything but couldn't see where the host's details and badges go after "View profile". That page is now designed: `Ceylon-Host-Profile.html` (`src/pages/host-profile.html`).

- **Opens from the listing:** "View profile" in the Your host card, and "Hosted by Aravinda" under the title. The listing's prototype setting for host credentials carries over (`?c=both`, `sltda` or `none`), so both pages show the same badges.
- **Host card** (left, stays in view on desktop; at the top on phones): photo or initials with the verified tick, name, "Licensed guide in Kandy", the badges, rating, reviews, years hosting, usual reply time, Message and Share, and the "always pay and message through Ceylon Nooks" note. On phones, Message also sits in a bar at the bottom.
- **About:** the host's own words, where they live, languages, guiding since, and their vehicle.
- **Checked by Ceylon Nooks:** one row per check, with what was checked and the date:
  - ID verified (every host, required to take bookings)
  - Sri Lanka Tourism (SLTDA) registration: licence type, registration number, valid until
  - Police clearance: issued by and issue date
  
  "Details" opens the same popup as the listing's badges. A credential the host hasn't shared stays on the list, greyed out with "Not shared", so travellers can see it's optional rather than missing. "How we check hosts" explains the rules: optional documents, checked with the issuer, re-checked on expiry, documents never shown.
- **Tours by Aravinda:** all their tours as cards (a swipe row on phones). The Kandy tour links back to the listing.
- **Reviews:** 412 across all their tours, in the same style as the homepage reviews, each naming the tour it was for, with host replies.
- **Prototype controls:** Host credentials (Both, SLTDA only, None).
- **Figma:** L 09 to L 09b in section 02 (desktop: full page, SLTDA details, police clearance not shared), M L 09 to M L 09b in section 03 (phone: first screen with the Message bar, full page, police clearance details), and DK L 09 and DK M L 09 in section 08 (dark).
- Light and dark, desktop and phone. The credential popup now lives in `src/booking.js` (`CRED`, `popCred`) so the listing and the profile share it.

## Call with Akila, round 4 (22 Oct)

- **Tidiness pass:** every page and every Figma frame was checked for text running together and shifted layout.
  - Trust-link titles and their text now sit on separate lines on the listing, checkout and confirmation. "Details" on the checkout cancellation line sits on its own line too.
  - The hosts band icons sit centred in their circles, and the receipt barcode is drawn as real bars.
  - The explore tile captions have stronger contrast.
  - Headings have slightly looser letter spacing and line height.
- **Mobile breadcrumb:** on phones the breadcrumb stays on one line and scrolls sideways. It opens scrolled to the current page, with a fade on whichever side has more. Short trails that nearly fit don't scroll.
- **Back to results:** a search from the homepage or header opens the category page with the results. Any listing opened from there shows "Back to results" in front of the breadcrumb, which returns to the same search. A listing opened any other way has no back link.
- **Figma:** all Milestone 2 frames were replaced with the tidied versions. M L 06 and M L 07 show the new breadcrumb, and the "Read me — round 4" frame summarises this round.
- **Dark mode:**
  - **Switch:** a sun and moon button in the header (desktop and checkout), and a "Dark mode" switch in the phone menu.
  - **Default and memory:** it follows the device setting until the traveller picks one, then remembers the choice on every page. Add `?theme=dark` or `?theme=light` to any page address to force one.
  - **Look:** brand orange is unchanged and photos are dimmed slightly. Light mode looks exactly as before.
  - **How it's built:** hard-coded light colours are written as `var(--dk-name, light colour)`, and the dark values are defined once at the end of `src/base.css`. A small script in `<head>` sets the theme before the page paints, so there's no white flash.
  - **Figma:** section 08 has 13 dark frames: homepage, header dropdown, listing, popup 4, checkout steps 1 and 4, confirmation and the visa tool on desktop; homepage, menu, listing, checkout and packing list on phones.
- **Edge scrolling on phones** (Akila's carousel point from the call):
  - **The rule:** a row that continues runs off the screen edge, so the next card or photo is cut off square there. The normal padding only appears at the row's real start and end, so a row never looks finished while more is to come.
  - **New swipe rows on phones:** Freshly Added Experiences, the reviews, More tours from Kandy, and the listing photos. The photos now swipe, with the next one peeking and a "+5 more" tile at the end that opens the photo tour. The counter follows the swipe.
  - **Rows that already scrolled:** the category chips and the breadcrumb follow the same rule. Next to "Back to results", the breadcrumb fades into the button instead. Rows inside a box, like the best time table and the photo viewer thumbnails, fade on the side that continues.
  - **Fixed along the way:** the viewer thumbnails were centred, so the first few couldn't be reached when they overflowed. They now start at the first photo.
  - **Code:** classes `.xs`, `.bleed`, `.fade` and `.xcar` in `src/base.css`. `edgeRows()` in `src/base.js` tracks which side has more.
  - **Desktop:** looks exactly as before.
  - **Figma:** section 09 shows each row at its start and end. The phone frames for the homepage, listing, breadcrumb and category (and the dark homepage and listing) were replaced.
- **Visa tool states** (Akila: it didn't show what happens with no selection and with one):
  - **Before anything is chosen:** the tool opens with nothing chosen. The result card says "Answer three questions to see your result". The cost, length of stay and apply-by boxes show dashes, and a short to-do list links to each question.
  - **While answering:** each question says "Not answered", then "Done" with a tick. A bar counts "x of 3 answered". The chosen passport gets an orange outline, and the chosen answers are filled with a tick.
  - **When all three are answered:** the full result, How to apply and the airport checklist appear.
  - **Memory:** answers are remembered, and "Start again" clears them. Arrival date is marked optional.
  - **Figma:** T 06a (nothing chosen), T 06b (1 of 3 answered), T 06 (result), M T 06a and M T 06 on phones, and DK T 06 in dark.
- **Fix:** a stray brace from the edge-scroll change stopped the header from hiding the sun icon in light mode, so both icons showed. Fixed, and every stylesheet has been checked for balance.
- **Homepage reviews** (Akila: "replicate reviews from the listing... it needs to be linked to the service provider, with additional information"):
  - **Style:** each card uses the listing's review style: initials, name, country and month, five stars, "Verified booking", then the review.
  - **Host link:** every card ends with the tour it is about. That's the tour photo and name, the host with a verified badge, and what they do and where (for example "Licensed guide · Kandy"). Tapping it opens the listing.
  - **Phones:** the cards are a swipe row, as in the edge-scroll change.
  - **Figma:** H 05 and M H 04, plus updated H 01, M H 01 and the two dark homepage frames.

## Full tidy-up, round 5 (23 Oct)

- **Homepage hero:**
  - Between 900 and 1180 px wide (tablets and small laptops), the map used to run into the headline and intro. The map and place card now shrink in steps, so the text always has clear space.
  - The map hint is shorter, so it no longer gets cut off.
  - Placeholders that don't fit end in "…".
  - The travellers picker starts at 2 adults, like the listing.
- **Search flows in Figma:**
  - The suggestions, date picker and travellers picker looked distorted in Figma. The "Popular" chips sat on top of the suggestions, a chip covered the calendar heading, and the phone suggestion list spilled past the screen edge.
  - The cause was the Figma import, which stacks layers in page order and can't size elements against the screen width. The capture now gives every open pop-up its exact size and position and puts it on top, and anything hidden on screen stays hidden in the frame.
  - While a search pop-up is open, the "Popular" row also steps aside, so nothing peeks out beside it.
- **Every page:** headings now balance their line breaks, and paragraphs avoid a lone last word.
- **Layout check:** every page was checked automatically for overlapping text, clipped text, squashed images and anything spilling past the page edge. That covered 320, 360, 390, 600, 768, 1024, 1280 and 1440 px, in light and dark, with every popup, sheet and step open.
  - The confirmation page was 7 px too wide at 360 px. Fixed.
  - At 320 px, the category grid, the checkout total bar and the confirmation hashtag row spilled over. Fixed.
- **Phrase cards (new tool, T 09):**
  - Sinhala and Tamil phrases for greetings, getting around, eating out, shopping and help. Each one shows the English, the script and how to say it.
  - "Show" opens a phrase full screen to hand someone your phone, and "Save" keeps a phrase for later.
  - The allergy card builder covers peanuts, cashews, fish, prawns and shellfish, milk, eggs and wheat. It writes a card in English plus Sinhala or Tamil asking the cook to check, with a full-screen view.
  - Sinhala and Tamil type is embedded (Yaldevi and Noto Sans Tamil, SIL Open Font License), so it shows properly offline. Both are in Figma’s font library, so the Figma frames use the same faces.
  - The phrases are samples. A Sinhala and a Tamil speaker should check every one before launch, and Akila may want to review them.
- **Figma:** every frame was recaptured with the fixed capture: 92 light Milestone 2 frames, 14 dark, and 25 for the dashboard. New frames: T 09, T 09a, T 09b, M T 09, M T 09a, DK T 09, M H 05 and M H 06.
- **Auto layout (Figma page "Components — auto layout (23 Oct)"):**
  - These are built from scratch as auto-layout components: the price card (listing booking widget), the checkout price summary, the tour card, the review card linked to its host, buttons (Primary, Secondary, Dark) and chips (Default, Selected).
  - Every colour is bound to the "Ceylon colours" variables, which have Light and Dark modes, so setting a frame to Dark switches it. The page shows all of them in both modes.
  - Labels, prices, titles and review text are component properties, so the layout reflows when the content changes.
  - The page frames themselves are imported from the prototype, so they stay fixed layers for reference. The components are what developers should read spacing and structure from.

## Akila's feedback, round 3 (17 Oct)

**Homepage v4.**
- **Search:** the search bar is Experiences only. Stays and Transportation return as tabs when they launch. Search suggestions, the date picker and the travellers picker sit above the rest of the page, on phones too. On phones, placeholders fit on one line.
- **Hero:** the map is back, with a place card open on Kandy by default. Phones don't show the map. A dark trust bar now closes the hero, as a clear break before the rest of the page.
- **Phones:** once the hero search scrolls away, a floating "Search experiences" button appears. Tapping it brings the search back.
- **One search at a time:** on the homepage, the header search is hidden until the hero search scrolls away, and both searches show the same experience results.
- **Copy:** Akila's refined copy is in, for:
  - the hero and the trust bar
  - Freshly Added Experiences
  - Where to go and Popular sights
  - No surprises at checkout (with a receipt mock-up)
  - the founder quote, with Akila's photo
  - How Booking Works, with a natural photo of two travellers walking the railway line near Ella; the badge now says "100% vetted local hosts"
  - the Budget tool card and the reviews section
- **"How do you want to explore?":** this section moved to just above the hosts band. The Stays and Transport cards now have real photos.
- **Hosts band:** new copy and four feature boxes, a "List your tours free" button, and a "Verified" badge in place of "SLTDA registered".

**Listing.**
- **Trust links:** back to the existing style: round coloured icons (orange for free cancellation, purple for pay later), an underlined title, grey text and no box. The icons and text for each scenario stay.
- **Popup 4:** state A stays in brand orange (Akila chose it on 19 Oct over a soft green variant).
- **Free date changes:** a line about changing dates at no cost, subject to the host's availability, is in popup 4 and in the cancellation policy section. The policy section also says that a host's own policy takes over when one is set.
- **Fees:** the listing shows one line, "Service fee & VAT" when the host is VAT registered or "Service fee" when not. A tooltip shows the breakdown. Checkout and confirmation show "Service fee" and "VAT (18%), collected for the host" on separate lines. Use the prototype controls ("Host VAT registered") to switch.
- **Host card:** borders and radius match the existing listing design (1px black at 5%, 16px card, 10px inner cards, a soft shadow). Languages show the first two plus "+1", with the rest in a tooltip. Badges sit side by side on phones.

**Checkout.**
- **Cards:** Visa, Mastercard and Amex marks are inline. As soon as the card number is recognised, the matching brand stays and the others fade.
- **Wallets and logins:** Google Pay, Apple Pay and Alipay marks, and the real Google and Apple logos on the login buttons, including the login sheet.
- **Security and consent:** "All transactions are secure and encrypted" sits above the payment methods. The terms are an unticked checkbox that must be ticked before paying. New accounts also get the "By creating an account, you agree to our Terms and Conditions…" notice.
- **Phones:** the price breakdown collapses into a bar at the top that opens on tap.

**Social.** The confirmation page buttons and the new footer icons link to Ceylon Nooks on [Instagram](https://www.instagram.com/ceylonnooks) and [Facebook](https://www.facebook.com/CeylonNooks/).

**Photos.** Photos added in this round live in `assets/img/`, so the dashboard folder is untouched. `akila-liyanage.jpg` is Akila's own photo, from akilaliyanage.com.

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

**Social on the confirmation page (Akila, 15 Oct).** A "Share your Sri Lanka with us" card invites travellers to follow Ceylon Nooks on Instagram and Facebook, and to tag @ceylonnooks and #SriLankaFoundProperly (both with a Copy button) when they post photos from the tour. The social links are placeholders until the real accounts are confirmed.

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
| `assets/img/stays-lake-pool.jpg` | [Swimming Pool by Lake, Waterfront Hotel Tissamaharama](https://www.flickr.com/photos/84303558@N00/5245532936), jaliyaj | CC BY 2.0 |
| `assets/img/transport-tuk-tuks.jpg` | [Tuk-tuks waiting for fares in Kandy](https://www.flickr.com/photos/56796376@N00/1685043688), McKay Savage | CC BY 2.0 |
| `assets/img/travellers-ella-tracks.jpg` | [Walking the tracks, Ella](https://www.flickr.com/photos/168569883@N04/51877850305), World of Travolution (cropped to remove the watermark) | CC BY-SA 2.0 |
| `trincomalee.jpg` | [Trincomalee Beach, Sri Lanka](https://www.flickr.com/photos/43296902@N00/39842113), Dennis S. Hurd | CC0 |

The other photos are credited in the dashboard README.
