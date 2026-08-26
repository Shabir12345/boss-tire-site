import type { Metadata } from "next";
import { BUSINESS } from "./business";

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const url = `${BUSINESS.url}${opts.path}`;
  const branded = `${opts.title} | ${BUSINESS.shortName}`;
  // The root layout's title.template adds " | Boss Tire" to child segments, so
  // their document title stays bare here. The template does not apply to the
  // root page, so home spells the brand out.
  const documentTitle = opts.path === "/" ? branded : opts.title;
  // Purpose-built 1200x630 branded card (photo + wordmark). A page may override
  // with its own image; otherwise every share/preview uses this correctly-sized one.
  const ogImage = opts.image ?? `${BUSINESS.url}/og.jpg`;
  const images = [{ url: ogImage, width: 1200, height: 630, alt: BUSINESS.name }];
  return {
    title: documentTitle,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: branded,
      description: opts.description,
      url,
      siteName: BUSINESS.name,
      images,
      type: "website",
      locale: "en_CA",
    },
    twitter: {
      card: "summary_large_image",
      title: branded,
      description: opts.description,
      images: [ogImage],
    },
  };
}
