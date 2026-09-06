import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { routesFromFs } from "./helpers";

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
    // Ruling R2: the blog posts are dropped from this list. The blog index
    // links them via `href={`/blog/${p.slug}`}`, a template literal this
    // regex cannot see. Task 3's registry-parity test already proves every
    // post has a page, and src/app/blog/page.tsx provably maps over the
    // entire registry via postsNewestFirst() — so /blog standing in for all
    // five posts loses no real coverage.
    const newPages = [
      "/services/flat-tire-repair",
      "/services/tire-storage",
      "/tires/used-tires",
      "/tires/winter-rims-and-packages",
      "/muffler-exhaust/exhaust-leak-repair",
      "/blog",
    ];
    expect(newPages.filter((p) => !linked.has(p))).toEqual([]);
  });
});
