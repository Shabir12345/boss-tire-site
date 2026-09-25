import { describe, it, expect } from "vitest";
import { shopStatus, formatTime } from "@/lib/hours";

// Times are given in UTC; Toronto is UTC-4 in September (EDT).
describe("shopStatus", () => {
  it("is open mid-afternoon on a weekday", () => {
    // Fri 25 Sep 2026, 14:00 Toronto
    expect(shopStatus(new Date("2026-09-25T18:00:00Z"))).toEqual({ open: true, label: "Open now · until 7 PM" });
  });

  it("is closed after 7 PM and opens tomorrow", () => {
    // Fri 25 Sep 2026, 20:30 Toronto
    expect(shopStatus(new Date("2026-09-26T00:30:00Z")).label).toBe("Closed · opens tomorrow at 9 AM");
  });

  it("is closed early morning and opens today", () => {
    // Fri 25 Sep 2026, 07:00 Toronto
    expect(shopStatus(new Date("2026-09-25T11:00:00Z")).label).toBe("Closed · opens today at 9 AM");
  });

  it("skips Sunday", () => {
    // Sat 26 Sep 2026, 19:30 Toronto → next open is Monday
    expect(shopStatus(new Date("2026-09-26T23:30:00Z")).label).toBe("Closed · opens Monday at 9 AM");
  });

  it("uses Toronto time, not the visitor's clock", () => {
    // 22:00 UTC is 18:00 in Toronto — open, even though it's late in the UK.
    expect(shopStatus(new Date("2026-09-25T22:00:00Z")).open).toBe(true);
  });
});

describe("formatTime", () => {
  it("drops :00 and uses 12-hour time", () => {
    expect(formatTime("09:00")).toBe("9 AM");
    expect(formatTime("19:00")).toBe("7 PM");
    expect(formatTime("12:30")).toBe("12:30 PM");
  });
});
