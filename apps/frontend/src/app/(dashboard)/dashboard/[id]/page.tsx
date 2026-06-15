"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Header } from "@/shared/components/dashboard/header";
import { LogTable } from "@/shared/components/dashboard/log-table";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { fetchJob, updateJob } from "@/shared/lib/jobs-api";
import { fetchJobLogs } from "@/shared/lib/logs-api";
import { ApiRequestError } from "@/shared/lib/api";
import type { ApiJob } from "@/shared/types/job";
import { type LogEntry, toLogEntry } from "@/shared/types/log";

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [job, setJob] = useState<ApiJob | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logFilter, setLogFilter] = useState<
    "all" | "success" | "failed" | "retrying"
  >("all");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [{ job: row }, { logs: rows }] = await Promise.all([
          fetchJob(id),
          fetchJobLogs(id),
        ]);
        if (!cancelled) {
          setJob(row);
          setLogs(rows.map(toLogEntry));
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof ApiRequestError && err.status === 404) {
            setNotFoundState(true);
          } else {
            setError(
              err instanceof ApiRequestError
                ? err.message
                : "Failed to load job",
            );
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const filteredLogs = useMemo(
    () =>
      logFilter === "all"
        ? logs
        : logs.filter((log) => log.status === logFilter),
    [logFilter, logs],
  );

  if (notFoundState) {
    notFound();
  }

  if (loading) {
    return <p className="text-sm text-muted">Loading job…</p>;
  }

  if (!job) {
    return error ? (
      <p className="text-sm text-error">{error}</p>
    ) : null;
  }

  const status = job.status === "paused" ? "paused" : "active";

  async function toggleStatus() {
    setUpdating(true);
    setError(null);
    try {
      const { job: updated } = await updateJob(id, {
        status: status === "active" ? "paused" : "active",
      });
      setJob(updated);
    } catch (err) {
      setError(
        err instanceof ApiRequestError ? err.message : "Failed to update job",
      );
    } finally {
      setUpdating(false);
    }
  }

  return (
    <section>
      <Header
        title={job.name}
        description="Review schedule configuration and inspect recent execution logs."
      />

      {error ? <p className="mb-4 text-sm text-error">{error}</p> : null}

      <Card className="rounded-2xl border-border/80 bg-card p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">
              Endpoint URL
            </p>
            <p className="mt-1 text-sm text-foreground">{job.url}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">
              Cron Schedule
            </p>
            <p className="mt-1 font-mono text-sm text-foreground">
              {job.schedule}
            </p>
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
              disabled={updating}
              onClick={toggleStatus}
            >
              {updating
                ? "Updating…"
                : status === "active"
                  ? "Active"
                  : "Paused"}
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Logs
          </h2>
          <div className="flex flex-wrap gap-2">
            {(["all", "success", "failed", "retrying"] as const).map(
              (filter) => (
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
              ),
            )}
          </div>
        </div>
        <LogTable logs={filteredLogs} />
      </div>
    </section>
  );
}
