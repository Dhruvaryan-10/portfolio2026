export type ProjectCategory = "AI" | "Full-Stack" | "Data" | "Simulation";

export type ProjectStat = { label: string; value: string };

export type ProjectImage = { src: string; alt: string; caption?: string };

export type ProjectDecision = { title: string; why: string };

export type ProjectTldr = { problem: string; built: string; result: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  categories: ProjectCategory[];
  year: string;
  role: string;
  team?: string;
  accent: string;
  cover: string;
  featured?: boolean;
  summary: string;
  problem: string;
  approach: string[];
  highlights: string[];
  stats?: ProjectStat[];
  tech: string[];
  live?: string;
  github?: string;
  gallery: ProjectImage[];
  /** Three-line summary shown at the top of the case study */
  tldr?: ProjectTldr;
  /** Steps of the system, drawn left to right as a diagram */
  architecture?: string[];
  /** Key technical decisions and why they were made */
  decisions?: ProjectDecision[];
  /** What I would improve next */
  next?: string[];
  /** Short muted screen recording shown when hovering the project card */
  preview?: string;
  /** Live site that can be loaded inside the case study on request */
  embed?: string;
};

const img = (slug: string, file: string) => `/assets/projects/${slug}/${file}`;

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "AI",
  "Full-Stack",
  "Data",
  "Simulation",
];

export const PROJECTS: Project[] = [
  {
    slug: "fund-reality",
    name: "Fund Reality",
    tagline: "Indian mutual funds, explained with 13 years of real data",
    categories: ["Data", "Full-Stack"],
    year: "2026",
    role: "Design, data pipeline and front-end",
    accent: "#3b82f6",
    cover: img("fund-reality", "cover.webp"),
    featured: true,
    summary:
      "A data-storytelling site that shows first-time investors what the Regular plan of a mutual fund really costs, what a typical investor actually earned, and how far funds can fall.",
    problem:
      "Most Indians buy mutual funds through an agent without knowing the commission is taken from their returns every year. Fund factsheets show one cherry-picked return figure, so the real cost and the real risk stay invisible.",
    approach: [
      "Downloaded daily NAV history for 21 well-known funds, both Direct and Regular plans, from January 2013 to October 2026, and cleaned it with Python and pandas.",
      "Computed rolling 5-year returns over every possible start date, worst drawdowns, and the rupee gap between Direct and Regular plans.",
      "Designed a scroll-driven home page where the Direct and Regular lines draw themselves and the gap grows, plus a calculator answering one question: what did the agent cost you?",
      "Added a SIP simulator that replays monthly investing on real historical prices and reports XIRR against an index fund.",
      "Built member features on Supabase with row-level security: a portfolio cost check, watchlist, saved SIP plans and a 3-fund compare.",
    ],
    highlights: [
      "₹10 lakh invested through an agent in 2013 ended ₹9.9 lakh smaller on average, and ₹21.2 lakh smaller in one small-cap fund.",
      "Explains selection and survivorship bias openly, including in its own fund list.",
      "Every chart is drawn from real data, not illustrations.",
    ],
    stats: [
      { value: "21", label: "funds analysed" },
      { value: "13 yrs", label: "of daily NAVs" },
      { value: "459", label: "5-year windows" },
    ],
    tldr: {
      "problem": "Agent commissions quietly come out of mutual fund returns every year.",
      "built": "A Python data pipeline over 13 years of daily NAVs and a scroll-driven explainer site.",
      "result": "Shows ₹10 lakh through an agent ended ₹9.9 lakh smaller on average."
    },
    architecture: [
      "mfapi.in (AMFI NAVs)",
      "Python + pandas cleaning",
      "Rolling returns, drawdowns, XIRR",
      "Static JSON in public/data",
      "Next.js + ECharts UI",
      "Supabase auth (members)"
    ],
    decisions: [
      {
        "title": "Precompute everything offline",
        "why": "The analysis runs once in Python and ships as static JSON, so public pages load fast and need no database."
      },
      {
        "title": "Every 5-year window, not one return",
        "why": "A single 5-year return depends on its start date. Showing all 459 windows shows the range investors actually got."
      },
      {
        "title": "State the bias openly",
        "why": "The fund list is well-known survivors, so the site explains selection and survivorship bias and compares with S&P's SPIVA scorecard."
      }
    ],
    next: [
      "Add closed and merged funds to remove survivorship bias.",
      "Include taxes and exit loads, which returns currently ignore.",
      "Compare mid and small caps with their own indices, not only the Nifty 50."
    ],
    preview: "/assets/projects/fund-reality/preview.mp4",
    embed: "https://mf-reality-check-ndx1.vercel.app",
    tech: ["Next.js", "TypeScript", "Python", "pandas", "ECharts", "Framer Motion", "Supabase"],
    live: "https://mf-reality-check-ndx1.vercel.app",
    github: "https://github.com/Dhruvaryan-10/mf-reality-check",
    gallery: [
      { src: img("fund-reality", "1.webp"), alt: "Fund Reality home page with the agent-cost calculator", caption: "Home: the agent-cost calculator" },
      { src: img("fund-reality", "2.webp"), alt: "Fund directory with sparkline cards", caption: "Every fund, with typical return, worst fall and Regular-plan cost" },
      { src: img("fund-reality", "3.webp"), alt: "SIP simulator on real prices", caption: "SIP simulator replayed on real past prices" },
      { src: img("fund-reality", "4.webp"), alt: "Insights page with a histogram of 5-year returns", caption: "Insights: when you check changes the answer" },
    ],
  },
  {
    slug: "razorpay-agent",
    name: "Razorpay Merchant Agent",
    tagline: "Merchant operations workspace with a natural-language store agent",
    categories: ["AI", "Full-Stack"],
    year: "2026",
    role: "Full-stack development",
    team: "Built with Pranav Suri",
    accent: "#3b82f6",
    cover: img("razorpay-agent", "cover.webp"),
    featured: true,
    summary:
      "A merchant workspace that connects to a WooCommerce store and brings orders, products, inventory and customers into one place, with an agent that answers questions about the store in plain language.",
    problem:
      "Small online sellers jump between the WooCommerce admin, payment dashboards and spreadsheets to answer simple questions like which orders are stuck or what is about to run out of stock.",
    approach: [
      "Built a Next.js front-end over a FastAPI and PostgreSQL backend that talks to the WooCommerce REST API v3.",
      "Designed an overview that ranks what needs attention by impact: pending payments, out-of-stock items, low stock.",
      "Added an agent that answers questions about orders, stock and customers, and shows the records and calls behind every answer.",
      "Encrypted store credentials on the server and shipped a full demo mode with synthetic data so anyone can try it.",
    ],
    highlights: [
      "Answers are traceable: each reply links to the records it used.",
      "Demo store works without any WooCommerce account.",
      "66 backend tests with pytest.",
    ],
    tldr: {
      "problem": "Small sellers jump between dashboards to answer simple questions about their store.",
      "built": "One workspace over WooCommerce with a plain-language store agent.",
      "result": "Orders, stock and customers in one view, with answers you can trace to records."
    },
    architecture: [
      "Browser",
      "Next.js workspace",
      "FastAPI backend",
      "PostgreSQL (SQLAlchemy)",
      "WooCommerce REST API v3"
    ],
    decisions: [
      {
        "title": "Answers show their evidence",
        "why": "Every agent reply lists the records it found and the calls it made, so a merchant can check it before acting."
      },
      {
        "title": "Demo mode with synthetic data",
        "why": "Anyone can try the full product without connecting a real store."
      },
      {
        "title": "Credentials stay on the server",
        "why": "Store API keys are encrypted server-side and never reach the browser."
      }
    ],
    preview: "/assets/projects/razorpay-agent/preview.mp4",
    stats: [
      { value: "4", label: "store areas in one view" },
      { value: "66", label: "backend tests" },
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Query", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "WooCommerce API"],
    live: "https://razorpay-merchant-agent.vercel.app",
    github: "https://github.com/Dhruvaryan-10/razorpay-merchant-agent",
    gallery: [
      { src: img("razorpay-agent", "1.webp"), alt: "Store overview with revenue chart and items needing attention", caption: "Overview: revenue and what needs attention, ranked by impact" },
      { src: img("razorpay-agent", "2.webp"), alt: "Agent page with suggested questions", caption: "Agent: ask about orders, stock or customers" },
      { src: img("razorpay-agent", "3.webp"), alt: "Orders table with status filters", caption: "Orders with status, payment and amount" },
    ],
  },
  {
    slug: "ai-sdlc",
    name: "AI-SDLC Pipeline",
    tagline: "From a Statement of Work to software delivery, with AI agents",
    categories: ["AI"],
    year: "2026",
    role: "Agent design and development",
    accent: "#ef4444",
    cover: img("ai-sdlc", "cover.webp"),
    featured: true,
    summary:
      "A pipeline of seven specialised AI agents that turns an uploaded Statement of Work into a full set of software delivery documents, with a human approving every stage.",
    problem:
      "Turning a client's Statement of Work into requirements, designs, user stories and test cases takes weeks of analyst and architect time, and the documents drift out of sync as soon as one of them changes.",
    approach: [
      "Built seven agents, one stage at a time: Business Analyst (BRD), Solution Architect (HLD), User Stories, Low-Level Design, Story Refinement, QA test cases and a Closure Report.",
      "Gave every stage the same lifecycle: manual editing, AI-assisted refinement, full version history, locking a final version and Word export.",
      "Tracked provenance: each document records the exact source versions it was built from and is flagged stale, never silently changed, when a source changes.",
      "Kept decisions that must be exact out of the model: the closure status is deterministic and the agent never finalises its own work.",
    ],
    highlights: [
      "Human-in-the-loop by design: no stage advances without an accepted document.",
      "Plain JSON persistence, no database, no RAG: simple and auditable.",
      "782 automated tests across 49 test files.",
    ],
    stats: [
      { value: "7", label: "specialised agents" },
      { value: "782", label: "automated tests" },
      { value: "6", label: "versioned document streams" },
    ],
    tldr: {
      "problem": "Turning a Statement of Work into delivery documents takes weeks, and the documents drift out of sync.",
      "built": "Seven AI agents, one per SDLC stage, with a human approving each stage.",
      "result": "BRD to closure report in one versioned, traceable pipeline with Word export."
    },
    architecture: [
      "Statement of Work",
      "BA agent → BRD",
      "Architect agent → HLD",
      "User Story agent",
      "LLD agent",
      "QA agent → test cases",
      "Closure report"
    ],
    decisions: [
      {
        "title": "No database, no RAG",
        "why": "Plain JSON persistence with full version history keeps the system simple to run and easy to audit."
      },
      {
        "title": "Humans approve every stage",
        "why": "Agents draft; nothing moves to the next stage until a person accepts the document."
      },
      {
        "title": "Flag stale, never silently change",
        "why": "When a source document changes, documents built from it are marked stale instead of being regenerated behind the user's back."
      },
      {
        "title": "Rules decide, the model writes",
        "why": "The closure status is computed deterministically; the language model only writes the narrative."
      }
    ],
    tech: ["Python", "Streamlit", "LangChain", "Gemini", "Pydantic", "python-docx", "pytest", "Docker"],
    live: "https://aisdlc-automations.streamlit.app",
    github: "https://github.com/Dhruvaryan-10/ai-sdlc-automation-platform",
    gallery: [
      { src: img("ai-sdlc", "1.webp"), alt: "AI-SDLC Pipeline workspace with the seven pipeline stages", caption: "Pipeline workspace: each stage unlocks after the previous one is accepted" },
    ],
  },
  {
    slug: "amazon-ml",
    name: "Amazon ML Challenge 2026",
    tagline: "Business entity resolution across 10.3 million records",
    categories: ["AI", "Data"],
    year: "2026",
    role: "Machine learning engineer",
    team: "Team Minutes, with Sidhant Malik and Pranav Suri",
    accent: "#f59e0b",
    cover: img("amazon-ml", "cover.webp"),
    featured: true,
    summary:
      "A two-stage blocking and gradient-boosting pipeline that matches the same business across three noisy data sources, including names in Indic scripts and French addresses.",
    problem:
      "The same business appears in different sources with abbreviations, typos, reordered addresses, native-script names and deliberate decoys at the same address. Comparing every pair is impossible at 2.2 million entities against 10.3 million records.",
    approach: [
      "Normalised names and addresses: Unicode transliteration for Indic scripts, legal-form dictionaries for the US, India and France, state codes and a phonetic skeleton.",
      "Built forward and reverse blocking on a multi-key inverted index, raising candidate recall at full data density from 94.2% to 97.1%.",
      "Trained a LightGBM model on about 80 pair features, then a second-stage model that compares how each record scores against every competing entity.",
      "Assigned each record to one owner and tuned the threshold for macro F0.5 on a held-out set.",
    ],
    highlights: [
      "Validation macro F0.5 of 0.978 at full density; best public leaderboard score 0.964.",
      "Competition-aware matching targeted decoys and same-name siblings, the main source of errors.",
    ],
    stats: [
      { value: "0.964", label: "public LB F0.5" },
      { value: "97.1%", label: "blocking recall" },
      { value: "142M", label: "candidate pairs scored" },
    ],
    tldr: {
      "problem": "Match the same business across three noisy sources: 2.2M entities against 10.3M records.",
      "built": "Normalisation, forward and reverse blocking, a two-stage LightGBM model and one-to-one assignment.",
      "result": "0.964 F0.5 on the public leaderboard; 0.978 on validation."
    },
    architecture: [
      "Normalise names and addresses",
      "Block: forward + reverse index",
      "Stage 1: LightGBM, ~80 features",
      "Stage 2: entity-vs-entity competition",
      "One-to-one assignment + threshold"
    ],
    decisions: [
      {
        "title": "Measure recall at full density",
        "why": "A sampled validation set hides crowding. Validation entities were always queried against the full 10.3M-record pool."
      },
      {
        "title": "Let records choose entities too",
        "why": "Reverse blocking lets each record propose its best entities, lifting candidate recall from 94.2% to 97.1%."
      },
      {
        "title": "Judge a match against its competitors",
        "why": "The second-stage model compares each record across every entity that retrieved it; the margin to the best rival became the top feature."
      },
      {
        "title": "Optimise for the metric",
        "why": "The threshold was tuned for macro F0.5, which rewards precision; the curve is flat between 0.60 and 0.75."
      }
    ],
    tech: ["Python", "LightGBM", "pandas", "RapidFuzz", "Parquet"],
    github: "https://github.com/Dhruvaryan-10/amazon-ml-2026",
    gallery: [],
  },
  {
    slug: "smartca",
    name: "SmartCA",
    tagline: "Personal finance and Indian income-tax workspace",
    categories: ["AI", "Full-Stack"],
    year: "2026",
    role: "Full-stack development",
    accent: "#14b8a6",
    cover: img("smartca", "cover.webp"),
    summary:
      "A workspace where a person keeps an income and expense ledger, computes income tax for AY 2026-27 under both regimes, stores Form 16 PDFs, and asks an assistant that only quotes figures from SmartCA's own tools.",
    problem:
      "Salaried people in India pick a tax regime by guesswork and keep finances across bank apps, PDFs and spreadsheets. General chatbots make up numbers when asked about tax.",
    approach: [
      "Built a deterministic tax engine for AY 2026-27 that compares the old and new regime side by side.",
      "Added a document vault with Form 16 text extraction and CSV import for the ledger.",
      "Built RAG tax-law retrieval over a chunked corpus of official Indian tax sources, scoped by assessment year, statutory section and authority tier, that returns a typed refusal when evidence is missing.",
      "Measured retrieval with an evaluation harness reporting recall@1/@3/@5, MRR, evidence support, distractor intrusion and refusal accuracy.",
      "Designed the Ask SmartCA orchestrator over six server-run tools (tax-law search, transactions, summaries, tax calculation, regime comparison, simulation), so every figure comes from the deterministic engine, never the model.",
      "Hardened the model boundary with tool allowlists, server-side user scoping and an answer-validation layer that withholds unsupported figures.",
      "Deployed on Vercel with a Neon PostgreSQL database, Auth.js sign-in and user-scoped data.",
    ],
    highlights: [
      "The assistant cannot invent a number: figures only come from tools.",
      "Architecture decisions are recorded as ADRs in the repository.",
      "Over 1,200 automated test cases across 89 test files, including security tests for the assistant.",
    ],
    tldr: {
      "problem": "People pick a tax regime by guesswork, and chatbots make up tax numbers.",
      "built": "A ledger, a deterministic AY 2026-27 tax engine, a Form 16 vault and a tool-grounded assistant.",
      "result": "Both regimes compared side by side; every assistant figure comes from SmartCA's own tools."
    },
    architecture: [
      "Next.js app + Auth.js",
      "Ledger and document vault",
      "Deterministic tax engine",
      "PostgreSQL on Neon (Drizzle)",
      "RAG over official tax sources", "Ask SmartCA: 6 tools → answer validation"
    ],
    decisions: [
      {
        "title": "Numbers only from tools",
        "why": "The assistant cannot invent a figure: every number comes from SmartCA's tools and tax-law statements cite official guidance."
      },
      {
        "title": "Decisions written down",
        "why": "Provider choice and the data-egress policy are recorded as architecture decision records in the repository."
      },
      {
        "title": "Local model for development",
        "why": "The assistant was verified end to end against a local Ollama model before any external provider was approved."
      }
    ],
    next: [
      "Switch the assistant on in production once an API key is issued; it is built and approved but not yet enabled."
    ],
    stats: [
      { value: "6", label: "server-run AI tools" },
      { value: "1,200+", label: "automated tests" },
      { value: "2", label: "tax regimes compared" },
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "RAG", "LLM tool calling", "Auth.js"],
    live: "https://smartcaproject.vercel.app",
    github: "https://github.com/Dhruvaryan-10/smartca",
    gallery: [
      { src: img("smartca", "1.webp"), alt: "SmartCA landing page", caption: "Landing page" },
    ],
  },
  {
    slug: "campaign-copilot",
    name: "AI Campaign Copilot",
    tagline: "AI-native mini CRM for building audiences and campaigns",
    categories: ["AI", "Full-Stack"],
    year: "2026",
    role: "Full-stack development",
    accent: "#0d9488",
    cover: img("campaign-copilot", "cover.webp"),
    summary:
      "A CRM for marketers that turns a sentence like \"customers who spent over ₹5,000 and haven't bought in 60 days\" into an audience, drafts personalised campaigns, simulates delivery and reports performance.",
    problem:
      "Marketers know who they want to reach but building that segment needs a data analyst and SQL. Campaign tools then treat delivery and analytics as separate products.",
    approach: [
      "Built a monorepo with a Next.js dashboard, an Express CRM API and a separate channel service that simulates asynchronous delivery callbacks.",
      "Used Gemini to turn plain-language descriptions into audience rules and to suggest next actions, with deterministic fallbacks so the product stays demoable without a key.",
      "Seeded 1,000 customers and 5,000 orders on first boot so every screen has realistic data.",
    ],
    highlights: [
      "Natural-language audience builder.",
      "Delivery lifecycle simulated by an independent service, as in production messaging systems.",
    ],
    tldr: {
      "problem": "Marketers need an analyst and SQL just to build an audience.",
      "built": "A CRM where a sentence becomes an audience, plus campaign drafting and simulated delivery.",
      "result": "From “who should we reach?” to campaign analytics in one product."
    },
    architecture: [
      "Next.js dashboard",
      "Express CRM API",
      "Gemini: audience rules, suggestions",
      "Channel service",
      "Delivery callbacks → analytics"
    ],
    decisions: [
      {
        "title": "Works without an AI key",
        "why": "Deterministic fallbacks keep every screen demoable when Gemini is not configured."
      },
      {
        "title": "Delivery as a separate service",
        "why": "An independent channel service sends asynchronous callbacks, the way real messaging providers do."
      }
    ],
    stats: [
      { value: "3", label: "services: web, CRM API, channel" },
      { value: "1,000", label: "seeded customers" },
    ],
    tech: ["Next.js", "TypeScript", "Express", "Gemini", "Zod", "Tailwind CSS", "Recharts"],
    live: "https://xeno-delta-silk.vercel.app",
    github: "https://github.com/Dhruvaryan-10/xeno",
    gallery: [
      { src: img("campaign-copilot", "1.webp"), alt: "Campaign Copilot dashboard with the AI audience builder", caption: "Dashboard with the AI audience builder" },
    ],
  },
  {
    slug: "ridershield",
    name: "RiderShield",
    tagline: "Automatic income protection for gig delivery riders",
    categories: ["Full-Stack"],
    year: "2026",
    role: "Product design and front-end prototype",
    accent: "#ef4444",
    cover: img("ridershield", "cover.webp"),
    summary:
      "Parametric income protection for food-delivery and quick-commerce riders: when rain, gridlock, hazardous air or a platform outage cuts their earnings, they are paid automatically, with no claim to file.",
    problem:
      "A delivery rider's income depends on completed orders. A heavy-rain evening or an app outage wipes out a day's earnings, and there is no safety net that pays fast enough to matter.",
    approach: [
      "Designed around two personas: a full-time food rider earning ₹900 to ₹1,200 a day and a part-time quick-commerce partner working evening shifts.",
      "Specified a weekly pricing model: expected loss from rain, traffic, air quality, civic and connectivity risk in the rider's 2 km zone, times a coverage ratio, plus a risk margin.",
      "Specified payouts that need two triggers to agree: a hazard over its threshold (for example rain above 20 mm/hr for 30 minutes) and a measured drop in the rider's income, plus fraud checks.",
      "Built a clickable Next.js prototype of the product: landing page, rider dashboard, weekly quote, coverage activation, payout history and an admin analytics view.",
    ],
    highlights: [
      "Claim-free by design: riders never fill in a form.",
      "Six prototype screens covering the full rider and admin journey.",
    ],
    tldr: {
      "problem": "One rainy evening or app outage can wipe out a delivery rider's daily income.",
      "built": "A pricing and payout design for weekly parametric cover, plus a six-screen Next.js prototype.",
      "result": "A complete rider and admin journey, from quote to automatic payout, ready to connect to live data."
    },
    architecture: [
      "Weather, traffic, AQI, civic signals",
      "Hazard trigger",
      "Impact trigger: income vs baseline",
      "Fraud checks",
      "Automatic payout + audit trail"
    ],
    decisions: [
      {
        "title": "Two triggers, not one",
        "why": "A payout needs both a hazard over its threshold and a real drop in the rider's income, which limits false payouts."
      },
      {
        "title": "Weekly pricing",
        "why": "Premiums are priced per week to match gig payout cycles and keep costs predictable."
      },
      {
        "title": "Freeze the policy at activation",
        "why": "An immutable snapshot ensures payouts use exactly the parameters that were priced."
      }
    ],
    next: [
      "Connect the prototype to live weather, traffic and AQI APIs and a payout backend.",
      "A mobile app for GPS geofencing, network diagnostics and push notifications."
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Framer Motion"],
    live: "https://codeguide-nine.vercel.app",
    github: "https://github.com/Dhruvaryan-10/codeguide",
    gallery: [
      { src: img("ridershield", "1.webp"), alt: "RiderShield landing page with live risk chips", caption: "Landing page with live earnings, coverage and risk signals" },
    ],
  },
  {
    slug: "drug-recommendation",
    name: "Multi-Omics Drug Sensitivity Prediction",
    tagline: "Explainable precision-medicine predictions from multi-omics data",
    categories: ["AI", "Data"],
    year: "2026",
    role: "Research project, ML pipeline and dashboard",
    accent: "#22c55e",
    cover: img("drug-recommendation", "cover.webp"),
    summary:
      "A machine-learning framework that predicts how effective a drug will be for a given biological profile and ranks candidate therapies, with explanations a clinician can read.",
    problem:
      "Patients respond differently to the same drug. Picking a therapy by trial and error costs time, and black-box models are hard to trust in healthcare.",
    approach: [
      "Combined LINCS L1000 gene-expression data with GDSC drug-response data to predict IC50 values.",
      "Built the feature pipeline: matching LINCS and GDSC records, cleaning, exploratory analysis, pathway-level features, autoencoder dimensionality reduction and hyperparameter tuning.",
      "Compared LightGBM with Random Forest, neural network and TabNet baselines; LightGBM won with R² 0.51 and RMSE 1.96.",
      "Used SHAP to show which genes drive each prediction.",
      "Built a Streamlit dashboard to pick a condition, compare the top drugs and inspect feature importance.",
    ],
    highlights: [
      "R² of 0.51 and RMSE of 1.96 on IC50 regression, ahead of Random Forest, neural network and TabNet baselines.",
      "822 drugs scored in the dashboard.",
      "Gene-level explanations for every recommendation.",
    ],
    tldr: {
      "problem": "Patients respond differently to the same drug, and black-box models are hard to trust in healthcare.",
      "built": "A LightGBM model on gene-expression and drug-response data, with SHAP explanations and a dashboard.",
      "result": "822 drugs ranked per condition, each with gene-level explanations."
    },
    architecture: [
      "LINCS L1000 gene expression",
      "GDSC drug response (IC50)",
      "Feature table",
      "LightGBM model",
      "SHAP explanations",
      "Streamlit dashboard"
    ],
    decisions: [
      {
        "title": "Explain every prediction",
        "why": "SHAP values show which genes drive each recommendation, so a clinician can question the model instead of trusting it blindly."
      }
    ],
    stats: [
      { value: "0.51", label: "R² on IC50" },
      { value: "1.96", label: "RMSE" },
      { value: "822", label: "drugs ranked" },
    ],
    tech: ["Python", "LightGBM", "PyTorch", "scikit-learn", "SHAP", "pandas", "NumPy", "Streamlit"],
    github: "https://github.com/Dhruvaryan-10/personalized-drug-response-prediction",
    gallery: [
      { src: img("drug-recommendation", "1.webp"), alt: "Streamlit dashboard ranking the top five drugs", caption: "Dashboard: top drugs for a condition" },
      { src: img("drug-recommendation", "2.webp"), alt: "SHAP summary plot of gene features", caption: "SHAP summary: which genes drive predictions" },
      { src: img("drug-recommendation", "3.webp"), alt: "Predicted versus actual IC50 scatter plot", caption: "Predicted vs actual IC50" },
    ],
  },
  {
    slug: "solaris",
    name: "Solaris Digital Twin",
    tagline: "Real-time digital twin of a self-landing rocket",
    categories: ["Simulation"],
    year: "2025",
    role: "Project lead",
    team: "SRM Institute of Technology",
    accent: "#7c3aed",
    cover: img("solaris", "cover.webp"),
    summary:
      "A Unity simulation of a self-landing rocket that mirrors a physical model in real time, fed by live sensor telemetry from an Arduino.",
    problem:
      "Testing landing logic on physical hardware is slow and risky. A digital twin lets you run the same scenario in simulation and on the real model, and compare them.",
    approach: [
      "Built the rocket, launch pad and terrain in Unity and scripted the autonomous landing in C# on Unity's physics engine.",
      "Streamed ultrasonic-sensor readings from an Arduino over serial into the simulation.",
      "Kept the virtual and physical models in sync so telemetry could be read on either side.",
    ],
    highlights: [
      "Hardware-in-the-loop: real sensor data drives the simulation.",
    ],
    tldr: {
      "problem": "Testing landing logic on real hardware is slow and risky.",
      "built": "A Unity digital twin of a self-landing rocket driven by live Arduino sensor data.",
      "result": "The same landing scenario runs in simulation and on the physical model."
    },
    architecture: [
      "Ultrasonic sensor",
      "Arduino",
      "Serial link",
      "Unity digital twin",
      "C# landing logic"
    ],
    tech: ["Unity", "C#", "Arduino", "Python"],
    live: "https://www.linkedin.com/feed/update/urn:li:activity:7337092611817525248/",
    gallery: [
      { src: img("solaris", "1.webp"), alt: "Rocket on the launch pad in the Unity scene", caption: "Rocket on the pad in the Unity scene" },
    ],
  },
  {
    slug: "donordash",
    name: "DonorDash",
    tagline: "Donation platform that matches donors with nearby charities",
    categories: ["Full-Stack", "AI"],
    year: "2025",
    role: "Full-stack development",
    accent: "#a855f7",
    cover: img("donordash", "cover.webp"),
    summary:
      "A platform where people list items they want to give, get matched with verified charities that need them, schedule a pickup and receive proof of delivery.",
    problem:
      "People want to donate goods but do not know which charity needs what, and charities cannot tell donors what actually happened to their donation.",
    approach: [
      "Designed the donor journey in four steps: list items, smart matching, hassle-free pickup and delivery proof.",
      "Built the interface in React and TypeScript with Tailwind CSS, shadcn/ui and Google Maps for charity locations.",
      "Built an Express API on MySQL for sign-up, charity listings and donations with up to 10 photos per item.",
      "Trained a matching model in Python: K-means groups donors by location, and a Random Forest predicts the best-fit charity for each group.",
    ],
    highlights: [
      "Location-aware charity matching from a K-means + Random Forest model.",
      "Closes the loop with delivery confirmation for every donation.",
    ],
    tldr: {
      problem: "Donors don't know which nearby charity needs what they have.",
      built: "A React + Express + MySQL platform with a location-based charity-matching model.",
      result: "List an item, get matched with a nearby charity, schedule pickup, see proof of delivery.",
    },
    architecture: ["React + Vite client", "Express API + photo uploads", "MySQL", "K-means donor clusters", "Random Forest charity match"],
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Express", "MySQL", "scikit-learn", "Google Maps API"],
    github: "https://github.com/Dhruvaryan-10/DonorDash",
    gallery: [
      { src: img("donordash", "1.webp"), alt: "DonorDash landing page", caption: "Landing page and the four-step donor journey" },
    ],
  },
  {
    slug: "zoomit",
    name: "Zoom-iT",
    tagline: "City-wise food discovery and ordering",
    categories: ["Full-Stack", "AI"],
    year: "2025",
    role: "Full-stack development",
    accent: "#f97316",
    cover: img("zoomit", "cover.webp"),
    summary:
      "A food discovery and ordering web app: browse restaurants by city, filter by rating and distance, view menus and place an order.",
    problem:
      "Finding a good place to eat in a new city means scrolling through long lists that know nothing about you.",
    approach: [
      "Built the client in React with Tailwind CSS and Framer Motion, with sidebar navigation.",
      "Built a Node.js and Express API over PostgreSQL on Neon for users, restaurants, menus and orders, with rate limiting.",
      "Added email and Google sign-in with JWT sessions, Cloudinary image hosting, city-based listings, search and filters, and an order summary with payment mode.",
      "Trained a nearest-neighbour recommender in Python that suggests restaurants from similar users' preferences.",
    ],
    highlights: ["End-to-end ordering flow on a relational schema.", "Personalised restaurant suggestions from a KNN model."],
    tldr: {
      "problem": "Finding the right restaurant across cities means endless scrolling.",
      "built": "A full-stack ordering app with city listings, filters and a nearest-neighbour recommender.",
      "result": "Restaurant discovery, ordering and personalised suggestions in one flow."
    },
    architecture: [
      "React + Vite client",
      "Express API",
      "PostgreSQL on Neon",
      "Python KNN recommender"
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Material UI", "Node.js", "Express", "PostgreSQL", "JWT", "Cloudinary", "scikit-learn"],
    live: "https://zoom-it.vercel.app",
    github: "https://github.com/Dhruvaryan-10/Zoom-IT",
    gallery: [
      { src: img("zoomit", "1.webp"), alt: "Zoom-iT landing page", caption: "Landing page" },
    ],
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);
