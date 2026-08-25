// Google rating, synced at build time per the agreed approach (content manifest
// §1). Update these two numbers when the profile moves; AggregateRating in
// jsonld.tsx and the ReviewBadge both read from here.
export const REVIEWS = {
  rating: 4.8,
  count: 319,
  source: "Google",
} as const;
