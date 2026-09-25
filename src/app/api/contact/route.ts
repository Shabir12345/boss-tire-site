import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { pickAttribution } from "@/lib/attribution";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const fields = (body ?? {}) as Record<string, unknown>;
  const { name, phone, email, message } = fields;

  if (typeof name !== "string" || !name.trim() || typeof phone !== "string" || !phone.trim() || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ ok: false, error: "Please add your name, phone and a message." }, { status: 422 });
  }

  try {
    const result = await sendContactEmail({
      name: name.trim().slice(0, 200),
      phone: phone.trim().slice(0, 60),
      email: typeof email === "string" ? email.trim().slice(0, 200) : undefined,
      message: message.trim().slice(0, 4000),
      attribution: pickAttribution(fields),
    });
    // No email key configured means the lead went nowhere. Report failure so
    // the visitor is told to call, and no conversion fires. (This used to
    // return ok:true, which showed "Message sent" and silently dropped every
    // lead in production until the key was set.)
    if (result.skipped) {
      return NextResponse.json(
        { ok: false, skipped: true, error: "Our form is down right now. Please call us at (647) 871-2393." },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true, skipped: false });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong sending your message. Please call us instead." }, { status: 500 });
  }
}
