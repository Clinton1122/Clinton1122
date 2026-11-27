# Lumey Energy website: developer workflow guide

Read this with `BRAND-GUIDE.md`. Design source: https://www.figma.com/design/lyqlofnAeGi7G4MAPSAJ01/Lumey-energy-redesign

- **Desktop** frames are on the Figma page "Desktop (dark) — final". Each one is named `NN Page — Desktop`.
- **Mobile** frames are on the page "Mobile (dark) — final". Each one is named `NN Page — Mobile`.
- The JPG exports in `design/v2-dark/` (desktop) and `design/v2-dark/mobile/` are for quick reference only. Always measure from Figma.

---

## 1. Sitemap

| # | Page | URL (suggested) | Figma frame |
|---|---|---|---|
| 01 | Home | `/` | 01 Home |
| 02 | What is a PowerBox | `/powerbox` | 02 What is a PowerBox |
| 03 | Store | `/store` | 03 Store |
| 03b | Store category (template) | `/store/portable`, `/store/heavy-duty`, `/store/solar-panels`, `/store/accessories` | 03b Store / Portable PowerBoxes |
| 04 | Product page (one per model) | `/powerbox/600`, `/1500`, `/1900`, `/2600`, `/3100`, `/4000`, `/8000`, `/8000-plus` | 04 Product (PowerBox …) |
| 05 | Solar calculator | `/calculator` | 05 Solar calculator |
| 06 | Checkout | `/checkout` | 06 Checkout |
| 07 | Order received | `/checkout/received` | 07 Order received |
| 08 | Social impact | `/impact` | 08 Social impact |
| 09 | Partners and affiliates | `/partners` | 09 Partners and affiliates |
| 10 | Blog (list) | `/blog` | 10 Blog |
| 11 | Store locator | `/stores` | 11 Store locator |
| 12 | Projects / gallery | `/projects` | 12 Projects and gallery |
| — | Verify a PowerBox | `/verify` | Verify section (home, store locator) |
| — | Commercial quote | `/commercial` | Commercial band (store) |

Main menu: Choose PowerBox, Store, Solar calculator, Verify, Impact, Partners, Projects, Blog, plus Contact, Cart and Shop now.
Mobile menu: the full-screen sheet shown in "00 Menu open".

---

## 2. Build order (suggested)

1. **Foundation:** design tokens (colours, type, radius, spacing) from the brand guide; the global layout (announcement bar, header/menu, footer, floating assistant).
2. **Shared components:** section header (tag + line), section panel, buttons, cards, product card, chips, form inputs, image with scrim.
3. **Home:** the hero carousel first.
4. **Product page template:** drive it from the product data in section 4 so all 8 models come from one template.
5. **Store and category pages.**
6. **Calculator, checkout and order received.**
7. **Content pages:** What is a PowerBox, Impact, Partners, Blog, Stores, Projects.
8. **Responsive pass and QA** against the mobile frames.

---

## 3. Components and behaviour

| Component | Behaviour |
|---|---|
| **Announcement bar** | Thin yellow bar above the menu on every page except checkout. Content (label, message, link) comes from the CMS. It can be dismissed (remember this per visitor) and hidden when there's no campaign. |
| **Hero carousel (home)** | Slide 1: sunset solar-horizon scene with the PowerBox range. Slide 2: solar install. Slide 3: business at night. While a campaign runs (e.g. Black Friday), the campaign slide goes first. Autoplay 6–7s, swipe on mobile, dots plus "01 / 03" counter. The sunset scene can be an image export or CSS/SVG; ask the designer for layered assets. |
| **Section header** | Yellow tag plus a line across the section. A reusable component; see brand guide §4. |
| **Floating assistant** | Icon-only round button, fixed bottom-right. Tapping it expands it to "Ask me anything about Lumey" and opens the chat panel. Hidden on checkout. |
| **Product page buy actions** | "Buy now" and "Pay in instalments*" appear in the hero and again at the end of every section, so nobody has to scroll to buy. On mobile, a sticky buy bar slides up after the visitor scrolls past the price. |
| **Instalments (Klump)** | Wherever instalments are offered, show the orange note that interest applies. Checkout hands off to Klump. |
| **Add to cart** | On accessories and on "Explore other PowerBoxes" cards. |
| **Store category quick links** | Under "Shop by category", a row of 5 links that scroll to each category band. They become swipeable chips on mobile. |
| **Solar calculator** | The visitor picks appliances (quantity steppers), can add a custom appliance (name + watts), and picks backup hours. The tool calculates running load and energy (Wh), then recommends the smallest model that covers both. See §5. |
| **Lumey Assistant (AI chat)** | Full-width section on the calculator page; also the floating button. It answers questions in plain language and can hand off to WhatsApp. |
| **Checkout** | No account needed. Delivery details, then pay now or Klump. "Place order" sends the order details to the team's WhatsApp and shows the Order received page with bank transfer details. |
| **Verify a PowerBox** | Serial number input. The result shows model, approved store and warranty left (needs a backend list of serials). |
| **Store locator** | Search by state or city, "use my location", filter chips, a map with pins, and store cards with Directions and WhatsApp. |
| **Projects / gallery** | Masonry grid of real project photos with category filters. It should be easy for the team to upload new photos (CMS). |
| **"Our story" video** | Brand documentary on the home page. Click to play in a lightbox. |

---

## 4. Product data (drives the product template)

| Model | Series | Inverter | Battery | Price | With panels | Use | Runs (show these tiles only) |
|---|---|---|---|---|---|---|---|
| 600 | Portable | 400W | 600Wh lithium | ₦260,000 | ₦320,000 | Plug and play or house wiring | TV & decoder, fans & lights, laptop & Wi-Fi |
| 1500 | Portable | 1kW | 1,500Wh lithium | ₦380,000 | ₦500,000 | Plug and play or house wiring | TV & decoder, fans & lights, laptop & Wi-Fi |
| 1900 | Portable | 1kW | 1,900Wh lithium | ₦440,000 | ₦590,000 | Plug and play or house wiring | TV & decoder, fans & lights, laptop & Wi-Fi |
| 2600 | Portable | 2.5kVA | 2,600Wh lithium | ₦700,000 | ₦1,000,000 | Plug and play or house wiring | + fridge/freezer, microwave, washing machine |
| 3100 | Portable | 2.5kVA | 3,100Wh lithium | ₦800,000 | ₦1,100,000 | Plug and play or house wiring | same as 2600 |
| 4000 | Heavy duty | 5kVA | 4kWh LiFePO4 | ₦1,550,000 | ₦2,150,000 | House wiring only | everything, incl. air conditioner and pumping machine |
| 8000 | Heavy duty | 5kVA | 8kWh LiFePO4 | ₦2,000,000 | ₦2,600,000 | House wiring only | everything |
| 8000 Plus | Heavy duty | 10kVA | 8kWh LiFePO4 | ₦2,300,000 | ₦3,200,000 | House wiring only | everything |

Lifespan: 5+ years on portable models, up to 10 years on heavy duty. Warranty: 12 months.
**The "what it runs" lists are design assumptions. Confirm them with Lumey engineering before launch.** Store this in a CMS or JSON file, not hard-coded in the pages.

---

## 5. Calculator logic (starting point)

```
runningLoadW   = Σ (appliance.watts × quantity)
energyWh       = Σ (appliance.avgWatts × quantity) × backupHours
recommend      = smallest model where
                 inverterW  ≥ runningLoadW × 1.2   (headroom for start-up surge)
                 batteryWh × 0.85 ≥ energyWh       (about 85% usable battery)
if nothing fits → show "custom / commercial" with a WhatsApp CTA
```
Engineering should confirm the surge factor, usable battery percentage and appliance wattages.

---

## 6. Responsive rules

- **Breakpoints:** mobile up to 767px (designed at 390), tablet 768–1199px (use the mobile layout widened, 2 columns where it makes sense), desktop 1200px and up (designed at 1440, content max 1408).
- **Rows that become swipeable on mobile:** use cases, testimonials, best sellers, reviews, filters and category chips.
- **2-column grids on mobile:** stats, "what it powers", partner types, store model grid, gallery.
- **Images:** never stretch. Use `object-fit: cover` with a focal point; the hero on mobile shows the PowerBox above the text.
- **Section tags and headings** stay large on mobile (see the brand guide).

---

## 7. Assets

| What | Where |
|---|---|
| Product cut-outs (transparent PNG) | `design/ai-references/1-product-cutouts-transparent/`, `design/ai-references/5-victor-powerbox-images/` |
| Studio product photos | `design/ai-references/2-product-studio-photos/` |
| Team and customer photos (real) | `design/ai-references/3-people-and-team/` |
| Generated scene images | `design/ai-references/4-generated/` and the Figma file |
| Product video | `design/v2-dark/media/` |
| Export from Figma | Select a layer, then Export: WebP or AVIF for photos, SVG for icons. 2x for retina. |

The team's Lumey Google Drive has more real photos; ask for access.

---

## 8. Still placeholder (to confirm before launch)

- Black Friday discount % and dates
- Impact figures, number of states, projects and installs
- Bank details, store addresses and phone numbers
- Partner commission rates and payout schedule
- Upgrade / trade-in terms
- Weight and size for each model, and the "what it runs" lists
- The "solar ion" accessory name
- Real customer photos and videos, the brand documentary, heavy-duty photo shoot

---

## 9. Review session with the designer (before you start)

About 1 hour, screen-share the Figma file:
1. Walk the sitemap and the user journey (Home → What is a PowerBox → Store → Product → Checkout).
2. Tokens and the section header component.
3. Hero carousel and campaign slide behaviour.
4. Product template plus the product data table.
5. Calculator logic, checkout → WhatsApp and Klump.
6. Mobile differences (swipe rows, sticky buy bar, menu).
7. Agree how to hand off assets and the CMS fields (announcement bar, products, blog, gallery, stores).
8. Agree check-ins: a daily short update, and a design review of each finished page.

Questions during the build go to the designer as comments on the relevant Figma frame.

---

## 10. Photo shoot images

The full Lumey studio shoot is in `design/ai-references/6-lumey-photo-shoot/` (22 photos) and `design/ai-references/7-lumey-raw-photos/` (53 photos), resized to 1400–1600px. The originals, 2400px, are in the PDFs the team shared.

**Naming check:** the product cartons in the shoot are labelled **LE Powerbox 550** (400W / 550Wh), **LE Powerbox 1200** (800W / 1200Wh) and **LE Powerbox 2100** (1500W / 2100Wh). The website uses the 600 / 1500 / 1900 / 2600 / 3100 naming. Confirm the final model names and specs with Lumey before building the product data.
