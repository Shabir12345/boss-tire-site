import Script from "next/script";

// Google reviews via Featurable (cdn.featurable.com). The widget hydrates the
// empty div client-side after the static shell paints, so it never blocks the
// hero — it just fills in below it. The widget already carries its own rating,
// count and star header, so we run it heading-free and let it speak for itself.
// min-height reserves space to limit layout shift while it loads. Sits directly
// under the hero as the first proof point a visitor sees.
export function ReviewsBand() {
  return (
    <section className="bg-[var(--color-smoke)]">
      <div className="gutter-safe mx-auto max-w-6xl py-10 sm:py-12">
        <div className="min-h-[18rem]">
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
