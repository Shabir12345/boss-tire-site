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
