"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ExecutionPreviewLogs } from "@/shared/components/marketing/execution-preview-logs";
import { SCHEDULE_PRESETS } from "@/shared/lib/marketing-content";
import { designTokens, themeClasses } from "@/shared/lib/theme";

interface LandingHeroProps {
  activePreset: number;
  onPresetChange: (index: number) => void;
}

const TRUST_ITEMS = [
  "3 jobs free — no credit card",
  "JWT + API key auth",
  "Plan limits enforced in API",
];

export function LandingHero({
  activePreset,
  onPresetChange,
}: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3 py-1 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            Jobs CRUD live · Scheduler shipping next
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-[3.35rem] md:leading-[1.03]">
            Schedule HTTP jobs.
            <span className="block text-muted">Know when they fail.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-[1.06rem]">
            Crono runs your endpoints on cron, stores execution logs, retries
            failures, and alerts your team — without maintaining cron on a VPS.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard"
              className="focus-ring btn-primary inline-flex h-10 min-w-28 items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium"
            >
              Start free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#api"
              className="focus-ring btn-secondary inline-flex h-10 min-w-36 items-center justify-center rounded-xl px-5 text-sm font-medium"
            >
              Try interactive demos
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {TRUST_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-xs text-muted"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="mb-2 text-xs text-muted">Try a schedule preset</p>
            <div className="flex flex-wrap gap-2">
              {SCHEDULE_PRESETS.map((preset, index) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => onPresetChange(index)}
                  className={`${themeClasses.chip.base} ${
                    activePreset === index
                      ? themeClasses.chip.active
                      : themeClasses.chip.inactive
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <p
              className={`mt-2 ${designTokens.typography.mono} text-xs text-muted`}
            >
              cron:{" "}
              <span className="text-foreground">
                {SCHEDULE_PRESETS[activePreset].cron}
              </span>
            </p>
          </div>
        </div>
        <ExecutionPreviewLogs />
      </div>
    </section>
  );
}
