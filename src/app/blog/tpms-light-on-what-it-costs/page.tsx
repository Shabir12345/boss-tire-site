import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/lib/jsonld";
import { getPost, formatPostDate } from "@/lib/posts";
import { getService, formatPrice, requirePrice } from "@/lib/services";

const post = getPost("tpms-light-on-what-it-costs")!;
const tpms = getService("tpms")!;

export const metadata: Metadata = buildMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  keywords: post.keywords,
});

export default function TpmsLightOnPage() {
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
              A TPMS light means the system that watches your tire pressure has flagged something, and that
              something is usually one of three things: a tire that has actually lost pressure, a sensor whose
              battery is dying, or a sensor that needs to be re-taught which wheel it's on after a tire change.
              Only the first of those is a flat-tire problem. The other two are a sensor issue with a known fix
              at Boss Tire — {formatPrice(requirePrice(tpms))}, before tax — not four new tires. The light on its
              own doesn't tell you which of the three you've got. What it looks like does.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              A solid light and a flashing light are not the same problem
            </h2>
            <p>
              A steady TPMS light is the system reporting a pressure reading outside the normal range on at
              least one tire. That's the straightforward case — check the pressure at all four corners (the
              correct number is on the placard inside the driver's door jamb, not on the tire sidewall, and it's
              usually different front to rear) and top up whichever tire is low.
            </p>
            <p>
              A flashing light is a different message. On most vehicles, a TPMS light that flashes for a set
              period after startup and then stays solid is telling you the system itself has a fault — a sensor
              it can't read, a battery that has finally given out, or a receiver that isn't picking up one of the
              four signals — rather than reporting a pressure number at all. Adding air to a tire won't clear a
              flashing light, because low pressure isn't what triggered it. That distinction is the first thing
              worth checking before you assume you've got a flat.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              The three common causes
            </h2>
            <p>
              <strong>Genuine low pressure.</strong> The tire has actually lost air — through a slow puncture, a
              valve stem that's aging, or just normal loss over months of driving. This is the case the system
              was built to catch, and it's worth taking seriously: get the tire checked rather than just
              topping it up and moving on, since a tire that's losing air on its own usually keeps losing it.
            </p>
            <p>
              <strong>A sensor at the end of its battery life.</strong> Each TPMS sensor is a small battery-powered
              transmitter mounted inside the wheel, and the battery is sealed into the sensor itself — there's no
              swapping it out separately, so when the battery goes, the sensor gets replaced as a unit. Sensor
              batteries are commonly quoted as lasting somewhere in the five-to-ten-year range, which means a
              light appearing on a car that's been on the road a while is often a sensor reaching the end of its
              life rather than an actual leak. If your tires are holding pressure fine and the light still won't
              clear, this is usually the answer.
            </p>
            <p>
              <strong>A sensor that needs a relearn.</strong> After a tire change, a seasonal wheel swap, or
              rotating tires between positions, the system sometimes loses track of which sensor is mounted at
              which corner and needs to be walked back through a relearn procedure before it reports correctly
              again. This is a programming step, not a parts problem — nothing is broken, the system just needs
              to be told what's where.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              Why the light comes on every autumn, right on schedule
            </h2>
            <p>
              This one catches people every year and it isn't a coincidence. Air contracts as it cools, so the
              pressure inside a tire drops on a cold morning even though nothing has leaked out and nothing is
              wrong with the tire. The first properly cold morning of the season is exactly when a lot of TPMS
              lights come on at once, city-wide, on tires that were perfectly fine the day before. It isn't the
              tire failing — it's the same volume of air taking up less pressure at a lower temperature. Checking
              and topping up pressure as the weather turns is normal seasonal maintenance, not a sign anything's
              gone wrong.
            </p>
            <p>
              It often looks confusing before it looks obvious. The light may come on first thing in the morning
              and then clear on its own once the car has been driven for a while, because the tires warm up and
              the air inside expands back toward its normal pressure. That flicker — on cold, off once warm — is
              a strong sign the cause is temperature rather than a leak. A tire that keeps triggering the light
              regardless of how long you've been driving, warm or cold, is more likely losing air on its own and
              is worth having checked properly rather than written off as "just the cold."
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              When it's fine to keep driving, and when it isn't
            </h2>
            <p>
              A light that comes on after a cold snap or shortly after a tire change, with no vibration,
              no pulling, and no visible damage, is safe to drive on while you get it checked in the next day or
              two — it's very unlikely to be an emergency. What changes the calculus is a tire that looks or
              feels different: visibly low, soft to the eye, thumping, or pulling the car to one side. Any of
              those means pull over and check it before you keep going, TPMS light or not, because a tire that
              feels wrong can be going flat fast regardless of what the dashboard says. The light is a prompt to
              check, not a substitute for looking at the tire yourself.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              What the fix actually costs
            </h2>
            <p>
              TPMS service at Boss Tire is {formatPrice(requirePrice(tpms))}, before tax, and covers{" "}
              {tpms.included[0].toLowerCase()}, {tpms.included[1].toLowerCase()}, and{" "}
              {tpms.included[2].toLowerCase()}. That's the same price whether the light turns out to be a dying
              sensor battery or a relearn that never ran after your last tire change — you get a diagnosis first,
              so you're not paying to guess. See{" "}
              <Link href="/services#tpms" className="link-grow font-semibold text-[var(--color-red-deep)]">
                the full service list
              </Link>{" "}
              for where TPMS sits alongside everything else we do.
            </p>
            <p>
              If your light just came on, start by checking pressure at all four corners against the door-jamb
              placard. If the tires are all reading fine and the light won't clear, bring it in and we'll tell
              you whether it's a sensor, a relearn, or something else — before anything gets replaced.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        heading="TPMS light won't clear?"
        sub="Bring it in and we'll diagnose it properly — sensor, relearn or genuine low pressure — before anything gets replaced."
      />
    </>
  );
}
