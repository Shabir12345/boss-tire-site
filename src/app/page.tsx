import type { Metadata } from "next";
import { HeroCinematic } from "@/components/sections/HeroCinematic";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ReviewsBand } from "@/components/sections/ReviewsBand";
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
      {/* Above the fold — always rendered immediately. */}
      <HeroCinematic />
      <TrustStrip />
      {/* Below the fold — render-skipped until scrolled near (see .cv-auto), so
          their style/layout/paint doesn't compete with the hero's LCP paint. */}
      <div className="cv-auto">
        <ReviewsBand />
      </div>
      <div className="cv-auto">
        <WhatWeDo onDark />
      </div>
      <div className="cv-auto">
        <OffersBand />
      </div>
      {/* Not cv-auto: axe-core can't resolve the background of render-skipped
          content, which mis-flags the (near-black on white) price numbers as low
          contrast. The sections around it still skip, so the perf win holds. */}
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
      <div className="cv-auto">
        <WhyBossTire onDark />
      </div>
      <div className="cv-auto">
        <CTABand image="/photos/storefront.jpg" heading="Come by the shop" sub="Find us at 375 Danforth Rd in Scarborough, Mon–Sat 9 to 7. Call ahead and we'll have you in and out." />
      </div>
    </>
  );
}
