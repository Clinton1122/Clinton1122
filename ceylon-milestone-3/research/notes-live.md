# Live dashboards audit (app2.ceylonnooks.com, 22 Nov, read-only)

Screenshots: live/partner1440, live/partner390, live/admin1440.

## Partner portal (11 pages)
Nav: Dashboard · MY LISTINGS: My Experiences, My Stays, My Transport · Messages, Reservations, Refunds, Manage Reviews, Earnings, Ledger · Account Settings, Bank Accounts. (Brief/prototype names: Payouts, Bank details, Business profile, Settings; live: Earnings, Ledger, Account Settings, Bank Accounts.)
- Dashboard: 4 stat cards (bookings, earnings LKR est., listings, rating), Partner referral card (guest discount code: guest 5% off, partner commission 5%; Share on WhatsApp), Quick actions (dark card), Booking analytics chart, Earnings breakdown donut, Recent reservations table, "Grow with Ads, coming soon".
- My Experiences: tabs All/Active/Draft/Pending Approval/Rejected; this test partner shows none.
- Add Experience: 4 steps (Core details, Itinerary, Logistics, Pricing). Steps can't be opened until earlier steps are valid, so the Cancellation Policy card (step 4) could not be reached without creating a listing.
- Reservations: Export CSV, Print daily list, 4 stat cards, filters (status, time, category, service dates), referral note ("Bookings tagged VIA CODE... extra 4%. 9% standard, 5% referral commission"), table.
- Refunds (live, old rules): cards Total refunded this month (LKR), Pending approval ("Requires partner review within 24h"), Chargeback/disputes, Net payout impact; banner "100% refund automatically issued if cancelled >24 hours prior. <24 hours, partner approval or dispute within 24 hours. Payouts bi-weekly."; tabs All / Action required / Completed / Disputed-Under review; table with LKR cards but $ amounts; statuses APPROVED / REFUNDED.
- Payouts, Ledger (test-only per Akila), Account settings, Bank accounts (Airwallex settings), Messages, Manage reviews.

## Admin portal (18 links; 2 config pages timed out)
Nav: Dashboard · MARKETPLACE: All Listings, Experiences, Stays, Transport · PROVIDERS: All Providers, Pending Approval, Profile Edits, Suspended · TRAVELLERS: All Travellers, Blocked Accounts · BOOKINGS & FINANCE: Reservations, Payouts, Ledger, Refunds · Coupons, Manage Reviews · Configs: vehicle types, tour types, tour categories. Account switcher card; search bar; payout cycle chip; dark mode.
- Dashboard: Needs attention (listings pending, refunds awaiting action, payouts ready, VAT changes), GMV / platform revenue / paid to partners / bookings, revenue chart, booking pipeline, referral programme performance (codes), marketplace health (avg commission 13%), recent payout settlements.
- Refunds (live): plain table: action menu, booking ref, status (Approved/Refunded), requested and updated timestamps. No amounts, policy, partner reply or urgency.

## Cross-cutting findings
1. Two different shells: partner (text logo "Ceylon Nooks / PARTNER PORTAL", grey sidebar, back-arrow header) vs admin (script logo, account switcher card, search header, peach sidebar). Different table headers (uppercase grey vs mixed), pills (outlined vs filled), card styles.
2. Phone widths: tables 640 to 970 px wide on a 390 px screen on 6 partner pages (dashboard, experiences, reservations, refunds, payouts, bank accounts). Needs a card-row pattern for every table, not only Reservations.
3. Currency mixing: LKR summaries next to $ rows on the same screen.
4. Commission appears as 7% (remittance PDF), 9% standard / 5% referral (live reservations), 13% average (admin dashboard), 15% (admin refund prototype default), ~18% implied (partner refund prototype: USD 340 → 279).
5. Referral today = guest discount code. Akila's new plan (call) = partner refers a new partner, earns 2% of list value on that partner's first 50 bookings, via tracking link. Different feature; don't merge.
6. Live refund rules are the old 24-hour model; everything moves to tiers.
