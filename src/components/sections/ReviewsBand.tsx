"use client";

import { useEffect } from "react";
import { onFirstInteraction } from "@/lib/defer";

// Google reviews via Featurable (cdn.featurable.com). The widget is heavy
// (~100KB + ~700ms of main-thread work), so we don't load it on the initial
// paint — it sits just below the hero and a real visitor reaches it only after
// they start scrolling. `onFirstInteraction` injects the embed script on the
// first scroll/tap, then Featurable hydrates the div below. The min-height
// reserves its space to prevent layout shift while it loads. Keeping it off the
// critical path is a major mobile LCP/TBT win with no loss of social proof.
export function ReviewsBand() {
  useEffect(() => {
    return onFirstInteraction(() => {
      if (document.getElementById("featurable-embed")) return;
      const s = document.createElement("script");
      s.id = "featurable-embed";
      s.src = "https://cdn.featurable.com/widget/v2/embed.js";
      s.async = true;
      s.charset = "UTF-8";
      document.body.appendChild(s);
    });
  }, []);

  return (
    <section className="bg-[var(--color-smoke)]">
      <div className="gutter-safe mx-auto max-w-6xl py-0">
        <div className="min-h-[14rem]">
          <div id="featurable-f8f9515f-8222-46e5-9efa-5bedccc87079" data-featurable-async="" />
        </div>
      </div>
    </section>
  );
}
