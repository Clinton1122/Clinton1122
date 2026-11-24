# Ceylon Nooks dashboards: one system (plan for review)

For Akila, before the refund screens are designed. As the brief asks, this covers six things:
1. Screen inventory
2. One shell
3. Component library
4. Tokens
5. Shared status language
6. Redesign map

It builds on what already exists: the partner onboarding style guide (Sep 2026) and the refund screens on the Claude canvas. Nothing here changes how a screen works; it changes how screens are built and how they look, so the developers map each thing once.

---

## 1. Screen inventory

Patterns key:
- **SC** stat cards
- **TB** table
- **TA** tabs
- **FI** filters
- **SE** search
- **FO** form
- **CH** chart
- **DR** side panel
- **PI** status pills
- **EM** empty state
- **ST** steps

### Partner portal (live menu today in brackets where it differs)

| Screen | What it's for | Patterns |
| --- | --- | --- |
| Log in, reset password | Get in | FO |
| Sign up and business profile | Onboarding in 4 steps (basic info, details, documents, payouts) | FO ST |
| Dashboard | Today at a glance: bookings, earnings, referral, quick actions, recent reservations | SC CH TB |
| My Experiences | List of experiences by status (Active, Draft, Pending approval, Rejected) | SC TA FI SE TB PI |
| Add or edit an experience | 4 steps: core details, itinerary, logistics, pricing (including the Cancellation Policy card) | FO ST |
| My Stays, My Transport | Coming soon | EM |
| Messages | Conversations with travellers | list and thread |
| Reservations | All bookings, filters, export, print daily list | SC FI SE TB PI |
| Refunds | Cancellations and refund requests; reply to a request | SC TA TB PI DR FO |
| Manage Reviews | Read and reply to reviews | list |
| Payouts (Earnings) | Payouts twice a week, per payout breakdown, statements | SC TB DR |
| Ledger | Test only; remove from the partner menu (Akila, call) | TB |
| Bank details (Bank Accounts) | Airwallex bank account | FO TB |
| Business profile (Account Settings) | Public profile and documents | FO |
| Settings | Notifications, preferences | FO |

### Admin portal

| Screen | What it's for | Patterns |
| --- | --- | --- |
| Dashboard | Needs attention, GMV and revenue, pipeline, referrals, marketplace health, recent settlements | SC CH TB |
| All listings, Experiences, Stays, Transport | Review and approve listings | SC TA FI SE TB PI |
| All providers, Pending approval, Suspended | Partner directory and approval | TA FI SE TB PI |
| Profile edits | Approve partner profile changes (bank changes first) | TB PI |
| All travellers, Blocked accounts | Traveller directory | TA SE TB PI |
| Reservations | All bookings, multi-currency | SC FI SE TB PI |
| Payouts | Batch approval, holds, payout rules | SC TA TB DR FO |
| Ledger | Money movements | TB |
| Refunds | Today a bare table; becomes the decision queue | SC TA TB PI DR FO |
| Custom policy approval (new) | Approve, edit or send back custom policies | TB DR FO |
| Automatic refund checks (new) | Sample of in-policy refunds, flag one | TB |
| Coupons | Discount codes | TB FO |
| Manage reviews | Moderate reviews | TB |
| Configs: vehicle types, tour types, tour categories | Reference data | TB FO |
| Staff and roles | Mentioned on the call; not working yet | TB FO |

What the inventory shows:
- **The same ten patterns repeat** across both portals.
- **Two shells:** partner and admin each have their own logo, sidebar, header, table and pill styles.
- **Phones:** six partner tables are 640 to 970 px wide on a 390 px phone, so they scroll sideways.

---

## 2. One shell (v2, 24 Nov)

The same shell as the traveller site, so partner, admin and traveller feel like one product.

**Desktop (1440)**
- **Header, 64 px:** logo with the portal name ("Partner" or "Admin"), Sri Lanka time (every deadline is Sri Lanka time; Akila works from Australia), help, notifications, account. Admin also gets search.
- **Section tabs:** the traveller site's tab tray, with count badges. No sidebar.
  - Partner: Today, Bookings, Refunds, Messages, Listings, Money, Account
  - Admin: Today, Refunds, Payouts, Bookings, Listings, Policies, People, Settings
- **Width:** partner pages use the traveller site's 1136 px column (calm, few items). Admin pages use the full width, with a list and detail side by side (queue work, no drawer).
- **Page heading:** the title plus one sentence that sums up the situation ("2 travellers are waiting for your reply. Daniel's is due first, in 7 h 55 min."). This replaces the summary cards.

**Phone (390), installed as an app**
- The tabs become a bottom bar: Today, Bookings, Refunds, Messages, More.
- Requests are cards with the four replies on them; confirmations are bottom sheets with a pinned action.
- Partner "Today" has a day strip; a day with bad weather links to "Cancel this day".

**Five decisions** (board P 00): one product, not three · what needs you comes first at full size · time is the headline (big clock, real dates, policy line) · money reads like a receipt · colour only for "act now".

---

## 3. Component library (Figma, built with auto layout and variants)

Start with what the refund screens need; most other screens reuse them.

| Component | Variants | Used on |
| --- | --- | --- |
| Status pill | the 6 status colours below × with or without icon | every list |
| Table row | desktop row; phone card; selected; needs action | every list |
| Summary card | number, money, with trend, with alert | dashboards, lists |
| Tabs and filters | tabs with counts, filter chips, sort, search | lists |
| Side panel | partner details, admin decision; desktop drawer, phone full screen | refunds, payouts, reservations |
| Timeline | done, now, next, missed; with a quote | refund details, tracker |
| Money breakdown | rows, total row, note; "was → now" payout | refunds, payouts |
| Countdown banner | calm (24 h), urgent (last 3 h, 12 h window), closed | partner reply, admin waiting |
| Choice card | radio card with description; selected; error | reply options, policy presets |
| Tier row | "If cancelled at least [7] [days] before, [100]% back"; fixed last row; error | policy card, approvals |
| Form fields | text, amount (currency), select, textarea, date chip, segmented control, upload | everywhere |
| Buttons | primary, secondary, text, danger text; 52 / 48 / 40 px | everywhere |
| Dialog | confirm, with form | cancel as partner, decisions |
| Empty state | icon, line, action | every list |
| Toast and inline message | success, warning, danger, info | everywhere |

---

## 4. Tokens

Kept from the style guide. These colours are the same `--cn-*` tokens the traveller site uses.

| Group | Tokens |
| --- | --- |
| Brand | primary #F15623 · primary text #C43D12 · primary hover #9E300D · primary tint #FDF1EA · tint border #F0DCCF · deep brown #2B1A10 |
| Neutrals | ink #1C1A17 · body #4A443D · muted #6B645C · border #E7E2DB · input #D9D2C8 · page #F7F5F2 · surface #FFFFFF |
| Status | success #1F6B44 on #EAF6EE · warning #6B4600 on #FFF4DB · danger #9B1C12 on #FEECEB · info #244A7A on #E4ECF7 · neutral #4A443D on #F3EFE9 |
| Type | Bricolage Grotesque for headings, Manrope for everything else. Display 44 · H1 38 · H2 30 · H3 22 · Body L 16 · Body 15 · Label 13/700 · Helper 12. Tabular numbers for money, codes and counts |
| Spacing | 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 |
| Radius | 8 small · 12 inputs and buttons · 18 cards · 22 modals · 999 pills |
| Elevation | cards: 1 px border, no shadow · modal: 0 24px 60px rgba(0,0,0,.25) over a rgba(28,26,23,.45) scrim · sticky bars: 0 −8px 24px rgba(28,26,23,.06) |

Changes:
- **One green.** The refund screens use #1D5631 on #E7F3EA; the style guide uses #1F6B44 on #EAF6EE. Use the style guide's.
- **New neutral status pair** for closed items.
- **Dashboard type scale** steps down one level: page title H2 30, section H3 22, table text 14. H1 38 is for onboarding only.
- **Dark mode:** both portals already have a dark switch. The dark values come from the traveller site's dark tokens, so all three match.
- **Names** follow the `--cn-*` pattern so developers map them once in code.

---

## 5. Shared status language

One list, the same words and colours for traveller, partner and admin. Each status always shows a word, never colour alone.

| Status | Colour | Traveller sees | Partner sees | Admin sees |
| --- | --- | --- | --- | --- |
| Reply needed | danger (partner only) | Waiting for [partner] to reply, by [date, time] | Reply in 18 h 42 min | With provider, reply due [time] |
| New date offered | info | New date offered: accept by [time] | Waiting for [traveller] | With provider (date offered) |
| With our team | warning | Our team aims to decide by [date] | With our team | To decide |
| Refunded | success | Refund on its way · In your account by [date] | Refunded USD 80.00 | Refunded |
| Cancelled within policy | neutral | Cancelled, refund sent | Cancelled within your policy | Closed, automatic |
| Not charged | neutral | Cancelled, nothing was charged | Cancelled, not charged | Closed, automatic |
| No refund | neutral | Request declined; your booking is still on | No refund | Rejected |
| Date moved | success | Moved to [date] | Date moved | Closed, date moved |
| Partner cancelled | info | [Partner] cancelled; full refund, no fee | Refunded in full | Closed, provider cancelled |
| Payment failed | danger | Payment failed; booking cancelled, no fee | Cancelled, payment failed | Closed, payment failed |

Rules:
- **Red only means "you need to act now".** A traveller never sees red for a refund.
- **Amounts and dates are in the status line** wherever they fit.
- **One fixed set of statuses.** The developers can store them as fixed values and each role just shows its own wording.

---

## 6. Redesign map

Effort:
- **S:** reskin into the new system only
- **M:** layout changes too
- **L:** new or reworked screen

| Screen | What changes | Effort | Stage |
| --- | --- | --- | --- |
| Partner Refunds (+ reply, cancel as partner) | New screens from the canvas, in the system; cancel as partner adds an evidence field, "Stop new bookings for this date" and "Cancel all bookings on this day" | L | Now (refund work) |
| Partner listing form, Cancellation Policy card | Tiers inside Custom, no text box, no separate card | M | Now |
| Admin Refunds (queue, detail, decision, bulk, waiting) | New screens from the canvas | L | Now |
| Admin Custom policy approval | New | L | Now |
| Admin Automatic refund checks | New | M | Now |
| Partner notifications and payout statement lines | Email and WhatsApp messages, badge, statement lines | M | Now |
| Shell (both portals) | New shell, menus renamed and grouped | M | Now, built once |
| Partner Reservations | Phone cards; filters into a sheet on phones | M | Next |
| Partner Dashboard | Same content, new cards; referral card follows Akila's link brief | M | Next |
| Partner Payouts, Bank details | Merge into one Payouts area, phone cards; Ledger removed | M | Next |
| Partner My Experiences, Reviews, Messages | Reskin, phone cards | S | Next |
| Partner Business profile, Settings, sign-up, log in | Already close to the style guide; align | S | Next |
| Admin Dashboard | Reskin; Needs attention links into queues | S | Later |
| Admin Listings, Providers, Travellers, Profile edits | Reskin; shared table, tabs and filters | S | Later |
| Admin Payouts | Canvas batch-approval design, in the system | M | Later |
| Admin Coupons, Reviews, Configs, Ledger | Reskin | S | Later |
| Admin Staff and roles | Needs Akila's functional brief | L | Later |

The "Now" rows are the refund work (about 3.5 weeks). "Next" and "Later" are the later redesign. With the components and shell already in place, most of those are reskins (S), so they can be estimated and done in stages.

---

## Boards

- Figma: page "Dashboard system plan", in four sections: 1 Designs (screens only), 2 Notes (how to explain each design), 3 System (components, tokens, statuses), 4 Planning (inventory, redesign map). The first version is kept below, marked superseded.
  - P 00 Why the dashboards change · P 01 Inventory by tab · P 02 Partner Refunds · P 03 Admin Refunds · P 04 Partner on a phone (Refunds, Today, cancel a day) · P 05 Components · P 06 Tokens · P 07 Status language · P 08 Redesign map
- `Ceylon-Dashboard-Plan.html`: all boards in one standalone page (fonts and photos embedded).
- `boards/P00.png` to `boards/P08.png`: exports. `boards/source-v2.html`: editable source.
