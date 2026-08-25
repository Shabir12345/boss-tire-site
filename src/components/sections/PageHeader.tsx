import { Eyebrow } from "@/components/ui/Eyebrow";
import { CallButton } from "@/components/ui/Button";
import { ReviewBadge } from "@/components/ui/ReviewBadge";

// Dark interior page header. pt clears the sticky header.
export function PageHeader({
  eyebrow,
  title,
  sub,
  showCall = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  showCall?: boolean;
}) {
  return (
    <section className="bg-[var(--color-ink)]">
      <div className="gutter-safe mx-auto max-w-6xl pt-28 pb-14 sm:pt-32 sm:pb-16">
        <Eyebrow onDark>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl text-white sm:text-6xl">{title}</h1>
        {sub && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-on-dark)]">{sub}</p>}
        {showCall && (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <CallButton size="lg" className="cta-attention" />
            <ReviewBadge onDark />
          </div>
        )}
      </div>
    </section>
  );
}
