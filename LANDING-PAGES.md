# Google Ads landing pages — the standard

Every Google Ads ad group gets its own landing page at `/lp/<slug>`. They are all
built by **one template** (`src/app/lp/[slug]/page.tsx`) from **one data entry**
each (`src/lib/landing-pages.ts`). Nobody hand-builds a landing page: a fix or an
improvement to the template reaches every landing page at once, which is the
whole point — with dozens of keyword pages, per-page edits don't scale.

`src/lib/__tests__/landing-pages.test.ts` enforces the checkable rules below.
`npm test` must pass before a new page ships.

## Add a landing page (5 minutes)

1. Copy an existing entry in `LANDING_PAGES` (`src/lib/landing-pages.ts`).
2. Set `slug` (usually the keyword, hyphenated), `keyword`, and `service` (a slug
   from `src/lib/services.ts` — the price and inclusions come from there).
3. Write the hero, steps and FAQs using the rules below.
4. `npm test && npm run build`, then open `/lp/<slug>` on a phone-sized window.
5. Use `https://boss-tire.ca/lp/<slug>` as the ad's Final URL.

No new route, component or sitemap entry is needed.

## Why these pages are noindex

Landing pages are near-copies of the organic service pages on purpose (same
service, tuned to one search term). Indexing them would compete with the pages
that should rank. So they are `noindex, follow`, never in `sitemap.ts`, and
never linked from the site navigation. Google Ads' landing-page crawler
(AdsBot) still reads them for Quality Score. This also keeps the site's
"phased rollout" rule intact: ad pages never add to what Google indexes.

## Page structure (fixed order)

The template renders these sections in this order. Each one answers the next
question a first-time, paid visitor has.

| # | Section | The visitor's question it answers |
|---|---------|-----------------------------------|
| 1 | **Hero + call-back form** | Is this what I searched for? What does it cost? Can I trust them? Can I book without calling? |
| 2 | **Trust strip** | Why this shop over the one below it in the results? |
| 3 | **What you get + what to expect** | Exactly what do I get for the money? What happens when I show up? |
| 4 | **FAQ + visit the shop** | My specific doubt (cost, time, appointment). Where are they, are they open? |
| 5 | **Closing CTA** | OK, I'm convinced. |

### 1. Hero — two columns, the decision on the left, the form on the right

- **H1 repeats the search term.** For a SKAG, use the ad group's first pinned
  headline word for word ("Tire Changeover Near Me"). Message match between ad,
  keyword and H1 is the biggest single lever on both conversion rate and
  Quality Score. *(Tested.)*
- **Sub-headline:** one or two sentences — what they get, where, how fast.
- **Price chip** — pulled from `services.ts`, never typed into the entry. With
  `hidePrice` it reads "Call for your price" (use when the ads say that).
- **Call button** (primary, red) and the **linked Google rating** beside it.
- **Hours and address** row: live open/closed status and a directions link.
- **Call-back form** in a white card ("Request a time"): name and phone
  (required), vehicle and best day or time (optional), plus hidden gclid,
  gbraid, wbraid and UTM fields. On a phone it stacks under the Call button,
  which stays above the fold.
- **Header on `/lp/*` has no navigation** — logo + Call only.

### 3. What you get + what to expect

Left: the price and "What's included", from `services.ts`. Set
`showAlignmentOffers` when the buy-tires alignment discount applies. Right: the
entry's 3 or 4 **steps** *(tested)*. Name each step as what the customer does or
sees. Always include the step where **they approve the price before work
starts** — it's the shop's strongest reassurance.

### 4. FAQ — 3 to 5 questions *(tested)* — beside the visit card

Answer the objections, not trivia: price ("how much"), time ("how long"),
booking ("do I need an appointment"), need ("do I really need it"). Lead each
answer with the direct answer. The visit card beside it shows address, live
open/closed status, hours, directions, Call, and one link to the organic page.

## Copy rules

- **No invented claims.** Only facts the shop already stands behind elsewhere on
  the site. No warranties, years in business, certifications, "best in
  Toronto", review counts or quotes that aren't real. If an ad needs a claim the
  site doesn't have, confirm it with the owner first and add it to the site too.
- **Never retype a price.** Prices live in `services.ts`. A price change there
  updates every page and ad landing page at once.
- **Reviews are verbatim.** They come straight from Google via Featurable; never
  type, reword or "tidy up" a review in code.
- **Specific beats clever.** "$80, done while you wait" beats "Precision
  alignment excellence".
- Title ≤ 48 characters (the site appends " | Boss Tire"), description 70–160.
  *(Tested.)*

## Photos

Hero images must exist in `public/photos` *(tested)*. **Real photos of the shop,
bays and team beat stock every time** — a paid visitor who recognises the
building when they pull in already trusts the place. Three current photos are
stock (see `public/photos/IMAGE-CREDITS.md`); replace them as real ones arrive.

## Tracking

Nothing to wire per page. `AnalyticsListener` records every call tap with the
page path, and each button carries its placement (`lp_hero`, `lp_visit`,
`cta_band`, `mobile_call_bar`). The call-back form sends `generate_lead` with
`location: lp_<slug>` only after the server confirms the email went out; the
email subject starts with **[Ad lead]** and lists the gclid and UTMs. See
`TRACKING.md`.

## QA checklist before an ad goes live

- [ ] `npm test` and `npm run build` pass
- [ ] Open the page at phone width: H1, price, Call button and rating visible
      without scrolling
- [ ] Tap the Call button on a phone: it dials (647) 871-2393
- [ ] Submit the call-back form once: the email arrives with **[Ad lead]** in the
      subject (needs `RESEND_API_KEY` set in production)
- [ ] View source: `<meta name="robots" content="noindex, follow">`
- [ ] The ad's headline and the page's H1 use the same words
