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

const WHY = [
  "A puncture in the tread — the flat part that touches the road — is usually repairable",
  "A puncture in the sidewall or the shoulder, where the tire flexes as you drive, is not; that tire needs replacing",
  "A patch glued in from the inside is a permanent repair; a plug pushed in from the outside is a temporary one",
  "Driving on a flat, even a short distance, can wreck the sidewall and turn a repairable tire into one that isn't",
];

const FAQS = [
  {
    q: "Can a flat tire be repaired, or do I need a new one?",
    a: "It depends on where the puncture is. A hole in the tread — the flat part that touches the road — is usually repairable. A puncture in the sidewall or the shoulder, where the tire flexes as you drive, is not; that tire needs replacing regardless of how small the hole looks. Bring it in and we'll tell you straight which one you've got.",
  },
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
  {
    q: "Why patch a tire from the inside instead of plugging it?",
    a: "A plug pushed in from outside the tire is a temporary fix — it seals the hole from one side and doesn't let anyone check what's happening on the inside of the tire. A patch is applied from the inside, after the tire's been taken off the rim and inspected properly. It seals against the inner liner where the air pressure holds it in place, and it's a permanent repair rather than a stopgap. We patch. We don't just plug.",
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

          {/* Why it matters */}
          <div className="mt-16 max-w-2xl">
            <Eyebrow>Why it matters</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">What decides if a tire can be patched</h2>
            <ul className="mt-6 space-y-3">
              {WHY.map((w) => (
                <li key={w} className="flex gap-3 text-[var(--color-body)]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[var(--color-body)]">
              If you're not sure which kind of damage you've got, don't guess and don't keep driving on it. Pull
              over when it's safe, call, or bring it straight in and we'll look at it before you drive any
              further.
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
