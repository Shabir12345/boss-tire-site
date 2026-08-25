import { BUSINESS } from "@/lib/business";
import { REVIEWS } from "@/lib/reviews";
import { SERVICES, formatPrice, type Service } from "@/lib/services";

// The old site had no LocalBusiness type at all — only Organization + Place with
// PostalAddress fields shifted one position, so no hours, geo, price range or
// rating. This is the corrected AutoRepair / TireShop entity.
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "TireShop", "LocalBusiness"],
    "@id": `${BUSINESS.url}/#business`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    telephone: BUSINESS.phoneRaw,
    email: BUSINESS.email,
    image: `${BUSINESS.url}/photos/caliper.jpg`,
    logo: `${BUSINESS.url}/logo.png`, // raster — Google's logo guidance rejects SVG
    priceRange: "$$",
    slogan: BUSINESS.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    areaServed: BUSINESS.areaServed,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...BUSINESS.hours.days],
      opens: BUSINESS.hours.open,
      closes: BUSINESS.hours.close,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: REVIEWS.rating,
      reviewCount: REVIEWS.count,
      bestRating: 5,
      worstRating: 1,
    },
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name },
      price: s.price,
      priceCurrency: "CAD",
      description: s.priceNote ? `${formatPrice(s.price)} ${s.priceNote}` : formatPrice(s.price),
    })),
    sameAs: [
      BUSINESS.socials.facebook,
      BUSINESS.socials.instagram,
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BUSINESS.url}${item.path}`,
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function ServiceJsonLd({ service }: { service: Service }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.blurb,
    provider: {
      "@type": "AutoRepair",
      "@id": `${BUSINESS.url}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phoneRaw,
      url: BUSINESS.url,
    },
    areaServed: BUSINESS.areaServed,
    serviceType: service.name,
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "CAD",
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
