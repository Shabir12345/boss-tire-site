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
