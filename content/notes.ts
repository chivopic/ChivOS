export type NoteLink = {
  title: string;
  description: string;
  href: string;
};

export const notesIntro =
  "Notes point into the garden — not a second blog engine. Open a link when you want depth.";

export const noteLinks: NoteLink[] = [
  {
    title: "chiv.blog — home",
    description: "Digital garden entry. Essays, notes, and slow thinking.",
    href: "https://chiv.blog",
  },
  {
    title: "GitHub — chivopic",
    description: "Public repos and scaffolding in progress.",
    href: "https://github.com/chivopic",
  },
  {
    title: "ChivOS brief",
    description: "Product brief for this desktop (in-repo docs).",
    href: "https://github.com/chivopic/ChivOS/blob/main/docs/BRIEF.md",
  },
];
