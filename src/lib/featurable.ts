import { FEATURABLE_WIDGET_ID, type GoogleReview } from "./reviews";

// Reads the shop's Google reviews from the Featurable widget API on the server,
// so pages ship the reviews as plain HTML: no 100KB widget script, no layout
// shift, and each page can show the reviews about its own service.
//
// The pages stay static. The response is cached and refreshed at most once a
// day (ISR), so new Google reviews appear without a redeploy. If Featurable is
// unreachable the function returns [] and <LocalTrust> falls back to the live
// widget, so a Featurable outage can never break a build or blank a page.
//
// FEATURABLE_API_KEY is optional: the widget endpoint is public today, and the
// key is sent if one is configured.

const ENDPOINT = `https://featurable.com/api/v2/widgets/${FEATURABLE_WIDGET_ID}`;

interface FeaturableReview {
  id?: string;
  author?: { name?: string };
  text?: string | null;
  rating?: { value?: number };
  publishedAt?: string;
}

export async function getGoogleReviews(): Promise<GoogleReview[]> {
  try {
    const res = await fetch(ENDPOINT, {
      headers: process.env.FEATURABLE_API_KEY ? { "X-API-Key": process.env.FEATURABLE_API_KEY } : {},
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { success?: boolean; widget?: { reviews?: FeaturableReview[] } };
    const raw = json.widget?.reviews ?? [];
    return raw
      .filter((r) => r.id && r.text && r.author?.name && r.publishedAt && typeof r.rating?.value === "number")
      .map((r) => ({
        id: r.id!,
        author: r.author!.name!,
        rating: r.rating!.value!,
        text: r.text!.trim(),
        publishedAt: r.publishedAt!,
      }));
  } catch (err) {
    console.warn("[reviews] Featurable fetch failed, falling back to the widget:", err);
    return [];
  }
}
