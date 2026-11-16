import { Eyebrow } from "@/components/ui/Eyebrow";
import { GoogleReviewsWidget } from "@/components/sections/GoogleReviewsWidget";
import { QuoteCard, Stars } from "@/components/sections/LocalTrust";
import { REVIEWS, reviewsHref, pickReviews } from "@/lib/reviews";
import { getGoogleReviews } from "@/lib/featurable";

// Homepage Google reviews band. The shop's real Google reviews, verbatim, read
// from Featurable at build time (refreshed daily) and shipped as plain HTML, so
// the band is filled the moment it scrolls into view. It used to be only the
// Featurable widget, which loads on first interaction: until then (and for good
// whenever an ad blocker stops cdn.featurable.com) visitors saw an empty box
// right under the hero. If Featurable can't be reached at build time, the live
// widget still stands in.
export async function ReviewsBand() {
  const { reviews } = pickReviews(await getGoogleReviews(), undefined, 3);

  return (
    <section aria-label="Google reviews" className="bg-[var(--color-smoke)]">
      <div className="gutter-safe mx-auto max-w-6xl py-14 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <Eyebrow>What drivers say</Eyebrow>
            <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
              Rated {REVIEWS.rating} on {REVIEWS.source}
            </h2>
          </div>
          <div className="flex items-center gap-x-4">
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
        </div>

        {reviews.length > 0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <QuoteCard key={r.id} r={r} />
            ))}
          </div>
        ) : (
          <GoogleReviewsWidget className="mt-6" />
        )}
      </div>
    </section>
  );
}
