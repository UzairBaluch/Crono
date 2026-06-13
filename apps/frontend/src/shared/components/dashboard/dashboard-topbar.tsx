"use client";

import Link from "next/link";
import { ThemeToggle } from "@/shared/components/theme-toggle";

export function DashboardTopbar() {
  return (
    <header className="mb-6 flex items-center justify-between gap-4 border-b border-border/70 pb-4 lg:hidden">
      <Link href="/" className="text-sm font-semibold tracking-tight">
        Crono
      </Link>
      <ThemeToggle />
    </header>
  );
}

export function DashboardTopbarDesktop() {
  return (
    <div className="mb-6 hidden items-center justify-end lg:flex">
      <ThemeToggle />
    </div>
  );
}
