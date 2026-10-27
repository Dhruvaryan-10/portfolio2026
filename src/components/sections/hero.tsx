"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { File, Mail } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLeetcode, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";

import SectionWrapper from "../ui/section-wrapper";
import { useView } from "@/hooks/use-view";

const HeroSection = () => {
  const view = useView();

  return (
    <SectionWrapper id="hero" static className={cn("relative w-full min-h-[100dvh]")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "min-h-[calc(100dvh-3rem)] md:min-h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "px-6 pt-28 pb-16 md:px-16 md:pt-28 lg:px-20 xl:px-24"
          )}
        >
          {/* Rendered on the server so the name paints immediately (fast LCP) */}
          {(
            <div className="flex flex-col">
              <div>
                <BlurIn delay={0.3}>
                  <p
                    className={cn(
                      "md:self-start mt-4 font-thin text-md text-slate-500 dark:text-zinc-400",
                      "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text"
                    )}
                  >
                    Hi, I am
                    <br className="md:hidden" />
                  </p>
                </BlurIn>

                <h1
                    className={cn(
                      "-ml-[4px] leading-none font-thin text-transparent text-slate-800 text-left mt-1",
                      "font-thin text-[3.1rem] sm:text-6xl lg:text-7xl 2xl:text-8xl",
                      "cursor-default text-edge-outline font-display"
                    )}
                  >
                    {config.author.split(" ")[0]}
                    <span className="md:hidden"> </span>
                    <br className="hidden md:block" />
                    {config.author.split(" ")[1]}
                  </h1>

                <BlurIn delay={0.6}>
                  <p
                    className={cn(
                      "md:self-start mt-2 font-thin text-md text-slate-500 dark:text-zinc-400",
                      "cursor-default font-display sm:text-xl md:text-xl bg-clip-text"
                    )}
                  >
                    {view?.role ?? config.role}
                  </p>
                </BlurIn>

                <BlurIn delay={0.75}>
                  <p className="mt-4 max-w-md font-sans text-sm sm:text-base leading-relaxed text-slate-600 dark:text-zinc-300">
                    {view?.summary ?? config.description.short}
                  </p>
                </BlurIn>

                <BlurIn delay={0.9}>
                  <ul
                    aria-label="Highlights"
                    className="mt-5 grid max-w-md grid-cols-2 gap-2 font-sans"
                  >
                    {config.proof.map((p) => (
                      <li key={p.label}>
                        <Link
                          href={p.href}
                          className="group flex h-full flex-col rounded-xl border border-slate-300/70 bg-white/60 px-3 py-2 backdrop-blur transition-colors hover:border-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/30"
                        >
                          <span className="text-lg font-semibold tabular-nums text-slate-900 dark:text-white">
                            {p.value}
                          </span>
                          <span className="text-[11px] leading-tight text-slate-500 dark:text-zinc-400">
                            {p.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </BlurIn>
              </div>

              <div className="mt-6 flex flex-col gap-3 w-fit">
                <Link
                  href={config.resume}
                  target="_blank"
                  className="flex-1"
                >
                  <BoxReveal delay={1.1} width="100%">
                    <Button className="flex items-center gap-2 w-full">
                      <File size={24} />
                      <p>Resume</p>
                    </Button>
                  </BoxReveal>
                </Link>

                <div className="md:self-start flex gap-3">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link href="#contact">
                        <Button
                          variant={"outline"}
                          className="block w-full overflow-hidden"
                        >
                          Get in touch
                        </Button>
                      </Link>
                    </TooltipTrigger>

                    <TooltipContent side="bottom">
                      <p>Open to internships and full-time roles</p>
                    </TooltipContent>
                  </Tooltip>

                  <div className="flex items-center h-full gap-2">
                    <Link
                      href={`mailto:${config.email}`}
                      className="cursor-can-hover"
                      aria-label="Email"
                    >
                      <Button variant={"outline"} tabIndex={-1} aria-label="Email">
                        <Mail size={24} />
                      </Button>
                    </Link>

                    <Link
                      href={config.social.github}
                      target="_blank"
                      className="cursor-can-hover"
                      aria-label="GitHub"
                    >
                      <Button variant={"outline"} tabIndex={-1} aria-label="GitHub">
                        <SiGithub size={24} />
                      </Button>
                    </Link>

                    <Link
                      href={config.social.linkedin}
                      target="_blank"
                      className="cursor-can-hover"
                      aria-label="LinkedIn"
                    >
                      <Button variant={"outline"} tabIndex={-1} aria-label="LinkedIn">
                        <SiLinkedin size={24} />
                      </Button>
                    </Link>

                    <Link
                      href={config.social.leetcode}
                      target="_blank"
                      className="cursor-can-hover"
                      aria-label="LeetCode"
                    >
                      <Button variant={"outline"} tabIndex={-1} aria-label="LeetCode">
                        <SiLeetcode size={24} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <p className="mt-5 flex items-center gap-2 font-sans text-xs text-slate-500 dark:text-zinc-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {config.availability}
              </p>
            </div>
          )}
        </div>

        <div className="grid col-span-1"></div>
      </div>

      <div className="absolute bottom-10 left-[50%] translate-x-[-50%] hidden md:block">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;