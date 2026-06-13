"use client";

import { AlertTriangle } from "lucide-react";
import { Card } from "@/shared/ui/card";
import {
  FEATURE_CATEGORIES,
  HOW_IT_WORKS,
  MARKETING_FEATURES,
  PAIN_POINTS,
  type FeatureCategory,
} from "@/shared/lib/marketing-content";
import { themeClasses } from "@/shared/lib/theme";

interface LandingFeaturesProps {
  activeFilter: FeatureCategory;
  onFilterChange: (filter: FeatureCategory) => void;
  transitionKey: number;
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
}: LandingFeaturesProps) {
  const filtered =
    activeFilter === "all"
      ? MARKETING_FEATURES
      : MARKETING_FEATURES.filter((f) => f.category === activeFilter);

  const liveCount = MARKETING_FEATURES.filter((f) => f.status === "live").length;
  const soonCount = MARKETING_FEATURES.filter((f) => f.status === "soon").length;

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
              className="rounded-2xl border-border/80 bg-card/65 p-5 transition-colors duration-200 hover:bg-card-secondary/70"
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
              className="rounded-2xl border-border/80 bg-card/65 p-6 transition-colors duration-200 hover:bg-card-secondary/70"
            >
              <div className="flex items-start justify-between gap-2">
                <feature.icon className="h-4 w-4 shrink-0 text-accent" />
                <StatusBadge status={feature.status} />
              </div>
              <h3 className="mt-4 text-[1.02rem] font-medium leading-snug tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-28 md:mt-32">
        <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
          How it works
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <Card
              key={item.step}
              className="rounded-2xl border-border/80 bg-card/65 p-6 transition-colors duration-200 hover:bg-card-secondary/70"
            >
              <p className="font-mono text-xs tracking-wide text-accent">
                {item.step}
              </p>
              <h3 className="mt-3 text-base font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
