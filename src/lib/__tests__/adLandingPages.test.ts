import { describe, it, expect } from "vitest";
import { AD_LANDING_PAGES } from "@/lib/adLandingPages";
import sitemap from "@/app/sitemap";

// One page per ad group of the Winter Changeover SKAG campaign (17). The H1 is
// the ad group's first pinned headline, which for every SKAG is the keyword in
// title case, so the keyword, ad and page all say the same thing.
const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

describe("ad landing pages", () => {
  it("has one page per ad group", () => {
    expect(AD_LANDING_PAGES).toHaveLength(17);
    expect(new Set(AD_LANDING_PAGES.map((p) => p.slug)).size).toBe(17);
  });

  it("uses the keyword as the H1 and slug", () => {
    for (const p of AD_LANDING_PAGES) {
      expect(p.h1).toBe(titleCase(p.keyword));
      expect(p.slug).toBe(p.keyword.replace(/ /g, "-"));
    }
  });

  it("never prices storage", () => {
    for (const p of AD_LANDING_PAGES.filter((p) => p.kind === "storage")) {
      expect(`${p.sub} ${p.metaDescription}`).not.toMatch(/\$\d/);
    }
  });

  it("keeps the pages out of the sitemap", () => {
    expect(sitemap().some((e) => e.url.includes("/book/"))).toBe(false);
  });
});
