"use client";

import { useEffect, useState } from "react";
import { config } from "@/data/config";

/**
 * Reads ?for=ai|data|fullstack from the URL so a tailored link can change the
 * headline and project order. Remembered for the visit (sessionStorage).
 */
export function useView() {
  const [view, setView] = useState<string | null>(null);

  useEffect(() => {
    let key: string | null = null;
    try {
      key = new URLSearchParams(window.location.search).get("for");
      if (key && config.views[key]) sessionStorage.setItem("portfolio-view", key);
      else key = sessionStorage.getItem("portfolio-view");
    } catch {
      /* storage unavailable: ignore */
    }
    if (key && config.views[key]) setView(key);
  }, []);

  return view ? { key: view, ...config.views[view] } : null;
}
