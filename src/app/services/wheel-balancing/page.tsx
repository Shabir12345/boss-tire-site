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

const balancing = getService("tire-rebalancing")!;
const alignment = getService("wheel-alignment")!;
const changeover = getService("tire-changeover")!;
const rim = getService("rim-repair")!;

const perTire = formatPrice(requirePrice(balancing));
const fullSet = formatPrice(requirePrice(balancing) * 4);

const SIGNS = [
  "The steering wheel shakes at highway speed, usually somewhere between 80 and 110 km/h",
  "The vibration comes in at one speed and fades as you go faster or slower",
  "You feel it through the seat or floor rather than the steering wheel (often a rear tire)",
  "A wheel weight has fallen off, and there's a clean rectangle where it used to be stuck",
  "A tire has just been repaired, remounted or swapped onto a different rim",
  "Tires show patchy, scalloped wear (cupping) around the tread",
];

const FAQS = [
  {
    q: "How much does wheel balancing cost?",
    a: `Wheel balancing at Boss Tire is ${perTire} ${balancing.priceNote}, before tax, so ${fullSet} for all four. Call ${BUSINESS.phoneDisplay} or walk in, ${BUSINESS.hours.weekdays}.`,
  },
  {
    q: "What's the difference between balancing and alignment?",
    a: `Balancing fixes vibration: it evens out the weight around each wheel so it spins smoothly. Alignment fixes pulling and uneven wear: it sets the angles the wheels sit at. A shake at speed is a balancing job (${perTire} ${balancing.priceNote}); a car that drifts to one side needs an alignment (${formatPrice(requirePrice(alignment))}).`,
  },
  {
    q: "How often should tires be balanced?",
    a: "Any time a tire comes off its rim, whether that's a new tire, a puncture repair or a seasonal changeover onto the same rims, it needs balancing again. Between those, balance when a vibration shows up or a weight falls off. There's no need to rebalance on a schedule if the car drives smooth.",
  },
  {
    q: "Does a changeover include balancing?",
    a: `A tire changeover at Boss Tire (from ${formatPrice(requirePrice(changeover))}) includes mount and balance. Balancing on its own is for tires already on the car that have started to shake.`,
  },
  {
    q: "I balanced my tires and it still shakes. Why?",
    a: `Then the weight isn't the problem. The usual causes are a bent rim, a tire with a shifted belt or flat spot, or worn suspension parts. A bent rim can be straightened (rim repair, ${formatPrice(requirePrice(rim))}); a damaged tire needs replacing. We'll tell you which it is when it's on the machine.`,
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Wheel Balancing in Scarborough",
  description:
    "Tire and wheel balancing at Boss Tire, Scarborough: $12 per tire on a balancing machine, not by eye. Fixes steering-wheel shake at highway speed. Walk-ins welcome. (647) 871-2393.",
  path: "/services/wheel-balancing",
  keywords: [
    "wheel balancing near me",
    "tire balancing scarborough",
    "wheel balancing scarborough",
    "tire balancing near me",
    "tire balancing toronto",
    "steering wheel shakes at highway speed",
  ],
});

export default function WheelBalancingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Wheel Balancing", path: "/services/wheel-balancing" },
        ]}
      />
      <ServiceJsonLd service={balancing} />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Wheel Balancing"
        title="Wheel balancing: stop the highway shake"
        sub="If the steering wheel starts shaking once you get up to speed on the 401 or the DVP, an out-of-balance tire is the most common cause, and the cheapest one to fix."
        showCall
        price={{ label: "Wheel balancing", amount: perTire, note: `${balancing.priceNote}, before tax` }}
        image="/photos/suv-wheel.jpg"
        imageAlt="A close-up of a wheel and tire on an SUV"
      />
      <TrustStrip />

      {/* Price + what's included — the conversion hook. */}
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>The service</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
                What balancing actually does
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  No tire and rim is perfectly even. There's always a slightly heavier spot somewhere around the
                  wheel, and at 100 km/h a tire is turning something like 14 times a second. That heavy spot
                  tugs the wheel up and down or side to side on every turn, and you feel it as a shake through the
                  steering wheel or the seat.
                </p>
                <p>
                  Balancing finds the heavy spot and cancels it out. The wheel spins on a balancing machine,
                  which measures exactly where the imbalance is and how much, and small weights go on the
                  opposite side of the rim to even it out. It's measured, not guessed.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {balancing.included.map((inc) => (
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
                  Wheel Balancing
                </span>
                <div className="shrink-0 text-right">
                  <span className="tabular font-display text-4xl font-extrabold text-[var(--color-heading)]">
                    {perTire}
                  </span>
                  <span className="block text-sm text-[var(--color-muted)]">{balancing.priceNote}</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-[var(--color-muted)]">Price before tax. {fullSet} for all four.</p>
              <p className="mt-3 font-semibold text-[var(--color-heading)]">
                One of the cheapest fixes in the shop, for one of the most annoying problems.
              </p>
              <p className="mt-5 text-[var(--color-body)]">
                No appointment needed. Walk in, {BUSINESS.hours.weekdays}, or call {BUSINESS.phoneDisplay} and
                tell us what the car is doing.
              </p>
              <p className="mt-5 text-sm text-[var(--color-muted)]">
                Swapping to winters?{" "}
                <Link href="/winter-tire-changeover" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  The changeover
                </Link>{" "}
                already includes mount and balance.
              </p>
            </div>
          </div>

          {/* Signs */}
          <div className="mt-16 max-w-2xl">
            <Eyebrow>When to come in</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Signs your tires need balancing</h2>
            <ul className="mt-6 space-y-3">
              {SIGNS.map((sign) => (
                <li key={sign} className="flex gap-3 text-[var(--color-body)]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                  {sign}
                </li>
              ))}
            </ul>
          </div>

          {/* Why it matters + when it isn't balancing */}
          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>Why it matters</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)]">It's more than an annoying shake</h2>
              <p className="mt-4 text-[var(--color-body)]">
                A wheel that's out of balance doesn't just make the drive uncomfortable. The same up-and-down
                hammering that you feel in the steering wheel is being fed into the tire, the wheel bearing and the
                suspension on every rotation. Over thousands of kilometres that shows up as cupped, patchy tread
                wear that makes the tire noisy and shortens its life, and extra wear on parts that cost a lot more
                than {fullSet} to replace.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                Balance weights also fall off. Winter is the usual culprit: potholes, curb hits and salt working
                under the adhesive on stick-on weights. A tire that was smooth in October can shake by February
                without anything else changing.
              </p>
            </div>

            <div>
              <Eyebrow>Not balancing?</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)]">When the shake is something else</h2>
              <p className="mt-4 text-[var(--color-body)]">
                A car that pulls to one side, or a steering wheel that sits crooked on a straight road, is an
                alignment problem, not a balance problem.{" "}
                <Link href="/services/wheel-alignment" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  Wheel alignment
                </Link>{" "}
                is {formatPrice(requirePrice(alignment))}. We wrote up{" "}
                <Link
                  href="/blog/wheel-balancing-vs-wheel-alignment"
                  className="link-grow font-semibold text-[var(--color-red-deep)]"
                >
                  how to tell balancing and alignment apart
                </Link>{" "}
                if you're not sure which you need.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                A shake that balancing doesn't cure usually points at the wheel itself. A rim bent by a pothole
                can't be balanced true until it's straightened; see{" "}
                <Link href="/services/rim-repair" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  rim repair
                </Link>
                . Or check the{" "}
                <Link href="/services" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  full service list and prices
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — also feeds FAQ schema + AI answers */}
      <FaqSection faqs={FAQS} heading="Wheel balancing FAQ" />

      <LocalTrust service="tire-rebalancing" />
      <CTABand
        heading="Steering wheel shaking?"
        sub={`Walk in or call the shop. Balancing is ${perTire} ${balancing.priceNote}, done on the machine.`}
      />
    </>
  );
}
