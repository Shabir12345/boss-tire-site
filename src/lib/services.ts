// ─── Service catalog ────────────────────────────────────────────────────────
// The eleven services Boss Tire publishes prices for. Prices are the shop's own
// public pricing (live on the old WooCommerce store, 2026-08-18) — a real
// conversion asset, since most Scarborough competitors hide theirs. Prices are
// ex. tax, matching how the shop has always shown them.
//
// Not carried over without Fawad's confirmation (content manifest §2, §7):
//   - "per wheel" on tire storage (the old site never said it — shown as a flat
//     price here until confirmed)
//   - the $79.99 vs $80 alignment split (using $80, the product price)
// Two prices "can vary" and say so. Nothing here invents a claim the shop
// hasn't already published.

export interface Faq {
  q: string;
  a: string;
}

export type ServiceCategory = "Tires" | "Wheels & Alignment" | "Mechanical" | "Muffler & Exhaust" | "Detailing";

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  category: ServiceCategory;
  price: number; // CAD, ex. tax
  priceNote?: string; // e.g. "per tire", "price can vary by vehicle"
  blurb: string; // one-line card blurb
  included: string[]; // what the job covers (from WooCommerce short descriptions — new material)
  featured?: boolean; // surfaced on the homepage
}

// The two live promos, keyed to wheel alignment.
export const ALIGNMENT_OFFERS = [
  { buy: "4 tires", saving: "50% off wheel alignment" },
  { buy: "2 tires", saving: "25% off wheel alignment" },
] as const;

export const SERVICES: Service[] = [
  {
    slug: "tire-changeover",
    name: "Tire Changeover",
    shortName: "Changeover",
    category: "Tires",
    price: 60,
    blurb: "Seasonal swap done right, while you wait.",
    included: [
      "Tire inspection before we start",
      "Mount and balance",
      "Tire pressure set to spec",
      "Torque to manufacturer spec",
    ],
    featured: true,
  },
  {
    slug: "tire-rebalancing",
    name: "Tire Rebalancing",
    shortName: "Rebalancing",
    category: "Tires",
    price: 12,
    priceNote: "per tire",
    blurb: "Kills the highway-speed steering-wheel shake.",
    included: [
      "Wheel weights checked and reset",
      "Balanced on the machine, not by eye",
      "Pressure checked after",
    ],
  },
  {
    slug: "tire-bolt-on",
    name: "Tire Bolt-On",
    shortName: "Bolt-On",
    category: "Tires",
    price: 50,
    blurb: "Wheels off, wheels on, torqued and checked.",
    included: [
      "Tire bolt-on and torque",
      "Tire pressure check",
      "Quick condition check while the wheels are off",
    ],
  },
  {
    slug: "tire-storage",
    name: "Tire Storage",
    shortName: "Storage",
    category: "Tires",
    price: 110,
    blurb: "Off-season set stored dry, ready for the next swap.",
    included: [
      "Clean, dry seasonal storage",
      "Tires tagged by position for the next rotation",
      "Ready when the season turns",
    ],
  },
  {
    slug: "wheel-alignment",
    name: "Wheel Alignment",
    shortName: "Alignment",
    category: "Wheels & Alignment",
    price: 80,
    blurb: "Four wheels set straight — the car tracks true and tires last.",
    included: [
      "Four-wheel, front-end, or computerized alignment",
      "Camber, caster and toe set to spec",
      "Same-day service",
      "Free with qualifying tire purchases (see offers)",
    ],
    featured: true,
  },
  {
    slug: "rim-repair",
    name: "Rim Repair & Bend Repair",
    shortName: "Rim Repair",
    category: "Wheels & Alignment",
    price: 120,
    blurb: "Curb rash, cracks and bends brought back true.",
    included: [
      "Curb-rash repair",
      "Crack repair",
      "Bent-rim straightening",
      "Rim inspection",
    ],
  },
  {
    slug: "oil-change",
    name: "Oil Change",
    shortName: "Oil Change",
    category: "Mechanical",
    price: 60.99,
    blurb: "Right oil, right filter, in and out.",
    included: [
      "Oil and filter change",
      "Fluid level check",
      "Quick under-hood look",
    ],
    featured: true,
  },
  {
    slug: "tpms",
    name: "TPMS Tire Pressure Monitor",
    shortName: "TPMS",
    category: "Mechanical",
    price: 69.99,
    blurb: "That dashboard light off, the right way.",
    included: [
      "TPMS sensor diagnosis",
      "Sensor service or replacement",
      "System reset and verification",
    ],
  },
  {
    slug: "caliper-painting",
    name: "Caliper Painting",
    shortName: "Caliper Painting",
    category: "Detailing",
    price: 240,
    priceNote: "all four, common colours",
    blurb: "Red, yellow, black or silver — a clean finish behind the wheels.",
    included: [
      "All four calipers",
      "Common colours: red, yellow, black, silver",
      "Custom colours on request",
    ],
  },
  {
    slug: "muffler-repair",
    name: "Muffler Repair & Replacement",
    shortName: "Muffler",
    category: "Muffler & Exhaust",
    price: 160,
    priceNote: "price can vary by vehicle",
    blurb: "Quieter drive, no droning, no rattle.",
    included: [
      "Muffler repair or replacement",
      "Fit checked for leaks",
      "Priced to your vehicle",
    ],
    featured: true,
  },
  {
    slug: "exhaust-repair",
    name: "Exhaust Repair",
    shortName: "Exhaust",
    category: "Muffler & Exhaust",
    price: 150,
    blurb: "Leaks, hangers and pipe work sorted.",
    included: [
      "Exhaust leak repair",
      "Pipe and hanger work",
      "Weld repairs where needed",
    ],
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);

export const FEATURED_SERVICES = SERVICES.filter((s) => s.featured);

// Category display order for the services page.
export const CATEGORY_ORDER: ServiceCategory[] = [
  "Tires",
  "Wheels & Alignment",
  "Muffler & Exhaust",
  "Mechanical",
  "Detailing",
];

export const servicesByCategory = (): { category: ServiceCategory; items: Service[] }[] =>
  CATEGORY_ORDER.map((category) => ({
    category,
    items: SERVICES.filter((s) => s.category === category),
  })).filter((g) => g.items.length > 0);

// "$60" / "$60.99" — no trailing ".00", cents shown only when non-zero.
export const formatPrice = (n: number): string =>
  Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`;
