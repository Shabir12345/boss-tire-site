import { GoogleReviewsWidget } from "@/components/sections/GoogleReviewsWidget";

// Homepage Google reviews band — the live Featurable widget, loaded on first
// interaction (see GoogleReviewsWidget) to keep it off the LCP critical path.
export function ReviewsBand() {
  return (
    <section className="bg-[var(--color-smoke)]">
      <div className="gutter-safe mx-auto max-w-6xl py-0">
        <GoogleReviewsWidget />
      </div>
    </section>
  );
}
