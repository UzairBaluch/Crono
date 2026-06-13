"use client";

import { Plus } from "lucide-react";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

interface LandingPlanDemoProps {
  jobCount: number;
  lastResponse: string | null;
  onCreateJob: () => void;
  onReset: () => void;
}

export function LandingPlanDemo({
  jobCount,
  lastResponse,
  onCreateJob,
  onReset,
}: LandingPlanDemoProps) {
  const atLimit = jobCount >= 3;
  const blocked = jobCount >= 4;

  return (
    <section id="plan-demo" className="interactive-section">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
            Plan limits, enforced live
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            Free plan = 3 jobs. Try creating jobs below — the 4th hits{" "}
            <code className="rounded bg-accent-subtle/80 px-1 font-mono text-xs text-accent">
              403
            </code>{" "}
            exactly like the real API.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex gap-2">
              {[1, 2, 3].map((slot) => (
                <div
                  key={slot}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-medium transition-all duration-300 ${
                    jobCount >= slot
                      ? "scale-105 border-accent-muted/40 bg-accent-subtle/80 text-accent animate-scale-in"
                      : "border-border/80 bg-card/60 text-muted"
                  }`}
                >
                  {jobCount >= slot ? "✓" : slot}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <p className="font-medium text-foreground">
                {Math.min(jobCount, 3)}/3 jobs
              </p>
              <p className="text-xs text-muted">Free plan</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              className="h-10 gap-2"
              onClick={onCreateJob}
              disabled={blocked}
            >
              <Plus className="h-4 w-4" />
              Create job
            </Button>
            {jobCount > 0 ? (
              <Button variant="secondary" className="h-10" onClick={onReset}>
                Reset
              </Button>
            ) : null}
          </div>

          {atLimit && !blocked ? (
            <p className="mt-3 text-xs text-warning">
              At limit — one more create will return 403.
            </p>
          ) : null}
          {blocked ? (
            <p className="mt-3 text-xs text-error">
              Blocked — upgrade to Starter for 50 jobs.
            </p>
          ) : null}
        </div>

        <Card className="panel-glow overflow-hidden">
          <div className="border-b border-border/80 bg-accent-subtle/20 px-4 py-3">
            <span className="font-mono text-xs text-accent">
              POST /api/v1/jobs → {blocked ? "403" : "201"}
            </span>
          </div>
          <pre
            className={`overflow-x-auto p-5 font-mono text-[13px] leading-relaxed animate-fade-tab ${
              blocked ? "text-error" : "text-success"
            }`}
            key={lastResponse ?? "empty"}
          >
            {lastResponse ?? `// Click "Create job" to simulate API responses`}
          </pre>
        </Card>
      </div>
    </section>
  );
}
