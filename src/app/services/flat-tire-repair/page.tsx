import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/lib/jsonld";
import { getService } from "@/lib/services";
import { BUSINESS } from "@/lib/business";

const flat = getService("flat-tire-repair")!;

// What actually happens in the bay. The question of whether a given tire is
// repairable at all belongs to /blog/can-a-flat-tire-be-repaired — this page
// answers "fix mine today", not "is mine even fixable".
const STEPS = [
  "Walk in or drive in during opening hours — a flat doesn't need an appointment",
  "The wheel comes off the car and the tire comes off the rim, so both sides can be looked at",
  "We find where the air is actually escaping rather than working from where the nail is sticking out",
  "You're told what we've found, and what it costs, before anything is done to the tire",
  "If it can be repaired: patched from the inside, rebalanced, and back on the car the same day",
];

const FAQS = [
  {
    q: "How much does a flat tire repair cost in Scarborough?",
    a: `It depends on the tire and how bad the damage is, so we're not going to guess a number here. Call ${BUSINESS.phoneDisplay} and tell us what happened — where the puncture is, what caused it — and we'll give you a straight answer before you come in.`,
  },
  {
    q: "How long does a puncture repair take?",
    a: "Repairs are done the same day — we don't leave a flat overnight. Walk in and we'll take the tire off, inspect it, and give you an honest answer on the spot. Exactly how long it takes depends on how busy the shop is and what we find once it's off the rim, so we won't put a number of minutes on it. Just come in and we'll get you moving again the same day.",
  },
  {
    q: "Do I need an appointment to get a flat fixed?",
    a: `No — walk in. Boss Tire takes flat tire repairs on a walk-in basis, ${BUSINESS.hours.weekdays}, ${BUSINESS.hours.weekend}. Call ${BUSINESS.phoneDisplay} ahead if you want, but you don't need to book.`,
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Flat Tire Repair in Scarborough",
  description:
    "Flat or slow puncture? Boss Tire on Danforth Rd repairs punctures the same day — tire off the rim, patched from the inside, rebalanced. Walk in or call (647) 871-2393.",
  path: "/services/flat-tire-repair",
  keywords: [
    "tire repair near me",
    "flat tire repair near me",
    "tire patch near me",
    "tire puncture repair",
    "flat tire repair scarborough",
  ],
});

export default function FlatTireRepairPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Flat Tire Repair", path: "/services/flat-tire-repair" },
        ]}
      />
      <ServiceJsonLd service={flat} />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Flat Tire Repair"
        title="Punctures fixed properly, same day"
        sub="A nail in the tread does not have to mean a new tire. We take the tire off the rim, find the leak, patch it from the inside and rebalance it before it goes back on."
        showCall
      />
      <TrustStrip />

      {/* What we do + how to get a quote — the conversion hook. */}
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>The service</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
                What a Boss Tire puncture repair covers
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  A flat doesn't automatically mean a new tire. Most punctures happen in the tread — the wide,
                  flat part of the tire that actually touches the road — and a tread puncture is usually a
                  straightforward repair. Sidewall damage and shoulder punctures are a different problem. That
                  part of the tire flexes constantly as you drive, and a patch won't hold there. If the damage
                  is in the sidewall or shoulder, the tire needs replacing, not fixing.
                </p>
                <p>
                  We don't patch from where we can see it and call it done. The tire comes off the rim so we
                  can look at both sides — check the inside for hidden damage and find exactly where the air
                  is getting out. If it's repairable, we patch it from the inside and rebalance the wheel
                  before it goes back on the car. If it isn't, we tell you why instead of gluing a plug into a
                  tire that won't hold air for long.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {flat.included.map((inc) => (
                  <li key={inc} className="flex gap-3 text-[var(--color-body)]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote card — no confirmed price, so no number gets guessed here. */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-smoke)] p-7">
              <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-5">
                <span className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">
                  Flat Tire &amp; Puncture Repair
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-wide text-[var(--color-red-deep)]">
                  Call for a quote
                </span>
              </div>
              <p className="mt-4 text-[var(--color-body)]">
                Every tire and every puncture is different, so we're not going to put a number on it here. Call
                and tell us what's going on and we'll give you a straight price before we touch it.
              </p>
              <p className="mt-5 text-sm text-[var(--color-muted)]">
                {BUSINESS.hours.weekdays} · {BUSINESS.hours.weekend}
                <br />
                {BUSINESS.address.street}, {BUSINESS.address.locality}
              </p>
              <p className="mt-5 text-[var(--color-body)]">
                Walk in any time we're open — no appointment needed. Repairs are done the same day.
              </p>
              <p className="mt-5 text-sm text-[var(--color-muted)]">
                Need something else while you're in?{" "}
                <Link href="/services" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  See everything else we do &amp; what it costs
                </Link>
                .
              </p>
            </div>
          </div>

          {/* What the visit actually looks like */}
          <div className="mt-16 max-w-2xl">
            <Eyebrow>What to expect</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">What happens when you bring a flat in</h2>
            <ul className="mt-6 space-y-3">
              {STEPS.map((step) => (
                <li key={step} className="flex gap-3 text-[var(--color-body)]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                  {step}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[var(--color-body)]">
              Nothing gets decided before the tire is off the rim, because a puncture that looks obvious from
              outside often isn't where the air is going. Wondering whether yours is even fixable before you
              drive over?{" "}
              <Link
                href="/blog/can-a-flat-tire-be-repaired"
                className="link-grow font-semibold text-[var(--color-red-deep)]"
              >
                We set out where the line sits between a repairable puncture and a write-off
              </Link>
              .
            </p>
            <p className="mt-4 text-[var(--color-body)]">
              If the tire turns out to be past saving, you're not automatically buying four. We can look at a{" "}
              <Link href="/tires/used-tires" className="link-grow font-semibold text-[var(--color-red-deep)]">
                used or budget tire
              </Link>{" "}
              close in tread depth to what's already on that axle instead. And don't keep driving on a flat to
              get here — pull over somewhere safe and call.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ — also feeds FAQ schema + AI answers */}
      <section className="bg-[var(--color-smoke)]">
        <div className="gutter-safe mx-auto max-w-3xl py-16 sm:py-20">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Flat tire repair FAQ</h2>
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
        heading="Got a flat right now?"
        sub="Walk in or call the shop — we'll take the tire off, find the leak, and give you a straight answer the same day."
      />
    </>
  );
}
