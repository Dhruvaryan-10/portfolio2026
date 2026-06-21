import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const SkillsSection = () => {
  return (
    <SectionWrapper id="skills" className="w-full h-[100dvh] md:h-[150dvh] pointer-events-none">
      <SectionHeader
        id="skills"
        title={
          <span>
            Tech Stack
          </span>
        }
        desc={
          <span>
            <span className="text-foreground font-semibold">AI Engineer</span>
            <span className="mx-2 text-muted-foreground opacity-50">•</span>
            <span className="text-foreground font-semibold">Data Analyst</span>
            <span className="mx-2 text-muted-foreground opacity-50">•</span>
            <span className="text-foreground font-semibold">Full Stack Developer</span>
            <br />
            <span className="text-xs tracking-widest uppercase text-muted-foreground opacity-70 mt-1 inline-block">
              hover or press a key to explore
            </span>
          </span>
        }
      />
    </SectionWrapper>
  );
};

export default SkillsSection;
