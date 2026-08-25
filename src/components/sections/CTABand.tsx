import Image from "next/image";
import { CallButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BUSINESS } from "@/lib/business";

// Ink call-to-action band. `cut` adds the diagonal top edge where it follows a
// light section. `image` puts a real photo behind it (dark-overlaid) — used on
// the homepage with the storefront shot to close on the real place.
export function CTABand({
  heading = "Need it done today?",
  sub = "Call the shop and you'll have a straight answer and a fair price in under a minute. Mon–Sat, 9 to 7.",
  cut = false,
  image,
}: {
  heading?: string;
  sub?: string;
  cut?: boolean;
  image?: string;
}) {
  return (
    <section className={`relative isolate overflow-hidden bg-[var(--color-ink)] ${cut ? "cut-top" : ""}`}>
      {image && (
        <>
          <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-35" />
          <div aria-hidden className="absolute inset-0 bg-[var(--color-ink)]/75" />
        </>
      )}
      <div className="gutter-safe relative mx-auto max-w-6xl py-16 text-center sm:py-20">
        <Eyebrow onDark className="justify-center">
          {BUSINESS.address.locality} · {BUSINESS.phoneDisplay}
        </Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold text-white sm:text-5xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--color-on-dark)]">{sub}</p>
        <div className="mt-8 flex justify-center">
          <CallButton size="lg" />
        </div>
      </div>
    </section>
  );
}
