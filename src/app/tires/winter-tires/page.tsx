import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { OffersBand } from "@/components/sections/OffersBand";
import { CTABand } from "@/components/sections/CTABand";
import { LocalTrust } from "@/components/sections/LocalTrust";
import { FaqSection } from "@/components/sections/FaqSection";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/lib/jsonld";
import { getService, formatPrice, requirePrice, ALIGNMENT_OFFERS } from "@/lib/services";
import { BUSINESS } from "@/lib/business";

const winter = getService("winter-tires")!;
const changeover = getService("tire-changeover")!;
const storage = getService("tire-storage")!;

// Same lists as /tires: the name brands Fawad confirmed (2026-10-05) and the
// budget imports the shop stocks.
const NAME_BRANDS = ["Michelin", "Goodyear", "Bridgestone", "Continental"];
const BUDGET_BRANDS = ["Haida", "Ilink", "Mazzini", "Kpsen"];

const OPTIONS = [
  {
    title: "New name-brand winters",
    body: "Michelin, Goodyear, Bridgestone and Continental for drivers who want the best grip money buys and plan to keep the set for years.",
  },
  {
    title: "Budget new winters",
    body: "Import brands that are honest, fairly priced winter tires. A real winter tire on a budget beats an all-season every time in the cold.",
  },
  {
    title: "Checked used winters",
    body: "Used sets inspected for tread depth, age and sidewall damage before they're sold. The cheapest way onto proper winter rubber this season.",
  },
];

const FAQS = [
  {
    q: "How much are winter tires?",
    a: `It depends on your tire size and which tires you pick: a used set, budget new or a name brand. Call ${BUSINESS.phoneDisplay} with the size off your sidewall and we'll give you the price for the set on the call, before anything is fitted. Buy 4 and your wheel alignment is 50% off; buy 2 and it's 25% off.`,
  },
  {
    q: "When should I put winter tires on in Toronto?",
    a: "Once daytime temperatures stay below about 7°C, which in Toronto is usually late October to mid-November. Below that, all-season rubber hardens and loses grip well before the first snow. Most drivers wait for the first storm, which is exactly when every shop in the city is booked solid.",
  },
  {
    q: "Do you have my size in stock?",
    a: `Stock changes through the season, so we check instead of guessing. Call ${BUSINESS.phoneDisplay} with your year, make, model and tire size and we'll tell you what we have, new or used.`,
  },
  {
    q: "Are used winter tires safe?",
    a: "A used winter tire that's been properly checked is a reasonable, safe buy. We check tread depth, age and sidewall condition on every tire before it's sold, and anything with sidewall damage doesn't go on the rack. Winter tires lose much of their snow grip as they wear, so tread depth matters more on a used winter than on a used all-season.",
  },
  {
    q: "Should I put my winter tires on their own rims?",
    a: `For most drivers who swap twice a year, yes. The changeover becomes a wheel-off, wheel-on job, and the tires last longer because they aren't dismounted and remounted every season. See our winter rim and tire packages. If your winters are off-rim, the changeover (from ${formatPrice(requirePrice(changeover))}) covers mounting and balancing them.`,
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Winter Tires in Scarborough",
  description:
    "Winter tires for sale at Boss Tire, Danforth Rd, Scarborough: new name brands, budget and checked used sets, mounted and balanced the same day. 50% off alignment with 4. (647) 871-2393.",
  path: "/tires/winter-tires",
  keywords: [
    "winter tires",
    "winter tires scarborough",
    "winter tires for sale",
    "snow tires",
    "cheap winter tires",
    "winter tires toronto",
    "winter tire sale",
  ],
});

export default function WinterTiresPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Tires", path: "/tires" },
          { name: "Winter Tires", path: "/tires/winter-tires" },
        ]}
      />
      <ServiceJsonLd service={winter} />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Winter Tires"
        title="Winter tires in Scarborough, fitted the same day"
        sub="New name brands, budget winters and checked used sets at 375 Danforth Rd. Call with your size, get your price on the call, and drive out on proper winter rubber."
        showCall
        image="/photos/winter-tires.jpg"
        imageAlt="A winter tire on a snow-covered road"
      />
      <TrustStrip />

      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>Why winters</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
                Grip starts going before the snow does
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  An all-season tire is built for a Toronto summer. Once it drops below about 7°C its rubber
                  stiffens, and a stiff tire skates on cold pavement, slush and ice instead of biting into it.
                  A winter tire stays soft in the cold, and its deep, siped tread clears snow and slush out of
                  the way so the tire keeps touching the road.
                </p>
                <p>
                  The difference shows up most when you brake. On the 401 in February, or coming down a
                  Scarborough side street that hasn't been ploughed, that is the difference between stopping
                  and sliding into the intersection.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {winter.included.map((inc) => (
                  <li key={inc} className="flex gap-3 text-[var(--color-body)]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Offer card — the conversion hook. No set price: it's quoted by size. */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-smoke)] p-7">
              <span className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">
                Buy winters, save on alignment
              </span>
              <ul className="mt-5 space-y-3 border-b border-[var(--color-border)] pb-5">
                {ALIGNMENT_OFFERS.map((o) => (
                  <li key={o.buy} className="flex items-baseline justify-between gap-4">
                    <span className="text-[var(--color-body)]">Buy {o.buy}</span>
                    <span className="font-display text-xl font-extrabold text-[var(--color-heading)]">{o.saving}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[var(--color-body)]">
                Your price depends on your tire size and which tires you pick, so we quote it on the call
                instead of putting a number here that doesn't match your car. Call {BUSINESS.phoneDisplay} with
                the size on your sidewall (a code like 225/65R17), {BUSINESS.hours.weekdays}.
              </p>
              <p className="mt-5 text-sm text-[var(--color-muted)]">
                Already own winters?{" "}
                <Link href="/winter-tire-changeover" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  Book the changeover
                </Link>{" "}
                from {formatPrice(requirePrice(changeover))}.
              </p>
            </div>
          </div>

          {/* Three ways to buy */}
          <div className="mt-16">
            <Eyebrow>Your options</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Three ways onto winter tires</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {OPTIONS.map((o) => (
                <div key={o.title}>
                  <span className="block h-[3px] w-8 bg-[var(--color-red)]" aria-hidden />
                  <h3 className="mt-3 text-xl text-[var(--color-heading)]">{o.title}</h3>
                  <p className="mt-2 text-[var(--color-body)]">{o.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mt-14 rounded-lg border border-[var(--color-border)] bg-[var(--color-smoke)] p-6 sm:p-8">
            <Eyebrow>Winter tire brands</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-3">
              {NAME_BRANDS.map((b) => (
                <span
                  key={b}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-2 font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]"
                >
                  {b}
                </span>
              ))}
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
              Budget imports
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {BUDGET_BRANDS.map((b) => (
                <span
                  key={b}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-2 font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]"
                >
                  {b}
                </span>
              ))}
            </div>
            <p className="mt-4 max-w-2xl text-sm text-[var(--color-body)]">
              Stock changes through the season. Call with your size and we'll tell you which brands we have
              in it today.
            </p>
          </div>

          {/* Related */}
          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>Rims and storage</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Make next season's swap easy</h2>
              <p className="mt-4 text-[var(--color-body)]">
                Put your new winters on their own rims and every changeover after this one is a quick wheel
                swap. See our{" "}
                <Link href="/tires/winter-rims-and-packages" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  winter rim and tire packages
                </Link>
                . No room in the garage for the set you're taking off?{" "}
                <Link href="/services/tire-storage" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  Tire storage
                </Link>{" "}
                is {formatPrice(requirePrice(storage))}.
              </p>
            </div>
            <div>
              <Eyebrow>Before you buy</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)]">On a budget? Go used</h2>
              <p className="mt-4 text-[var(--color-body)]">
                A checked used set is often the smartest buy for a second car or a short commute. Here's{" "}
                <Link href="/tires/used-tires" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  how we check every used tire
                </Link>
                , and{" "}
                <Link
                  href="/blog/when-to-put-winter-tires-on-toronto"
                  className="link-grow font-semibold text-[var(--color-red-deep)]"
                >
                  when to put winter tires on in Toronto
                </Link>
                . Or browse{" "}
                <Link href="/tires" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  every tire we sell
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} heading="Winter tire FAQ" />

      <OffersBand />
      <LocalTrust service="winter-tires" />
      <CTABand
        heading="Know your tire size?"
        sub="Call it in and we'll tell you what's in stock and what your set costs, before anything is fitted."
      />
    </>
  );
}
