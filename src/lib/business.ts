// ─── Business facts — the single source of truth ────────────────────────────
// Resolved from the content-transfer-manifest (2026-08-18). The old WordPress
// site contradicted itself on nearly every field; these are the corrected,
// canonical values and nothing on the new site should say otherwise.
//
//  - Phone: 647-871-2393. The old header/footer printed 416-691-0426 on 23 of
//    24 pages; the schema, the GBP and Boss Tire's own promo graphics all use
//    647. The 416 number was wrong and is dropped.
//  - Email: info@boss-tire.ca only. `bossttires@gmail.com` (double-t typo) is
//    dropped entirely.
//  - Name: "Boss Tire" (the old site used five spellings; this is the one).

export const BUSINESS = {
  name: "Boss Tire",
  shortName: "Boss Tire",
  legalNote: "Wheel Alignment & Muffler Repair", // descriptor, not part of the name
  phoneDisplay: "(647) 871-2393",
  phoneRaw: "+16478712393",
  email: "info@boss-tire.ca",
  areaServed: "Scarborough & the Greater Toronto Area, Ontario, Canada",
  tagline: "Your Tire Partner",
  url: "https://boss-tire.ca", // site canonicalises to the bare domain (www 301s to non-www)
  address: {
    street: "375 Danforth Rd, Unit 8",
    locality: "Scarborough",
    region: "ON",
    postalCode: "M1L 3X8",
    country: "CA", // ISO 3166-1 alpha-2 — JSON-LD only, never rendered
  },
  // Real storefront geo (from the Google Business Profile) for LocalBusiness schema.
  geo: { latitude: 43.7048237, longitude: -79.2685917 },
  hours: {
    weekdays: "Mon–Sat: 9:00 AM – 7:00 PM",
    weekend: "Sunday: Closed",
    // Machine form for openingHoursSpecification.
    open: "09:00",
    close: "19:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const,
  },
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61556088204894",
    instagram: "https://www.instagram.com/bosstire0",
  },
  // Verified Google listing — reviews, hours, service area entity.
  googleBusinessProfile: "https://www.google.com/maps/search/?api=1&query=Boss+Tire+375+Danforth+Rd+Scarborough",
  // GA4 measurement ID carried over from the old site so history stays continuous.
  ga4: "G-39PPPBKJC6",
  // Google Ads conversion tracking. The old site had none. To turn it on, set
  // `id` to the account's conversion ID (e.g. "AW-1234567890") and paste the
  // per-action conversion labels from Google Ads → Goals → Conversions. Left
  // empty, the Ads tag and Ads conversions stay off and only GA4 records events.
  googleAds: {
    id: "" as string,
    labels: { phoneCall: "", lead: "" },
  },
} as const;

export const telHref = `tel:${BUSINESS.phoneRaw}`;
export const mailHref = `mailto:${BUSINESS.email}`;

// "375 Danforth Rd, Unit 8, Scarborough, ON M1L 3X8"
export const addressDisplay = `${BUSINESS.address.street}, ${BUSINESS.address.locality}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}`;

// Interactive Google Map embed — the `output=embed` form needs no API key.
export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(addressDisplay)}&output=embed`;
export const mapsLinkHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressDisplay)}`;
