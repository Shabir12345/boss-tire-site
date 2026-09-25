import { Eyebrow } from "@/components/ui/Eyebrow";

export interface Step {
  title: string;
  body: string;
}

// "What happens when I show up?" as three or four numbered steps. Removes the
// unknowns that stop people calling a shop they've never used: do I need to
// book, will they upsell me, how long will it take, when do I pay.
export function ProcessSteps({
  steps,
  heading = "How it works",
  eyebrow = "What to expect",
  tone = "paper",
}: {
  steps: Step[];
  heading?: string;
  eyebrow?: string;
  tone?: "paper" | "smoke";
}) {
  return (
    <section className={tone === "smoke" ? "bg-[var(--color-smoke)]" : "bg-[var(--color-paper)]"}>
      <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 text-3xl text-[var(--color-heading)] sm:text-4xl">{heading}</h2>
        <ol className={`mt-10 grid gap-8 sm:grid-cols-2 ${steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-[var(--color-heading)] pt-5">
              <span className="tabular font-display text-4xl font-extrabold leading-none text-[var(--color-red)]" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl text-[var(--color-heading)]">{s.title}</h3>
              <p className="mt-2 text-[var(--color-body)]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
