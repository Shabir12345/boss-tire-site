// ─── Google Ads landing pages ───────────────────────────────────────────────
// One page per ad group of the Winter Changeover SKAG campaign
// ("Boss Tire | Winter Changeover | Search SKAG | 2026", id 24284278020).
// Each page's H1 is that ad group's first pinned headline, word for word, so
// keyword → ad → page match holds for Quality Score.
//
// These pages are noindex and left out of the sitemap on purpose: 17 near-twin
// pages would read as doorway pages to organic search. The indexed pages for
// these topics stay /winter-tire-changeover and /services/tire-storage.
//
// Claims are limited to what the site already states and the shop has
// confirmed: changeover $160 and up, 4.8 from 321 Google reviews, Mon–Sat 9–7,
// Unit 3, 375 Danforth Rd. Storage has no price here — the storage ads say
// "Call for Your Storage Price" and flat vs per-wheel is still unconfirmed.

export type AdLandingKind = "changeover" | "storage";

export interface AdLandingPage {
  slug: string;
  /** The ad group's keyword, exactly as bid on. */
  keyword: string;
  kind: AdLandingKind;
  /** H1 — the ad group's first pinned (slot 1) headline, verbatim. */
  h1: string;
  sub: string;
  metaDescription: string;
}

export const AD_LANDING_BASE = "/book";

export const AD_LANDING_PAGES: AdLandingPage[] = [
  {
    slug: "tire-changeover-near-me",
    keyword: "tire changeover near me",
    kind: "changeover",
    h1: "Tire Changeover Near Me",
    sub: "Boss Tire is at 375 Danforth Rd in Scarborough. Your seasonal set goes on for $160 and up, balanced and torqued to spec while you wait.",
    metaDescription: "Tire changeover at Boss Tire, 375 Danforth Rd, Scarborough. $160 and up, balanced and torqued while you wait. Mon–Sat 9–7. Call (647) 871-2393.",
  },
  {
    slug: "tire-change-near-me",
    keyword: "tire change near me",
    kind: "changeover",
    h1: "Tire Change Near Me",
    sub: "Boss Tire is on Danforth Rd in Scarborough, open Monday to Saturday, 9 to 7. Seasonal tire changes are $160 and up, done while you wait.",
    metaDescription: "Seasonal tire change at Boss Tire on Danforth Rd, Scarborough. $160 and up, balanced and torqued while you wait. Call (647) 871-2393.",
  },
  {
    slug: "tire-change-scarborough",
    keyword: "tire change scarborough",
    kind: "changeover",
    h1: "Tire Change Scarborough",
    sub: "Boss Tire is at 375 Danforth Rd, Unit 3, in Scarborough. Seasonal tire changes are $160 and up, Monday to Saturday, 9 AM to 7 PM.",
    metaDescription: "Tire change at Boss Tire, 375 Danforth Rd, Unit 3, Scarborough. $160 and up, Mon–Sat 9–7. Call (647) 871-2393 to pick your time.",
  },
  {
    slug: "winter-tire-change",
    keyword: "winter tire change",
    kind: "changeover",
    h1: "Winter Tire Change",
    sub: "Get your winter tires on before the cold sets in. $160 and up at Boss Tire on Danforth Rd, balanced and torqued to spec while you wait.",
    metaDescription: "Winter tire change at Boss Tire, Scarborough. $160 and up, balanced and torqued to spec while you wait. Book before the November rush.",
  },
  {
    slug: "winter-tire-change-near-me",
    keyword: "winter tire change near me",
    kind: "changeover",
    h1: "Winter Tire Change Near Me",
    sub: "Boss Tire is on Danforth Rd in Scarborough, open Monday to Saturday, 9 to 7. Winter tire changes are $160 and up, done while you wait.",
    metaDescription: "Winter tire change at Boss Tire on Danforth Rd, Scarborough. $160 and up, Mon–Sat 9–7. Call (647) 871-2393 to pick your time.",
  },
  {
    slug: "snow-tire-change",
    keyword: "snow tire change",
    kind: "changeover",
    h1: "Snow Tire Change",
    sub: "Snow tires on, all-seasons off, for $160 and up. Balanced, torqued to spec and pressures set on all four at Boss Tire in Scarborough.",
    metaDescription: "Snow tire change at Boss Tire, Scarborough. $160 and up, balanced, torqued and pressures set on all four. Call (647) 871-2393.",
  },
  {
    slug: "tire-swap-near-me",
    keyword: "tire swap near me",
    kind: "changeover",
    h1: "Tire Swap Near Me",
    sub: "A seasonal tire swap at 375 Danforth Rd in Scarborough, $160 and up. Call ahead to pick your time, or walk in Monday to Saturday.",
    metaDescription: "Seasonal tire swap at Boss Tire, 375 Danforth Rd, Scarborough. $160 and up, Mon–Sat 9–7. Call (647) 871-2393 to pick your time.",
  },
  {
    slug: "seasonal-tire-change",
    keyword: "seasonal tire change",
    kind: "changeover",
    h1: "Seasonal Tire Change",
    sub: "Summer to winter or winter to summer, Boss Tire swaps your seasonal set for $160 and up and can store the other set until next time.",
    metaDescription: "Seasonal tire change at Boss Tire, Scarborough. $160 and up, balanced and torqued while you wait, with tire storage available.",
  },
  {
    slug: "winter-tire-installation",
    keyword: "winter tire installation",
    kind: "changeover",
    h1: "Winter Tire Installation",
    sub: "Winters already on their own rims, or need them mounted onto yours? Boss Tire does both, $160 and up, balanced and torqued to spec.",
    metaDescription: "Winter tire installation at Boss Tire, Scarborough. Mounted, balanced and torqued to spec, $160 and up. Call (647) 871-2393.",
  },
  {
    slug: "tire-changeover",
    keyword: "tire changeover",
    kind: "changeover",
    h1: "Tire Changeover",
    sub: "Your seasonal changeover at Boss Tire in Scarborough, $160 and up. Every tire is inspected, balanced and torqued to spec.",
    metaDescription: "Tire changeover at Boss Tire, Scarborough. $160 and up, every tire inspected, balanced and torqued to spec. Call (647) 871-2393.",
  },
  {
    slug: "winter-tire-changeover",
    keyword: "winter tire changeover",
    kind: "changeover",
    h1: "Winter Tire Changeover",
    sub: "Book your winter tire changeover before the November rush. $160 and up at Boss Tire, 375 Danforth Rd, Scarborough.",
    metaDescription: "Winter tire changeover at Boss Tire, 375 Danforth Rd, Scarborough. $160 and up. Book before the November rush: (647) 871-2393.",
  },
  {
    slug: "tire-changeover-scarborough",
    keyword: "tire changeover scarborough",
    kind: "changeover",
    h1: "Tire Changeover Scarborough",
    sub: "Boss Tire is at 375 Danforth Rd, Unit 3, in Scarborough. Changeovers are $160 and up, Monday to Saturday, 9 AM to 7 PM.",
    metaDescription: "Tire changeover at Boss Tire, 375 Danforth Rd, Unit 3, Scarborough. $160 and up, Mon–Sat 9–7. Call (647) 871-2393.",
  },
  {
    slug: "tire-changeover-cost",
    keyword: "tire changeover cost",
    kind: "changeover",
    h1: "Tire Changeover Cost",
    sub: "A tire changeover at Boss Tire is $160 and up, depending on your vehicle. Call with your make and model and we'll tell you the number for yours.",
    metaDescription: "Tire changeover at Boss Tire costs $160 and up, depending on vehicle. Balanced and torqued to spec. Call (647) 871-2393 for your price.",
  },
  {
    slug: "tire-storage",
    keyword: "tire storage",
    kind: "storage",
    h1: "Tire Storage",
    sub: "Hand us your off-season set when you do your changeover. We keep it clean and dry, tagged by wheel position, until the season turns.",
    metaDescription: "Off-season tire storage at Boss Tire, Scarborough. Clean, dry and tagged by wheel position. Call (647) 871-2393 for your storage price.",
  },
  {
    slug: "tire-storage-near-me",
    keyword: "tire storage near me",
    kind: "storage",
    h1: "Tire Storage Near Me",
    sub: "Boss Tire stores off-season tires at 375 Danforth Rd in Scarborough. Drop your set off at your changeover and get your garage back.",
    metaDescription: "Tire storage at Boss Tire, 375 Danforth Rd, Scarborough. Clean, dry and tagged by wheel position. Call (647) 871-2393 for your price.",
  },
  {
    slug: "winter-tire-storage",
    keyword: "winter tire storage",
    kind: "storage",
    h1: "Winter Tire Storage",
    sub: "Whichever set is off the car, we keep it clean and dry and tagged by wheel position, ready for your next changeover.",
    metaDescription: "Winter tire storage at Boss Tire, Scarborough. Clean, dry and tagged by wheel position. Call (647) 871-2393 for your storage price.",
  },
  {
    slug: "tire-storage-scarborough",
    keyword: "tire storage scarborough",
    kind: "storage",
    h1: "Tire Storage Scarborough",
    sub: "Off-season tire storage at 375 Danforth Rd, Unit 3, Scarborough. Kept clean and dry, tagged by position, ready when the season turns.",
    metaDescription: "Tire storage at Boss Tire, 375 Danforth Rd, Unit 3, Scarborough. Clean, dry, tagged by position. Call (647) 871-2393 for your price.",
  },
];

export function getAdLandingPage(slug: string): AdLandingPage | undefined {
  return AD_LANDING_PAGES.find((p) => p.slug === slug);
}

/** Document title (the root template appends " | Boss Tire"). */
export function adLandingTitle(p: AdLandingPage): string {
  return /scarborough/i.test(p.h1) ? p.h1 : `${p.h1} in Scarborough`;
}

export function adLandingPath(slug: string): string {
  return `${AD_LANDING_BASE}/${slug}`;
}
