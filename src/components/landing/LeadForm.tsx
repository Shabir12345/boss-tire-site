"use client";

import { useEffect, useRef, useState } from "react";
import { track, reportAdsConversion } from "@/lib/analytics";
import { BUSINESS } from "@/lib/business";
import { ATTRIBUTION_KEYS, fillAttributionInputs, readAttribution } from "@/lib/attribution";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1.5 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-3 text-[var(--color-heading)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-red)] focus:ring-2 focus:ring-[var(--color-red)]/30";
const label = "font-display text-sm font-bold uppercase tracking-wide text-[var(--color-heading)]";
const optional = <span className="font-normal normal-case text-[var(--color-muted)]">(optional)</span>;

// Short booking form for the landing page hero: name and phone (required),
// vehicle and a tap-to-pick day (optional), plus hidden ad attribution. Posts
// to /api/contact like the contact page. `form_start` fires once on the first
// interaction; the lead conversion fires only after the server confirms the
// email went out.
const WHEN_CHOICES = ["Today", "Tomorrow", "This Saturday", "Other"] as const;
type WhenChoice = (typeof WHEN_CHOICES)[number];
export function LeadForm({
  service,
  source,
  vehiclePlaceholder = "e.g. 2019 Honda CR-V",
  submitLabel = "Book my visit",
}: {
  /** What they asked for, written into the email ("Wheel alignment"). */
  service: string;
  /** "lp_<slug>": flags the email as an ad lead and names the page. */
  source: string;
  vehiclePlaceholder?: string;
  /** Button text, named for the service: "Book my changeover". */
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const started = useRef(false);
  const [whenChoice, setWhenChoice] = useState<WhenChoice | "">("");
  const [whenOther, setWhenOther] = useState("");
  // What lands in the "Best day or time" line of the email: the chip, or the
  // typed answer when they pick Other.
  const when = whenChoice === "Other" ? whenOther : whenChoice;

  function onFirstInteraction() {
    if (started.current) return;
    started.current = true;
    track("form_start", { location: source, page_path: window.location.pathname });
  }

  useEffect(() => {
    fillAttributionInputs(formRef.current);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // Attribution is read again here, not only from the hidden inputs: React
    // re-applies a hidden input's empty default on any re-render (a chip tap),
    // which would otherwise wipe the gclid before submit.
    const data = { ...Object.fromEntries(new FormData(form).entries()), ...readAttribution() } as Record<string, string>;
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
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onFocus={onFirstInteraction}
      onPointerDown={onFirstInteraction}
      className="space-y-4"
      noValidate
    >
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
      <fieldset>
        <legend className={label}>Best day or time {optional}</legend>
        <input type="hidden" name="when" value={when} />
        <div className="mt-1.5 flex flex-wrap gap-2">
          {WHEN_CHOICES.map((c) => {
            const on = whenChoice === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setWhenChoice(on ? "" : c)}
                className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] ${
                  on
                    ? "border-[var(--color-red-cta)] bg-[var(--color-red-cta)] text-white"
                    : "border-[var(--color-border)] bg-[var(--color-paper)] text-[var(--color-heading)] hover:border-[var(--color-red)]"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
        {whenChoice === "Other" && (
          <input
            aria-label="Which day or time suits you?"
            type="text"
            value={whenOther}
            onChange={(e) => setWhenOther(e.target.value)}
            className={field}
            placeholder="e.g. Monday after 5"
            autoFocus
          />
        )}
      </fieldset>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-[var(--color-red-deep)]">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[var(--color-red-cta)] px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[var(--color-red-deep)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
      <p className="text-xs text-[var(--color-muted)]">We&apos;ll call you to confirm a time. Mon–Sat, 9 to 7.</p>
    </form>
  );
}
