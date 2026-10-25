import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ArticleJsonLd, FaqJsonLd } from "@/lib/jsonld";
import { getPost, formatPostDate } from "@/lib/posts";

const post = getPost("do-you-need-4-winter-tires")!;

// Questions taken from Google's "People also ask" boxes for these searches
// (pulled 2026-10-12, google.ca), answered in the shop's own words.
const FAQS = [
  {
    q: "Can I drive with 2 winter tires and 2 all-season tires?",
    a: "You can, but you shouldn't. The two ends of the car end up with different grip, so it behaves unpredictably when you brake or turn on snow and ice. Run four matching winter tires.",
  },
  {
    q: "Is it okay to put winter tires just on the front?",
    a: "No. With grip at the front and none at the back, the rear of the car is the end that slides out when you brake into a corner on ice. It's one of the easiest ways to spin a front-wheel-drive car.",
  },
  {
    q: "Do I need winter tires if I have all-wheel drive?",
    a: "Yes. All-wheel drive helps you get moving in snow. It does nothing to help you stop or steer, and that's where tires do all the work.",
  },
  {
    q: "Can I mix new and used winter tires?",
    a: "Keep tires on the same axle the same make, model and close in tread depth. If you're mixing, put the pair with more tread on the rear and ask us to check the numbers first.",
  },
  {
    q: "Do I need four winter tires for the insurance discount?",
    a: "Most Ontario insurers ask for winter tires on all four wheels. The exact rule is your insurer's, so check your policy before you buy.",
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

export default function FourWinterTiresPage() {
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
              Four. It&apos;s the question we hear most from people trying to keep the cost down, and we
              understand why, but two winter tires is not half the safety of four. It can be worse than none,
              because it gives the car two different levels of grip and you don&apos;t find out which end lets go
              first until it does.
            </p>

            <h2 className={h2}>Two on the front: the back end slides out</h2>
            <p>
              This is the setup people usually ask about, because most cars are front-wheel drive and the front
              is where the power goes. With winter tires up front, the car pulls away and steers well. Then you
              brake going into a corner on ice, the weight shifts forward, and the rear tires, still on hard
              all-season rubber, have nothing left. The back of the car steps out and the car spins. It happens
              fast and it&apos;s very hard to catch.
            </p>

            <h2 className={h2}>Two on the back: the front won&apos;t turn</h2>
            <p>
              Put the pair on the rear instead and you get the opposite. The back stays planted, but the front
              tires can&apos;t grip enough to turn the car or stop it, so you turn the wheel and keep going
              straight. Safer than a spin, but still not where you want to be at a red light on a hill.
            </p>

            <h2 className={h2}>What about all-wheel drive?</h2>
            <p>
              All-wheel drive and four-wheel drive send power to every wheel, so the car gets moving from a stop
              in snow far better. That&apos;s all they do. Stopping and steering are down to the four patches of
              rubber touching the road, and an AWD SUV on all-seasons stops no shorter than a front-wheel-drive car
              on the same tires. Heavier vehicles can actually need more distance. The confidence AWD gives you
              pulling away is exactly why winter tires matter more on one, not less.
            </p>

            <h2 className={h2}>Matching matters too</h2>
            <p>
              Four winter tires is the rule. Four that match is the better version of it: same make and model on
              each axle at least, and tread depths close together. A worn tire on one corner pulls the car around
              under braking. If one tire is newer than the rest, it normally goes on the rear.
            </p>
            <p>
              Not sure if last year&apos;s set has another season left in it? We cover how to tell in{" "}
              <Link href="/blog/how-long-do-winter-tires-last" className={link}>
                how long do winter tires last
              </Link>
              .
            </p>

            <h2 className={h2}>Cheaper ways to get to four</h2>
            <p>
              If cost is why you&apos;re asking, a full set of used winter tires is a better buy than two new ones.
              We check every used tire for tread depth, age and sidewall damage before it goes on a car; see{" "}
              <Link href="/tires/used-tires" className={link}>
                used tires
              </Link>
              . Most insurers also want four winter tires on the car before they&apos;ll give you the winter
              discount, which helps pay for the set.
            </p>
            <p>
              Once they&apos;re on, all four get balanced and torqued and the pressures set as part of the{" "}
              <Link href="/winter-tire-changeover" className={link}>
                winter tire changeover
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} heading="Winter tire questions" />

      <CTABand
        heading="Need a full set for winter?"
        sub="Call with your tire size and budget. New and used winter tires, fitted and balanced on Danforth Rd while you wait."
      />
    </>
  );
}
