"use client";

import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { SKILLS } from "@/data/constants";
import { selectSkill } from "@/data/skill-projects";

const SkillsSection = () => {
  const skills = Object.values(SKILLS);

  return (
    <SectionWrapper
      id="skills"
      className="w-full md:h-[150dvh] md:pointer-events-none py-20 md:py-0"
    >
      <SectionHeader
        id="skills"
        className="static md:sticky mb-10 md:mb-72"
        title={<span>Tech Stack</span>}
        desc={
          <span>
            <span className="text-foreground font-semibold">AI &amp; ML</span>
            <span className="mx-2 text-muted-foreground opacity-50">•</span>
            <span className="text-foreground font-semibold">Full-Stack</span>
            <span className="mx-2 text-muted-foreground opacity-50">•</span>
            <span className="text-foreground font-semibold">Data</span>
            <br />
            <span className="text-xs tracking-widest uppercase text-muted-foreground opacity-70 mt-1 inline-block">
              <span className="hidden md:inline">hover a key to explore · click it to see projects built with it</span>
              <span className="md:hidden">tap a skill to see projects built with it</span>
            </span>
          </span>
        }
      />

      {/* Phones don't load the 3D keyboard, so they get a tappable skill list */}
      <ul className="md:hidden flex flex-wrap justify-center gap-2 px-4">
        {skills.map((s) => (
          <li key={s.name}>
            <button
              type="button"
              onClick={() => selectSkill(s.label)}
              className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-sm text-foreground backdrop-blur active:scale-95"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.icon} alt="" className="h-4 w-4 object-contain" />
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
};

export default SkillsSection;
