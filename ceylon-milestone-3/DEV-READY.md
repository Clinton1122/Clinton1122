# Dev-ready pass on the cancellation designs (27 Nov 2026)

This pass makes the Figma file easier to turn into code. It covers the Cancellation flow, Partner cancellation, Admin cancellation and Traveller cancellation pages, plus a new page: **Dashboard components (dev-ready)**.

## What changed in Figma

| Item | What was done |
|---|---|
| Colour variables | New collection **Ceylon dashboard tokens** with 23 colours (`color/text/*`, `color/bg/*`, `color/action/primary`, `color/border/*`, `color/status/*`, `color/policy/part`). Each one has a CSS name in the code panel, e.g. `var(--cn-pri)`. Fills, strokes and text on the partner, admin and flow pages are linked to them. The traveller screens use the traveller site's existing **Ceylon colours** set. |
| Spacing and radius | `space/2` to `space/56` and `radius/xs` to `radius/full` (`var(--cn-space-*)`, `var(--cn-radius-*)`). Padding, gaps and corner radii that match a step are linked. |
| Text styles | `Dashboard/*` (Bricolage Grotesque headings, Manrope text) and `Traveller/*` (Inter). Partner 634 of 882 text layers, admin 333 of 552, traveller 192 of 221 use a style. The rest are one-off sizes. |
| Components | Button (Tone × Size), Status pill (6 tones), Nav tab (with count badge), Deadline clock (Normal, Urgent, Closed), Receipt row (Line, Deduction, Subtotal, Total), Reply option (Default, Selected), Policy tier (Full, Part, No refund). Each has text properties and a usage description. |
| Instances on screens | 42 plain buttons and 6 status pills on the Partner and Admin pages were replaced with instances of these components. |
| Layer names | Generic names ("Container", "Text", "Vector") were replaced with names by role and content, e.g. `Card · Sofia Ricci asked for a refund`, `Button · Send reply to our team`, `Row · Your price`, `Icon`. |
| Auto layout | Every stack that could convert without moving anything now uses auto layout: partner 1456 of 1720 frames, admin 925 of 1099, traveller 475 of 594. The rest are positioned on purpose: overlapping photos, the "Asked" marker on the policy track, charts. |

## Colour tokens

| Variable | CSS | Hex |
|---|---|---|
| color/text/ink | --cn-ink | #1C1A17 |
| color/text/body | --cn-body | #4A443D |
| color/text/muted | --cn-mut | #6B645C |
| color/text/primary | --cn-pri-t | #C43D12 |
| color/action/primary | --cn-pri | #F15623 |
| color/bg/page | --cn-page | #F7F5F2 |
| color/bg/surface | --cn-sf | #FFFFFF |
| color/bg/tray | --cn-tray | #F0EDE8 |
| color/bg/tint | --cn-tint | #FDF1EA |
| color/bg/deep | --cn-deep | #2B1A10 |
| color/border/default | --cn-line | #E7E2DB |
| color/border/input | --cn-inp | #D9D2C8 |
| color/status/neutral, -bg | --cn-neu, --cn-neu-bg | #4A443D, #F3EFE9 |
| color/status/info, -bg | --cn-info, --cn-info-bg | #244A7A, #E4ECF7 |
| color/status/ok, -bg | --cn-ok, --cn-ok-bg | #1F6B44, #EAF6EE |
| color/status/warn, -bg | --cn-warn, --cn-warn-bg | #6B4600, #FFF4DB |
| color/status/bad, -bg | --cn-bad, --cn-bad-bg | #9B1C12, #FEECEB |
| color/policy/part | --cn-policy-part | #D9A021 |

## Not done yet

- Request cards, the dashboard header and the money tables are still plain frames. They become components when the rest of the dashboards are designed, so the same pieces get reused there.
- Buttons with icons, and the numbered step circles, were left as frames.
- The older pages (Milestone 2, the plan boards) were not part of this pass.
