"use client";

import { useEffect, useState } from "react";
import { track, reportAdsConversion } from "@/lib/analytics";
import { BUSINESS } from "@/lib/business";
import { ATTRIBUTION_KEYS, type Attribution } from "@/lib/attribution";

type Status = "idle" | "sending" | "sent" | "error";

const STORAGE_KEY = "bt_attribution";

const field =
  "mt-1.5 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-3 text-[var(--color-heading)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-red)] focus:ring-2 focus:ring-[var(--color-red)]/30";
const label = "font-display text-sm font-bold uppercase tracking-wide text-[var(--color-heading)]";

// Reads click IDs / UTMs from the URL on arrival and keeps them for the
// session, so a visitor who scrolls, reloads or strips the query still sends
// the ad attribution with their lead.
function readAttribution(): Attribution {
  const out: Attribution = {};
  try {
    Object.assign(out, JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}"));
  } catch {
    /* storage blocked — URL params below still apply */
  }
  const params = new URLSearchParams(window.location.search);
  for (const key of ATTRIBUTION_KEYS) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  if (!out.landing_page) out.landing_page = window.location.pathname;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(out));
  } catch {
    /* ignore */
  }
  return out;
}

// Short booking form for ad landing pages: four fields (two required), plus
// hidden ad attribution. Posts to the same /api/contact endpoint as the
// contact page, which emails the shop. The conversion only fires after the
// server confirms the email was sent.
export function LeadForm({ service, trackLocation }: { service: string; trackLocation: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [attribution, setAttribution] = useState<Attribution>({});

  useEffect(() => {
    setAttribution(readAttribution());
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (!data.name?.trim() || !data.phone?.trim()) {
      setError("Please add your name and phone number.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");

    const message = [
      `Request: ${service}`,
      `Vehicle: ${data.vehicle?.trim() || "(not given)"}`,
      `Preferred time: ${data.when?.trim() || "(not given)"}`,
    ].join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, phone: data.phone, message, ...attribution }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setError(json.error || `Something went wrong. Please call us at ${BUSINESS.phoneDisplay}.`);
        setStatus("error");
        return;
      }
      track("generate_lead", { location: trackLocation });
      reportAdsConversion(BUSINESS.googleAds.labels.lead);
      form.reset();
      setStatus("sent");
    } catch {
      setError(`Couldn't reach the server. Please call us at ${BUSINESS.phoneDisplay}.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="py-6 text-center">
        <p className="font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">Request sent</p>
        <p className="mt-2 text-[var(--color-body)]">
          Thanks. The shop will call you back to confirm a time. Want it sorted now? Call {BUSINESS.phoneDisplay}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {ATTRIBUTION_KEYS.map((key) => (
        <input key={key} type="hidden" name={key} value={attribution[key] ?? ""} readOnly />
      ))}
      <div>
        <label htmlFor="lead-name" className={label}>Name</label>
        <input id="lead-name" name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="lead-phone" className={label}>Phone</label>
        <input id="lead-phone" name="phone" type="tel" required autoComplete="tel" className={field} placeholder="(647) 000-0000" />
      </div>
      <div>
        <label htmlFor="lead-vehicle" className={label}>
          Vehicle <span className="font-normal normal-case text-[var(--color-muted)]">(optional)</span>
        </label>
        <input id="lead-vehicle" name="vehicle" type="text" className={field} placeholder="e.g. 2019 Honda CR-V" />
      </div>
      <div>
        <label htmlFor="lead-when" className={label}>
          Best day or time <span className="font-normal normal-case text-[var(--color-muted)]">(optional)</span>
        </label>
        <input id="lead-when" name="when" type="text" className={field} placeholder="e.g. Saturday morning" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-[var(--color-red-deep)]">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[var(--color-red-cta)] px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[var(--color-red-deep)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request a call back"}
      </button>
      <p className="text-xs text-[var(--color-muted)]">We'll call you to confirm a time. Mon–Sat, 9 to 7.</p>
    </form>
  );
}
