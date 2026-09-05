import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/jsonld";
import { getService, formatPrice, requirePrice } from "@/lib/services";

const changeover = getService("tire-changeover")!;

const FAQS = [
  {
    q: "Is it worth buying winter tires on their own rims?",
    a: "For most drivers who swap twice a year, yes. Buying a set of rims for your winters means the seasonal changeover is a straight wheel-off, wheel-on job instead of dismounting and remounting the same tires from one set of rims twice a year. That's faster at the shop and it's easier on the tire itself — every mount and dismount stresses the bead, and doing it half as often means the tires last longer.",
  },
  {
    q: "Steel or alloy rims for winter?",
    a: "Most people who drive their winter set hard through salt and slush put their money into steel and save the alloy set for summer. Steel is cheaper to buy, and it shrugs off road salt and curb knocks that would mark up an alloy wheel. Alloy is lighter and looks better, and plenty of people run it year-round anyway. There's no wrong answer — it comes down to what you want to spend and whether you care how the car looks in February.",
  },
  {
    q: "What does a winter tire and rim package cost?",
    a: `A changeover on its own is ${formatPrice(requirePrice(changeover))}. What the full package costs — tires, rims and mounting together — depends on your rim size and which tires you pick, so we're not going to quote a number that doesn't match your car. Call with your size and we'll price it properly.`,
  },
  {
    q: "Will aftermarket rims fit my car?",
    a: "It depends on the bolt pattern, the offset and the centre bore matching your vehicle, not just the rim size looking right. A wheel that bolts up fine on paper can still rub or sit wrong if any one of those is off. Bring the car in, or call with the rim's specs and your vehicle's year, make and model, and we'll tell you straight whether it fits.",
  },
  {
    q: "Can you store the set I'm not using?",
    a: "Yes, we store off-season sets. Call to confirm what your set costs to store — pricing depends on what you're bringing in, so we'll give you a real number over the phone rather than guess at it here.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Winter Rims & Tire Packages",
  description:
    "Winter tires mounted on their own rims, ready to swap in minutes each season. Steel and alloy rim packages fitted at Boss Tire, Danforth Rd, Scarborough. Call (647) 871-2393.",
  path: "/tires/winter-rims-and-packages",
  keywords: [
    "winter rims and tires",
    "tire and rim package",
    "winter tire packages toronto",
    "alloy rims toronto",
    "steel rims toronto",
  ],
});

export default function WinterRimsAndPackagesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Tires", path: "/tires" },
          { name: "Winter Rims & Packages", path: "/tires/winter-rims-and-packages" },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Rims & Packages"
        title="Winter tires on their own rims"
        sub="A second set of rims turns the seasonal changeover into a fifteen-minute job instead of an afternoon — and it stops the bead damage that comes from mounting and unmounting the same tires twice a year."
        showCall
        image="/photos/rims-red.jpg"
        imageAlt="Alloy wheels on display at Boss Tire"
      />
      <TrustStrip />

      {/* Why a package makes sense — the conversion hook. */}
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>The case for a second set</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
                Why buy rims for your winter tires
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  If your winter tires live on the same rims as your summer or all-season set, every changeover
                  means breaking the bead, pulling the old tire off and mounting the new one — twice a year,
                  every year. That's more time in the bay, and it's wear on the bead itself that a wheel-off,
                  wheel-on swap never puts on the tire.
                </p>
                <p>
                  Put the winter tires on their own rims and the changeover becomes exactly that: wheels off,
                  wheels on, torqued and checked. It's the same swap either way — the rims just decide whether
                  it takes fifteen minutes or an afternoon of mounting and balancing.
                </p>
                <p>
                  A lot of Boss Tire customers who used to just swap tires twice a year end up buying a rim set
                  the first winter they get tired of the wait, and never go back.
                </p>
              </div>
            </div>

            {/* Changeover price card */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-smoke)] p-7">
              <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-5">
                <span className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">
                  Changeover
                </span>
                <span className="tabular font-display text-4xl font-extrabold text-[var(--color-heading)]">
                  {formatPrice(requirePrice(changeover))}
                </span>
              </div>
              <p className="mt-4 text-sm text-[var(--color-muted)]">
                Price before tax. Wheels-off swap once your winters are on their own rims.
              </p>
              <p className="mt-5 text-[var(--color-body)]">
                Already on rims, or thinking about it for next season? See the full{" "}
                <Link href="/winter-tire-changeover" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  winter tire changeover
                </Link>{" "}
                page for how the swap works and when to book it.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                Only running one set at a time? We can{" "}
                <Link href="/services/tire-storage" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  store the set you're not using
                </Link>{" "}
                so it's clean and dry when the season turns.
              </p>
            </div>
          </div>

          {/* Required: steel vs. alloy */}
          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>Rim material</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Steel or alloy for winter</h2>
              <p className="mt-4 text-[var(--color-body)]">
                Steel rims are the cheaper option and they shrug off what a Scarborough winter throws at them —
                road salt, slush and the odd curb tap don't do much to a steel wheel that would leave a mark on
                alloy. That's why a lot of dedicated winter sets are steel: it's a wheel you don't have to baby.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                Alloy is lighter and it looks better, and plenty of drivers run alloy year-round and don't think
                twice about it. Winter rims are also often sized down from the summer set, which is normal — a
                smaller wheel with a taller sidewall handles better in the cold and costs less to fit with a
                winter tire.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                Neither choice is wrong. It's steel if you want a wheel you don't worry about, or alloy if you'd
                rather it look good in the driveway too.
              </p>
            </div>

            {/* Required: aftermarket / custom wheel fitting */}
            <div>
              <Eyebrow>Aftermarket & custom wheels</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Fitting aftermarket rims</h2>
              <p className="mt-4 text-[var(--color-body)]">
                We fit aftermarket and custom wheels, but whether a given rim works on your car comes down to
                three things: bolt pattern, offset and centre bore. Get any one of those wrong and the wheel
                either won't bolt up or won't sit right once it's on.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                If you've already bought a set, or you're looking at one, bring it in or call with the rim's
                specs and your vehicle's year, make and model. We'll check it against your car before anything
                gets mounted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — also feeds FAQ schema + AI answers */}
      <section className="bg-[var(--color-smoke)]">
        <div className="gutter-safe mx-auto max-w-3xl py-16 sm:py-20">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Winter rims & packages FAQ</h2>
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
        heading="Ready to stop remounting the same tires?"
        sub="Call with your rim size or bring the car in — we'll price a set and get your winters mounted the same day."
      />
    </>
  );
}
