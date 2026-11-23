# Milestone 3 research: cancellations and refunds

Research done on 22 Nov 2026, before designing anything, to understand the work in Akila's brief ("Design brief: cancellations and refunds") and the 22 Nov call.

Detailed notes in this folder:
- `notes-prototype.md`: Akila's Claude canvas, screen by screen
- `notes-live.md`: the live partner and admin dashboards (app2.ceylonnooks.com, looked at only, nothing changed)
- `notes-scenarios.md`: every cancellation situation, with what the traveller, partner and admin see, the money and the notifications

## 1. What was reviewed

| Source | What |
| --- | --- |
| Design brief (7 pages) | Rules, scope, deliverables |
| Call transcript (58 min) | Priorities, mobile and PWA, component reuse, referral idea, payouts |
| Akila's canvas, 15 screens | Partner refunds list, partner reply, admin review and decide, payouts, statements, style guide, sign-up, traveller account |
| Live partner portal, 11 pages | Desktop 1440 and phone 390 |
| Live admin portal, 16 of 18 pages | Desktop 1440 (vehicle types and tour types timed out) |
| Our own traveller designs | Listing, checkout, confirmation, homepage, category, traveller dashboard |
| Benchmark | Airbnb help centre (11 articles), GetYourGuide supplier help (3 articles). Booking.com, Viator and Klook block automated reading, so they're not included |

## 2. What Akila has already worked out (keep it)

The three canvas refund screens are detailed, with real worked examples for every status:
- **Partner refunds list:** grouped Needs your reply / In progress / Closed in the last 30 days; summary cards; a details drawer with a status summary, a "What's happened" timeline (done, now, next, missed), a money table (paid, refund, fee and who pays it, payout was and now) and actions that change by status; a private note for the team.
- **Partner reply:** four countdown states (24 h, last 3 h in red, 12 h when the trip is within 3 days, closed); the traveller's reason and evidence; the partner's policy as a timeline with "asked here"; four replies with a live payout preview; validation for each.
- **Admin review and decide:** Needs a decision / Waiting on providers / Provider agreed / Oldest open; policy badge with version and approval; "Policy changed since booking" warning; payment state; guest history; decision panel with eight audit reasons (within policy, provider agreed, provider at fault, medical or emergency, goodwill, attended or no-show, outside policy window, duplicate or suspicious); fee standard, reduced or waived; email preview; bulk apply.
- **Formulas confirmed:** fee = 5% of the full amount paid, minimum USD 1, never more than the refund. On a partial refund the fee is still 5% of the full amount (USD 17 on a USD 170 refund of USD 340).
- **A style guide already exists** ("Partner onboarding style guide and build spec", Sep 2026, for Javed). It says the same tokens and components apply to every dashboard screen. Its colours are the same `--cn-*` tokens as our Milestone 2 work; type is Bricolage Grotesque and Manrope.

Our job, per the brief: keep this content and behaviour, and redesign how it looks as the start of one system for both dashboards.

## 3. What the live dashboards show

1. **Two different shells.** Partner and admin have different logos, sidebars, headers, tables and pills. Partner nav says Earnings, Ledger, Account Settings, Bank Accounts; the brief and canvas say Payouts, Bank details, Business profile, Settings.
2. **Phones.** On a 390 px phone, tables are 640 to 970 px wide on six partner pages (dashboard, experiences, reservations, refunds, payouts, bank accounts), so they all scroll sideways. Akila raised Reservations on the call; it's every table. The system needs one phone pattern for table rows (cards).
3. **Refunds today run on old rules**: "100% if cancelled more than 24 hours before, partner approval within 24 hours". Admin Refunds is a bare table with no amounts, policy, partner reply or urgency.
4. **Currencies mixed** on one screen (LKR cards, $ rows).
5. **The cancellation policy card** (listing form step 4) couldn't be reached: the test partner has no listings, and we didn't create one in the live system.

## 4. What the benchmark tells us

- **Airbnb expresses tiers as relative times** ("until 14 days before check-in"). The brief asks us to show real dates ("Full refund until Sat 12 Sep, 6:00 AM"), which is clearer than the market leader. Keep it.
- **Airbnb shows the refund amount before the guest confirms**, the same as our step 1.
- **Airbnb has no reply deadline for hosts** on refund requests. The host decides outside the policy and the platform rarely steps in. Akila's 24 h / 12 h window with our team deciding is stronger. Make the countdown obvious to partners.
- **Refund timing:** Airbnb says cards take "up to 15 business days" and depend on the bank. Our "should reach your account by [date]" (10 working days) should keep the "depends on your bank" line.
- **GetYourGuide partner cancellations** separate "operational" reasons from "force majeure". Weather counts as force majeure and needs a short written justification or a link (for example a weather report). The traveller is offered a new date or a full refund; with no choice in 2 days, the refund happens automatically. Partners can block the date so no new bookings come in, and can cancel several bookings at once.
  - Worth adding to "Cancel a booking as the provider": an optional evidence field, "Stop new bookings for this date?", and cancelling all bookings on a day (weather usually hits everyone booked that day).
- **GetYourGuide asks partners to offer other dates first**, the same direction as Akila's "offer a new date" reply.

## 5. Conflicts and questions for Akila

1. **Commission:** five different figures appear. 7% (remittance PDF), 9% standard / 5% referral (live reservations), 13% average (admin dashboard), 15% (admin refund prototype), about 18% implied (partner refund examples: USD 340 paid, USD 279 payout). Which one should the money breakdowns use?
2. **Referral:** today it's a guest discount code (guest 5% off, partner commission 5%). On the call Akila described partner-to-partner referrals (2% of list value on a referred partner's first 50 bookings, by tracking link). Is the guest code being removed, or do both stay? We wait for his referral document.
3. **Our team's decision time:** the brief's flowchart says "within 2 working days". Should every dated "decides by" use that rule?
4. **Notifications:** email and the Refunds badge are confirmed. SMS or WhatsApp too? Partners already share on WhatsApp.
5. **Partner cancels:** may we add an evidence field, "Stop new bookings for this date", and cancel all bookings on a day (from the benchmark)?
6. **Listing form:** please send a screenshot of the current Cancellation Policy card (step 4), or a test listing we can open.
7. **Type:** the dashboards use Bricolage Grotesque and Manrope; the traveller site uses Inter. Keep that split?
8. **Hotel flow:** confirm it's part of the USD 800 scope.

## 5a. Akila's answers (23 Nov)

1. **Real dates confirmed.** "Full refund until Sat 12 Sep" is the right way. It lets the app show everything programmatically instead of fixed phrases like "Free cancellation up to 48 hours".
2. **Style guide:** use it if it's right, otherwise adjust it. Our call.
3. **Fee and commission:** if no money was collected, the traveller gets the full amount; if it was, 5% applies. Commission is set per partner on the admin side and doesn't affect travellers. So partner payout lines use the partner's own commission rate, not one fixed figure.
4. **Referral:** a discount code still exists, but partners can only share it through their link. The link opens a dedicated landing page, not the partner's profile. Akila can share the full development briefing; we asked for it. His landing page link (claude.ai artifact 9WcSYYWQtRTJ9DfxYE2Cgm) isn't publicly shared, so we couldn't open it.
5. **Decision time:** our team aims for 2 to 3 days, but it can take longer depending on the information received. Copy should say "aims to decide by [date]" rather than promise a fixed date.
6. **Cancellation Policy card:** screenshot received. Today: preset cards (Flexible, Moderate, Strict) with bullet summaries on the right; Custom opens a free-text box (500 characters); a separate "Refund Schedule" card below has accordion tiers ("Tier 1, Earliest cancellation: if cancelled at least 7 days before, 100%", "Tier 2, Moderate notice: 3 days, 50%", "Tier 3, Last minute: 1 day, 10%"). The brief replaces the text box and the separate card with compact tier rows inside the Custom card. A draft listing to open: My Experiences → Draft → edit "5-Day Cultural Triangle and Hill Country Private Tour (Copy)".

Still open: SMS or WhatsApp notifications (Q3), weather extras for partner cancellation (Q4), fonts (Q7), hotel scope (Q8).

## 6. Our own designs that the new rules change

- "Free cancellation up to 48 hours before" appears on the listing, checkout, homepage and category cards, and in the traveller dashboard. It becomes the policy's own tiers with real dates. The homepage and category cards aren't in the brief's list, but need the same change.
- "Charged automatically 5 days before" (pay later) on the listing, checkout and dashboard becomes the policy's actual charge date.
- The checkout "within 5 days" scenario becomes the rule "pay later is offered only if booked before the reminder date".
- In the dashboard, cancelling inside a tier still says the refund is "confirmed by our team". It's now instant.
- The payment status work from 26 Oct: the 24-hour hold for pending or failed payments was an assumption. The brief says a failed pay-later charge cancels the booking with no fee.
- Already right: the dashboard's refund request keeps the booking active ("This is a request, not a cancellation").

## 7. What this means for the plan

1. Build the shared system on the existing style guide tokens (colours already match ours), not new ones.
2. One shell for both dashboards; partner and admin get different menus in it. Align the partner menu names with the brief.
3. Components first: status pill, table row with its phone card version, summary card, tabs and filters, side panel, timeline, money breakdown, countdown banner, form fields, buttons, dialogs. Every partner table gets the phone card version.
4. One status list shared by traveller, partner and admin (from the canvas examples), with the same colours everywhere.
5. Then the screens, in the brief's order: partner, admin, traveller.

The estimate given to Akila stands: about 3.5 weeks, in stages, with the dashboard plan first.
