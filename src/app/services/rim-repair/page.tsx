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

const rim = getService("rim-repair")!;
const alignment = getService("wheel-alignment")!;
const balancing = getService("tire-rebalancing")!;

const DAMAGE = [
  {
    title: "Curb rash",
    body: "Scrapes and gouges on the outer lip from parallel parking or a tight drive-thru. Mostly cosmetic, but deep gouges collect salt and start corroding, so they're worth fixing before winter.",
  },
  {
    title: "Bent rims",
    body: "A pothole hit hard enough to flatten or ripple the barrel. The tell is a vibration that balancing won't cure, or a tire that slowly loses air because the bead no longer seals against the rim.",
  },
  {
    title: "Cracks",
    body: "A hairline crack, usually on the inner barrel, from a hard impact. It often shows up as a slow leak nobody can find. Some cracks are repairable and some aren't; it depends on where the crack is and how far it runs.",
  },
];

const FAQS = [
  {
    q: "How much does rim repair cost in Scarborough?",
    a: `Rim repair at Boss Tire is ${formatPrice(requirePrice(rim))}, before tax. That covers curb-rash repair, crack repair or bent-rim straightening, plus an inspection of the rim. Call ${BUSINESS.phoneDisplay} and tell us what the damage looks like.`,
  },
  {
    q: "Can a bent rim be fixed, or do I need a new one?",
    a: "Most bends from a pothole can be straightened, and straightening is usually far cheaper than a replacement wheel, especially on alloys. A rim that's badly kinked, cracked through a spoke, or bent in more than one place may not be safe to put back on the car. We inspect it first and tell you which one you've got before any work starts.",
  },
  {
    q: "Is a cracked rim safe to drive on?",
    a: "Not for long. A cracked rim can keep losing air, and a crack under load can grow. If you've found a crack or suspect one because a tire keeps going soft with no nail in it, get it looked at soon and keep your speed down until then.",
  },
  {
    q: "Why does my car still shake after balancing?",
    a: `If the tires have been balanced and the steering wheel still shakes at highway speed, a bent rim is one of the usual suspects: no amount of wheel weights can make a wheel that isn't round run smooth. Straighten the rim, then balance it (${formatPrice(requirePrice(balancing))} ${balancing.priceNote}).`,
  },
  {
    q: "Do I need an alignment after a pothole bent my rim?",
    a: `Often, yes. An impact hard enough to bend a rim can knock the alignment out too. If the car pulls or the steering wheel sits off-centre after the repair, a wheel alignment (${formatPrice(requirePrice(alignment))}) is the next step.`,
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Rim Repair in Scarborough: Curb Rash & Bends",
  description:
    "Rim repair at Boss Tire, Danforth Rd, Scarborough: curb rash, cracked rims and bent rim straightening for $120. Inspected first, so you know it's safe. Call (647) 871-2393.",
  path: "/services/rim-repair",
  keywords: [
    "rim repair scarborough",
    "rim repair toronto",
    "bent rim repair",
    "curb rash repair toronto",
    "cracked rim repair",
    "rim straightening",
  ],
});

export default function RimRepairPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Rim Repair", path: "/services/rim-repair" },
        ]}
      />
      <ServiceJsonLd service={rim} />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Rim Repair"
        title="Rim repair: curb rash, cracks and bends"
        sub="Toronto potholes bend rims and Toronto parking scrapes them. Most of that damage can be fixed for a lot less than a new wheel, and we'll tell you honestly when it can't."
        showCall
        price={{ label: "Rim repair", amount: formatPrice(requirePrice(rim)), note: "before tax" }}
        image="/photos/rims-wall.jpg"
        imageAlt="Alloy rims on the red wall at Boss Tire"
      />
      <TrustStrip />

      {/* Price + what's included — the conversion hook. */}
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>The service</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
                Repair before you replace
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  A single replacement alloy wheel from a dealer can cost several times what a repair does, and
                  if it's an older or discontinued design, finding one that matches the other three can be harder
                  still. Most rim damage doesn't call for that. Scrapes can be taken out, bends straightened and
                  many cracks repaired, so the wheel goes back on the car and the set still matches.
                </p>
                <p>
                  Every rim gets inspected before we touch it. If the damage is somewhere a repair wouldn't be
                  safe, you'll hear that first, not after you've paid for work that shouldn't have been done.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {rim.included.map((inc) => (
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
                  Rim Repair
                </span>
                <span className="tabular font-display text-4xl font-extrabold text-[var(--color-heading)]">
                  {formatPrice(requirePrice(rim))}
                </span>
              </div>
              <p className="mt-4 text-sm text-[var(--color-muted)]">Price before tax.</p>
              <p className="mt-3 font-semibold text-[var(--color-heading)]">
                Curb rash, crack or bend: one published price.
              </p>
              <p className="mt-5 text-[var(--color-body)]">
                Call {BUSINESS.phoneDisplay} and describe the damage, and we'll tell you whether
                it looks repairable before you make the trip to Danforth Rd.
              </p>
            </div>
          </div>

          {/* Damage types */}
          <div className="mt-16">
            <Eyebrow>What we fix</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Three kinds of rim damage</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {DAMAGE.map((d) => (
                <div key={d.title} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-[var(--color-body)]">{d.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pothole season + related jobs */}
          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>Pothole season</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Why rims bend in Toronto every spring</h2>
              <p className="mt-4 text-[var(--color-body)]">
                Water gets into cracks in the road, freezes, expands and breaks the asphalt apart. Do that through
                a whole Toronto winter of freeze-thaw cycles and by March the roads are full of sharp-edged holes.
                Hitting one at speed drives the tire into the rim hard enough to flatten or ripple the barrel.
                Low-profile tires, with less sidewall to absorb the hit, make it worse.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                A bend isn't always obvious by eye. The signs are a new vibration after a hard hit, a tire that
                keeps losing a few PSI a week with no puncture, or a wheel that won't balance out. If any of those
                started after a pothole, the rim is worth checking before you blame the tire.
              </p>
            </div>

            <div>
              <Eyebrow>Often done together</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)]">After the rim, check the rest</h2>
              <p className="mt-4 text-[var(--color-body)]">
                The hit that bent a rim can also knock the alignment out, so if the car pulls or the steering wheel
                sits crooked afterwards, book a{" "}
                <Link href="/services/wheel-alignment" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  wheel alignment
                </Link>{" "}
                too. A straightened rim should also be{" "}
                <Link href="/services/wheel-balancing" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  balanced
                </Link>{" "}
                before it goes back on, so the ride is smooth again.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                Making the wheels look new while you're at it?{" "}
                <Link href="/services/caliper-painting" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  Caliper painting
                </Link>{" "}
                finishes the look behind the spokes. And if the rim turns out to be past saving, we fit replacement
                and aftermarket wheels; see{" "}
                <Link
                  href="/tires/winter-rims-and-packages"
                  className="link-grow font-semibold text-[var(--color-red-deep)]"
                >
                  rims and tire packages
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — also feeds FAQ schema + AI answers */}
      <FaqSection faqs={FAQS} heading="Rim repair FAQ" />

      <LocalTrust service="rim-repair" />
      <CTABand
        heading="Scraped, bent or cracked?"
        sub="Call the shop, tell us what happened to the wheel, and we'll tell you straight whether it's a repair or a replacement."
      />
    </>
  );
}
