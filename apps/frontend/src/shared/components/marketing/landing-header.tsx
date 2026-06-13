"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { CronoLogo } from "@/shared/components/crono-logo";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { cn } from "@/shared/lib/utils";

interface LandingHeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

const NAV_LINKS = [
  { href: "#api", label: "Demos", sectionId: "api" },
  { href: "#features", label: "Features", sectionId: "features" },
  { href: "#pricing", label: "Pricing", sectionId: "pricing" },
  { href: "#contact", label: "Contact", sectionId: "contact" },
] as const;

export function LandingHeader({ menuOpen, onToggleMenu }: LandingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.sectionId);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

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
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl transition-shadow duration-300",
        scrolled
          ? "border-border/90 shadow-[0_8px_30px_-12px_rgb(var(--accent-strong)/0.15)]"
          : "border-border/70",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 md:px-6">
        <Link
          href="/"
          className="group focus-ring inline-flex items-center gap-2.5 rounded-xl py-1 pr-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <CronoLogo size={30} showWordmark />
        </Link>

        <nav className="ml-8 hidden items-center gap-1 text-sm md:flex">
          {NAV_LINKS.map((link) => {
            const active = activeSection === link.sectionId;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "focus-ring relative rounded-lg px-3 py-2 transition-colors duration-200",
                  active
                    ? "text-accent"
                    : "text-muted hover:text-foreground",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent transition-all duration-300",
                    active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
                  )}
                />
              </Link>
            );
          })}
          <Link
            href="/dashboard"
            className="focus-ring rounded-lg px-3 py-2 text-muted transition-colors duration-200 hover:text-foreground"
          >
            Dashboard
          </Link>
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="focus-ring btn-secondary inline-flex h-9 items-center justify-center rounded-xl px-4 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95"
          >
            Log in
          </Link>
          <Link
            href="/dashboard"
            className="focus-ring btn-primary inline-flex h-9 items-center justify-center rounded-xl px-4 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95"
          >
            Start free
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={onToggleMenu}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 bg-card/80 transition-all hover:border-accent-muted/40 hover:bg-accent-subtle/30 active:scale-95"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-border/70 px-4 py-4 md:hidden animate-scale-in">
          <div className="flex flex-col gap-1 text-sm">
            {NAV_LINKS.map((link) => {
              const active = activeSection === link.sectionId;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onToggleMenu}
                  className={cn(
                    "focus-ring rounded-xl px-3 py-2.5 transition-colors",
                    active
                      ? "bg-accent-subtle/50 text-accent"
                      : "text-muted hover:bg-hover hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/dashboard"
              onClick={onToggleMenu}
              className="focus-ring rounded-xl px-3 py-2.5 text-muted transition-colors hover:bg-hover hover:text-foreground"
            >
              Dashboard
            </Link>
            <div className="mt-3 flex gap-2">
              <Link
                href="/dashboard"
                className="focus-ring btn-secondary inline-flex h-10 flex-1 items-center justify-center rounded-xl px-4 text-sm font-medium"
              >
                Log in
              </Link>
              <Link
                href="/dashboard"
                className="focus-ring btn-primary inline-flex h-10 flex-1 items-center justify-center rounded-xl px-4 text-sm font-medium"
              >
                Start free
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
