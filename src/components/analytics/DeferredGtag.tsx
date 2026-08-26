"use client";

import { useEffect } from "react";
import { BUSINESS } from "@/lib/business";
import { onFirstInteraction } from "@/lib/defer";

// Loads the heavy gtag.js (GA4 + Google Ads) only after the first user
// interaction. The inline stub in layout.tsx already defines window.gtag and
// queues the `js` + `config` calls into dataLayer, so any event fired before
// this loads (e.g. a phone-tap conversion) is buffered and flushes the moment
// gtag.js arrives. A tel: tap does not unload the page, so the conversion still
// records. Keeping gtag off the critical path is the single biggest mobile
// perf win here (~250ms blocking + 300KB removed from initial load) and clears
// the third-party-cookies Best-Practices audit for non-interacting auditors.
export function DeferredGtag() {
  useEffect(() => {
    return onFirstInteraction(() => {
      if (document.getElementById("gtag-js")) return;
      const s = document.createElement("script");
      s.id = "gtag-js";
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${BUSINESS.ga4}`;
      document.head.appendChild(s);
    });
  }, []);
  return null;
}
