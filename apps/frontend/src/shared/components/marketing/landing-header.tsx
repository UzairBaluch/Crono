"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/shared/components/theme-toggle";

interface LandingHeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export function LandingHeader({ menuOpen, onToggleMenu }: LandingHeaderProps) {
  const navLinks = [
    { href: "#api", label: "Demos" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 md:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Crono
        </Link>
        <nav className="ml-8 hidden items-center gap-6 text-sm text-muted md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="transition-colors duration-200 hover:text-accent"
          >
            Dashboard
          </Link>
        </nav>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="focus-ring btn-secondary inline-flex h-9 items-center justify-center rounded-xl px-4 text-sm font-medium"
          >
            Log in
          </Link>
          <Link
            href="/dashboard"
            className="focus-ring btn-primary inline-flex h-9 items-center justify-center rounded-xl px-4 text-sm font-medium"
          >
            Start free
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={onToggleMenu}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 bg-card/80 transition-colors hover:bg-hover"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div className="border-t border-border/70 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onToggleMenu}
                className="rounded-xl px-3 py-2 text-muted transition-colors hover:bg-hover hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="rounded-xl px-3 py-2 text-muted transition-colors hover:bg-hover hover:text-foreground"
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
