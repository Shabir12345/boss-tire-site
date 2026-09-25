import { describe, it, expect } from "vitest";
import { pickReviews, displayName, REVIEW_KEYWORDS, type GoogleReview } from "@/lib/reviews";
import { SERVICES } from "@/lib/services";

const r = (id: string, text: string, publishedAt: string, rating = 5): GoogleReview => ({
  id,
  author: "Test Person",
  rating,
  text,
  publishedAt,
});

const ALL = [
  r("a", "Great service and very reasonable prices, would come back", "2026-05-16T00:00:00Z"),
  r("b", "Got my wheel alignment done in 30 minutes, car drives straight now", "2026-06-01T00:00:00Z"),
  r("c", "They fixed my muffler the same day and it was cheaper than quoted elsewhere", "2026-07-10T00:00:00Z"),
  r("d", "Alignment was quick and they showed me the numbers before and after", "2026-04-01T00:00:00Z"),
  r("e", "Bad", "2026-08-01T00:00:00Z"),
  r("f", "Terrible alignment experience honestly not great at all", "2026-08-02T00:00:00Z", 2),
];

describe("pickReviews", () => {
  it("puts reviews about the service first, newest first, then fills with others", () => {
    const { reviews, matched } = pickReviews(ALL, "wheel-alignment", 3);
    expect(reviews.map((x) => x.id)).toEqual(["b", "d", "c"]);
    expect(matched).toBe(2);
  });

  it("drops low ratings and one-word reviews", () => {
    const ids = pickReviews(ALL, undefined, 10).reviews.map((x) => x.id);
    expect(ids).not.toContain("e");
    expect(ids).not.toContain("f");
  });

  it("reports zero matches honestly when no review mentions the service", () => {
    expect(pickReviews(ALL, "caliper-painting", 3).matched).toBe(0);
  });
});

describe("displayName", () => {
  it("shows first name and last initial", () => {
    expect(displayName("Ommama Raja")).toBe("Ommama R.");
    expect(displayName("ian Franz")).toBe("Ian F.");
    expect(displayName("A M")).toBe("A M.");
    expect(displayName("Leslie")).toBe("Leslie");
  });
});

describe("REVIEW_KEYWORDS", () => {
  it("has a pattern for every service, so every page can match its reviews", () => {
    const missing = SERVICES.map((s) => s.slug).filter((slug) => !REVIEW_KEYWORDS[slug]);
    expect(missing).toEqual([]);
  });
});
