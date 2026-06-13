"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Minus, Sparkles } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import {
  PRICING_COMPARE_ROWS,
  PRICING_PLANS,
} from "@/shared/lib/marketing-content";
import { themeClasses } from "@/shared/lib/theme";
import { cn } from "@/shared/lib/utils";

interface LandingPricingProps {
  isYearly: boolean;
  onToggleYearly: (yearly: boolean) => void;
  selectedPlan: string;
  onSelectPlan: (slug: string) => void;
}

type PlanSlug = "free" | "starter" | "pro";

function CompareCell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-4 w-4 text-success" />
    ) : (
      <Minus className="mx-auto h-4 w-4 text-muted/50" />
    );
  }
  return <span className="text-sm text-foreground">{value}</span>;
}

function planColumnClass(
  plan: PlanSlug,
  selectedPlan: string,
  hoveredRow: string | null,
  rowLabel: string,
) {
  const isSelected = selectedPlan === plan;
  const rowActive = hoveredRow === rowLabel;

  return cn(
    "px-4 py-3 text-center transition-all duration-200",
    isSelected && "bg-accent-subtle/10",
    rowActive && isSelected && "bg-accent-subtle/35 ring-1 ring-inset ring-accent-muted/40",
    rowActive && !isSelected && "bg-card-secondary/40",
  );
}

export function LandingPricing({
  isYearly,
  onToggleYearly,
  selectedPlan,
  onSelectPlan,
}: LandingPricingProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const selected = PRICING_PLANS.find((p) => p.slug === selectedPlan);

  return (
    <section id="pricing" className="mt-28 md:mt-32">
      <div className="text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-accent-muted/30 bg-accent-subtle/50 px-3 py-1 text-xs font-medium text-accent">
          <Sparkles className="h-3 w-3" />
          Start free · upgrade when you scale
        </p>
        <h2 className="mt-4 text-2xl font-medium tracking-tight md:text-[2.8rem]">
          Pricing that grows with you
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted md:text-base">
          Plan limits enforced in the API today. Click a plan to compare — hover
          rows to highlight your selection.
        </p>

        <div className={`mx-auto mt-6 inline-flex ${themeClasses.pricingToggle.wrapper}`}>
          <button
            type="button"
            onClick={() => onToggleYearly(false)}
            className={`rounded-lg px-4 py-2 transition-colors ${
              !isYearly
                ? themeClasses.pricingToggle.active
                : themeClasses.pricingToggle.inactive
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => onToggleYearly(true)}
            className={`rounded-lg px-4 py-2 transition-colors ${
              isYearly
                ? themeClasses.pricingToggle.active
                : themeClasses.pricingToggle.inactive
            }`}
          >
            Yearly
            <span className="ml-1.5 rounded-md bg-success/15 px-1.5 py-0.5 text-[10px] text-success">
              −22%
            </span>
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:items-stretch">
        {PRICING_PLANS.map((plan) => {
          const price = isYearly ? plan.priceYearly : plan.priceMonthly;
          const isSelected = selectedPlan === plan.slug;
          const yearlySave =
            plan.priceMonthly > 0
              ? plan.priceMonthly * 12 - plan.priceYearly * 12
              : 0;

          return (
            <button
              key={plan.slug}
              type="button"
              onClick={() => onSelectPlan(plan.slug)}
              className={`group text-left transition-all duration-200 ${
                isSelected ? "scale-[1.02] lg:-translate-y-1" : "hover:scale-[1.01]"
              }`}
            >
              <Card
                className={`flex h-full flex-col rounded-2xl p-6 transition-all ${
                  plan.featured || isSelected
                    ? "border-accent-muted/50 bg-accent-subtle/50 panel-glow ring-1 ring-accent-muted/30"
                    : "border-border/80 bg-card/65 hover:border-accent-muted/25"
                }`}
              >
                {plan.featured ? (
                  <p className="inline-flex w-fit rounded-full border border-accent-muted/35 bg-accent-subtle/80 px-2.5 py-1 text-xs font-medium text-accent">
                    Most popular
                  </p>
                ) : null}

                <p className={`text-sm font-medium ${plan.featured ? "mt-4" : ""}`}>
                  {plan.name}
                </p>
                <p className="mt-1 text-xs text-accent">{plan.tagline}</p>
                <p className="mt-1 text-[11px] text-muted">Best for: {plan.bestFor}</p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">${price}</span>
                  {price > 0 ? (
                    <span className="text-sm text-muted">/mo</span>
                  ) : (
                    <span className="text-sm text-muted">forever</span>
                  )}
                </div>

                {isYearly && yearlySave > 0 ? (
                  <p className="mt-1 text-xs text-success">
                    Save ${yearlySave}/year vs monthly
                  </p>
                ) : null}

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg border border-border/60 bg-background/50 px-2.5 py-2">
                    <p className="text-muted">Jobs</p>
                    <p className="font-medium text-foreground">{plan.jobs}</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-background/50 px-2.5 py-2">
                    <p className="text-muted">Logs</p>
                    <p className="font-medium text-foreground">{plan.logRetention}</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-background/50 px-2.5 py-2">
                    <p className="text-muted">Retries</p>
                    <p className="font-medium text-foreground">{plan.retries}</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-background/50 px-2.5 py-2">
                    <p className="text-muted">Alerts</p>
                    <p className="font-medium text-foreground">{plan.alerts}</p>
                  </div>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5 text-sm text-muted">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className="mt-6 block"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant={plan.featured || isSelected ? "primary" : "secondary"}
                    className="h-11 w-full transition-transform group-hover:scale-[1.02]"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            </button>
          );
        })}
      </div>

      {selected ? (
        <Card className="mt-6 panel-glow p-5 animate-fade-tab">
          <p className="text-sm font-medium text-foreground">
            {selected.name} includes
          </p>
          <p className="mt-1 text-xs text-muted">
            {selected.jobs} jobs · {selected.logRetention} logs · {selected.retries}{" "}
            retries · alerts: {selected.alerts}
          </p>
        </Card>
      ) : null}

      <div className="mt-10 overflow-x-auto rounded-2xl border border-border/80">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-card-secondary/60">
            <tr className="border-b border-border/80">
              <th className="px-4 py-3 font-medium text-muted">Compare</th>
              {(["free", "starter", "pro"] as const).map((plan) => (
                <th
                  key={plan}
                  className={cn(
                    "px-4 py-3 text-center font-medium capitalize transition-colors",
                    selectedPlan === plan && "bg-accent-subtle/20 text-accent",
                  )}
                >
                  {plan === "starter" ? (
                    <span className="text-accent">Starter</span>
                  ) : (
                    plan.charAt(0).toUpperCase() + plan.slice(1)
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRICING_COMPARE_ROWS.map((row) => (
              <tr
                key={row.label}
                onMouseEnter={() => setHoveredRow(row.label)}
                onMouseLeave={() => setHoveredRow(null)}
                className={cn(
                  "border-b border-border/50 transition-colors",
                  hoveredRow === row.label && "bg-accent-subtle/15",
                )}
              >
                <td
                  className={cn(
                    "px-4 py-3 transition-colors",
                    hoveredRow === row.label
                      ? "font-medium text-foreground"
                      : "text-muted",
                  )}
                >
                  {row.label}
                </td>
                <td className={planColumnClass("free", selectedPlan, hoveredRow, row.label)}>
                  <CompareCell value={row.free} />
                </td>
                <td className={planColumnClass("starter", selectedPlan, hoveredRow, row.label)}>
                  <CompareCell value={row.starter} />
                </td>
                <td className={planColumnClass("pro", selectedPlan, hoveredRow, row.label)}>
                  <CompareCell value={row.pro} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        Questions?{" "}
        <a href="#contact" className="text-accent underline-offset-2 hover:underline">
          Contact us below
        </a>{" "}
        — we read every message.
      </p>
    </section>
  );
}
