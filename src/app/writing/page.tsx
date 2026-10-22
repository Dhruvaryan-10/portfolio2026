import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/data/writing";
import { config } from "@/data/config";

export const metadata: Metadata = {
  title: `Writing | ${config.author}`,
  description: "Short write-ups on how I built things and what I learned.",
  alternates: { canonical: `${config.site}/writing` },
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function WritingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 md:pt-32">
      <h1 className="font-display text-4xl md:text-6xl">Writing</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Short write-ups on how I built things and what I learned.
      </p>
      <ul className="mt-12 space-y-4">
        {POSTS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/writing/${p.slug}`}
              className="block rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-colors hover:border-foreground/30"
            >
              <div className="text-xs text-muted-foreground">
                {fmt(p.date)} · {p.readMinutes} min read
              </div>
              <h2 className="mt-2 text-xl font-semibold leading-snug">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
