"use client";

import Particles from "@/components/Particles";
import EasterEggs from "@/components/easter-eggs";
import ElasticCursor from "@/components/ui/ElasticCursor";
import AskWidget from "@/components/ask-widget";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function AppOverlays() {
  // Respect the operating system's "reduce motion" setting.
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isPhone = useMediaQuery("(max-width: 767px)");

  return (
    <>
      {!reduceMotion && (
        <Particles
          className="fixed inset-0 -z-10 animate-fade-in"
          quantity={isPhone ? 30 : 100}
        />
      )}
      <EasterEggs />
      {!reduceMotion && <ElasticCursor />}
      <AskWidget />
    </>
  );
}
