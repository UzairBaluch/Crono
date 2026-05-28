"use client";

import { useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Header } from "@/components/dashboard/Header";
import { LogTable } from "@/components/dashboard/LogTable";
import { Card } from "@/shared/ui/card";
import { jobs, logsByJobId } from "@/components/dashboard/mock-data";
import { Button } from "@/shared/ui/button";

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const job = jobs.find((item) => item.id === id);
  const [status, setStatus] = useState<"active" | "paused">(job?.status ?? "active");
  const [logFilter, setLogFilter] = useState<"all" | "success" | "failed" | "retrying">("all");

  if (!job) {
    notFound();
  }

  const logs = logsByJobId[id] ?? [];
  const filteredLogs = useMemo(
    () => (logFilter === "all" ? logs : logs.filter((log) => log.status === logFilter)),
    [logFilter, logs]
  );

  return (
    <section>
      <Header
        title={job.name}
        description="Review schedule configuration and inspect recent execution logs."
      />

      <Card className="rounded-2xl border-border/80 bg-card p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Endpoint URL</p>
            <p className="mt-1 text-sm text-foreground">{job.url}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Cron Schedule</p>
            <p className="mt-1 font-mono text-sm text-foreground">{job.schedule}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Method</p>
            <p className="mt-1 text-sm text-foreground">{job.method}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Status</p>
            <Button
              variant="secondary"
              className="mt-1 h-8 px-3 text-xs"
              onClick={() => setStatus((current) => (current === "active" ? "paused" : "active"))}
            >
              {status === "active" ? "Active" : "Paused"}
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Logs</h2>
          <div className="flex flex-wrap gap-2">
            {(["all", "success", "failed", "retrying"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setLogFilter(filter)}
                className={`focus-ring rounded-lg border px-2.5 py-1 text-xs transition-colors ${
                  logFilter === filter
                    ? "border-blue-500/40 bg-blue-500/10 text-blue-500"
                    : "border-border bg-card text-muted hover:bg-hover hover:text-foreground"
                }`}
              >
                {filter[0].toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <LogTable logs={filteredLogs} />
      </div>
    </section>
  );
}
