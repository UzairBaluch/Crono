"use client";

import Link from "next/link";
import {
  KeyRound,
  LayoutDashboard,
  ListTodo,
  PlusCircle,
  ScrollText,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { themeClasses } from "@/shared/lib/theme";
import { ThemeToggle } from "@/shared/components/theme-toggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobs", label: "Jobs", icon: ListTodo },
  { href: "/logs", label: "Logs", icon: ScrollText },
  { href: "/dashboard/new", label: "Create Job", icon: PlusCircle },
  { href: "/dashboard#api-key", label: "API Key", icon: KeyRound },
];

export function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border/70 bg-card/60 p-4 lg:flex">
      <div className="flex items-center justify-between px-2 py-3">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          Crono
        </Link>
        <ThemeToggle />
      </div>
      <nav className="mt-2 flex-1 space-y-1">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              item.href !== "/dashboard#api-key" &&
              pathname.startsWith(item.href)) ||
            (item.href.includes("#") && pathname === "/dashboard");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-all hover:scale-[1.01]",
                active ? themeClasses.nav.active : themeClasses.nav.inactive,
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-4 rounded-xl border border-accent-muted/20 bg-accent-subtle/30 px-3 py-2.5">
        <p className="text-[10px] font-medium uppercase tracking-wider text-accent">
          Free plan
        </p>
        <p className="mt-0.5 text-xs text-muted">3 jobs · mock dashboard</p>
      </div>
    </aside>
  );
}
