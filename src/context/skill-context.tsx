"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Skill } from "@/data/constants";

interface SkillContextType {
  selectedSkill: Skill | null;
  setSelectedSkill: (skill: Skill | null) => void;
}

const SkillContext = createContext<SkillContextType>({
  selectedSkill: null,
  setSelectedSkill: () => {},
});

export const SkillProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <SkillContext.Provider value={{ selectedSkill, setSelectedSkill }}>
      {children}
    </SkillContext.Provider>
  );
};

export const useSkillContext = () => useContext(SkillContext);
