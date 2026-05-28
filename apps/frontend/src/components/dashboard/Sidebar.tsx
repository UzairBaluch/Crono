"use client";

import Link from "next/link";
import { KeyRound, LayoutDashboard, PlusCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/new", label: "Create Job", icon: PlusCircle },
  { href: "/dashboard#api-key", label: "API Key", icon: KeyRound }
];

export function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border/70 bg-card/60 p-4 lg:block">
      <p className="px-2 py-3 text-sm font-semibold tracking-tight text-foreground">Crono</p>
      <nav className="mt-2 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href.includes("#") && pathname === "/dashboard");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-hover hover:text-foreground",
                active && "bg-card-secondary text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
