"use client";

import { Card } from "@/shared/ui/card";
import { RETRY_STEPS } from "@/shared/lib/marketing-content";
import { designTokens, themeClasses } from "@/shared/lib/theme";

interface LandingRetrySectionProps {
  activeStep: string;
  onStepChange: (id: string) => void;
}

const toneClasses = {
  neutral: themeClasses.log.neutral,
  success: themeClasses.log.success,
  error: themeClasses.log.error,
  warning: themeClasses.log.warning,
};

export function LandingRetrySection({
  activeStep,
  onStepChange,
}: LandingRetrySectionProps) {
  const step =
    RETRY_STEPS.find((s) => s.id === activeStep) ?? RETRY_STEPS[0];

  return (
    <section id="reliability" className="interactive-section">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
          See retries in action
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
          Step through a failed run — exponential backoff, logging, and alerts
          when all attempts exhaust.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[240px_1fr]">
        <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {RETRY_STEPS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onStepChange(item.id)}
              className={`focus-ring shrink-0 rounded-xl border px-4 py-3 text-left transition-all hover:scale-[1.02] lg:w-full ${
                activeStep === item.id
                  ? "nav-active"
                  : "border-border/80 bg-card/60 hover:border-accent-muted/30 hover:bg-accent-subtle/30"
              }`}
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                Step {index + 1}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {item.label}
              </p>
            </button>
          ))}
        </div>

        <Card className="panel-glow overflow-hidden" key={step.id}>
          <div className="flex items-center justify-between border-b border-border/80 bg-card-secondary/50 px-4 py-3">
            <span className="text-xs font-medium text-muted">Execution log</span>
            <span className="font-mono text-xs text-muted">{step.endpoint}</span>
          </div>
          <ul
            className={`space-y-3 p-5 ${designTokens.typography.mono} text-[13px] leading-relaxed animate-fade-tab`}
          >
            {step.logs.map((line, index) => (
              <li
                key={line.text}
                className={`animate-fade-up opacity-0 ${toneClasses[line.tone]}`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                {line.text}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
