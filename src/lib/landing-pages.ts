// ─── Google Ads landing pages ───────────────────────────────────────────────
// One entry per ad group / search term. Each entry becomes a static page at
// /lp/<slug>, built by src/app/lp/[slug]/page.tsx from the shared template, so
// a fix to the template fixes every landing page at once.
//
// The rules every entry must follow are in LANDING-PAGES.md, and
// src/lib/__tests__/landing-pages.test.ts enforces the ones a test can check.
// In short:
//   - The headline repeats the searcher's words (message match with the ad).
//   - Prices, inclusions and offers come from services.ts, never retyped here.
//   - Every claim is one the shop already stands behind elsewhere on the site.
//   - No invented reviews, warranties, years in business or certifications.
//
// Landing pages are noindex and stay out of the sitemap: they are near-copies
// of the organic service pages by design, and the organic pages are the ones
// that should rank.

import type { Faq } from "./services";
import type { Step } from "@/components/sections/ProcessSteps";

export interface LandingPage {
  /** URL slug: /lp/<slug>. Lowercase words joined by hyphens, usually the keyword. */
  slug: string;
  /** The ad group's main search term. The H1 must contain its core words. */
  keyword: string;
  /** services.ts slug. Drives the price card, hero price and review matching. */
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
    /** Exactly three scannable proof points, each under ~40 characters. */
    bullets: [string, string, string];
    /** A real /photos file. Prefer real shop photos over stock. */
    image: string;
    imageAlt: string;
    /** Label on the hero price chip, e.g. "Alignment". */
    priceLabel: string;
  };

  /** Show the buy-tires alignment discount in the price card. */
  showAlignmentOffers?: boolean;

  /** 3–4 steps: what happens from the call to driving away. */
  steps: Step[];

  /** 3–5 objection-handling answers: cost, time, booking, "do I really need it". */
  faqs: Faq[];

  /** Placeholder in the quote form's message box: ask for what the shop needs to quote. */
  formPrompt: string;

  /** Closing CTA band. */
  cta: { heading: string; sub: string };

  /** The organic page this LP is the ad version of. Linked once, low on the page. */
  organicPage: string;
}

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "winter-tire-changeover-scarborough",
    keyword: "winter tire changeover scarborough",
    service: "tire-changeover",
    metaTitle: "Winter Tire Changeover Scarborough | From $160",
    metaDescription:
      "Winter tire changeover in Scarborough from $160: mounted, balanced and torqued while you wait. Same price all season. Call Boss Tire, 375 Danforth Rd.",
    hero: {
      eyebrow: "Winter tire changeover · Scarborough",
      headline: "Winter tire changeover in Scarborough, same day",
      sub: "Swap to your winters on Danforth Rd while you wait. Mounted, balanced, torqued to spec and pressures set on all four.",
      bullets: ["Done while you wait", "Same price in October as in the first snow", "Quote before we start"],
      image: "/photos/winter-changeover.jpg",
      imageAlt: "A technician mounting a tire on the changer during a seasonal changeover at Boss Tire",
      priceLabel: "Changeover",
    },
    steps: [
      { title: "Call or walk in", body: "Tell us your vehicle and whether your winters are on their own rims. Call ahead and we'll have a bay ready." },
      { title: "Price before we start", body: "We look the tires over and confirm the price for your vehicle before anything comes off the car." },
      { title: "Swap, balance, torque", body: "Mounted and balanced if they need it, torqued to manufacturer spec, pressures set on all four." },
      { title: "Drive off, store the rest", body: "You leave the same day. Want the off-season set gone from the garage? We'll store it." },
    ],
    faqs: [
      {
        q: "How much is a winter tire changeover?",
        a: "From $160 before tax, depending on your vehicle and whether the tires need mounting onto your rims. It's the same price in October as it is the week of the first snowfall. Call with your year, make and model and we'll confirm the exact number.",
      },
      {
        q: "Do I need an appointment?",
        a: "No. Walk-ins are welcome Monday to Saturday, 9 AM to 7 PM, and most changeovers are done while you wait. Calling ahead just means a bay is ready when you pull in.",
      },
      {
        q: "When should I switch to winter tires?",
        a: "Once daytime temperatures stay below about 7°C, usually late October to mid-November. Below that, all-season rubber hardens and loses grip well before the first snow. Coming in early means you pick the day instead of waiting in the November line.",
      },
      {
        q: "Can you store my summer tires?",
        a: "Yes. We keep your off-season set clean and dry and tag it by position so the next changeover rotates them properly.",
      },
    ],
    formPrompt: "Your vehicle (year, make, model), and are your winters on their own rims?",
    cta: { heading: "Beat the November rush", sub: "Call now and get your winters on the same day, before the whole city calls the same week." },
    organicPage: "/winter-tire-changeover",
  },
  {
    slug: "wheel-alignment-scarborough",
    keyword: "wheel alignment scarborough",
    service: "wheel-alignment",
    metaTitle: "Wheel Alignment Scarborough | $80, Same Day",
    metaDescription:
      "Wheel alignment in Scarborough for $80, done while you wait. Four-wheel alignment set to spec, 50% off with 4 tires. Call Boss Tire on Danforth Rd.",
    hero: {
      eyebrow: "Wheel alignment · Scarborough",
      headline: "Wheel alignment in Scarborough, same day",
      sub: "Car pulling or steering wheel off-centre? We set camber, caster and toe to your vehicle's spec on Danforth Rd while you wait.",
      bullets: ["Done while you wait", "50% off with 4 new tires", "Before-and-after numbers shown"],
      image: "/photos/alignment.jpg",
      imageAlt: "A four-wheel alignment being performed on a car at Boss Tire",
      priceLabel: "Alignment",
    },
    showAlignmentOffers: true,
    steps: [
      { title: "Tell us what it's doing", body: "Pulling, crooked steering wheel, uneven wear. Call or walk in and describe it." },
      { title: "We measure first", body: "The car goes on the alignment machine and we tell you honestly whether it needs doing." },
      { title: "Set to spec", body: "Camber, caster and toe set to your manufacturer's spec on all four wheels." },
      { title: "See what changed", body: "We show you the before-and-after numbers, and you drive off the same day." },
    ],
    faqs: [
      {
        q: "How much is a wheel alignment?",
        a: "$80 before tax. It's 50% off when you buy 4 tires with us and 25% off with 2, so on a tire purchase it costs far less.",
      },
      {
        q: "How long does it take?",
        a: "Most alignments are a same-day job, done while you wait. Call ahead with your year, make and model and we'll have you in and out.",
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
    formPrompt: "Your vehicle (year, make, model), and what it's doing: pulling, off-centre wheel, uneven wear?",
    cta: { heading: "Pulling to one side?", sub: "Call the shop, tell us what the car's doing, and we'll set it straight the same day." },
    organicPage: "/services/wheel-alignment",
  },
  {
    slug: "muffler-repair-scarborough",
    keyword: "muffler repair scarborough",
    service: "muffler-repair",
    metaTitle: "Muffler Repair Scarborough | From $160, Same Day",
    metaDescription:
      "Muffler repair and replacement in Scarborough from $160. We find the real problem, show you, and quote before any work. Call Boss Tire on Danforth Rd.",
    hero: {
      eyebrow: "Muffler repair · Scarborough",
      headline: "Muffler repair in Scarborough, done right",
      sub: "Loud drone, rattle or exhaust smell? We find the actual problem, show you, and quote before we touch it.",
      bullets: ["Quote before any work", "Most jobs same day", "Repair, not replace, when it can be"],
      image: "/photos/muffler-bay.jpg",
      imageAlt: "The Boss Tire muffler and exhaust bay with a car up on the lift",
      priceLabel: "Muffler",
    },
    steps: [
      { title: "Describe the noise", body: "Call or walk in and tell us what you're hearing or smelling. Most jobs are done the same day." },
      { title: "We put it on the lift", body: "We find where it's actually failing and show you, instead of guessing from the sound." },
      { title: "You approve the price", body: "Repair or replace, you get the number first. Nothing starts until you say yes." },
      { title: "Quiet drive home", body: "Fitted, checked for leaks, and back on the road." },
    ],
    faqs: [
      {
        q: "How much does muffler repair cost?",
        a: "Muffler repair and replacement starts at $160 before tax. The exact price depends on your vehicle and whether it can be repaired or needs replacing. Call with your year, make and model and you'll have a real number.",
      },
      {
        q: "Can you do it today?",
        a: "Most muffler and exhaust jobs are same-day. We inspect on arrival, show you the problem, and quote before any work starts.",
      },
      {
        q: "Do I need a whole new exhaust?",
        a: "Often not. A single rusted pipe, a broken hanger or a failed weld can be repaired without replacing the whole system. We tell you honestly which one you're looking at.",
      },
    ],
    formPrompt: "Your vehicle (year, make, model), and what you hear or smell: drone, rattle, hiss?",
    cta: { heading: "Something loud under the car?", sub: "Call the shop, describe what you hear, and we'll tell you what it likely is and what it costs." },
    organicPage: "/muffler-exhaust",
  },
];

export const getLandingPage = (slug: string): LandingPage | undefined =>
  LANDING_PAGES.find((p) => p.slug === slug);
