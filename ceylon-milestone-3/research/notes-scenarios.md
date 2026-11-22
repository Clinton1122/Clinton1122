# Scenario map: who sees what, money, notifications

Fee = 5% of the full amount paid, minimum USD 1, capped at the refund amount (admin prototype formula), only when the traveller cancels and money was collected. Waived when the partner cancels or is at fault.
Payout share used in the prototypes: partner gets 82% of paid (to be confirmed: commission figure).

| # | Situation | Traveller | Partner | Admin | Money | Notify |
|---|---|---|---|---|---|---|
| 1 | Cancel inside the 100% tier, paid | Step 1 shows amount, fee calculation, card; done = "Refund sent to your card" | Row "Cancelled within your policy", payout drops | Closed tab (automatic); may appear in automatic checks sample | paid − 5% fee back; payout 0 | Traveller: refund on its way · Partner: cancellation notice |
| 2 | Cancel inside a partial tier (e.g. 50%) | Same, with "USD 170.00 back (50%) less fee USD 17.00 = USD 153.00" | Same; payout reduced by share of refund | Closed (automatic) | 50% − fee (fee on full paid) | Same |
| 3 | Pay later, cancel before charge date | "Nothing has been charged, so there's nothing to refund", no fee | Cancelled, no payout | Closed (automatic, not charged) | None | Traveller confirmation |
| 4 | No refund tier left, or emergency | Request flow: reason + evidence; Change date offered first; "We'll ask Arkam first, then our team decides by [date]. Your booking stays active." | "Needs your reply" with countdown 24 h (12 h if trip within 3 days; red last 3 h) | "With provider" tab, time left, reminder, Decide now | None yet | Traveller: request received · Partner: new request + reminder before deadline · Admin: badge |
| 5 | Partner agrees to a refund (full / half / amount) | Waiting, then "Our team decides by [date]" | "With our team"; can change reply until decided | "To decide", provider offer pre-selected; bulk eligible | amount − fee; payout reduced proportionally | Outcome emails to both |
| 6a | Partner offers a new date, traveller accepts | Notice + email from Ceylon Nooks (never the host's note), Accept / No thanks, 24 h | "Waiting for [traveller]" → "Date moved" | Closed (moved) | No refund, no fees | New date offered; outcome |
| 6b | Traveller declines or doesn't answer | Tracker says it went to our team | "With our team" | "To decide" | Per decision | |
| 7 | Partner keeps policy (reason required) | Waits; outcome | "With our team" | "To decide" | Per decision (often no refund) | Outcome; declined = calm ending, "Your booking is still on", Change date |
| 8 | Partner says "this was on our side" | Full amount, no fee | "Refunded in full", payout 0 | Bulk eligible, fee waived | 100% back, no fee | Host cancelled email |
| 9 | Partner misses the window | "Our team decides by [date]" | "With our team" + missed marker; can still add a note | "To decide" (no reply) | Per decision | Partner reminder before deadline |
| 10 | Partner cancels proactively (weather/sea, can't run, other) | "Arkam cancelled... You'll get the full USD 340.00 back, with no fee." + other dates/similar | Confirm: traveller gets everything, payout for booking 0 | Visible in closed / checks | 100% back, no fee | Host cancelled email; date reopens |
| 11 | Pay later card fails on charge date | Booking cancelled, no fee, told why | Booking cancelled | Visible | None | Traveller email |
| 12 | Policy changed after booking | Always sees the version agreed at checkout | Sees the booking's version | Warning "Policy changed since booking", version + approval date | Uses booked version | |
| 13 | Non-refundable listing | No pay later; request path only | Policy card shows Non-refundable | | | |
| 14 | Admin decides now (emergency) | Outcome early | Window closes early | Decide now without waiting, reason for audit | | |
| 15 | Partner objects: traveller attended / no-show | Declined outcome | | Reason "Guest attended or no-show", guest history | | |
| 16 | Custom policy submitted | Listing goes live only after approval | "Custom policies are checked by our team before your listing goes live." | Approval queue: tiers, summary, checklist, approve / edit / send back with note, version history | | Partner: approved / sent back |
| 17 | Automatic refund checks | | | Sample of in-policy refunds, flag for review | | |
| 18 | Refund after the partner was already paid out | | Shown as deduction on next payout and statement | Payout status "paid in batch PR-…" | Clawback from next payout | |
| 19 | Traveller paid in another currency | Refund in the paid currency to the card | Payout in LKR, one transfer per currency | | Currency per row | |
| 20 | Legacy booking (old 48-hour rule, before replies existed) | | | Legacy policy badge, "never asked" | | |

## Timers
- Partner reply: 24 h, or 12 h if the trip starts within 3 days; red in the last 3 h; closed state.
- New date offer: traveller has 24 h.
- Our team: "decides within 2 working days" (flowchart) and dated copy "by Wed 23 Sep".
- Pay later charge: earlier of 5 days before the trip or 2 days before full refund ends; reminder 3 days before the charge; pay later offered only if booked before the reminder date (Flexible > 8 days ahead, Moderate 12, Strict 19); never for Non-refundable.
- "In your account": estimate, ticks after 10 working days; show gateway bank reference once sent.
