"use client";

import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";

const INTERACTIVE_LINKS = [
  { href: "#api", label: "Create", sectionId: "api" },
  { href: "#playground", label: "CRUD", sectionId: "playground" },
  { href: "#cron", label: "Cron", sectionId: "cron" },
  { href: "#auth-demo", label: "Auth", sectionId: "auth-demo" },
  { href: "#logs-demo", label: "Logs", sectionId: "logs-demo" },
  { href: "#health", label: "Health", sectionId: "health" },
  { href: "#plan-demo", label: "Limits", sectionId: "plan-demo" },
  { href: "#reliability", label: "Retries", sectionId: "reliability" },
  { href: "#alerts", label: "Alerts", sectionId: "alerts" },
  { href: "#pricing", label: "Pricing", sectionId: "pricing" },
  { href: "#contact", label: "Contact", sectionId: "contact" },
] as const;

export function LandingInteractiveNav() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const elements = INTERACTIVE_LINKS.map((link) =>
      document.getElementById(link.sectionId),
    ).filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.4] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Interactive demos"
      className="interactive-section-first -mx-1 flex gap-2 overflow-x-auto pb-2 scrollbar-none"
    >
      <span className="mr-1 shrink-0 self-center text-xs font-medium text-accent">
        Explore ↓
      </span>
      {INTERACTIVE_LINKS.map((link) => {
        const active = activeSection === link.sectionId;
        return (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              "focus-ring shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all hover:scale-105 active:scale-95",
              active
                ? "border-accent-muted/50 bg-accent-subtle/70 text-accent shadow-sm scale-105"
                : "border-border bg-card/80 text-muted hover:border-accent-muted/40 hover:bg-accent-subtle/50 hover:text-accent",
            )}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
