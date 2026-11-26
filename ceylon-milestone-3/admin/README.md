# Admin side of cancellations (Milestone 3)

Designed 27 Nov 2026. Figma: page **Admin cancellation**, in six sections; designs are clean and the explanations are in section 6.

| Section | Screens |
| --- | --- |
| 1 Decide a request | To decide queue with Sofia open (three facts, the decision, receipts for traveller, partner and Ceylon Nooks); decision states: partner agreed, partner's side (locked to full, no fee), decline with a note to the traveller |
| 2 Waiting and bulk | With partners (countdown, reminder, decide now with a reason); apply 2 together dialog |
| 3 Custom policy approval | Current and proposed versions side by side, real-date example, checks, partner's note, approve / edit / send back |
| 4 Automatic refund checks | Weekly random sample, mark right or flag |
| 5 Phone | Queue and decision |
| 6 Notes | How it fits together |

Money follows Akila's model: price, VAT 18% when registered, 10% service fee, commission per partner (12%, 10%, 8% in the examples), VAT handling fee 4.42% of the VAT. A refund is a % of the partner's price; VAT and service fee follow; 5% of the refund (min USD 1) is kept unless it's the partner's or our side. Admin also sees the currency the traveller paid in, and Ceylon Nooks' net including the card fee reported by Airwallex.

Not included: the Ledger (on hold until Akila confirms) and the payout run review.

Build: `python3 screens/prep_admin.py` then `node screens/build.js adminx` with the plan's `v2.html` and partner styles (see `../partner/screens`).
