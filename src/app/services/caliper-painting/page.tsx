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

const caliper = getService("caliper-painting")!;
const rimRepair = getService("rim-repair")!;

const COLOURS = [
  { name: "Red", note: "The classic. Reads as performance behind almost any wheel, and it's the one people ask for most." },
  { name: "Yellow", note: "Loud on purpose. Best behind black or gunmetal wheels where it has something to stand out against." },
  { name: "Black", note: "The stealth option. Tidies up rusty, tired-looking calipers without drawing attention to them." },
  { name: "Silver", note: "Close to factory, just cleaner. Good if you want the brakes to look looked-after rather than loud." },
];

const FAQS = [
  {
    q: "How much does caliper painting cost in Toronto?",
    a: `Caliper painting at Boss Tire is ${formatPrice(requirePrice(caliper))} for all four calipers in a common colour (red, yellow, black or silver), before tax. Custom colours are available on request. Call ${BUSINESS.phoneDisplay} with your car and the colour you want and we'll confirm the price.`,
  },
  {
    q: "Is painting calipers better than caliper covers?",
    a: "Covers are a plastic or aluminium shell clipped over the caliper, and they can trap heat, rattle, or come loose, and on a lot of cars they don't fit behind the wheel at all. Paint is on the caliper itself, so there's nothing to clip on and nothing to come off at speed. It's the cleaner, simpler way to get the same look.",
  },
  {
    q: "What colours can you do?",
    a: "Red, yellow, black and silver are the common colours and what the listed price covers. If you want something else, a colour to match your car's trim or badge, ask when you call. Custom colours are done on request.",
  },
  {
    q: "Do you paint all four or just the front?",
    a: `The ${formatPrice(requirePrice(caliper))} price is for all four. Painting just the front two is possible on some cars, but it usually looks unfinished from the side, so most people do the set.`,
  },
  {
    q: "Can you fix curb rash on my rims at the same time?",
    a: `Yes, and it's worth doing together, since the wheels are the frame around the calipers. Rim repair is ${formatPrice(requirePrice(rimRepair))}, and covers curb rash, cracks and bends. Mention both when you call so we can plan the visit.`,
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Caliper Painting in Toronto & Scarborough",
  description:
    "Brake caliper painting at Boss Tire, Scarborough: all four calipers for $240 in red, yellow, black or silver, custom colours on request. Call (647) 871-2393.",
  path: "/services/caliper-painting",
  keywords: [
    "caliper painting",
    "caliper painting toronto",
    "brake caliper painting",
    "caliper painting near me",
    "caliper painting scarborough",
    "painted brake calipers",
  ],
});

export default function CaliperPaintingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Caliper Painting", path: "/services/caliper-painting" },
        ]}
      />
      <ServiceJsonLd service={caliper} />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Caliper Painting"
        title="Brake caliper painting, all four calipers"
        sub="Red, yellow, black or silver behind the spokes. It's the detail people notice first on a clean set of wheels, and the fastest way to make a car look finished."
        showCall
        price={{ label: "All four calipers", amount: formatPrice(requirePrice(caliper)), note: caliper.priceNote }}
        image="/photos/caliper.jpg"
        imageAlt="A red painted brake caliper behind a black alloy wheel"
      />
      <TrustStrip />

      {/* Price + what's included — the conversion hook. */}
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>The service</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
                Why people paint their calipers
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  Open-spoke alloy wheels put the brakes on display. On most cars that means a grey, dusty,
                  often rust-flecked lump of cast iron sitting right in the middle of the wheel you paid good
                  money for. Painting the calipers turns that eyesore into a deliberate detail, and it's one of
                  the few changes that makes a car look properly finished for the money.
                </p>
                <p>
                  It's also a winter thing. Toronto road salt is hard on anything bare metal under the car, and
                  calipers are no exception. Cleaned up and painted, they look looked-after instead of left
                  alone, and a car that looks looked-after is worth more when it comes time to sell it.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {caliper.included.map((inc) => (
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
                  Caliper Painting
                </span>
                <span className="tabular font-display text-4xl font-extrabold text-[var(--color-heading)]">
                  {formatPrice(requirePrice(caliper))}
                </span>
              </div>
              <p className="mt-4 text-sm text-[var(--color-muted)]">
                Price before tax. All four calipers, {caliper.priceNote?.replace(/^all four, /, "")}.
              </p>
              <p className="mt-3 font-semibold text-[var(--color-heading)]">
                Custom colours on request. Ask when you call.
              </p>
              <p className="mt-5 text-[var(--color-body)]">
                Most shops that paint calipers make you call for a quote. We publish the price, so you know what
                the job costs before you pick up the phone. Call {BUSINESS.phoneDisplay} with your year, make and
                model and the colour you want, and we'll book you in.
              </p>
            </div>
          </div>

          {/* Colours */}
          <div className="mt-16">
            <Eyebrow>Colours</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Picking a colour</h2>
            <p className="mt-4 max-w-3xl text-[var(--color-body)]">
              The right colour depends on the wheel in front of it more than the paint on the car. A bright
              caliper needs a darker wheel to pop against; a silver or black one suits a busy, many-spoke design
              where a loud colour would fight the wheel for attention.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {COLOURS.map((c) => (
                <div key={c.name} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-5">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-body)]">{c.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Paint vs covers + pairing with wheels */}
          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>Paint vs covers</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Why paint beats clip-on covers</h2>
              <p className="mt-4 text-[var(--color-body)]">
                Caliper covers are sold online as the cheap route to the same look: a moulded shell that clips or
                bolts over the real caliper. The trouble is that the space between a caliper and the inside of a
                wheel is tight, often only a few millimetres, and a cover eats into it. On plenty of cars the cover
                simply won't clear the wheel. On others it fits but rattles, traps brake heat against the caliper,
                or works loose, which is the last thing you want spinning around next to your brakes.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                Paint doesn't add anything. The caliper stays the same size and shape it was engineered to be, and
                there's no clip to fail. That's why it's the way the job gets done properly.
              </p>
            </div>

            <div>
              <Eyebrow>Do it with the wheels</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Fresh calipers, scuffed rims?</h2>
              <p className="mt-4 text-[var(--color-body)]">
                Bright calipers draw the eye straight to the wheel, and that includes any curb rash on the lip.
                If your rims are scraped, it's worth sorting them in the same visit.{" "}
                <Link href="/services/rim-repair" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  Rim repair
                </Link>{" "}
                covers curb rash, cracks and bends at {formatPrice(requirePrice(rimRepair))}.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                Shopping for new wheels altogether? Painted calipers are at their best behind an open-spoke alloy,
                and we fit aftermarket rims too. See{" "}
                <Link
                  href="/tires/winter-rims-and-packages"
                  className="link-grow font-semibold text-[var(--color-red-deep)]"
                >
                  rims and tire packages
                </Link>
                , or the{" "}
                <Link href="/services" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  full service list with prices
                </Link>{" "}
                if you're lining up a few jobs at once.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — also feeds FAQ schema + AI answers */}
      <FaqSection faqs={FAQS} heading="Caliper painting FAQ" />

      <LocalTrust service="caliper-painting" />
      <CTABand
        heading="Pick your colour"
        sub="Call the shop with your car and the colour you want. All four calipers, one published price."
      />
    </>
  );
}
