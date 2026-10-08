# Lumey Energy website redesign: research findings

**Date:** 8 October 2026
**Inputs reviewed:**
- *Lumey Energy – Website PRD* (Google Doc, ~7,500 lines, 40+ pages specified)
- The four reference sites named in the PRD
- What search engines currently index for lumeyenergy.com
- Nigerian competitor pricing

**What I read and what I couldn't reach:**
- **Read line by line:** the sitemap, the global header and footer, Home, the Products hub, PowerBox 2600, the "Which PowerBox do I need?" sizing guide, and the master brief.
- **Read in part:** the price hub and the financing page.
- **Scanned:** every other page, by its purpose, H1, H2s, designer notes, `[NEEDS INPUT]` items and page-level notes.
- **Not reached directly:** this environment's network policy blocks lumeyenergy.com and the four reference domains. Findings about those sites come from search-engine snapshots, not from loading the pages live.

---

## 1. The short version

1. **The PRD is strong on content and weak on design.** The copy is final and verbatim for about 40 pages. It also covers SEO, schema and internal linking. But the visual system is only "black, yellow accent", plus layout tokens. There is no type scale, no spacing system, no component library and no motion rules. The revamp needs a real design system, or 40 pages will be built 40 different ways.
2. **Facts block the site more than design does.** The PRD has **227 `[NEEDS INPUT]` markers**. Most of them come back to about 10 operational facts: run-times, the spec sheet, kVA ratings, financing terms, warranty terms, the Akure address, active phone numbers, the units-sold figure, how installation works, and how the upgrade works. Until those exist, the most persuasive sections ship empty.
3. **The current site is actively hurting the brand.** It shows a different product line, different specs and different prices from the pricing sheet. Its product pages render client-side, so Google sees "Loading product…". It also has stock-photo testimonials, dead footer links, an empty blog block, two Akure addresses and four phone numbers. (Details in §3.)
4. **The single biggest opportunity is published prices plus a sizing tool, server-rendered.** No one in the reference set does both. EcoFlow publishes prices but cannot size for you. Reeddi does neither. Letsgosolar has a runtime calculator, but it is broken and reads 0.0 hours.
5. **Lumey's price-to-capacity ratio beats EcoFlow Nigeria at most price points** (§4.4). If it is presented honestly, that is the strongest sales argument the site has, and the PRD doesn't use it yet.

---

## 2. What the PRD specifies

### 2.1 Structure

- **Sitemap:** Home, Products hub, 2 series pages and 8 model pages (600, 1500, 1900, 2600, 3100, 4000, 8000, 8000 Plus).
- **Product tools:** Accessories, Compare, the "Which PowerBox do I need?" sizing tool, and Custom Systems.
- **Buying and pricing:** the Price hub (`/solar-generator-prices-in-nigeria`), Where to Buy, Financing, Dealers, Earn (referrals) and Verify Product.
- **Company and proof:** About, Made in Nigeria, Impact and Projects.
- **Support:** a hub plus Setup, Troubleshooting, Upgrades, Maintenance and Warranty.
- **Content and admin:** Blog (15 article titles), FAQs, Contact, and the legal pages.

**Reference sites and what the PRD asks for from each:**

| Reference | Role in the PRD |
|---|---|
| reeddi.com | Homepage layout and section rhythm |
| letsgosolar.co/tursanyc1100 | Layout and architecture for every product page |
| thrillhouse.com.ng | Purchase flow: buy, add to cart, instalments |
| ng.ecoflow.com | Secondary or alternate layout |

### 2.2 Non-negotiables that run through the whole PRD

These matter for any tech choice.

- **Server-render everything.** Prices, model names, spec tables and FAQ answers must be in the HTML source. Accordions hide answers with CSS and never inject them on click.
- **One source of truth.** A single data source feeds prices, warranty terms, addresses and phone numbers. Prices currently appear on 11+ pages, warranty terms on 11 and contact details on 4+.
- **WhatsApp is the checkout.** There is a persistent yellow WhatsApp button on mobile. Each product gets a pre-filled message, and the sizing tool hands its result over to WhatsApp.
- **Comparison tables stay tables on mobile.** Freeze the Model column, allow horizontal scroll inside the container only, and never turn the table into cards.
- **No stock photography and no invented numbers.** If a fact is missing, the section waits rather than shipping a placeholder.
- **Schema everywhere:** Organization, two LocalBusiness entries (Akure, Lagos), Product with two Offers per model (box only and bundle, in NGN), FAQPage, HowTo and BreadcrumbList.
- **Kill the scrolling marquee** on the homepage hero and replace it with a static trust strip. The global header spec still says "Retain the current marquee" for the utility bar, so the PRD needs to settle this.

### 2.3 Inconsistencies inside the PRD to resolve before build

These are things a developer will hit on day one.

| Issue | Detail |
|---|---|
| **Linked pages that don't exist in the sitemap or the spec** | `/products/solar-panels` (linked **45×**), `/partners` (30×), `/solar-generator-vs-petrol-generator` (18×), `/solar-generator-vs-inverter-system` (12×), all 7 `/solutions/*` pages (40+ links in total), and `/solar-generator-akure` and `/solar-generator-lagos`. Either specify them or remove the links. |
| **URL drift** | Custom systems appears as `/product/custom-solar-systems` (sitemap), `/custom-solar-systems` (links) and `/products/…`. Warranty appears as `/warranty-policy` (sitemap) and `/support/warranty` (78 links). The legal bar lists "Shipping & Returns", which has no page. Pick one URL each. |
| **Solutions mismatch** | The nav dropdown has 7 solutions, including Events. The homepage carousel has 6 and leaves out Events. |
| **Marquee** | The header spec keeps the marquee. The hero spec kills it. |
| **Header weight** | 7 nav items, 3 dropdowns and 2 CTAs, plus a utility bar. That's heavy. I'd merge Prices into the Products mega-menu footer and keep it as a top-level link, then drop Blog from the top nav into the footer. |
| **Price staleness** | Accessory prices are flagged "confirm current as of August 2026". It's now October, so every price needs re-confirming at build time. |

---

## 3. The current site (lumeyenergy.com): what's wrong

From the PRD's audit, plus what search engines index today:

- **The product line doesn't match the pricing sheet.** Search snapshots show the live site selling the Powerbox **550 / 1200 / 6500**: for example, 550 at ₦469,000 as a solar package, 1200 at ₦330,000 / ₦689,000, and 6500 at ₦1,550,000 / ₦2,573,000. The new range is the 600–8000 Plus.
- **kVA ratings conflict on 5 models.**

  | Model | Live site | Pricing sheet |
  |---|---|---|
  | 2600 | 3kVA | 2.5kVA |
  | 3100 | 3kVA | 2.5kVA |
  | 4000 | 6kVA | 5kVA |
  | 8000 | 6kVA | 5kVA |
  | 8000 Plus | 12kVA | 10kVA |

- **One bundle price conflicts:** the 1500 bundle is ₦530,000 on the site and ₦500,000 on the sheet.
- **Product pages are invisible to search.** `/products/LE 2600` returns "Loading product…" with no price, name or spec in the HTML. The URLs also contain spaces (`LE%20550`).
- **The metadata is wrong.**
  - The title and description are duplicated on every page.
  - `theme-color` and `og:image` are orange, not the brand's yellow and black.
- **The claims are unverified and contradict each other.**
  - "Nigeria's No 1 Indigenous Solar solutions Provider."
  - "Save up to 85%."
  - The product cards imply about 1,389 units sold, but the pitch deck says 45 units since July 2025.
  - "Earn up to ₦150,000/month."
  - "We respond in about 5 minutes."
- **Trust is broken in several places.**
  - Testimonials use stock photos and first names only.
  - Three footer links go nowhere (Privacy, Shipping & Returns, Warranty).
  - The "Latest from Our Blog" block is empty.
  - The site gives a different Akure address from the product flyer: A&T Presidential Hotel, Onitsha–Owo Expressway on the site, versus Topmost Floor, MTN Office Building, opposite Oyemekun Grammar School on the flyer.
  - Four phone numbers are published across the site and the flyer.
  - The contact email is `lumeyenergy@gmail.com`.

**Keep from the current site:** the yellow/black identity, the "made in Nigeria" positioning, the existing Verify Product mechanism (whatever it is today), the referral programme (rewritten), and the four past project entries (Akure, Abuja, Ibadan, Asaba), once model and load are added to each.

---

## 4. The reference sites: what to take, and what to beat

### 4.1 Reeddi (reeddi.com): homepage benchmark

- **What it is:** a Lagos climate-tech brand. Products are the Capsule (about 250Wh), EnergyBox and BigEnergy, plus the TempOwn rental marketplace. The Capsule + panel bundle is listed at about ₦299k.
- **Borrow:**
  - **Credibility stacking.** Reeddi uses the Earthshot Prize 2021 finalist status, the MIT Clean Energy Prize and Bloomberg New Economy Catalyst on a dedicated Impacts & Awards page. Lumey should build the same block (press, grants, accelerators, certifications) as soon as it has *real* items.
  - **Mission-led framing** that speaks to buyers and funders on the same page. The PRD's About and Impact pages already aim for this.
  - **Product family naming**, so the range reads as a system.
- **Beat:**
  - **Impact numbers.** Reeddi's are inconsistent: 3,000+ on the homepage against 1,000 and 600 in other sources. That is exactly the trap the PRD warns about with Lumey's 45 vs 1,389. Lead with the 75% referral rate until the real units figure is confirmed.
  - **Prices and sizing help.** Reeddi publishes neither prominently. Lumey will.

### 4.2 Letsgosolar Tursan YC1100: product-page benchmark

- **What it is:** a single-product landing page for a Chinese OEM unit resold in Nigeria.
  - **Price:** ₦369,999, shown up front.
  - **Specs:** 1,000W continuous, 2,000W surge, 1,008Wh LiFePO4 (BYD cells), 4,000 cycles, 14.2 kg.
  - **Extras:** a "what can it power" list, a runtime calculator, a 2-year warranty, free adapters and nationwide delivery.
- **Borrow:**
  - **The above-the-fold formula:** price, a headline spec strip (watts, surge, Wh, chemistry, cycles, weight), warranty, delivery and a buy CTA.
  - **A "what can it power" list** in plain appliance words.
  - **An incentive line** ("2 free adapters"). Lumey could pair a box with a discounted inverter iron.
- **Beat:**
  - **Fix the calculator.** Letsgosolar's runtime calculator reads 0.0 hours, which tells buyers the vendor doesn't check its own page. Ship Lumey's sizing tool only when its numbers are signed off. A broken calculator is worse than none.
  - **Fill the spec gaps.** Weight, surge, cycle life and recharge time are exactly the fields Lumey's spec tables leave blank today (PowerBox 2600 §4 has 13 empty rows). The competitor publishes them, so buyers will compare.
  - **Publish your own warranty in writing.** The reseller's warranty (2 years) differs from the OEM catalogue (3+2 years). Lumey can win on clarity: one written warranty, from the maker.

### 4.3 Thrillhouse (thrillhouse.com.ng): purchase-flow benchmark

- **What it is:**
  - **Business:** an Ile-Ife solar and inverter installer.
  - **Packages:** named tiers (Thrill-Sharp 1.5kW, Regular 2.5kW, Active Mini 5kW, Mega 10kW, Master 12kW).
  - **Pricing:** shown as ranges driven by variant selectors (lead-acid vs lithium, with or without solar).
  - **Instalments:** "Pay small small. Own it big", paid at checkout through **Klump** (a BNPL provider).
- **Borrow:**
  - **Variant selectors on the product page.** "PowerBox only / PowerBox + panels" should be a toggle that updates the price, the CTA and the pre-filled WhatsApp message.
  - **Instalments at the point of purchase**, not on a separate page. This matters most for Lumey. The PRD's `/financing` page is entirely blocked on 10 commercial questions (deposit, tenor, interest, provider…). **Plugging in an existing Nigerian BNPL provider (Klump, CDcare, Carbon, etc.) would answer most of those questions with the provider's own terms**, and could unblock the page in days instead of waiting for an in-house scheme.
  - **The "pay small small" language.** It's native and memorable.
- **Beat:** Thrillhouse's terms page doesn't explain instalment fees or schedules. Lumey's financing page should show a worked monthly figure per model, as the PRD asks.

### 4.4 EcoFlow Nigeria (ng.ecoflow.com): secondary layout, and the real competitor

- **What it is:** a polished Shopify store.
  - **Range:** series collections (RIVER = portable, DELTA = home backup).
  - **Prices:** in naira, with strikethrough sale prices.
  - **Service promises:** free shipping, "up to 10-year warranty" (but 24 months on most power stations per their warranty table), and a 48-hour after-sales promise.
  - **Proof:** a customer testimonial about wiring a unit into the DB board with an ATS.
- **Borrow:**
  - **Series-collection architecture**, which maps directly to Portable and Heavy Duty.
  - **Scenario-led merchandising** (home backup, outdoors).
  - **A visible service promise with a number** ("48h").
- **Value comparison.** Indicative prices from search snapshots; re-check before publishing.

  | Price point | EcoFlow NG | Lumey (pricing sheet) |
  |---|---|---|
  | Entry | RIVER 3: 245Wh / 300W, ₦309,000 | PowerBox 600: 600Wh / 400W, **₦260,000** |
  | Mid | DELTA 3 Classic: 1,024Wh / 1,800W, ₦798,000 | PowerBox 2600: 2,600Wh / 2kW, **₦700,000** |
  | Home backup | DELTA Pro: 3.6kWh / 3,600W, ₦2,352,000 | PowerBox 8000: 8kWh LiFePO4 / 4kW, **₦2,000,000** |

  Roughly **2–2.5× the stored energy for less money** at every tier. That's a headline argument, for example a "What ₦700,000 buys you" comparison.
- **Caveat: be honest about chemistry and warranty.** EcoFlow uses LiFePO4 across the DELTA line. Lumey's portable series is listed as "lithium-ion" with only a 12-month inverter warranty, and the battery warranty is unstated (PRD flags this). A fair comparison has to state chemistry, cycle life and warranty side by side, or a sharp buyer will turn it against Lumey. Also consider whether to name competitors at all. A generic "imported 1kWh power station" comparison avoids the legal and brand risk.

---

## 5. Recommendations that go beyond the PRD

### 5.1 Unblock the facts first (Phase 0, before any design)

Make a one-page **Lumey facts sheet**, owned by one person, and build it as the site's data file:

1. **Per-model spec sheet:** kVA (settle all 5 conflicts at once), surge, system voltage, weight, dimensions, socket counts, AC and solar recharge times, cycle life, DoD, and battery chemistry for the portable series.
2. **The run-time derate factor.** Suggested starting point: `runtime ≈ Wh × 0.85 ÷ load W`, labelled "estimate" and signed off by engineering. Example: PowerBox 2600 at a 400W overnight load is about 2,600 × 0.85 ÷ 400 ≈ **5.5 hours**. This one number unlocks the most valuable sentence on the site: "Runs your fridge, fan, TV and 10 bulbs for X hours."
3. **The real Akure walk-in address and the active phone numbers**, each with a role (sales, support, custom).
4. **Warranty terms**, including portable battery cover, exclusions and the claim process.
5. **Financing:** provider, deposit, tenor, cost, and whether the unit is received at the start of the plan. Or pick a BNPL partner (§4.3).
6. **Units sold.** Real figure. If it's modest, lead with the 75% referral rate.
7. **Installation model:** who installs, where, at what cost. This blocks 4 pages.
8. **The upgrade mechanism behind "save around 40%".** It's repeated on 13 pages with no mechanism behind it. Confirm it or remove it.
9. **Verify Product:** how it actually works today (serial lookup, or a WhatsApp check).
10. **Branded email** (`hello@lumeyenergy.com`). This is configuration only, and the domain already exists.

### 5.2 Tech approach

- **Astro (or Next.js with static generation) plus a typed `products.ts` / `site.ts` data source.**
  - Astro outputs plain server-rendered HTML by default, which satisfies every "must be in the HTML source" rule in the PRD.
  - It hydrates only the interactive islands: the sizing tool, the price toggle, the mobile sticky bar and the financing calculator.
- **One data source generates everything.** That covers the price tables (home, hub, price page, 8 product pages), Product/Offer JSON-LD, the "Prices last updated" date (derived from the data file's change date, never hard-coded) and the pre-filled WhatsApp links.
- **301 map** from every `/products/LE%20xxx` URL to `/products/powerbox-xxx`.
- **Hosting:** Vercel, Netlify or Cloudflare Pages. All are free or cheap, with a global CDN. Add GA4 or Plausible with events for WhatsApp clicks, sizing-tool completions and the model recommended. The PRD asks for tool tracking.

### 5.3 Built for Nigerian phones and data

The PRD doesn't spell this out, and it decides whether the site feels premium on the devices buyers actually use.

- **Budgets:** under 100 KB of JS on content pages; LCP under 2.5 s on a mid-range Android over 4G; hero image in AVIF/WebP at 1600 px or less with `srcset`.
- **No autoplay video, no marquee, no heavy animation libraries.** Use CSS-only fade-ups and respect `prefers-reduced-motion`.
- **Tap-to-call** on every number, a WhatsApp button reachable by thumb, and 44 px tap targets (the PRD specifies this for the sizing tool; apply it sitewide).
- **System font fallback with `font-display: swap`**, and tabular numerals for every price so naira columns align.

### 5.4 Design system to define (missing from the PRD)

- **Colour tokens:**
  - Brand yellow (exact hex from the logo) and near-black `#0B0B0B`.
  - Off-white, plus one mid grey and one light grey.
  - One red for the troubleshooting safety panel only.
  - Check contrast: yellow on white fails WCAG, so yellow is for fills and accents behind black text, never for text on white.
- **Type:**
  - One confident display face for H1/H2 and a highly legible text face. Avoid defaulting to Inter everywhere.
  - A fixed scale (e.g. 14/16/18/24/32/48/64).
  - Prices set heavier than body text, as the PRD asks.
- **Components:**
  - Price block (box only / bundle toggle) and sticky buy-bar.
  - Spec table and frozen-column comparison table.
  - Numbered problem card (01/02/03, no icons, per the PRD).
  - Stepper, FAQ accordion (CSS-hidden answers), trust strip and WhatsApp CTA.
  - Model-ladder rung, with a "same capability, longer backup" variant for the 1900, 3100 and 8000.
- **Photography direction:** the PRD already describes ~60 shots in detail. Prioritise one paid shoot.
  - The Akure production floor and testing (PRD: "if only one photography commission is funded… this one").
  - The 8-model lineup on black (reused on 4+ pages).
  - The PowerBox 2600 kitchen shot ("the photograph that sells the model").
  - A consistent three-quarter studio angle for all 8 units.

### 5.5 Conversion ideas worth adding

- **"Send this to WhatsApp" everywhere it makes sense.** Product pages pre-fill the model, the chosen variant, the price and the page URL. The sizing tool pre-fills the appliance list, load, hours and recommended model. Tag each with a source code so sales can see which page produced the chat.
- **Fuel-savings calculator** on `/solar-generator-vs-petrol-generator`: monthly fuel spend in, payback months out. The PRD needs the pump price as an input; let the *user* type their own spend so the page never goes stale.
- **Google Business Profiles** for Akure and Lagos, with real reviews, linked from the footer. That's local proof that can't be faked.
- **Launch order by readiness, not by sitemap.** The price hub is the PRD's own "fastest priority-1 page to get live" (no blocking inputs). Ship it first, with the products hub and the 8 model pages (with honest gaps hidden, not bracketed), so search traffic starts while the facts sheet is finished.

---

## 6. Proposed phasing

| Phase | Scope | Depends on |
|---|---|---|
| **0: Facts & foundations** | Facts sheet (§5.1), design tokens and components, data model, Astro scaffold, redirects | Lumey team answers |
| **1: Sell** | Home, Products hub, 8 model pages, Price hub, Compare, Sizing guide (static sections first, tool once numbers are signed off), Where to Buy, Contact, Warranty | Specs, address, warranty terms |
| **2: Trust** | About, Made in Nigeria, Projects, Verify Product, Support hub plus Setup/Troubleshooting/Maintenance, Accessories, Custom Systems | Photography, verify mechanism |
| **3: Grow** | Financing (once terms or a BNPL partner are in place), Upgrades, Dealers, Earn, the 7 Solutions pages, the vs-petrol and vs-inverter pages, local pages, Blog (launch with 6+ articles, never empty) | Commercial terms, content |

---

## Sources

- Lumey Energy – Website PRD (Google Doc, shared with the user)
- [lumeyenergy.com, as indexed](https://www.lumeyenergy.com/)
- [Reeddi homepage](https://www.reeddi.com/) · [Reeddi Capsule](https://www.reeddi.com/reeddi-capsule) · [Reeddi Impacts & Awards](https://www.reeddi.com/awards/) · [Earthshot Prize: Reeddi Capsules](https://earthshotprize.org/winners-finalists/reeddi-capsules/)
- [Letsgosolar: Tursan YC1100](https://letsgosolar.co/) · [Tursan portable power station](https://tursanenergy.com/products/portable-power-station/)
- [Thrillhouse homepage](https://www.thrillhouse.com.ng/) · [Thrill-Spark package (Klump instalments)](https://www.thrillhouse.com.ng/shop/alternative-energy/solarinverter-packages/thrill-spark3-6kw-solar-inverter-package/) · [Thrillhouse terms](https://www.thrillhouse.com.ng/terms-and-conditions/)
- [EcoFlow Nigeria](https://ng.ecoflow.com/) · [DELTA 3](https://ng.ecoflow.com/products/delta-3-portable-power-station) · [RIVER series](https://ng.ecoflow.com/collections/river-series-portable-power-stations) · [DELTA Pro](https://ng.ecoflow.com/products/delta-pro-portable-power-station) · [EcoFlow NG warranty](https://ng.ecoflow.com/pages/warranty-policy)
