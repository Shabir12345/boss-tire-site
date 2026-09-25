"use client";

import { useEffect, useState } from "react";
import { shopStatus, type ShopStatus } from "@/lib/hours";
import { BUSINESS } from "@/lib/business";

// Live "Open now · until 7 PM" / "Closed · opens tomorrow at 9 AM" line. Pages
// are static, so the status is computed on the client after mount (rendering it
// at build time would freeze whatever the time was during the deploy). Until
// then it reserves its line with the plain hours so nothing shifts.
//
// When closed, `closedHint` tells an after-hours ad visitor what to do instead
// of calling a shop that won't pick up (e.g. "send a message, we'll call back").
export function OpenStatus({
  onDark = false,
  className = "",
  suffix,
  closedHint,
}: {
  onDark?: boolean;
  className?: string;
  /** Always shown after the status, e.g. the street. Plain text, no separator. */
  suffix?: React.ReactNode;
  /** Shown only while closed, e.g. "send a message and we'll call back". */
  closedHint?: React.ReactNode;
}) {
  const [status, setStatus] = useState<ShopStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(shopStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const text = onDark ? "text-[var(--color-on-dark)]" : "text-[var(--color-body)]";
  // Red pulsing dot = open, the same "live" mark as the offers band — the
  // system has one accent hue, so no traffic-light green.
  const dot = status?.open ? "live-dot bg-[var(--color-red)]" : "bg-[var(--color-muted)]";

  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm ${text} ${className}`} aria-live="polite">
      <span className={`h-2 w-2 shrink-0 rounded-full ${status ? dot : "bg-transparent"}`} aria-hidden />
      <span className={status ? "font-semibold" : ""}>{status ? status.label : BUSINESS.hours.weekdays}</span>
      {suffix && (
        // Own line on phones (no dangling separator), inline after a dot on wider screens.
        <span className="basis-full pl-4 opacity-80 sm:basis-auto sm:pl-0">
          <span className="hidden sm:inline" aria-hidden>· </span>
          {suffix}
        </span>
      )}
      {status && !status.open && closedHint && <span>{closedHint}</span>}
    </p>
  );
}
