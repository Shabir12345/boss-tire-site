import Image from "next/image";
import { CallButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { PriceChip, type HeroPrice } from "@/components/sections/PageHeader";
import { BUSINESS } from "@/lib/business";

function Check() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden className="mt-0.5 shrink-0 text-[var(--color-red)]">
      <path d="M4 10.5l3.5 3.5L16 5.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Ad landing page hero. Everything a paid visitor needs to decide sits above
// the fold on a phone: the searched-for words (H1), the price, three proof
// points, the Call button, a no-call alternative, the verifiable Google rating
// and whether the shop is open right now. See LANDING-PAGES.md § Hero.
export function LandingHero({
  eyebrow,
  headline,
  sub,
  bullets,
  image,
  imageAlt,
  price,
}: {
  eyebrow: string;
  headline: string;
  sub: string;
  bullets: readonly string[];
  image: string;
  imageAlt: string;
  price?: HeroPrice;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        fetchPriority="high"
        quality={72}
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/80 to-[var(--color-ink)]/40" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/95 via-[var(--color-ink)]/60 to-transparent" />

      <div className="gutter-safe relative mx-auto w-full max-w-6xl pb-12 pt-10 sm:pb-16 sm:pt-16">
        <Eyebrow onDark>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl text-white sm:text-6xl">{headline}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-on-dark)]">{sub}</p>

        <ul className="mt-5 grid max-w-2xl gap-2 sm:grid-cols-3 sm:gap-4">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2 text-[15px] font-semibold leading-snug text-white">
              <Check />
              {b}
            </li>
          ))}
        </ul>

        {price && (
          <div className="mt-6">
            <PriceChip price={price} />
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <CallButton size="lg" className="cta-attention" trackLocation="lp_hero" />
          <a
            href="#quote"
            className="inline-flex min-h-14 items-center justify-center rounded-md border border-white/30 px-6 py-4 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
          >
            Get a quote by message
          </a>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <ReviewBadge onDark />
          <OpenStatus
            onDark
            suffix={`${BUSINESS.address.street.split(",")[0]}, ${BUSINESS.address.locality}`}
            closedHint={
              <a href="#quote" className="font-semibold text-white underline underline-offset-4">
                Message us and we'll call you back
              </a>
            }
          />
        </div>
      </div>
    </section>
  );
}
