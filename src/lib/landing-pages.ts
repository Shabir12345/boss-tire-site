// ─── Google Ads landing pages ───────────────────────────────────────────────
// One entry per ad group / search term. Each entry becomes a static page at
// /lp/<slug>, built by src/app/lp/[slug]/page.tsx from the shared template, so
// a fix to the template fixes every landing page at once.
//
// The rules every entry must follow are in LANDING-PAGES.md, and
// src/lib/__tests__/landing-pages.test.ts enforces the ones a test can check.
// In short:
//   - The headline repeats the searcher's words (message match with the ad).
//   - No prices: the price is given on the call (owner decision 2026-09-29).
//     Inclusions and offers come from services.ts, never retyped here.
//   - No turnaround promises ("same day", "while you wait") the shop hasn't
//     confirmed.
//   - Every claim is one the shop already stands behind elsewhere on the site.
//   - No invented reviews, warranties, years in business or certifications.
//
// Landing pages are noindex and stay out of the sitemap: they are near-copies
// of the organic service pages by design, and the organic pages are the ones
// that should rank.

import type { Faq } from "./services";
import { BUSINESS } from "./business";
import type { Step } from "@/components/sections/ProcessSteps";

export interface LandingPage {
  /** URL slug: /lp/<slug>. Lowercase words joined by hyphens, usually the keyword. */
  slug: string;
  /** The ad group's main search term. The H1 must contain its core words. */
  keyword: string;
  /** services.ts slug. Drives "What you get" and review matching. */
  service: string;
  /** <title>, keyword first, max 48 characters: the layout appends " | Boss Tire",
   *  and the whole thing should stay under 60. */
  metaTitle: string;
  /** Under 160 characters. */
  metaDescription: string;

  hero: {
    eyebrow: string;
    /** Short, keyword-led, benefit-ending. Rendered uppercase. */
    headline: string;
    /** One or two sentences: what they get, where, how fast. */
    sub: string;
    /** A real /photos file. Prefer real shop photos over stock. */
    image: string;
    imageAlt: string;
  };

  /** Form button, named for the service: "Book my changeover". */
  bookLabel: string;

  /** Show the buy-tires alignment discount in the price card. */
  showAlignmentOffers?: boolean;

  /** 3–4 steps: what happens from the call to driving away. */
  steps: Step[];

  /** 3–5 objection-handling answers: cost, time, booking, "do I really need it". */
  faqs: Faq[];


  /** Closing CTA band. */
  cta: { heading: string; sub: string };

  /** The organic page this LP is the ad version of. Linked once, low on the page. */
  organicPage: string;
}

// ─── Winter Changeover SKAG campaign ────────────────────────────────────────
// "Boss Tire | Winter Changeover | Search SKAG | 2026" (id 24284278020): one
// page per ad group. The H1 is that ad group's first pinned headline, word for
// word. Steps and FAQs are shared per service so every page says the
// same true things. No page shows a price: it's given on the call.

const CHANGEOVER_STEPS: Step[] = [
  { title: "Call or walk in", body: "Tell us your vehicle and whether your winters are on their own rims. Call ahead and we'll have a bay ready." },
  { title: "Price before we start", body: "We look the tires over and confirm the price for your vehicle before anything comes off the car." },
  { title: "Swap, balance, torque", body: "Mounted and balanced if they need it, torqued to manufacturer spec, pressures set on all four." },
  { title: "Drive off, store the rest", body: "Want the off-season set out of the garage? We'll store it until next season." },
];

const CHANGEOVER_FAQS: Faq[] = [
  {
    q: "How much is a tire changeover?",
    a: `It depends on your vehicle and whether your tires are already on their own rims or need mounting. Call ${BUSINESS.phoneDisplay} with your year, make and model and we'll give you the price on the call, before any work starts.`,
  },
  {
    q: "How long does it take?",
    a: "It depends on whether your tires are on their own rims or need mounting and balancing onto yours. Tell us when you call and we'll give you a realistic time for your vehicle.",
  },
  {
    q: "When should I switch to winter tires?",
    a: "Once daytime temperatures stay below about 7°C, usually late October to mid-November. Below that, all-season rubber hardens and loses grip well before the first snow. Coming in early means you pick the day instead of waiting in the November line.",
  },
  {
    q: "Can you store my off-season set?",
    a: "Yes. We keep it clean and dry and tag it by wheel position, so the next changeover puts each tire back where it came from. Call for your storage price.",
  },
];

const STORAGE_STEPS: Step[] = [
  { title: "Bring your off-season set", body: "Most people hand over the set they just took off at their changeover, in the same visit." },
  { title: "Price on the phone", body: "Call with your vehicle and we'll tell you what your set costs to store before you drop it off." },
  { title: "Tagged and shelved", body: "Each tire is tagged by wheel position and kept clean and dry." },
  { title: "Back on next season", body: "At your next changeover the set comes off the shelf and goes back on the same corner it came off." },
];

const STORAGE_FAQS: Faq[] = [
  {
    q: "How much does tire storage cost?",
    a: `Call ${BUSINESS.phoneDisplay} and we'll give you the exact number for your set over the phone.`,
  },
  {
    q: "Why not keep my tires in the garage?",
    a: "A home garage swings hot in summer and cold in winter, and damp corners or direct sun age rubber faster than it should. Your set sits clean and dry with us instead, and you get the corner of your garage back.",
  },
  {
    q: "Do I need an appointment to drop them off?",
    a: `No. Walk-ins are welcome, ${BUSINESS.hours.weekdays}. Bringing the set at your changeover is easiest.`,
  },
  {
    q: "Can you do the changeover too?",
    a: "Yes. Call and we'll quote your changeover, then take your off-season set in the same visit.",
  },
];

// [slug, keyword, kind, H1 (= pinned headline), sub, meta description]
const WINTER_CAMPAIGN: [string, string, "changeover" | "storage", string, string, string][] = [
  ["tire-changeover-near-me", "tire changeover near me", "changeover", "Tire Changeover Near Me",
    "Boss Tire is at 375 Danforth Rd in Scarborough. Your seasonal set goes on balanced, torqued to spec and with pressures set on all four.",
    "Tire changeover at Boss Tire, 375 Danforth Rd, Scarborough. Balanced and torqued to spec. Mon–Sat 9–7. Call (647) 871-2393 for your quote."],
  ["tire-change-near-me", "tire change near me", "changeover", "Tire Change Near Me",
    "Boss Tire is on Danforth Rd in Scarborough, open Monday to Saturday, 9 to 7. Call with your vehicle and we'll quote your seasonal tire change.",
    "Seasonal tire change at Boss Tire on Danforth Rd, Scarborough. Balanced and torqued to spec. Call (647) 871-2393 for a quote for your vehicle."],
  ["tire-change-scarborough", "tire change scarborough", "changeover", "Tire Change Scarborough",
    "Boss Tire is at 375 Danforth Rd, Unit 3, in Scarborough. Seasonal tire changes Monday to Saturday, 9 AM to 7 PM, quoted before we start.",
    "Tire change at Boss Tire, 375 Danforth Rd, Unit 3, Scarborough. Mon–Sat 9–7. Call (647) 871-2393 for your quote and to pick your time."],
  ["winter-tire-change", "winter tire change", "changeover", "Winter Tire Change",
    "Get your winter tires on before the cold sets in. Boss Tire on Danforth Rd balances every tire and torques it to spec.",
    "Winter tire change at Boss Tire, Scarborough. Balanced and torqued to spec, quoted on the call. Book before the November rush."],
  ["winter-tire-change-near-me", "winter tire change near me", "changeover", "Winter Tire Change Near Me",
    "Boss Tire is on Danforth Rd in Scarborough, open Monday to Saturday, 9 to 7. Call with your vehicle and we'll quote your winter tire change.",
    "Winter tire change at Boss Tire on Danforth Rd, Scarborough. Mon–Sat 9–7. Call (647) 871-2393 for a quote and to pick your time."],
  ["snow-tire-change", "snow tire change", "changeover", "Snow Tire Change",
    "Snow tires on, all-seasons off. Balanced, torqued to spec and pressures set on all four at Boss Tire in Scarborough.",
    "Snow tire change at Boss Tire, Scarborough. Balanced, torqued and pressures set on all four. Call (647) 871-2393 for your quote."],
  ["tire-swap-near-me", "tire swap near me", "changeover", "Tire Swap Near Me",
    "A seasonal tire swap at 375 Danforth Rd in Scarborough. Call ahead for your quote and to pick your time, or walk in Monday to Saturday.",
    "Seasonal tire swap at Boss Tire, 375 Danforth Rd, Scarborough. Mon–Sat 9–7. Call (647) 871-2393 for a quote and to pick your time."],
  ["seasonal-tire-change", "seasonal tire change", "changeover", "Seasonal Tire Change",
    "Summer to winter or winter to summer, Boss Tire swaps your seasonal set and can store the other one until next time.",
    "Seasonal tire change at Boss Tire, Scarborough. Balanced and torqued to spec, with tire storage available. Call (647) 871-2393."],
  ["winter-tire-installation", "winter tire installation", "changeover", "Winter Tire Installation",
    "Winters already on their own rims, or need them mounted onto yours? Boss Tire does both, balanced and torqued to spec.",
    "Winter tire installation at Boss Tire, Scarborough. Mounted, balanced and torqued to spec. Call (647) 871-2393 for your quote."],
  ["tire-changeover", "tire changeover", "changeover", "Tire Changeover",
    "Your seasonal changeover at Boss Tire in Scarborough. Every tire is inspected, balanced and torqued to spec.",
    "Tire changeover at Boss Tire, Scarborough. Every tire inspected, balanced and torqued to spec. Call (647) 871-2393 for your quote."],
  ["winter-tire-changeover", "winter tire changeover", "changeover", "Winter Tire Changeover",
    "Book your winter tire changeover before the November rush at Boss Tire, 375 Danforth Rd, Scarborough.",
    "Winter tire changeover at Boss Tire, 375 Danforth Rd, Scarborough. Quoted on the call. Book before the November rush: (647) 871-2393."],
  ["tire-changeover-scarborough", "tire changeover scarborough", "changeover", "Tire Changeover Scarborough",
    "Boss Tire is at 375 Danforth Rd, Unit 3, in Scarborough. Changeovers Monday to Saturday, 9 AM to 7 PM, quoted before we start.",
    "Tire changeover at Boss Tire, 375 Danforth Rd, Unit 3, Scarborough. Mon–Sat 9–7. Call (647) 871-2393 for your quote."],
  ["tire-changeover-cost", "tire changeover cost", "changeover", "Tire Changeover Cost",
    "The cost depends on your vehicle and whether the tires need mounting onto your rims. Call with your make and model and we'll give you the price for yours.",
    "What a tire changeover costs at Boss Tire depends on your vehicle. Call (647) 871-2393 with your make and model for your price."],
  ["tire-storage", "tire storage", "storage", "Tire Storage",
    "Hand us your off-season set when you do your changeover. We keep it clean and dry, tagged by wheel position, until the season turns.",
    "Off-season tire storage at Boss Tire, Scarborough. Clean, dry and tagged by wheel position. Call (647) 871-2393 for your storage price."],
  ["tire-storage-near-me", "tire storage near me", "storage", "Tire Storage Near Me",
    "Boss Tire stores off-season tires at 375 Danforth Rd in Scarborough. Drop your set off at your changeover and get your garage back.",
    "Tire storage at Boss Tire, 375 Danforth Rd, Scarborough. Clean, dry and tagged by wheel position. Call (647) 871-2393 for your price."],
  ["winter-tire-storage", "winter tire storage", "storage", "Winter Tire Storage",
    "Whichever set is off the car, we keep it clean and dry and tagged by wheel position, ready for your next changeover.",
    "Winter tire storage at Boss Tire, Scarborough. Clean, dry and tagged by wheel position. Call (647) 871-2393 for your storage price."],
  ["tire-storage-scarborough", "tire storage scarborough", "storage", "Tire Storage Scarborough",
    "Off-season tire storage at 375 Danforth Rd, Unit 3, Scarborough. Kept clean and dry, tagged by position, ready when the season turns.",
    "Tire storage at Boss Tire, 375 Danforth Rd, Unit 3, Scarborough. Clean, dry, tagged by position. Call (647) 871-2393 for your price."],
];

const WINTER_CAMPAIGN_PAGES: LandingPage[] = WINTER_CAMPAIGN.map(([slug, keyword, kind, headline, sub, metaDescription]) => {
  const storage = kind === "storage";
  return {
    slug,
    keyword,
    service: storage ? "tire-storage" : "tire-changeover",
    bookLabel: storage ? "Book tire storage" : "Book my changeover",
    metaTitle: /scarborough/i.test(headline) ? headline : `${headline} in Scarborough`,
    metaDescription,
    hero: {
      eyebrow: `${storage ? "Tire storage" : "Tire changeover"} · Scarborough`,
      headline,
      sub,
      image: storage ? "/photos/winter-tires.jpg" : "/photos/winter-changeover.jpg",
      imageAlt: storage
        ? "A winter tire on a snow-covered road"
        : "A technician mounting a tire on the changer during a seasonal changeover",
    },
    steps: storage ? STORAGE_STEPS : CHANGEOVER_STEPS,
    faqs: storage ? STORAGE_FAQS : CHANGEOVER_FAQS,
    cta: storage
      ? { heading: "Reserve your storage space", sub: "Call the shop, get your storage price, and drop your set off at your changeover." }
      : { heading: "Beat the November rush", sub: "Call now, pick your changeover time, and skip the week everyone else is waiting in line." },
    organicPage: storage ? "/services/tire-storage" : "/winter-tire-changeover",
  };
});

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "winter-tire-changeover-scarborough",
    keyword: "winter tire changeover scarborough",
    service: "tire-changeover",
    bookLabel: "Book my changeover",
    metaTitle: "Winter Tire Changeover in Scarborough",
    metaDescription:
      "Winter tire changeover in Scarborough: mounted, balanced and torqued to spec. Call Boss Tire, 375 Danforth Rd, for a quote for your vehicle.",
    hero: {
      eyebrow: "Winter tire changeover · Scarborough",
      headline: "Winter tire changeover in Scarborough",
      sub: "Swap to your winters at Boss Tire on Danforth Rd. Mounted, balanced, torqued to spec and pressures set on all four.",
      image: "/photos/winter-changeover.jpg",
      imageAlt: "A technician mounting a tire on the changer during a seasonal changeover at Boss Tire",
    },
    steps: CHANGEOVER_STEPS,
    faqs: [
      CHANGEOVER_FAQS[0],
      {
        q: "Do I need an appointment?",
        a: "No. Walk-ins are welcome Monday to Saturday, 9 AM to 7 PM. Calling ahead means a bay is ready when you pull in.",
      },
      CHANGEOVER_FAQS[2],
      {
        q: "Can you store my summer tires?",
        a: "Yes. We keep your off-season set clean and dry and tag it by position so the next changeover rotates them properly.",
      },
    ],
    cta: { heading: "Beat the November rush", sub: "Call now, pick your time, and get your winters on before the whole city calls the same week." },
    organicPage: "/winter-tire-changeover",
  },
  {
    slug: "wheel-alignment-scarborough",
    keyword: "wheel alignment scarborough",
    service: "wheel-alignment",
    bookLabel: "Book my alignment",
    metaTitle: "Wheel Alignment in Scarborough",
    metaDescription:
      "Wheel alignment in Scarborough: camber, caster and toe set to your vehicle's spec. Call Boss Tire on Danforth Rd for a quote for your car.",
    hero: {
      eyebrow: "Wheel alignment · Scarborough",
      headline: "Wheel alignment in Scarborough",
      sub: "Car pulling or steering wheel off-centre? We set camber, caster and toe to your vehicle's spec at Boss Tire on Danforth Rd.",
      image: "/photos/alignment.jpg",
      imageAlt: "A four-wheel alignment being performed on a car at Boss Tire",
    },
    showAlignmentOffers: true,
    steps: [
      { title: "Tell us what it's doing", body: "Pulling, crooked steering wheel, uneven wear. Call or walk in and describe it." },
      { title: "We measure first", body: "The car goes on the alignment machine and we tell you honestly whether it needs doing." },
      { title: "Set to spec", body: "Camber, caster and toe set to your manufacturer's spec on all four wheels." },
      { title: "See what changed", body: "We show you the before-and-after numbers before you drive off." },
    ],
    faqs: [
      {
        q: "How much is a wheel alignment?",
        a: "It depends on your vehicle. Call with your year, make and model and we'll give you the price on the call. Buying tires with us? The alignment is 50% off with 4 tires and 25% off with 2.",
      },
      {
        q: "How long does it take?",
        a: "Call ahead with your year, make and model and we'll tell you how long yours will take and when we can fit you in.",
      },
      {
        q: "How do I know if I need one?",
        a: "The clearest signs are the steering wheel sitting off-centre, the car pulling to one side, or tires wearing faster on one edge. It's also worth checking after a hard pothole or curb hit. If you're not sure, we'll measure it and tell you honestly.",
      },
      {
        q: "Do you do four-wheel alignments?",
        a: "Yes: four-wheel, front-end and computerized alignments, set to your vehicle's spec so it tracks straight and the tires wear evenly.",
      },
    ],
    cta: { heading: "Pulling to one side?", sub: "Call the shop, tell us what the car's doing, and we'll get it tracking straight." },
    organicPage: "/services/wheel-alignment",
  },
  {
    slug: "muffler-repair-scarborough",
    keyword: "muffler repair scarborough",
    service: "muffler-repair",
    bookLabel: "Book a muffler check",
    metaTitle: "Muffler Repair in Scarborough",
    metaDescription:
      "Muffler repair and replacement in Scarborough. We find the real problem, show you, and quote before any work. Call Boss Tire on Danforth Rd.",
    hero: {
      eyebrow: "Muffler repair · Scarborough",
      headline: "Muffler repair in Scarborough, done right",
      sub: "Loud drone, rattle or exhaust smell? We find the actual problem, show you, and quote before we touch it.",
      image: "/photos/muffler-bay.jpg",
      imageAlt: "The Boss Tire muffler and exhaust bay with a car up on the lift",
    },
    steps: [
      { title: "Describe the noise", body: "Call or walk in and tell us what you're hearing or smelling." },
      { title: "We put it on the lift", body: "We find where it's actually failing and show you, instead of guessing from the sound." },
      { title: "You approve the price", body: "Repair or replace, you get the number first. Nothing starts until you say yes." },
      { title: "Quiet drive home", body: "Fitted, checked for leaks, and back on the road." },
    ],
    faqs: [
      {
        q: "How much does muffler repair cost?",
        a: "It depends on your vehicle and whether the muffler can be repaired or needs replacing. We put it on the lift, show you the problem, and give you the price before any work starts.",
      },
      {
        q: "How soon can you look at it?",
        a: "Call or walk in Monday to Saturday, 9 to 7. We inspect it, show you the problem, and quote before any work starts.",
      },
      {
        q: "Do I need a whole new exhaust?",
        a: "Often not. A single rusted pipe, a broken hanger or a failed weld can be repaired without replacing the whole system. We tell you honestly which one you're looking at.",
      },
    ],
    cta: { heading: "Something loud under the car?", sub: "Call the shop, describe what you hear, and we'll tell you what it likely is and what it costs." },
    organicPage: "/muffler-exhaust",
  },
  ...WINTER_CAMPAIGN_PAGES,
];

export const getLandingPage = (slug: string): LandingPage | undefined =>
  LANDING_PAGES.find((p) => p.slug === slug);
