import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/lib/jsonld";
import { getPost, formatPostDate } from "@/lib/posts";

const post = getPost("can-a-flat-tire-be-repaired")!;

export const metadata: Metadata = buildMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  keywords: post.keywords,
});

export default function CanAFlatTireBeRepairedPage() {
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
              Most flat tires can be repaired, but it comes down to one question: where is the puncture? A nail or
              screw straight through the tread — the flat band that contacts the road — is usually fixable. A cut,
              puncture or scrape anywhere in the sidewall, or in the shoulder where the tread curves into the
              sidewall, is not, no matter how small it looks. That single distinction, tread versus everything
              else, decides whether you are looking at a repair or a replacement before anyone even measures the
              hole.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              Why the tread is repairable and the sidewall isn't
            </h2>
            <p>
              This isn't an arbitrary rule shops invented to sell tires. The sidewall of a tire flexes with every
              rotation — it bulges and recovers thousands of times over a single drive as the tire rolls under the
              weight of the car. The tread, by comparison, is reinforced with steel belts and sits relatively still
              against that kind of constant bending. A patch bonds two rubber surfaces together and holds because
              the surrounding material stays put. Put that same patch in the sidewall and the flexing goes to work
              on the bond immediately — it doesn't fail on the drive home, it fails weeks or months later, usually
              without warning. That is the entire reason the industry treats sidewall and shoulder damage as
              non-repairable: not caution for its own sake, but a patch that is guaranteed to eventually let go
              somewhere the driver can't see it coming.
            </p>
            <p>
              There is also a limit on how big a tread puncture can be before it stops qualifying as repairable,
              even if it is dead centre in the tread. We don't quote that limit as a number here, because it isn't
              something to measure by eye or estimate from a description over the phone — it's assessed properly
              once the tire is off the rim and the hole can be seen from both sides. What matters for you to know
              is that there is an accepted limit, that too large a hole compromises the internal structure of the
              tire regardless of location, and that a shop telling you "that one's too big" isn't being difficult —
              it's declining to sell you a repair that won't hold.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              A plug is not the same repair as a patch
            </h2>
            <p>
              These two words get used interchangeably by drivers, and shops that only do one of them have every
              incentive to let that confusion stand. A plug is a sticky rubber strip pushed into the puncture from
              the outside, without taking the tire off the wheel. It seals the hole reasonably well in the short
              term, which is why plug kits exist for roadside emergencies — but nobody has looked at the inside of
              the tire to confirm there isn't hidden damage, and the plug itself is only doing half a job: sealing
              from one side of a wall that has been punctured all the way through.
            </p>
            <p>
              A patch is a different job entirely. It requires dismounting the tire from the rim, inspecting both
              the outside and the inside of the puncture, and bonding a patch to the inner liner — the smooth
              rubber surface that actually holds the air in. Because the patch is applied against the inner liner
              and cured onto it, it seals with the tire's own air pressure working in its favour rather than
              against it, and because the tire came off the rim, whoever did the repair actually saw the full
              extent of the damage before deciding it was safe to fix. That is the difference between a stopgap
              and a proper repair, and it's why a plug pushed in on the side of the road is fine to get you to a
              shop, but isn't where the job should end.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              What driving on a flat actually does to the tire
            </h2>
            <p>
              A tire that's gone completely flat and then been driven on, even for a short distance, can suffer
              damage that has nothing to do with the original puncture. The sidewall is designed to hold its shape
              under air pressure; once that pressure is gone, the weight of the car folds the sidewall against
              itself with every rotation, grinding and flexing rubber and steel belting that was never built to
              bend that way. That can break belts, separate layers inside the tire and tear the inner liner — none
              of which is visible from outside. Reinflate that same tire afterward and it can look completely
              normal, round and full, while the internal structure is already compromised. That's what makes a
              driven-on flat more dangerous than the original puncture: the damage that decides whether the tire is
              safe is now on the inside, invisible, and only shows up on a proper inspection off the rim — or
              later, on the road, when the tire fails without warning.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              Run-flat tires need their own look
            </h2>
            <p>
              Run-flat tires are built with reinforced sidewalls specifically so the car can be driven a limited
              distance after a puncture, at reduced speed, before the tire needs attention. That reinforcement
              changes how the tire behaves once it has been driven flat and changes what a repair shop needs to
              check before calling it safe to fix. Whether a specific run-flat tire is repairable after being
              driven on while flat isn't something to guess from a driveway — it needs the same off-the-rim
              inspection as any other tire, done by someone who knows what to look for in that reinforced sidewall
              structure specifically.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              So is yours repairable?
            </h2>
            <p>
              A single puncture, sitting in the tread, on a tire that wasn't driven on flat for any distance —
              that's a good bet for a repair rather than a replacement. Sidewall or shoulder damage, or a tire
              that sat flat before anyone noticed, tips the odds the other way. Either way, the only reliable
              answer comes from getting the tire off the rim and looking at both sides of the puncture — not from
              a description over the phone or a look at the tread while it's still on the car.
            </p>
            <p>
              That's the inspection{" "}
              <Link href="/services/flat-tire-repair" className="link-grow font-semibold text-[var(--color-red-deep)]">
                Boss Tire's flat tire repair service
              </Link>{" "}
              is built around — the tire comes off, gets checked properly, and you get a straight answer on
              whether it's a patch or a new tire before anything is decided for you.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        heading="Not sure if yours can be fixed?"
        sub="Bring it in and we'll take it off the rim, look at both sides of the puncture, and tell you straight whether it's repairable."
      />
    </>
  );
}
