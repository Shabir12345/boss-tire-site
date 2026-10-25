import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ArticleJsonLd, FaqJsonLd } from "@/lib/jsonld";
import { getPost, formatPostDate } from "@/lib/posts";
import { getService, formatPrice, requirePrice } from "@/lib/services";

const post = getPost("are-winter-tires-mandatory-in-ontario")!;
const changeover = getService("tire-changeover")!;

// Questions taken from Google's "People also ask" boxes for these searches
// (pulled 2026-10-12, google.ca), answered in the shop's own words.
const FAQS = [
  {
    q: "Can you get a ticket in Ontario for not having winter tires?",
    a: "Not for the type of tire. Ontario has no law requiring winter tires on a passenger car. Worn, bald or damaged tires are a different matter at any time of year, and driving too fast for the conditions is still an offence whatever you have on the car.",
  },
  {
    q: "Does Ontario offer a car insurance discount for winter tires?",
    a: "Yes. Since 2016 every Ontario auto insurer has had to offer a discount to drivers who run winter tires. How big it is, the dates the tires must be on, and what proof they want are set by each insurer, so ask yours and keep your changeover invoice.",
  },
  {
    q: "Do all-weather tires count as winter tires for insurance in Ontario?",
    a: "It depends on the insurer. Most want tires marked with the three-peak mountain and snowflake symbol, and many all-weather tires carry it, but some insurers only accept dedicated winter tires. Check with yours before you buy.",
  },
  {
    q: "Are studded tires legal in Toronto?",
    a: "Not for most Toronto drivers. Ontario allows studded tires from October 1 to April 30 for residents of northern Ontario. Southern Ontario residents, Toronto included, generally can't run them.",
  },
  {
    q: "Where in Canada are winter tires mandatory?",
    a: "Quebec requires them on passenger vehicles from December 1 to March 15. British Columbia requires winter-rated tires on many highways from October 1 to April 30. Ontario and the other provinces leave it to the driver.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  keywords: post.keywords,
});

const h2 = "pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]";
const link = "link-grow font-semibold text-[var(--color-red-deep)]";

export default function WinterTiresMandatoryOntarioPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <ArticleJsonLd post={post} />
      <FaqJsonLd faqs={FAQS} />

      <PageHeader
        eyebrow="Blog"
        title={post.title}
        sub={formatPostDate(post.published)}
        image={post.image}
        imageAlt={post.imageAlt}
      />

      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-3xl py-16 sm:py-20">
          <div className="space-y-6 text-lg leading-relaxed text-[var(--color-body)]">
            <p>
              No. Ontario has no law that says a passenger car must be on winter tires, in Toronto or anywhere else
              in the province. You won&apos;t be pulled over for driving through January on all-seasons. That&apos;s
              the short answer, and it&apos;s the reason a lot of drivers stop reading there. The longer answer has
              money in it.
            </p>

            <h2 className={h2}>Your insurer has to offer you a discount</h2>
            <p>
              Since 2016, every auto insurer in Ontario has been required to offer a discount to drivers who put
              winter tires on. It isn&apos;t automatic. You usually have to tell them, and most want the tires on
              between set dates and proof that they were. The size of the discount, the dates and the paperwork
              all vary by company, so the only way to know what it&apos;s worth to you is to call and ask.
            </p>
            <p>
              Whatever they ask for, the invoice from your changeover is normally what proves it. Keep it with
              your insurance papers.
            </p>

            <h2 className={h2}>What counts as a winter tire</h2>
            <p>
              Look on the sidewall for a mountain with three peaks and a snowflake inside it. That symbol means the
              tire passed a standard snow traction test, and it&apos;s what insurers and the provinces that do
              require winter tires look for. A plain &ldquo;M+S&rdquo; (mud and snow) marking, which most all-season
              tires carry, is not the same thing.
            </p>
            <p>
              All-weather tires are where it gets grey. Many of them carry the three-peak symbol, and some insurers
              accept them for the discount. Others only count dedicated winter tires. We&apos;ve written up how the
              two actually compare on the road in{" "}
              <Link href="/blog/all-weather-vs-winter-tires" className={link}>
                all-weather vs winter tires
              </Link>
              .
            </p>

            <h2 className={h2}>Studded tires: mostly a no in Toronto</h2>
            <p>
              Studs are a different rule. Ontario allows studded tires from October 1 to April 30 for people who
              live in northern Ontario. If you live in the south of the province, Toronto and Scarborough
              included, you generally can&apos;t run them. Modern non-studded winter tires are what almost every
              Toronto driver uses instead.
            </p>

            <h2 className={h2}>Where winter tires are the law</h2>
            <p>
              Drive out of province and the rules change. Quebec requires winter tires on passenger vehicles from
              December 1 to March 15. British Columbia requires winter-rated tires on many of its highways from
              October 1 to April 30, and the signs at the start of those routes tell you so. If a ski trip or a
              drive to Montreal is in your winter plans, that matters.
            </p>

            <h2 className={h2}>So should you bother?</h2>
            <p>
              Not being mandatory isn&apos;t the same as not being worth it. Below about 7°C, all-season rubber
              stiffens and stops gripping the way it does in summer, on cold dry roads as well as snowy ones. We go
              into the timing in{" "}
              <Link href="/blog/when-to-put-winter-tires-on-toronto" className={link}>
                when to put winter tires on in Toronto
              </Link>
              . Add the insurance discount and a winter set usually pays back part of what it costs.
            </p>
            <p>
              A seasonal changeover at Boss Tire starts at {formatPrice(requirePrice(changeover))} before tax,
              depending on your vehicle, and you leave with the invoice your insurer wants. See{" "}
              <Link href="/winter-tire-changeover" className={link}>
                winter tire changeover
              </Link>{" "}
              for what&apos;s included, or{" "}
              <Link href="/tires" className={link}>
                tires
              </Link>{" "}
              if you still need the set.
            </p>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} heading="Ontario winter tire questions" />

      <CTABand
        heading="Getting your winter tires on?"
        sub="Call the shop to book your changeover. Mounted, balanced and torqued the same day, with an invoice for your insurer."
      />
    </>
  );
}
