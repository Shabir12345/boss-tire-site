import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/lib/jsonld";
import { getService, formatPrice, ALIGNMENT_OFFERS } from "@/lib/services";

const alignment = getService("wheel-alignment")!;

const SIGNS = [
  "The steering wheel sits off-centre when you're driving straight",
  "The car pulls to one side on a flat, level road",
  "Tires wear unevenly — faster on the inside or outside edge",
  "The steering feels loose, or the car wanders and needs constant correction",
  "You just hit a bad pothole, curb or bump",
  "You just put on new tires and want them to last",
];

const FAQS = [
  {
    q: "How much is a wheel alignment in Scarborough?",
    a: `A wheel alignment at Boss Tire is ${formatPrice(alignment.price)}, before tax. It's also 50% off when you buy 4 tires with us, or 25% off with 2 tires — so on a tire purchase the alignment is close to free. Call (647) 871-2393 with your vehicle and we'll confirm the exact number.`,
  },
  {
    q: "How do I know if I need an alignment?",
    a: "The clearest signs are the steering wheel sitting off-centre, the car pulling to one side, or tires wearing faster on one edge. It's also worth checking after a hard pothole or curb hit, and right after new tires go on. If you're not sure, we'll check it and tell you honestly whether it needs doing.",
  },
  {
    q: "How long does a wheel alignment take?",
    a: "Most alignments are a same-day job, done while you wait. Call ahead with your year, make and model and we'll have you in and out.",
  },
  {
    q: "Do you do four-wheel alignments?",
    a: "Yes — four-wheel, front-end and computerized alignments. We set camber, caster and toe to your vehicle's spec so the car tracks straight and the tires wear evenly.",
  },
  {
    q: "Does an alignment make tires last longer?",
    a: "Yes. When the wheels are out of alignment the tires scrub as they roll, wearing the edges quickly. Setting them back to spec stops that uneven wear, so a good set of tires lasts much closer to its rated mileage.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Wheel Alignment in Scarborough",
  description:
    "Wheel alignment at Boss Tire, Scarborough — $80, same day while you wait. Four-wheel, front-end and computerized alignments, camber/caster/toe set to spec. 50% off with 4 tires. Call (647) 871-2393.",
  path: "/services/wheel-alignment",
  keywords: [
    "wheel alignment scarborough",
    "car alignment scarborough",
    "alignment near me",
    "4 wheel alignment scarborough",
    "wheel alignment danforth",
  ],
});

export default function WheelAlignmentPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Wheel Alignment", path: "/services/wheel-alignment" },
        ]}
      />
      <ServiceJsonLd service={alignment} />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Wheel Alignment"
        title="Set straight, same day"
        sub="Four-wheel alignment on Danforth Rd while you wait — camber, caster and toe set to your vehicle's spec so it tracks true and your tires last."
        showCall
        image="/photos/alignment.jpg"
        imageAlt="A four-wheel alignment being performed on a car at Boss Tire"
      />
      <TrustStrip />

      {/* Price + what's included + the live offers — the conversion hook. */}
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>The service</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
                What a Boss Tire alignment covers
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  When your wheels drift out of alignment, the tires scrub sideways as they roll — the car pulls,
                  the steering wheel sits crooked, and the tire edges wear out fast. An alignment sets all four
                  wheels back to your manufacturer's spec so the car drives straight and the tires wear evenly.
                </p>
                <p>
                  We do it the same day, while you wait, and we show you the before-and-after numbers so you can
                  see exactly what changed.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {alignment.included.map((inc) => (
                  <li key={inc} className="flex gap-3 text-[var(--color-body)]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price card + offers */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-smoke)] p-7">
              <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-5">
                <span className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">
                  Wheel Alignment
                </span>
                <span className="tabular font-display text-4xl font-extrabold text-[var(--color-heading)]">
                  {formatPrice(alignment.price)}
                </span>
              </div>
              <p className="mt-4 text-sm text-[var(--color-muted)]">Price before tax. Same-day, while you wait.</p>

              <div className="mt-6">
                <span className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-red-deep)]">
                  Buy tires, save on the alignment
                </span>
                <ul className="mt-3 space-y-2.5">
                  {ALIGNMENT_OFFERS.map((offer) => (
                    <li
                      key={offer.buy}
                      className="flex items-center gap-3 rounded-lg bg-[var(--color-paper)] px-4 py-3 text-[var(--color-heading)] ring-1 ring-[var(--color-border)]"
                    >
                      <span className="font-display text-xl font-extrabold text-[var(--color-red)]">
                        {offer.saving.split(" ")[0]}
                      </span>
                      <span className="text-sm">
                        {offer.saving.replace(/^\S+\s/, "")} when you buy {offer.buy}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-[var(--color-muted)]">
                  Ask about the current tire &amp; alignment offer when you call.
                </p>
              </div>
            </div>
          </div>

          {/* Signs */}
          <div className="mt-16 max-w-2xl">
            <Eyebrow>When to come in</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Signs your car needs an alignment</h2>
            <ul className="mt-6 space-y-3">
              {SIGNS.map((sign) => (
                <li key={sign} className="flex gap-3 text-[var(--color-body)]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                  {sign}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[var(--color-body)]">
              Not sure?{" "}
              <Link href="/services" className="link-grow font-semibold text-[var(--color-red-deep)]">
                See all services &amp; prices
              </Link>{" "}
              or just call and describe it — we'll tell you if it needs doing.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ — also feeds FAQ schema + AI answers */}
      <section className="bg-[var(--color-smoke)]">
        <div className="gutter-safe mx-auto max-w-3xl py-16 sm:py-20">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Wheel alignment FAQ</h2>
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
        heading="Pulling to one side?"
        sub="Call the shop, tell us what the car's doing, and we'll set it straight the same day — often free with a set of tires."
      />
    </>
  );
}
