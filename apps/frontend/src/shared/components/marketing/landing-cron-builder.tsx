"use client";

import { Card } from "@/shared/ui/card";
import { CRON_BUILDER_PRESETS } from "@/shared/lib/marketing-content";
import { designTokens, themeClasses } from "@/shared/lib/theme";

interface LandingCronBuilderProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function LandingCronBuilder({
  activeIndex,
  onSelect,
}: LandingCronBuilderProps) {
  const preset = CRON_BUILDER_PRESETS[activeIndex];

  return (
    <section id="cron" className="interactive-section">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
          Cron that humans can read
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
          Pick a schedule — see the expression, plain-English meaning, and when
          it runs next. Invalid cron is rejected by the API before save.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-wrap gap-2 content-start">
          {CRON_BUILDER_PRESETS.map((item, index) => (
            <button
              key={item.cron}
              type="button"
              onClick={() => onSelect(index)}
              className={`${themeClasses.chip.base} ${
                activeIndex === index
                  ? themeClasses.chip.active
                  : themeClasses.chip.inactive
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Card className="panel-glow overflow-hidden" key={preset.cron}>
          <div className="border-b border-border/80 bg-accent-subtle/20 px-4 py-3">
            <span className="text-xs font-medium text-accent">Schedule preview</span>
          </div>
          <div className="space-y-4 p-5">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted">Expression</p>
              <p className={`mt-1 ${designTokens.typography.mono} text-sm text-foreground`}>
                {preset.cron}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted">Means</p>
              <p className="mt-1 text-sm text-foreground">{preset.human}</p>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-accent-muted/25 bg-accent-subtle/30 px-3 py-2.5">
              <span className="text-xs text-muted">Next run</span>
              <span className="text-sm font-medium text-accent">{preset.next}</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
