import type { Project } from "./projects";

/** Event fired when someone picks a skill (3D keycap click or skill chip). */
export const SKILL_EVENT = "portfolio:skill";

export const selectSkill = (label: string) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SKILL_EVENT, { detail: label }));
};

const has = (p: Project, ...names: string[]) =>
  p.tech.some((t) => names.includes(t.toLowerCase()));

/** How each skill on the keyboard maps to the projects that use it. */
const RULES: Record<string, (p: Project) => boolean> = {
  Python: (p) => has(p, "python", "fastapi", "pandas", "streamlit", "lightgbm", "scikit-learn"),
  JavaScript: (p) => has(p, "react", "next.js", "node.js", "express", "typescript"),
  HTML: (p) => has(p, "react", "next.js", "vite"),
  CSS: (p) => has(p, "tailwind css", "react", "next.js"),
  React: (p) => has(p, "react", "next.js"),
  "Next.js": (p) => has(p, "next.js"),
  "Tailwind CSS": (p) => has(p, "tailwind css"),
  "Node.js": (p) => has(p, "node.js", "express"),
  "Express.js": (p) => has(p, "express"),
  PostgreSQL: (p) => has(p, "postgresql", "supabase", "drizzle orm"),
  SQL: (p) => has(p, "postgresql", "supabase", "sqlalchemy", "drizzle orm"),
  "Machine Learning": (p) => has(p, "lightgbm", "scikit-learn", "shap"),
  "Artificial Intelligence": (p) => p.categories.includes("AI"),
  Pandas: (p) => has(p, "pandas"),
  NumPy: (p) => has(p, "numpy"),
  "Data Analytics": (p) => p.categories.includes("Data"),
  Unity: (p) => has(p, "unity"),
  Arduino: (p) => has(p, "arduino"),
  Vercel: (p) => Boolean(p.live?.includes("vercel.app")),
  Git: (p) => Boolean(p.github),
  GitHub: (p) => Boolean(p.github),
};

export const projectsForSkill = (label: string, projects: Project[]) => {
  const rule = RULES[label];
  return rule ? projects.filter(rule) : [];
};
