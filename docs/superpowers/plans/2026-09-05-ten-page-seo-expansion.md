# Ten-Page SEO Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship five service pages and five blog posts targeting commercial-intent search, plus the blog infrastructure and test suite the site does not yet have.

**Architecture:** Follow the site's existing pattern exactly — a typed registry in `src/lib/` plus hand-authored TSX pages. The blog mirrors how services already work rather than introducing MDX. Task 1 builds invariant tests first, which makes every later page addition a genuine red-green cycle: adding a route turns the sitemap-parity test red until the sitemap is updated.

**Tech Stack:** Next.js 16 (App Router, SSG), React 19, TypeScript, Tailwind v4, Vitest + Testing Library, deployed on Vercel from `main`.

**Spec:** `docs/superpowers/specs/2026-09-04-ten-page-seo-expansion-design.md`

## Global Constraints

- **Static generation only.** Every route pre-renders at build time. No `getServerSideProps`, no request-time SSR.
- **Business facts come from `src/lib/business.ts`.** Never hardcode the phone, address or email in a page. Phone display is `(647) 871-2393`; address is `375 Danforth Rd, Unit 3`.
- **No unverified claims.** If a price or capability is not in `src/lib/services.ts` or confirmed by the owner, the page names the service without the claim. Never invent a price, a warranty, a turnaround time or a brand.
- **Interior pages pass `image` to `PageHeader`.** Never add a separate full-width photo band; the header renders the photo scrimmed behind itself.
- **Content depth floor:** service pages 700–1,100 words of body copy and at least four FAQs; blog posts 900–1,400 words answering the query in the first 100 words. No page may be built by find-and-replacing another page's copy.
- **Blog dates pin `timeZone: "UTC"`.** A bare `YYYY-MM-DD` parses as UTC midnight and renders as the previous day in Toronto.
- **Prices are ex. tax** and displayed via `formatPrice`, matching how the shop has always shown them.
- **Every new page links back** to its hub and to at least one sibling. Orphan pages are the primary failure mode of this plan.

## A note on copy in this plan

Each page task specifies the strings that are SEO-critical and must be exact: the route, the `metadata` block (title, description, keywords), the FAQ **questions** (they become `FAQPage` schema), the section headings, and the internal links. Body prose and FAQ answers are written during the task against the depth floor and the facts listed in that task. This is deliberate — the exact strings are decisions, the prose is craft. Do not invent facts beyond those listed.

---

## Task 1: Test harness and route invariants

**Files:**
- Create: `vitest.config.ts`
- Create: `src/lib/__tests__/routes.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `routesFromFs(dir?: string, prefix?: string): string[]` and `sitemapPaths(): string[]` used by later tasks' tests. A passing suite that goes red whenever a page exists without a sitemap entry.

- [ ] **Step 1: Write the failing test**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: { environment: "node", include: ["src/**/*.test.{ts,tsx}"] },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
```

Create `src/lib/__tests__/routes.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import sitemap from "@/app/sitemap";
import { BUSINESS } from "@/lib/business";

// Every page.tsx under src/app, as a route path. Skips the API dir, which
// serves no HTML and belongs in no sitemap.
export function routesFromFs(dir = "src/app", prefix = ""): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "api") continue;
    if (entry.name.startsWith("__")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...routesFromFs(full, `${prefix}/${entry.name}`));
    else if (entry.name === "page.tsx") out.push(prefix === "" ? "/" : prefix);
  }
  return out;
}

export function sitemapPaths(): string[] {
  return sitemap().map((e) => e.url.replace(BUSINESS.url, "") || "/");
}

describe("route / sitemap parity", () => {
  it("lists every real page in the sitemap", () => {
    const missing = routesFromFs().filter((r) => !sitemapPaths().includes(r));
    expect(missing).toEqual([]);
  });

  it("has no sitemap entry without a real page", () => {
    const orphans = sitemapPaths().filter((p) => !routesFromFs().includes(p));
    expect(orphans).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the tests and watch them pass, then prove they can fail**

Run: `npm test`
Expected: both PASS (the current 9 routes and 9 sitemap entries already agree).

A passing test proves nothing yet. Prove it bites — temporarily delete the `/about` line from `src/app/sitemap.ts`:

Run: `npm test`
Expected: FAIL on "lists every real page in the sitemap" with `[ '/about' ]`.

Restore the line. Run `npm test` again and confirm PASS.

- [ ] **Step 3: Commit**

```bash
git add vitest.config.ts src/lib/__tests__/routes.test.ts
git commit -m "test: add vitest config and route/sitemap parity invariants"
```

---

## Task 2: Make service price optional

The new flat-tire-repair service has no confirmed price. `Service.price` becomes optional, which breaks three call sites that currently pass it to `formatPrice` unguarded.

**Files:**
- Modify: `src/lib/services.ts` (the `Service` interface)
- Modify: `src/lib/jsonld.tsx` (`ServiceJsonLd`, ~line 81)
- Modify: `src/components/sections/PriceSheet.tsx`
- Modify: `src/components/sections/ServiceCatalog.tsx`
- Create: `src/lib/__tests__/services.test.ts`

**Interfaces:**
- Consumes: `Service`, `formatPrice` from Task 0 state (existing).
- Produces: `Service.price?: number`. `formatPrice` keeps its `(n: number) => string` signature unchanged — callers guard. `ServiceJsonLd` omits `offers` entirely when `price` is undefined.

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/services.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { SERVICES, formatPrice, type Service } from "@/lib/services";

describe("formatPrice", () => {
  it("drops trailing .00 but keeps real cents", () => {
    expect(formatPrice(60)).toBe("$60");
    expect(formatPrice(60.99)).toBe("$60.99");
  });
});

describe("service catalog", () => {
  it("allows a service with no price", () => {
    const priceless: Service = {
      slug: "test-only",
      name: "Test Only",
      shortName: "Test",
      category: "Tires",
      blurb: "No price yet.",
      included: ["Something"],
    };
    expect(priceless.price).toBeUndefined();
  });

  it("gives every catalog entry a unique slug", () => {
    const slugs = SERVICES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- services`
Expected: FAIL — TypeScript rejects the `priceless` object literal because `price` is a required property.

- [ ] **Step 3: Make price optional**

In `src/lib/services.ts`, change the interface field:

```ts
  price?: number; // CAD, ex. tax. Absent = no confirmed price; the page says "call for a quote".
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- services`
Expected: PASS.

- [ ] **Step 5: Fix the three broken call sites**

In `src/lib/jsonld.tsx`, `ServiceJsonLd` — build the object without `offers`, then attach it only when a price exists. Emitting `price: undefined` produces invalid structured data:

```ts
export function ServiceJsonLd({ service }: { service: Service }) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.blurb,
    provider: {
      "@type": "AutoRepair",
      "@id": `${BUSINESS.url}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phoneRaw,
      url: BUSINESS.url,
    },
    areaServed: BUSINESS.areaServed,
    serviceType: service.name,
  };
  if (service.price !== undefined) {
    data.offers = { "@type": "Offer", price: service.price, priceCurrency: "CAD" };
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
```

In `src/components/sections/PriceSheet.tsx`, replace the price span with a guarded version:

```tsx
                <div className="shrink-0 text-right">
                  {s.price !== undefined ? (
                    <span className="tabular font-display text-2xl font-extrabold text-[var(--color-heading)]">
                      {formatPrice(s.price)}
                    </span>
                  ) : (
                    <span className="font-display text-sm font-bold uppercase tracking-wide text-[var(--color-red-deep)]">
                      Call for a quote
                    </span>
                  )}
                  {s.priceNote && (
                    <span className="mt-0.5 block text-xs text-[var(--color-muted)]">{s.priceNote}</span>
                  )}
                </div>
```

In `src/components/sections/ServiceCatalog.tsx`, apply the same guard to its price block:

```tsx
                  <div className="shrink-0 text-right">
                    {s.price !== undefined ? (
                      <span className="tabular font-display text-2xl font-extrabold text-[var(--color-heading)]">
                        {formatPrice(s.price)}
                      </span>
                    ) : (
                      <span className="font-display text-sm font-bold uppercase tracking-wide text-[var(--color-red-deep)]">
                        Call for a quote
                      </span>
                    )}
                    {s.priceNote && (
                      <span className="mt-0.5 block text-xs text-[var(--color-muted)]">{s.priceNote}</span>
                    )}
                  </div>
```

- [ ] **Step 6: Verify the build and tests**

Run: `npm test && npm run build`
Expected: tests PASS, build succeeds with all 9 existing routes prerendered.

- [ ] **Step 7: Commit**

```bash
git add src/lib/services.ts src/lib/jsonld.tsx src/components/sections/PriceSheet.tsx src/components/sections/ServiceCatalog.tsx src/lib/__tests__/services.test.ts
git commit -m "feat: allow services with no confirmed price"
```

---

## Task 3: Blog infrastructure

Builds the blog with zero posts — a working, testable deliverable on its own.

**Files:**
- Create: `src/lib/posts.ts`
- Create: `src/app/blog/page.tsx`
- Create: `src/lib/__tests__/posts.test.ts`
- Modify: `src/lib/jsonld.tsx` (add `ArticleJsonLd`)
- Modify: `src/components/layout/Header.tsx` (NAV, line 10-15)
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `BUSINESS`, `buildMetadata`, `PageHeader`, `CTABand`, `Eyebrow`.
- Produces:
  - `interface Post { slug, title, description, published, updated?, excerpt, image, imageAlt, keywords, relatedServices }`
  - `POSTS: Post[]`, `getPost(slug): Post | undefined`, `postsNewestFirst(): Post[]`
  - `formatPostDate(iso: string): string` — pinned to UTC
  - `ArticleJsonLd({ post }: { post: Post })`

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/posts.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readdirSync, existsSync } from "node:fs";
import { POSTS, getPost, postsNewestFirst, formatPostDate } from "@/lib/posts";

describe("formatPostDate", () => {
  // A bare YYYY-MM-DD parses as UTC midnight. Formatted in Toronto it renders
  // as the previous day. This test is the guard against that regression.
  it("renders the calendar date given, not the day before", () => {
    expect(formatPostDate("2026-09-05")).toBe("5 September 2026");
    expect(formatPostDate("2026-01-01")).toBe("1 January 2026");
  });
});

describe("post registry", () => {
  it("has a unique slug per post", () => {
    const slugs = POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("orders newest first", () => {
    const dates = postsNewestFirst().map((p) => Date.parse(p.published));
    expect([...dates].sort((a, b) => b - a)).toEqual(dates);
  });

  it("has a real page directory for every registered post", () => {
    for (const p of POSTS) {
      expect(existsSync(`src/app/blog/${p.slug}/page.tsx`), `missing page for ${p.slug}`).toBe(true);
    }
  });

  it("has a registry entry for every blog page directory", () => {
    // Guarded: src/app/blog does not exist until Step 6 of this task, and an
    // unguarded readdirSync would throw ENOENT rather than fail cleanly.
    if (!existsSync("src/app/blog")) return;
    const dirs = readdirSync("src/app/blog", { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    for (const dir of dirs) {
      expect(getPost(dir), `unregistered blog page ${dir}`).toBeDefined();
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- posts`
Expected: FAIL — `Cannot find module '@/lib/posts'`.

- [ ] **Step 3: Create the registry**

Create `src/lib/posts.ts`:

```ts
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

export const POSTS: Post[] = [];

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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- posts`
Expected: PASS. The two directory-parity tests pass vacuously with an empty registry; they start biting in Task 9.

- [ ] **Step 5: Add the Article schema helper**

Append to `src/lib/jsonld.tsx`:

```tsx
export function ArticleJsonLd({ post }: { post: Post }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${BUSINESS.url}${post.image}`,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    author: { "@id": `${BUSINESS.url}/#business` },
    publisher: { "@id": `${BUSINESS.url}/#business` },
    mainEntityOfPage: `${BUSINESS.url}/blog/${post.slug}`,
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
```

Add `import type { Post } from "@/lib/posts";` to the file's imports.

- [ ] **Step 6: Build the blog index**

Create `src/app/blog/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/jsonld";
import { postsNewestFirst, formatPostDate } from "@/lib/posts";

export const metadata: Metadata = buildMetadata({
  title: "Tire & Exhaust Advice",
  description:
    "Straight answers on tires, wheel alignment and exhaust work from the team at Boss Tire on Danforth Rd, Scarborough — what things cost, when they need doing, and when they don't.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = postsNewestFirst();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <PageHeader
        eyebrow="Advice"
        title="Straight answers, no upsell"
        sub="What things actually cost, when they need doing, and when they don't — from the bay on Danforth Rd."
        image="/photos/tires-shop.jpg"
        imageAlt="The Boss Tire workshop on Danforth Rd, Scarborough"
      />
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-4xl py-16 sm:py-20">
          <ul className="space-y-8">
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-[var(--color-border)] pb-8 last:border-0">
                <p className="text-sm text-[var(--color-muted)]">{formatPostDate(p.published)}</p>
                <h2 className="mt-2 text-2xl text-[var(--color-heading)]">
                  <Link href={`/blog/${p.slug}`} className="link-grow">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 text-[var(--color-body)]">{p.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTABand
        heading="Rather just ask us?"
        sub="Call the shop and describe it — we'll tell you straight what it needs."
      />
    </>
  );
}
```

When `POSTS` is empty the list renders nothing; that is expected until Task 9.

- [ ] **Step 7: Add Blog to the nav and the sitemap**

In `src/components/layout/Header.tsx`, add to `NAV` after the `/winter-tire-changeover` entry:

```ts
  { href: "/blog", label: "Blog" },
```

In `src/app/sitemap.ts`, add to `routes`:

```ts
    { path: "/blog", priority: 0.5 },
```

- [ ] **Step 8: Verify**

Run: `npm test && npm run build && npm run lint`
Expected: all PASS. `/blog` prerenders. Route-parity holds.

- [ ] **Step 9: Commit**

```bash
git add src/lib/posts.ts src/app/blog src/lib/jsonld.tsx src/components/layout/Header.tsx src/app/sitemap.ts src/lib/__tests__/posts.test.ts
git commit -m "feat: add blog infrastructure, Article schema and post registry"
```

---

## Tasks 4–8: The five service pages

Every service page task follows the same five steps. They are written out in full for Task 4; Tasks 5–8 give their own exact strings and repeat the step structure.

**Shared page structure** (from `src/app/services/oil-change/page.tsx`):

1. `BreadcrumbJsonLd` + `ServiceJsonLd` (where a catalog entry exists) + `FaqJsonLd`
2. `PageHeader` with `eyebrow`, `title`, `sub`, `showCall`, `image`, `imageAlt`
3. `TrustStrip`
4. Price/intro section — two-column: prose + `included` list on the left, price card on the right
5. "Why it matters" block
6. FAQ block (`<dl>`, mirroring the FAQS array that feeds `FaqJsonLd`)
7. `CTABand`

**Shared red-green cycle** — creating the page turns Task 1's parity test red until the sitemap is updated. That is the test cycle for these tasks; do not skip it.

---

### Task 4: `/services/flat-tire-repair`

The biggest uncovered cluster in either dataset (~3,950/mo, non-seasonal). Ships with **no price** — none is confirmed (spec §9.1).

**Files:**
- Create: `src/app/services/flat-tire-repair/page.tsx`
- Modify: `src/lib/services.ts` (new catalog entry)
- Modify: `src/components/sections/ServiceCatalog.tsx` (`DETAIL_PAGES`)
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `getService`, `Service.price?` (Task 2), `PageHeader`, `TrustStrip`, `CTABand`, `Eyebrow`, JSON-LD helpers.
- Produces: catalog slug `flat-tire-repair`; route `/services/flat-tire-repair`.

**Photo:** blocked — see spec §10. No flat-tire or puncture photo exists in `public/photos/`. Source one before this task and add it as `public/photos/flat-tire.jpg` with a credit line in `public/photos/IMAGE-CREDITS.md`. Do not ship a mismatched stock photo on the highest-value new page.

- [ ] **Step 1: Add the catalog entry**

In `src/lib/services.ts`, add to `SERVICES` after the `tire-bolt-on` entry:

```ts
  {
    slug: "flat-tire-repair",
    name: "Flat Tire & Puncture Repair",
    shortName: "Flat Repair",
    category: "Tires",
    // No price: not in the WooCommerce catalogue and not confirmed by the owner.
    // Renders as "Call for a quote" until it is. Do not guess one.
    blurb: "Punctures plugged and patched properly, same day.",
    included: [
      "Tire taken off the rim and inspected inside and out",
      "Puncture patched from the inside, not just plugged",
      "Rebalanced before it goes back on",
      "Honest call if the tire is not safe to repair",
    ],
  },
```

- [ ] **Step 2: Run the parity test and watch it stay green, then create the page and watch it go red**

Run: `npm test -- routes`
Expected: PASS (no new route yet).

Create `src/app/services/flat-tire-repair/page.tsx` with the shared structure and these exact strings:

```ts
export const metadata: Metadata = buildMetadata({
  title: "Flat Tire Repair in Scarborough",
  description:
    "Flat or slow puncture? Boss Tire on Danforth Rd repairs punctures the same day — tire off the rim, patched from the inside, rebalanced. Walk in or call (647) 871-2393.",
  path: "/services/flat-tire-repair",
  keywords: [
    "tire repair near me",
    "flat tire repair near me",
    "tire patch near me",
    "tire puncture repair",
    "flat tire repair scarborough",
  ],
});
```

`PageHeader`: eyebrow `"Flat Tire Repair"`, title `"Punctures fixed properly, same day"`, sub `"A nail in the tread does not have to mean a new tire. We take the tire off the rim, find the leak, patch it from the inside and rebalance it before it goes back on."`, `showCall`, image `/photos/flat-tire.jpg`.

Breadcrumb: Home → Services → Flat Tire Repair.

FAQ questions (exact — these become `FAQPage` schema):

```
1. Can a flat tire be repaired, or do I need a new one?
2. How much does a flat tire repair cost in Scarborough?
3. How long does a puncture repair take?
4. Do I need an appointment to get a flat fixed?
5. Why patch a tire from the inside instead of plugging it?
```

Facts the answers may use, and nothing beyond them: the shop is at 375 Danforth Rd Unit 3, Scarborough; phone `(647) 871-2393`; open Mon–Sat 9:00–19:00, closed Sunday; walk-ins welcome; repairs are same-day; the `included` list above. For question 2, say the price depends on the tire and the damage and invite a call — **do not state a figure**. For question 1, the honest industry answer: punctures in the tread are usually repairable, sidewall damage and shoulder punctures are not.

In place of the price card, render the "Call for a quote" card described in Task 2.

Run: `npm test -- routes`
Expected: FAIL — `[ '/services/flat-tire-repair' ]` missing from the sitemap.

- [ ] **Step 3: Add the sitemap entry and the catalog link**

In `src/app/sitemap.ts`, add after the `/services/oil-change` line:

```ts
    { path: "/services/flat-tire-repair", priority: 0.8 },
```

In `src/components/sections/ServiceCatalog.tsx`, add to `DETAIL_PAGES`:

```ts
  "flat-tire-repair": "/services/flat-tire-repair",
```

- [ ] **Step 4: Verify**

Run: `npm test && npm run build && npm run lint`
Expected: all PASS. Route prerenders. Confirm the rendered `Service` JSON-LD contains **no** `offers` key.

- [ ] **Step 5: Commit**

```bash
git add src/app/services/flat-tire-repair src/lib/services.ts src/components/sections/ServiceCatalog.tsx src/app/sitemap.ts
git commit -m "feat: add flat tire and puncture repair service page"
```

---

### Task 5: `/tires/used-tires`

~2,040/mo rising to ~3,400 in November. Must be honest about the stock.

**Files:**
- Create: `src/app/tires/used-tires/page.tsx`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `PageHeader`, `TrustStrip`, `CTABand`, `Eyebrow`, `BreadcrumbJsonLd`, `FaqJsonLd`.
- Produces: route `/tires/used-tires`. No catalog entry — this is a product page, not a priced service.

- [ ] **Step 1: Create the page and watch the parity test go red**

```ts
export const metadata: Metadata = buildMetadata({
  title: "Used Tires in Scarborough",
  description:
    "Used and budget tires fitted the same day at Boss Tire, Danforth Rd, Scarborough. Every tire checked for tread and damage before it goes on. Call (647) 871-2393 with your size.",
  path: "/tires/used-tires",
  keywords: [
    "used tires near me",
    "used tires scarborough",
    "used tires toronto",
    "cheap tires toronto",
    "cheap tires scarborough",
  ],
});
```

`PageHeader`: eyebrow `"Used Tires"`, title `"Good tires, less money"`, sub `"A safe used set is a better buy than a cheap new one. We check tread depth, age and sidewall condition on every tire before it goes anywhere near your car."`, `showCall`, image `/photos/new-used-tires.jpg`, alt `"Racks of new and used tires at the Boss Tire shop"`.

Breadcrumb: Home → Tires → Used Tires.

**Honesty requirement (spec §4).** The catalogue is 180 budget and mid-tier import SKUs — Ilink, Mazzini, Kpsen and Haida — from $73.12 to $219.00, median $108.41. Lead on fitting, price and same-day service. Do **not** imply a premium brand lineup, and do not name a brand the shop does not stock.

FAQ questions (exact):

```
1. Are used tires safe?
2. How much do used tires cost in Scarborough?
3. How do you check a used tire before selling it?
4. Can I mix used tires with the ones already on my car?
5. Do you have my tire size in stock?
```

Answer facts: the price range and median above may be quoted as a range; tread depth, age and sidewall checks; same-day fitting; call with year, make, model and size. For question 4, the honest answer is that tires should be matched in pairs across an axle at minimum.

Run: `npm test -- routes` → Expected: FAIL with `[ '/tires/used-tires' ]`.

- [ ] **Step 2: Add the sitemap entry**

```ts
    { path: "/tires/used-tires", priority: 0.8 },
```

- [ ] **Step 3: Verify**

Run: `npm test && npm run build && npm run lint` → Expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/tires/used-tires src/app/sitemap.ts
git commit -m "feat: add used tires page"
```

---

### Task 6: `/tires/winter-rims-and-packages`

800/mo rising to ~2,900 in November, at a $0.61 CPC — advertisers are not fighting for it. Also absorbs the alloy/steel/aftermarket wheel terms (~80/mo total) that are too small for their own page.

**Files:**
- Create: `src/app/tires/winter-rims-and-packages/page.tsx`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: same interior-page components; `SERVICES` for the changeover and storage cross-links.
- Produces: route `/tires/winter-rims-and-packages`.

- [ ] **Step 1: Create the page and watch the parity test go red**

```ts
export const metadata: Metadata = buildMetadata({
  title: "Winter Rims & Tire Packages",
  description:
    "Winter tires mounted on their own rims, ready to swap in minutes each season. Steel and alloy rim packages fitted at Boss Tire, Danforth Rd, Scarborough. Call (647) 871-2393.",
  path: "/tires/winter-rims-and-packages",
  keywords: [
    "winter rims and tires",
    "tire and rim package",
    "winter tire packages toronto",
    "alloy rims toronto",
    "steel rims toronto",
  ],
});
```

`PageHeader`: eyebrow `"Rims & Packages"`, title `"Winter tires on their own rims"`, sub `"A second set of rims turns the seasonal changeover into a fifteen-minute job instead of an afternoon — and it stops the bead damage that comes from mounting and unmounting the same tires twice a year."`, `showCall`, image `/photos/rims-red.jpg`, alt `"Alloy wheels on display at Boss Tire"`.

Breadcrumb: Home → Tires → Winter Rims & Packages.

**Required sections** so the small wheel terms are covered without their own page: a section on steel versus alloy rims, and a short section on fitting aftermarket and custom wheels.

**Required cross-links:** `/winter-tire-changeover` and `/services/tire-storage`. The three pages are one buying decision.

FAQ questions (exact):

```
1. Is it worth buying winter tires on their own rims?
2. Steel or alloy rims for winter?
3. What does a winter tire and rim package cost?
4. Will aftermarket rims fit my car?
5. Can you store the set I'm not using?
```

Answer facts: changeover is $60 (catalog `tire-changeover`); storage is $110 (catalog `tire-storage`, and the per-wheel question is unresolved — **do not state per-wheel or per-set**, say "call to confirm what your set costs to store"). Steel is cheaper and shrugs off salt damage; alloy looks better and is lighter. For question 3, quote the changeover price and say the package price depends on rim size and tire choice — do not invent a package price.

Run: `npm test -- routes` → Expected: FAIL with `[ '/tires/winter-rims-and-packages' ]`.

- [ ] **Step 2: Add the sitemap entry**

```ts
    { path: "/tires/winter-rims-and-packages", priority: 0.8 },
```

- [ ] **Step 3: Verify**

Run: `npm test && npm run build && npm run lint` → Expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/tires/winter-rims-and-packages src/app/sitemap.ts
git commit -m "feat: add winter rims and tire packages page"
```

---

### Task 7: `/services/tire-storage`

520/mo rising to ~1,440 in November. Catalog entry already exists at $110.

**Files:**
- Create: `src/app/services/tire-storage/page.tsx`
- Modify: `src/components/sections/ServiceCatalog.tsx` (`DETAIL_PAGES`)
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `getService("tire-storage")`, `formatPrice`, `ServiceJsonLd`.
- Produces: route `/services/tire-storage`.

- [ ] **Step 1: Create the page and watch the parity test go red**

```ts
export const metadata: Metadata = buildMetadata({
  title: "Tire Storage in Scarborough",
  description:
    "Off-season tire storage at Boss Tire, Danforth Rd, Scarborough — clean, dry, tagged by position and ready for your next changeover. Call (647) 871-2393 to reserve space.",
  path: "/services/tire-storage",
  keywords: [
    "tire storage",
    "tire storage scarborough",
    "winter tire storage toronto",
    "seasonal tire storage",
    "tire storage near me",
  ],
});
```

`PageHeader`: eyebrow `"Tire Storage"`, title `"Your off-season set, kept properly"`, sub `"Tires stored in a hot garage or stood in sunlight age faster than they should. We keep your off-season set clean, dry and tagged by position, ready to go back on the right corners."`, `showCall`, image `/photos/winter-tires.jpg`, alt `"Winter tires stacked and tagged in storage"`.

Breadcrumb: Home → Services → Tire Storage.

⚠️ **The $110 per-wheel question is unresolved (spec §9.2).** Render the price as the catalog holds it, via `formatPrice(storage.price)`, and add the line "Call to confirm what your set costs to store." Do **not** write "per wheel" or "per set" anywhere on this page. $440 for a set is a materially different offer and stating the wrong one is a claim in the client's name.

**Required cross-links:** `/winter-tire-changeover` and `/tires/winter-rims-and-packages`.

FAQ questions (exact):

```
1. How much does tire storage cost?
2. Why not just keep my tires in the garage?
3. How are the tires stored?
4. When should I bring my off-season set in?
5. What if I sell the car while you have my tires?
```

Answer facts: the catalog price and the "call to confirm" caveat; the `included` list (clean dry storage, tagged by position, ready for the next swap); changeover is $60; Mon–Sat 9:00–19:00; peak changeover demand runs from mid-October.

Run: `npm test -- routes` → Expected: FAIL with `[ '/services/tire-storage' ]`.

- [ ] **Step 2: Add the sitemap entry and catalog link**

```ts
    { path: "/services/tire-storage", priority: 0.8 },
```

```ts
  "tire-storage": "/services/tire-storage",
```

- [ ] **Step 3: Verify**

Run: `npm test && npm run build && npm run lint` → Expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/services/tire-storage src/components/sections/ServiceCatalog.tsx src/app/sitemap.ts
git commit -m "feat: add tire storage service page"
```

---

### Task 8: `/muffler-exhaust/exhaust-leak-repair`

570/mo at LOW competition — the softest target in the dataset, and where $41,821 of ad spend has gone with no matching page. Catalog entry exists at $150.

**Files:**
- Create: `src/app/muffler-exhaust/exhaust-leak-repair/page.tsx`
- Modify: `src/components/sections/ServiceCatalog.tsx` (`DETAIL_PAGES` — repoint `exhaust-repair`)
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `getService("exhaust-repair")`, `formatPrice`, `ServiceJsonLd`.
- Produces: route `/muffler-exhaust/exhaust-leak-repair`.

- [ ] **Step 1: Create the page and watch the parity test go red**

```ts
export const metadata: Metadata = buildMetadata({
  title: "Exhaust Leak Repair in Scarborough",
  description:
    "Loud exhaust, rattle or a smell in the cabin? Boss Tire on Danforth Rd finds and welds exhaust leaks from $150 — pipes, hangers and joints. Call (647) 871-2393.",
  path: "/muffler-exhaust/exhaust-leak-repair",
  keywords: [
    "exhaust leak repair",
    "exhaust repair scarborough",
    "exhaust pipe repair",
    "exhaust leak repair cost",
    "exhaust welding",
  ],
});
```

`PageHeader`: eyebrow `"Exhaust Leak Repair"`, title `"Find the leak, weld it, done"`, sub `"An exhaust leak gets louder, costs you fuel and can put fumes in the cabin. Most are a cracked joint, a rotted section of pipe or a broken hanger — and most are a weld, not a whole new system."`, `showCall`, image `/photos/muffler-bay.jpg`, alt `"Exhaust work underway in the Boss Tire service bay"`.

Breadcrumb: Home → Muffler & Exhaust → Exhaust Leak Repair.

**Required sections** covering the sub-services on the owner's list: exhaust leak repair, exhaust pipe repair, exhaust welding, and exhaust hanger repair. Mention resonator and flex pipe work briefly — both are on the owner's list but have almost no search volume, so they get a sentence, not a section.

**Cannibalisation rule (spec §5).** This page targets the repair transaction. It must **not** be optimised for catalytic converter cost — that belongs to the Task 9 post, which links here.

**Required cross-link:** back up to `/muffler-exhaust`.

FAQ questions (exact):

```
1. How much does exhaust leak repair cost?
2. How do I know if my exhaust is leaking?
3. Can an exhaust leak be welded, or does it need a new part?
4. Is it safe to drive with an exhaust leak?
5. How long does exhaust repair take?
```

Answer facts: exhaust repair is $150 (catalog `exhaust-repair`), muffler repair and replacement is $160 and "price can vary by vehicle"; the `included` list (leak repair, pipe and hanger work, weld repairs where needed); same-day; Mon–Sat 9:00–19:00. Question 4's honest answer is no — carbon monoxide in the cabin is the reason, and it is a real safety issue, not an upsell.

Run: `npm test -- routes` → Expected: FAIL with `[ '/muffler-exhaust/exhaust-leak-repair' ]`.

- [ ] **Step 2: Add the sitemap entry and repoint the catalog link**

```ts
    { path: "/muffler-exhaust/exhaust-leak-repair", priority: 0.8 },
```

In `DETAIL_PAGES`, change the `exhaust-repair` value from `/muffler-exhaust` to the deeper page:

```ts
  "exhaust-repair": "/muffler-exhaust/exhaust-leak-repair",
```

Leave `muffler-repair` pointing at `/muffler-exhaust`.

- [ ] **Step 3: Verify**

Run: `npm test && npm run build && npm run lint` → Expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/muffler-exhaust/exhaust-leak-repair src/components/sections/ServiceCatalog.tsx src/app/sitemap.ts
git commit -m "feat: add exhaust leak repair page"
```

---

## Task 9: The five blog posts

Grouped into one task: they share a single page shape, and the registry-parity tests from Task 3 only make sense green when the registry and the directories agree. Commit after each post.

**Files:**
- Modify: `src/lib/posts.ts` (five `POSTS` entries)
- Create: `src/app/blog/catalytic-converter-replacement-cost-toronto/page.tsx`
- Create: `src/app/blog/when-to-put-winter-tires-on-toronto/page.tsx`
- Create: `src/app/blog/wheel-balancing-vs-wheel-alignment/page.tsx`
- Create: `src/app/blog/can-a-flat-tire-be-repaired/page.tsx`
- Create: `src/app/blog/tpms-light-on-what-it-costs/page.tsx`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `Post`, `getPost`, `formatPostDate`, `ArticleJsonLd`, `BreadcrumbJsonLd`, `PageHeader`, `CTABand`.
- Produces: five routes under `/blog/`.

**Sitemap entries** — add all five to `routes` in `src/app/sitemap.ts` after the `/blog` line, as each post's page is created:

```ts
    { path: "/blog/catalytic-converter-replacement-cost-toronto", priority: 0.4 },
    { path: "/blog/when-to-put-winter-tires-on-toronto", priority: 0.4 },
    { path: "/blog/wheel-balancing-vs-wheel-alignment", priority: 0.4 },
    { path: "/blog/can-a-flat-tire-be-repaired", priority: 0.4 },
    { path: "/blog/tpms-light-on-what-it-costs", priority: 0.4 },
```

**Shared post structure:** `BreadcrumbJsonLd` (Home → Blog → title) + `ArticleJsonLd`; `PageHeader` with the post image and the formatted date in the sub; body prose; a closing block linking to the related service page; `CTABand`.

**Shared requirement:** answer the title question in the first 100 words, then go deeper. That opening paragraph is what AI answer engines quote. Where a real catalogue price exists, quote it — published prices are the asset most competitors hide.

- [ ] **Step 1: Watch the registry test go red**

Add all five entries to `POSTS` in `src/lib/posts.ts` (published `2026-09-05`), then:

Run: `npm test -- posts`
Expected: FAIL on "has a real page directory for every registered post" — five missing pages.

- [ ] **Step 2: Post 1 — catalytic converter replacement cost**

Route `/blog/catalytic-converter-replacement-cost-toronto`. Registry entry:

```ts
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
```

Content requirements: cover the symptoms (rattle, sulphur smell, failed emissions, warning light), why converters are stolen (precious metals, and that Toronto has a live theft problem), what a replacement involves, and the difference between a converter fault and a plain exhaust leak. Link to the exhaust leak page for the cheaper diagnosis. **Do not quote a converter replacement price** — it is not in the catalogue and varies enormously by vehicle. Say what drives the range and invite a call.

Run: `npm test && npm run build`, then commit:

```bash
git add src/lib/posts.ts src/app/blog/catalytic-converter-replacement-cost-toronto src/app/sitemap.ts
git commit -m "feat: add catalytic converter cost post"
```

- [ ] **Step 3: Post 2 — when to put winter tires on**

Route `/blog/when-to-put-winter-tires-on-toronto`. Registry entry:

```ts
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
```

Content requirements: lead with the seven-degree rule and why it is about rubber compound rather than snow. Cover Ontario timing, the mid-October to November rush, and the case for a second set of rims. Quote the $60 changeover price. Link to all three related pages. This post is the seasonal engine for three service pages, so its internal links matter more than its own ranking.

Run: `npm test && npm run build`, then commit.

- [ ] **Step 4: Post 3 — wheel balancing vs alignment**

Route `/blog/wheel-balancing-vs-wheel-alignment`. Registry entry:

```ts
  {
    slug: "wheel-balancing-vs-wheel-alignment",
    title: "Wheel balancing vs wheel alignment: what's the difference?",
    description:
      "Balancing fixes vibration. Alignment fixes pulling and uneven tire wear. They are different jobs at different prices — here is how to tell which one your car needs.",
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
```

Content requirements: define both plainly, give the symptom-to-service mapping, and cover when you need each. Quote both catalogue prices — rebalancing $12 per tire, wheel alignment $80 — and mention the live offers (four tires bought = 50% off alignment, two tires = 25% off). Link to `/services/wheel-alignment`.

Run: `npm test && npm run build`, then commit.

- [ ] **Step 5: Post 4 — can a flat tire be repaired**

Route `/blog/can-a-flat-tire-be-repaired`. Registry entry:

```ts
  {
    slug: "can-a-flat-tire-be-repaired",
    title: "Can a flat tire be repaired, or do you need a new one?",
    description:
      "Tread punctures are usually repairable. Sidewall damage almost never is. Here is where the line sits and why a proper patch beats a plug.",
    published: "2026-09-05",
    excerpt:
      "A nail in the middle of the tread is usually a repair. A cut in the sidewall is usually a new tire. The difference is worth knowing before someone sells you four.",
    image: "/photos/flat-tire.jpg",
    imageAlt: "A punctured tire being inspected off the rim",
    keywords: [
      "can a flat tire be repaired",
      "flat tire repair cost",
      "tire puncture repair",
      "when to replace a punctured tire",
    ],
    relatedServices: ["/services/flat-tire-repair"],
  },
```

Content requirements: the repairable zone (tread, not shoulder or sidewall), puncture size limits, why a plug alone is a temporary fix and an inside patch is not, run-flats, and what a driven-on flat does to the sidewall. Link to `/services/flat-tire-repair`.

**Cannibalisation rule:** this post must not target `tire repair near me`. That term belongs to the service page.

Depends on the Task 4 photo. Run: `npm test && npm run build`, then commit.

- [ ] **Step 6: Post 5 — TPMS light**

Route `/blog/tpms-light-on-what-it-costs`. Registry entry:

```ts
  {
    slug: "tpms-light-on-what-it-costs",
    title: "TPMS light on: what it means and what a sensor costs",
    description:
      "The tire pressure light can mean low pressure, a dead sensor battery, or a sensor that needs programming after a tire change. Here is how to tell which, and what it costs.",
    published: "2026-09-05",
    excerpt:
      "A TPMS light is not always a flat. Often it is a sensor at the end of its battery life — and the fix is $69.99, not four new tires.",
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
```

Content requirements: what the light actually indicates, the three common causes (genuine low pressure, dead sensor battery after 5–10 years, sensor needing a relearn after a tire change), why cold weather sets it off every autumn, and when it is safe to keep driving. Quote the catalogue TPMS price of $69.99. Link to `/services` anchored to the TPMS entry (`/services#tpms` — `ServiceCatalog` already renders `id={s.slug}` with `scroll-mt-24`).

Run: `npm test && npm run build`, then commit.

- [ ] **Step 7: Verify the whole set**

Run: `npm test && npm run build && npm run lint`
Expected: all PASS. All five post routes prerender. Registry parity green in both directions.

Confirm the rendered date on each post reads **5 September 2026**, not 4 September. If it reads 4 September, the `timeZone: "UTC"` pin has been lost.

---

## Task 10: Internal linking and the accessories block

Without this task the ten new pages are orphans, reachable only from the sitemap. On a domain with zero legitimate backlinks this is the single highest-leverage task in the plan.

**Files:**
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/tires/page.tsx`
- Modify: `src/app/muffler-exhaust/page.tsx`
- Modify: `src/app/winter-tire-changeover/page.tsx`
- Modify: `src/app/services/wheel-alignment/page.tsx`
- Create: `src/lib/__tests__/links.test.ts`

**Interfaces:**
- Consumes: `routesFromFs` from Task 1.
- Produces: a test asserting every internal `href` in `src/app` resolves to a real route.

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/links.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { routesFromFs } from "./routes.test";

function tsxFiles(dir = "src/app"): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...tsxFiles(full));
    else if (e.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

describe("internal links", () => {
  it("only points at routes that exist", () => {
    const routes = new Set(routesFromFs());
    const bad: string[] = [];
    for (const file of tsxFiles()) {
      const src = readFileSync(file, "utf8");
      for (const m of src.matchAll(/href="(\/[^"#?]*)/g)) {
        const path = m[1].replace(/\/$/, "") || "/";
        if (!routes.has(path)) bad.push(`${file} -> ${m[1]}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it("links to every new page from somewhere other than the sitemap", () => {
    const linked = new Set<string>();
    for (const file of tsxFiles()) {
      const src = readFileSync(file, "utf8");
      for (const m of src.matchAll(/href="(\/[^"#?]*)/g)) {
        linked.add(m[1].replace(/\/$/, "") || "/");
      }
    }
    const newPages = [
      "/services/flat-tire-repair",
      "/services/tire-storage",
      "/tires/used-tires",
      "/tires/winter-rims-and-packages",
      "/muffler-exhaust/exhaust-leak-repair",
      "/blog/catalytic-converter-replacement-cost-toronto",
      "/blog/when-to-put-winter-tires-on-toronto",
      "/blog/wheel-balancing-vs-wheel-alignment",
      "/blog/can-a-flat-tire-be-repaired",
      "/blog/tpms-light-on-what-it-costs",
    ];
    expect(newPages.filter((p) => !linked.has(p))).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- links`
Expected: FAIL on the second case, listing the pages nothing links to. The blog posts are linked from the `/blog` index, so the failures should be the five service pages plus any post the index does not render.

- [ ] **Step 3: Add the links**

| File | Add |
|---|---|
| `src/app/services/page.tsx` | links to `/services/flat-tire-repair` and `/services/tire-storage` (handled by `DETAIL_PAGES` if Tasks 4 and 7 were done; verify they render) |
| `src/app/tires/page.tsx` | a section linking to `/tires/used-tires` and `/tires/winter-rims-and-packages` |
| `src/app/muffler-exhaust/page.tsx` | a link to `/muffler-exhaust/exhaust-leak-repair` |
| `src/app/winter-tire-changeover/page.tsx` | links to `/services/tire-storage` and `/tires/winter-rims-and-packages` |
| `src/app/services/wheel-alignment/page.tsx` | a link to `/blog/wheel-balancing-vs-wheel-alignment` |

- [ ] **Step 4: Add the accessories upsell block**

In `src/app/winter-tire-changeover/page.tsx`, add a short block covering snow brushes and ice scrapers, booster cables, emergency car kits and windshield wipers — the winter accessories the shop stocks (spec §2). This exists because the accessory search demand is real but retail-intent, so it belongs where someone is already booking rather than on its own page.

**No prices.** No accessory price is in the catalogue. List what is stocked and invite a call.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- links`
Expected: PASS, both cases.

- [ ] **Step 6: Verify and commit**

Run: `npm test && npm run build && npm run lint`

```bash
git add src/app src/lib/__tests__/links.test.ts
git commit -m "feat: wire new pages into hub pages, add winter accessories block"
```

---

## Task 11: Metadata uniqueness and pre-deploy verification

**Files:**
- Create: `src/lib/__tests__/metadata.test.ts`

**Interfaces:**
- Consumes: `tsxFiles` pattern from Task 10.
- Produces: a test that no two pages share a title or description.

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/metadata.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

function pageFiles(dir = "src/app"): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...pageFiles(full));
    else if (e.name === "page.tsx") out.push(full);
  }
  return out;
}

function dupes(values: string[]): string[] {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const v of values) (seen.has(v) ? dup : seen).add(v);
  return [...dup];
}

describe("page metadata", () => {
  const files = pageFiles();

  it("gives every page a unique title", () => {
    const titles = files
      .map((f) => readFileSync(f, "utf8").match(/title:\s*"([^"]+)"/)?.[1])
      .filter((t): t is string => Boolean(t));
    expect(dupes(titles)).toEqual([]);
  });

  it("gives every page a unique description", () => {
    const descs = files
      .map((f) => readFileSync(f, "utf8").match(/description:\s*\n?\s*"([^"]+)"/)?.[1])
      .filter((d): d is string => Boolean(d));
    expect(dupes(descs)).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the test**

Run: `npm test -- metadata`
Expected: PASS if every page is genuinely distinct. If it fails on a **pre-existing** collision, fix the page rather than narrowing the test (spec §11).

Prove it bites: temporarily change one new page's title to match another's, run, confirm FAIL, revert.

- [ ] **Step 3: Full pre-deploy verification**

Run: `npm test && npm run build && npm run lint`

Then confirm by hand, against the built output in `.next`:

- All 19 routes prerender as static HTML (9 existing + 10 new), plus `/blog`.
- `Article`, `Service`, `FAQPage` and `BreadcrumbList` JSON-LD each validate. Paste one of each into the Rich Results Test.
- The flat-tire-repair page's `Service` JSON-LD has **no** `offers` key.
- No page prints "per wheel" or "per set" for tire storage.
- No page states a flat-tire repair price or a catalytic converter price.
- Blog dates read 5 September 2026.

- [ ] **Step 4: Commit and deploy**

```bash
git add src/lib/__tests__/metadata.test.ts
git commit -m "test: assert unique page titles and descriptions"
git push origin main
```

Vercel deploys from `main`. Confirm the deployment succeeds and spot-check three new URLs live.

- [ ] **Step 5: Post-deploy indexing**

- Resubmit the sitemap in Search Console for `sc-domain:boss-tire.ca`.
- Request indexing on all ten new URLs.
- Record the date. Re-inspect coverage around 19 September and note which indexed — this is the evidence for whether publishing ten at once worked, and it feeds the next content decision.

---

## Open items to carry to the client

Neither blocks this plan; both make a page thinner than it could be.

1. **Flat tire repair price** — not in the catalogue. The page ships with "Call for a quote".
2. **Tire storage $110 — per wheel or per set?** The page ships stating neither.

Add both to the Fawad question list alongside the existing open items.
