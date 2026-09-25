import { BUSINESS } from "./business";

// Google rating, synced at build time per the agreed approach (content manifest
// §1). Update these two numbers when the profile moves; AggregateRating in
// jsonld.tsx and the ReviewBadge both read from here.
export const REVIEWS = {
  rating: 4.8,
  count: 321,
  source: "Google",
} as const;

// Where "Read the reviews" links go. Points at the shop's Google listing so a
// visitor can verify the rating themselves — a claim they can check is worth far
// more than one they have to take on faith.
export const reviewsHref = BUSINESS.googleBusinessProfile;

export interface ReviewQuote {
  /** Reviewer's name exactly as shown on Google (first name + initial is fine). */
  author: string;
  /** Star rating the reviewer gave (1–5). Only 5s and 4s belong here. */
  stars: 4 | 5;
  /** Verbatim text, trimmed to the sentence or two that matter. Never edited. */
  text: string;
  /** Month the review was posted, "YYYY-MM" — shown as "Sep 2026". */
  date: string;
  /** Service slugs from services.ts the review talks about. Used to show the
   *  most relevant quotes on each service page and ad landing page. */
  services: string[];
}

// Hand-picked, VERBATIM Google reviews. Empty until real ones are copied in from
// the Google Business Profile — never write, paraphrase or "tidy up" a review.
// While this is empty, <ReviewProof> falls back to the rating + a link to Google
// plus the live Featurable widget, so nothing fake ever renders.
//
// Aim for 8–12 covering the main services (changeover, alignment, muffler,
// tires, oil change). Pick specific ones: named service, speed, price honesty.
export const REVIEW_QUOTES: ReviewQuote[] = [];

/** Up to `limit` quotes, the ones about `service` first. */
export function quotesFor(service: string | undefined, limit = 3): ReviewQuote[] {
  const about = service ? REVIEW_QUOTES.filter((r) => r.services.includes(service)) : [];
  const rest = REVIEW_QUOTES.filter((r) => !about.includes(r));
  return [...about, ...rest].slice(0, limit);
}
