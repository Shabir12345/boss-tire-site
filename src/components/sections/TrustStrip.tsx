// Slim proof strip used under the hero and on every interior page. Four
// scannable, page-agnostic reasons to trust the shop — each backed by the shop's
// own facts (a priced service list, same-day work, quote-before-work, and the
// full range of services under one roof). No invented claims: no warranties,
// years in business, or certifications the site can't stand behind.
const TRUST = [
  { label: "Prices up front", sub: "Every service, with the price on it" },
  { label: "Same-day service", sub: "In and out, not booked out" },
  { label: "A quote before we start", sub: "You approve the price first" },
  { label: "One shop, every job", sub: "Tires, wheels, alignment, exhaust" },
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
