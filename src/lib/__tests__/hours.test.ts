import { describe, it, expect } from "vitest";
import { shopStatus, formatTime, hoursFor } from "@/lib/hours";

// Times are given in UTC. Toronto is UTC-5 in November (EST).
// Hours: Mon–Sat 9 AM – 9 PM, Sun 11 AM – 6 PM.
describe("shopStatus", () => {
  it("is open mid-afternoon on a weekday", () => {
    // Fri 20 Nov 2026, 14:00 Toronto
    expect(shopStatus(new Date("2026-11-20T19:00:00Z"))).toEqual({ open: true, label: "Open now · until 9 PM" });
  });

  it("is still open at 8:30 PM on a weekday", () => {
    // Fri 20 Nov 2026, 20:30 Toronto
    expect(shopStatus(new Date("2026-11-21T01:30:00Z")).open).toBe(true);
  });

  it("is closed after 9 PM and opens tomorrow at 9", () => {
    // Fri 20 Nov 2026, 21:30 Toronto
    expect(shopStatus(new Date("2026-11-21T02:30:00Z")).label).toBe("Closed · opens tomorrow at 9 AM");
  });

  it("is closed early morning and opens today", () => {
    // Fri 20 Nov 2026, 07:00 Toronto
    expect(shopStatus(new Date("2026-11-20T12:00:00Z")).label).toBe("Closed · opens today at 9 AM");
  });

  it("opens Sunday at 11 after Saturday night", () => {
    // Sat 21 Nov 2026, 21:30 Toronto
    expect(shopStatus(new Date("2026-11-22T02:30:00Z")).label).toBe("Closed · opens tomorrow at 11 AM");
  });

  it("is closed Sunday morning before 11", () => {
    // Sun 22 Nov 2026, 10:00 Toronto
    expect(shopStatus(new Date("2026-11-22T15:00:00Z")).label).toBe("Closed · opens today at 11 AM");
  });

  it("is open Sunday afternoon until 6 PM", () => {
    // Sun 22 Nov 2026, 15:00 Toronto
    expect(shopStatus(new Date("2026-11-22T20:00:00Z"))).toEqual({ open: true, label: "Open now · until 6 PM" });
  });

  it("is closed Sunday evening and opens Monday at 9", () => {
    // Sun 22 Nov 2026, 18:30 Toronto
    expect(shopStatus(new Date("2026-11-22T23:30:00Z")).label).toBe("Closed · opens tomorrow at 9 AM");
  });

  it("uses Toronto time, not the visitor's clock", () => {
    // 01:00 UTC Saturday is 20:00 Friday in Toronto — open, though it's past midnight in the UK.
    expect(shopStatus(new Date("2026-11-21T01:00:00Z")).open).toBe(true);
  });
});

describe("hoursFor", () => {
  it("returns each day's hours", () => {
    expect(hoursFor("Wednesday")).toEqual({ days: expect.any(Array), open: "09:00", close: "21:00" });
    expect(hoursFor("Sunday")).toEqual({ days: expect.any(Array), open: "11:00", close: "18:00" });
  });
});

describe("formatTime", () => {
  it("drops :00 and uses 12-hour time", () => {
    expect(formatTime("09:00")).toBe("9 AM");
    expect(formatTime("21:00")).toBe("9 PM");
    expect(formatTime("12:30")).toBe("12:30 PM");
  });
});
