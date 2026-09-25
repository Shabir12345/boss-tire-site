import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Every way the form can fail to deliver a lead must reach the visitor as a
// failure. Two past bugs showed "sent" for leads that went nowhere: a missing
// API key, and a Resend API error (Resend returns { error }, it does not throw).
const send = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

const { POST } = await import("@/app/api/contact/route");

function post(body: unknown) {
  return POST(new Request("http://localhost/api/contact", { method: "POST", body: JSON.stringify(body) }));
}

const lead = {
  name: "Test Driver",
  phone: "647-000-0000",
  message: "Request: Winter tire changeover",
  gclid: "abc123",
  source: "lp_tire-changeover-near-me",
  page: "/lp/tire-changeover-near-me",
  evil: "ignored",
};

describe("/api/contact lead delivery", () => {
  beforeEach(() => {
    send.mockReset();
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("fails when no email key is configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await post(lead);
    expect(res.status).toBe(503);
    expect((await res.json()).ok).toBe(false);
    expect(send).not.toHaveBeenCalled();
  });

  it("fails when Resend returns an error", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    send.mockResolvedValue({ data: null, error: { name: "validation_error", message: "domain not verified" } });
    const res = await post(lead);
    expect(res.status).toBe(500);
    expect((await res.json()).ok).toBe(false);
  });

  it("succeeds only when Resend accepts, and carries the ad attribution", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    send.mockResolvedValue({ data: { id: "email_1" }, error: null });
    const res = await post(lead);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, skipped: false });
    const sent = send.mock.calls[0][0];
    expect(sent.subject).toContain("[Ad lead]");
    expect(sent.text).toContain("gclid: abc123");
    expect(sent.text).toContain("/lp/tire-changeover-near-me");
    expect(sent.text).not.toContain("evil");
  });

  it("rejects a lead with no phone", async () => {
    const res = await post({ ...lead, phone: " " });
    expect(res.status).toBe(422);
  });
});
