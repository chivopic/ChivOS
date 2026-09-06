export type Project = {
  name: string;
  summary: string;
  status: "active" | "paused" | "shipped" | "idea";
  href?: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "ChivOS",
    summary: "Browser personal desktop — windows, dock, and quiet craft.",
    status: "active",
    href: "https://github.com/chivopic/ChivOS",
    tags: ["Next.js", "desktop", "personal"],
  },
  {
    name: "chiv.blog",
    summary: "Digital garden for long-form notes and deep dives.",
    status: "active",
    href: "https://chiv.blog",
    tags: ["writing", "garden"],
  },
  {
    name: "Forge tickets",
    summary: "Personal ops layer — briefs, tickets, and builder loops.",
    status: "active",
    tags: ["ops", "AI"],
  },
  {
    name: "Logo craft",
    summary: "Mark and favicon experiments for the Chiv brand.",
    status: "shipped",
    tags: ["design", "brand"],
  },
  {
    name: "Alpha radar",
    summary: "Weekend expectation-gap briefs on AI / semis / markets.",
    status: "active",
    tags: ["research", "writing"],
  },
  {
    name: "Pocket tools",
    summary: "Small utilities that earn a spot on the desk.",
    status: "idea",
    tags: ["tools"],
  },
];
