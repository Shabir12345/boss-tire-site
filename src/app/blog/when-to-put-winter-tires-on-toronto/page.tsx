import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/lib/jsonld";
import { getPost, formatPostDate } from "@/lib/posts";
import { getService, formatPrice, requirePrice } from "@/lib/services";

const post = getPost("when-to-put-winter-tires-on-toronto")!;
const changeover = getService("tire-changeover")!;

export const metadata: Metadata = buildMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  keywords: post.keywords,
});

export default function WhenToPutWinterTiresOnPage() {
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
              The answer isn't a date on the calendar. It's a temperature. Once daytime highs are sitting below
              roughly 7°C, all-season rubber stops doing what you think it does, snow or no snow. In Toronto that
              usually lands somewhere around mid-October, but the trigger is the thermometer, not the first flurry.
              Wait for snow on the ground and you've likely already been driving for weeks on tires that quietly
              gave up their grip on cold, dry pavement.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              Why 7°C, not the first snowfall
            </h2>
            <p>
              This comes down to the rubber, not the road surface. Winter tires are built from a softer
              compound designed to stay pliable in the cold, so the tread can still flex and bite into the
              surface underneath it. All-season rubber is built for a wider temperature range and starts to
              stiffen once it drops below about 7°C. Stiffer rubber can't conform to the road the same way. It
              skates across small imperfections instead of gripping them.
            </p>
            <p>
              That loss of grip isn't something that only shows up in snow. It happens on a cold, dry road in
              November just as much as it does on a slushy one in January, because the problem is the tire
              compound, not the weather on top of it. A driver who waits for the first snowfall to book a
              changeover has usually been driving on compromised tires for weeks already, without anything
              visible on the road to warn them.
            </p>
            <p>
              It's also not a sudden switch that flips at exactly 7°C. The rubber stiffens gradually as the
              temperature drops, so the loss of grip creeps in rather than announcing itself. That's part of
              why so many drivers miss it. There's no single cold morning where the tires obviously "stop
              working." By the time it's cold enough to notice, the compound has already been working against
              you for a while.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              What waiting for the first snow actually costs you
            </h2>
            <p>
              Nobody plans to wait until the first storm. It just happens, because a calendar reminder is easy to
              ignore and a windshield full of snow is not. The problem is that the storm arrives after the
              temperature has already been below that 7°C line for weeks in most years, so the tires have already
              been underperforming the whole time you were driving on dry, cold pavement to get groceries or drop
              the kids off.
            </p>
            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              What that looks like on the calendar in Toronto
            </h2>
            <p>
              Toronto's daytime temperatures tend to cross that 7°C line somewhere between mid-October and
              November, and that's exactly when shops across the city start filling up. Demand for changeovers
              climbs through that stretch and keeps climbing as the weather turns. It isn't spread evenly across
              the season. The earlier you book inside that window, the more say you have over which day and time
              works for you. Book later and you're choosing from whatever's left, on a schedule set by everyone
              else who waited for the same cold snap.
            </p>
            <p>
              None of this means winter tires are mandatory here the way they are in Quebec, where the law
              requires them on most vehicles by a set date each year. Ontario doesn't have that rule. What
              Ontario does have is a lot of insurers who offer a discount to drivers running a proper winter set.
              The details vary by provider, so it's worth a call to your own insurer to ask what they offer before
              you assume there's nothing in it for you.
            </p>
            <p>
              That distinction matters because it changes how people think about timing. A Quebec driver has a
              deadline and no choice about it. A Toronto driver is making a judgment call based on the weather,
              which is exactly the kind of decision that's easy to keep putting off, right up until it isn't a
              judgment call anymore because the temperature already made it for you.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              One set of rims, or two
            </h2>
            <p>
              How much work a changeover is also depends on whether your winter tires have their own wheels.
              We've laid out the full argument, what changes, steel versus alloy, and what a package costs, on
              the{" "}
              <Link
                href="/tires/winter-rims-and-packages"
                className="link-grow font-semibold text-[var(--color-red-deep)]"
              >
                winter rims and packages
              </Link>{" "}
              page.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              Swapping back in spring works the same way, in reverse
            </h2>
            <p>
              The 7°C rule isn't only about putting winter tires on. It's just as much about taking them off. The
              same soft compound that stays pliable in the cold works against you once the weather warms up, and a
              tire built to flex in the cold wears down faster and grips worse on hot pavement than a proper
              all-season does. Running winter tires deep into spring costs you tread and control in exactly the
              conditions they weren't built for.
            </p>
            <p>
              People are usually careful about the fall deadline and casual about the spring one, because a
              cold morning is unmistakable and a warm one just feels like good weather. The same threshold
              applies both directions. Once daytime highs are reliably back above roughly 7°C, that's the
              signal to book the swap back, not a date circled on a calendar in April.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              What the changeover itself costs
            </h2>
            <p>
              A seasonal changeover at Boss Tire is {formatPrice(requirePrice(changeover))}, before tax. Tires
              inspected, mounted and balanced, pressures set, and everything torqued to spec while you wait. See
              the full{" "}
              <Link href="/winter-tire-changeover" className="link-grow font-semibold text-[var(--color-red-deep)]">
                winter tire changeover
              </Link>{" "}
              page for what's included and how the on-rim swap compares to mounting tires fresh each season.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              Somewhere to put the set you're not driving
            </h2>
            <p>
              Whichever set comes off the car needs somewhere to live for the next six months, and a hot
              garage or a sunny corner ages rubber faster than most people realize. If you'd rather not find
              space for it yourself, we store off-season sets clean, dry and tagged by position for the next
              rotation. See{" "}
              <Link href="/services/tire-storage" className="link-grow font-semibold text-[var(--color-red-deep)]">
                tire storage
              </Link>{" "}
              for how that works, and call to confirm what your particular set costs to store, since it depends
              on what you're bringing in.
            </p>
            <p>
              The set that comes off the car this week is the same set that has to go back on next spring, and
              handing it off already tagged and dry beats digging it out of the back of a garage in April not
              knowing which tire came off which corner.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        heading="Ready for your changeover?"
        sub="Call the shop and book your seasonal swap before the rush hits. Mounted, balanced and torqued the same day."
      />
    </>
  );
}
