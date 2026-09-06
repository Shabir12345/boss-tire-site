import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/lib/jsonld";
import { getService, formatPrice, requirePrice } from "@/lib/services";

const exhaust = getService("exhaust-repair")!;
const muffler = getService("muffler-repair")!;

const FAQS = [
  {
    q: "How much does exhaust leak repair cost?",
    a: `Exhaust leak repair at Boss Tire is ${formatPrice(requirePrice(exhaust))}, before tax. That's the starting point — the final number depends on where the leak is and how much pipe needs to come out and get replaced. Call with your year, make and model and we'll walk you through it before we start anything.`,
  },
  {
    q: "How do I know if my exhaust is leaking?",
    a: "The usual sign is noise — a drone or a hiss that's gotten louder over days or weeks, especially right after startup or when you accelerate. Some drivers notice a smell reaching the cabin instead, or a rattle from underneath over bumps. Any of those is worth bringing in.",
  },
  {
    q: "Can an exhaust leak be welded, or does it need a new part?",
    a: "Most of the time it can be welded. A cracked joint, a split seam or a loose flange gets repaired in place instead of replaced. A new section only comes into it when the metal around the leak is too rusted or thin to weld to safely.",
  },
  {
    q: "Is it safe to drive with an exhaust leak?",
    a: "Not if the leak is somewhere the fumes can reach the cabin — that's a carbon monoxide risk, and it's a real one, not just a noise problem. If you can smell exhaust inside the car, don't wait on it. Get it looked at.",
  },
  {
    q: "How long does exhaust repair take?",
    a: "It depends on what's actually wrong. A single weld or a hanger replacement is usually a job you can wait for. A pipe section that needs to be cut out and replaced still typically finishes the same day — we'll know once we've had a look underneath.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Exhaust Leak Repair in Scarborough",
  description:
    "Loud exhaust, rattle or a smell in the cabin? Boss Tire on Danforth Rd finds and welds exhaust leaks from $150 — pipes, hangers and joints. Call (647) 871-2393.",
  path: "/muffler-exhaust/exhaust-leak-repair",
  keywords: [
    "exhaust leak repair",
    "exhaust repair scarborough",
    "exhaust pipe repair",
    "exhaust leak repair cost",
    "exhaust welding",
  ],
});

export default function ExhaustLeakRepairPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Muffler & Exhaust", path: "/muffler-exhaust" },
          { name: "Exhaust Leak Repair", path: "/muffler-exhaust/exhaust-leak-repair" },
        ]}
      />
      <ServiceJsonLd service={exhaust} />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Exhaust Leak Repair"
        title="Find the leak, weld it, done"
        sub="An exhaust leak gets louder, costs you fuel and can put fumes in the cabin. Most are a cracked joint, a rotted section of pipe or a broken hanger — and most are a weld, not a whole new system."
        showCall
        image="/photos/muffler-bay.jpg"
        imageAlt="Exhaust work underway in the Boss Tire service bay"
      />
      <TrustStrip />

      {/* What's actually wrong — the four sub-services with real search demand. */}
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl text-[var(--color-heading)] sm:text-4xl">
            What&apos;s actually leaking
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-body)]">
            An exhaust leak doesn&apos;t fix itself. It starts small — a tick at idle, a hiss you only notice with
            the windows down — and gets louder as the gap opens up. Left alone, the engine ends up working harder
            to push exhaust out through the hole instead of the tailpipe. The right fix depends on exactly where
            the leak is, which is why we look at the whole system before quoting anything.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
                Exhaust Leak Repair
              </h3>
              <p className="mt-3 text-[var(--color-body)]">
                Most leaks start at a joint — where two sections of pipe meet, or where the pipe meets the muffler
                or resonator. A gasket fails, or the metal around it rusts through. We find the exact spot with the
                engine running instead of guessing from the sound, then reseal or weld it depending on what&apos;s
                failed.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
                Exhaust Pipe Repair
              </h3>
              <p className="mt-3 text-[var(--color-body)]">
                Rust usually does the damage here. A section of pipe thins from the inside, then splits or opens a
                hole you can hear from the driveway. If the rest of the pipe is solid, we cut out the bad section
                and replace just that piece. If rust has spread past one spot, we tell you that instead of patching
                something that will fail again in a month.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
                Exhaust Welding
              </h3>
              <p className="mt-3 text-[var(--color-body)]">
                A lot of what sounds like &quot;I need a new exhaust&quot; is actually a weld. A cracked seam, a
                split at a joint, a flange that&apos;s worked loose — these get repaired in place rather than
                swapped for a new part. It costs less than replacing the section, and it holds as long as the metal
                around it is sound enough to weld to.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
                Exhaust Hanger Repair
              </h3>
              <p className="mt-3 text-[var(--color-body)]">
                The exhaust doesn&apos;t bolt straight to the car — it hangs from rubber mounts and brackets along
                the underside. When a hanger breaks or rots out, the pipe sags, and a sagging pipe rattles against
                the underbody or scrapes on the ground over bumps. Replacing one is a small job, but leaving it
                broken puts weight on the rest of the system it wasn&apos;t built to carry.
              </p>
            </div>
          </div>

          <p className="mt-10 max-w-2xl text-[var(--color-body)]">
            If the resonator itself is the problem, we can remove or replace it as part of the same repair. The
            flex pipe near the manifold cracks occasionally too, and it gets fixed the same way as any other
            section — cut out what&apos;s failed, weld in what&apos;s good.
          </p>
        </div>
      </section>

      {/* Price + what's included — the conversion hook. */}
      <section className="bg-[var(--color-smoke)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>The price</Eyebrow>
              <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
                What exhaust leak repair costs
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-body)]">
                Exhaust repair — leak, pipe or hanger work — starts at {formatPrice(requirePrice(exhaust))}, before
                tax. If the muffler itself has to come out rather than a section of pipe, that&apos;s priced
                separately: muffler repair and replacement is {formatPrice(requirePrice(muffler))}, and{" "}
                {muffler.priceNote}.
              </p>
              <ul className="mt-6 space-y-2">
                {exhaust.included.map((inc) => (
                  <li key={inc} className="flex gap-3 text-[var(--color-body)]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-paper)] p-7">
              <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-5">
                <span className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">
                  Exhaust Repair
                </span>
                <span className="tabular font-display text-4xl font-extrabold text-[var(--color-heading)]">
                  {formatPrice(requirePrice(exhaust))}
                </span>
              </div>
              <p className="mt-4 text-sm text-[var(--color-muted)]">Price before tax. Walk in, six days a week.</p>
              <p className="mt-5 text-[var(--color-body)]">
                We inspect on arrival, show you where the leak actually is, and quote before we touch anything.
              </p>
              <p className="mt-5 text-sm text-[var(--color-muted)]">
                Something else making noise under the car?{" "}
                <Link href="/muffler-exhaust" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  See all muffler &amp; exhaust work and pricing
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — also feeds FAQ schema + AI answers */}
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-3xl py-16 sm:py-20">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Exhaust leak repair FAQ</h2>
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
        heading="Exhaust getting louder?"
        sub="Call the shop or drive in — we'll find the leak, show you, and quote before we touch it."
      />
    </>
  );
}
