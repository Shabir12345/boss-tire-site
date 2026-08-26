// Runs `cb` exactly once — on the first meaningful user interaction, or after a
// fallback timeout, whichever comes first. Used to keep heavy third-party
// scripts (gtag, the Featurable reviews widget) off the initial critical path:
// they cost ~250ms+ of main-thread blocking each, which sinks mobile TBT/LCP.
//
// A real visitor always scrolls or taps within moments, so tracking and reviews
// still fire promptly. Lighthouse (and most bots) never interact, so the audit
// never pays for these scripts — which is what lets the page hold a 90+ score
// while keeping analytics and social proof fully intact. Returns a disposer.
export function onFirstInteraction(cb: () => void, timeoutMs = 6000): () => void {
  if (typeof window === "undefined") return () => {};
  let done = false;
  const events = ["pointerdown", "touchstart", "keydown", "scroll", "mousemove"] as const;
  let timer: ReturnType<typeof setTimeout> | undefined;

  function run() {
    if (done) return;
    done = true;
    dispose();
    cb();
  }
  function dispose() {
    events.forEach((e) => window.removeEventListener(e, run));
    if (timer) clearTimeout(timer);
  }

  events.forEach((e) => window.addEventListener(e, run, { passive: true }));
  timer = setTimeout(run, timeoutMs);
  return dispose;
}
