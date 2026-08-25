import { TreadMark } from "@/components/ui/TreadMark";

// Section eyebrow: tread mark + condensed uppercase label. `onDark` flips it for
// ink bands. One of the recurring signature marks (DESIGN.md).
export function Eyebrow({
  children,
  onDark = false,
  className = "",
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <TreadMark className="h-4 w-4 text-[var(--color-red)]" />
      <span
        className={`font-display text-sm font-bold uppercase tracking-[0.18em] ${
          onDark ? "text-white/70" : "text-[var(--color-muted)]"
        }`}
      >
        {children}
      </span>
    </span>
  );
}
