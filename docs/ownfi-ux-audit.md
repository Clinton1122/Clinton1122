# Ownfi: flow review, missing screens and redesign

Figma file: [OwnFI](https://www.figma.com/design/tpfEsYr54oi7jjVmYtoaQN/OwnFI)
New page: **Claude · Profile & missing screens** (the original frames on Page 1 are unchanged).

The new page has 21 frames and an audit board. Every colour is bound to the file's existing
colour variables and all type is DM Sans. Status bar, home indicator and toggles are local
components, so they can be swapped in one place.

## 1. The flow as designed

**Auth**
- Splash → Onboarding 1–4 (Track · Budget · Chat on WhatsApp · Grow)
- Sign in / Create account (email + password, Google, Apple)
- Sign up in 5 steps: Account → Goals → Income → Categories → Connect WhatsApp → Welcome
- Reset password in 4 steps: Email → 6-digit code → New password → Success

**Main app (tab bar)**
- **Home:** budget ring, quick actions, AI insight, recent activity, bell → Notifications
- **Activity:** transactions with All / Income / Expense, filters and search
- **Budgets:** category cards with progress; + New → Create budget sheet
- **Insights:** health score, AI tip → Assistant, trend, income vs expense
- **Profile:** contact info, settings list, log out

**Sheets and extras:** Add expense, Add income, Create budget (number-pad sheets), Ownfi
Assistant, WhatsApp connect, empty states for Activity, Budgets and Insights.

## 2. Flaws found and what changed

| # | Severity | Flaw | Fix (frame) |
|---|---|---|---|
| 1 | High | Profile rows were all dead ends: every setting had a chevron but no destination | 01–14 |
| 2 | High | The WhatsApp number is never verified during sign-up, so anyone could link a number that isn't theirs | 17 |
| 3 | High | Transactions can't be opened, so a wrong AI category can't be fixed and an entry can't be edited or deleted. This matters most for entries auto-logged from chat | 15 |
| 4 | High | No account deletion and no log-out confirmation (the App Store requires in-app deletion; Nigeria's data-protection rules, NDPR, give users rights over their data) | 07, 12, 14 |
| 5 | High | A money app with no app lock: the "Security" row led nowhere and there was no Face ID or PIN | 05, 06, 19 |
| 6 | Med | Budgets have no detail view: you can't edit a limit, see its entries or get a pace warning | 16 |
| 7 | Med | The phone number appears twice on Profile (the Phone and WhatsApp rows show the same number) | 00–02 |
| 8 | Med | There's a "Dark mode" toggle but no light theme was ever designed | 13 (light theme still needs designing, or drop the option) |
| 9 | Med | A "Premium member" badge with no plan screen: no price, renewal date, payment method or way to cancel | 08 |
| 10 | Med | Notifications screen: no status bar, no unread state, no actions, no mark-all-read | 18 |
| 11 | Med | Recurring bills are referenced (the DSTV alert, the "Recurring monthly" toggle) but never shown anywhere | 20 |
| 12 | Med | The "Manage connection" button on the WhatsApp screen goes nowhere | 02 |
| 13 | Low | Category sets disagree: Budgets shows "Owambe" but the pickers show "Utilities", and Bills and Utilities share an icon | 09 |
| 14 | Low | The tab is labelled "Activity" but the screen title says "Transactions" | Use "Activity" everywhere |
| 15 | Low | The Income screen is built at a bigger scale than Activity and Expense, so the layout jumps when switching tabs | Rebuild at the Activity scale |
| 16 | Low | Add income and Add expense have no date, source or payment method, so you can't back-date yesterday's spend | Add a date chip row above the keypad |
| 17 | Low | The Insights empty state has no button; the other empty states do | Add "Log an expense" |
| 18 | Low | Onboarding 4 says its headline twice (in the illustration and again in the title) | Remove one |
| 19 | Low | The budget month is locked to the calendar month, though many salaries land around the 25th | "Pay day / budget month starts" setting (01, 04) |
| 20 | Low | Sign-up has no terms consent and no email verification | Consent line under Continue, plus a verify-email step |

## 3. New frames

**Row 1: Profile and every subscreen**
- 00 Profile (redesigned): grouped settings, identity card with Edit, streak/budgets/savings stats
- 01 Personal information: name, email, phone, pay day, income range
- 02 WhatsApp connection: status, behaviour toggles, change number, disconnect
- 03 Notification settings: alert threshold, summaries, bills, delivery channels, quiet hours
- 04 Language & region: English, Pidgin, Yorùbá, Hausa, Igbo; currency; when the budget month starts
- 05 Security: Face ID, app PIN, auto-lock, hide balances, two-step verification, signed-in devices
- 06 Change password: strength meter, rules, mismatch error state
- 07 Privacy & data: data export, chat retention, sharing controls, legal links
- 08 Subscription: plan, perks, billing, switch to yearly, cancel
- 09 Categories: reorder, entry count and budget per category, suggested categories
- 10 Help & support: search, chat on WhatsApp, email, popular questions, report a problem
- 11 About & legal
- 12 Log out (sheet): confirmation with an option to log out on other devices too
- 13 Appearance (sheet): Light / Dark / System
- 14 Delete account: what gets deleted, export first, reason, type-to-confirm, recoverable for 14 days

**Row 2: missing screens elsewhere in the flow**
- 15 Transaction detail: original WhatsApp message, budget impact, recategorise, split, delete
- 16 Budget detail: amount left, pace forecast, daily chart, entries, rollover, alert threshold
- 17 Verify WhatsApp (sign-up): 6-digit code with an SMS fallback
- 18 Notifications (redesigned): filters, unread dots, inline actions
- 19 Unlock Ownfi: PIN and Face ID on launch
- 20 Recurring bills: what's due this month, upcoming bills, a suggestion for a newly detected bill

## Still open

- A light theme, if the Appearance option stays.
- Offline and error states (failed sync, a WhatsApp message Ownfi couldn't parse).
- A verify-email step in sign-up, and an edit-transaction sheet reached from frame 15.
