import type { NextConfig } from "next";

// Boss Tire rebuild. Static-first (no output:export — export mode silently
// ignores these redirects, and the migration depends on them). Redirects map
// retired WordPress/WooCommerce URLs to the new pages so indexed links and any
// Google Ads Final URLs that carry over keep resolving instead of 404ing.
//
// Shabir owns the Ads landing URLs: where a URL below changes destination, the
// matching Ad Final URL is updated on his side. These 301s are the safety net
// for organic/indexed links and any ad URL not yet updated.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Retired duplicate pages → the services hub ──
      { source: "/customized-services", destination: "/services", permanent: true },
      { source: "/products-services", destination: "/services", permanent: true },

      // ── Store retired: WooCommerce archives → the tire landing page ──
      { source: "/products", destination: "/tires", permanent: true },
      { source: "/shop", destination: "/tires", permanent: true },
      { source: "/product-category/services", destination: "/services", permanent: true },

      // ── Service products (WooCommerce) → real pages ──
      // Wheel alignment kept its own high-value URL (advertised + organically ranked).
      { source: "/product/wheel-alignment", destination: "/services/wheel-alignment", permanent: true },
      { source: "/product/rim-repair-bend-repairs", destination: "/services/rim-repair", permanent: true },
      { source: "/product/tire-changeover", destination: "/winter-tire-changeover", permanent: true },
      { source: "/product/tire-storage", destination: "/services/tire-storage", permanent: true },
      { source: "/product/tire-rebalancing", destination: "/services/tire-rebalancing", permanent: true },
      { source: "/product/tire-bolt-on", destination: "/services/tire-bolt-on", permanent: true },
      { source: "/product/oil-change", destination: "/services/oil-change", permanent: true },
      { source: "/product/tpms-tire-pressure-monitor", destination: "/services/tpms", permanent: true },
      { source: "/product/caliper-painting-all-four", destination: "/services/caliper-painting", permanent: true },
      { source: "/product/boss-muffler-repair-replacement", destination: "/muffler-exhaust", permanent: true },
      { source: "/product/boss-exhaust-repair", destination: "/muffler-exhaust", permanent: true },

      // ── Legacy contact variants ──
      { source: "/order-tracking", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
