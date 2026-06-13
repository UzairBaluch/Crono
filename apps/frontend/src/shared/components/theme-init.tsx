"use client";

import { useTheme } from "@/shared/lib/use-theme";

/** Loads saved theme on every page (landing + dashboard). */
export function ThemeInit() {
  useTheme();
  return null;
}
