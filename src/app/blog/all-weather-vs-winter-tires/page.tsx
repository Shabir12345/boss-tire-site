import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ArticleJsonLd, FaqJsonLd } from "@/lib/jsonld";
import { getPost, formatPostDate } from "@/lib/posts";
import { getService, formatPrice, requirePrice } from "@/lib/services";

const post = getPost("all-weather-vs-winter-tires")!;
const changeover = getService("tire-changeover")!;
const storage = getService("tire-storage")!;

// Questions taken from Google's "People also ask" boxes for these searches
// (pulled 2026-10-12, google.ca), answered in the shop's own words.
const FAQS = [
  {
    q: "Are all-weather tires better than winter tires?",
    a: "Not in winter. A dedicated winter tire grips better on ice, packed snow and very cold pavement. An all-weather tire is better across the whole year, because it can stay on in summer and a winter tire can't.",
  },
  {
    q: "What are the disadvantages of all-weather tires?",
    a: "Less grip than a winter tire on ice and in deep cold, and faster wear than an all-season in summer heat, because they never come off. You trade some performance at both ends of the year for not having to swap.",
  },
  {
    q: "Do I need snow tires if I have all-weather tires?",
    a: "For most city driving on plowed Toronto roads, no. If you regularly drive unplowed roads, steep hills, rural highways or cottage country, a dedicated winter set is still the safer choice.",
  },
  {
    q: "Is it okay to use winter tires in summer?",
    a: "It isn't a good idea. The soft winter compound wears quickly on hot pavement, and braking and handling get worse in the heat. Swap back once daytime highs stay above about 7°C.",
  },
  {
    q: "Are all-weather tires considered winter tires for insurance?",
    a: "Some insurers accept all-weather tires that carry the three-peak mountain and snowflake symbol for the winter tire discount; others don't. Ask your insurer before you buy.",
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

export default function AllWeatherVsWinterTiresPage() {
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
              If your winters are mostly plowed city streets, all-weather tires can be enough. If you deal with
              ice, unplowed roads or long highway drives out of the city, a dedicated winter tire still stops and
              turns better. Neither is a scam. They solve different problems, and the right one depends on how you
              actually drive between November and March.
            </p>

            <h2 className={h2}>Three kinds of tire, not two</h2>
            <p>
              The names make this harder than it should be, so here is the plain version.
            </p>
            <p>
              <strong>All-season</strong> tires are what most cars come with from the factory. They&apos;re built
              for spring, summer and fall. Below about 7°C the rubber stiffens and grip drops off, snow or no snow.
            </p>
            <p>
              <strong>Winter</strong> tires use a soft compound that stays flexible in deep cold, with deep tread
              and lots of small cuts (sipes) that bite into snow and ice. They go on in the fall and come off in
              spring.
            </p>
            <p>
              <strong>All-weather</strong> tires sit in between. They carry the three-peak mountain and snowflake
              symbol, which means they passed a snow traction test, but they&apos;re built to stay on the car all
              year.
            </p>

            <h2 className={h2}>Where winter tires still win</h2>
            <p>
              On ice, on packed snow, and on a cold morning well below zero, a winter tire gives you shorter
              stopping distances and more grip in a corner. That gap is widest exactly when you need it most: the
              first icy morning, the intersection that never got salted, the 401 in a squall. If your winter
              driving takes you outside the city, up north, or onto roads that are plowed last, that difference is
              the whole point.
            </p>

            <h2 className={h2}>Where all-weather tires win</h2>
            <p>
              They never come off. No twice-a-year changeover, no second set to store, no booking in the November
              rush. For a driver who stays mostly on main roads in Toronto and can work from home on the worst
              storm days, that convenience is real.
            </p>
            <p>
              The catch is wear. Because all-weather tires run through the summer heat too, they usually wear
              faster than an all-season would, and they give up some of the summer handling an all-season has.
              You&apos;re buying one compromise tire instead of two specialist ones.
            </p>

            <h2 className={h2}>What each costs you over a year</h2>
            <p>
              A winter setup means two sets of tires and two changeovers a year. At Boss Tire a seasonal
              changeover starts at {formatPrice(requirePrice(changeover))} before tax, depending on your vehicle,
              and storage for the set you&apos;re not using is {formatPrice(requirePrice(storage))} if you don&apos;t
              want it in your garage. Each set only wears for half the year, so it lasts longer.
            </p>
            <p>
              All-weather means one set and no swap, but that set does all the wearing. Over the life of the car
              the gap is smaller than it looks, and the insurance discount can tip it: some insurers only give it
              for dedicated winter tires. We cover that in{" "}
              <Link href="/blog/are-winter-tires-mandatory-in-ontario" className={link}>
                are winter tires mandatory in Ontario
              </Link>
              .
            </p>

            <h2 className={h2}>Which one we&apos;d tell a Toronto driver to buy</h2>
            <p>
              Mostly city, mostly main roads, and you&apos;d rather never think about a changeover: all-weather is
              a reasonable choice. Commuting on the highway, driving north for the weekend, parked outside overnight,
              or a newer driver: put a proper winter set on. If you&apos;re going winter, putting the set on its own
              rims makes every swap quicker; see{" "}
              <Link href="/tires/winter-rims-and-packages" className={link}>
                winter rims and packages
              </Link>
              .
            </p>
            <p>
              Call the shop with your tire size and we&apos;ll tell you what we have that fits, or browse{" "}
              <Link href="/tires" className={link}>
                new and used tires
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} heading="All-weather vs winter questions" />

      <CTABand
        heading="Not sure which set is right for you?"
        sub="Call the shop, tell us how you drive, and we'll tell you straight. Fitted, balanced and torqued while you wait."
      />
    </>
  );
}
