import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

// Real pages only — none of the old WordPress/Woo junk. Retired URLs are handled
// by 301s in next.config.ts, so they never belong in the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/services/wheel-alignment", priority: 0.8 },
    { path: "/tires", priority: 0.9 },
    { path: "/muffler-exhaust", priority: 0.8 },
    { path: "/winter-tire-changeover", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
  ];
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${BUSINESS.url}${r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
