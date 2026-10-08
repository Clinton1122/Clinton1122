// The single source for every model, spec and price on the site.
// The homepage table, the products hub, the price page, the sizing guide,
// all eight product pages and the Product/Offer schema read from here.
// Change a price here and every page follows. The "Prices last updated" date
// is taken from this file's last git commit at build time (see lib/prices.ts).
//
// Source: Lumey Energy Website PRD (pricing sheet and flyer figures).
// Open items flagged in the PRD are marked TODO(confirm).

export type Series = 'portable' | 'heavy-duty';

export interface Product {
  slug: string;
  name: string;
  short: string; // "2600"
  series: Series;
  inverter: string; // as displayed
  inverterW: number; // continuous watts, for sizing maths
  batteryWh: number;
  chemistry: 'Lithium-ion' | 'LiFePO4';
  panels: string; // recommended bundle
  panelCount: number;
  panelW: number;
  maxPv?: string;
  priceBox: number; // naira
  priceBundle: number; // naira
  runs: string; // one line for tables
  whoFor: string;
  body: string[];
  bestFor: string[];
  notFor: string[];
  note?: string;
  /** Model with the same inverter and a bigger battery (time, not capability). */
  twinOf?: string;
  priority: 1 | 2;
}

export const products: Product[] = [
  {
    slug: 'powerbox-600',
    name: 'PowerBox 600',
    short: '600',
    series: 'portable',
    inverter: '400W (12V)',
    inverterW: 400,
    batteryWh: 600, // TODO(confirm): the old site sells this unit as the "Powerbox 550" with 550Wh.
    chemistry: 'Lithium-ion',
    panels: '1 × 200W',
    panelCount: 1,
    panelW: 200,
    maxPv: '200W',
    priceBox: 260_000,
    priceBundle: 320_000,
    runs: 'Bulbs, fan, laptop, 32" LED TV, decoder',
    whoFor:
      'A student in a hostel. A single room. A shop counter. Anyone who wants light, air and a charged laptop when the power goes, and does not need to run a fridge.',
    body: [
      'It runs your bulbs, a fan, your laptop, a 32" LED TV, a decoder and a small sound system. It is the lightest unit in the range and the easiest to move: one person, one hand, one trip.',
      'The bundle pairs it with a single 200W panel, which is also its maximum PV input.',
    ],
    bestFor: ['bulbs', 'fan', 'laptop', '32" TV', 'decoder'],
    notFor: ['fridges', 'microwaves', 'irons', 'air conditioners'],
    priority: 1,
  },
  {
    slug: 'powerbox-1500',
    name: 'PowerBox 1500',
    short: '1500',
    series: 'portable',
    inverter: '1kW',
    inverterW: 1000,
    batteryWh: 1500,
    chemistry: 'Lithium-ion',
    panels: '1 × 400W',
    panelCount: 1,
    panelW: 400,
    maxPv: '600W',
    priceBox: 380_000,
    priceBundle: 500_000, // TODO(confirm): the old site shows ₦530,000 for this bundle.
    runs: 'Everything above, plus a table-top fridge up to 120L, a 10kg washing machine, a blender up to 700W, a 500W inverter iron',
    whoFor:
      'A small flat or a family that wants the essentials plus a small fridge. The first model in the range that keeps food cold.',
    body: [
      'Everything the 600 runs, plus a table-top or energy-saving fridge up to 120L, a home washing machine up to 10kg, a blender up to 700W, and a 500W inverter iron.',
      'The bundle ships with a 400W panel, and it accepts up to 600W of PV if you want to add more later.',
      'Be honest with yourself about the exclusions: no microwave, no air fryer, no big freezer or double-door fridge above 120L, no air conditioner, no pumping machine. If you want those, the 2600 is where they start.',
    ],
    bestFor: ['everything on the 600', 'table-top fridge ≤120L', '10kg washing machine', 'blender ≤700W', 'inverter iron ≤500W'],
    notFor: ['microwaves', 'air fryers', 'freezers', 'double-door fridges', 'air conditioners', 'pumping machines'],
    priority: 1,
  },
  {
    slug: 'powerbox-1900',
    name: 'PowerBox 1900',
    short: '1900',
    series: 'portable',
    inverter: '1kW',
    inverterW: 1000,
    batteryWh: 1900,
    chemistry: 'Lithium-ion',
    panels: '1 × 600W',
    panelCount: 1,
    panelW: 600,
    maxPv: '600W',
    priceBox: 440_000,
    priceBundle: 590_000,
    runs: 'The same loads as the 1500, with longer backup',
    whoFor:
      "Someone who has decided on the 1500's capability but wants the lights to stay on longer into the night.",
    body: [
      'The same 1kW inverter as the 1500, on a larger 1,900Wh battery. It does not run anything new; it runs the same things for longer.',
      'For ₦60,000 more on the box, you get roughly a quarter more stored energy, which is the cheapest backup time in the range. The bundle pairs it with a 600W panel, so it also recharges faster on a sunny day.',
    ],
    bestFor: ['the same loads as the 1500, with longer backup'],
    notFor: ['microwaves', 'air fryers', 'freezers', 'air conditioners', 'pumping machines'],
    twinOf: 'powerbox-1500',
    priority: 2,
  },
  {
    slug: 'powerbox-2600',
    name: 'PowerBox 2600',
    short: '2600',
    series: 'portable',
    inverter: '2kW (2.5kVA)', // TODO(confirm): the old site says 3kVA.
    inverterW: 2000,
    batteryWh: 2600,
    chemistry: 'Lithium-ion',
    panels: '2 × 600W',
    panelCount: 2,
    panelW: 600,
    maxPv: '1,300W',
    priceBox: 700_000,
    priceBundle: 1_000_000,
    runs: 'The full household: fridge or freezer, microwave, washing machine, induction cooker up to 1,500W',
    whoFor:
      'A full household that wants to forget the generator exists. This is the model most families end up on.',
    body: [
      'This is the step change in the range. It runs everything the 1500 and 1900 run, and then adds the things that actually make a house feel normal: a proper fridge or freezer, a microwave, a washing machine, an induction cooker up to 1,500W.',
      'The bundle ships with two 600W panels and the unit accepts up to 1,300W of PV.',
      'It still does not run an air conditioner or a pumping machine. If either of those is non-negotiable, you are looking at the PowerBox 4000.',
    ],
    bestFor: ['fridge or freezer', 'microwave', 'washing machine', 'induction cooker ≤1,500W', 'all lighting and entertainment'],
    notFor: ['air conditioners', 'pumping machines'],
    priority: 1,
  },
  {
    slug: 'powerbox-3100',
    name: 'PowerBox 3100',
    short: '3100',
    series: 'portable',
    inverter: '2kW (2.5kVA)', // TODO(confirm): the old site says 3kVA.
    inverterW: 2000,
    batteryWh: 3100,
    chemistry: 'Lithium-ion',
    panels: '2 × 600W',
    panelCount: 2,
    panelW: 600,
    maxPv: '1,300W',
    priceBox: 800_000,
    priceBundle: 1_100_000,
    runs: 'The same loads as the 2600, with longer backup',
    whoFor:
      "A household on the 2600's capability that runs heavier through the night, or lives somewhere the grid barely appears.",
    body: [
      'The same 2kW (2.5kVA) inverter as the 2600, on a 3,100Wh battery: about 500Wh more stored energy for ₦100,000 more on the box. Same panels, same maximum PV.',
      'The question is not what it runs; it is how long you need it to keep running after dark.',
    ],
    bestFor: ['the same loads as the 2600, with longer backup'],
    notFor: ['air conditioners', 'pumping machines'],
    twinOf: 'powerbox-2600',
    priority: 2,
  },
  {
    slug: 'powerbox-4000',
    name: 'PowerBox 4000',
    short: '4000',
    series: 'heavy-duty',
    inverter: '4kW (5kVA)', // TODO(confirm): the old site says 6kVA.
    inverterW: 4000,
    batteryWh: 4000,
    chemistry: 'LiFePO4',
    panels: '4 × 600W',
    panelCount: 4,
    panelW: 600,
    priceBox: 1_550_000,
    priceBundle: 2_150_000,
    runs: 'Household and office loads, pumping machine, one inverter AC for day use with panels',
    whoFor:
      'A larger home or a small office that needs everything the 2600 does plus water and, during the day, cooling.',
    body: [
      'It carries everything the 2600 and 3100 carry, and adds household and office loads, a pumping machine, and one inverter AC, best run during the day with the panels feeding it. The bundle ships with four 600W panels.',
      'LiFePO4 is the reason this range is priced differently. It handles deeper daily cycling and far more cycles over its life than standard lithium, which is why we back these batteries for five years rather than one.',
    ],
    bestFor: ['full household and office loads', 'pumping machine', '1 inverter AC (day use with panels)'],
    notFor: ['night-time AC (look at the 8000)'],
    priority: 1,
  },
  {
    slug: 'powerbox-8000',
    name: 'PowerBox 8000',
    short: '8000',
    series: 'heavy-duty',
    inverter: '4kW (5kVA)', // TODO(confirm): the old site says 6kVA.
    inverterW: 4000,
    batteryWh: 8000,
    chemistry: 'LiFePO4',
    panels: '4 × 600W',
    panelCount: 4,
    panelW: 600,
    priceBox: 2_000_000,
    priceBundle: 2_600_000,
    runs: 'Everything the 4000 carries, with extended backup for day use and mild night use',
    whoFor:
      'The same loads as the 4000, but you need them to survive a long outage or you want mild AC use after dark.',
    body: [
      'The same 4kW (5kVA) inverter as the 4000, on double the storage: 8kWh of LiFePO4. It runs everything the 4000 runs, with extended backup: day use preferably, and mild night use.',
      'Four 600W panels in the bundle, same as the 4000, because the inverter rating has not changed, only the tank behind it.',
    ],
    bestFor: ['everything on the 4000', 'extended backup', 'mild night use'],
    notFor: ['a second air conditioner (that needs the 8000 Plus)'],
    note: 'The inverter rating is identical to the 4000. If you need to run more at once rather than the same for longer, go to the 8000 Plus.',
    twinOf: 'powerbox-4000',
    priority: 1,
  },
  {
    slug: 'powerbox-8000-plus',
    name: 'PowerBox 8000 Plus',
    short: '8000 Plus',
    series: 'heavy-duty',
    inverter: '8kW (10kVA)', // TODO(confirm): the old site says 12kVA.
    inverterW: 8000,
    batteryWh: 8000,
    chemistry: 'LiFePO4',
    panels: '6 × 600W',
    panelCount: 6,
    panelW: 600,
    priceBox: 2_300_000,
    priceBundle: 3_200_000,
    runs: 'Heavy home and office loads, pumping machine, one or two 1hp inverter ACs',
    whoFor:
      'A big house, a serious office, or a commercial space that wants two air conditioners and no compromises.',
    body: [
      '8kW (10kVA) inverter on the same 8kWh LiFePO4 battery: double the instantaneous power of the 8000. It carries heavy home and office loads, a pumping machine, and one or two 1hp inverter ACs, with extended backup for day use and mild night use on one AC.',
      'Six 600W panels in the bundle, because at this rating you want the array to keep up. This is the largest standard model we build. Past this, we build to order.',
    ],
    bestFor: ['heavy home and office loads', 'pumping machine', '1–2 × 1hp inverter ACs'],
    notFor: ['loads above 8kW (we design a custom system)'],
    priority: 2,
  },
];

export const seriesInfo: Record<Series, { name: string; slug: string; blurb: string }> = {
  portable: {
    name: 'Portable Series',
    slug: 'portable-solar-generators',
    blurb:
      'Five models, from 600Wh to 3,100Wh. Light enough to move between rooms. This is the range most homes buy from.',
  },
  'heavy-duty': {
    name: 'Heavy Duty Series',
    slug: 'heavy-duty-solar-generators',
    blurb:
      'Three models built around LiFePO4 batteries and 4kW to 8kW inverters. Everything the portable range carries, plus pumping machines and inverter air conditioners.',
  },
};

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);
export const inSeries = (s: Series) => products.filter((p) => p.series === s);

/** The models directly below and above, for the "against its neighbours" table. */
export function neighbours(p: Product) {
  const i = products.indexOf(p);
  return { below: products[i - 1], above: products[i + 1] };
}

export const priceRange = {
  min: Math.min(...products.map((p) => p.priceBox)),
  max: Math.max(...products.map((p) => p.priceBundle)),
};
