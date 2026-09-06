type BrandMarkProps = {
  className?: string;
};

/** Minimal geometric C / open-frame mark — matches favicon.svg */
export function BrandMark({ className = "h-4 w-4" }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
    >
      <path
        d="M17.4 7.35a6.4 6.4 0 1 0 0 9.3"
        stroke="var(--desk-accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
