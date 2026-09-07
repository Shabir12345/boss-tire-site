// ─── Blog registry ──────────────────────────────────────────────────────────
// Mirrors src/lib/services.ts: a typed registry plus one hand-authored TSX page
// per entry. No MDX toolchain — the site has always hand-authored its pages and
// five posts do not justify a content pipeline.

export interface Post {
  slug: string;
  title: string;
  description: string;
  published: string; // ISO date, YYYY-MM-DD
  updated?: string;
  excerpt: string; // index-card summary, 1-2 sentences
  image: string; // /photos/<file>
  imageAlt: string;
  keywords: string[];
  relatedServices: string[]; // internal routes this post links up to
}

export const POSTS: Post[] = [
  {
    slug: "catalytic-converter-replacement-cost-toronto",
    title: "What a catalytic converter replacement costs in Toronto",
    description:
      "What a catalytic converter costs to replace in Toronto, why theft has pushed the price up, and how to tell whether yours actually needs replacing.",
    published: "2026-09-05",
    excerpt:
      "Converter theft has made this one of the most expensive parts on the car to lose. Here is what replacement actually costs and how to tell if yours has gone.",
    image: "/photos/muffler-bay.jpg",
    imageAlt: "Exhaust and converter work in the Boss Tire service bay",
    keywords: [
      "catalytic converter replacement cost",
      "catalytic converter replacement",
      "catalytic converter repair",
      "catalytic converter theft toronto",
    ],
    relatedServices: ["/muffler-exhaust", "/muffler-exhaust/exhaust-leak-repair"],
  },
  {
    slug: "when-to-put-winter-tires-on-toronto",
    title: "When should you put winter tires on in Toronto?",
    description:
      "The seven-degree rule, what the Ontario weather actually does, and why booking your changeover in October beats booking it after the first snow.",
    published: "2026-09-05",
    excerpt:
      "Seven degrees, not the first snowfall. Here is why, and what waiting until December actually costs you.",
    image: "/photos/winter-changeover.jpg",
    imageAlt: "A winter tire being fitted during a seasonal changeover",
    keywords: [
      "when to put winter tires on",
      "winter tire change",
      "snow tire change",
      "winter tire installation",
      "seasonal tire change",
    ],
    relatedServices: [
      "/winter-tire-changeover",
      "/tires/winter-rims-and-packages",
      "/services/tire-storage",
    ],
  },
  {
    slug: "wheel-balancing-vs-wheel-alignment",
    title: "Wheel balancing vs wheel alignment: what's the difference?",
    description:
      "Balancing fixes vibration. Alignment fixes pulling and uneven tire wear. They are different jobs at different prices. Here is how to tell which one your car needs.",
    published: "2026-09-05",
    excerpt:
      "A shake at highway speed is a balancing problem. Pulling to one side is an alignment problem. They get confused constantly, and it costs people money.",
    image: "/photos/alignment.jpg",
    imageAlt: "A car on the alignment rack at Boss Tire",
    keywords: [
      "wheel balancing vs alignment",
      "wheel balancing cost",
      "wheel balancing near me",
      "4 wheel alignment cost",
      "wheel alignment cost toronto",
    ],
    relatedServices: ["/services/wheel-alignment"],
  },
  {
    slug: "can-a-flat-tire-be-repaired",
    title: "Can a flat tire be repaired, or do you need a new one?",
    description:
      "Tread punctures are usually repairable. Sidewall damage almost never is. Here is where the line sits and why a proper patch beats a plug.",
    published: "2026-09-05",
    excerpt:
      "A nail in the middle of the tread is usually a repair. A cut in the sidewall is usually a new tire. The difference is worth knowing before someone sells you four.",
    image: "/photos/wheels.jpg",
    imageAlt: "Tires and wheels in the Boss Tire workshop",
    keywords: [
      "can a flat tire be repaired",
      "flat tire repair cost",
      "when to replace a punctured tire",
    ],
    relatedServices: ["/services/flat-tire-repair"],
  },
  {
    slug: "tpms-light-on-what-it-costs",
    title: "TPMS light on: what it means and what a sensor costs",
    description:
      "The tire pressure light can mean low pressure, a dead sensor battery, or a sensor that needs programming after a tire change. Here is how to tell which, and what it costs.",
    published: "2026-09-05",
    excerpt:
      "A TPMS light is not always a flat. Often it is a sensor at the end of its battery life, or a relearn that never ran after the last tire change, not four new tires.",
    image: "/photos/suv-wheel.jpg",
    imageAlt: "A wheel and tire being checked at Boss Tire",
    keywords: [
      "tpms sensor replacement",
      "tpms light on",
      "tpms programming",
      "tire pressure sensor cost",
    ],
    relatedServices: ["/services"],
  },
];

export const getPost = (slug: string): Post | undefined =>
  POSTS.find((p) => p.slug === slug);

export const postsNewestFirst = (): Post[] =>
  [...POSTS].sort((a, b) => Date.parse(b.published) - Date.parse(a.published));

// A bare YYYY-MM-DD is UTC midnight. Without timeZone: "UTC" this renders as
// the previous day in Toronto. Do not remove the timeZone pin.
export const formatPostDate = (iso: string): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
