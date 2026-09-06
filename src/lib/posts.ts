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
