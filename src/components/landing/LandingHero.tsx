import Image from "next/image";
import { CallButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { LeadForm } from "@/components/landing/LeadForm";
import { addressDisplay, mapsLinkHref } from "@/lib/business";

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white/60">{label}</p>
      <div className="mt-1 text-sm text-white">{children}</div>
    </div>
  );
}

// Ad landing page hero, two columns: the answer on the left (the searched-for
// words as the H1, a quote line, Call, rating, hours and address) and the call-back
// form on the right. On a phone the form stacks under the Call button, which
// stays above the fold. See LANDING-PAGES.md § Hero.
export function LandingHero({
  eyebrow,
  headline,
  sub,
  image,
  imageAlt,
  bullets,
  bookLabel,
  formHeading = "Request a time",
  formSub = "Leave your number and the shop will call you back.",
  service,
  source,
  askTireSize = false,
}: {
  eyebrow: string;
  headline: string;
  sub: string;
  image: string;
  imageAlt: string;
  /** Three short reasons to pick the shop, shown as a checklist under the sub. */
  bullets: readonly string[];
  /** Form button, e.g. "Book my changeover". */
  bookLabel: string;
  formHeading?: string;
  formSub?: string;
  /** Service name, written into the lead email. */
  service: string;
  /** "lp_<slug>", passed to the form. */
  source: string;
  /** Show the optional tire size field (tire-sales pages). */
  askTireSize?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)]">
      <Image src={image} alt={imageAlt} fill priority fetchPriority="high" quality={72} sizes="100vw" className="object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink)]/85 to-[var(--color-ink)]/55"
      />

      <div className="gutter-safe relative mx-auto grid w-full max-w-6xl gap-10 pb-14 pt-10 sm:pt-16 lg:grid-cols-[1fr_24rem] lg:items-center lg:gap-14 lg:pb-20">
        <div>
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          {/* On a phone the rating beside the Call button wraps below the fold,
              so the first screen had no proof at all. Show it above the H1 there. */}
          <div className="mt-3 sm:hidden">
            <ReviewBadge onDark />
          </div>
          <h1 className="mt-3 max-w-3xl text-4xl text-white sm:mt-4 sm:text-6xl">{headline}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-on-dark)]">{sub}</p>

          <ul className="mt-6 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-base font-medium text-white sm:text-lg">
                <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden className="mt-0.5 shrink-0 text-[var(--color-red)] sm:mt-1">
                  <path d="M4 10.5l3.5 3.5L16 5.5" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
          {/* No price on ad pages: it's given on the call (owner decision 2026-09-29). */}
          <p className="mt-4 text-sm text-[var(--color-on-dark-mute)]">Price for your vehicle given on the call. Nothing starts until you approve it.</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <CallButton size="lg" className="cta-attention" trackLocation="lp_hero" />
            <span className="hidden sm:block">
              <ReviewBadge onDark />
            </span>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-2 gap-6 border-t border-white/10 pt-6">
            <Fact label="Hours">
              <OpenStatus onDark />
            </Fact>
            <Fact label="Address">
              <a href={mapsLinkHref} className="underline-offset-4 hover:underline" data-track-location="lp_hero">
                {addressDisplay}
              </a>
            </Fact>
          </div>
        </div>

        <div id="quote" className="scroll-mt-20 rounded-lg bg-[var(--color-paper)] p-6 shadow-xl sm:p-7">
          <p className="font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">{formHeading}</p>
          <p className="mt-1 text-sm text-[var(--color-body)]">{formSub}</p>
          <div className="mt-5">
            <LeadForm service={service} source={source} submitLabel={bookLabel} askTireSize={askTireSize} />
          </div>
        </div>
      </div>
    </section>
  );
}
