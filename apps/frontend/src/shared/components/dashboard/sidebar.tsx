"use client";

import Link from "next/link";
import {
  KeyRound,
  LayoutDashboard,
  ListTodo,
  LogOut,
  PlusCircle,
  ScrollText,
} from "lucide-react";
import { CronoLogo } from "@/shared/components/crono-logo";
import { useAuth } from "@/shared/components/auth/auth-provider";
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
  const { user, logout } = useAuth();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border/70 bg-card/60 p-4 lg:flex">
      <div className="flex items-center justify-between px-2 py-3">
        <Link
          href="/dashboard"
          className="transition-transform hover:scale-[1.02]"
        >
          <CronoLogo size={28} showWordmark />
        </Link>
        <ThemeToggle />
      </div>

      {user ? (
        <p className="mt-1 truncate px-2 text-xs text-muted">{user.email}</p>
      ) : null}

      <nav className="mt-4 flex-1 space-y-1">
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

      <div className="mt-4 space-y-2">
        <div className="rounded-xl border border-accent-muted/20 bg-accent-subtle/30 px-3 py-2.5">
          <p className="text-[10px] font-medium uppercase tracking-wider text-accent">
            {user?.plan ?? "free"} plan
          </p>
          <p className="mt-0.5 text-xs text-muted">Live API data</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="focus-ring flex w-full items-center gap-2 rounded-xl border border-border/80 px-3 py-2 text-sm text-muted transition-colors hover:border-error/30 hover:bg-error/5 hover:text-error"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
