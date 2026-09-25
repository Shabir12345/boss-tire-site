import { Eyebrow } from "@/components/ui/Eyebrow";
import { CallButton } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { GoogleReviewsWidget } from "@/components/sections/GoogleReviewsWidget";
import { BUSINESS, addressDisplay, mapsLinkHref } from "@/lib/business";
import { REVIEWS, reviewsHref, pickReviews, displayName, type GoogleReview } from "@/lib/reviews";
import { getGoogleReviews } from "@/lib/featurable";
import { getService } from "@/lib/services";

// "Is this a real shop, and do people like it?" answered in one band, right
// before the page's closing CTA: what other drivers said, plus where the shop
// is and whether it's open right now. Every service page and ad landing page
// carries it. Nothing here is invented: the reviews are the shop's real Google
// reviews, verbatim, read from Featurable at build time, with the ones that
// mention this page's service shown first. If Featurable can't be reached, the
// live widget stands in.

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="flex text-[var(--color-red)]" aria-label={`${n} out of 5 stars`} role="img">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden>
          <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.95 2.6.95-5.5-4-3.9 5.53-.8L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

const monthLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("en-CA", { month: "short", year: "numeric", timeZone: "America/Toronto" });

function QuoteCard({ r }: { r: GoogleReview }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-5">
      <Stars n={Math.round(r.rating)} />
      {/* Full verbatim text stays in the page; long reviews are only visually clamped. */}
      <blockquote className="mt-3 line-clamp-6 flex-1 whitespace-pre-line text-[var(--color-heading)]">“{r.text}”</blockquote>
      <figcaption className="mt-4 text-sm text-[var(--color-muted)]">
        <span className="font-semibold text-[var(--color-body)]">{displayName(r.author)}</span> · Google review · {monthLabel(r.publishedAt)}
      </figcaption>
    </figure>
  );
}

function VisitCard() {
  return (
    <div className="rounded-xl bg-[var(--color-ink)] p-6 text-[var(--color-on-dark)] sm:p-7">
      <Eyebrow onDark>Visit the shop</Eyebrow>
      <p className="mt-4 font-display text-2xl font-bold uppercase leading-tight text-white">
        {BUSINESS.address.street}
        <br />
        {BUSINESS.address.locality}, {BUSINESS.address.region}
      </p>
      <a
        href={mapsLinkHref}
        target="_blank"
        rel="noopener noreferrer"
        data-track-location="local_trust"
        className="link-grow mt-2 inline-block text-sm font-semibold text-white"
      >
        Get directions <span aria-hidden>→</span>
        <span className="sr-only"> to {addressDisplay} (opens Google Maps)</span>
      </a>

      <div className="mt-6 border-t border-white/10 pt-5">
        <OpenStatus onDark />
        <p className="mt-2 text-sm text-[var(--color-on-dark-mute)]">
          {BUSINESS.hours.weekdays} · {BUSINESS.hours.weekend}
        </p>
        <p className="mt-2 text-sm text-[var(--color-on-dark-mute)]">Walk-ins welcome. Call ahead and we'll have a bay ready.</p>
      </div>

      <CallButton className="mt-6 w-full" trackLocation="local_trust" />
    </div>
  );
}

export async function LocalTrust({
  service,
  heading = "Don't take our word for it",
  tone = "smoke",
}: {
  /** services.ts slug (or a REVIEW_KEYWORDS key like "tires") — reviews about it are shown first. */
  service?: string;
  heading?: string;
  tone?: "paper" | "smoke";
}) {
  const { reviews: quotes, matched } = pickReviews(await getGoogleReviews(), service, 3);
  const serviceName = service ? (getService(service)?.shortName ?? service.replace(/-/g, " ")).toLowerCase() : undefined;

  return (
    <section aria-label="Reviews and location" className={tone === "smoke" ? "bg-[var(--color-smoke)]" : "bg-[var(--color-paper)]"}>
      <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <Eyebrow>{matched > 0 && serviceName ? `What drivers say about ${serviceName}` : "What drivers say"}</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">{heading}</h2>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="tabular font-display text-5xl font-extrabold leading-none text-[var(--color-heading)]">
                {REVIEWS.rating}
              </span>
              <div>
                <Stars />
                <a
                  href={reviewsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="view_reviews"
                  className="link-grow mt-1 inline-block text-sm font-semibold text-[var(--color-red-deep)]"
                >
                  Read all {REVIEWS.count} reviews on {REVIEWS.source}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>

            {quotes.length > 0 ? (
              <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {quotes.map((r) => (
                  <QuoteCard key={r.id} r={r} />
                ))}
              </div>
            ) : (
              <GoogleReviewsWidget className="mt-6" />
            )}
          </div>

          <VisitCard />
        </div>
      </div>
    </section>
  );
}
