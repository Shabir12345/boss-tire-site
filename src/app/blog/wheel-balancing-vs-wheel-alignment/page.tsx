import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/lib/jsonld";
import { getPost, formatPostDate } from "@/lib/posts";
import { getService, formatPrice, requirePrice, ALIGNMENT_OFFERS } from "@/lib/services";

const post = getPost("wheel-balancing-vs-wheel-alignment")!;
const rebalancing = getService("tire-rebalancing")!;
const alignment = getService("wheel-alignment")!;

export const metadata: Metadata = buildMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  keywords: post.keywords,
});

export default function WheelBalancingVsAlignmentPage() {
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
              These two get mixed up constantly, and the short version is this: a shake or vibration, especially
              one that gets worse at highway speed, is a balancing problem. A car that pulls to one side, a
              steering wheel that sits crooked when you're driving straight, or a tire wearing unevenly across its
              tread is an alignment problem. Balancing is about how the weight is distributed around each wheel.
              Alignment is about the angles the wheels sit at relative to the road and each other. They're
              different jobs, priced differently, fixing different faults. Pay for one when you needed the other
              and the symptom that sent you in is still there when you drive off.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              The quick way to tell them apart
            </h2>
            <p>
              If you had to remember one rule, this is it: vibration means balancing, pulling means alignment.
              A wheel and tire assembly is never perfectly even in weight all the way around. Small differences
              in the rubber and the metal mean one side is always slightly heavier than the other, so small
              weights get clipped to the rim to cancel that out. When a weight falls off, or a new tire goes on
              without being balanced properly, the heavy spot spins around faster than the rest of the wheel and
              shakes the car. It gets worse the faster you go, which is why it shows up most on the highway.
            </p>
            <p>
              Pulling and crooked steering are a different fault entirely. They come from the angles the wheels
              are set at, angles that are meant to keep all four tires pointed the same way and sitting flat on
              the road. Knock those angles out, usually by hitting a pothole or a curb, and the car stops tracking
              straight on its own. No amount of rebalancing fixes that, because the wheel itself isn't the
              problem. The angle it's sitting at is.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              What sends a car in for balancing
            </h2>
            <p>
              Balancing gets checked whenever a wheel comes off the car, whether that's a new tire, a flat
              repair, or a seasonal changeover, because taking the tire off and putting it back on can shift the
              weight enough to throw it out. It also gets checked on its own when a driver notices a shake that
              wasn't there before, which usually means a wheel weight has come loose or fallen off entirely.
              Either way it's done on a machine that spins the wheel and shows exactly where the weight needs to
              go. It isn't something anyone can eyeball. At Boss Tire, rebalancing is {formatPrice(requirePrice(rebalancing))}{" "}
              {rebalancing.priceNote}, before tax.
            </p>
            <p>
              Left alone, an out-of-balance wheel doesn't fix itself. The vibration tends to get worse rather
              than better, because the heavy spot keeps hammering the same point on the tire and the suspension
              underneath it every rotation. That uneven pounding wears the tire faster in that one spot and
              puts extra wear on the parts holding the wheel in place. A cheap fix left too long turns into a
              more expensive one.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              What sends a car in for alignment
            </h2>
            <p>
              Alignment is the job when the symptom is directional rather than a shake: the car drifting to one
              side on a flat road, the steering wheel off-centre when you're going straight, or a tire wearing
              down faster on its inside or outside edge than the rest of the tread. At Boss Tire an alignment is{" "}
              {formatPrice(requirePrice(alignment))}, before tax. We've laid out the full case for it and what's
              covered on the{" "}
              <Link href="/services/wheel-alignment" className="link-grow font-semibold text-[var(--color-red-deep)]">
                wheel alignment
              </Link>{" "}
              page. It's worth reading if that's the symptom you're dealing with, since it goes into what's
              actually involved beyond the quick version here.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              Why new tires need balancing but not automatically alignment
            </h2>
            <p>
              This is where the two get tangled together most. Every new tire gets balanced as part of putting
              it on, and that's not optional, because an unbalanced wheel will shake from the first drive. But a
              new set of tires doesn't, by itself, change the angles the wheels sit at. Those angles are set by
              the suspension, not the rubber, so fitting new tires on a car that was already tracking straight
              doesn't require a fresh alignment on its own.
            </p>
            <p>
              Where it does matter is if the car was already showing alignment symptoms before the new tires
              went on, or if the old set wore unevenly, because new tires dropped onto misaligned angles will
              start wearing the same way the old ones did. That's also exactly when it's worth checking: buy 4
              tires with us and the alignment is {ALIGNMENT_OFFERS[0].saving.toLowerCase()}, buy 2 and it's{" "}
              {ALIGNMENT_OFFERS[1].saving.toLowerCase()}, so confirming the angles alongside a new set costs a
              lot less than finding out six months later that the new tires wore the same way the old ones did.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              Why paying for the wrong one fixes nothing
            </h2>
            <p>
              This is the part that actually costs people money. Balancing a wheel does nothing to the angles
              it sits at, so if the real problem is alignment, you'll drive out with the same pull you drove in
              with. The shake test on the balancer was never going to touch it. The reverse is just as true:
              setting the angles on the rack doesn't move a single wheel weight, so a vibration caused by an
              unbalanced wheel is still there after an alignment, no matter how precisely the camber, caster and
              toe get set. Neither job is wrong to do. They're answers to different questions, and buying the
              wrong answer means paying again for the right one once the actual symptom is still sitting there.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              You can have both problems at once
            </h2>
            <p>
              A hard pothole hit can throw a wheel out of balance and knock the alignment out in the same
              moment, so a car can come in with a vibration and a pull at the same time. That's not two
              separate coincidences. It's one impact showing up two ways, on two different systems. If you're
              not sure which one you're dealing with, call and describe both symptoms rather than guessing at
              one. Getting the wheel spun on the balancer and the angles checked on the rack takes the guessing
              out of it, and you only pay for the job the car actually needs.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        heading="Shake, or pull?"
        sub="Call and tell us what the car's doing and we'll check the right thing, balanced on the machine or set straight on the rack."
      />
    </>
  );
}
