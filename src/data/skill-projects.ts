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

/**
 * Skill hubs in the 3D project network. Each project is linked to the hubs
 * it uses; clicking a hub filters the project grid the same way a skill does.
 */
export const HUBS: { label: string; match: (p: Project) => boolean }[] = [
  { label: "Python", match: (p) => has(p, "python", "pandas", "lightgbm", "streamlit", "fastapi", "scikit-learn") },
  { label: "TypeScript", match: (p) => has(p, "typescript") },
  { label: "React / Next.js", match: (p) => has(p, "react", "next.js") },
  { label: "Machine learning", match: (p) => has(p, "lightgbm", "scikit-learn", "shap", "pytorch") },
  { label: "LLM agents & RAG", match: (p) => has(p, "gemini", "langchain", "rag", "llm tool calling") },
  { label: "SQL databases", match: (p) => has(p, "postgresql", "mysql", "supabase", "sqlalchemy", "drizzle orm") },
  { label: "Data & analytics", match: (p) => p.categories.includes("Data") || has(p, "echarts", "recharts") },
  { label: "APIs", match: (p) => has(p, "fastapi", "express", "node.js") },
  { label: "3D & IoT", match: (p) => has(p, "unity", "arduino") },
];

HUBS.forEach((h) => {
  if (!RULES[h.label]) RULES[h.label] = h.match;
});

export const projectsForSkill = (label: string, projects: Project[]) => {
  const rule = RULES[label];
  return rule ? projects.filter(rule) : [];
};
