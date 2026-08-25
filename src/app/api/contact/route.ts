import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name, phone, email, message } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim() || typeof phone !== "string" || !phone.trim() || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ ok: false, error: "Please add your name, phone and a message." }, { status: 422 });
  }

  try {
    const result = await sendContactEmail({
      name: name.trim().slice(0, 200),
      phone: phone.trim().slice(0, 60),
      email: typeof email === "string" ? email.trim().slice(0, 200) : undefined,
      message: message.trim().slice(0, 4000),
    });
    // skipped (no API key configured) still returns success to the visitor —
    // the message is logged server-side and the form should not appear broken.
    return NextResponse.json({ ok: true, skipped: result.skipped ?? false });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong sending your message. Please call us instead." }, { status: 500 });
  }
}
