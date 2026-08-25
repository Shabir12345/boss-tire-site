import type { Metadata } from "next";
import { HeroCinematic } from "@/components/sections/HeroCinematic";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { OffersBand } from "@/components/sections/OffersBand";
import { PriceSheet } from "@/components/sections/PriceSheet";
import { WhyBossTire } from "@/components/sections/WhyBossTire";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tire Shop, Wheel Alignment & Muffler Repair in Scarborough",
  description:
    "Boss Tire on Danforth Rd, Scarborough: new tires, seasonal changeovers, wheel alignment, muffler & exhaust and oil changes — published prices, same-day service. Call (647) 871-2393.",
  path: "/",
  keywords: [
    "tire shop scarborough",
    "wheel alignment scarborough",
    "muffler repair scarborough",
    "winter tire changeover scarborough",
    "oil change scarborough",
  ],
});

export default function HomePage() {
  return (
    <>
      <HeroCinematic />
      <WhatWeDo onDark />
      <OffersBand />
      <section id="prices" className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-4xl py-16 sm:py-20">
          <Eyebrow>Published pricing</Eyebrow>
          <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
            What it costs, before you call
          </h2>
          <p className="mt-4 max-w-xl text-[var(--color-body)]">
            No hidden numbers. Here is what Boss Tire charges — the same list the shop works from.
          </p>
          <div className="mt-10">
            <PriceSheet />
          </div>
        </div>
      </section>
      <WhyBossTire onDark />
      <CTABand />
    </>
  );
}
