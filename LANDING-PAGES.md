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
   from `src/lib/services.ts` — the price, inclusions and review matching come
   from there).
3. Write the hero, steps, FAQs and form prompt using the rules below.
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
| 1 | **Hero** | Is this what I searched for? What does it cost? Can I trust them? Are they open? |
| 2 | **Trust strip** | Why this shop over the one below it in the results? |
| 3 | **Price card** | Exactly what do I get for the money? |
| 4 | **Reviews + visit** | Do real people like them? Where are they? |
| 5 | **How it works** | What happens when I show up? Will I get upsold? |
| 6 | **Quote by message** | It's after hours / I don't want to call. |
| 7 | **FAQ** | My specific doubt (cost, time, appointment, "do I need it"). |
| 8 | **Closing CTA** | OK, I'm convinced. |

### 1. Hero — everything that decides the click, above the fold on a phone

- **H1 repeats the search term.** "Wheel alignment in Scarborough, same day" for
  `wheel alignment scarborough`. Message match between ad, keyword and H1 is the
  biggest single lever on both conversion rate and Quality Score. *(Tested.)*
- **Sub-headline:** one or two sentences — what they get, where, how fast.
- **Exactly three bullets**, each under ~40 characters, each a checkable fact
  ("Done while you wait", "50% off with 4 new tires"). *(Tested.)*
- **Price chip** — pulled from `services.ts`, never typed into the entry.
- **Call button** (primary, red) + **"Get a quote by message"** (secondary). The
  second path catches after-hours clicks and people who won't phone.
- **Linked Google rating** (click-through to the real reviews) and a **live
  open/closed line** with the street. When closed, it offers the message form.
- **Header on `/lp/*` has no navigation** — logo + Call only.

### 3. Price card

Comes from `services.ts`: name, price, price note, "What's included". Set
`showAlignmentOffers` when the buy-tires alignment discount applies.

### 4. Reviews + visit (`<LocalTrust>`)

Shows three of the shop's real Google reviews, **verbatim**, read at build time
from the same Featurable widget the homepage embeds (`src/lib/featurable.ts`,
refreshed daily). Reviews that mention this page's service come first, matched
by the service's pattern in `REVIEW_KEYWORDS` (`src/lib/reviews.ts`); the
eyebrow only says "about <service>" when at least one really does. If
Featurable is unreachable, the live widget is shown instead. Beside it:
address, directions link, live open/closed status, hours and a Call button.

A new service needs a `REVIEW_KEYWORDS` pattern *(tested)*. Featurable returns
the reviews selected in its dashboard (currently 15 of the 332); to give a
service more matching reviews, include more of them in the widget there.

### 5. How it works — 3 or 4 steps *(tested)*

Name each step as what the customer does or sees. Always include the step where
**they approve the price before work starts** — it's the shop's strongest
reassurance.

### 7. FAQ — 3 to 5 questions *(tested)*

Answer the objections, not trivia: price ("how much"), time ("how long"),
booking ("do I need an appointment"), need ("do I really need it"). Lead each
answer with the direct answer.

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
page path, and each button carries its placement (`lp_hero`, `lp_price`,
`lp_quote`, `local_trust`, `cta_band`, `mobile_call_bar`). The quote form sends
`generate_lead` with `location: lp_<slug>` and the email subject starts with
**[Ad lead]**. See `TRACKING.md`.

## QA checklist before an ad goes live

- [ ] `npm test` and `npm run build` pass
- [ ] Open the page at phone width: H1, price, Call button and rating visible
      without scrolling
- [ ] Tap the Call button on a phone: it dials (647) 871-2393
- [ ] Submit the quote form once: the email arrives with **[Ad lead]** in the
      subject (needs `RESEND_API_KEY` set in production)
- [ ] View source: `<meta name="robots" content="noindex, follow">`
- [ ] The ad's headline and the page's H1 use the same words
