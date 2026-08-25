import Image from "next/image";
import Link from "next/link";
import { CallButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ReviewBadge } from "@/components/ui/ReviewBadge";

// Direction B — "Cinematic garage": full-bleed real shop photo, dark scrim,
// restrained type. Moody and premium; the photo does the talking.
export function HeroCinematic() {
  return (
    <section className="relative isolate flex min-h-[38rem] items-end overflow-hidden bg-[var(--color-ink)] sm:min-h-[44rem]">
      <Image
        src="/photos/caliper.jpg"
        alt="A Boss Tire branded red brake caliper behind a black alloy wheel"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />
      {/* Scrim: dark from the left and bottom so type stays legible over the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/90 via-[var(--color-ink)]/40 to-transparent"
      />

      <div className="gutter-safe relative mx-auto w-full max-w-6xl pb-14 pt-28 sm:pb-20">
        <Eyebrow onDark>Scarborough · Tire &amp; Auto Shop</Eyebrow>
        <h1 className="mt-5 max-w-2xl text-4xl text-white sm:text-6xl">
          Tires, alignment &amp; exhaust —{" "}
          <span className="text-[var(--color-red)]">same day.</span>
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-[var(--color-on-dark)]">
          The tire and auto shop Scarborough keeps coming back to. Tires, wheels, alignment and exhaust on
          Danforth Rd, done the same day while you wait.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <CallButton size="lg" className="cta-attention" trackLocation="hero" />
          <Link
            href="#prices"
            className="inline-flex min-h-14 items-center justify-center rounded-md border border-white/30 px-8 py-4 font-display text-xl font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
          >
            See prices
          </Link>
        </div>
        <ReviewBadge onDark className="mt-6" />
      </div>
    </section>
  );
}
