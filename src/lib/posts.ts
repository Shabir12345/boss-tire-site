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
      "/tires/winter-tires",
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
      "tire balancing vs alignment",
      "4 wheel alignment cost",
      "wheel alignment cost toronto",
    ],
    relatedServices: ["/services/wheel-alignment", "/services/wheel-balancing"],
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
      "tpms light on",
      "tire pressure light on",
      "tpms programming",
      "tire pressure sensor cost",
    ],
    relatedServices: ["/services/tpms"],
  },
  {
    slug: "is-a-muffler-delete-legal-in-ontario",
    title: "Is a muffler delete legal in Ontario?",
    description:
      "What Ontario's Highway Traffic Act says about muffler deletes, straight pipes and resonator deletes, what it means at a safety inspection, and the legal ways to get more sound.",
    published: "2026-09-27",
    excerpt:
      "Short answer: no, not on a car you drive on the road. Here is what the law actually says, where a resonator delete fits, and what to do if you've already been pulled over.",
    image: "/photos/muffler-bay.jpg",
    imageAlt: "Exhaust work in the Boss Tire service bay",
    keywords: [
      "muffler delete",
      "is a muffler delete legal in ontario",
      "resonator delete",
      "straight pipe exhaust ontario",
      "muffler delete ticket ontario",
    ],
    relatedServices: ["/muffler-exhaust", "/muffler-exhaust/exhaust-leak-repair"],
  },
  {
    slug: "are-winter-tires-mandatory-in-ontario",
    title: "Are winter tires mandatory in Ontario?",
    description:
      "No, but every Ontario insurer has to offer a winter tire discount. What counts as a winter tire, the studded tire rules, and where in Canada they are the law.",
    published: "2026-10-12",
    excerpt:
      "Not by law. But your insurer has to offer you a discount for running them, and the rules on studs, ticket risk and all-weather tires catch a lot of people out.",
    image: "/photos/winter-tires.jpg",
    imageAlt: "A winter tire on a snow-covered road",
    keywords: [
      "are winter tires mandatory in ontario",
      "are winter tires mandatory in toronto",
      "ontario winter tire law",
      "winter tire insurance discount ontario",
      "studded tires ontario",
    ],
    relatedServices: ["/winter-tire-changeover", "/tires"],
  },
  {
    slug: "all-weather-vs-winter-tires",
    title: "All-weather vs winter tires: which do you need in Toronto?",
    description:
      "All-weather tires stay on all year. Winter tires grip better on ice and in deep cold. How they differ, what each costs you over a year, and who should run which in Toronto.",
    published: "2026-10-12",
    excerpt:
      "All-weather tires skip the twice-a-year swap. Winter tires stop shorter on ice. Which trade-off makes sense depends on where and how you drive.",
    image: "/photos/new-used-tires.jpg",
    imageAlt: "New and used tires on the racks at Boss Tire",
    keywords: [
      "all weather tires vs winter tires",
      "are all weather tires good for winter in canada",
      "all season vs all weather vs winter tires",
      "do i need snow tires if i have all weather tires",
    ],
    relatedServices: ["/tires", "/winter-tire-changeover"],
  },
  {
    slug: "do-you-need-4-winter-tires",
    title: "Do you need 4 winter tires, or are 2 enough?",
    description:
      "Two winter tires on the front or back makes a car harder to control, not easier. Why it has to be four, what all-wheel drive does and doesn't fix, and cheaper ways to get a full set.",
    published: "2026-10-12",
    excerpt:
      "Four. Two winter tires and two all-seasons gives you a car with two different levels of grip, and it shows up the first time you brake into an icy corner.",
    image: "/photos/suv-wheel.jpg",
    imageAlt: "An SUV wheel and tire in the Boss Tire bay",
    keywords: [
      "do i need 4 winter tires",
      "can i put 2 winter tires on front only",
      "2 winter tires and 2 all season",
      "do i need winter tires if i have all wheel drive",
    ],
    relatedServices: ["/tires/used-tires", "/tires", "/winter-tire-changeover"],
  },
  {
    slug: "how-long-do-winter-tires-last",
    title: "How long do winter tires last?",
    description:
      "Winter tires wear out by tread depth and by age, not by a set number of seasons. When to replace them, how to read the date on the sidewall, and what shortens their life.",
    published: "2026-10-12",
    excerpt:
      "Count tread and age, not winters. A winter tire at 4/32\" or ten years old is done, however many seasons it has seen.",
    image: "/photos/winter-changeover.jpg",
    imageAlt: "A winter tire being fitted during a seasonal changeover",
    keywords: [
      "how long do winter tires last",
      "winter tire tread depth",
      "when to replace winter tires",
      "can i use 10 year old winter tires",
      "used winter tires worth it",
    ],
    relatedServices: ["/tires/used-tires", "/services/tire-storage", "/tires"],
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
