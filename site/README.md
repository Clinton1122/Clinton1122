# Lumey Energy website

Astro, fully static: every price, spec and FAQ answer is in the HTML. Styles come from the design system in `../design-system` (tokens and `lm-` components); fonts are self-hosted.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
npm run check    # type check
```

## Where things live

| What | File |
|---|---|
| Every model, spec and price (the single source) | `src/data/products.ts` |
| Phone numbers, offices, email, warranty terms | `src/data/site.ts` |
| Naira formatting, WhatsApp links | `src/lib/format.ts` |
| "Prices last updated" (from the last git commit to `products.ts`) | `src/lib/prices.ts` |
| Schema.org JSON-LD (Organization, Product + Offers, FAQPage, BreadcrumbList) | `src/lib/schema.ts` |
| Page shell: meta tags, header, footer, WhatsApp button | `src/layouts/Base.astro` |
| Old URL redirects (Netlify / Cloudflare Pages) | `public/_redirects` |

To change a price, edit `products.ts` and commit; every table, product page, FAQ answer and schema offer updates, and so does the "last updated" date.

## Logo

Commit the official logo as `public/brand/lumey-logo.svg` (or `.png`). The header and footer switch to it on the next build. Replace `public/favicon.svg` with the mark too.

## Built so far

Home, Products hub, all eight PowerBox pages, Solar generator prices in Nigeria, the static sections of "Which PowerBox do I need?", and 404.

Still to build (linked already, currently 404): `/about`, `/about/made-in-nigeria`, `/blog`, `/contact`, `/custom-solar-systems`, `/financing`, `/privacy-policy`, `/projects`, `/support`, `/support/warranty`, `/terms`, `/verify-product`, `/where-to-buy`, plus the interactive sizing tool.

## Open facts

Search the code for `TODO(confirm)`. The kVA ratings, the PowerBox 600 / 550 naming, the 1500 bundle price, office addresses, social links, and portable battery warranty all need confirming before launch.
