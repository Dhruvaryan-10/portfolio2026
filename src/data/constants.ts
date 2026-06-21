// ─────────────────────────────────────────────────────────────────────────────
// SKILL SYSTEM — Faiq Khokhar Portfolio
//
// CRITICAL ARCHITECTURE NOTE:
// The `name` field in each Skill object must exactly match the corresponding
// 3D keycap object name inside public/assets/skills-keyboard.spline.
//
// The Spline scene ships exactly 24 keycap objects (names are FIXED — do NOT
// rename them in the Spline file, they drive all hover/keydown event routing):
//   js, ts, html, css, react, vue, nextjs, tailwind,
//   nodejs, express, postgres, mongodb, git, github, prettier, npm,
//   firebase, wordpress, linux, docker, nginx, aws, vim, vercel
//
// Each slot has been re-purposed to represent a skill in this profile.
// The enum key is human-readable; the string value is the exact Spline
// object name that `splineApp.findObjectByName()` and `e.target.name`
// will return at runtime.
//
// 4 skills (C, C++, Java, Figma) are "metadata-only" — their name starts
// with "__" so `splineApp.findObjectByName()` returns null gracefully and
// they are safely skipped by all keyboard animations. They still appear in
// experience cards, about page badge carousels, etc.
// ─────────────────────────────────────────────────────────────────────────────

// ── Final Spline slot → skill mapping ────────────────────────────────────────
//
//  TOP ROW
//  js        → JavaScript
//  ts        → Python
//  html      → HTML
//  css       → CSS
//  react     → React
//  vue       → Unity
//  nextjs    → Next.js
//  tailwind  → Tailwind CSS
//
//  MIDDLE ROW
//  nodejs    → Node.js
//  express   → Express.js
//  postgres  → PostgreSQL
//  mongodb   → Flask
//  git       → Git
//  github    → GitHub
//  prettier  → Machine Learning
//  npm       → Artificial Intelligence
//
//  BOTTOM ROW
//  firebase  → SQL
//  wordpress → Pandas
//  linux     → NumPy
//  docker    → Docker
//  nginx     → Arduino
//  aws       → Power BI
//  vim       → SQLite
//  vercel    → Data Analytics

export enum SkillNames {
  // ── Languages ──────────────────────────────────────────────────────────────
  JS = "js",          // Spline slot: js
  PYTHON = "ts",          // Spline slot: ts
  HTML = "html",        // Spline slot: html
  CSS = "css",         // Spline slot: css
  CPP = "__cpp",       // metadata-only (no Spline keycap)
  C = "__c",         // metadata-only (no Spline keycap)
  JAVA = "__java",      // metadata-only (no Spline keycap)

  // ── Frontend ─────────────────────────────────────────────────────────────
  REACT = "react",       // Spline slot: react
  UNITY = "vue",         // Spline slot: vue  (visual: unity-svgrepo-com.svg)
  NEXTJS = "nextjs",      // Spline slot: nextjs
  TAILWIND = "tailwind",    // Spline slot: tailwind

  // ── Backend ───────────────────────────────────────────────────────────────
  NODEJS = "nodejs",      // Spline slot: nodejs
  EXPRESS = "express",     // Spline slot: express
  POSTGRES = "postgres",    // Spline slot: postgres
  FLASK = "mongodb",     // Spline slot: mongodb
  GIT = "git",         // Spline slot: git
  GITHUB = "github",      // Spline slot: github

  // ── AI & Data ─────────────────────────────────────────────────────────────
  ML = "prettier",    // Spline slot: prettier (visual: tensorflow-enterprise-svgrepo-com.svg)
  AI_SKILL = "npm",         // Spline slot: npm      (visual: ai.svg)
  SQL = "firebase",    // Spline slot: firebase (visual: mysql-svgrepo-com.svg)
  PANDAS = "wordpress",   // Spline slot: wordpress
  NUMPY = "linux",       // Spline slot: linux
  DOCKER = "docker",      // Spline slot: docker
  ARDUINO = "nginx",       // Spline slot: nginx    (visual: arduino-svgrepo-com.svg)
  POWERBI = "aws",         // Spline slot: aws      (visual: powerbi.svg)
  SQLITE = "vim",         // Spline slot: vim
  DATA_ANALYTICS = "vercel",      // Spline slot: vercel

  // ── Tools (metadata-only) ─────────────────────────────────────────────────
  FIGMA = "__figma",     // metadata-only (no Spline keycap)
}

export type SkillCategory =
  | "Language"
  | "Frontend"
  | "Backend"
  | "AI & Data"
  | "Tools";

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
  category: SkillCategory;
  isPriority?: boolean; // priority skills bounce higher and show ★ Featured badge
};

export const SKILLS: Record<SkillNames, Skill> = {
  // ── Languages ──────────────────────────────────────────────────────────────

  // js slot
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription: "The universal language of the web — powering full-stack apps from browser interactivity to server-side logic ⚡",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Language",
  },

  // ts slot → Python (visual replaced in Spline with python-svgrepo-com.svg)
  [SkillNames.PYTHON]: {
    id: 2,
    name: "ts",
    label: "Python",
    shortDescription: "Primary language for AI, machine learning, automation, and data analysis — every pipeline starts here 🐍",
    color: "#3776ab",
    icon: "/assets/tech/python-svgrepo-com.svg",
    category: "Language",
    isPriority: true,
  },

  // html slot
  [SkillNames.HTML]: {
    id: 3,
    name: "html",
    label: "HTML",
    shortDescription: "Semantic, accessible structure — the skeleton beneath every web experience 📄",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    category: "Language",
  },

  // css slot
  [SkillNames.CSS]: {
    id: 4,
    name: "css",
    label: "CSS",
    shortDescription: "Animations, layouts, and responsive design — making interfaces feel alive and premium 🎨",
    color: "#264de4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    category: "Language",
  },

  // metadata-only
  [SkillNames.CPP]: {
    id: 5,
    name: "__cpp",
    label: "C++",
    shortDescription: "Low-level performance for competitive programming and systems engineering ⚙️",
    color: "#00599c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    category: "Language",
  },

  // metadata-only
  [SkillNames.C]: {
    id: 6,
    name: "__c",
    label: "C",
    shortDescription: "Close to the metal — embedded systems, firmware, and raw performance 🛠️",
    color: "#a8b9cc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    category: "Language",
  },

  // metadata-only
  [SkillNames.JAVA]: {
    id: 7,
    name: "__java",
    label: "Java",
    shortDescription: "Enterprise-grade OOP for scalable backend systems — write once, run anywhere ☕",
    color: "#f89820",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    category: "Language",
  },

  // ── Frontend ─────────────────────────────────────────────────────────────

  // react slot
  [SkillNames.REACT]: {
    id: 8,
    name: "react",
    label: "React",
    shortDescription: "Building data-rich dashboards and AI-powered UIs — component architecture that scales from startup to enterprise ⚛️",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend",
    isPriority: true,
  },

  // vue slot → Unity (visual replaced in Spline with unity-svgrepo-com.svg)
  [SkillNames.UNITY]: {
    id: 9,
    name: "vue",
    label: "Unity",
    shortDescription: "Developing Digital Twin simulations, interactive 3D systems, and real-time visualization platforms 🎮",
    color: "#cccccc",
    icon: "/assets/tech/unity-svgrepo-com.svg",
    category: "Frontend",
    isPriority: true,
  },

  // nextjs slot
  [SkillNames.NEXTJS]: {
    id: 10,
    name: "nextjs",
    label: "Next.js",
    shortDescription: "Full-stack React framework powering SSR, API routes, and production-grade web apps 👑",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "Frontend",
    isPriority: true,
  },

  // tailwind slot
  [SkillNames.TAILWIND]: {
    id: 11,
    name: "tailwind",
    label: "Tailwind CSS",
    shortDescription: "Utility-first CSS that ships pixel-perfect, responsive UIs at speed 🌊",
    color: "#38bdf8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    category: "Frontend",
  },

  // ── Backend ───────────────────────────────────────────────────────────────

  // nodejs slot
  [SkillNames.NODEJS]: {
    id: 12,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "Event-driven, non-blocking runtime — ideal for real-time data streams and REST API backends 🟢",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Backend",
    isPriority: true,
  },

  // express slot
  [SkillNames.EXPRESS]: {
    id: 13,
    name: "express",
    label: "Express.js",
    shortDescription: "Minimal, fast REST APIs — the go-to Node.js framework for backend services 🛤️",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    category: "Backend",
  },

  // postgres slot
  [SkillNames.POSTGRES]: {
    id: 14,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "Battle-tested relational database for production systems — schemas, joins, and sub-200ms queries 🐘",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    category: "Backend",
  },

  // mongodb slot → Flask
  [SkillNames.FLASK]: {
    id: 15,
    name: "mongodb",
    label: "Flask",
    shortDescription: "Python micro-framework for serving ML model endpoints, healthcare APIs, and lightweight REST services 🧪",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    category: "Backend",
  },

  // git slot → Git (now the Git object name in Spline)
  [SkillNames.GIT]: {
    id: 16,
    name: "git",
    label: "Git",
    shortDescription: "Version control for every project — branching, merging, and rolling back with confidence ⏳",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Tools",
    isPriority: true,
  },

  // github slot → GitHub
  [SkillNames.GITHUB]: {
    id: 17,
    name: "github",
    label: "GitHub",
    shortDescription: "Open-source collaboration, CI/CD workflows, and project management — where code meets community 🐙",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    category: "Tools",
  },

  // ── AI & Data ─────────────────────────────────────────────────────────────

  // prettier slot → Machine Learning (visual: tensorflow-enterprise-svgrepo-com.svg)
  [SkillNames.ML]: {
    id: 18,
    name: "prettier",
    label: "Machine Learning",
    shortDescription: "Training predictive models, classification systems, recommendation engines, and data-driven solutions 🤖",
    color: "#ff6f00",
    icon: "/assets/tech/tensorflow-enterprise-svgrepo-com.svg",
    category: "AI & Data",
    isPriority: true,
  },

  // npm slot → Artificial Intelligence (visual: ai.svg)
  [SkillNames.AI_SKILL]: {
    id: 19,
    name: "npm",
    label: "Artificial Intelligence",
    shortDescription: "Building intelligent systems using NLP, LLMs, computer vision, and generative AI 🧠",
    color: "#4285f4",
    icon: "/assets/tech/ai.svg",
    category: "AI & Data",
    isPriority: true,
  },

  // firebase slot → SQL (visual: mysql-svgrepo-com.svg)
  [SkillNames.SQL]: {
    id: 20,
    name: "firebase",
    label: "SQL",
    shortDescription: "Writing efficient queries, database optimization, analytics joins, and reporting pipelines for real-world datasets 🗄️",
    color: "#e38c00",
    icon: "/assets/tech/mysql-svgrepo-com.svg",
    category: "AI & Data",
    isPriority: true,
  },

  // wordpress slot → Pandas
  [SkillNames.PANDAS]: {
    id: 21,
    name: "wordpress",
    label: "Pandas",
    shortDescription: "Data cleaning, transformation, and exploratory analysis at scale — every insight pipeline starts here 🐼",
    color: "#130754",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    category: "AI & Data",
  },

  // linux slot → NumPy
  [SkillNames.NUMPY]: {
    id: 22,
    name: "linux",
    label: "NumPy",
    shortDescription: "Vectorised numerical computing — the mathematical core beneath every ML pipeline and statistical model 🔢",
    color: "#4dabcf",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    category: "AI & Data",
  },

  // docker slot → Docker
  [SkillNames.DOCKER]: {
    id: 23,
    name: "docker",
    label: "Docker",
    shortDescription: "Containerised deployments with guaranteed environment parity — from dev to production 🐳",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "Tools",
    isPriority: true,
  },

  // nginx slot → Arduino (visual: arduino-svgrepo-com.svg)
  [SkillNames.ARDUINO]: {
    id: 24,
    name: "nginx",
    label: "Arduino",
    shortDescription: "Building IoT systems, embedded solutions, sensor integrations, and hardware prototypes 🔌",
    color: "#00979d",
    icon: "/assets/tech/arduino-svgrepo-com.svg",
    category: "Tools",
    isPriority: true,
  },

  // aws slot → Power BI (visual: powerbi.svg)
  [SkillNames.POWERBI]: {
    id: 25,
    name: "aws",
    label: "Power BI",
    shortDescription: "Creating executive dashboards, KPI tracking systems, healthcare analytics, and business intelligence reports 📊",
    color: "#f2c811",
    icon: "/assets/tech/powerbi.svg",
    category: "AI & Data",
    isPriority: true,
  },

  // vim slot → SQLite
  [SkillNames.SQLITE]: {
    id: 26,
    name: "vim",
    label: "SQLite",
    shortDescription: "Serverless embedded SQL — perfect for IoT data logging, local analytics, and lightweight storage 📦",
    color: "#003b57",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    category: "Backend",
  },

  // vercel slot → Data Analytics
  [SkillNames.DATA_ANALYTICS]: {
    id: 27,
    name: "vercel",
    label: "Data Analytics",
    shortDescription: "Converting raw data into strategic decisions — statistical analysis, trend detection, and storytelling with data 📉",
    color: "#00c6b7",
    icon: "https://img.icons8.com/color/96/data-configuration.png",
    category: "AI & Data",
  },

  // metadata-only
  [SkillNames.FIGMA]: {
    id: 28,
    name: "__figma",
    label: "Figma",
    shortDescription: "Prototyping and UX design before a single line of code is written 🎨",
    color: "#f24e1e",
    icon: "/assets/tech/figma-svgrepo-com.svg",
    category: "Tools",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "May 2025",
    endDate: "July 2025",
    title: "Data Analyst Intern",
    company: "Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ), India",
    description: [
      "Maintained and enhanced the GIZ India Project Dashboard, ensuring accurate reporting across multiple sectors and regional programs.",
      "Developed Microsoft Lists-based tracking solutions to improve project visibility, workflow efficiency, and reporting processes.",
      "Collaborated with cross-functional teams on data analysis, dashboard troubleshooting, and knowledge management initiatives.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.POWERBI,
      SkillNames.DATA_ANALYTICS,
      SkillNames.SQL,
      SkillNames.GIT,
    ],
  },

  {
    id: 2,
    startDate: "Feb 2025",
    endDate: "July 2025",
    title: "Frontend Development Engineering Intern",
    company: "BrainMint",
    description: [
      "Developed reusable React.js components and interactive dashboards for real-time data visualization.",
      "Optimized frontend performance and reduced application load times through efficient rendering strategies.",
      "Collaborated with backend teams to integrate telemetry systems and mission-planning workflows.",
    ],
    skills: [
      SkillNames.REACT,
      SkillNames.JS,
      SkillNames.CSS,
      SkillNames.NODEJS,
      SkillNames.GIT,
    ],
  },

  {
    id: 3,
    startDate: "Jan 2025",
    endDate: "May 2025",
    title: "Solaris Digital Twin Project",
    company: "SRM Institute of Technology",
    description: [
      "Led the development of a real-time digital twin simulation of a self-landing rocket using Unity and Arduino.",
      "Integrated live sensor telemetry using ultrasonic sensors and serial communication pipelines.",
      "Implemented autonomous landing systems using Unity physics simulation and C# scripting.",
    ],
    skills: [
      SkillNames.UNITY,
      SkillNames.ARDUINO,
      SkillNames.PYTHON,
      SkillNames.REACT,
      SkillNames.NODEJS,
    ],
  },
  {
    id: 4,
    startDate: "Jan 2026",
    endDate: "May 2026",
    title: "AI-Based Drug Recommendation System Using Multi-Omics Data for Precision Medicine",
    company: "Research Project",
    description: [
      "Developed an AI-driven precision medicine framework that integrates multi-omics biological data to predict drug effectiveness and support personalized treatment selection.",
      "Built a LightGBM-based machine learning pipeline using LINCS L1000 gene expression data and GDSC drug response datasets to predict IC50 values and rank candidate therapies.",
      "Implemented SHAP-based explainability and an interactive Streamlit dashboard to visualize drug recommendations, model predictions, and gene-level feature importance for interpretable healthcare decision support.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.ML,
      SkillNames.AI_SKILL,
      SkillNames.PANDAS,
      SkillNames.DATA_ANALYTICS,
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
