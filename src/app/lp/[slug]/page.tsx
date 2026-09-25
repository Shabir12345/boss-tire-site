import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LandingHero } from "@/components/landing/LandingHero";
import { ServicePriceCard } from "@/components/landing/ServicePriceCard";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { LocalTrust } from "@/components/sections/LocalTrust";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTABand } from "@/components/sections/CTABand";
import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CallButton } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { LANDING_PAGES, getLandingPage } from "@/lib/landing-pages";
import { getService, formatPrice } from "@/lib/services";

// ─── Google Ads landing page template ───────────────────────────────────────
// Every /lp/<slug> page is this file filled from one LANDING_PAGES entry. The
// section order is the standard (LANDING-PAGES.md): answer → proof → price →
// process → no-call option → objections → last call. Change it here and every
// landing page changes with it.

// Static generation only: every slug is known at build time, anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lp = getLandingPage(slug);
  if (!lp) return {};
  return buildMetadata({
    title: lp.metaTitle,
    description: lp.metaDescription,
    path: `/lp/${lp.slug}`,
    image: `${BUSINESS.url}${lp.hero.image}`,
    noindex: true,
  });
}

export default async function LandingPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lp = getLandingPage(slug);
  const listed = lp && getService(lp.service);
  if (!lp || !listed) notFound();
  // hidePrice: the page quotes by phone, like its ads, even though services.ts
  // has a number (storage: flat vs per-wheel is still unconfirmed).
  const service = lp.hidePrice ? { ...listed, price: undefined, priceNote: undefined } : listed;

  const heroPrice =
    service.price !== undefined
      ? {
          label: lp.hero.priceLabel,
          amount: service.priceNote ? `From ${formatPrice(service.price)}` : formatPrice(service.price),
          // "and up, depending on vehicle" → "depending on vehicle": the amount already says "From".
          note: service.priceNote?.replace(/^and up,\s*/, "") ?? "before tax",
        }
      : undefined;

  return (
    <>
      <LandingHero
        eyebrow={lp.hero.eyebrow}
        headline={lp.hero.headline}
        sub={lp.hero.sub}
        bullets={lp.hero.bullets}
        image={lp.hero.image}
        imageAlt={lp.hero.imageAlt}
        price={heroPrice}
      />
      <TrustStrip />

      {/* Price + what's included, from services.ts */}
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto grid max-w-6xl gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div>
            <Eyebrow>The price</Eyebrow>
            {lp.hidePrice ? (
              <>
                <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">Your price, in one call</h2>
                <p className="mt-4 text-lg leading-relaxed text-[var(--color-body)]">
                  Call with your vehicle and we&apos;ll give you the exact number for your set over the phone.
                </p>
              </>
            ) : (
              <>
                <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">What it costs, before you call</h2>
                <p className="mt-4 text-lg leading-relaxed text-[var(--color-body)]">
                  Most shops make you call for a number. Ours is on the page. If your vehicle needs something different,
                  we tell you the price first and nothing starts until you approve it.
                </p>
              </>
            )}
            <div className="mt-6">
              <CallButton trackLocation="lp_price" />
            </div>
          </div>
          <ServicePriceCard service={service} showAlignmentOffers={lp.showAlignmentOffers} />
        </div>
      </section>

      <LocalTrust service={lp.service} />

      <ProcessSteps steps={lp.steps} heading="What happens when you come in" />

      {/* The no-call path: after-hours visitors and people who'd rather type. */}
      <section id="quote" className="scroll-mt-20 bg-[var(--color-ink)]">
        <div className="gutter-safe mx-auto grid max-w-6xl gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div>
            <Eyebrow onDark>Rather not call?</Eyebrow>
            <h2 className="mt-4 text-3xl text-white sm:text-4xl">Get a quote by message</h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-on-dark)]">
              Send your vehicle and what you need. We reply with a price, and if the shop is closed we call you back
              first thing when we open.
            </p>
            <OpenStatus onDark className="mt-6" />
            <p className="mt-2 text-sm text-[var(--color-on-dark-mute)]">
              {BUSINESS.hours.weekdays} · {BUSINESS.hours.weekend}
            </p>
            <div className="mt-6">
              <CallButton trackLocation="lp_quote" />
            </div>
          </div>
          <div className="rounded-xl bg-[var(--color-paper)] p-6 sm:p-8">
            <ContactForm source={`lp_${lp.slug}`} messagePlaceholder={lp.formPrompt} submitLabel="Get my quote" />
          </div>
        </div>
      </section>

      <FaqSection faqs={lp.faqs} heading="Before you call" tone="paper" />

      <section className="bg-[var(--color-paper)]">
        <p className="gutter-safe mx-auto max-w-3xl pb-12 text-sm text-[var(--color-muted)]">
          Want the full write-up?{" "}
          <Link href={lp.organicPage} className="link-grow font-semibold text-[var(--color-red-deep)]">
            More about {service.name.toLowerCase()} at Boss Tire
          </Link>
          .
        </p>
      </section>

      <CTABand heading={lp.cta.heading} sub={lp.cta.sub} />
    </>
  );
}
