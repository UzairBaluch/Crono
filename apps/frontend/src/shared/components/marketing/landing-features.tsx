"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/shared/ui/card";
import {
  FEATURE_CATEGORIES,
  HOW_IT_WORKS,
  MARKETING_FEATURES,
  PAIN_POINTS,
  type FeatureCategory,
} from "@/shared/lib/marketing-content";
import { designTokens, themeClasses } from "@/shared/lib/theme";
import { cn } from "@/shared/lib/utils";

interface LandingFeaturesProps {
  activeFilter: FeatureCategory;
  onFilterChange: (filter: FeatureCategory) => void;
  transitionKey: number;
  onNotifyFeature: (featureTitle: string) => void;
}

function StatusBadge({ status }: { status: "live" | "soon" }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
        status === "live"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
          : "border-amber-500/30 bg-amber-500/10 text-amber-500"
      }`}
    >
      {status === "live" ? "Live" : "Soon"}
    </span>
  );
}

export function LandingFeatures({
  activeFilter,
  onFilterChange,
  transitionKey,
  onNotifyFeature,
}: LandingFeaturesProps) {
  const [howItWorksStep, setHowItWorksStep] = useState(0);

  const filtered =
    activeFilter === "all"
      ? MARKETING_FEATURES
      : MARKETING_FEATURES.filter((f) => f.category === activeFilter);

  const liveCount = MARKETING_FEATURES.filter((f) => f.status === "live").length;
  const soonCount = MARKETING_FEATURES.filter((f) => f.status === "soon").length;
  const activeStep = HOW_IT_WORKS[howItWorksStep];

  return (
    <>
      <section className="mt-28 md:mt-32">
        <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
          When cron runs quietly, failures ship loudly.
        </h2>
        <div className="mt-8 grid gap-3.5 md:grid-cols-2">
          {PAIN_POINTS.map((pain) => (
            <Card
              key={pain}
              className="rounded-2xl border-border/80 bg-card/65 p-5 transition-all duration-200 hover:border-accent-muted/25 hover:bg-accent-subtle/15"
            >
              <div className="flex items-start gap-3.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-muted">{pain}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="features" className="mt-28 md:mt-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
              Everything you need for scheduled HTTP
            </h2>
            <p className="mt-2 text-sm text-muted">
              {liveCount} features live today · {soonCount} on the roadmap
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {FEATURE_CATEGORIES.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onFilterChange(item.key)}
              className={`${themeClasses.tabs.base} ${
                activeFilter === item.key
                  ? themeClasses.tabs.active
                  : themeClasses.tabs.inactive
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          key={transitionKey}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-tab"
        >
          {filtered.map((feature) => (
            <Card
              key={feature.title}
              className="group flex flex-col rounded-2xl border-border/80 bg-card/65 p-6 transition-all duration-200 hover:border-accent-muted/30 hover:bg-accent-subtle/15 hover:shadow-[0_0_40px_-20px_rgb(var(--accent-strong)/0.2)]"
            >
              <div className="flex items-start justify-between gap-2">
                <feature.icon className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:scale-110" />
                <StatusBadge status={feature.status} />
              </div>
              <h3 className="mt-4 text-[1.02rem] font-medium leading-snug tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {feature.status === "live" && feature.demoHref ? (
                  <Link
                    href={feature.demoHref}
                    className="inline-flex items-center gap-1 text-xs font-medium text-accent transition-transform hover:translate-x-0.5 hover:underline"
                  >
                    Try it
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ) : null}
                {feature.status === "soon" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => onNotifyFeature(feature.title)}
                      className="focus-ring inline-flex items-center gap-1 rounded-lg border border-accent-muted/30 bg-accent-subtle/40 px-2.5 py-1 text-xs font-medium text-accent transition-all hover:bg-accent-subtle/70 active:scale-95"
                    >
                      <Bell className="h-3 w-3" />
                      Notify me
                    </button>
                    {feature.demoHref ? (
                      <Link
                        href={feature.demoHref}
                        className="text-xs text-muted transition-colors hover:text-accent hover:underline"
                      >
                        Preview demo
                      </Link>
                    ) : null}
                  </>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mt-28 md:mt-32">
        <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
          How it works
        </h2>
        <p className="mt-2 text-sm text-muted">
          Click each step — see the API call and response.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-[240px_1fr]">
          <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {HOW_IT_WORKS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setHowItWorksStep(index)}
                className={cn(
                  "focus-ring shrink-0 rounded-xl border px-4 py-3 text-left transition-all hover:scale-[1.02] lg:w-full",
                  howItWorksStep === index
                    ? "nav-active"
                    : "border-border/80 bg-card/60 hover:border-accent-muted/30 hover:bg-accent-subtle/30",
                )}
              >
                <p className="font-mono text-xs tracking-wide text-accent">
                  {item.step}
                </p>
                <p className="mt-1 text-sm font-medium">{item.title}</p>
              </button>
            ))}
          </div>

          <Card className="panel-glow rounded-2xl border-border/80 bg-card/65 p-5 animate-fade-tab">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  {activeStep.previewLabel}
                </p>
                <h3 className="mt-1 text-lg font-medium tracking-tight">
                  {activeStep.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{activeStep.desc}</p>
              </div>
              <Link
                href={activeStep.demoHref}
                className="inline-flex items-center gap-1 rounded-lg border border-accent-muted/30 bg-accent-subtle/40 px-3 py-1.5 text-xs font-medium text-accent transition-all hover:bg-accent-subtle/70"
              >
                {activeStep.demoLabel}
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            <pre
              className={`mt-5 overflow-x-auto rounded-xl border border-border/80 bg-background/60 p-4 ${designTokens.typography.mono} text-xs leading-relaxed text-muted`}
            >
              {activeStep.preview}
            </pre>

            <p className="mt-4 text-xs font-medium text-muted">Response</p>
            <pre
              className={`mt-2 overflow-x-auto rounded-xl border border-success/20 bg-success/5 p-4 ${designTokens.typography.mono} text-xs leading-relaxed text-success`}
            >
              {activeStep.response}
            </pre>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                disabled={howItWorksStep === 0}
                onClick={() => setHowItWorksStep((s) => s - 1)}
                className="focus-ring rounded-lg border border-border/80 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground disabled:opacity-40"
              >
                ← Previous
              </button>
              <button
                type="button"
                disabled={howItWorksStep === HOW_IT_WORKS.length - 1}
                onClick={() => setHowItWorksStep((s) => s + 1)}
                className="focus-ring rounded-lg border border-accent-muted/30 bg-accent-subtle/40 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent-subtle/70 disabled:opacity-40"
              >
                Next step →
              </button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
