# ChivOS

Browser personal desktop for **Chiv** (chivopic) — a quiet workshop shell, not a Win95 parody.

Motto: build things · explore deeply · stay curious

Product brief: [docs/BRIEF.md](docs/BRIEF.md)

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel-ready (no auth, no database)

## Features (v1)

- Full-viewport desktop with icons, dock, clock, and ChivOS wordmark
- Draggable / focusable / closable windows
- Mobile: app list to full-screen panels
- Content windows: About, Projects, Notes, Now, Contact (real copy)
- Basic keyboard accessibility (Enter/Space on icons, Escape to close)

## Local development

From this directory:

1. Install dependencies with your Node package manager (lockfile: package-lock after first install)
2. Dev server: `run dev` script — http://localhost:3000
3. Production: `run build` then `start`

## Content edits

Typed content lives under `content/`:

- `content/about.ts` — About
- `content/projects.ts` — Projects
- `content/notes.ts` — Notes
- `content/now.ts` — Now (monthly status)
- `content/contact.ts` — Contact

## Deploy

Connect the repo to Vercel. Production deploys from `main` after merge.

## License

Personal project — unofficial OS metaphor for a personal site.
