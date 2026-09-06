type BrandMarkProps = {
  className?: string;
};

/** Small window-with-diamond mark used in the status bar and favicon. */
export function BrandMark({ className = "h-4 w-4" }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
    >
      <rect
        x="2.5"
        y="3.5"
        width="19"
        height="17"
        rx="4"
        stroke="#6ea8ff"
        strokeWidth="1.6"
      />
      <path d="M2.5 8.25h19" stroke="#6ea8ff" strokeWidth="1.35" />
      <path
        d="M12 10.2 15.15 13.4 12 16.55 8.85 13.4 12 10.2Z"
        fill="#c9a227"
      />
    </svg>
  );
}
