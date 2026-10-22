import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { PROJECTS, getProject } from "@/data/projects";
import { config } from "@/data/config";
import { ArchitectureFlow, LiveEmbed } from "@/components/project-extras";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const title = `${project.name} | ${config.author}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `${config.site}/projects/${project.slug}` },
    openGraph: {
      title,
      description: project.tagline,
      url: `${config.site}/projects/${project.slug}`,
      images: [{ url: `${config.site}${project.cover}`, width: 1600, height: 1000 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.tagline,
      images: [`${config.site}${project.cover}`],
    },
  };
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    ...(project.team ? [{ label: "Team", value: project.team }] : []),
  ];

  return (
    <main className="relative font-sans">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] opacity-25"
        style={{
          background: `radial-gradient(50% 45% at 50% 0%, ${project.accent}, rgba(0,0,0,0))`,
          WebkitMaskImage: "linear-gradient(to bottom, #000 40%, transparent)",
          maskImage: "linear-gradient(to bottom, #000 40%, transparent)",
        }}
      />

      <article className="relative mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6 md:pt-32">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} /> All projects
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap gap-2">
            {project.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl">
            {project.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                {project.live.includes("linkedin.com") ? "Watch the demo" : "Open live site"}
                <ExternalLink size={15} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground/40"
              >
                <SiGithub size={15} /> Source code
              </a>
            )}
          </div>
        </header>

        {project.tldr && (
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
            {[
              { k: "Problem", v: project.tldr.problem },
              { k: "What I built", v: project.tldr.built },
              { k: "Result", v: project.tldr.result },
            ].map((t) => (
              <div key={t.k} className="bg-card/90 p-5 backdrop-blur">
                <div
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: t.k === "Result" ? project.accent : undefined }}
                >
                  <span className={t.k === "Result" ? "" : "text-muted-foreground"}>{t.k}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">{t.v}</p>
              </div>
            ))}
          </div>
        )}

        <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-black shadow-2xl">
          <Image
            src={project.cover}
            alt={`${project.name} preview`}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>

        <dl className="mt-10 grid gap-6 border-y border-border py-8 sm:grid-cols-2 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                {m.label}
              </dt>
              <dd className="mt-1.5 text-sm text-foreground">{m.value}</dd>
            </div>
          ))}
          <div className={meta.length === 3 ? "" : "md:col-span-2"}>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              Stack
            </dt>
            <dd className="mt-1.5 text-sm text-foreground">
              {project.tech.join(", ")}
            </dd>
          </div>
        </dl>

        {project.stats && (
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {project.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur"
              >
                <div
                  className="font-display text-3xl tabular-nums md:text-4xl"
                  style={{ color: project.accent }}
                >
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 grid gap-12 md:grid-cols-[220px_1fr]">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
            Overview
          </h2>
          <p className="text-lg leading-relaxed text-foreground/90">
            {project.summary}
          </p>

          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
            The problem
          </h2>
          <p className="text-base leading-relaxed text-foreground/85">
            {project.problem}
          </p>

          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
            What I built
          </h2>
          <ol className="space-y-4">
            {project.approach.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs tabular-nums"
                  style={{ borderColor: project.accent, color: project.accent }}
                >
                  {i + 1}
                </span>
                <span className="leading-relaxed text-foreground/85">{step}</span>
              </li>
            ))}
          </ol>

          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
            Highlights
          </h2>
          <ul className="space-y-3">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-foreground/85">
                <span
                  aria-hidden
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: project.accent }}
                />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {project.architecture && (
          <section className="mt-20">
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
              How it works
            </h2>
            <div className="mt-6">
              <ArchitectureFlow steps={project.architecture} accent={project.accent} />
            </div>
          </section>
        )}

        {project.decisions && (
          <section className="mt-20">
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
              Key decisions and trade-offs
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {project.decisions.map((d) => (
                <div
                  key={d.title}
                  className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur"
                >
                  <h3 className="font-semibold text-foreground">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.why}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.next && (
          <section className="mt-20 grid gap-6 md:grid-cols-[220px_1fr]">
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
              What I&apos;d improve next
            </h2>
            <ul className="space-y-3">
              {project.next.map((n) => (
                <li key={n} className="flex gap-3 leading-relaxed text-foreground/85">
                  <span aria-hidden className="text-muted-foreground">→</span>
                  {n}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.embed && (
          <section className="mt-20">
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
              Live demo
            </h2>
            <div className="mt-6">
              <LiveEmbed url={project.embed} name={project.name} />
            </div>
          </section>
        )}

        {project.gallery.length > 0 && (
          <section className="mt-20">
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
              Screens
            </h2>
            <div className="mt-6 grid gap-8">
              {project.gallery.map((g) => (
                <figure key={g.src}>
                  <div className="overflow-hidden rounded-xl border border-border bg-black">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      width={1600}
                      height={1000}
                      sizes="(min-width: 1024px) 1024px, 100vw"
                      className="mx-auto h-auto w-auto max-w-full"
                    />
                  </div>
                  {g.caption && (
                    <figcaption className="mt-3 text-sm text-muted-foreground">
                      {g.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        <Link
          href={`/projects/${next.slug}`}
          className="group mt-24 flex items-center justify-between gap-6 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-colors hover:border-foreground/30 md:p-8"
        >
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Next project
            </div>
            <div className="mt-2 font-display text-2xl md:text-3xl">{next.name}</div>
            <div className="mt-1 text-sm text-muted-foreground">{next.tagline}</div>
          </div>
          <ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>
      </article>
    </main>
  );
}
