import { REVIEWS, reviewsHref } from "@/lib/reviews";

// Google-rating trust badge: five brand-red stars (kept red, not gold — the
// system runs one accent colour) plus the rating and review count. Reads the
// numbers from lib/reviews so it never drifts from the schema or the widget.
// Linked to the Google listing by default: a rating the visitor can click
// through and check is a trust signal; an unlinked one reads as a claim.
function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden className={className}>
      <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.95 2.6.95-5.5-4-3.9 5.53-.8L10 1.6z" />
    </svg>
  );
}

export function ReviewBadge({
  onDark = false,
  className = "",
  link = true,
}: {
  onDark?: boolean;
  className?: string;
  link?: boolean;
}) {
  const inner = (
    <>
      <span className="flex text-[var(--color-red)]" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} />
        ))}
      </span>
      <span className={`text-sm ${onDark ? "text-[var(--color-on-dark)]" : "text-[var(--color-body)]"}`}>
        <span className={`tabular font-semibold ${onDark ? "text-white" : "text-[var(--color-heading)]"}`}>
          {REVIEWS.rating}
        </span>{" "}
        from{" "}
        <span className={link ? "underline decoration-1 underline-offset-4" : ""}>
          {REVIEWS.count} {REVIEWS.source} reviews
        </span>
      </span>
    </>
  );

  if (!link) return <div className={`inline-flex items-center gap-2 ${className}`}>{inner}</div>;

  return (
    <a
      href={reviewsHref}
      target="_blank"
      rel="noopener noreferrer"
      data-track-event="view_reviews"
      className={`inline-flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] ${className}`}
    >
      {inner}
      <span className="sr-only">(opens Google in a new tab)</span>
    </a>
  );
}
