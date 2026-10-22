import { config } from "@/data/config";

/** Quotes from managers and mentors. Hidden until config.testimonials has entries. */
export default function Testimonials() {
  if (!config.testimonials.length) return null;
  return (
    <section id="testimonials" className="relative z-10 mx-auto max-w-5xl px-4 py-16 md:py-24">
      <h2 className="text-center font-display text-4xl md:text-6xl">Kind words</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {config.testimonials.map((t) => (
          <figure
            key={t.name}
            className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur"
          >
            <blockquote className="text-base leading-relaxed text-foreground/90">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold text-foreground">{t.name}</span>
              <span className="text-muted-foreground"> · {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
