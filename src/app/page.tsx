"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import SkillsSection from "@/components/sections/skills";
import ExperienceSection from "@/components/sections/experience";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import Testimonials from "@/components/sections/testimonials";
import Script from "next/script";
import { config } from "@/data/config";
import { SkillProvider } from "@/context/skill-context";
import SkillInfoCard from "@/components/skill-info-card";
import SceneErrorBoundary from "@/components/scene-error-boundary";
import { useMediaQuery } from "@/hooks/use-media-query";

function MainPage() {
  // The 3D keyboard only loads on tablets and desktops; phones get a lighter page.
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <SkillProvider>
      <SmoothScroll>
      <Script
        id="ld-json-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: config.title,
            url: config.site,
            description: config.description.long,
            inLanguage: "en",
            author: {
              "@type": "Person",
              name: config.author,
              url: config.site,
            },
            publisher: {
              "@type": "Person",
              name: config.author,
            },
          }),
        }}
      />
      {isDesktop && (
        <SceneErrorBoundary>
          <AnimatedBackground />
        </SceneErrorBoundary>
      )}
      <SkillInfoCard />
      <main className={cn("bg-slate-100 dark:bg-transparent canvas-overlay-mode")}>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <Testimonials />
        <ContactSection />
      </main>
      </SmoothScroll>
    </SkillProvider>
  );
}

export default MainPage;
