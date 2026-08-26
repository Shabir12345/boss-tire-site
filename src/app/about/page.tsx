import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { WhyBossTire } from "@/components/sections/WhyBossTire";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/jsonld";
import { BUSINESS, addressDisplay, telHref } from "@/lib/business";
import { REVIEWS } from "@/lib/reviews";

export const metadata: Metadata = buildMetadata({
  title: "About Boss Tire",
  description:
    "Boss Tire is a tire and auto shop on Danforth Rd in Scarborough: published prices, same-day service, and 4.8★ from 321 drivers. Your tire partner. Call (647) 871-2393.",
  path: "/about",
  keywords: ["boss tire scarborough", "tire shop danforth rd", "auto shop scarborough"],
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <PageHeader
        eyebrow="About"
        title="Your tire partner on Danforth Rd"
        sub={`A tire and auto shop in Scarborough that puts the prices on the page and gets the work done the same day. ${REVIEWS.rating}★ from ${REVIEWS.count} drivers.`}
        image="/photos/storefront.jpg"
        imageAlt="The Boss Tire storefront at 375 Danforth Rd, Scarborough"
      />

      <section className="cv-auto bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>Who we are</Eyebrow>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-body)]">
                <p>
                  Boss Tire keeps Scarborough drivers on the road from {BUSINESS.address.street.split(",")[0]}, off
                  Danforth Rd. Tires, wheels, alignment, exhaust and the everyday maintenance in between, all under
                  one roof.
                </p>
                <p>
                  The idea is simple. Publish the prices so you are never guessing. Do the work the same day so you
                  are not booked out for a week. Balance, torque and set the pressures properly on every tire. That
                  is what keeps drivers coming back, and it is why the reviews read the way they do.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/photos/team.jpg"
                alt="The Boss Tire team in the shop"
                fill
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="cv-auto">
        <WhyBossTire />
      </div>

      <section className="cv-auto bg-[var(--color-smoke)]">
        <div className="gutter-safe mx-auto max-w-6xl py-14">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-[var(--color-muted)]">Find us</h2>
              <p className="mt-3 text-[var(--color-body)]">{addressDisplay}</p>
            </div>
            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-[var(--color-muted)]">Hours</h2>
              <p className="mt-3 text-[var(--color-body)]">{BUSINESS.hours.weekdays}</p>
              <p className="text-[var(--color-muted)]">{BUSINESS.hours.weekend}</p>
            </div>
            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-[var(--color-muted)]">Call</h2>
              <p className="mt-3">
                <a href={telHref} data-track-location="about" className="link-grow font-semibold text-[var(--color-red-deep)]">
                  {BUSINESS.phoneDisplay}
                </a>
              </p>
              <p className="mt-1 text-sm">
                <Link href="/contact" className="link-grow text-[var(--color-body)]">
                  Directions &amp; contact →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="cv-auto">
        <CTABand />
      </div>
    </>
  );
}
