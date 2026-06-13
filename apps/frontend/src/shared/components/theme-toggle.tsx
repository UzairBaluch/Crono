"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/shared/lib/use-theme";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { isLight, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`focus-ring inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 bg-card/60 text-muted transition-colors hover:bg-hover hover:text-foreground ${className}`}
    >
      {isLight ? (
        <Moon className="h-3.5 w-3.5" />
      ) : (
        <Sun className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
