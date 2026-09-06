import { noteLinks, notesIntro } from "@/content/notes";

export function NotesWindow() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-desk-muted">
          Notes
        </p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-desk-muted">
          {notesIntro}
        </p>
      </div>
      <ul className="space-y-2.5">
        {noteLinks.map((n) => (
          <li key={n.href}>
            <a
              href={n.href}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-desk-border/90 bg-desk-bg/50 p-3.5 transition hover:border-desk-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
            >
              <span className="font-medium text-desk-accent">{n.title}</span>
              <p className="mt-1.5 text-xs leading-relaxed text-desk-muted">
                {n.description}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
