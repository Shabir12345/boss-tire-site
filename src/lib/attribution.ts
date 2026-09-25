// Ad click IDs and UTM tags carried from the landing URL into a form lead, so
// each emailed lead says which ad and keyword produced it. Google Ads
// auto-tagging appends gclid (or gbraid/wbraid on iOS) to every Final URL.
export const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "landing_page",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>>;

/** Keep only known attribution keys with non-empty string values, trimmed and capped. */
export function pickAttribution(input: Record<string, unknown>): Attribution {
  const out: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const v = input[key];
    if (typeof v === "string" && v.trim()) out[key] = v.trim().slice(0, 300);
  }
  return out;
}
