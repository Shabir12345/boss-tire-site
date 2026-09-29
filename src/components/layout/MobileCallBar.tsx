"use client";

import { usePathname } from "next/navigation";
import { CallButton } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

// Fixed phone-first strip on mobile — 100% of the shop's ad conversions are
// calls, so the call is one thumb away on every page. Hidden on lg+ where the
// header CallButton is always visible. Padding clears the iPhone home indicator.
//
// On ad landing pages (/lp/*) it splits into two equal buttons, Call and Book,
// where Book scrolls to the hero form (#quote). No claim text there: the
// landing pages promise no turnaround time.
export function MobileCallBar() {
  const pathname = usePathname();
  const isLanding = pathname?.startsWith("/lp/") ?? false;

  return (
    <div
      className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-[#0B0B0Cf2] backdrop-blur-md lg:hidden"
      style={{
        zIndex: "var(--z-mobilebar)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {isLanding ? (
        <div className="gutter-safe grid grid-cols-2 gap-3 py-2.5">
          <CallButton compact className="cta-attention w-full" trackLocation="mobile_call_bar" />
          <a
            href="#quote"
            onClick={() => track("cta_click", { location: "mobile_book_bar", page_path: window.location.pathname })}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-white/40 px-5 font-display text-base font-bold uppercase leading-none tracking-wide text-white transition-colors duration-200 hover:border-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)]"
          >
            Book
          </a>
        </div>
      ) : (
        <div className="gutter-safe flex items-center gap-3 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-bold uppercase leading-none tracking-wide text-white">
              Same-day service
            </p>
            <p className="mt-1 truncate text-xs text-white/60">Mon–Sat 9–7 · Scarborough</p>
          </div>
          <CallButton className="cta-attention flex-shrink-0" trackLocation="mobile_call_bar" />
        </div>
      )}
    </div>
  );
}
