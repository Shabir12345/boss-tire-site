import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS, addressDisplay, mailHref, telHref } from "@/lib/business";

// Plain-language privacy notice. It describes what the site actually does
// (the call-back and contact forms, GA4 + Google Ads tags, the Google call
// forwarding number on ad visits) and nothing more. Every form links here, and
// a page that collects a phone number without one reads as less trustworthy,
// to visitors and to Google's landing page experience check alike.
export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Boss Tire's website handles the name and phone number you send through a form, and the analytics and Google Ads tags the site uses.",
  path: "/privacy",
});

const UPDATED = "November 18, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl text-[var(--color-heading)]">{title}</h2>
      <div className="mt-3 space-y-3 text-[var(--color-body)]">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Privacy policy" sub={`How ${BUSINESS.name} handles what you send us through this website.`} />
      <div className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-3xl space-y-10 py-16 sm:py-20">
          <p className="text-sm text-[var(--color-muted)]">Last updated {UPDATED}.</p>

          <Section title="What we collect">
            <p>
              When you fill in a form on this site, we receive what you type: your name and phone number, and anything
              else you choose to add, such as your vehicle, tire size, email address, a preferred day or a message.
            </p>
            <p>
              If you arrived from a Google ad or a tagged link, the form also sends the ad click ID and campaign tags
              from the page address (for example gclid or utm_campaign), so we know which ad brought you. These are
              kept in your browser only for the current visit.
            </p>
          </Section>

          <Section title="How we use it">
            <p>
              Your request is emailed to the shop so we can call you back about it: to give you a price, answer your
              question or find you a time. We don&apos;t sell your details, add you to a mailing list or share them
              with anyone else for their own use.
            </p>
          </Section>

          <Section title="Analytics and advertising">
            <p>
              This site uses Google Analytics and Google Ads tags to count visits and to measure which pages and ads
              lead to calls and requests, for example when someone taps a phone number or sends a form. These tags
              may set cookies. Google&apos;s use of this data is covered by Google&apos;s own privacy policy.
            </p>
            <p>
              If you came from a Google ad, the phone number on the page may be shown as a Google forwarding number,
              which rings the shop and lets Google tell us that a call came from an ad.
            </p>
          </Section>

          <Section title="Your choices">
            <p>
              You can block or clear cookies in your browser settings. To ask what we have from a form you sent, or to
              have it deleted, contact us below.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              {BUSINESS.name}, {addressDisplay}
              <br />
              Phone:{" "}
              <a href={telHref} className="link-grow font-semibold text-[var(--color-red-deep)]">
                {BUSINESS.phoneDisplay}
              </a>
              <br />
              Email:{" "}
              <a href={mailHref} className="link-grow font-semibold text-[var(--color-red-deep)]">
                {BUSINESS.email}
              </a>
            </p>
          </Section>
        </div>
      </div>
    </>
  );
}
