"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowRight, ExternalLink, Play } from "lucide-react";

/** Draws a project's pipeline as connected boxes (left to right, top to bottom on phones). */
export function ArchitectureFlow({ steps, accent }: { steps: string[]; accent: string }) {
  return (
    <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <li
            className="flex min-h-[64px] flex-1 items-center justify-center rounded-xl border bg-card/70 px-3 py-3 text-center text-xs leading-snug text-foreground/90 backdrop-blur md:text-[13px]"
            style={{ borderColor: i === 0 || i === steps.length - 1 ? accent : undefined }}
          >
            {step}
          </li>
          {i < steps.length - 1 && (
            <li aria-hidden className="flex justify-center text-muted-foreground">
              <ArrowDown size={16} className="md:hidden" />
              <ArrowRight size={16} className="hidden md:block" />
            </li>
          )}
        </React.Fragment>
      ))}
    </ol>
  );
}

/** Loads the live product inside the page only when the visitor asks for it. */
export function LiveEmbed({ url, name }: { url: string; name: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 text-xs text-muted-foreground">
        <span className="truncate">{url.replace(/^https?:\/\//, "")}</span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1 hover:text-foreground"
        >
          Open in new tab <ExternalLink size={12} />
        </a>
      </div>
      {loaded ? (
        <iframe
          src={url}
          title={`${name} live demo`}
          loading="lazy"
          className="h-[640px] w-full bg-white"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="flex h-[280px] w-full flex-col items-center justify-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
            <Play size={18} />
          </span>
          Try {name} right here
        </button>
      )}
    </div>
  );
}
