import { Eyebrow } from "@/components/ui/Eyebrow";
import { ALIGNMENT_OFFERS, formatPrice, type Service } from "@/lib/services";

// The price and what's included, straight from services.ts, so a landing page
// can never quote a number the rest of the site doesn't. No price on file →
// "Call for a quote", never a guess.
export function ServicePriceCard({ service, showAlignmentOffers = false }: { service: Service; showAlignmentOffers?: boolean }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-paper)] p-6 shadow-sm sm:p-7">
      <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-5">
        <h3 className="text-xl text-[var(--color-heading)]">{service.name}</h3>
        <div className="shrink-0 text-right">
          {service.price !== undefined ? (
            <span className="tabular font-display text-4xl font-extrabold text-[var(--color-heading)]">
              {formatPrice(service.price)}
            </span>
          ) : (
            <span className="font-display text-sm font-bold uppercase tracking-wide text-[var(--color-red-deep)]">
              Call for a quote
            </span>
          )}
          {service.priceNote && <span className="block text-xs text-[var(--color-muted)]">{service.priceNote}</span>}
        </div>
      </div>

      <Eyebrow className="mt-5">What's included</Eyebrow>
      <ul className="mt-3 space-y-2">
        {service.included.map((inc) => (
          <li key={inc} className="flex gap-3 text-[var(--color-body)]">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
            {inc}
          </li>
        ))}
      </ul>

      {showAlignmentOffers && (
        <div className="mt-6">
          <span className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-red-deep)]">
            Buy tires, save on the alignment
          </span>
          <ul className="mt-3 space-y-2">
            {ALIGNMENT_OFFERS.map((o) => (
              <li key={o.buy} className="flex items-center gap-3 rounded-lg bg-[var(--color-smoke)] px-4 py-3 text-sm text-[var(--color-heading)]">
                <span className="font-display text-xl font-extrabold text-[var(--color-red)]">{o.saving.split(" ")[0]}</span>
                {o.saving.replace(/^\S+\s/, "")} when you buy {o.buy}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-5 text-xs text-[var(--color-muted)]">Prices before tax. You approve the price before any work starts.</p>
    </div>
  );
}
