import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/lib/jsonld";
import { getPost, formatPostDate } from "@/lib/posts";
import { getService, formatPrice, requirePrice } from "@/lib/services";

const post = getPost("is-a-muffler-delete-legal-in-ontario")!;
const muffler = getService("muffler-repair")!;
const exhaust = getService("exhaust-repair")!;

const H2 = "pt-4 font-display text-2xl font-bold uppercase tracking-wide text-[var(--color-heading)]";
const LINK = "link-grow font-semibold text-[var(--color-red-deep)]";

export const metadata: Metadata = buildMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  keywords: post.keywords,
});

export default function MufflerDeleteLegalPage() {
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
              No. On a car or truck you drive on public roads in Ontario, removing the muffler is against the law.
              Section 75 of the Highway Traffic Act requires every motor vehicle to have a muffler in good working
              order and in constant operation, and it names the common workarounds outright: a muffler cut-out, a
              straight exhaust, a gutted muffler, a &ldquo;Hollywood&rdquo; muffler, a by-pass or any similar
              device. A muffler delete is a straight exhaust by another name, so it is exactly what the section
              was written to catch. A car on a trailer headed for the track is a different story; a car you drive
              to work is not.
            </p>
            <p className="text-base text-[var(--color-muted)]">
              We&rsquo;re a tire and exhaust shop, not lawyers. This is a plain-English reading of the rule so you
              know where you stand, not legal advice. If you&rsquo;ve been charged, talk to a paralegal or lawyer.
              The full text is in the{" "}
              <a
                href="https://www.ontario.ca/laws/statute/90h08"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                Highway Traffic Act on ontario.ca
              </a>
              .
            </p>

            <h2 className={H2}>What the law actually says</h2>
            <p>
              Section 75 does two jobs. First, it sets a standard: the vehicle has to have a working muffler, and
              that muffler has to be doing its job all the time to prevent &ldquo;excessive or unusual
              noise&rdquo; and excessive smoke. Second, it bans the specific ways people get around the first
              part, by removing the muffler, hollowing it out or routing the exhaust around it.
            </p>
            <p>
              That second part matters because it means there&rsquo;s no argument about decibels to be had. An
              officer doesn&rsquo;t need a sound meter to write a ticket for a car with a pipe where the muffler
              used to be. The equipment itself is the offence. The first part, the &ldquo;excessive or unusual
              noise&rdquo; test, is what catches everything in between: a rusted-through muffler that&rsquo;s
              blowing, a cheap aftermarket can that drones, or a system that&rsquo;s technically complete but
              obviously much louder than it should be.
            </p>

            <h2 className={H2}>What about a resonator delete?</h2>
            <p>
              A resonator is a separate chamber, usually further forward in the exhaust than the muffler, that
              cancels out particular frequencies, the drone you hear at highway cruising speed. Plenty of cars
              have one, some don&rsquo;t. Removing it is a common first modification because it adds a bit of
              sound without taking the muffler off.
            </p>
            <p>
              Section 75 doesn&rsquo;t list resonators by name the way it lists straight pipes and gutted
              mufflers, so a resonator delete on its own is in a greyer area than a muffler delete. But the car
              still has to avoid &ldquo;excessive or unusual noise,&rdquo; and that standard doesn&rsquo;t care
              which part you took out. A resonator delete that leaves the car only a little throatier is one
              thing; one that makes it drone and crackle down the street is the kind of loud the law is aimed at.
              If you&rsquo;re weighing it up, the question to ask is not &ldquo;is this part required?&rdquo; but
              &ldquo;will this be obviously louder than a normal car?&rdquo;
            </p>

            <h2 className={H2}>It shows up at a safety inspection too</h2>
            <p>
              Selling a car in Ontario, or registering one you&rsquo;ve bought, usually means a Safety Standards
              Certificate, and the exhaust system is part of that inspection. A missing muffler, a leak, or a
              section that&rsquo;s been cut out and piped over is a common reason for a car to fail. So even if
              you&rsquo;ve never been pulled over, a delete tends to cost money eventually: the car has to be put
              back to a working exhaust before it passes.
            </p>
            <p>
              A delete done by cutting out the muffler and welding in pipe also isn&rsquo;t always done well.
              Poor joints leak, and an exhaust leak ahead of the cabin is not just noise. It can let exhaust gases,
              including carbon monoxide, into the car. If yours sounds like it&rsquo;s ticking or puffing at a
              joint, read{" "}
              <Link href="/muffler-exhaust/exhaust-leak-repair" className={LINK}>
                what an exhaust leak repair involves
              </Link>
              .
            </p>

            <h2 className={H2}>Don&rsquo;t confuse it with a cat delete</h2>
            <p>
              A muffler delete and a catalytic converter delete get lumped together online, but they&rsquo;re
              different parts with different jobs. The muffler handles noise; the catalytic converter handles
              emissions. Removing a converter is an emissions problem on top of a noise one, and it&rsquo;s a far
              more expensive part to put back. If yours has been stolen or has failed, we cover{" "}
              <Link href="/blog/catalytic-converter-replacement-cost-toronto" className={LINK}>
                what a catalytic converter replacement costs in Toronto
              </Link>
              .
            </p>

            <h2 className={H2}>If you want more sound, legally</h2>
            <p>
              The law requires a working muffler. It doesn&rsquo;t require the quietest one ever made. Mufflers
              vary a lot in how much they restrict and how they sound, and swapping one muffler for another is a
              very different thing from running no muffler at all. The test is still whether the result is
              excessive or unusual noise, so a sensible choice for your car keeps it on the right side of the
              line. Call the shop and ask what&rsquo;s possible on your vehicle before you buy anything online.
            </p>

            <h2 className={H2}>Already been pulled over?</h2>
            <p>
              If you&rsquo;ve been stopped or ticketed for the exhaust, or a safety inspection has flagged it, the
              practical fix is getting a proper muffler back on. Muffler repair and replacement at Boss Tire is
              {formatPrice(requirePrice(muffler))} ({muffler.priceNote}), and exhaust repair, including pipe,
              hanger and weld work, is {formatPrice(requirePrice(exhaust))}, before tax. See{" "}
              <Link href="/muffler-exhaust" className={LINK}>
                muffler and exhaust repair
              </Link>{" "}
              for what&rsquo;s included, or call and tell us what&rsquo;s on the car now and we&rsquo;ll tell you
              what it needs.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        heading="Exhaust too loud?"
        sub="Call the shop and tell us what's on the car now. We'll price getting a proper muffler back on."
      />
    </>
  );
}
