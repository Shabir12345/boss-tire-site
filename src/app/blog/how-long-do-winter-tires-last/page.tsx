import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ArticleJsonLd, FaqJsonLd } from "@/lib/jsonld";
import { getPost, formatPostDate } from "@/lib/posts";

const post = getPost("how-long-do-winter-tires-last")!;

// Questions taken from Google's "People also ask" boxes for these searches
// (pulled 2026-10-12, google.ca), answered in the shop's own words.
const FAQS = [
  {
    q: "What is an acceptable tread depth for winter tires?",
    a: "Replace them at 4/32 of an inch (about 3 mm). Below that a winter tire can't clear snow and slush from its tread and loses most of what makes it a winter tire, even though it's still above the legal minimum.",
  },
  {
    q: "Can I use 10 year old winter tires?",
    a: "We wouldn't. Rubber hardens with age even when the tread looks fine, and a hard winter tire grips like an all-season. Many tire makers say to replace any tire ten years after it was made, and to have it checked every year from about five.",
  },
  {
    q: "How long do winter tires last if used year round?",
    a: "Much less time. The soft compound wears quickly on hot summer pavement, so a set left on all year can lose in one summer what it would lose in a couple of winters. Take them off once highs stay above about 7°C.",
  },
  {
    q: "Should I buy second-hand winter tires?",
    a: "Yes, if they've been checked. Look at the tread depth, the date code and the sidewalls. A used set with good tread and a recent date is a much better buy than new tires on only two wheels.",
  },
  {
    q: "How do I find out how old my tires are?",
    a: "Find the DOT code on the sidewall. The last four digits are the week and year it was made: 2421 means the 24th week of 2021.",
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

export default function HowLongWinterTiresLastPage() {
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
              You&apos;ll often see &ldquo;four to six seasons&rdquo; quoted, and for an average Toronto driver
              that&apos;s a fair rough guide. But a winter tire doesn&apos;t wear out by counting winters. It wears
              out two ways: the tread gets too shallow, or the rubber gets too old. Whichever comes first is when
              the set is done.
            </p>

            <h2 className={h2}>Tread: replace at 4/32&quot;</h2>
            <p>
              A new winter tire starts with deep tread, often around 10/32 to 12/32 of an inch. The deep grooves
              and small cuts across the blocks are what pack with snow, push slush out of the way and bite on ice.
              As the tire wears, those grooves get shallow and that ability goes with them.
            </p>
            <p>
              Once a winter tire is down to about 4/32 of an inch, roughly half worn, it&apos;s finished as a
              winter tire. It&apos;s still legal on the road, since the legal floor is much lower, but in snow it
              will behave more like a worn all-season. Many winter tires have a second set of wear bars in the
              grooves that show you when you&apos;ve reached that point. If you&apos;re not sure, we&apos;ll measure
              it when the set comes in for the changeover.
            </p>

            <h2 className={h2}>Age: the date on the sidewall</h2>
            <p>
              Rubber hardens as it ages, whether the car moves or not. A ten-year-old winter tire with plenty of
              tread can still be too hard to grip on a cold road, and from the outside it looks fine.
            </p>
            <p>
              To check yours, find the code starting with DOT on the sidewall. The last four digits are the week
              and year the tire was made: 2421 means week 24 of 2021. Many tire makers recommend having tires
              inspected every year once they&apos;re about five years old, and replacing any tire ten years after
              it was made, however much tread is left. Look for small cracks in the sidewall or between the tread
              blocks too. That&apos;s age showing.
            </p>

            <h2 className={h2}>What wears winter tires out faster</h2>
            <p>
              <strong>Leaving them on into summer.</strong> The soft compound that grips in January wears fast on
              hot pavement. A set left on through the summer can lose more tread in a few months than in a couple of
              winters. When daytime highs stay above about 7°C, swap back.
            </p>
            <p>
              <strong>Low pressure.</strong> Tires lose pressure as the temperature drops, so a set that was right
              in October can be well down by January. Underinflated tires wear on the edges and run hotter. Check
              them monthly in winter.
            </p>
            <p>
              <strong>How they spend the summer.</strong> Sun, heat and a damp garage floor all age rubber. Stored
              clean, dry, out of the light and away from heat, a set lasts noticeably longer. If you&apos;d rather
              not keep them yourself, see{" "}
              <Link href="/services/tire-storage" className={link}>
                tire storage
              </Link>
              .
            </p>
            <p>
              <strong>Never rotating them.</strong> On a front-wheel-drive car the front pair wears faster. Swapping
              positions each season evens it out, which is why we tag stored tires by position.
            </p>

            <h2 className={h2}>Buying used winter tires</h2>
            <p>
              Everything above is also how to judge a used set. Check the date code first, then the tread depth,
              then the sidewalls for cuts, bulges and cracking. A used set with a recent date and good tread is a
              very sensible way to save money; a cheap set that&apos;s eight years old is not a bargain at any
              price. We check every used tire we sell for tread, age and sidewall damage; see{" "}
              <Link href="/tires/used-tires" className={link}>
                used tires
              </Link>
              .
            </p>
            <p>
              Thinking of replacing just two? Read{" "}
              <Link href="/blog/do-you-need-4-winter-tires" className={link}>
                do you need 4 winter tires
              </Link>{" "}
              first.
            </p>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} heading="Winter tire wear questions" />

      <CTABand
        heading="Not sure your set has another winter in it?"
        sub="Bring it in with your changeover and we'll measure the tread and read the date codes before anything goes on the car."
      />
    </>
  );
}
