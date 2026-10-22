import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { POSTS, getPost } from "@/data/writing";
import { getProject } from "@/data/projects";
import { config } from "@/data/config";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${config.author}`,
    description: post.summary,
    alternates: { canonical: `${config.site}/writing/${post.slug}` },
    openGraph: { title: post.title, description: post.summary, type: "article" },
  };
}

export default function PostPage({ params }: Params) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const project = post.project ? getProject(post.project) : undefined;

  return (
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-28 sm:px-6 md:pt-32">
      <Link
        href="/writing"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} /> All writing
      </Link>
      <article className="mt-8">
        <div className="text-xs text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          · {post.readMinutes} min read
        </div>
        <h1 className="mt-3 font-display text-3xl leading-tight md:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.summary}</p>

        <div className="mt-10 space-y-10">
          {post.sections.map((s, i) => (
            <section key={i} className="space-y-4">
              {s.heading && <h2 className="text-xl font-semibold">{s.heading}</h2>}
              {s.list && (
                <ul className="space-y-2">
                  {s.list.map((l) => (
                    <li key={l} className="flex gap-3 leading-relaxed text-foreground/85">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      {l}
                    </li>
                  ))}
                </ul>
              )}
              {s.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)} className="leading-relaxed text-foreground/85">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>

      {project && (
        <Link
          href={`/projects/${project.slug}`}
          className="group mt-16 flex items-center justify-between gap-6 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-colors hover:border-foreground/30"
        >
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Read the case study
            </div>
            <div className="mt-2 font-display text-2xl">{project.name}</div>
          </div>
          <ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </main>
  );
}
