"use client";

import { useState } from "react";
import { track, reportAdsConversion } from "@/lib/analytics";
import { BUSINESS } from "@/lib/business";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1.5 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-3 text-[var(--color-heading)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-red)] focus:ring-2 focus:ring-[var(--color-red)]/30";
const label = "font-display text-sm font-bold uppercase tracking-wide text-[var(--color-heading)]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

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
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Something went wrong. Please call us instead.");
        setStatus("error");
        return;
      }
      // Lead captured — the site's second conversion after a phone call.
      track("generate_lead", { location: "contact_form" });
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
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
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
        <textarea id="message" name="message" required rows={5} className={field} placeholder="Vehicle, and what you're after — tires, alignment, muffler, a quote…" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-[var(--color-red-deep)]">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--color-red-cta)] px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[var(--color-red-deep)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
