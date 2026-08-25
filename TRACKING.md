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

## Google Ads conversions — LIVE

Configured in Google Ads account **866-515-8043** and wired in
[`src/lib/business.ts`](src/lib/business.ts):

- **Conversion ID:** `AW-11049816816` (connected to the site's Google tag).
- **Website — Phone call** (category *Contact*, Primary) — label `AjA6CKni3eccEPCl-5Qp`,
  fired on every `tel:` tap.
- **Website — Lead form** (category *Submit lead form*, Primary) — label
  `6vOICKzi3eccEPCl-5Qp`, fired on contact-form success.

Both are manual event-snippet actions; the site fires them itself, so Google's
"Test installation" will verify once the deploy is live and a real (or test) tap
comes through. Deliberately NOT using Google's forwarding-number call tracking —
it would swap the real phone number on the site and break NAP consistency.

## Follow-up: GA4 key events → Ads Secondary import (the "observe-only" half)

Not done yet — GA4 can only import an event into Ads after it has *received* it,
and the event layer just went live. Once a few days of data exist:

1. **GA4 → Admin → Key events:** mark `phone_call` and `generate_lead` as key
   events (or "Create key event" by name).
2. **Google Ads → Goals → Conversions → New → Import → GA4:** import both, then
   set each to **Secondary (observe-only)** so they don't double-count against
   the Primary AW-tag actions above.

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
