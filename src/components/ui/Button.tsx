"use client";

import Link from "next/link";
import { BUSINESS, telHref } from "@/lib/business";

export type ButtonVariant = "primary" | "ghost" | "ghostDark";
export type ButtonSize = "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  /** Names the section for analytics — read by AnalyticsListener on click. */
  trackLocation?: string;
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} style={{ flexShrink: 0 }}>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

// Condensed display type on buttons keeps the motorsport voice consistent.
const base = [
  "group/btn inline-flex items-center justify-center gap-2.5",
  "font-display font-bold uppercase tracking-wide leading-none select-none cursor-pointer",
  "transition-[transform,box-shadow,background-color,color,border-color] duration-200",
  "[transition-timing-function:var(--ease-out-quart)]",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] focus-visible:ring-offset-2",
].join(" ");

const sizeMap: Record<ButtonSize, string> = {
  md: "text-base px-5 py-3 min-h-12 rounded-md focus-visible:ring-offset-[var(--color-paper)]",
  lg: "text-xl px-8 py-4 min-h-14 sm:min-h-15 rounded-md focus-visible:ring-offset-[var(--color-paper)]",
};

// Primary: white-on-red. #FFFFFF on #C81922 ≈ 4.7:1 (AA).
const primaryStyles = [
  "bg-[var(--color-red-cta)] text-white shadow-sm",
  "hover:bg-[var(--color-red-deep)] hover:-translate-y-0.5 hover:shadow-md",
  "active:translate-y-0 active:scale-[0.98] active:duration-75",
].join(" ");

// Ghost on light: bordered.
const ghostStyles = [
  "bg-transparent text-[var(--color-heading)] border border-[var(--color-border)]",
  "hover:border-[var(--color-red)] hover:text-[var(--color-red-deep)]",
  "active:scale-[0.98] active:duration-75",
].join(" ");

// Ghost on ink: bordered, light text.
const ghostDarkStyles = [
  "bg-transparent text-white border border-white/25",
  "hover:border-white hover:bg-white/5",
  "active:scale-[0.98] active:duration-75 focus-visible:!ring-offset-[var(--color-ink)]",
].join(" ");

const variantMap: Record<ButtonVariant, string> = {
  primary: primaryStyles,
  ghost: ghostStyles,
  ghostDark: ghostDarkStyles,
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className = "",
  "aria-label": ariaLabel,
  trackLocation,
}: ButtonProps) {
  const classes = `${base} ${sizeMap[size]} ${variantMap[variant]} ${className}`.trim();

  if (href) {
    if (/^(tel:|mailto:|https?:)/.test(href)) {
      return (
        <a href={href} onClick={onClick} className={classes} aria-label={ariaLabel} data-track-location={trackLocation}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={classes} aria-label={ariaLabel} data-track-location={trackLocation}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel} data-track-location={trackLocation}>
      {children}
    </button>
  );
}

// CallButton — call-first law: always the primary (red) button on its surface.
// `trackLocation` names the placement so analytics can tell which section's call
// button actually gets tapped (defaults to a generic label if unset).
export function CallButton({
  className,
  size = "md",
  compact = false,
  trackLocation = "call_button",
}: {
  className?: string;
  size?: ButtonSize;
  compact?: boolean;
  trackLocation?: string;
}) {
  return (
    <Button
      variant="primary"
      size={size}
      href={telHref}
      aria-label={`Call Boss Tire at ${BUSINESS.phoneDisplay}`}
      className={className}
      trackLocation={trackLocation}
    >
      <PhoneIcon className="group-hover/btn:animate-[phoneRing_0.6s_ease-in-out]" />
      {compact ? (
        <>
          <span className="sm:hidden">Call</span>
          <span className="hidden sm:inline">Call {BUSINESS.phoneDisplay}</span>
        </>
      ) : (
        <>Call {BUSINESS.phoneDisplay}</>
      )}
    </Button>
  );
}
