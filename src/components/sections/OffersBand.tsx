import { ALIGNMENT_OFFERS } from "@/lib/services";

// Live promos as a news-style headline crawl. The one place red fills a full
// band. A fixed "Live offer" chyron tag sits on the left; the offers scroll
// past it on an infinite loop (see .ticker-track in globals.css). The headline
// group is rendered twice so the -50% slide loops with no visible seam.
const HEADLINES = [
  "Buy your tires here, save on the alignment",
  ...ALIGNMENT_OFFERS.map((o) => `${o.saving} when you buy ${o.buy}`),
  "Same-day service on Danforth Rd, Scarborough",
];

function HeadlineGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {HEADLINES.map((line, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 text-base font-bold text-white sm:px-8 sm:text-lg">{line}</span>
          <span className="text-white/45" aria-hidden>
            ◆
          </span>
        </span>
      ))}
    </div>
  );
}

export function OffersBand() {
  return (
    <section aria-label="Live offers" className="overflow-hidden bg-[var(--color-red-cta)]">
      <div className="flex items-stretch">
        {/* Chyron tag — fixed, does not scroll. */}
        <div className="relative z-10 flex shrink-0 items-center gap-2 bg-[var(--color-red-deep)] px-4 shadow-[8px_0_16px_-6px_rgba(0,0,0,0.35)] sm:px-6">
          <span className="live-dot h-2 w-2 rounded-full bg-white" aria-hidden />
          <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
            Live offer
          </span>
        </div>

        {/* Scrolling headline crawl. */}
        <div className="ticker-mask relative flex-1 overflow-hidden py-4">
          <div className="ticker-track">
            <HeadlineGroup />
            <HeadlineGroup ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
