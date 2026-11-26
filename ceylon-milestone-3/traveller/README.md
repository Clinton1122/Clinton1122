# Traveller side of cancellations (Milestone 3)

The traveller changes are made in the working prototypes themselves:
- `../../ceylon-milestone-2` (listing, checkout, confirmation, homepage, category): round 8 in its README.
- `../../ceylon-traveller-dashboard`: v7 in its README.

Figma: page **Traveller cancellation**, five sections: listing, checkout and confirmation, cancelling inside a refund period, requesting a refund, and the request tracker in every state.

`screens/capture.js` re-captures those states from the prototypes into composite pages for Figma; `screens/*.png` are the renders.

Rules used: policy tiers shown as real dates; cancelling inside a tier is instant; 5% of the amount refunded (min USD 1) kept for processing, none if the host cancels or is at fault; pay later charged on the earlier of 5 days before or 2 days before the full refund ends, with a reminder 3 days before; requests go to the host first (12 h if the trip is within 3 days, otherwise 24 h), then our team, aiming for 2 to 3 days.
