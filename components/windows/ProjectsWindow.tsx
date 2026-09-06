import { projects } from "@/content/projects";

const statusLabel: Record<(typeof projects)[number]["status"], string> = {
  active: "Active",
  paused: "Paused",
  shipped: "Shipped",
  idea: "Idea",
};

export function ProjectsWindow() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-desk-muted">Projects</p>
        <p className="mt-1 text-desk-muted">Featured work — placeholders welcome until links land.</p>
      </div>
      <ul className="space-y-3">
        {projects.map((p) => (
          <li
            key={p.name}
            className="rounded-lg border border-desk-border bg-desk-bg/60 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-desk-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
                  >
                    {p.name}
                  </a>
                ) : (
                  <span className="font-medium text-desk-text">{p.name}</span>
                )}
                <p className="mt-1 text-desk-muted">{p.summary}</p>
              </div>
              <span className="shrink-0 rounded-full border border-desk-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-desk-muted">
                {statusLabel[p.status]}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="text-[10px] text-desk-muted">
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
