import { noteLinks, notesIntro } from "@/content/notes";

export function NotesWindow() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-desk-muted">Notes</p>
        <p className="mt-1 text-desk-muted">{notesIntro}</p>
      </div>
      <ul className="space-y-2">
        {noteLinks.map((n) => (
          <li key={n.href}>
            <a
              href={n.href}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg border border-desk-border bg-desk-bg/60 p-3 transition hover:border-desk-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
            >
              <span className="font-medium text-desk-accent">{n.title}</span>
              <p className="mt-1 text-xs text-desk-muted">{n.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
