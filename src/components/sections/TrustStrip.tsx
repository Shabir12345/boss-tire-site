// Slim proof strip that sits directly under the hero, before the reviews. Four
// scannable reasons to trust the shop — every one verifiable from the shop's own
// facts (published prices, same-day, free inclusions, quote-before-work). No
// invented claims (no warranties, years, or certifications the site can't back).
const TRUST = [
  { label: "Prices published", sub: "No surprise quotes" },
  { label: "Same-day service", sub: "In and out, not booked out" },
  { label: "Balancing included", sub: "Plus a free condition check" },
  { label: "Quote before we start", sub: "You approve the price first" },
];

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden className="shrink-0 text-[var(--color-red)]">
      <path d="M4 10.5l3.5 3.5L16 5.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrustStrip() {
  return (
    <section className="border-b border-[var(--color-hairline-dark)] bg-[var(--color-carbon)]">
      <div className="gutter-safe mx-auto max-w-6xl">
        <ul className="grid grid-cols-2 divide-[var(--color-hairline-dark)] sm:grid-cols-4 sm:divide-x">
          {TRUST.map((t) => (
            <li key={t.label} className="flex items-start gap-2.5 px-1 py-5 sm:justify-center sm:px-5">
              <CheckMark />
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wide leading-none text-white">
                  {t.label}
                </p>
                <p className="mt-1 text-xs text-[var(--color-on-dark-mute)]">{t.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
