"use client";

import { useEffect } from "react";
import { track, reportAdsConversion } from "@/lib/analytics";
import { BUSINESS } from "@/lib/business";

// One capture-phase click listener covers every anchor on the site — phone,
// email, directions and social — so each conversion surface is tracked without
// wiring an onClick into every component, and any link added later is picked up
// for free. The section a click came from is read from an explicit
// `data-track-location`, falling back to the nearest landmark.
function nearestLocation(el: Element): string {
  const tagged = el.closest<HTMLElement>("[data-track-location]");
  if (tagged?.dataset.trackLocation) return tagged.dataset.trackLocation;
  const section = el.closest<HTMLElement>("section[aria-label], header, footer");
  if (!section) return "unknown";
  if (section.tagName === "HEADER") return "header";
  if (section.tagName === "FOOTER") return "footer";
  return section.getAttribute("aria-label")?.toLowerCase().replace(/\s+/g, "_") ?? "section";
}

export function AnalyticsListener() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const a = target?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (!href) return;
      const location = nearestLocation(a);

      if (href.startsWith("tel:")) {
        track("phone_call", { location, page_path: window.location.pathname });
        reportAdsConversion(BUSINESS.googleAds.labels.phoneCall);
      } else if (href.startsWith("mailto:")) {
        track("email_click", { location });
      } else if (/(?:google\.[^/]+\/maps|maps\.google|maps\.app\.goo\.gl|\/maps\/)/.test(href)) {
        track("get_directions", { location });
      } else if (/facebook\.com|instagram\.com/.test(href)) {
        track("outbound_social", {
          network: /facebook/.test(href) ? "facebook" : "instagram",
          location,
        });
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
