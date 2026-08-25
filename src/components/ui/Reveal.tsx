"use client";

import { useEffect, useRef, useState } from "react";

// Soft fade-up once in view — a progressive enhancement, never a gate on
// content. It arms (hides then animates) ONLY elements that mount below the
// fold. Anything already in view at mount, and every no-JS render, stays fully
// visible. Suppressed under prefers-reduced-motion (see globals.css).
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already in or above the viewport at mount → leave it visible, no animation.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${armed ? "is-armed" : ""} ${inView ? "is-in" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
