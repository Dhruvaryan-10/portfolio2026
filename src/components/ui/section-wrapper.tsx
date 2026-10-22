"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Skip the scroll fade (used for the first screen so it paints immediately) */
  static?: boolean;
}

const SectionWrapper = ({ id, className, children, static: isStatic, ...props }: SectionWrapperProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn("relative", className)}
      {...props}
    >
      <motion.div
        style={isStatic ? undefined : { opacity, scale }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
