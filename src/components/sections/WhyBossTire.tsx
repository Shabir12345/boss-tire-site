import { Eyebrow } from "@/components/ui/Eyebrow";
import { REVIEWS } from "@/lib/reviews";

const WHY = [
  {
    title: "Prices on the page",
    body: "Most Scarborough shops make you call for a number. Ours are published — decide before you dial.",
  },
  {
    title: "Same-day service",
    body: "Tires, alignment, oil and exhaust done while you wait, not booked out for a week.",
  },
  {
    title: "Free inclusions",
    body: "Balancing, tire pressure and a condition check come with the job — things other shops add to the bill.",
  },
  {
    title: `${REVIEWS.rating}★ from ${REVIEWS.count} drivers`,
    body: "Scarborough's own keep coming back to Danforth Rd. The reviews are on Google.",
  },
];

export function WhyBossTire({ onDark = false }: { onDark?: boolean }) {
  return (
    <section className={onDark ? "bg-[var(--color-ink)]" : ""}>
      <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
        <Eyebrow onDark={onDark}>Why Boss Tire</Eyebrow>
        <h2 className={`mt-4 max-w-2xl text-3xl sm:text-4xl ${onDark ? "text-white" : "text-[var(--color-heading)]"}`}>
          The honest shop on Danforth Rd
        </h2>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {WHY.map((w) => (
            <div key={w.title} className="flex gap-4">
              <span className="mt-1 h-8 w-1 shrink-0 rounded-full bg-[var(--color-red)]" aria-hidden />
              <div>
                <h3 className={`text-xl font-bold ${onDark ? "text-white" : "text-[var(--color-heading)]"}`}>
                  {w.title}
                </h3>
                <p className={`mt-1.5 ${onDark ? "text-[var(--color-on-dark)]" : "text-[var(--color-body)]"}`}>
                  {w.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
