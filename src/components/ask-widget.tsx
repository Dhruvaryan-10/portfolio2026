"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Loader2, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { config } from "@/data/config";

type Source = { title: string; url: string };
type Message = { role: "user" | "assistant"; content: string; sources?: Source[] };

const SUGGESTIONS = [
  "What has he built with LLM agents?",
  "Tell me about his internships",
  "What was his Amazon ML Challenge approach?",
  "Is he available to hire?",
];

export default function AskWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;
    const history = messages.map(({ role, content }) => ({ role, content }));
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history }),
      });
      const data = await res.json().catch(() => ({}));
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.answer ??
            data.error ??
            `Something went wrong. You can email him at ${config.email}.`,
          sources: data.sources,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `I couldn't connect just now. You can email him at ${config.email}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Ask about Dhruvaryan"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 right-4 z-[1100] flex max-h-[min(600px,calc(100dvh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background/95 font-sans shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles size={15} className="text-emerald-400" /> Ask about Dhruvaryan
                </div>
                <div className="text-xs text-muted-foreground">
                  Answers come from this site, with sources.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    Ask about his projects, internships, skills or availability. Try one of these:
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => ask(s)}
                        className="rounded-xl border border-border bg-secondary/30 px-3 py-2 text-left text-foreground transition-colors hover:border-foreground/30"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 leading-relaxed",
                      m.role === "user"
                        ? "bg-foreground text-background"
                        : "border border-border bg-secondary/40 text-foreground"
                    )}
                  >
                    {m.content}
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 border-t border-border/60 pt-2">
                        {m.sources.map((s) => (
                          <Link
                            key={s.url + s.title}
                            href={s.url}
                            onClick={() => setOpen(false)}
                            className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 size={14} className="animate-spin" /> Thinking…
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-end gap-2 border-t border-border p-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 500))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    ask(input);
                  }
                }}
                rows={1}
                placeholder="Ask a question…"
                aria-label="Your question"
                className="max-h-28 min-h-[40px] flex-1 resize-none rounded-xl border border-border bg-secondary/30 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground/40"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background transition-opacity disabled:opacity-40"
              >
                <ArrowUp size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="fixed bottom-4 right-4 z-[1100] flex items-center gap-2 rounded-full border border-white/15 bg-zinc-900/90 px-4 py-2.5 font-sans text-sm font-medium text-white shadow-xl backdrop-blur transition-transform hover:scale-[1.03]"
      >
        {open ? <X size={16} /> : <Sparkles size={16} className="text-emerald-400" />}
        {open ? "Close" : "Ask about me"}
      </button>
    </>
  );
}
