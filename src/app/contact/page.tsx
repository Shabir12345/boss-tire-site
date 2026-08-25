import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CallButton } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/jsonld";
import { BUSINESS, addressDisplay, telHref, mailHref, mapsEmbedSrc, mapsLinkHref } from "@/lib/business";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Directions",
  description:
    "Call Boss Tire at (647) 871-2393 or visit 375 Danforth Rd, Unit 8, Scarborough. Open Mon–Sat 9–7. Send a message for a quote and we'll get right back to you.",
  path: "/contact",
  keywords: ["boss tire contact", "boss tire scarborough phone", "boss tire directions"],
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageHeader
        eyebrow="Contact"
        title="Call, or send us a message"
        sub="Fastest is the phone — you'll have a straight answer and a fair price in under a minute. Prefer to write? Use the form and we'll get right back to you."
      />

      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto grid max-w-6xl gap-12 py-16 sm:py-20 lg:grid-cols-2">
          {/* Details */}
          <div>
            <Eyebrow>Boss Tire</Eyebrow>
            <div className="mt-5 space-y-5">
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-widest text-[var(--color-muted)]">Phone</p>
                <a href={telHref} className="mt-1 block font-display text-3xl font-extrabold text-[var(--color-heading)]">
                  {BUSINESS.phoneDisplay}
                </a>
                <div className="mt-3">
                  <CallButton className="cta-attention" />
                </div>
              </div>

              <div>
                <p className="font-display text-sm font-bold uppercase tracking-widest text-[var(--color-muted)]">Email</p>
                <a href={mailHref} className="link-grow mt-1 block text-[var(--color-body)]">{BUSINESS.email}</a>
              </div>

              <div>
                <p className="font-display text-sm font-bold uppercase tracking-widest text-[var(--color-muted)]">Address</p>
                <a href={mapsLinkHref} target="_blank" rel="noopener noreferrer" className="link-grow mt-1 block text-[var(--color-body)]">
                  {addressDisplay}
                </a>
              </div>

              <div>
                <p className="font-display text-sm font-bold uppercase tracking-widest text-[var(--color-muted)]">Hours</p>
                <p className="mt-1 text-[var(--color-body)]">{BUSINESS.hours.weekdays}</p>
                <p className="text-[var(--color-muted)]">{BUSINESS.hours.weekend}</p>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-[var(--color-border)]">
              <iframe
                title="Boss Tire location on Google Maps"
                src={mapsEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <Eyebrow>Send a message</Eyebrow>
            <h2 className="mt-4 text-2xl text-[var(--color-heading)]">Tell us what you need</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
