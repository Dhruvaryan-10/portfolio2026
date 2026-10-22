"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { SKILL_EVENT, projectsForSkill } from "@/data/skill-projects";
import { useView } from "@/hooks/use-view";

type Filter = "All" | ProjectCategory;

const ProjectsSection = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const [skill, setSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const view = useView();

  // A keycap click (or a skill chip) filters the grid to that skill
  useEffect(() => {
    const onSkill = (e: Event) => {
      const label = (e as CustomEvent<string>).detail;
      setSkill(label);
      setFilter("All");
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener(SKILL_EVENT, onSkill);
    return () => window.removeEventListener(SKILL_EVENT, onSkill);
  }, []);

  // Tailored links (?for=ai) put the most relevant projects first
  const ordered = useMemo(() => {
    if (!view) return PROJECTS;
    const rank = (slug: string) => {
      const i = view.order.indexOf(slug);
      return i === -1 ? 999 : i;
    };
    return [...PROJECTS].sort((a, b) => rank(a.slug) - rank(b.slug));
  }, [view]);

  const visible = useMemo(() => {
    let list = skill ? projectsForSkill(skill, ordered) : ordered;
    if (filter !== "All") list = list.filter((p) => p.categories.includes(filter));
    return list;
  }, [filter, skill, ordered]);

  const counts = useMemo(() => {
    const base = skill ? projectsForSkill(skill, ordered) : ordered;
    const c: Record<string, number> = { All: base.length };
    PROJECT_CATEGORIES.forEach(
      (cat) => (c[cat] = base.filter((p) => p.categories.includes(cat)).length)
    );
    return c;
  }, [skill, ordered]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 scroll-mt-16"
    >
      <SectionHeader
        id="projects"
        title="Projects"
        desc="Products, research and competition work. Open any card for the full case study."
        className="mb-10 md:mb-12 static"
      />

      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {(["All", ...PROJECT_CATEGORIES] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            disabled={counts[f] === 0 && f !== "All"}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors disabled:opacity-40",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              filter === f
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background/40 text-muted-foreground backdrop-blur hover:text-foreground"
            )}
          >
            {f}
            <span className="ml-1.5 tabular-nums opacity-60">{counts[f]}</span>
          </button>
        ))}

        {skill && (
          <button
            type="button"
            onClick={() => setSkill(null)}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 bg-emerald-400/10 px-3 py-1.5 text-sm text-emerald-300 transition-colors hover:bg-emerald-400/20"
            aria-label={`Clear ${skill} filter`}
          >
            Built with {skill}
            <X size={14} />
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="mx-auto max-w-md rounded-2xl border border-border bg-card/70 p-6 text-center text-sm text-muted-foreground backdrop-blur">
          None of the projects shown here are tagged with {skill}.{" "}
          <button
            type="button"
            onClick={() => setSkill(null)}
            className="text-foreground underline underline-offset-4"
          >
            Show all projects
          </button>
        </p>
      ) : (
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.currentTime = 0;
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };
  const stop = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onMouseEnter={project.preview ? play : undefined}
      onMouseLeave={project.preview ? stop : undefined}
    >
      <div
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl",
          "border border-border/70 bg-card/80 backdrop-blur-md",
          "transition-all duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:shadow-2xl",
          "focus-within:ring-2 focus-within:ring-ring"
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          <Image
            src={project.cover}
            alt={`${project.name} preview`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {project.preview && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                playing ? "opacity-100" : "opacity-0"
              )}
            >
              <source src={project.preview.replace(/\.mp4$/, ".webm")} type="video/webm" />
              <source src={project.preview} type="video/mp4" />
            </video>
          )}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-60"
            style={{
              background: `radial-gradient(120% 70% at 50% 130%, ${project.accent} 0%, transparent 60%)`,
            }}
          />
          <span className="absolute right-3 top-3 rounded-full bg-black/65 px-2.5 py-1 font-sans text-[11px] font-medium tabular-nums text-white/80 backdrop-blur">
            {project.year}
          </span>
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {project.categories.map((c) => (
              <span
                key={c}
                className="rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur"
              >
                {c}
              </span>
            ))}
          </div>
          {project.preview && !playing && (
            <span className="absolute bottom-3 right-3 rounded-full bg-black/65 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur">
              ▶ Hover to preview
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold leading-snug text-foreground">
                {project.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {project.tagline}
              </p>
            </div>
            <span
              aria-hidden
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background"
            >
              <ArrowUpRight size={16} />
            </span>
          </div>

          {project.stats && project.stats.length > 0 && (
            <div className="flex gap-6">
              {project.stats.slice(0, 2).map((s) => (
                <div key={s.label}>
                  <div
                    className="text-base font-semibold tabular-nums"
                    style={{ color: project.accent }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-md border border-border/80 bg-secondary/40 px-2 py-0.5 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-1 text-xs text-muted-foreground">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {(project.github || project.live) && (
            <div className="relative z-20 flex flex-wrap gap-2 border-t border-border/60 pt-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} source code on GitHub`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  <SiGithub size={13} /> Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} live ${project.live.includes("linkedin.com") ? "demo video" : "site"}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  <ExternalLink size={13} /> {project.live.includes("linkedin.com") ? "Demo video" : "Live site"}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Whole card opens the case study; the Code / Live buttons sit above this layer */}
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`${project.name} case study`}
          onFocus={project.preview ? play : undefined}
          onBlur={project.preview ? stop : undefined}
          className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none"
        />
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
