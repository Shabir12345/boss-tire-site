import type { Metadata, Viewport } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BUSINESS } from "@/lib/business";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { AnalyticsListener } from "@/components/analytics/AnalyticsListener";
import { LocalBusinessJsonLd } from "@/lib/jsonld";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: "Boss Tire | Tire Shop, Wheel Alignment & Muffler Repair in Scarborough",
    template: `%s | ${BUSINESS.shortName}`,
  },
  description:
    "Boss Tire in Scarborough: tire changeovers, new tires, wheel alignment, muffler & exhaust, oil changes and more — published prices, same-day service. Call (647) 871-2393.",
  applicationName: BUSINESS.name,
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body className="font-sans antialiased">
        {/* GA4 carried over from the old site so history stays continuous.
            One gtag loader also configures Google Ads once BUSINESS.googleAds.id
            is set (the old site had no Ads tag). Conversion events are fired from
            the app: link taps via AnalyticsListener, form leads via ContactForm. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${BUSINESS.ga4}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${BUSINESS.ga4}');${
            BUSINESS.googleAds.id ? `\ngtag('config', '${BUSINESS.googleAds.id}');` : ""
          }`}
        </Script>

        <LocalBusinessJsonLd />
        <AnalyticsListener />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
