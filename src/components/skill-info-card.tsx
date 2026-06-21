"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSkillContext } from "@/context/skill-context";

// Category badge colours keyed by SkillCategory
const CATEGORY_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  "Language":   { bg: "rgba(55,118,171,0.18)",  text: "#7eb8e8", dot: "#3776ab" },
  "Frontend":   { bg: "rgba(97,218,251,0.15)",   text: "#61dafb", dot: "#61dafb" },
  "Backend":    { bg: "rgba(108,194,74,0.15)",   text: "#8edd6a", dot: "#6cc24a" },
  "AI & Data":  { bg: "rgba(255,111,0,0.15)",    text: "#ff9f4a", dot: "#ff6f00" },
  "Tools":      { bg: "rgba(180,180,200,0.15)",  text: "#b4b4c8", dot: "#9090a8" },
};

// Tag shown next to the label for priority skills
const PRIORITY_LABEL = "★ Featured";

export default function SkillInfoCard() {
  const { selectedSkill } = useSkillContext();
  const cardRef = useRef<HTMLDivElement>(null);

  if (!selectedSkill) return null;

  const catStyle = CATEGORY_STYLES[selectedSkill.category] ?? CATEGORY_STYLES["Tools"];
  const isPriority = selectedSkill.isPriority ?? false;

  // Sanitise color — if white/near-white use a fallback glow
  const rawColor = selectedSkill.color;
  const glowColor =
    rawColor === "#ffffff" || rawColor === "#fff" || rawColor === "#cccccc"
      ? "rgba(160,160,200,0.45)"
      : `${rawColor}55`;
  const borderColor =
    rawColor === "#ffffff" || rawColor === "#fff" || rawColor === "#cccccc"
      ? "rgba(160,160,200,0.5)"
      : `${rawColor}88`;

  return (
    <AnimatePresence mode="wait">
      {selectedSkill && (
        <motion.div
          key={selectedSkill.id}
          ref={cardRef}
          initial={{ opacity: 0, y: 16, scale: 0.94, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 8, scale: 0.96, filter: "blur(4px)" }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed z-50"
          style={{
            bottom: "clamp(1.5rem, 4vh, 3rem)",
            right: "clamp(1rem, 3vw, 2.5rem)",
            width: "clamp(260px, 26vw, 340px)",
          }}
        >
          {/* Glow backdrop */}
          <div
            className="absolute inset-0 rounded-2xl blur-xl opacity-60 -z-10"
            style={{ background: glowColor }}
          />

          {/* Card body */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,15,25,0.92) 0%, rgba(10,10,20,0.97) 100%)",
              border: `1px solid ${borderColor}`,
              boxShadow: `0 8px 32px ${glowColor}, 0 2px 8px rgba(0,0,0,0.6)`,
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Priority accent bar */}
            {isPriority && (
              <div
                className="h-[2px] w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${rawColor === "#ffffff" || rawColor === "#fff" ? "#a0a0c8" : rawColor}, transparent)`,
                }}
              />
            )}

            <div className="p-5">
              {/* Header row */}
              <div className="flex items-start gap-3.5 mb-3.5">
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${rawColor === "#ffffff" || rawColor === "#fff" ? "rgba(200,200,220,0.12)" : rawColor + "22"}`,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <img
                    src={selectedSkill.icon}
                    alt={selectedSkill.label}
                    className="w-6 h-6 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>

                {/* Label + badges */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className="text-white font-semibold text-[15px] leading-tight tracking-tight">
                      {selectedSkill.label}
                    </span>
                    {isPriority && (
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded-full tracking-wide"
                        style={{
                          background: `${rawColor === "#ffffff" || rawColor === "#fff" ? "rgba(200,200,220,0.2)" : rawColor + "28"}`,
                          color: rawColor === "#ffffff" || rawColor === "#fff" ? "#c8c8dc" : rawColor,
                          border: `1px solid ${borderColor}`,
                        }}
                      >
                        {PRIORITY_LABEL}
                      </span>
                    )}
                  </div>

                  {/* Category badge */}
                  <span
                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full"
                    style={{ background: catStyle.bg, color: catStyle.text }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: catStyle.dot }}
                    />
                    {selectedSkill.category}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className="h-px mb-3"
                style={{ background: `linear-gradient(90deg, ${borderColor}, transparent)` }}
              />

              {/* Description */}
              <p
                className="text-[12.5px] leading-relaxed"
                style={{ color: "rgba(200,210,230,0.85)" }}
              >
                {selectedSkill.shortDescription}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
