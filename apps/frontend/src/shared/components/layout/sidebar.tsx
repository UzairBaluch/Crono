import Link from "next/link";
import { Activity, Bell, CreditCard, LayoutDashboard, Logs, Settings } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobs", label: "Jobs", icon: Activity },
  { href: "/logs", label: "Logs", icon: Logs },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="hidden w-[260px] flex-col border-r border-border bg-card px-3 py-4 lg:flex">
      <div className="mb-8 px-2 text-sm font-semibold tracking-tight">CronAPI.dev</div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring flex items-center rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-hover hover:text-foreground",
                active && "border-l-2 border-white bg-white/5 text-foreground"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-xl border border-border bg-card-secondary p-3 text-xs text-muted">
        Signed in as
        <p className="mt-1 text-sm text-foreground">uzair@cronapi.dev</p>
      </div>
    </aside>
  );
}
