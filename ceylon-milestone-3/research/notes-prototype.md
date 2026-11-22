# Akila's Claude canvas "Ceylon Nooks Payouts Redesign" (read 22 Nov)

15 screens: Partner refunds list, Partner replies to a refund request, Refunds review and decide (admin), Partner payouts v2, Payouts batch approval (admin, "Main"), PDF remittance, PDF statement p1/p2, Partner sign-up + business profile (Onboarding), Partner login + reset, Onboarding style guide (for Javed, Sep 2026), Traveller account, Trip mode, Trip recap.

## Partner refunds list (1440)
- Intro copy: "Cancellations inside your policy are refunded automatically, so you only need to reply when someone asks for more than your policy gives."
- Summary cards: Needs your reply (2, next due in 7 h 55 min) · In progress (3, with our team or waiting on travellers) · Refunded in September USD 590 across 3 bookings · Effect on payouts −USD 484.10 (on September statement).
- Filters: All / Needs your reply / In progress / Closed; sort notes per filter (soonest deadline first, soonest trip first, most recent first).
- Columns: Traveller, Trip, Status, Your payout, Action (Reply / View / Add a note).
- Statuses with worked examples: Reply in X h (red) · Waiting for [traveller] (blue, date offered) · With our team (amber; replied, or missed window) · Cancelled within your policy (grey, auto) · Refunded USD X (grey) · No refund (grey, policy kept) · Date moved (green) · Refunded in full (grey, partner cancelled, payout 0).
- Drawer: summary box (tone), "What's happened" timeline (done / now / next / missed), Money table (paid, refund, fee paid by traveller, traveller gets, payout was → now), money note, "From the Ceylon Nooks team" note, actions by status (Change the date offered, Message, Change my reply, Add a note for the team, Ask about this decision, View booking).
- Note for team: only team sees it.
- Nav: Dashboard · MY LISTINGS (Experiences, Stays, Transport) · BOOKINGS (Messages, Reservations, Refunds, Manage Reviews) · MONEY (Payouts, Bank details) · ACCOUNT (Business profile, Settings).

## Partner reply (1440), scenario prop: 24h window / Last 3 hours / Trip within 3 days / Time is up
- Header: "[Traveller] asked for a refund", booking ref breadcrumb.
- Countdown box: calm amber (24h) vs red (last 3h, trip within 3 days, 12h window); progress bar; "Reply by Tue 22 Sep, 6:00 AM (Sri Lanka time). After that, our team decides without your input."
- Closed: "Your reply window closed... Our team is deciding now... You can still add a note."
- What the traveller says: reason category + quote + attachment.
- Your policy for this booking: name, outcome by policy, tier timeline with marker "asked here", booked date and trip date.
- 4 replies (choice cards): Offer a new date (3 date chips; "24 hours to accept... Nobody pays a fee when a date is moved") · Agree to a refund (Full / Half / Other amount, USD 1 to paid; live: traveller gets [amt − 5% of paid], your payout [payout − amt×payout/paid]) · Keep my policy (reason required) · This was on our side (full back, no fee, payout 0, booking cancelled, date opens).
- Note: required for keep, optional otherwise. "Only our team sees this. [Traveller] sees the outcome, not your note."
- Validation messages for each.
- Sent state: summary + Change my reply + Add a note.
- Side: What happens next (You reply → Our team decides by X → You both hear the outcome), Good to know bullets.
- Fee is 5% of the FULL amount paid even on a partial refund (USD 17 on a USD 170 refund of 340).

## Admin refunds, review and decide (1440)
- Nav: Dashboard, Users, My listings, BOOKINGS & FINANCE: Reservations, Refunds, Payouts. Role switch Admin / Finance.
- Tabs/cards: Needs a decision · Waiting on providers (inside their reply window) · Provider agreed (ready to apply in one go) · Oldest open request.
- Row data: guest, ref, experience, provider, trip start + hours to trip, requested, hours waited, paid, payment method, policy (moderate/flexible/strict/custom with version), pay state (paid / charged (pay later) / not charged), reason + attachments, provider stance (refund+offer, date, none, ours, objects, waiting, keep), guest history [requests, refunds].
- Detail: POLICY SAYS (tier for the request), "Policy changed since booking" warning (custom version v2 vs current v3, approval notes "Approved Mon 14 Sep by Akila"), GUEST SAYS, PROVIDER'S REPLY, PROVIDER PAYOUT (unpaid / paid in batch PR-…), GUEST HISTORY.
- Decision: refund amount, processing fee (standard / reduced / waived), guest gets back, from provider payout, commission returned, provider still earns; reason (8): Within cancellation policy · Provider agreed to it · Provider cancelled or at fault · Medical or emergency · Goodwill gesture · Guest attended or no-show · Outside policy window · Duplicate or suspicious request; note to guest; email preview; "Cancel the booking and release the spot"; "Going off-policy needs a reason for the audit log."
- Waiting state: "When the provider replies, or the window closes, this moves to To decide. Step in now only if it can't wait." Send reminder / Decide now without waiting.
- Bulk: provider agreed or at fault, trip not started, policy version matches, no risk flags; total refunded.
- Legacy policy for older bookings: "Ceylon Nooks standard: full refund 48+ hours... inside 48 hours partial at the provider's discretion." Also a request from before provider replies existed.
- Fee formula: min(refund, max(1, 5% of paid)).
- Policies: Moderate 168h/100, 72h/50; Flexible 48h/100; Strict 336h/100, 168h/50; custom example Mirissa: 240h/100, 72h/50.

## Payouts and statements
- Partner payouts: paid in LKR every Monday and Thursday, one transfer per currency (Airwallex), Ceylon Nooks covers transfer fees. Columns incl. Refund ("your share of money returned to the traveller").
- Admin payouts: auto-approve clean payouts; always hold "payouts with an open dispute or pending refund". Columns GROSS, COMMISSION, REFUNDS, NET.

## Style guide (partner onboarding, Sep 2026, "for Javed")
- "The same tokens and components apply to every dashboard screen."
- Colour tokens = same --cn-* as our Milestone 2 (primary #F15623, primary text #C43D12, page #F7F5F2, border #E7E2DB, input #D9D2C8, ink #1C1A17, body #4A443D, muted #6B645C, deep #2B1A10).
- Status pairs: Success #1F6B44/#EAF6EE · Warning #6B4600/#FFF4DB · Danger #9B1C12/#FEECEB · Info #244A7A/#E4ECF7. (Refund screens use #1D5631/#E7F3EA for green: slight drift.)
- Type: Bricolage Grotesque headings, Manrope body (traveller site uses Inter). Scale: Display 44, H1 38, H2 30, H3 22, Body L 16, Body 15, Label 13/700, Helper 12.
- Buttons primary 52, secondary 48; one primary per screen bottom right; touch 44; cards 1px border no shadow; modal shadow; top bar 72.
- Copy rules: "partner" or "provider", never "merchant"; travellers; no dashes in copy; tabular numbers.

## Inconsistencies to raise
1. Commission: remittance PDF says 7% (+18% VAT); admin refunds prototype defaults to 15%; partner refund examples imply payout = 82% of paid (USD 340 → 279).
2. Traveller account prototype (pre-brief) says "5% admin fee" and cancels the booking immediately on a request; the brief says "processing fee" and the booking stays active.
3. Green status colour differs slightly between the style guide and refund screens.
4. Partner nav labels: "My Experiences/Stays/Transport" grouped under MY LISTINGS in the prototype.
