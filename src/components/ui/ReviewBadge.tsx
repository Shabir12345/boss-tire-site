import { REVIEWS } from "@/lib/reviews";

// Google-rating trust badge: five brand-red stars (kept red, not gold — the
// system runs one accent colour) plus the rating and review count. Reads the
// numbers from lib/reviews so it never drifts from the schema or the widget.
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
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex text-[var(--color-red)]" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} />
        ))}
      </span>
      <span className={`text-sm ${onDark ? "text-[var(--color-on-dark)]" : "text-[var(--color-body)]"}`}>
        <span className={`tabular font-semibold ${onDark ? "text-white" : "text-[var(--color-heading)]"}`}>
          {REVIEWS.rating}
        </span>{" "}
        from {REVIEWS.count} {REVIEWS.source} reviews
      </span>
    </div>
  );
}
