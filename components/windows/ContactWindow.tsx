import { contact } from "@/content/contact";

export function ContactWindow() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-desk-muted">Contact</p>
        <h3 className="mt-1 text-xl font-semibold text-desk-text">{contact.headline}</h3>
        <p className="mt-2 text-desk-muted">{contact.body}</p>
      </div>
      <p>
        <a
          href={contact.github.href}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-desk-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
        >
          {contact.github.label}
        </a>
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={contact.cta.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg bg-desk-accent px-4 py-2 text-sm font-medium text-desk-bg transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
        >
          {contact.cta.label}
        </a>
        <a
          href={contact.secondary.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg border border-desk-border px-4 py-2 text-sm text-desk-text transition hover:border-desk-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
        >
          {contact.secondary.label}
        </a>
      </div>
    </div>
  );
}
