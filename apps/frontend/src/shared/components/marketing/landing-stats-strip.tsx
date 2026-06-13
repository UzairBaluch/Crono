"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { VALUE_STATS } from "@/shared/lib/marketing-content";

export function LandingStatsStrip() {
  return (
    <section className="interactive-section-first grid grid-cols-2 gap-3 md:grid-cols-4">
      {VALUE_STATS.map((stat) => (
        <Link
          key={stat.label}
          href={stat.href}
          className="group focus-ring rounded-2xl border border-border/80 bg-card/60 px-4 py-4 transition-all hover:border-accent-muted/40 hover:bg-accent-subtle/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-2xl font-semibold tracking-tight text-accent transition-colors group-hover:text-accent-strong">
              {stat.value}
            </p>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100" />
          </div>
          <p className="mt-1 text-xs font-medium text-foreground">{stat.label}</p>
          <p className="mt-0.5 text-[11px] text-muted group-hover:text-accent/80">
            {stat.hint} · see demo
          </p>
        </Link>
      ))}
    </section>
  );
}
