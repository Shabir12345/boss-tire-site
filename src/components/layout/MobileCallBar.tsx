import { CallButton } from "@/components/ui/Button";

// Fixed phone-first strip on mobile — 100% of the shop's ad conversions are
// calls, so the call is one thumb away on every page. Hidden on lg+ where the
// header CallButton is always visible. Padding clears the iPhone home indicator.
export function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-[#0B0B0Cf2] backdrop-blur-md lg:hidden"
      style={{
        zIndex: "var(--z-mobilebar)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="gutter-safe flex items-center gap-3 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-bold uppercase leading-none tracking-wide text-white">
            Same-day service
          </p>
          <p className="mt-1 truncate text-xs text-white/60">Mon–Sat 9–7 · Scarborough</p>
        </div>
        <CallButton className="cta-attention flex-shrink-0" />
      </div>
    </div>
  );
}
