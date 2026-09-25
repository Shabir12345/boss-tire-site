import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Faq } from "@/lib/services";

// The FAQ block every service page and ad landing page ends on. Answers stay
// open (not accordions): the text is what feeds FAQ schema, Google's "People
// also ask" and AI answers, and on an ad page it is where objections get
// handled, so nobody should have to click to read it. Pair it with <FaqJsonLd>
// on indexable pages.
export function FaqSection({
  faqs,
  heading,
  eyebrow = "Questions",
  tone = "smoke",
  id,
}: {
  faqs: Faq[];
  heading: string;
  eyebrow?: string;
  tone?: "paper" | "smoke";
  id?: string;
}) {
  return (
    <section id={id} className={tone === "smoke" ? "bg-[var(--color-smoke)]" : "bg-[var(--color-paper)]"}>
      <div className="gutter-safe mx-auto max-w-3xl py-16 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 text-3xl text-[var(--color-heading)]">{heading}</h2>
        <dl className="mt-8 space-y-6">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-[var(--color-border)] pb-6 last:border-0">
              <dt className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-heading)]">
                {f.q}
              </dt>
              <dd className="mt-2 text-[var(--color-body)]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
