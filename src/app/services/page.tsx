import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/sections/PageHeader";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServiceCatalog } from "@/components/sections/ServiceCatalog";
import { OffersBand } from "@/components/sections/OffersBand";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Services & Prices",
  description:
    "Every Boss Tire service with the price on it: tire changeovers, wheel alignment, rim repair, oil changes, TPMS, muffler & exhaust and more. Same-day in Scarborough. (647) 871-2393.",
  path: "/services",
  keywords: [
    "tire services scarborough",
    "wheel alignment price scarborough",
    "oil change scarborough",
    "rim repair scarborough",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <PageHeader
        eyebrow="Services & pricing"
        title="Every service, with the price on it"
        sub="Tires, wheels, alignment, exhaust and the everyday maintenance in between. Here is the full list and what each job includes, so you know the cost before you call."
        showCall
      />
      <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
        <Image
          src="/photos/alignment.jpg"
          alt="A four-wheel alignment being performed at Boss Tire"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
      <TrustStrip />
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <ServiceCatalog />
        </div>
      </section>
      <OffersBand />
      <CTABand />
    </>
  );
}
