import { describe, it, expect } from "vitest";
import { routesFromFs, sitemapPaths } from "./helpers";

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
