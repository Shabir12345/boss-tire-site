"use client";

import { useEffect, useRef, useState } from "react";
import { track, reportAdsConversion } from "@/lib/analytics";
import { BUSINESS } from "@/lib/business";
import { ATTRIBUTION_KEYS, fillAttributionInputs } from "@/lib/attribution";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1.5 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-3 text-[var(--color-heading)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-red)] focus:ring-2 focus:ring-[var(--color-red)]/30";
const label = "font-display text-sm font-bold uppercase tracking-wide text-[var(--color-heading)]";
const optional = <span className="font-normal normal-case text-[var(--color-muted)]">(optional)</span>;

// Short call-back form for the landing page hero: four fields, two required,
// plus hidden ad attribution. Posts to /api/contact like the contact page. The
// lead conversion fires only after the server confirms the email went out.
export function LeadForm({
  service,
  source,
  vehiclePlaceholder = "e.g. 2019 Honda CR-V",
}: {
  /** What they asked for, written into the email ("Wheel alignment"). */
  service: string;
  /** "lp_<slug>": flags the email as an ad lead and names the page. */
  source: string;
  vehiclePlaceholder?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fillAttributionInputs(formRef.current);
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
    const { vehicle, when, ...rest } = data;
    const message = [
      `Request: ${service}`,
      `Vehicle: ${vehicle?.trim() || "(not given)"}`,
      `Best day or time: ${when?.trim() || "(not given)"}`,
    ].join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest, message, source, page: window.location.pathname }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setError(json.error || `Something went wrong. Please call us at ${BUSINESS.phoneDisplay}.`);
        setStatus("error");
        return;
      }
      track("generate_lead", { location: source, page_path: window.location.pathname });
      reportAdsConversion(BUSINESS.googleAds.labels.lead);
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
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4" noValidate>
      {ATTRIBUTION_KEYS.map((key) => (
        <input key={key} type="hidden" name={key} defaultValue="" />
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
        <label htmlFor="lead-vehicle" className={label}>Vehicle {optional}</label>
        <input id="lead-vehicle" name="vehicle" type="text" className={field} placeholder={vehiclePlaceholder} />
      </div>
      <div>
        <label htmlFor="lead-when" className={label}>Best day or time {optional}</label>
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
      <p className="text-xs text-[var(--color-muted)]">We&apos;ll call you to confirm a time. Mon–Sat, 9 to 7.</p>
    </form>
  );
}
