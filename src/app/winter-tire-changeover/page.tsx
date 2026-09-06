import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { OffersBand } from "@/components/sections/OffersBand";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CallButton } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/jsonld";
import { getService, formatPrice, requirePrice } from "@/lib/services";

const changeover = getService("tire-changeover");
const storage = getService("tire-storage");

const FAQS = [
  {
    q: "When should I put winter tires on in Scarborough?",
    a: "Once daytime temperatures stay below about 7°C, usually late October to mid-November. Below that, all-season rubber hardens and loses grip well before the first snow. Booking in October means you pick the day instead of waiting in the November rush.",
  },
  {
    q: "How long does a changeover take?",
    a: "An on-rim swap is a same-day job while you wait. Tires that need mounting and balancing onto your rims take a little longer, and we quote a realistic time when you book.",
  },
  {
    q: "Can you store my off-season tires?",
    a: `Yes. Tire storage is ${storage ? formatPrice(requirePrice(storage)) : "available"}: we keep your off-season set clean and dry and tag it by position so the next changeover rotates them properly.`,
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Winter Tire Changeover in Scarborough",
  description:
    "Winter tire changeover from $60 at Boss Tire, Scarborough. Mounted, balanced and torqued the same day. Book before the November rush and pick your time. (647) 871-2393.",
  path: "/winter-tire-changeover",
  keywords: [
    "winter tire changeover scarborough",
    "tire changeover scarborough",
    "seasonal tire swap scarborough",
    "winter tire change near me",
  ],
});

export default function WinterChangeoverPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Winter Tire Changeover", path: "/winter-tire-changeover" }]} />
      <FaqJsonLd faqs={FAQS} />
      <PageHeader
        eyebrow="Seasonal"
        title="Winter tire changeover, done before the rush"
        sub="Book your seasonal swap early and you pick the time. Leave it until the first snowfall and the whole city is calling the same week."
        showCall
        image="/photos/winter-tires.jpg"
        imageAlt="A winter tire gripping a snow-covered road"
      />
      <TrustStrip />

      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>The changeover</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)]">
                {changeover ? formatPrice(requirePrice(changeover)) : "$60"}, same day, while you wait
              </h2>
              <p className="mt-4 text-[var(--color-body)]">
                We swap your seasonal set, balance them, torque to spec and set the pressures on all four.
                On-rim swaps are quick. If your winters need mounting onto your rims, we do that too.
              </p>
              <ul className="mt-6 space-y-2">
                {(changeover?.included ?? []).map((inc) => (
                  <li key={inc} className="flex gap-2 text-[var(--color-body)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-smoke)] p-6 sm:p-8">
              <Eyebrow>Why timing matters</Eyebrow>
              <h2 className="mt-4 text-2xl text-[var(--color-heading)]">The 7°C rule</h2>
              <p className="mt-3 text-[var(--color-body)]">
                Winter tires are about the rubber compound, not just the snow. Below roughly 7°C, all-season
                tires stiffen and lose grip, and the difference shows up in braking distance on a cold, dry
                road long before the first storm.
              </p>
              <p className="mt-3 text-[var(--color-body)]">
                Running winter tires this year? Ask us about fitment when you book and we will sort out the
                right setup for your vehicle.
              </p>
              <p className="mt-3 text-[var(--color-body)]">
                Not ready to give up garage space for the off-season set?{" "}
                <Link href="/services/tire-storage" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  We'll store it
                </Link>
                . Want winters that live on their own rims so the seasonal swap takes minutes every year?{" "}
                <Link
                  href="/tires/winter-rims-and-packages"
                  className="link-grow font-semibold text-[var(--color-red-deep)]"
                >
                  See rim &amp; tire packages
                </Link>
                .
              </p>
              <p className="mt-3 text-[var(--color-body)]">
                Still deciding when to book? We go through{" "}
                <Link
                  href="/blog/when-to-put-winter-tires-on-toronto"
                  className="link-grow font-semibold text-[var(--color-red-deep)]"
                >
                  when winter tires should actually go on in Toronto
                </Link>{" "}
                and what waiting for the first snowfall costs you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <OffersBand />

      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl pb-16 sm:pb-20">
          <div className="flex flex-col items-start gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-smoke)] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Eyebrow>While you're booked in</Eyebrow>
              <h2 className="mt-2 text-xl text-[var(--color-heading)]">Winter accessories, in stock</h2>
              <p className="mt-2 max-w-2xl text-sm text-[var(--color-body)]">
                We also carry snow brushes and ice scrapers, booster cables, emergency car kits and
                windshield wipers. No online price list for these — ask what's in stock when you book your
                changeover or call ahead.
              </p>
            </div>
            <CallButton className="shrink-0" trackLocation="winter_accessories" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-3xl py-16 sm:py-20">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Changeover FAQ</h2>
          <dl className="mt-8 space-y-6">
            {FAQS.map((f) => (
              <div key={f.q} className="border-b border-[var(--color-border)] pb-6 last:border-0">
                <dt className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">{f.q}</dt>
                <dd className="mt-2 text-[var(--color-body)]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTABand heading="Beat the November rush" sub="Call now, pick your changeover time, and skip the week everyone else is waiting in line." />
    </>
  );
}
