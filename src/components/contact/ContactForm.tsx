"use client";

import { useEffect, useRef, useState } from "react";
import { track, reportAdsConversion } from "@/lib/analytics";
import { BUSINESS } from "@/lib/business";
import { ATTRIBUTION_KEYS, type Attribution } from "@/lib/attribution";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1.5 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-3 text-[var(--color-heading)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-red)] focus:ring-2 focus:ring-[var(--color-red)]/30";
const ATTRIBUTION_STORE = "bt_attribution";

// Click IDs / UTMs from the arrival URL, kept for the session so a visitor who
// scrolls, reloads or moves to another page still sends them with the lead.
function readAttribution(): Attribution {
  const out: Attribution = {};
  try {
    Object.assign(out, JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORE) || "{}"));
  } catch {
    /* storage blocked: URL params below still apply */
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

const label = "font-display text-sm font-bold uppercase tracking-wide text-[var(--color-heading)]";

// `source` names where the form sits ("contact_page", "lp_<slug>") — it rides
// along in the email so the shop knows which page/ad the lead came from, and is
// the `location` on the generate_lead event. `messagePlaceholder` lets an ad
// landing page prompt for the details that service actually needs.
export function ContactForm({
  source = "contact_form",
  messagePlaceholder = "Vehicle, and what you're after — tires, alignment, muffler, a quote…",
  submitLabel = "Send message",
}: {
  source?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
} = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Fill the hidden attribution inputs once on the client (the static HTML ships them empty).
  useEffect(() => {
    const attribution = readAttribution();
    for (const key of ATTRIBUTION_KEYS) {
      const input = formRef.current?.elements.namedItem(key);
      if (input instanceof HTMLInputElement) input.value = attribution[key] ?? "";
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source, page: window.location.pathname }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setError(json.error || "Something went wrong. Please call us instead.");
        setStatus("error");
        return;
      }
      // Lead captured — the site's second conversion after a phone call.
      track("generate_lead", { location: source, page_path: window.location.pathname });
      reportAdsConversion(BUSINESS.googleAds.labels.lead);
      form.reset();
      setStatus("sent");
    } catch {
      setError("Couldn't reach the server. Please call us instead.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-smoke)] p-8 text-center">
        <p className="font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
          Message sent
        </p>
        <p className="mt-2 text-[var(--color-body)]">
          Thanks — we'll get back to you shortly. Need it sorted now? Call the shop and we'll help right away.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Hidden ad attribution (gclid, gbraid, wbraid, UTMs), emailed with the lead. */}
      {ATTRIBUTION_KEYS.map((key) => (
        <input key={key} type="hidden" name={key} defaultValue="" />
      ))}
      <div>
        <label htmlFor="name" className={label}>Name</label>
        <input id="name" name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>Phone</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} placeholder="(647) 000-0000" />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email <span className="font-normal normal-case text-[var(--color-muted)]">(optional)</span></label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@email.com" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={label}>What do you need?</label>
        <textarea id="message" name="message" required rows={5} className={field} placeholder={messagePlaceholder} />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-[var(--color-red-deep)]">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--color-red-cta)] px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[var(--color-red-deep)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
