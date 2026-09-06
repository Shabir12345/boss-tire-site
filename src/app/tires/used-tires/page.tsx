import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/jsonld";
import { BUSINESS } from "@/lib/business";

const BRANDS = ["Ilink", "Mazzini", "Kpsen", "Haida"];

const CHECKS = [
  {
    title: "Tread depth",
    body: "A tire with plenty of rubber left is worth selling; one that's nearly bald isn't, no matter how cheap it looks. We measure what's actually left before it goes up for sale.",
  },
  {
    title: "Age",
    body: "Rubber hardens and cracks as it ages, even on a tire with tread still on it. A tire that looks fine but has sat around too long doesn't grip the way a younger one does, so age gets checked alongside tread.",
  },
  {
    title: "Sidewall condition",
    body: "A cut, bulge or scrape on the sidewall isn't something that can be patched or repaired. If a used tire has sidewall damage, it doesn't go on your car — full stop.",
  },
  {
    title: "Matching to what you're keeping",
    body: "The two tires on one axle need to be close to each other in tread depth. When they aren't, the car can pull or grip unevenly side to side, and it shows up worst braking in the wet. If you're only replacing one or two, we look at what's staying on the car before we tell you what to put on.",
  },
];

const FAQS = [
  {
    q: "Are used tires safe?",
    a: "A used tire that's been properly checked is a reasonable, safe buy — that's the whole reason the used tire market exists. The risk isn't in buying used, it's in buying unchecked. We look at tread depth, age and sidewall condition on every tire before it's sold, and anything with sidewall damage or tread that's not worth the money doesn't go on the rack.",
  },
  {
    q: "How much do used tires cost in Scarborough?",
    a: `Used tires are priced one at a time — what the tire is, what size it is and how much tread is left decide the number, so there's no single figure we can put on a page. For reference, the budget new tires we stock run from about $73 to $219 each before tax, with most landing around $108; that range is new stock, not the used rack. Call ${BUSINESS.phoneDisplay} with your size and we'll tell you what's on the rack and what it costs.`,
  },
  {
    q: "How do you check a used tire before selling it?",
    a: "Every used tire gets looked over for tread depth, age and sidewall condition before it's offered for sale. A tire with a cut, bulge or scrape on the sidewall is pulled regardless of how much tread is left — that kind of damage isn't repairable. What's left on the rack has passed that check.",
  },
  {
    q: "Can I mix used tires with the ones already on my car?",
    a: "You can, within reason. Tires should be matched in pairs across an axle at minimum, so the safest way to add used tires is to keep tread depth close between the two on the same axle. Wildly mismatched tread side-to-side changes how the car handles, especially in the wet. Bring the car in and we'll match what we've got to what you're keeping.",
  },
  {
    q: "Do you have my tire size in stock?",
    a: `We can't say without checking — the used rack turns over and what's there changes. Call ${BUSINESS.phoneDisplay} with your year, make, model and tire size (it's on the sidewall or the driver's door jamb) and we'll tell you straight whether we've got it, in used or new, and what it costs.`,
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Used Tires in Scarborough",
  description:
    "Used and budget tires fitted the same day at Boss Tire, Danforth Rd, Scarborough. Every tire checked for tread and damage before it goes on. Call (647) 871-2393 with your size.",
  path: "/tires/used-tires",
  keywords: [
    "used tires near me",
    "used tires scarborough",
    "used tires toronto",
    "cheap tires toronto",
    "cheap tires scarborough",
  ],
});

export default function UsedTiresPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Tires", path: "/tires" },
          { name: "Used Tires", path: "/tires/used-tires" },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Used Tires"
        title="Good tires, less money"
        sub="A safe used set is a better buy than a cheap new one. We check tread depth, age and sidewall condition on every tire before it goes anywhere near your car."
        showCall
        image="/photos/new-used-tires.jpg"
        imageAlt="Racks of new and used tires at the Boss Tire shop"
      />
      <TrustStrip />

      {/* What's on the rack — honest about the stock, leads on price and fitting. */}
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>What we carry</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">What&apos;s on the rack</h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  Our used and budget stock is built on {BRANDS.join(", ")} — import brands, not the names you
                  see on a Formula 1 car. We&apos;re not going to pretend otherwise. They&apos;re inspected
                  before they go up for sale, and they&apos;re fitted the same day you walk in.
                </p>
                <p>
                  On the new budget side, prices run from about $73 to $219 a tire before tax, with most
                  landing around the $108 mark. That range is for new stock. A used tire is priced on its own
                  merits — the size, the make and how much tread is actually left on it — so the only honest
                  way to get a number is to call with your size and ask what&apos;s on the rack today.
                </p>
                <p>
                  If you&apos;re after a name-brand new set instead, or want to see everything we stock side by
                  side, the{" "}
                  <Link href="/tires" className="link-grow font-semibold text-[var(--color-red-deep)]">
                    tires page
                  </Link>{" "}
                  covers the full range. If it&apos;s the winter set you&apos;re replacing, it&apos;s worth
                  pricing{" "}
                  <Link
                    href="/tires/winter-rims-and-packages"
                    className="link-grow font-semibold text-[var(--color-red-deep)]"
                  >
                    rims to mount them on
                  </Link>{" "}
                  at the same time, so you&apos;re not paying to mount and dismount the same tires twice a
                  year.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-smoke)] p-7">
              <span className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">
                Walk in, get fitted
              </span>
              <p className="mt-4 text-[var(--color-body)]">
                No appointment needed. Bring the car — or just the size off the sidewall or door jamb — and
                we&apos;ll tell you what&apos;s available and get it mounted and balanced the same day.
              </p>
              <p className="mt-5 text-sm text-[var(--color-muted)]">{BUSINESS.hours.weekdays}</p>
              <p className="text-sm text-[var(--color-muted)]">{BUSINESS.hours.weekend}</p>
              <p className="mt-5 text-[var(--color-body)]">
                {BUSINESS.address.street}, {BUSINESS.address.locality} — call {BUSINESS.phoneDisplay} first if
                you&apos;d rather check availability before driving over.
              </p>
            </div>
          </div>

          {/* How we check them */}
          <div className="mt-16">
            <Eyebrow>Before it goes on</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-3xl text-[var(--color-heading)]">
              What we look at before a used tire goes on your car
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {CHECKS.map((c) => (
                <div key={c.title}>
                  <span className="block h-[3px] w-8 bg-[var(--color-red)]" aria-hidden />
                  <h3 className="mt-3 text-xl text-[var(--color-heading)]">{c.title}</h3>
                  <p className="mt-2 text-[var(--color-body)]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — also feeds FAQ schema + AI answers */}
      <section className="bg-[var(--color-smoke)]">
        <div className="gutter-safe mx-auto max-w-3xl py-16 sm:py-20">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Used tires FAQ</h2>
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
        heading="Know your size?"
        sub="Call it in and we'll tell you what's on the rack, used or new, and what it costs — no surprises when you get here."
      />
    </>
  );
}
