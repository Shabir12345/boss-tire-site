"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CallButton } from "@/components/ui/Button";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/tires", label: "Tires" },
  { href: "/muffler-exhaust", label: "Muffler & Exhaust" },
  { href: "/winter-tire-changeover", label: "Winter Changeover" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" focusable="false" width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
      {open ? (
        <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
      ) : (
        <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
      )}
    </svg>
  );
}

function Wordmark() {
  return (
    <Image
      src="/logo-boss.png"
      alt="Boss Tire — Your Tire Partner"
      width={158}
      height={72}
      // Eager but NOT priority: a priority logo emits its own image preload that
      // competes with the LCP hero for the first mobile connections. fetchPriority
      // high keeps it prompt without preloading ahead of the hero.
      loading="eager"
      fetchPriority="high"
      className="h-12 w-auto"
    />
  );
}

// Ink sticky bar. Call-first: the red CallButton shows at every breakpoint.
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    !pathname ? false : href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 border-b border-white/10 bg-[#0B0B0Cf2] backdrop-blur-md"
      style={{ zIndex: "var(--z-sticky)" }}
    >
      <div className="gutter-safe mx-auto flex h-16 max-w-6xl items-center gap-3">
        <Link
          href="/"
          className="flex min-w-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
          aria-label="Boss Tire home"
        >
          <Wordmark />
        </Link>

        <nav className="ml-6 hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={`link-grow rounded-md text-sm font-medium transition-colors duration-150 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] ${
                isActive(href) ? "text-white" : "text-white/70"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <CallButton compact trackLocation="header" />
          <button
            type="button"
            className="rounded-md p-3 -mr-3 text-white/90 transition-colors duration-150 hover:text-[var(--color-red)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] lg:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="border-t border-white/10 bg-[var(--color-ink)] px-4 py-4 lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                aria-current={isActive(href) ? "page" : undefined}
                className={`rounded-md border-b border-white/10 px-2 py-3 text-base font-medium transition-colors duration-150 last:border-0 hover:text-[var(--color-red)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] ${
                  isActive(href) ? "text-white" : "text-white/80"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
