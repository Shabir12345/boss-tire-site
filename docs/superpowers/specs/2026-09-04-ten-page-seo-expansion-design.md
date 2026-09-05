# Boss Tire — Ten-Page SEO Expansion

**Date:** 2026-09-04
**Status:** Approved design, ready for implementation planning
**Repo:** `C:\dev\boss-tire-site` (Next.js 16, App Router, SSG, deploys on push to `main`)

---

## 1. Goal

Add five service pages and five blog posts targeting commercial-intent search, to grow
impressions and organic traffic into booked jobs. The measure of success is calls and form
submissions, not rankings.

## 2. Decisions already taken (do not re-litigate)

| Decision | Made by | Detail |
|---|---|---|
| Oil change and caliper painting stay | Shabir, 2026-09-04 | Absent from Fawad's surface list, but the shop performs both. `/services/oil-change` stays live; the GBP oil-change category stays. |
| Car accessories get zero pages | Shabir, 2026-09-04 | ~1,320/mo of retail-intent search. Snow brushes, booster cables and emergency kits become a short upsell block on `/winter-tire-changeover` instead. |
| All ten publish at once | Shabir, 2026-09-04 | Overrides the phased-rollout rule in the workspace `CLAUDE.md`. Risk accepted and stated. Mitigation is content depth (§8) and internal linking (§7), not sequencing. |

## 3. Evidence base

Two DataForSEO pulls, both cached in `Claude Home\data\dataforseo\`, free to re-read:

- `boss-tire-demand-2026-08-19` — 34 keywords, $0.09
- `boss-tire-services-demand-2026-09-04` — 68 keywords, $0.09, output in
  `clients\Ron Mitton & Boss Tire\data\2026-09-04-services-demand\`

Indexing status confirmed in Search Console 2026-09-04: 8 of 9 live URLs "Submitted and
indexed"; `/services/oil-change` "Discovered, not indexed" (published Aug 28, never crawled).

Two constraints from the 19 August baseline shape everything here:

1. **Zero legitimate backlinks.** 13 referring domains, 10 at spam score 50. No page will rank
   on authority. Internal linking is the only link equity under our control.
2. **Weak local pack.** The geo-grid found Boss Tire holds the pack from 1 of 5 points around
   Scarborough. "Near me" terms are therefore not reliably winnable on-site.

**Consequence for this design:** service pages target big commercial clusters because they earn
from Google Ads immediately — better landing pages lift Quality Score on a ~$18,730/mo account
whose campaigns currently land on `/about` and `/order-tracking/`. Blog posts target LOW
competition terms because that is where organic is actually winnable without authority.

## 4. The five service pages

All follow the existing pattern in `src/app/services/oil-change/page.tsx`: `PageHeader` with
`image`, `TrustStrip`, a price card, a "why it matters" block, an FAQ block, `CTABand`, plus
`BreadcrumbJsonLd` + `ServiceJsonLd` + `FaqJsonLd`.

| # | Route | Target cluster | Vol to Nov | Catalog entry |
|---|---|---|---|---|
| 1 | `/services/flat-tire-repair` | `tire repair near me` 2,900 · `flat tire repair near me` 720 · `tire patch near me` 170 · `tire puncture repair` 110 | **3,950** flat | **NEW**, no price (§9) |
| 2 | `/tires/used-tires` | `used tires near me` 1,300 · `used tires scarborough` 320 · `used tires toronto` 260 · `cheap tires toronto` 90 | 2,040 to **3,400** | none needed |
| 3 | `/tires/winter-rims-and-packages` | `winter rims and tires` 590 (CPC $0.61) · `tire and rim package` 170 | 800 to **2,900** | none needed |
| 4 | `/services/tire-storage` | `tire storage` 480 · `tire storage scarborough` 40 | 520 to **1,440** | exists, `tire-storage` $110 |
| 5 | `/muffler-exhaust/exhaust-leak-repair` | `exhaust leak repair` 320 LOW · `exhaust repair scarborough` 390 LOW · `exhaust pipe repair` 140 | 570 LOW | exists, `exhaust-repair` $150 |

**Page 2 must be honest about the stock.** The catalog is 180 budget/mid-tier import SKUs
(Ilink, Mazzini, Kpsen, Haida; $73.12–$219.00, median $108.41). Lead on fitting, price and
same-day service. Do not imply a premium brand lineup.

**Page 3 absorbs the dead wheels branch.** `alloy rims toronto` 20, `rims scarborough` 10,
`custom wheels toronto` 10, `steel rims toronto` 10, `aftermarket wheels toronto` 10 — about
80/mo in total, too small for its own page. Covered as sections here so the coverage exists
without spending a slot.

## 5. The five blog posts

Route `/blog/<slug>`. Each links up to at least one service page.

| # | Slug | Target | Links up to |
|---|---|---|---|
| 1 | `catalytic-converter-replacement-cost-toronto` | `catalytic converter replacement cost` 170 LOW · replacement 70 · repair 70 | `/muffler-exhaust` |
| 2 | `when-to-put-winter-tires-on-toronto` | `winter tire change` 390 to 2,400 Nov · `snow tire change` 390 to 2,400 · `winter tire installation` 70 to 480 · `seasonal tire change` 70 to 260 LOW | `/winter-tire-changeover`, `/tires/winter-rims-and-packages`, `/services/tire-storage` |
| 3 | `wheel-balancing-vs-wheel-alignment` | `wheel balancing cost` 210 LOW · `wheel balancing near me` 210 · `4 wheel alignment cost` 50 LOW | `/services/wheel-alignment` |
| 4 | `can-a-flat-tire-be-repaired` | long-tail diagnostic · `flat tire repair cost` 50 | `/services/flat-tire-repair` |
| 5 | `tpms-light-on-what-it-costs` | `tpms sensor replacement` 170 LOW · `tpms programming` 20 | `/services`, anchored to the TPMS entry ($69.99). There is no dedicated TPMS page and this spec does not add one. |

**Cannibalisation rule.** Post 4 and service page 1 cover the same subject at different intents.
The service page answers "fix mine, today, here is the price and the phone number". The post
answers "is mine even repairable". Neither may target `tire repair near me`; that belongs to the
service page alone. The same rule applies to post 1 against `/muffler-exhaust/exhaust-leak-repair`.

**Published prices are the asset.** Where a real catalogue price exists, quote it. AI answer
engines quote published prices, and most Scarborough competitors hide theirs.

## 6. Blog infrastructure (new)

The site has no blog. Build it the way services already work — a typed registry plus
hand-authored TSX — rather than adding an MDX toolchain.

- `src/lib/posts.ts` — a `Post` interface (`slug`, `title`, `description`, `published` ISO date,
  `updated?`, `excerpt`, `image`, `imageAlt`, `keywords`, `relatedServices`) and a `POSTS` array,
  mirroring `src/lib/services.ts`.
- `src/app/blog/page.tsx` — index, posts newest first.
- `src/app/blog/<slug>/page.tsx` — one hand-authored file per post, five in total.
- `ArticleJsonLd` added to `src/lib/jsonld.tsx` — `@type: Article`, `headline`, `datePublished`,
  `dateModified`, `author` and `publisher` both pointing at `${BUSINESS.url}/#business`, `image`.
- Nav gains one new item, "Blog". The nav does not gain ten items.

**Date formatting — known bug, must be handled.** A bare `YYYY-MM-DD` parses as UTC midnight and
renders as the previous day in Toronto. Every date formatter on the blog must pin
`timeZone: "UTC"`. This has already bitten another site in this workspace.

## 7. Internal linking

With all ten publishing at once and no external authority, internal links are the primary
indexing and ranking lever. Orphan pages are the main failure mode.

Required edits to existing pages:

| Existing page | Add links to |
|---|---|
| `/services` | `/services/flat-tire-repair`, `/services/tire-storage` |
| `/tires` | `/tires/used-tires`, `/tires/winter-rims-and-packages` |
| `/muffler-exhaust` | `/muffler-exhaust/exhaust-leak-repair` |
| `/winter-tire-changeover` | `/services/tire-storage`, `/tires/winter-rims-and-packages`, plus the accessories upsell block (§2) |
| `/services/wheel-alignment` | `/blog/wheel-balancing-vs-wheel-alignment` |

Every blog post links up to its service page (§5). Every new service page links back to its hub
and to at least one sibling.

`src/app/sitemap.ts` gains all ten routes plus `/blog`. Priorities: service pages 0.8, `/blog`
0.5, posts 0.4.

## 8. Content depth — the doorway-page guard

Publishing ten pages at once on a nine-page site doubles it. The defence is that every page is a
distinct service with distinct demand and genuine substance.

- Service pages: **700–1,100 words** of real body copy, minimum four FAQs, a price where one is
  confirmed, and at least one detail true only of Boss Tire (the Danforth Rd location, the
  same-day promise, the free inclusions, the alignment offers).
- Blog posts: **900–1,400 words**, answering the query in the first 100 words for AI-answer
  citability, then the detail.
- No page may be assembled by find-and-replacing another page's copy. If two pages would say
  substantially the same thing, one of them should not ship.

## 9. Open questions — flag, do not block

Per the workspace rule on unverified claims, if these are not confirmed the thinner version
ships: service named, price omitted.

1. **Flat tire repair price** — not in the WooCommerce catalogue. Page 1 ships without a price
   until Fawad confirms.
2. **Tire storage $110 — per wheel or per set?** Already flagged in `src/lib/services.ts`. $440
   for a set is a materially different offer and must not be guessed.

Both go on the Fawad question list alongside the existing open items.

**Type change required:** `Service.price` becomes optional (`price?: number`) so page 1 can exist
without one. Three consequences, all mandatory:

1. `ServiceJsonLd` omits the `offers` block entirely when `price` is undefined, rather than
   emitting `price: undefined` (which would produce invalid structured data).
2. `formatPrice` keeps its `(n: number) => string` signature. Callers guard on the price being
   present rather than passing `undefined` in. Widening `formatPrice` to accept `undefined` would
   push the missing-price decision into a formatting helper, where it is invisible.
3. Every existing consumer of `service.price` must be checked — `PriceSheet`, `ServiceCatalog`,
   `/services`, and the individual service pages. A page with no price renders a call-for-quote
   card in place of the price card, not an empty one.

## 10. Images

Existing unused photos cover four of the five service pages: `new-used-tires.jpg` (page 2),
`rims-red.jpg` or `wheels.jpg` (page 3), `winter-tires.jpg` (page 4), `muffler-bay.jpg` (page 5).

**Gap:** no flat-tire or puncture-repair photo exists. Page 1 and post 4 need one. Source it
before building page 1; do not ship a service page with a mismatched stock photo.

Blog posts may reuse service photos where the subject matches.

## 11. Verification

Vitest is configured with zero test files. Add a small suite covering invariants that can
genuinely go red — not prose:

- Every route in `sitemap.ts` corresponds to a real `page.tsx`, and every `page.tsx` appears in
  the sitemap. Catches an unlisted or orphaned page.
- Every `POSTS` entry has a matching `src/app/blog/<slug>/page.tsx`, and vice versa.
- Every `relatedServices` slug on a post resolves to a real service or route.
- `formatPrice` and `ServiceJsonLd` behave correctly when `price` is undefined.
- No two pages share a `title` or `description` in their metadata. This covers existing pages
  too; if a pre-existing collision surfaces, fix it rather than narrowing the test.

Each test must be proven to fail before the code that satisfies it is written.

Manual verification before deploy:

- `npm run build` passes and prerenders all ten new routes as static HTML.
- `npm run lint` clean.
- Rendered JSON-LD validates for `Article`, `Service`, `FAQPage`, `BreadcrumbList`.
- Every internal link added in §7 resolves (no 404s) in the built output.
- Blog dates render as the intended day in Toronto (the UTC bug, §6).

Post-deploy:

- Submit the updated sitemap in Search Console.
- Request indexing on the ten new URLs.
- Re-inspect coverage roughly two weeks out and record which indexed.

## 12. Out of scope

- `mufflerboss.ca` — separate domain, outside the Boss Tire engagement.
- Google Ads campaign restructuring onto the new landing pages. It is the payoff argued in §3 and
  should follow, but it is ad-account work, not a website change.
- GBP changes. Wave 2 is gated on reading the Performance chart around 2026-09-16.
- Any of the thirteen services the old site claimed but Fawad's list omits (auto body, collision,
  engine, glass, window tints, cooling system, belts, axle/CV). Not confirmed, not built.
