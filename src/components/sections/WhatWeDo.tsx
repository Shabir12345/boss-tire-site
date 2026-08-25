import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

const TILES = [
  { href: "/tires", title: "New & Used Tires", photo: "/photos/tire-rack.jpg", alt: "A rack of Boss Tires in stock at the shop" },
  { href: "/services", title: "Wheel Alignment", photo: "/photos/alignment.jpg", alt: "Four-wheel alignment being performed at Boss Tire" },
  { href: "/winter-tire-changeover", title: "Winter Changeover", photo: "/photos/tire-install.jpg", alt: "Technician mounting a tire during a seasonal changeover" },
  { href: "/services", title: "Rims & Wheel Repair", photo: "/photos/rims-wall.jpg", alt: "Alloy rims on the wall at Boss Tire" },
];

// Photo-led service tiles. `onDark` themes the surrounding copy for ink bands.
export function WhatWeDo({ onDark = false }: { onDark?: boolean }) {
  return (
    <section className={onDark ? "bg-[var(--color-ink)]" : ""}>
      <div className="gutter-safe mx-auto max-w-6xl py-16 sm:py-20">
        <Eyebrow onDark={onDark}>What we do</Eyebrow>
        <h2 className={`mt-4 max-w-2xl text-3xl sm:text-4xl ${onDark ? "text-white" : "text-[var(--color-heading)]"}`}>
          One shop for tires, wheels &amp; exhaust
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-white/12 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.85)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1.5 hover:shadow-[0_26px_60px_-20px_rgba(0,0,0,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
            >
              <Image
                src={t.photo}
                alt={t.alt}
                fill
                sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
              />
              {/* Legibility scrim: heavier at the base so the label reads,
                  clearing to a light top so the photo still shows through. */}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-black/5" />
              {/* Red edge that ignites on hover — separates the tile from the
                  ink stage and carries the brand accent. */}
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent transition-colors duration-300 group-hover:ring-2 group-hover:ring-[var(--color-red)]" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="block h-[3px] w-9 bg-[var(--color-red)] transition-[width] duration-300 group-hover:w-14" aria-hidden />
                <h3 className="mt-3 text-xl font-bold leading-tight text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">{t.title}</h3>
                <span className="mt-1.5 inline-flex items-center gap-1 font-display text-sm font-bold uppercase tracking-wide text-white/85 transition-transform duration-200 group-hover:translate-x-1">
                  View <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className={`mt-6 text-sm ${onDark ? "text-[var(--color-on-dark-mute)]" : "text-[var(--color-muted)]"}`}>
          Also:{" "}
          <Link href="/muffler-exhaust" className="link-grow font-semibold text-[var(--color-red)]">
            muffler &amp; exhaust
          </Link>
          , oil changes, TPMS, tire storage and caliper painting —{" "}
          <Link href="/services" className={`link-grow font-semibold ${onDark ? "text-white" : "text-[var(--color-heading)]"}`}>
            see all services &amp; prices
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
