"use client";
import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaReact,
  FaHtml5,
  FaCss3,
  FaNodeJs,
  FaGit,
  FaDocker,
  FaJava,
} from "react-icons/fa6";
import {
  SiPython,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiFlask,
  SiPostgresql,
  SiSqlite,
  SiTensorflow,
  SiPytorch,
  SiPandas,
  SiNumpy,
  SiFigma,
  SiArduino,
  SiUnity,
  SiCplusplus,
} from "react-icons/si";
import { TbBrandMysql } from "react-icons/tb";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// @ts-ignore
import "@splidejs/react-splide/css";
import Script from "next/script";
import { config } from "@/data/config";

const CONTACT_LINKS = [
  {
    name: "Email",
    content: "chughdhruvaryan@gmail.com",
    href: "mailto:chughdhruvaryan@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/dhruvaryanchugh",
    content: "/dhruvaryanchugh",
    icon: <FaLinkedin />,
  },
  {
    name: "GitHub",
    href: "https://github.com/Dhruvaryan-10",
    content: "/Dhruvaryan-10",
    icon: <FaGithub />,
  },
];

const TOOLS = [
  { name: "Python", content: "Primary language for AI and data pipelines.", icon: <SiPython size={50} color="#3776ab" /> },
  { name: "Java", content: "OOP and enterprise application development.", icon: <FaJava size={50} color="#f89820" /> },
  { name: "JavaScript", content: "Interactive web applications and APIs.", icon: <SiJavascript size={50} color="#f0db4f" /> },
  { name: "SQL", content: "Querying and managing relational databases.", icon: <TbBrandMysql size={50} color="#e38c00" /> },
  { name: "C++", content: "Systems programming and competitive coding.", icon: <SiCplusplus size={50} color="#00599c" /> },
  { name: "React", content: "Component-driven UI development.", icon: <FaReact size={50} color="#61dafb" /> },
  { name: "Next.js", content: "Full-stack React with SSR and API routes.", icon: <SiNextdotjs size={50} color="#fff" /> },
  { name: "Tailwind CSS", content: "Rapid utility-first styling.", icon: <SiTailwindcss size={50} color="#38bdf8" /> },
  { name: "HTML", content: "Semantic structure for every web project.", icon: <FaHtml5 size={50} color="#e34c26" /> },
  { name: "CSS", content: "Responsive layouts and visual polish.", icon: <FaCss3 size={50} color="#264de4" /> },
  { name: "Node.js", content: "Server-side JavaScript for REST APIs.", icon: <FaNodeJs size={50} color="#6cc24a" /> },
  { name: "Express.js", content: "Minimal, fast backend framework.", icon: <SiExpress size={50} color="#fff" /> },
  { name: "Flask", content: "Python micro-framework for ML APIs.", icon: <SiFlask size={50} color="#fff" /> },
  { name: "PostgreSQL", content: "Relational DB for production systems.", icon: <SiPostgresql size={50} color="#336791" /> },
  { name: "SQLite", content: "Lightweight DB for embedded projects.", icon: <SiSqlite size={50} color="#003b57" /> },
  { name: "Machine Learning", content: "Building predictive models that learn.", icon: <SiTensorflow size={50} color="#ff6f00" /> },
  { name: "AI", content: "Designing intelligent adaptive systems.", icon: <SiPytorch size={50} color="#ee4c2c" /> },
  { name: "Power BI", content: "Visual analytics and BI dashboards.", icon: <img src="https://img.icons8.com/color/96/power-bi.png" alt="Power BI" width={50} height={50} /> },
  { name: "Pandas", content: "Data wrangling and analysis at scale.", icon: <SiPandas size={50} color="#150458" /> },
  { name: "NumPy", content: "Numerical computing foundation.", icon: <SiNumpy size={50} color="#013243" /> },
  { name: "Git", content: "Version control and collaboration.", icon: <FaGit size={50} color="#f1502f" /> },
  { name: "GitHub", content: "Open source and project management.", icon: <FaGithub size={50} color="#fff" /> },
  { name: "Docker", content: "Container-first deployment pipeline.", icon: <FaDocker size={50} color="#2496ed" /> },
  { name: "Figma", content: "UI/UX prototyping before code.", icon: <SiFigma size={50} color="#f24e1e" /> },
  { name: "Unity", content: "3D simulations and digital twin worlds.", icon: <SiUnity size={50} color="#fff" /> },
  { name: "Arduino", content: "Embedded systems and IoT hardware.", icon: <SiArduino size={50} color="#00979d" /> },
];

function Page() {
  const [toolsLoaded, setToolsLoaded] = useState(false);

  useEffect(() => {
    setToolsLoaded(true);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 text-zinc-200 pt-20 lg:pt-24 pb-16">
      <Script
        id="ld-json-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            name: "About " + config.author,
            url: `${config.site}/about`,
            description: config.description.short,
            inLanguage: "en",
            author: {
              "@type": "Person",
              name: config.author,
              email: config.email,
              url: config.site,
            },
            publisher: {
              "@type": "Person",
              name: config.author,
            },
          }),
        }}
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-9">
        <aside className="w-full xl:max-w-1/3 xl:col-span-1 xl:justify-self-start">
          <div className="p-5 sm:p-7 lg:p-8 rounded-2xl border border-zinc-700/70 bg-gradient-to-b from-zinc-900/70 via-black/50 to-black/30 backdrop-blur-md shadow-lg">
            <div className="flex flex-col sm:flex-row xl:flex-col items-center gap-4 sm:gap-6">
              <div className="flex justify-center items-center w-full max-w-[180px] bg-zinc-800 rounded-xl p-4 sm:p-5">
                <img
                  className="rounded-full w-[110px] sm:w-[130px] md:w-[150px] xl:w-[170px] aspect-square bg-zinc-800 shadow-inner"
                  alt="Dhruvaryan Chugh"
                  src="/assets/me.jpg"
                />
              </div>
              <div className="flex flex-col gap-2 items-center text-center sm:items-start sm:text-left xl:items-center xl:text-center">
                <p className="text-lg sm:text-xl md:text-2xl">Dhruvaryan Chugh</p>
                <div className="text-[11px] sm:text-xs bg-zinc-700 w-fit px-3 py-1 rounded-full">
                  AI Engineer &amp; Data Analyst
                </div>
              </div>
            </div>
            <div className="mt-8">
              <hr className="my-6 border-zinc-700" />
              <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
                {CONTACT_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      className="flex items-center px-3 gap-3 w-full h-14 border-zinc-700 bg-zinc-800 hover:border-zinc-600 border rounded-md transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                      href={link.href}
                    >
                      <div className="w-8 flex items-center justify-center text-lg">
                        {link.icon}
                      </div>
                      <div className="flex flex-col">
                        <div className="text-sm sm:text-base">{link.name}</div>
                        <div className="text-xs text-zinc-500 truncate">
                          {link.content}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <main className="w-full xl:max-w-2/3 xl:col-span-2 xl:justify-self-end">
          <div className="p-4 sm:p-6 lg:p-8 border border-zinc-700/70 rounded-2xl bg-gradient-to-b from-zinc-900/70 via-black/50 to-black/30 backdrop-blur-md shadow-lg space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl">About me</h1>
              <p className="leading-relaxed text-sm sm:text-base text-zinc-200">
                Hey! I&apos;m Dhruvaryan, a Computer Science undergrad at SRM Institute of Technology passionate about building intelligent systems and data-driven solutions. My work sits at the intersection of AI, full-stack development, and digital twin technology — from training ML models and designing Power BI dashboards to shipping production web apps.
              </p>
              <p className="leading-relaxed text-sm sm:text-base text-zinc-200">
                Outside of coding, I&apos;m exploring new research papers, experimenting with Unity simulations, or going down rabbit holes in competitive programming. I believe the best software solves real problems elegantly — and I&apos;m always looking for the next one to crack.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl">Stuff I use</h2>
              <div>
                {!toolsLoaded ? (
                  <div className="h-[120px] bg-zinc-800/40 rounded-lg animate-pulse" />
                ) : (
                  <Splide
                  options={{
                    type: "loop",
                    interval: 2200,
                    autoplay: true,
                    pagination: false,
                    speed: 1200,
                    perPage: 4,
                    perMove: 1,
                    gap: "1.25rem",
                    breakpoints: {
                      1280: { perPage: 3 },
                      1024: { perPage: 2 },
                      768: { perPage: 2 },
                      640: { perPage: 1 },
                    },
                    rewind: true,
                    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                    arrows: false,
                  }}
                    aria-label="Tools"
                  >
                    {TOOLS.map((tool) => (
                      <SplideSlide key={tool.name}>
                        <div className="flex flex-col rounded-lg border border-zinc-700 bg-zinc-800 p-4 sm:p-5 justify-center items-center h-[170px] sm:h-[190px] md:h-[200px] text-center gap-2 shadow-md">
                          <div className="mb-2">{tool.icon}</div>
                          <div className="text-base sm:text-lg">{tool.name}</div>
                          <div className="text-xs sm:text-sm text-zinc-500 leading-snug">
                            {tool.content}
                          </div>
                        </div>
                      </SplideSlide>
                    ))}
                  </Splide>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
