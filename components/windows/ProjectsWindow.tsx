import { projects } from "@/content/projects";

const statusLabel: Record<(typeof projects)[number]["status"], string> = {
  active: "Active",
  paused: "Paused",
  shipped: "Shipped",
  idea: "Idea",
};

export function ProjectsWindow() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-desk-muted">
          Projects
        </p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-desk-muted">
          Featured work — placeholders welcome until links land.
        </p>
      </div>
      <ul className="space-y-3">
        {projects.map((p) => (
          <li
            key={p.name}
            className="rounded-xl border border-desk-border/90 bg-desk-bg/50 p-3.5 transition hover:border-desk-border"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="desk-link font-medium"
                  >
                    {p.name}
                  </a>
                ) : (
                  <span className="font-medium text-desk-text">{p.name}</span>
                )}
                <p className="mt-1.5 text-[13px] leading-relaxed text-desk-muted">
                  {p.summary}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-desk-border/90 px-2 py-0.5 text-[10px] uppercase tracking-wide text-desk-muted">
                {statusLabel[p.status]}
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="text-[10px] text-desk-muted/90">
                  #{t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
