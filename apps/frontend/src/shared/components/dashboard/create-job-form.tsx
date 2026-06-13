"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export function CreateJobForm() {
  const [method, setMethod] = useState<"GET" | "POST">("GET");
  const [cronPreset, setCronPreset] = useState("*/5 * * * *");
  const [created, setCreated] = useState(false);

  return (
    <Card className="rounded-2xl border-border/80 bg-card p-6">
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          setCreated(true);
          window.setTimeout(() => setCreated(false), 1600);
        }}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="text-muted">Job Name</span>
            <input className="h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="Sync Users" />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-muted">HTTP Method</span>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as "GET" | "POST")}
              className="h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </label>
        </div>

        <label className="space-y-2 text-sm block">
          <span className="text-muted">Endpoint URL</span>
          <input className="h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="https://api.crono.dev/sync/users" />
        </label>

        <label className="space-y-2 text-sm block">
          <span className="text-muted">Cron Expression</span>
          <input
            value={cronPreset}
            onChange={(event) => setCronPreset(event.target.value)}
            className="h-10 w-full rounded-xl border border-border bg-card-secondary px-3 font-mono text-foreground outline-none focus:ring-2 focus:ring-blue-500/30"
            placeholder="*/5 * * * *"
          />
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { label: "Every 5 min", value: "*/5 * * * *" },
              { label: "Hourly", value: "0 * * * *" },
              { label: "Daily", value: "0 0 * * *" }
            ].map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setCronPreset(preset.value)}
                className={`focus-ring rounded-lg border px-2 py-1 text-xs transition-colors ${
                  cronPreset === preset.value
                    ? "border-blue-500/40 bg-blue-500/10 text-blue-500"
                    : "border-border bg-card text-muted hover:bg-hover hover:text-foreground"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </label>

        <label className="space-y-2 text-sm block">
          <span className="text-muted">Headers (optional)</span>
          <textarea className="min-h-[100px] w-full rounded-xl border border-border bg-card-secondary px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-blue-500/30" placeholder='{"Authorization":"Bearer ..."}' />
        </label>

        <label className="space-y-2 text-sm block">
          <span className="text-muted">Body (optional)</span>
          <textarea className="min-h-[120px] w-full rounded-xl border border-border bg-card-secondary px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-blue-500/30" placeholder='{"source":"dashboard"}' />
        </label>

        <div className="flex items-center gap-3">
          <Button className="h-10 px-5" type="submit">Create Job</Button>
          {created ? <span className="text-sm text-emerald-500">Mock job created</span> : null}
        </div>
      </form>
    </Card>
  );
}
