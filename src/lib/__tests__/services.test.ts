import { describe, it, expect } from "vitest";
import { SERVICES, formatPrice, requirePrice, type Service } from "@/lib/services";

describe("formatPrice", () => {
  it("drops trailing .00 but keeps real cents", () => {
    expect(formatPrice(60)).toBe("$60");
    expect(formatPrice(60.99)).toBe("$60.99");
  });
});

describe("service catalog", () => {
  it("allows a service with no price", () => {
    const priceless: Service = {
      slug: "test-only",
      name: "Test Only",
      shortName: "Test",
      category: "Tires",
      blurb: "No price yet.",
      included: ["Something"],
    };
    expect(priceless.price).toBeUndefined();
  });

  it("gives every catalog entry a unique slug", () => {
    const slugs = SERVICES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("requirePrice", () => {
  it("returns the price when the service has one", () => {
    const priced: Service = {
      slug: "priced",
      name: "Priced",
      shortName: "Priced",
      category: "Tires",
      price: 42,
      blurb: "Has a price.",
      included: ["Something"],
    };
    expect(requirePrice(priced)).toBe(42);
  });

  it("throws when the service has no price", () => {
    const priceless: Service = {
      slug: "priceless",
      name: "Priceless",
      shortName: "Priceless",
      category: "Tires",
      blurb: "No price yet.",
      included: ["Something"],
    };
    expect(() => requirePrice(priceless)).toThrow('Service "priceless" has no price, but a page requires one.');
  });
});
