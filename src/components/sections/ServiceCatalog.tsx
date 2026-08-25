import { servicesByCategory, formatPrice } from "@/lib/services";
import { CallButton } from "@/components/ui/Button";

// Detailed service list — the spec sheet plus the inclusions the old site never
// surfaced (they lived only in WooCommerce product descriptions). Each service
// is a card: name + price header, blurb, and what the job covers.
export function ServiceCatalog() {
  const groups = servicesByCategory();

  return (
    <div className="space-y-14">
      {groups.map(({ category, items }) => (
        <div key={category}>
          <h2 className="flex items-baseline gap-3 text-2xl text-[var(--color-heading)] sm:text-3xl">
            {category}
            <span className="h-px flex-1 bg-[var(--color-border)]" aria-hidden />
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {items.map((s) => (
              <div key={s.slug} id={s.slug} className="scroll-mt-24 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
                    {s.name}
                  </h3>
                  <div className="shrink-0 text-right">
                    <span className="tabular font-display text-2xl font-extrabold text-[var(--color-heading)]">
                      {formatPrice(s.price)}
                    </span>
                    {s.priceNote && (
                      <span className="mt-0.5 block text-xs text-[var(--color-muted)]">{s.priceNote}</span>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm text-[var(--color-body)]">{s.blurb}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.included.map((inc) => (
                    <li key={inc} className="flex gap-2 text-sm text-[var(--color-body)]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col items-start gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-smoke)] p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--color-body)]">
          Prices shown before tax. Some jobs vary by vehicle — call for an exact quote in under a minute.
        </p>
        <CallButton className="shrink-0" />
      </div>
    </div>
  );
}
