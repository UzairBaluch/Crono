"use client";

import { Activity, Loader2 } from "lucide-react";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

interface LandingHealthDemoProps {
  pinging: boolean;
  response: string;
  onPing: () => void;
}

export function LandingHealthDemo({
  pinging,
  response,
  onPing,
}: LandingHealthDemoProps) {
  return (
    <section id="health" className="interactive-section">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
            Readiness before traffic routes
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            Load balancers hit{" "}
            <code className="rounded bg-accent-subtle/60 px-1 font-mono text-xs text-accent">
              GET /api/v1/health
            </code>{" "}
            — Postgres and Redis must be up before Crono accepts job traffic.
          </p>
          <Button
            className="mt-6 h-10 gap-2"
            onClick={onPing}
            disabled={pinging}
          >
            {pinging ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Activity className="h-4 w-4" />
            )}
            {pinging ? "Checking…" : "Ping health"}
          </Button>
        </div>

        <Card className="panel-glow overflow-hidden">
          <div className="border-b border-border/80 bg-card-secondary/50 px-4 py-3">
            <span className="font-mono text-xs text-muted">
              GET /api/v1/health → {response.includes("ok") ? "200" : "—"}
            </span>
          </div>
          <pre
            className={`overflow-x-auto p-5 font-mono text-[13px] leading-relaxed animate-fade-tab ${
              response.includes("ok") ? "text-success" : "text-muted"
            }`}
          >
            {response}
          </pre>
        </Card>
      </div>
    </section>
  );
}
