import { servicesByCategory, formatPrice } from "@/lib/services";

// Signature: the spec sheet. Published prices as an industrial parts list —
// hairline rows, service + inclusions left, tabular price hard-right. Both the
// brand's precision voice and its strongest conversion asset (competitors hide
// prices; Boss Tire shows them).
export function PriceSheet() {
  const groups = servicesByCategory();

  return (
    <div className="space-y-10">
      {groups.map(({ category, items }) => (
        <div key={category}>
          <h3 className="flex items-baseline gap-3 text-2xl font-bold text-[var(--color-heading)]">
            {category}
            <span className="h-px flex-1 bg-[var(--color-border)]" aria-hidden />
          </h3>

          <ul className="mt-4">
            {items.map((s) => (
              <li
                key={s.slug}
                className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] py-4 last:border-0"
              >
                <div className="min-w-0">
                  <p className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">
                    {s.name}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--color-body)]">{s.blurb}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="tabular font-display text-2xl font-extrabold text-[var(--color-heading)]">
                    {formatPrice(s.price)}
                  </span>
                  {s.priceNote && (
                    <span className="mt-0.5 block text-xs text-[var(--color-muted)]">{s.priceNote}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="text-xs text-[var(--color-muted)]">
        Prices shown before tax. Some jobs vary by vehicle — call for an exact quote in under a minute.
      </p>
    </div>
  );
}
