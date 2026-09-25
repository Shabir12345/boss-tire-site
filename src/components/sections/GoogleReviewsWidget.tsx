"use client";

import { useEffect } from "react";
import { onFirstInteraction } from "@/lib/defer";

// Live Google reviews via Featurable (cdn.featurable.com). The widget is heavy
// (~100KB + ~700ms of main-thread work), so it is never loaded on the initial
// paint: `onFirstInteraction` injects the embed script on the first
// scroll/tap, then Featurable hydrates the div below. The min-height reserves
// its space to prevent layout shift while it loads.
export function GoogleReviewsWidget({ className = "" }: { className?: string }) {
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
    <div className={`min-h-[14rem] ${className}`}>
      <div id="featurable-f8f9515f-8222-46e5-9efa-5bedccc87079" data-featurable-async="" />
    </div>
  );
}
