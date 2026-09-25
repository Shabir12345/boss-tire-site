# CLAUDE.md — boss-tire-site

Boss Tire's website (boss-tire.ca): Next.js 16 App Router + Tailwind v4, every
page static. Before changing anything, run `npm test`, `npm run lint` and
`npm run build` and keep them passing.

## Google Ads landing pages — always use the template

**Every new ad / keyword landing page MUST be built with the landing page
template. Never hand-build a landing page or copy a page file.**

- Guide (read first): [`LANDING-PAGES.md`](LANDING-PAGES.md) — structure, copy
  rules, QA checklist.
- Add a page = add one entry to `LANDING_PAGES` in
  [`src/lib/landing-pages.ts`](src/lib/landing-pages.ts). It goes live at
  `https://boss-tire.ca/lp/<slug>`, which is the ad's Final URL.
- The template that renders every entry:
  [`src/app/lp/[slug]/page.tsx`](src/app/lp/[slug]/page.tsx). Change it only to
  improve *all* landing pages.
- `src/lib/__tests__/landing-pages.test.ts` enforces the standard (keyword in
  the H1, title ≤ 48 chars, 3 hero bullets, 3–4 steps, 3–5 FAQs, real service,
  real photo, noindex, not in the sitemap). Fix the entry, never the test.
- Landing pages are noindex and never go in `sitemap.ts` or the nav.

## Sources of truth — never retype these elsewhere

- `src/lib/business.ts` — name, phone, address, hours, Google Ads IDs.
- `src/lib/services.ts` — every price and what each service includes.
- `src/lib/reviews.ts` — Google rating/count and the per-service review
  keyword patterns. Reviews themselves are pulled verbatim from Featurable
  (`src/lib/featurable.ts`); never write or reword a review.

## Other docs

- [`DESIGN.md`](DESIGN.md) — the red/black "Race Shop" design system. One
  accent colour (red); the Call button is the loudest thing on every page.
- [`TRACKING.md`](TRACKING.md) — GA4 + Google Ads conversions (phone taps, form
  leads) and the `location` names each button reports.

## Rules

- No invented claims: no warranties, years in business, certifications or
  reviews the shop hasn't confirmed.
- New *organic* pages roll out a few at a time (they must also be added to
  `sitemap.ts` and the page count in `metadata.test.ts`).
