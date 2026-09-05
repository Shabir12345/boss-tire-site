import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/lib/jsonld";
import { postsNewestFirst, formatPostDate } from "@/lib/posts";

export const metadata: Metadata = buildMetadata({
  title: "Tire & Exhaust Advice",
  description:
    "Straight answers on tires, wheel alignment and exhaust work from the team at Boss Tire on Danforth Rd, Scarborough — what things cost, when they need doing, and when they don't.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = postsNewestFirst();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <PageHeader
        eyebrow="Advice"
        title="Straight answers, no upsell"
        sub="What things actually cost, when they need doing, and when they don't — from the bay on Danforth Rd."
        image="/photos/tires-shop.jpg"
        imageAlt="The Boss Tire workshop on Danforth Rd, Scarborough"
      />
      <section className="bg-[var(--color-paper)]">
        <div className="gutter-safe mx-auto max-w-4xl py-16 sm:py-20">
          <ul className="space-y-8">
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-[var(--color-border)] pb-8 last:border-0">
                <p className="text-sm text-[var(--color-muted)]">{formatPostDate(p.published)}</p>
                <h2 className="mt-2 text-2xl text-[var(--color-heading)]">
                  <Link href={`/blog/${p.slug}`} className="link-grow">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 text-[var(--color-body)]">{p.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTABand
        heading="Rather just ask us?"
        sub="Call the shop and describe it — we'll tell you straight what it needs."
      />
    </>
  );
}
