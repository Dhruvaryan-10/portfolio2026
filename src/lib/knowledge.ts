import { config } from "@/data/config";
import { PROJECTS } from "@/data/projects";
import { EXPERIENCE, SKILLS } from "@/data/constants";

/**
 * Everything the "Ask about me" assistant is allowed to know, built from the
 * same data files that render the site. Edit those files, not this one.
 */
export type KnowledgeDoc = {
  id: string;
  title: string;
  url: string;
  text: string;
  /** One-sentence summary used when answering without an AI provider */
  short: string;
};

const profileText = () =>
  [
    `${config.author} — ${config.role}.`,
    config.description.long,
    `Education: B.Tech in Computer Science and Engineering (AI/ML specialisation) at SRM Institute of Science and Technology, Chennai. GPA 9.34/10. Graduating May 2027.`,
    `Availability: ${config.availability}. Location: ${config.location}.`,
    `Contact: email ${config.email}, LinkedIn ${config.social.linkedin}, GitHub ${config.social.github}, LeetCode ${config.social.leetcode}. Resume: ${config.site}${config.resume}.`,
    `Certifications: ${config.certifications.map((c) => `${c.name} (${c.year})`).join("; ")}.`,
    `Currently: ${config.now.join(" ")}`,
  ].join("\n");

export const buildKnowledge = (): KnowledgeDoc[] => {
  const docs: KnowledgeDoc[] = [
    { id: "profile", title: "About Dhruvaryan", url: "/about", text: profileText(), short: config.description.short },
    {
      id: "skills",
      title: "Skills",
      url: "/#skills",
      short: "AI and ML, full-stack web development and data analytics.",
      text:
        "Skills and tools: " +
        Object.values(SKILLS)
          .map((s) => `${s.label} (${s.category})`)
          .join(", ") +
        ". Also: TypeScript, FastAPI, LightGBM, SHAP, LangChain, Gemini API, Supabase, Streamlit, AWS, Kotlin, Spring Boot.",
    },
  ];

  EXPERIENCE.forEach((e) =>
    docs.push({
      id: `exp-${e.id}`,
      title: `${e.title} — ${e.company}`,
      url: "/#experience",
      short: `${e.startDate} – ${e.endDate}. ${e.description.join(" ")}`,
      text: `${e.title} at ${e.company}, ${e.startDate} to ${e.endDate}. ${e.description.join(" ")} Skills: ${e.skills
        .map((s) => SKILLS[s]?.label)
        .filter(Boolean)
        .join(", ")}.`,
    })
  );

  PROJECTS.forEach((p) =>
    docs.push({
      id: `project-${p.slug}`,
      title: p.name,
      url: `/projects/${p.slug}`,
      short: p.tldr ? `${p.summary} Result: ${p.tldr.result}` : p.summary,
      text: [
        `${p.name}: ${p.tagline}. Year ${p.year}. Role: ${p.role}.${p.team ? ` Team: ${p.team}.` : ""}`,
        p.summary,
        `Problem: ${p.problem}`,
        `What was built: ${p.approach.join(" ")}`,
        `Highlights: ${p.highlights.join(" ")}`,
        p.stats ? `Numbers: ${p.stats.map((s) => `${s.value} ${s.label}`).join(", ")}.` : "",
        p.decisions ? `Decisions: ${p.decisions.map((d) => `${d.title}: ${d.why}`).join(" ")}` : "",
        `Tech: ${p.tech.join(", ")}. Categories: ${p.categories.join(", ")}.`,
        p.live ? `Live: ${p.live}` : "",
        p.github ? `Code: ${p.github}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    })
  );

  return docs;
};

// ── Lightweight keyword retrieval (no external service needed) ──────────────

const STOP = new Set(
  "a an and are as at be by does did do for from has have he him his how i in is it its me my of on or so that the their them they this to was what when where which who why with you your about tell can any".split(
    " "
  )
);

const SYNONYMS: Record<string, string[]> = {
  ml: ["machine", "learning", "lightgbm", "model"],
  ai: ["agent", "agents", "llm", "gemini", "langchain", "ai"],
  llm: ["agent", "agents", "gemini", "langchain", "assistant"],
  intern: ["internship", "intern", "giz", "brainmint"],
  internship: ["intern", "giz", "brainmint"],
  internships: ["intern", "giz", "brainmint"],
  experience: ["intern", "internship", "giz", "brainmint"],
  frontend: ["react", "next.js", "front-end", "interface"],
  backend: ["fastapi", "express", "node.js", "postgresql", "api"],
  data: ["pandas", "analytics", "dashboard", "data"],
  database: ["postgresql", "supabase", "sql", "neon"],
  contact: ["email", "linkedin", "contact"],
  hire: ["availability", "graduating", "open", "roles"],
  available: ["availability", "graduating", "open", "roles"],
  graduate: ["graduating", "2027", "education"],
  education: ["gpa", "srm", "b.tech", "graduating"],
  certified: ["certifications", "aws"],
  certification: ["certifications", "aws"],
  finance: ["fund", "tax", "smartca", "mutual"],
  kaggle: ["competition", "challenge", "amazon"],
  competition: ["challenge", "amazon", "leaderboard"],
};

export const tokenize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9.+#\s-]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t));

export const retrieve = (question: string, docs: KnowledgeDoc[], k = 4) => {
  const q = tokenize(question);
  const expanded = new Set(q.flatMap((t) => [t, ...(SYNONYMS[t] ?? [])]));
  const docTokens = docs.map((d) => tokenize(`${d.title} ${d.title} ${d.text}`));
  const df = new Map<string, number>();
  docTokens.forEach((toks) => new Set(toks).forEach((t) => df.set(t, (df.get(t) ?? 0) + 1)));
  const N = docs.length;

  const scored = docs.map((doc, i) => {
    const toks = docTokens[i];
    let score = 0;
    expanded.forEach((t) => {
      const tf = toks.filter((x) => x === t || (t.length > 3 && x.startsWith(t))).length;
      if (tf) score += (1 + Math.log(tf)) * Math.log(1 + N / (df.get(t) ?? 1));
    });
    return { doc, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => s.doc);
};
