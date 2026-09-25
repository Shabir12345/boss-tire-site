import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTABand } from "@/components/sections/CTABand";
import { LeadForm } from "@/components/contact/LeadForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CallButton } from "@/components/ui/Button";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS, addressDisplay, mapsLinkHref } from "@/lib/business";
import { getService, formatPrice, requirePrice } from "@/lib/services";
import { AD_LANDING_PAGES, adLandingPath, adLandingTitle, getAdLandingPage, type AdLandingKind } from "@/lib/adLandingPages";

// Google Ads landing pages, one per ad group (see lib/adLandingPages.ts).
// Pre-rendered at build time; any slug not in the list 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return AD_LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getAdLandingPage((await params).slug);
  if (!page) return {};
  return {
    ...buildMetadata({ title: adLandingTitle(page), description: page.metaDescription, path: adLandingPath(page.slug) }),
    // Paid-traffic page: kept out of organic search (AdsBot ignores noindex).
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

const changeover = getService("tire-changeover")!;
const storage = getService("tire-storage")!;
const changeoverPrice = `${formatPrice(requirePrice(changeover))} and up`;

const COPY: Record<
  AdLandingKind,
  {
    service: string;
    image: string;
    imageAlt: string;
    priceLabel: string;
    priceNote: string;
    included: readonly string[];
    whyEyebrow: string;
    whyHeading: string;
    why: string[];
    faqs: { q: string; a: string }[];
    ctaHeading: string;
    ctaSub: string;
  }
> = {
  changeover: {
    service: "Tire changeover",
    image: "/photos/winter-changeover.jpg",
    imageAlt: "A tire being mounted onto a rim on a tire machine",
    priceLabel: changeoverPrice,
    priceNote: "Depending on vehicle. Call with your make and model for the exact price.",
    included: changeover.included,
    whyEyebrow: "Why timing matters",
    whyHeading: "The 7°C rule",
    why: [
      "Winter tires are about the rubber compound, not just the snow. Below roughly 7°C, all-season tires stiffen and lose grip, and it shows up in braking distance on a cold, dry road well before the first storm.",
      "Changeover demand jumps from mid-October. Book early and you pick the time instead of waiting through the November rush.",
    ],
    faqs: [
      {
        q: "How much is a tire changeover?",
        a: `${changeoverPrice}, depending on your vehicle. Call ${BUSINESS.phoneDisplay} with your make and model and we'll give you the price for yours.`,
      },
      {
        q: "How long does it take?",
        a: "An on-rim swap is a same-day job while you wait. Tires that need mounting and balancing onto your rims take a little longer, and we quote a realistic time when you book.",
      },
      {
        q: "When should I put winter tires on?",
        a: "Once daytime temperatures stay below about 7°C, usually late October to mid-November in Toronto.",
      },
      {
        q: "Can you store my off-season set?",
        a: "Yes. We keep it clean and dry and tag it by wheel position, so the next changeover puts each tire back where it came from. Call for your storage price.",
      },
    ],
    ctaHeading: "Beat the November rush",
    ctaSub: "Call now, pick your changeover time, and skip the week everyone else is waiting in line.",
  },
  storage: {
    service: "Tire storage",
    image: "/photos/winter-tires.jpg",
    imageAlt: "A winter tire on a snow-covered road",
    priceLabel: "Call for your price",
    priceNote: `Call ${BUSINESS.phoneDisplay} and we'll tell you what your set costs to store.`,
    included: storage.included,
    whyEyebrow: "Why store with us",
    whyHeading: "Get your garage back",
    why: [
      "A home garage swings hot in summer and cold in winter, and damp corners or direct sun through a window age rubber faster than it should. Your set sits clean and dry with us instead.",
      "Most people hand over the set they just took off at their changeover, in the same visit.",
    ],
    faqs: [
      {
        q: "How much does tire storage cost?",
        a: `Call ${BUSINESS.phoneDisplay} and we'll give you the exact number for your set over the phone.`,
      },
      {
        q: "How are the tires stored?",
        a: "Clean and dry, and tagged by position before they go on the shelf, so they go back on the same corner they came off at your next changeover.",
      },
      {
        q: "When do I bring them in?",
        a: `At your changeover is easiest. Walk-ins are welcome, ${BUSINESS.hours.weekdays}.`,
      },
      {
        q: "Can you do the changeover too?",
        a: `Yes. A tire changeover is ${changeoverPrice}, depending on vehicle, and we can take your off-season set in the same visit.`,
      },
    ],
    ctaHeading: "Reserve your storage space",
    ctaSub: "Call the shop, get your storage price, and drop your set off at your changeover.",
  },
};

function Fact({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white/60">{label}</p>
      {href ? (
        <a href={href} className="mt-1 block text-sm text-white underline-offset-4 hover:underline" data-track-location="lp_hero">
          {value}
        </a>
      ) : (
        <p className="mt-1 text-sm text-white">{value}</p>
      )}
    </div>
  );
}

export default async function AdLandingPage({ params }: Props) {
  const page = getAdLandingPage((await params).slug);
  if (!page) notFound();
  const c = COPY[page.kind];

  return (
    <>
      {/* Hero: headline matches the ad, call + short form above the fold. */}
      <section className="relative isolate overflow-hidden bg-[var(--color-ink)]">
        <Image src={c.image} alt={c.imageAlt} fill priority fetchPriority="high" quality={72} sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink)]/85 to-[var(--color-ink)]/55" />
        <div className="gutter-safe relative mx-auto grid max-w-6xl gap-10 pt-28 pb-14 sm:pt-32 lg:grid-cols-[1fr_24rem] lg:items-center lg:gap-14 lg:pb-20">
          <div>
            <Eyebrow onDark>Boss Tire · {BUSINESS.address.locality}</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-4xl text-white sm:text-6xl">{page.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-on-dark)]">{page.sub}</p>
            <p className="mt-6 inline-flex items-baseline gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2">
              <span className="font-display text-sm font-bold uppercase tracking-wide text-white/70">{c.service}</span>
              <span className="tabular font-display text-2xl font-bold uppercase text-white">{c.priceLabel}</span>
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <CallButton size="lg" className="cta-attention" trackLocation="lp_hero" />
              <ReviewBadge onDark />
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-6 border-t border-white/10 pt-6">
              <Fact label="Hours" value="Mon–Sat, 9 AM – 7 PM" />
              <Fact label="Address" value={addressDisplay} href={mapsLinkHref} />
            </div>
          </div>

          <div id="book" className="rounded-lg bg-[var(--color-paper)] p-6 shadow-xl sm:p-7">
            <p className="font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">Request a time</p>
            <p className="mt-1 text-sm text-[var(--color-body)]">Leave your number and the shop will call you back.</p>
            <div className="mt-5">
              <LeadForm service={`${c.service} (${page.keyword})`} trackLocation="lp_form" />
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto grid max-w-6xl gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">
              {page.kind === "storage" ? "What storage includes" : `${c.service}, ${c.priceLabel}`}
            </h2>
            <p className="mt-3 text-[var(--color-body)]">{c.priceNote}</p>
            <ul className="mt-6 space-y-2">
              {c.included.map((inc) => (
                <li key={inc} className="flex gap-2 text-[var(--color-body)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                  {inc}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-smoke)] p-6 sm:p-8">
            <Eyebrow>{c.whyEyebrow}</Eyebrow>
            <h2 className="mt-4 text-2xl text-[var(--color-heading)]">{c.whyHeading}</h2>
            {c.why.map((p) => (
              <p key={p} className="mt-3 text-[var(--color-body)]">{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-smoke)]">
        <div className="gutter-safe mx-auto grid max-w-6xl gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)]">Before you book</h2>
            <dl className="mt-8 space-y-6">
              {c.faqs.map((f) => (
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
            <p className="mt-2 text-[var(--color-body)]">
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
              <Link href={page.kind === "storage" ? "/services/tire-storage" : "/winter-tire-changeover"} className="link-grow font-semibold text-[var(--color-red-deep)]">
                {page.kind === "storage" ? "tire storage" : "winter changeovers"}
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>

      <CTABand heading={c.ctaHeading} sub={c.ctaSub} />
    </>
  );
}
