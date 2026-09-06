import { about } from "@/content/about";

export function AboutWindow() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-desk-muted">About</p>
        <h3 className="mt-1 text-xl font-semibold text-desk-text">{about.name}</h3>
        <p className="text-desk-accent">@{about.handle}</p>
        <p className="mt-1 text-desk-muted">{about.role}</p>
      </div>
      <p className="font-mono text-xs text-desk-warm">{about.tagline}</p>
      <div className="space-y-3 text-desk-muted">
        {about.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-wider text-desk-muted">Focus</p>
        <ul className="flex flex-wrap gap-2">
          {about.focus.map((item) => (
            <li
              key={item}
              className="rounded-full border border-desk-border bg-desk-bg px-3 py-1 text-xs text-desk-text"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
