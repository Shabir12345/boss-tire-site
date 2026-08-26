import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/lib/jsonld";
import { getService, formatPrice } from "@/lib/services";

const oil = getService("oil-change")!;

const WHY = [
  "Fresh oil keeps the engine's moving parts lubricated so they don't grind and wear",
  "Old oil turns to sludge, runs hotter and makes the engine work harder",
  "A clean filter stops grit from circulating through the engine",
  "Regular changes are the cheapest way to avoid a far bigger engine bill later",
];

const FAQS = [
  {
    q: "How much is an oil change in Scarborough?",
    a: `An oil change at Boss Tire is ${formatPrice(oil.price)}, before tax — oil and a new filter, done the same day while you wait. Call (647) 871-2393 with your year, make and model and we'll confirm the exact number for your vehicle.`,
  },
  {
    q: "How often should I change my oil?",
    a: "Most vehicles are due every 5,000 to 8,000 km, but the honest answer is whatever your owner's manual says for your engine and how you drive. Short city trips and stop-and-go traffic use oil up faster than highway driving. If you're not sure when yours was last done, we'll check it and tell you.",
  },
  {
    q: "Do I need an appointment for an oil change?",
    a: "No — walk in. An oil change is a quick, same-day job at Boss Tire, six days a week. Calling ahead at (647) 871-2393 just means we'll have a bay ready when you arrive.",
  },
  {
    q: "What's included in a Boss Tire oil change?",
    a: "We drain the old oil, fit a new filter, refill with the correct oil for your engine, check your fluid levels and give the engine bay a quick look while it's open. If we spot something that needs attention, we tell you — we don't upsell work you don't need.",
  },
  {
    q: "What kind of oil do you use?",
    a: "We use the oil grade your manufacturer specifies for your engine, with a quality filter to match. Tell us your vehicle when you call and we'll make sure the right oil goes in.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Oil Change in Scarborough",
  description:
    "Oil change at Boss Tire, Scarborough — $60.99, same day while you wait. Oil and filter change, fluid check and under-hood look, no upsell. Walk-ins welcome. Call (647) 871-2393.",
  path: "/services/oil-change",
  keywords: [
    "oil change scarborough",
    "oil change near me",
    "oil and filter change scarborough",
    "cheap oil change scarborough",
    "oil change danforth",
  ],
});

export default function OilChangePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Oil Change", path: "/services/oil-change" },
        ]}
      />
      <ServiceJsonLd service={oil} />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Oil Change"
        title="Oil and filter, done while you wait"
        sub="A quick, honest oil change on Danforth Rd — the right oil for your engine, a fresh filter, and a look under the hood before you go. No appointment needed."
        showCall
        image="/photos/oil-change.jpg"
        imageAlt="A mechanic pouring fresh engine oil into a car engine"
      />
      <TrustStrip />

      {/* Price + what's included — the conversion hook. */}
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>The service</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
                What a Boss Tire oil change covers
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  Oil is what keeps your engine's moving parts from grinding against each other. Over time it
                  breaks down, picks up grit and stops doing its job — so the engine runs hotter, works harder
                  and wears faster. A regular change is the single cheapest thing you can do to keep it healthy.
                </p>
                <p>
                  We drain the old oil, fit a fresh filter and refill with the correct grade for your engine —
                  the same day, while you wait — and tell you honestly if anything else needs looking at.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {oil.included.map((inc) => (
                  <li key={inc} className="flex gap-3 text-[var(--color-body)]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price card */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-smoke)] p-7">
              <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-5">
                <span className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">
                  Oil Change
                </span>
                <span className="tabular font-display text-4xl font-extrabold text-[var(--color-heading)]">
                  {formatPrice(oil.price)}
                </span>
              </div>
              <p className="mt-4 text-sm text-[var(--color-muted)]">Price before tax. Same-day, while you wait.</p>
              <p className="mt-5 text-[var(--color-body)]">
                No appointment, no upsell. Bring your year, make and model and we'll put the right oil in and
                have you back on the road.
              </p>
              <p className="mt-5 text-sm text-[var(--color-muted)]">
                In for an oil change anyway?{" "}
                <Link href="/services" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  See everything else we do &amp; what it costs
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Why it matters */}
          <div className="mt-16 max-w-2xl">
            <Eyebrow>Why it matters</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Why regular oil changes are worth it</h2>
            <ul className="mt-6 space-y-3">
              {WHY.map((w) => (
                <li key={w} className="flex gap-3 text-[var(--color-body)]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[var(--color-body)]">
              Not sure when yours was last done? Call and describe it, or just come by — we'll check it and tell
              you straight.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ — also feeds FAQ schema + AI answers */}
      <section className="bg-[var(--color-smoke)]">
        <div className="gutter-safe mx-auto max-w-3xl py-16 sm:py-20">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Oil change FAQ</h2>
          <dl className="mt-8 space-y-6">
            {FAQS.map((f) => (
              <div key={f.q} className="border-b border-[var(--color-border)] pb-6 last:border-0">
                <dt className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">
                  {f.q}
                </dt>
                <dd className="mt-2 text-[var(--color-body)]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTABand
        heading="Due for an oil change?"
        sub="Call the shop or just drive in — the right oil, a fresh filter, and you're out the same day."
      />
    </>
  );
}
