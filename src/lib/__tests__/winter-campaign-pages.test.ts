import { describe, it, expect } from "vitest";
import { getLandingPage } from "@/lib/landing-pages";

// The 17 ad groups of "Boss Tire | Winter Changeover | Search SKAG | 2026" and
// each one's first pinned headline. Every ad group needs a page whose H1 is that
// headline word for word (the Final URL is /lp/<slug>).
const AD_GROUPS: [string, string][] = [
  ["tire changeover near me", "Tire Changeover Near Me"],
  ["tire change near me", "Tire Change Near Me"],
  ["tire change scarborough", "Tire Change Scarborough"],
  ["winter tire change", "Winter Tire Change"],
  ["winter tire change near me", "Winter Tire Change Near Me"],
  ["snow tire change", "Snow Tire Change"],
  ["tire swap near me", "Tire Swap Near Me"],
  ["seasonal tire change", "Seasonal Tire Change"],
  ["winter tire installation", "Winter Tire Installation"],
  ["tire changeover", "Tire Changeover"],
  ["winter tire changeover", "Winter Tire Changeover"],
  ["tire changeover scarborough", "Tire Changeover Scarborough"],
  ["tire changeover cost", "Tire Changeover Cost"],
  ["tire storage", "Tire Storage"],
  ["tire storage near me", "Tire Storage Near Me"],
  ["winter tire storage", "Winter Tire Storage"],
  ["tire storage scarborough", "Tire Storage Scarborough"],
];

describe("Winter Changeover campaign landing pages", () => {
  for (const [keyword, pinned] of AD_GROUPS) {
    it(`${keyword} → H1 "${pinned}"`, () => {
      const lp = getLandingPage(keyword.replace(/ /g, "-"));
      expect(lp, `no /lp page for "${keyword}"`).toBeDefined();
      expect(lp!.hero.headline).toBe(pinned);
      expect(lp!.keyword).toBe(keyword);
    });
  }

  it("storage pages quote by phone, like the storage ads", () => {
    for (const [keyword] of AD_GROUPS.filter(([k]) => k.includes("storage"))) {
      const lp = getLandingPage(keyword.replace(/ /g, "-"))!;
      expect(lp.hidePrice).toBe(true);
      expect(`${lp.hero.sub} ${lp.metaDescription}`).not.toMatch(/\$\d/);
    }
  });
});
