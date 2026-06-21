export type SimpleProject = {
  name: string;
  imageKey: string;
  description: string;
  gradient: [string, string];
  url: string;
  tech: string[];
};
export const PROJECTS: SimpleProject[] = [
  {
    name: "SmartCA – AI-Powered Financial Advisory Assistant",
    imageKey: "smartca",
    description:
      "An AI-powered financial assistant that simplifies taxation, compliance, and financial decision-making through intelligent recommendations.",
    gradient: ["#0f172a", "#1e40af"],
    url: "https://github.com/Dhruvaryan-10/smartcaproject",
    tech: ["python", "react", "postgresql", "ai", "tailwindcss"],
  },

  {
    name: "AI-Based Drug Recommendation System",
    imageKey: "drug-recommendation",
    description:
      "Predicting personalized drug effectiveness using machine learning and multi-omics biological data for precision medicine.",
    gradient: ["#14532d", "#22c55e"],
    url: "https://github.com/Dhruvaryan-10/personalized-drug-response-prediction",
    tech: ["python", "pandas", "numpy", "streamlit", "machine-learning"],
  },

  {
    name: "Solaris – Digital Twin Rocket Simulation",
    imageKey: "solaris",
    description:
      "A real-time digital twin of a self-landing rocket powered by Unity, Arduino, and live telemetry integration.",
    gradient: ["#312e81", "#7c3aed"],
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7337092611817525248/",
    tech: ["unity", "arduino", "python", "react"],
  },

  {
    name: "Zoom-iT – Intelligent Food Delivery Platform",
    imageKey: "zoomit",
    description:
      "A full-stack food delivery ecosystem featuring restaurant management, order tracking, and AI-powered recommendations.",
    gradient: ["#b45309", "#f97316"],
    url: "https://github.com/Dhruvaryan-10/Zoom-IT",
    tech: ["react", "nodejs", "express", "mongodb"],
  },

  {
    name: "AI Campaign Copilot",
    imageKey: "campaign-copilot",
    description:
      "An AI-powered CRM platform that automates audience segmentation, campaign recommendations, and customer insights.",
    gradient: ["#0f766e", "#14b8a6"],
    url: "https://github.com/Dhruvaryan-10/xeno",
    tech: ["nextjs", "typescript", "postgresql", "ai"],
  },

  {
    name: "DonorDash – NGO Analytics Platform",
    imageKey: "donordash",
    description:
      "A donor management and analytics platform designed to help NGOs track engagement and optimize fundraising efforts.",
    gradient: ["#831843", "#ec4899"],
    url: "https://github.com/Dhruvaryan-10/DonorDash",
    tech: ["react", "powerbi", "python", "data-analytics"],
  },

  {
    name: "RiderShield – Smart Rider Safety Platform",
    imageKey: "ridershield",
    description:
      "A safety-first platform focused on rider protection through monitoring, alerts, and intelligent assistance features.",
    gradient: ["#7f1d1d", "#ef4444"],
    url: "https://github.com/Dhruvaryan-10/codeguide",
    tech: ["react", "nodejs", "mongodb", "javascript"],
  },
];