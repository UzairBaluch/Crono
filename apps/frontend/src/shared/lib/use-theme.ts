"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "crono-theme";

export function useTheme() {
  const [isLight, setIsLight] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const useLight = saved === "light";
    setIsLight(useLight);
    document.documentElement.classList.toggle("theme-light", useLight);
    setReady(true);
  }, []);

  function toggleTheme() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("theme-light", next);
    window.localStorage.setItem(STORAGE_KEY, next ? "light" : "dark");
  }

  return { isLight, toggleTheme, ready };
}
