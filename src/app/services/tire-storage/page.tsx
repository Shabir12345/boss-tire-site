import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/lib/jsonld";
import { getService, formatPrice, requirePrice } from "@/lib/services";
import { BUSINESS } from "@/lib/business";

const storage = getService("tire-storage")!;
const changeover = getService("tire-changeover")!;

const FAQS = [
  {
    q: "How much does tire storage cost?",
    a: `Tire storage at Boss Tire starts at ${formatPrice(requirePrice(storage))}. Call to confirm what your set costs to store — we'll give you an exact number over the phone at ${BUSINESS.phoneDisplay} rather than have you guess from a website.`,
  },
  {
    q: "Why not just keep my tires in the garage?",
    a: "A home garage swings hot in the summer and cold in the winter, and a lot of them get damp corners or a patch of direct sun through a window or the door seal. All three age rubber faster than it should and make it more likely to crack before the tread wears out. Drop the set with us instead and it sits clean and dry until you need it — and you get the corner of your garage back for six months.",
  },
  {
    q: "How are the tires stored?",
    a: "Clean and dry, and tagged by position before they go on the shelf — front-left, front-right, and so on — so when you come back for your changeover they go back on the same corner they came off. That matters more than people think: tires wear unevenly, and putting them back where they were keeps that wear pattern consistent instead of resetting it.",
  },
  {
    q: "When should I bring my off-season set in?",
    a: `Bring it in whenever you do your changeover — most people hand off the set they just took off the car in the same visit. Demand for changeovers picks up hard from mid-October on, so if you'd rather not wait behind everyone else booking in the same week, come earlier. Walk-ins are welcome, ${BUSINESS.hours.weekdays}.`,
  },
  {
    q: "What if I sell the car while you have my tires?",
    a: "Call us. We'll sort out a time for you to come collect them — sold car or not, they're still your tires.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Tire Storage in Scarborough",
  description:
    "Off-season tire storage at Boss Tire, Danforth Rd, Scarborough — clean, dry, tagged by position and ready for your next changeover. Call (647) 871-2393 to reserve space.",
  path: "/services/tire-storage",
  keywords: [
    "tire storage",
    "tire storage scarborough",
    "winter tire storage toronto",
    "seasonal tire storage",
    "tire storage near me",
  ],
});

export default function TireStoragePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Tire Storage", path: "/services/tire-storage" },
        ]}
      />
      <ServiceJsonLd service={storage} />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Tire Storage"
        title="Your off-season set, kept properly"
        sub="For half the year your off-season set is doing nothing but taking up floor space. Leave it with us instead and it comes back ready to go straight back on the car when the weather turns."
        showCall
        image="/photos/winter-tires.jpg"
        imageAlt="Winter tires stacked and tagged in storage"
      />
      <TrustStrip />

      {/* Price + what's included — the conversion hook. */}
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>The service</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
                What happens to a set once it's ours to store
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  Rubber doesn't age well sitting hot, damp, or in the sun. A tire left leaning against a garage
                  wall through a summer of temperature swings and the odd shaft of light through a window will
                  crack sooner than one that's kept clean and dry somewhere it isn't fighting the weather. That's
                  the whole point of handing your off-season set to us instead of finding a corner for it at
                  home.
                </p>
                <p>
                  Every set that comes in gets tagged by position — front-left, front-right, rear-left,
                  rear-right — before it goes into storage. When your changeover comes around, each tire goes
                  back on the corner it came off, so the wear pattern it already had stays consistent instead of
                  getting reshuffled.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {storage.included.map((inc) => (
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
                  Tire Storage
                </span>
                <div className="shrink-0 text-right">
                  <span className="block font-display text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                    Starts at
                  </span>
                  <span className="tabular font-display text-4xl font-extrabold text-[var(--color-heading)]">
                    {formatPrice(requirePrice(storage))}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-[var(--color-muted)]">Price before tax.</p>
              <p className="mt-3 font-semibold text-[var(--color-heading)]">
                Call to confirm what your set costs to store.
              </p>
              <p className="mt-5 text-[var(--color-body)]">
                Bring the set in with your car when you do a changeover, or drop it off on its own — either way,
                call ahead at {BUSINESS.phoneDisplay} and we'll have the number ready for your set before you
                arrive.
              </p>
              <p className="mt-5 text-sm text-[var(--color-muted)]">
                Also swapping tires this trip?{" "}
                <Link
                  href="/winter-tire-changeover"
                  className="link-grow font-semibold text-[var(--color-red-deep)]"
                >
                  See the winter tire changeover
                </Link>{" "}
                — {formatPrice(requirePrice(changeover))}, done the same day.
              </p>
            </div>
          </div>

          {/* Why it matters + when to bring it in */}
          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>Why it matters</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Heat, damp and sun are the real enemy</h2>
              <p className="mt-4 text-[var(--color-body)]">
                A tire is rubber and steel belts, and both react to the environment they sit in for months at a
                time. Heat softens the compound and speeds up the chemical breakdown that eventually shows up as
                surface cracking. Damp works into that same cracking once it starts. Direct sunlight adds UV on
                top of the heat, which is why a tire stored against a sunny garage door often looks worse on one
                side than the other. None of that is dramatic or sudden — it's just years of storage in the
                wrong conditions catching up with the tire early.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                Storing your off-season set with us means it isn't doing that in your garage. It's also one less
                thing taking up floor space for half the year, which matters if your garage already has a car,
                a bike, and everything else competing for the same square footage.
              </p>
            </div>

            <div>
              <Eyebrow>Timing</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)]">When to bring your set in</h2>
              <p className="mt-4 text-[var(--color-body)]">
                Most people drop their off-season tires with us the same day they come in for a changeover — the
                set that just came off the car goes straight into storage instead of into the trunk. Changeover
                demand climbs from mid-October onward as the weather turns, so if you'd rather not be one of a
                long line of cars booking the same week, come in before that rush starts.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                Already have a spare set of rims for your winters and want to skip the mount-and-dismount
                altogether? Take a look at{" "}
                <Link
                  href="/tires/winter-rims-and-packages"
                  className="link-grow font-semibold text-[var(--color-red-deep)]"
                >
                  winter rims and packages
                </Link>{" "}
                — it turns the seasonal swap into a wheels-off, wheels-on job and makes the tire you're storing
                easier to hand over too.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                Timing the swap itself is a separate question, and the first snowfall is the wrong cue to go
                by. We set out{" "}
                <Link
                  href="/blog/when-to-put-winter-tires-on-toronto"
                  className="link-grow font-semibold text-[var(--color-red-deep)]"
                >
                  when winter tires should actually go on in Toronto
                </Link>{" "}
                if you want to pick your week rather than join the rush.
              </p>
              <p className="mt-4 text-[var(--color-body)]">
                No appointment needed to drop tires off. Walk in, {BUSINESS.hours.weekdays}, and we'll get your
                set tagged and put away. If you're stacking a few jobs into the same visit, the{" "}
                <Link href="/services" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  full service list and prices
                </Link>{" "}
                is worth a look before you come over.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — also feeds FAQ schema + AI answers */}
      <section className="bg-[var(--color-smoke)]">
        <div className="gutter-safe mx-auto max-w-3xl py-16 sm:py-20">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Tire storage FAQ</h2>
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
        heading="Ready to hand off your off-season set?"
        sub="Call the shop or drop by — we'll tag your tires, store them clean and dry, and have them ready when the season turns."
      />
    </>
  );
}
