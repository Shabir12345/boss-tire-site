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
import { getService } from "@/lib/services";
import { BUSINESS } from "@/lib/business";

const brakes = getService("brakes")!;

const SIGNS = [
  {
    title: "Squealing",
    body: "A high-pitched squeal when you brake is often the wear indicator on the pads: a small metal tab built in to make noise when the pad is getting thin. It's the brakes asking to be looked at soon.",
  },
  {
    title: "Grinding",
    body: "A harsh grinding or scraping usually means the pad material is gone and metal is meeting the rotor. Stop putting it off: every drive like that does more damage, and turns a pad job into a pad-and-rotor job.",
  },
  {
    title: "A soft or low pedal",
    body: "If the pedal sinks further than it used to, feels spongy, or the car takes longer to stop, get it checked before you drive much further. That can be fluid, not just pads.",
  },
  {
    title: "Shaking when you stop",
    body: "A vibration through the pedal or steering wheel under braking often points to rotors that have worn unevenly. If the shake is there at highway speed whether you brake or not, it's more likely a wheel balance problem.",
  },
];

const FAQS = [
  {
    q: "How much does a brake job cost?",
    a: `It depends on your car and on what it needs: pads on one axle, pads and rotors, or more. So we look first and tell you the price before any work starts. Call ${BUSINESS.phoneDisplay} and tell us what the brakes are doing.`,
  },
  {
    q: "How often do brake pads need replacing?",
    a: "There's no single number. It depends on the car, the pads and how you drive. Stop-and-go city driving wears pads much faster than highway kilometres. The reliable answer is to have them looked at when the tires are off, at a changeover or rotation, and to listen for the squeal of the wear indicator.",
  },
  {
    q: "Why are my brakes squealing?",
    a: "The most common reason is the pad wear indicator telling you the pads are getting low. Squealing can also come from glazed pads, a bit of surface rust on the rotors after rain or a car wash (which usually clears after a few stops), or worn hardware. If it doesn't go away, have it checked.",
  },
  {
    q: "Is it safe to drive with grinding brakes?",
    a: "Get it seen as soon as you can. Grinding usually means metal-on-metal: the pad is worn through and is cutting into the rotor. The car will still stop, but less well, and the repair gets more expensive with every drive.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Brake Repair in Scarborough",
  description:
    "Squealing, grinding or a soft pedal? Brake inspection and brake pad and rotor replacement at Boss Tire, Danforth Rd, Scarborough. Price before any work. (647) 871-2393.",
  path: "/services/brakes",
  keywords: [
    "brake repair",
    "brake repair scarborough",
    "brake pad replacement",
    "brake pads replacement",
    "brake pad replacement cost",
    "brake service near me",
  ],
});

export default function BrakesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Brake Repair", path: "/services/brakes" },
        ]}
      />
      <ServiceJsonLd service={brakes} />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Brake Repair"
        title="Brake repair and brake pad replacement"
        sub="Squealing, grinding, or a pedal that doesn't feel right. We inspect the brakes, tell you what they need and what it costs, and only then get to work."
        showCall
        image="/photos/caliper.jpg"
        imageAlt="A red painted brake caliper behind a black alloy wheel"
      />
      <TrustStrip />

      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>The service</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">Look first, then the fix</h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  A noise on its own doesn't tell you what a brake job costs. So the wheels come off and we look
                  at the pads, the rotors and how they're wearing before anyone quotes you a number.
                </p>
                <p>
                  Then you hear what needs doing now, what can wait, and what it costs. Nothing gets replaced
                  that you haven't agreed to.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {brakes.included.map((inc) => (
                  <li key={inc} className="flex gap-3 text-[var(--color-body)]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote card: brake jobs vary by car and there's no confirmed price. */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-smoke)] p-7">
              <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-5">
                <span className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">
                  Brake Repair
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-wide text-[var(--color-red-deep)]">
                  Call for a quote
                </span>
              </div>
              <p className="mt-4 text-[var(--color-body)]">
                Every car's brakes are different, so we're not going to put a number on it here. Call{" "}
                {BUSINESS.phoneDisplay}, tell us the car and what the brakes are doing, and we'll tell you what
                to expect.
              </p>
              <p className="mt-5 text-sm text-[var(--color-muted)]">
                {BUSINESS.hours.weekdays} · {BUSINESS.hours.weekend}
                <br />
                {BUSINESS.address.street}, {BUSINESS.address.locality}
              </p>
              <p className="mt-5 text-sm text-[var(--color-muted)]">
                Coming in for a{" "}
                <Link href="/winter-tire-changeover" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  winter tire changeover
                </Link>
                ? The wheels are already off, so it's a good time to ask us to look at the brakes.
              </p>
            </div>
          </div>

          {/* Signs */}
          <div className="mt-16">
            <Eyebrow>When to come in</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Signs your brakes need attention</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {SIGNS.map((s) => (
                <div key={s.title}>
                  <span className="block h-[3px] w-8 bg-[var(--color-red)]" aria-hidden />
                  <h3 className="mt-3 text-xl text-[var(--color-heading)]">{s.title}</h3>
                  <p className="mt-2 text-[var(--color-body)]">{s.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-2xl text-[var(--color-body)]">
              Shake at highway speed even when you're not braking? That's usually{" "}
              <Link href="/services/wheel-balancing" className="link-grow font-semibold text-[var(--color-red-deep)]">
                wheel balancing
              </Link>
              . Want the calipers to look as good as they work?{" "}
              <Link href="/services/caliper-painting" className="link-grow font-semibold text-[var(--color-red-deep)]">
                Caliper painting
              </Link>{" "}
              is done with the wheels off too. Or see the{" "}
              <Link href="/services" className="link-grow font-semibold text-[var(--color-red-deep)]">
                full service list and prices
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} heading="Brake repair FAQ" />

      <LocalTrust service="brakes" />
      <CTABand
        heading="Brakes making noise?"
        sub="Call the shop and tell us what they're doing. We look first and give you the price before any work starts."
      />
    </>
  );
}
