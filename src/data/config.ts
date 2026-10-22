const config = {
  title: "Dhruvaryan Chugh | AI Engineer & Full-Stack Developer",

  // Short role line shown under the name in the hero and across the site
  role: "AI Engineer · Full-Stack Developer · Data",

  description: {
    long: "Portfolio of Dhruvaryan Chugh, a Computer Science student at SRM Institute of Science and Technology who builds AI products, data tools and full-stack web apps. Case studies include Fund Reality, an AI-SDLC agent pipeline, a Razorpay merchant agent, SmartCA and an Amazon ML Challenge entity-resolution model.",
    short:
      "I build AI products, data tools and full-stack web apps, from the model to the interface.",
  },

  keywords: [
    "Dhruvaryan Chugh",
    "portfolio",
    "AI Engineer",
    "Full-Stack Developer",
    "Machine Learning",
    "Data Analytics",
    "Product Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "LightGBM",
    "LLM agents",
    "SRM Institute of Science and Technology",
  ],

  author: "Dhruvaryan Chugh",

  email: "chughdhruvaryan@gmail.com",

  // Public URL of the deployed site (used for SEO, sitemap and link previews)
  site: "https://portfoliodac.vercel.app",

  resume: "/assets/Dhruvaryan_Chugh_Resume.pdf",

  // Shown under the hero buttons. Keep it short and true.
  availability: "B.Tech CSE, graduating May 2027 · Open to internships and full-time roles",
  location: "Chennai, India",

  // Proof badges in the hero: the fastest evidence a recruiter can scan.
  proof: [
    { value: "0.964", label: "F0.5 · Amazon ML Challenge", href: "/projects/amazon-ml" },
    { value: "2", label: "internships · GIZ, BrainMint", href: "/#experience" },
    { value: "4×", label: "AWS certified", href: "/about#certifications" },
    { value: "9.34", label: "GPA / 10", href: "/about" },
  ],

  // Tailored links: share portfoliodac.vercel.app/?for=ai (or data, fullstack)
  // to change the headline and put the most relevant projects first.
  views: {
    ai: {
      role: "AI / ML Engineer",
      summary: "I build ML models and LLM agents that people can trust, and the products around them.",
      order: ["amazon-ml", "ai-sdlc", "razorpay-agent", "drug-recommendation", "smartca", "campaign-copilot"],
    },
    data: {
      role: "Data Analyst · Data Scientist",
      summary: "I turn messy data into decisions: pipelines, models and dashboards people actually use.",
      order: ["fund-reality", "amazon-ml", "drug-recommendation", "razorpay-agent"],
    },
    fullstack: {
      role: "Full-Stack Developer",
      summary: "I ship complete web products, from database and API to a polished interface.",
      order: ["razorpay-agent", "smartca", "fund-reality", "campaign-copilot", "ridershield", "zoomit"],
    },
  } as Record<string, { role: string; summary: string; order: string[] }>,

  // "Now" section on the About page. Update it every month or two.
  now: [
    "Final-year B.Tech CSE (AI/ML specialisation) at SRM Institute of Science and Technology.",
    "Building Fund Reality: member features on Supabase and more funds in the dataset.",
    "Looking for roles in AI engineering, data and full-stack development from mid-2027.",
  ],

  certifications: [
    { name: "AWS Certified Machine Learning Engineer – Associate", year: "2026" },
    { name: "AWS Certified AI Practitioner", year: "2026" },
    { name: "AWS Certified Cloud Practitioner", year: "2026" },
    { name: "GitHub Copilot Certification – Microsoft Learn", year: "2026" },
  ],

  // Quotes from managers or mentors. Add only real quotes, with permission.
  // The section stays hidden while this list is empty.
  testimonials: [] as { quote: string; name: string; role: string }[],

  // GitHub followers button
  githubUsername: "Dhruvaryan-10",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },

  social: {
    linkedin: "https://www.linkedin.com/in/dhruvaryanchugh",
    github: "https://github.com/Dhruvaryan-10",
    leetcode: "https://leetcode.com/u/Dhruvaryan_Chugh/",
  },

  // Optional: after activating FormSubmit, paste the random alias it emails you
  // (e.g. "a1b2c3d4...") here so your address isn't visible in the page code.
  contactFormId: "",
};

export { config };