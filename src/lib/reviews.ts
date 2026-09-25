import { BUSINESS } from "./business";

// Google rating, synced by hand per the agreed approach (content manifest §1).
// Update these two numbers when the profile moves; AggregateRating in
// jsonld.tsx and the ReviewBadge both read from here. Last checked against the
// Google profile (via Featurable) 2026-09-25: 4.8 from 332.
export const REVIEWS = {
  rating: 4.8,
  count: 332,
  source: "Google",
} as const;

// Where "Read the reviews" links go. Points at the shop's Google listing so a
// visitor can verify the rating themselves — a claim they can check is worth far
// more than one they have to take on faith.
export const reviewsHref = BUSINESS.googleBusinessProfile;

// The Featurable widget that syncs the shop's Google reviews. The homepage embeds
// it as-is; service and ad landing pages read its reviews at build time (see
// featurable.ts) and render the ones about that page's service natively.
export const FEATURABLE_WIDGET_ID = "f8f9515f-8222-46e5-9efa-5bedccc87079";

/** A Google review as served by Featurable. Text is always verbatim. */
export interface GoogleReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  /** ISO date the review was posted on Google. */
  publishedAt: string;
}

// Words that mean a review is about a given service (services.ts slugs). A
// review can match several. Keep patterns specific: "tire" alone would match
// nearly every review, so it's only used for the tire-sales pages.
export const REVIEW_KEYWORDS: Record<string, RegExp> = {
  "tire-changeover": /change ?over|winter tire|winters|snow tire|seasonal|swap/i,
  "tire-rebalancing": /balanc/i,
  "tire-bolt-on": /bolt/i,
  "flat-tire-repair": /flat|puncture|patch|plug|nail|leak(?:ing)? tire/i,
  "tire-storage": /storage|stored|store my/i,
  "wheel-alignment": /align/i,
  "rim-repair": /\brims?\b|curb|bent|wheel repair/i,
  "oil-change": /oil/i,
  tpms: /tpms|sensor|pressure light/i,
  "caliper-painting": /caliper/i,
  "muffler-repair": /muffler|exhaust|loud/i,
  "exhaust-repair": /exhaust|muffler|pipe|leak/i,
  tires: /\btires?\b|tyres?/i,
};

/** "Ommama Raja" → "Ommama R." (Featurable's "first name + last initial" display). */
export const displayName = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return parts[0] ?? "Google reviewer";
  const first = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  return `${first} ${parts[parts.length - 1].charAt(0).toUpperCase()}.`;
};

/**
 * Up to `limit` reviews for a page: 4–5 star reviews with real text, the ones
 * that mention `service` first (newest first), then other recent ones to fill.
 * `matched` says how many are genuinely about the service, so the page only
 * claims "about <service>" when that's true.
 */
export function pickReviews(
  all: GoogleReview[],
  service: string | undefined,
  limit = 3
): { reviews: GoogleReview[]; matched: number } {
  const usable = all
    .filter((r) => r.rating >= 4 && r.text.trim().length >= 25)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  const pattern = service ? REVIEW_KEYWORDS[service] : undefined;
  const about = pattern ? usable.filter((r) => pattern.test(r.text)) : [];
  const rest = usable.filter((r) => !about.includes(r));
  const reviews = [...about, ...rest].slice(0, limit);
  return { reviews, matched: Math.min(about.length, limit) };
}
