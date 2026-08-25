// Small tire-tread block motif from the logo's tread "C". Marks eyebrows and
// list bullets — one of the design signatures (DESIGN.md). Decorative only.
export function TreadMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <rect x="2" y="4" width="4" height="4" rx="1" />
      <rect x="10" y="4" width="4" height="4" rx="1" />
      <rect x="18" y="4" width="4" height="4" rx="1" />
      <rect x="2" y="10" width="4" height="4" rx="1" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
      <rect x="18" y="10" width="4" height="4" rx="1" />
      <rect x="2" y="16" width="4" height="4" rx="1" />
      <rect x="10" y="16" width="4" height="4" rx="1" />
      <rect x="18" y="16" width="4" height="4" rx="1" />
    </svg>
  );
}
