# Tracking & conversions

How Boss Tire measures where its business comes from. The goal: every contact a
visitor makes is a recorded event, so ad spend, GBP and organic can be judged on
real leads — not guesses.

## Stack

- **GA4** — `G-39PPPBKJC6` (carried over from the old site; history is continuous).
  Loaded in [`src/app/layout.tsx`](src/app/layout.tsx).
- **Google Ads** — same gtag loader also configures the Ads tag **once**
  `BUSINESS.googleAds.id` is set in [`src/lib/business.ts`](src/lib/business.ts).
  Empty by default, so nothing Ads-related fires until the ID is added.
- **Event layer** — [`src/lib/analytics.ts`](src/lib/analytics.ts): a thin,
  SSR-safe `track()` over gtag, plus `reportAdsConversion()`.
- **Link listener** — [`src/components/analytics/AnalyticsListener.tsx`](src/components/analytics/AnalyticsListener.tsx):
  one capture-phase click listener catches every `<a>` on the site, so any link
  added later is tracked automatically with no extra wiring.

## Events

| Event | Fires on | Params | Role |
|---|---|---|---|
| `phone_call` | any `tel:` tap | `location`, `page_path` | **Primary conversion** |
| `generate_lead` | contact form success | `location` | **Primary conversion** |
| `get_directions` | maps / address link | `location` | Intent signal |
| `email_click` | `mailto:` tap | `location` | Intent signal |
| `outbound_social` | Facebook / Instagram | `network`, `location` | Intent signal |

`location` names the section the click came from — `header`, `hero`,
`mobile_call_bar`, `cta_band`, `page_header`, `service_catalog`, `contact`,
`footer`, `about` — so you can see *which* call button actually earns calls.
It comes from a `data-track-location` attribute (set on `CallButton` and the raw
contact links) and falls back to the nearest `<header>`/`<footer>`/`<section
aria-label>`.

GA4 enhanced measurement also records pageviews, scroll depth and outbound
clicks automatically.

## Turning on Google Ads conversions

1. In **Google Ads → Goals → Conversions**, create two **Website** conversion
   actions (choose *"Set up with a Google tag → add the tag yourself"*):
   - **Website — Phone call** (category: *Phone call lead*)
   - **Website — Lead form** (category: *Submit lead form*)
2. Copy the **Conversion ID** (`AW-XXXXXXXXXX`, shared) and each action's
   **Conversion label** (unique).
3. Set them in [`src/lib/business.ts`](src/lib/business.ts):
   ```ts
   googleAds: {
     id: "AW-XXXXXXXXXX",
     labels: { phoneCall: "abc123…", lead: "def456…" },
   },
   ```
   That's the only change — `reportAdsConversion()` and the layout config pick it
   up automatically.

### Don't double-count

The AW tag and imported GA4 events count the *same* call twice if both are
Primary. Correct setup:

- **AW tag events = Primary (counted)** conversions → what Smart Bidding bids on.
- **GA4 `phone_call` / `generate_lead` = key events, imported to Ads as
  Secondary (observe-only)** → reporting and remarketing audiences, not counted.

## Attributing Google Business Profile traffic

GBP visits otherwise blend into "google / organic". Tag the **website link in the
GBP dashboard** so they're distinct:

```
https://boss-tire.ca/?utm_source=google-business-profile&utm_medium=organic&utm_campaign=gbp
```

Calls and direction taps made *on* the Google profile itself are not website
events — they live in the GBP Performance insights, read separately.
