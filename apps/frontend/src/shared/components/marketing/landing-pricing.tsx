"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { PRICING_PLANS } from "@/shared/lib/marketing-content";
import { themeClasses } from "@/shared/lib/theme";

interface LandingPricingProps {
  isYearly: boolean;
  onToggleYearly: (yearly: boolean) => void;
}

export function LandingPricing({
  isYearly,
  onToggleYearly,
}: LandingPricingProps) {
  return (
    <section id="pricing" className="mt-28 md:mt-32">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
            Simple pricing
          </h2>
          <p className="mt-2 text-sm text-muted">
            Limits enforced in the API today. Stripe checkout ships soon.
          </p>
        </div>
        <div className={themeClasses.pricingToggle.wrapper}>
          <button
            type="button"
            onClick={() => onToggleYearly(false)}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
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
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              isYearly
                ? themeClasses.pricingToggle.active
                : themeClasses.pricingToggle.inactive
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => {
          const price = isYearly ? plan.priceYearly : plan.priceMonthly;
          return (
            <Card
              key={plan.name}
              className={`rounded-2xl p-6 ${
                plan.featured
                  ? "border-accent-muted/40 bg-accent-subtle/80 shadow-[0_0_0_1px_rgb(var(--accent-muted)/0.2)] panel-glow"
                  : "border-border/80 bg-card/65"
              }`}
            >
              {plan.featured ? (
                <p className="inline-flex rounded-full border border-accent-muted/35 bg-accent-subtle/80 px-2.5 py-1 text-xs text-accent">
                  Most popular
                </p>
              ) : null}
              <p
                className={`text-sm font-medium tracking-tight ${plan.featured ? "mt-4" : ""}`}
              >
                {plan.name}
              </p>
              <p className="mt-4 text-3xl font-medium tracking-tight">
                ${price}
                {price > 0 ? (
                  <span className="ml-1 text-sm font-normal text-muted">
                    /mo{isYearly ? " billed yearly" : ""}
                  </span>
                ) : null}
              </p>
              <p className="mt-2 text-sm text-muted">
                {plan.jobs} active jobs · {plan.logRetention} logs ·{" "}
                {plan.retries} retries
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-muted">
                {plan.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="mt-7 block">
                <Button
                  variant={plan.featured ? "primary" : "secondary"}
                  className="h-10 w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
