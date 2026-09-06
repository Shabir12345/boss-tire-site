import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/lib/jsonld";
import { getPost, formatPostDate } from "@/lib/posts";
import { getService, formatPrice, requirePrice } from "@/lib/services";

const post = getPost("catalytic-converter-replacement-cost-toronto")!;
const exhaust = getService("exhaust-repair")!;

export const metadata: Metadata = buildMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  keywords: post.keywords,
});

export default function CatalyticConverterCostPage() {
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
              There is no single honest number for what a catalytic converter replacement costs in Toronto, and
              anyone who gives you one over the phone without seeing the car is guessing. The real cost depends on
              whether your converter is OEM or aftermarket, how many your vehicle has, where it sits in the exhaust
              system, and whether the pipe, sensors or hangers around it got damaged too — whether that damage came
              from a failure or a theft. What we can do here is walk through exactly what drives that number, so a
              call to the shop gets you a real figure instead of a guess.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              Why the price moves around so much
            </h2>
            <p>
              A catalytic converter is not one standard part. OEM converters, built to the manufacturer's exact
              specification, cost more than aftermarket equivalents — and on some vehicles only the OEM part will
              satisfy emissions requirements or clear a check-engine light properly. Some cars run a single
              converter; others, particularly V6 and V8 engines, run two, which doubles the parts cost outright.
            </p>
            <p>
              Where it sits matters too. A converter mounted low and accessible under the car is a straightforward
              swap. One built into the exhaust manifold, tucked up against the engine, takes longer to reach and
              costs more in labour for exactly that reason.
            </p>
            <p>
              Then there is the condition of everything around it. If a converter failed on its own, the pipe on
              either side is often fine and the job is contained. If it was cut out by a thief, the story is
              usually messier — the pipe gets hacked through rather than unbolted, oxygen sensors are sometimes
              damaged in the process, and there can be a hanger or bracket that needs replacing along with it.
              Theft also brings insurance into the picture, which changes the conversation about what gets fixed
              and how, separate from the parts and labour themselves.
            </p>
            <p>
              There is also a fitting difference that changes labour on top of everything else. A direct-fit
              converter bolts straight onto the existing flanges in roughly the spot the old one came out of. A
              universal converter has to be cut in and welded onto the existing pipe, which takes longer and needs
              a welder rather than a wrench. Whether a direct-fit part exists for your vehicle, or whether it has to
              be a universal fit, is one more thing that only becomes clear once someone has looked at the car.
            </p>
            <p>
              None of that is a dodge. It is the honest reason nobody can quote a converter replacement without
              seeing the vehicle — the same question asked about two different cars can have answers that are
              nowhere near each other.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              Why converters get stolen in the first place
            </h2>
            <p>
              Converters get targeted because the honeycomb inside is coated with small amounts of platinum,
              palladium and rhodium — precious metals used to trigger the chemical reaction that cleans up exhaust
              gases. That is the entire reason theft became a problem: a part worth relatively little to you as a
              spare has real scrap value to whoever cuts it out. It is worth being clear that the scrap value of the
              metal has nothing to do with what a replacement part costs at the counter — one is a commodity price,
              the other is a manufactured part plus labour, and the two numbers are not related to each other.
              Converter theft is a well-documented problem across Toronto, which is exactly why so many drivers end
              up asking this question in the first place.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              How to tell if it's actually the converter
            </h2>
            <p>
              A failing converter usually announces itself gradually. A rattle from underneath, especially on
              startup or over bumps, can mean the honeycomb structure inside has broken up and is loose in the
              housing. A rotten-egg smell from the exhaust points to the converter not processing sulphur compounds
              the way it should. A check-engine light is common, and so is a failed emissions test — the converter
              is the part built specifically to clean up what the engine sends out, so when it stops working, that
              is exactly where it shows.
            </p>
            <p>
              Theft looks nothing like that. A stolen converter makes the car extremely loud the moment you start
              the engine — not a slow build-up over weeks, but a sudden, unmistakable roar from the first turn of
              the key. If that is what you are hearing, you already know the answer without needing a diagnosis.
            </p>
            <p>
              The check-engine light deserves its own note. Most vehicles run a sensor on each side of the
              converter specifically to measure how well it is cleaning the exhaust, and a converter that has
              stopped working efficiently trips a catalyst-efficiency code — commonly P0420 or P0430, depending on
              which bank of the engine it is on. That code is a strong pointer toward the converter, but it is not
              proof by itself: a leak upstream of the sensor, or a failing oxygen sensor giving a bad reading, can
              trigger the same code without the converter being the problem at all. That is exactly why the code
              gets treated as a starting point for a look underneath, not as a diagnosis on its own.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              Converter problem, or something a lot cheaper?
            </h2>
            <p>
              A rattle is where people jump to the most expensive conclusion first, and it is not always the right
              one. A loose heat shield — the thin metal panel that protects the underbody from exhaust heat — makes
              a very similar metallic rattle when a clip or bolt has worked loose, and it is a fraction of the cost
              to fix. A broken exhaust hanger lets the pipe sag and knock against the underbody over bumps, which
              can sound just as alarming and is also a much smaller job.
            </p>
            <p>
              The only way to tell them apart is to get the car up on a hoist and look. That diagnosis is exhaust
              work, not converter work, and it is priced accordingly — exhaust repair at Boss Tire starts at{" "}
              {formatPrice(requirePrice(exhaust))}, before tax, which covers finding out whether you are looking at
              a loose shield, a broken hanger, a plain pipe leak, or something that actually points to the
              converter. See{" "}
              <Link href="/muffler-exhaust/exhaust-leak-repair" className="link-grow font-semibold text-[var(--color-red-deep)]">
                exhaust leak repair
              </Link>{" "}
              for how that diagnosis works and what it typically involves.
            </p>

            <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]">
              What we can do
            </h2>
            <p>
              A catalytic converter isn't a part we stock and fit at Boss Tire. What our exhaust bay can do is get
              your car up, look at exactly what's going on underneath, and tell you straight whether you are
              dealing with a converter, a pipe, a hanger or a sensor — and what that means for the job ahead. That
              is a more useful starting point than a number pulled from a search result for a car that isn't
              yours.
            </p>
            <p>
              Bring in the year, make and model and describe what you're hearing or smelling, and we'll tell you
              what we actually find. See{" "}
              <Link href="/muffler-exhaust" className="link-grow font-semibold text-[var(--color-red-deep)]">
                everything we do in muffler &amp; exhaust
              </Link>{" "}
              for the rest of what that bay covers.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        heading="Hearing a rattle or a roar?"
        sub="Bring it in and we'll tell you exactly what's underneath — converter, pipe or hanger — before anything gets quoted."
      />
    </>
  );
}
