import { Resend } from "resend";
import { BUSINESS } from "@/lib/business";

export interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  message: string;
  /** Which form sent it, e.g. "contact_form" or "lp_wheel-alignment-scarborough". */
  source?: string;
  /** Page path the form was submitted from. */
  page?: string;
}

// Sends the contact message to the shop. Uses Resend when RESEND_API_KEY is set;
// otherwise it logs and reports skipped, so local/dev never silently fails a
// submission. Set RESEND_API_KEY, CONTACT_TO and CONTACT_FROM in the environment.
export async function sendContactEmail(data: ContactPayload): Promise<{ ok: boolean; skipped?: boolean }> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || BUSINESS.email;
  const from = process.env.CONTACT_FROM || "Boss Tire Website <onboarding@resend.dev>";

  if (!key) {
    console.warn("[contact] RESEND_API_KEY not set — message not emailed:", data);
    return { ok: false, skipped: true };
  }

  const resend = new Resend(key);
  const lines = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : "Email: (not provided)",
    "",
    data.message,
    "",
    `Sent from: ${data.page ?? "(unknown page)"}${data.source ? ` [${data.source}]` : ""}`,
  ].join("\n");

  await resend.emails.send({
    from,
    to,
    replyTo: data.email || undefined,
    // Ad landing pages flag themselves in the subject so the shop can tell a
    // paid lead from an organic one at a glance.
    subject: `${data.source?.startsWith("lp_") ? "[Ad lead] " : ""}New enquiry from ${data.name} — boss-tire.ca`,
    text: lines,
  });

  return { ok: true };
}
