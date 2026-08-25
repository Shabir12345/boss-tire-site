import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/jsonld";
import { getService, formatPrice } from "@/lib/services";

const muffler = getService("muffler-repair");
const exhaust = getService("exhaust-repair");

const SIGNS = [
  "A loud, deep drone that got worse over a few weeks",
  "A rattle underneath at idle or over bumps",
  "A rotten-egg or exhaust smell reaching the cabin",
  "A hiss or ticking that rises with the engine",
  "Failed a drive-clean or emissions check",
];

const FAQS = [
  {
    q: "How much is a muffler repair?",
    a: "Muffler repair and replacement starts at $160, before tax. The exact price depends on your vehicle and whether the muffler can be repaired or needs replacing. Call with your year, make and model and you will have a real number in under a minute.",
  },
  {
    q: "Can you fix an exhaust leak the same day?",
    a: "Most exhaust leaks, hangers and pipe sections are same-day jobs. We inspect on arrival, show you where the leak is, and quote before any work starts.",
  },
  {
    q: "Do I need a whole new exhaust or just a repair?",
    a: "Often just a section. A single rusted pipe, a broken hanger or a failed weld can be repaired without replacing the whole system. We tell you honestly which one you are looking at instead of selling the bigger job.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Muffler & Exhaust Repair in Scarborough",
  description:
    "Muffler repair and replacement from $160 and exhaust repair from $150 at Boss Tire, Scarborough. Leaks, hangers, pipe work and welds, same day. Call (647) 871-2393.",
  path: "/muffler-exhaust",
  keywords: [
    "muffler repair scarborough",
    "exhaust repair scarborough",
    "muffler replacement scarborough",
    "exhaust leak repair scarborough",
  ],
});

export default function MufflerExhaustPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Muffler & Exhaust", path: "/muffler-exhaust" }]} />
      <FaqJsonLd faqs={FAQS} />
      <PageHeader
        eyebrow="Muffler & Exhaust"
        title="Quieter drive, same day"
        sub="Muffler and exhaust work done on Danforth Rd while you wait. We find the actual problem, show you, and quote before we touch it."
        showCall
        image="/photos/muffler-bay.jpg"
        imageAlt="The Boss Tire muffler and exhaust bay, a car up on the lift"
      />
      <TrustStrip />

      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid gap-4 sm:grid-cols-2">
            {[muffler, exhaust].map((s) =>
              s ? (
                <div key={s.slug} className="rounded-lg border border-[var(--color-border)] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
                      {s.name}
                    </h2>
                    <div className="shrink-0 text-right">
                      <span className="tabular font-display text-2xl font-extrabold text-[var(--color-heading)]">
                        {formatPrice(s.price)}
                      </span>
                      {s.priceNote && <span className="block text-xs text-[var(--color-muted)]">{s.priceNote}</span>}
                    </div>
                  </div>
                  <ul className="mt-4 space-y-1.5">
                    {s.included.map((inc) => (
                      <li key={inc} className="flex gap-2 text-sm text-[var(--color-body)]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>

          <div className="mt-14 max-w-2xl">
            <Eyebrow>When to bring it in</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Signs your exhaust needs a look</h2>
            <ul className="mt-6 space-y-3">
              {SIGNS.map((sign) => (
                <li key={sign} className="flex gap-3 text-[var(--color-body)]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                  {sign}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-smoke)]">
        <div className="gutter-safe mx-auto max-w-3xl py-16 sm:py-20">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Muffler &amp; exhaust FAQ</h2>
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

      <CTABand heading="Something loud under the car?" sub="Call the shop, describe what you hear, and we will tell you what it likely is and what it costs." />
    </>
  );
}
