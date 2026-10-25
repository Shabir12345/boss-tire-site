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

const tpms = getService("tpms")!;
const changeover = getService("tire-changeover")!;
const price = formatPrice(requirePrice(tpms));

const CAUSES = [
  {
    title: "A tire that's actually low",
    body: "A slow puncture, a tired valve stem, or months of normal air loss. We check the pressure at all four corners first, because this is the one case that's a tire problem and not a sensor problem.",
  },
  {
    title: "A sensor battery that's done",
    body: "Each sensor is a small transmitter inside the wheel with a sealed battery, usually good for somewhere around five to ten years. When the battery goes, the sensor is replaced as a unit.",
  },
  {
    title: "A relearn that never ran",
    body: "After a tire change, a seasonal wheel swap or a rotation, the car can lose track of which sensor sits at which corner. That's a programming step, not a broken part.",
  },
];

const FAQS = [
  {
    q: "How much does TPMS sensor service cost?",
    a: `TPMS service at Boss Tire is ${price} before tax. It covers ${tpms.included
      .map((i) => i.toLowerCase())
      .join(", ")}. The diagnosis comes first, so you know whether it's a dead sensor or a relearn before anything is replaced. Call ${BUSINESS.phoneDisplay}.`,
  },
  {
    q: "Why does my tire pressure light come on when it gets cold?",
    a: "Air contracts as it cools, so tire pressure drops on a cold morning even though nothing has leaked. The first properly cold week of the year sets off TPMS lights all over the city. If the light comes on cold and goes off once you've driven a while, set your pressures to the number on the driver's door jamb. If it stays on warm or cold, have it checked.",
  },
  {
    q: "Can I drive with the TPMS light on?",
    a: "If the light came on after a cold snap or a tire change and the car drives normally, it's fine to drive in to get it checked within a day or two. If a tire looks low, thumps, or the car pulls to one side, pull over and check it first. A flashing light that then stays solid usually means a sensor or system fault rather than low pressure.",
  },
  {
    q: "Do my winter rims need TPMS sensors?",
    a: "If you want the light off all winter, yes. Sensors live inside the wheel, so a winter set on its own rims without sensors leaves the light on until you go back to your summer wheels. If your winter rims have sensors, they usually need a relearn when they go on so the car knows where each one is.",
  },
  {
    q: "Why is my TPMS light on after a tire change?",
    a: `Usually because the system needs a relearn so it knows which sensor is at which corner, or a sensor was disturbed when the tire came off the rim. It's quick to sort. Our changeover (from ${formatPrice(requirePrice(changeover))}) sets pressures to spec, and if the light is still on afterwards, bring it back and we'll look at it.`,
  },
];

export const metadata: Metadata = buildMetadata({
  title: "TPMS Sensor Replacement in Scarborough",
  description:
    "Tire pressure light on? TPMS sensor diagnosis, replacement and reset at Boss Tire, Danforth Rd, Scarborough: $69.99 before tax. Walk in or call (647) 871-2393.",
  path: "/services/tpms",
  keywords: [
    "tpms sensor replacement",
    "tpms sensor",
    "tire pressure sensor replacement",
    "tpms sensor replacement cost",
    "tire pressure light scarborough",
    "tpms scarborough",
  ],
});

export default function TpmsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "TPMS Sensors", path: "/services/tpms" },
        ]}
      />
      <ServiceJsonLd service={tpms} />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="TPMS Sensors"
        title="TPMS sensor replacement and reset"
        sub="That tire pressure light on the dash is a dying sensor, a relearn that never ran, or a tire that's really low. We find out which, fix it, and turn the light off."
        showCall
        price={{ label: "TPMS service", amount: price, note: "before tax" }}
        image="/photos/suv-wheel.jpg"
        imageAlt="A close-up of a wheel and tire on an SUV"
      />
      <TrustStrip />

      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>The service</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
                Diagnosis first, then the fix
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  The light on its own doesn't say what's wrong. So we read the system before we touch
                  anything: which sensor isn't reporting, whether it's a battery that's finished or a sensor
                  the car simply hasn't learned, and whether any tire is actually losing air.
                </p>
                <p>
                  Then we fix what we found, reset the system and check that the car reads all four sensors
                  before you leave. You don't pay for a sensor you didn't need.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {tpms.included.map((inc) => (
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
                  TPMS Service
                </span>
                <span className="tabular font-display text-4xl font-extrabold text-[var(--color-heading)]">
                  {price}
                </span>
              </div>
              <p className="mt-4 text-sm text-[var(--color-muted)]">Price before tax.</p>
              <p className="mt-3 font-semibold text-[var(--color-heading)]">
                The diagnosis is part of the job, not an extra.
              </p>
              <p className="mt-5 text-[var(--color-body)]">
                No appointment needed. Walk in, {BUSINESS.hours.weekdays}, or call {BUSINESS.phoneDisplay} and
                tell us what the light is doing: solid, flashing, or only on cold mornings.
              </p>
              <p className="mt-5 text-sm text-[var(--color-muted)]">
                Light came on with a flat?{" "}
                <Link href="/services/flat-tire-repair" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  Flat tire repair
                </Link>{" "}
                comes first.
              </p>
            </div>
          </div>

          {/* Causes */}
          <div className="mt-16">
            <Eyebrow>Why it's on</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">The three usual causes</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {CAUSES.map((c) => (
                <div key={c.title}>
                  <span className="block h-[3px] w-8 bg-[var(--color-red)]" aria-hidden />
                  <h3 className="mt-3 text-xl text-[var(--color-heading)]">{c.title}</h3>
                  <p className="mt-2 text-[var(--color-body)]">{c.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-2xl text-[var(--color-body)]">
              We wrote up{" "}
              <Link href="/blog/tpms-light-on-what-it-costs" className="link-grow font-semibold text-[var(--color-red-deep)]">
                how to tell a solid light from a flashing one
              </Link>{" "}
              if you want to check before you come in. Swapping to winters this month? Ask about sensors for your{" "}
              <Link href="/tires/winter-rims-and-packages" className="link-grow font-semibold text-[var(--color-red-deep)]">
                winter rims
              </Link>
              , or see the{" "}
              <Link href="/services" className="link-grow font-semibold text-[var(--color-red-deep)]">
                full service list and prices
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} heading="TPMS FAQ" />

      <LocalTrust service="tpms" />
      <CTABand
        heading="Tire pressure light on?"
        sub={`Walk in or call the shop. TPMS service is ${price} before tax, diagnosis first.`}
      />
    </>
  );
}
