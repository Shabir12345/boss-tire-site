// ─── Analytics event layer ──────────────────────────────────────────────────
// One thin, SSR-safe wrapper over gtag so every conversion surface reports the
// same, well-named events. GA4 is always on (see layout.tsx). Google Ads
// conversions piggyback on the same gtag once BUSINESS.googleAds.id is set.
//
// The two money events are `phone_call` and `generate_lead` — mark BOTH as key
// events in GA4 (Admin → Events) and import them into Google Ads as conversions,
// or fire the Ads tag directly by filling in BUSINESS.googleAds. Everything else
// (`get_directions`, `email_click`, `outbound_social`) is intent signal for
// judging which sections and channels actually drive contact.

import { BUSINESS } from "./business";

export type TrackEvent =
  | "phone_call" // any tap on a tel: link — the primary conversion
  | "generate_lead" // contact form submitted successfully (GA4 recommended name)
  | "get_directions" // tap on a maps / directions link
  | "email_click" // tap on a mailto: link
  | "outbound_social" // tap through to Facebook / Instagram
  | "cta_click"; // non-phone call-to-action (e.g. "See prices")

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a GA4 event. No-ops safely on the server or before gtag has loaded. */
export function track(event: TrackEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

/**
 * Report a Google Ads conversion for the same action. No-ops unless an Ads
 * conversion ID is configured, so it is safe to call before Fawad's ID lands.
 * `label` is the per-action conversion label from the Ads account.
 */
export function reportAdsConversion(label?: string): void {
  const id = BUSINESS.googleAds.id;
  if (!id || typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: label ? `${id}/${label}` : id });
}
