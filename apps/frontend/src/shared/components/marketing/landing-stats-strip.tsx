"use client";

import { VALUE_STATS } from "@/shared/lib/marketing-content";

export function LandingStatsStrip() {
  return (
    <section className="interactive-section-first grid grid-cols-2 gap-3 md:grid-cols-4">
      {VALUE_STATS.map((stat) => (
        <div
          key={stat.label}
          className="group rounded-2xl border border-border/80 bg-card/60 px-4 py-4 transition-all hover:border-accent-muted/40 hover:bg-accent-subtle/40 hover:scale-[1.02]"
        >
          <p className="text-2xl font-semibold tracking-tight text-accent transition-colors group-hover:text-accent-strong">
            {stat.value}
          </p>
          <p className="mt-1 text-xs font-medium text-foreground">{stat.label}</p>
          <p className="mt-0.5 text-[11px] text-muted">{stat.hint}</p>
        </div>
      ))}
    </section>
  );
}
