import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LandingHero } from "@/components/landing/LandingHero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ReviewQuotes } from "@/components/sections/LocalTrust";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CallButton } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS, addressDisplay, mapsLinkHref } from "@/lib/business";
import { LANDING_PAGES, getLandingPage } from "@/lib/landing-pages";
import { ALIGNMENT_OFFERS, getService } from "@/lib/services";

// ─── Google Ads landing page template ───────────────────────────────────────
// Every /lp/<slug> page is this file filled from one LANDING_PAGES entry. The
// section order is the standard (LANDING-PAGES.md): answer + form → proof →
// what you get and process → objections + visit → last call. No prices: the
// price is given on the call (owner decision 2026-09-29). Change it here and every
// landing page changes with it.

const NO_TIME_PROMISE = /same[- ]day|while you wait|in and out/i;

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
  const service = lp && getService(lp.service);
  if (!lp || !service) notFound();

  return (
    <>
      <LandingHero
        eyebrow={lp.hero.eyebrow}
        headline={lp.hero.headline}
        sub={lp.hero.sub}
        image={lp.hero.image}
        imageAlt={lp.hero.imageAlt}
        bookLabel={lp.bookLabel}
        service={`${service.name} (${lp.keyword})`}
        source={`lp_${lp.slug}`}
      />
      <TrustStrip variant="landing" />
      <ReviewQuotes service={lp.service} />

      {/* What you get (services.ts) beside what happens when you come in. */}
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto grid max-w-6xl gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">What your {service.name.toLowerCase()} includes</h2>
            <p className="mt-3 text-[var(--color-body)]">
              The price depends on your vehicle. Call {BUSINESS.phoneDisplay} and we&apos;ll give it to you on the call, before any work starts.
            </p>
            <ul className="mt-6 space-y-2">
              {/* services.ts is shared with the organic pages; drop turnaround
                  promises the ad pages don't make. */}
              {service.included.filter((inc) => !NO_TIME_PROMISE.test(inc)).map((inc) => (
                <li key={inc} className="flex gap-2 text-[var(--color-body)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                  {inc}
                </li>
              ))}
            </ul>
            {lp.showAlignmentOffers && (
              <ul className="mt-6 space-y-2">
                {ALIGNMENT_OFFERS.map((o) => (
                  <li key={o.buy} className="rounded-md bg-[var(--color-smoke)] px-4 py-3 text-sm text-[var(--color-heading)]">
                    <span className="font-semibold">{o.saving}</span> when you buy {o.buy}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-smoke)] p-6 sm:p-8">
            <Eyebrow>What to expect</Eyebrow>
            <h2 className="mt-4 text-2xl text-[var(--color-heading)]">What happens when you come in</h2>
            <ol className="mt-5 space-y-4">
              {lp.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="tabular font-display text-xl font-extrabold leading-none text-[var(--color-red)]">{i + 1}</span>
                  <div>
                    <p className="font-display text-base font-bold uppercase tracking-wide text-[var(--color-heading)]">{step.title}</p>
                    <p className="mt-1 text-[var(--color-body)]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Objections beside the visit details. */}
      <section className="bg-[var(--color-smoke)]">
        <div className="gutter-safe mx-auto grid max-w-6xl gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Before you book</h2>
            <dl className="mt-8 space-y-6">
              {lp.faqs.map((f) => (
                <div key={f.q} className="border-b border-[var(--color-border)] pb-6 last:border-0">
                  <dt className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">{f.q}</dt>
                  <dd className="mt-2 text-[var(--color-body)]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside className="h-fit rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
            <Eyebrow>Visit the shop</Eyebrow>
            <p className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-[var(--color-heading)]">{BUSINESS.name}</p>
            <p className="mt-2 text-[var(--color-body)]">{addressDisplay}</p>
            <OpenStatus className="mt-3" />
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {BUSINESS.hours.weekdays}
              <br />
              {BUSINESS.hours.weekend}
            </p>
            <a href={mapsLinkHref} className="link-grow mt-4 inline-block font-semibold text-[var(--color-red-deep)]" data-track-location="lp_visit">
              Get directions
            </a>
            <div className="mt-6">
              <CallButton trackLocation="lp_visit" />
            </div>
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              More about{" "}
              <Link href={lp.organicPage} className="link-grow font-semibold text-[var(--color-red-deep)]">
                {service.name.toLowerCase()} at Boss Tire
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>

      <CTABand heading={lp.cta.heading} sub={lp.cta.sub} />
    </>
  );
}
