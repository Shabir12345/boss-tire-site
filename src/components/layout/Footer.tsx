import Image from "next/image";
import Link from "next/link";
import { BUSINESS, telHref, mailHref, addressDisplay, mapsLinkHref } from "@/lib/business";
import { REVIEWS } from "@/lib/reviews";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/tires", label: "Tires" },
  { href: "/muffler-exhaust", label: "Muffler & Exhaust" },
  { href: "/winter-tire-changeover", label: "Winter Changeover" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    // pb clears the fixed MobileCallBar on small screens.
    <footer className="bg-[var(--color-ink)] text-[var(--color-on-dark)] pb-24 lg:pb-0">
      <div className="gutter-safe mx-auto max-w-6xl py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + rating */}
          <div>
            <Image
              src="/logo-boss.png"
              alt="Boss Tire — Your Tire Partner"
              width={180}
              height={82}
              className="h-14 w-auto"
            />
            <p className="mt-4 text-sm">
              <span className="font-semibold text-white tabular">{REVIEWS.rating}★</span>{" "}
              <span className="text-[var(--color-on-dark-mute)]">
                from {REVIEWS.count} {REVIEWS.source} reviews
              </span>
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white/50">Contact</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={telHref} className="link-grow font-semibold text-white">
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={mailHref} className="link-grow text-[var(--color-on-dark)]">
                  {BUSINESS.email}
                </a>
              </li>
              <li>
                <a
                  href={mapsLinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-grow text-[var(--color-on-dark-mute)]"
                >
                  {addressDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white/50">Hours</h2>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-on-dark)]">
              <li>{BUSINESS.hours.weekdays}</li>
              <li className="text-[var(--color-on-dark-mute)]">{BUSINESS.hours.weekend}</li>
            </ul>
          </div>

          {/* Nav */}
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white/50">Explore</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="link-grow text-[var(--color-on-dark)]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-[var(--color-on-dark-mute)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={BUSINESS.socials.instagram} target="_blank" rel="noopener noreferrer" className="link-grow">
              Instagram
            </a>
            <a href={BUSINESS.socials.facebook} target="_blank" rel="noopener noreferrer" className="link-grow">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
