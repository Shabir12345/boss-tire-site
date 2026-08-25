import { ALIGNMENT_OFFERS } from "@/lib/services";

// Live promos, keyed to wheel alignment. The one place red fills a full band.
export function OffersBand() {
  return (
    <section className="bg-[var(--color-red-cta)]">
      <div className="gutter-safe mx-auto flex max-w-6xl flex-col gap-6 py-9 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white/80">Live offer</p>
          <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Buy your tires here, save on the alignment.
          </p>
        </div>
        <ul className="flex flex-col gap-2 sm:flex-row sm:gap-8">
          {ALIGNMENT_OFFERS.map((o) => (
            <li key={o.buy} className="text-white">
              <span className="font-display text-lg font-extrabold uppercase">{o.saving}</span>
              <span className="block text-sm text-white/80">when you buy {o.buy}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
