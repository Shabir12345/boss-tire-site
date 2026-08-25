import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CallButton } from "@/components/ui/Button";
import { ReviewBadge } from "@/components/ui/ReviewBadge";

// Dark interior page header. pt clears the sticky header.
// When `image` is passed, the photo is blended into the header background
// behind a dark scrim (matching the homepage hero) instead of sitting in a
// separate band below — so the picture reinforces the header rather than
// pushing the trust signals and content down the page.
export function PageHeader({
  eyebrow,
  title,
  sub,
  showCall = false,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  showCall?: boolean;
  image?: string;
  imageAlt?: string;
}) {
  const content = (
    <>
      <Eyebrow onDark>{eyebrow}</Eyebrow>
      <h1 className="mt-4 max-w-3xl text-4xl text-white sm:text-6xl">{title}</h1>
      {sub && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-on-dark)]">{sub}</p>}
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        {showCall && <CallButton size="lg" className="cta-attention" trackLocation="page_header" />}
        <ReviewBadge onDark />
      </div>
    </>
  );

  if (!image) {
    return (
      <section className="bg-[var(--color-ink)]">
        <div className="gutter-safe mx-auto max-w-6xl pt-28 pb-14 sm:pt-32 sm:pb-16">{content}</div>
      </section>
    );
  }

  return (
    <section className="relative isolate flex min-h-[30rem] items-end overflow-hidden bg-[var(--color-ink)] sm:min-h-[36rem]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />
      {/* Scrim: dark from the bottom and left so type stays legible over the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/90 via-[var(--color-ink)]/40 to-transparent"
      />
      <div className="gutter-safe relative mx-auto w-full max-w-6xl pt-28 pb-14 sm:pt-32 sm:pb-16">{content}</div>
    </section>
  );
}
