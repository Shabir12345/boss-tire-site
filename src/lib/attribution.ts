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

const ATTRIBUTION_STORE = "bt_attribution";

/**
 * Client only. Click IDs / UTMs from the arrival URL, kept for the session so a
 * visitor who scrolls, reloads or moves to another page still sends them with
 * the lead. Storage can be blocked; the URL params still apply.
 */
export function readAttribution(): Attribution {
  const out: Attribution = {};
  try {
    Object.assign(out, JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORE) || "{}"));
  } catch {
    /* storage blocked */
  }
  const params = new URLSearchParams(window.location.search);
  for (const key of ATTRIBUTION_KEYS) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  try {
    sessionStorage.setItem(ATTRIBUTION_STORE, JSON.stringify(out));
  } catch {
    /* ignore */
  }
  return out;
}

/** Client only. Fill a form's hidden attribution inputs (the static HTML ships them empty). */
export function fillAttributionInputs(form: HTMLFormElement | null): void {
  if (!form) return;
  const attribution = readAttribution();
  for (const key of ATTRIBUTION_KEYS) {
    const input = form.elements.namedItem(key);
    if (input instanceof HTMLInputElement) input.value = attribution[key] ?? "";
  }
}
