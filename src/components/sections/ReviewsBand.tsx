import Script from "next/script";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { REVIEWS } from "@/lib/reviews";

// Google reviews via Featurable (cdn.featurable.com). The widget hydrates the
// empty div client-side after the static shell paints, so it never blocks the
// hero — it just fills in below it. min-height reserves space to limit the
// layout shift while the widget loads. Sits directly under the hero as the
// first proof point a visitor sees.
export function ReviewsBand() {
  return (
    <section className="bg-[var(--color-smoke)]">
      <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
        <Eyebrow>Reviews</Eyebrow>
        <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">
          {REVIEWS.rating}★ from {REVIEWS.count} Scarborough drivers
        </h2>
        <div className="mt-10 min-h-[20rem]">
          <div id="featurable-f8f9515f-8222-46e5-9efa-5bedccc87079" data-featurable-async="" />
        </div>
      </div>
      <Script
        src="https://cdn.featurable.com/widget/v2/embed.js"
        strategy="afterInteractive"
        charSet="UTF-8"
      />
    </section>
  );
}
