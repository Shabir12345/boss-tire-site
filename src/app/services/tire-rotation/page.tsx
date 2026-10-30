import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTABand } from "@/components/sections/CTABand";
import { LocalTrust } from "@/components/sections/LocalTrust";
import { FaqSection } from "@/components/sections/FaqSection";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/lib/jsonld";
import { getService, formatPrice, requirePrice } from "@/lib/services";
import { BUSINESS } from "@/lib/business";

const rotation = getService("tire-rotation")!;
const balancing = getService("tire-rebalancing")!;
const alignment = getService("wheel-alignment")!;

const SIGNS = [
  "The front tires look noticeably more worn than the rears (or the other way round on a rear-wheel-drive car)",
  "It's been a season or two since anyone moved the tires around",
  "One edge of a tire is wearing faster than the rest of the tread",
  "The car feels a little noisier or less planted than it did on fresh tires",
];

const FAQS = [
  {
    q: "How much is a tire rotation?",
    a: `Call ${BUSINESS.phoneDisplay} and we'll give you the price on the call, before the car goes up. If you're already coming in for something else, ask for a rotation at the same time.`,
  },
  {
    q: "How often should tires be rotated?",
    a: "Most carmakers suggest somewhere around every 8,000 to 12,000 km, and your owner's manual has the exact number for your car. If you swap between winter and summer tires, a simple way to keep track is to rotate each set when it goes back on.",
  },
  {
    q: "Why do tires need rotating?",
    a: "The tires at each corner don't do the same work. On a front-wheel-drive car the fronts steer, put the power down and take most of the braking, so they wear faster than the rears. Moving the tires around evens that out, so all four wear down together instead of replacing two early.",
  },
  {
    q: "Is a rotation the same as an alignment or balancing?",
    a: `No. A rotation moves the tires to different corners. Balancing (${formatPrice(requirePrice(balancing))} per tire) cancels out heavy spots that cause a shake at speed, and an alignment (${formatPrice(requirePrice(alignment))}) sets the angles of the wheels so the car tracks straight. Uneven wear on one edge of a tire usually points to alignment, and a rotation won't fix that.`,
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Tire Rotation in Scarborough",
  description:
    "Tire rotation at Boss Tire, Danforth Rd, Scarborough: tires moved to even out wear, tread checked on all four, pressures set to spec. Call (647) 871-2393 for a quote.",
  path: "/services/tire-rotation",
  keywords: [
    "tire rotation",
    "tire rotation near me",
    "tire rotation cost",
    "tire rotation scarborough",
    "how often to rotate tires",
  ],
});

export default function TireRotationPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Tire Rotation", path: "/services/tire-rotation" },
        ]}
      />
      <ServiceJsonLd service={rotation} />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Tire Rotation"
        title="Tire rotation: make all four tires last"
        sub="Front and rear tires wear at different rates. Moving them around the car evens that out, so you get the full life out of the set instead of replacing two early."
        showCall
        image="/photos/tires-shop.jpg"
        imageAlt="A stack of tires"
      />
      <TrustStrip />

      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>The service</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">What a rotation does</h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  On most cars the front tires steer, carry the weight of the engine and do most of the braking,
                  so they wear down faster than the rears. Leave them where they are and you end up with two
                  tired fronts and two rears with plenty of tread left.
                </p>
                <p>
                  A rotation moves each tire to a different corner so the wear is shared. While the wheels are
                  off, we look at the tread on all four and set the pressures to the number on your door jamb.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {rotation.included.map((inc) => (
                  <li key={inc} className="flex gap-3 text-[var(--color-body)]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote card: no confirmed price, so no number gets guessed here. */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-smoke)] p-7">
              <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-5">
                <span className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">
                  Tire Rotation
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-wide text-[var(--color-red-deep)]">
                  Call for a quote
                </span>
              </div>
              <p className="mt-4 text-[var(--color-body)]">
                Call {BUSINESS.phoneDisplay} and we'll give you the price on the call, before the car goes up.
              </p>
              <p className="mt-5 text-sm text-[var(--color-muted)]">
                {BUSINESS.hours.weekdays} · {BUSINESS.hours.weekend}
                <br />
                {BUSINESS.address.street}, {BUSINESS.address.locality}
              </p>
              <p className="mt-5 text-sm text-[var(--color-muted)]">
                Swapping to winters?{" "}
                <Link href="/winter-tire-changeover" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  Book the changeover
                </Link>{" "}
                and ask for a rotation at the same time.
              </p>
            </div>
          </div>

          {/* Signs */}
          <div className="mt-16 max-w-2xl">
            <Eyebrow>When to come in</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Signs your tires are due a rotation</h2>
            <ul className="mt-6 space-y-3">
              {SIGNS.map((s) => (
                <li key={s} className="flex gap-3 text-[var(--color-body)]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[var(--color-body)]">
              A shake at highway speed is a balance problem, not a rotation one: see{" "}
              <Link href="/services/wheel-balancing" className="link-grow font-semibold text-[var(--color-red-deep)]">
                wheel balancing
              </Link>
              . A car that pulls to one side, or a tire worn down on one edge, needs a{" "}
              <Link href="/services/wheel-alignment" className="link-grow font-semibold text-[var(--color-red-deep)]">
                wheel alignment
              </Link>
              . Storing your off-season set with us?{" "}
              <Link href="/services/tire-storage" className="link-grow font-semibold text-[var(--color-red-deep)]">
                Tire storage
              </Link>{" "}
              tags every tire by position, so the next rotation is easy.
            </p>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} heading="Tire rotation FAQ" />

      <LocalTrust service="tire-rotation" />
      <CTABand
        heading="Due for a rotation?"
        sub="Call the shop for a price, or ask for one with your next changeover or oil change."
      />
    </>
  );
}
