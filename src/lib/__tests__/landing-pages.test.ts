import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { getService } from "@/lib/services";
import { routesFromFs, sitemapPaths } from "./helpers";

// Enforces the checkable half of LANDING-PAGES.md. If one of these fails, the
// entry is wrong, not the test: fix the landing page to meet the standard.
describe("Google Ads landing pages", () => {
  const organicRoutes = new Set(routesFromFs());

  it("has at least one page and unique, URL-safe slugs", () => {
    expect(LANDING_PAGES.length).toBeGreaterThan(0);
    const slugs = LANDING_PAGES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s, s).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  for (const lp of LANDING_PAGES) {
    describe(`/lp/${lp.slug}`, () => {
      it("is built on a real service, so price and inclusions come from services.ts", () => {
        expect(getService(lp.service), `unknown service "${lp.service}"`).toBeDefined();
      });

      it("repeats the searched keyword in the H1 (message match)", () => {
        const h1 = lp.hero.headline.toLowerCase();
        const missing = lp.keyword
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => !["near", "me", "in", "the", "a"].includes(w))
          .filter((w) => !h1.includes(w));
        expect(missing, `H1 "${lp.hero.headline}" is missing keyword words`).toEqual([]);
      });

      it("keeps the title and description inside search/ad preview limits", () => {
        // The layout appends " | Boss Tire" (12 chars) to the title.
        expect(lp.metaTitle.length, lp.metaTitle).toBeLessThanOrEqual(48);
        expect(lp.metaDescription.length, lp.metaDescription).toBeLessThanOrEqual(160);
        expect(lp.metaDescription.length).toBeGreaterThanOrEqual(70);
      });


      it("uses a hero photo that exists", () => {
        expect(existsSync(`public${lp.hero.image}`), lp.hero.image).toBe(true);
        expect(lp.hero.imageAlt.length).toBeGreaterThan(10);
      });

      it("explains the visit in 3–4 steps and handles 3–5 objections", () => {
        expect(lp.steps.length).toBeGreaterThanOrEqual(3);
        expect(lp.steps.length).toBeLessThanOrEqual(4);
        expect(lp.faqs.length).toBeGreaterThanOrEqual(3);
        expect(lp.faqs.length).toBeLessThanOrEqual(5);
      });

      it("links to a real organic page", () => {
        expect(organicRoutes.has(lp.organicPage), lp.organicPage).toBe(true);
      });

      it("stays out of the sitemap", () => {
        expect(sitemapPaths()).not.toContain(`/lp/${lp.slug}`);
      });
    });
  }

  it("renders every landing page noindex", () => {
    const src = readFileSync("src/app/lp/[slug]/page.tsx", "utf8");
    expect(src).toMatch(/noindex:\s*true/);
    expect(src).toMatch(/dynamicParams\s*=\s*false/);
  });
});
