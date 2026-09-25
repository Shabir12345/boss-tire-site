import { Resend } from "resend";
import { BUSINESS } from "@/lib/business";
import type { Attribution } from "@/lib/attribution";

export interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  message: string;
  attribution?: Attribution;
}

// Plain-text body the shop reads. Ad attribution goes last, only when present.
export function buildContactEmailText(data: ContactPayload): string {
  const lines = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : "Email: (not provided)",
    "",
    data.message,
  ];
  const attr = Object.entries(data.attribution ?? {});
  if (attr.length) {
    lines.push("", "-- Where this lead came from --", ...attr.map(([k, v]) => `${k}: ${v}`));
  }
  return lines.join("\n");
}

// Sends the contact message to the shop via Resend. Set RESEND_API_KEY,
// CONTACT_TO and CONTACT_FROM in the environment. With no key it logs and
// returns skipped:true, which the route reports to the visitor as a failure,
// so a lead is never shown as sent when it wasn't.
export async function sendContactEmail(data: ContactPayload): Promise<{ ok: boolean; skipped?: boolean }> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || BUSINESS.email;
  const from = process.env.CONTACT_FROM || "Boss Tire Website <onboarding@resend.dev>";

  if (!key) {
    console.warn("[contact] RESEND_API_KEY not set — message not emailed:", data);
    return { ok: false, skipped: true };
  }

  const resend = new Resend(key);
  // Resend does not throw on API errors (revoked key, unverified domain, rate
  // limit); it returns { error }. Throw so the route answers 500 and the
  // visitor is told to call, instead of seeing "sent" for an email that never left.
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email || undefined,
    subject: data.attribution?.landing_page?.startsWith("/book/")
      ? `New booking request from ${data.name} (Google Ads) — boss-tire.ca`
      : `New enquiry from ${data.name} — boss-tire.ca`,
    text: buildContactEmailText(data),
  });
  if (error) throw new Error(`Resend rejected the email: ${error.name}: ${error.message}`);

  return { ok: true };
}
