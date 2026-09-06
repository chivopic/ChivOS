import { about } from "@/content/about";

export function AboutWindow() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-desk-muted">
          About
        </p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-desk-text">
          {about.name}
        </h3>
        <p className="mt-0.5 text-desk-accent">@{about.handle}</p>
        <p className="mt-1 text-sm text-desk-muted">{about.role}</p>
      </div>
      <p className="font-mono text-xs tracking-wide text-desk-warm">
        {about.tagline}
      </p>
      <div className="space-y-3.5 text-[13.5px] leading-relaxed text-desk-muted">
        {about.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <div>
        <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-desk-muted">
          Focus
        </p>
        <ul className="flex flex-wrap gap-2">
          {about.focus.map((item) => (
            <li
              key={item}
              className="rounded-full border border-desk-border/90 bg-desk-bg/80 px-3 py-1 text-xs text-desk-text"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
