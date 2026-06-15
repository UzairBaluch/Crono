"use client";

import { useEffect, useState } from "react";
import { Header } from "@/shared/components/dashboard/header";
import { LogTable } from "@/shared/components/dashboard/log-table";
import { fetchJobs } from "@/shared/lib/jobs-api";
import { fetchJobLogs } from "@/shared/lib/logs-api";
import { ApiRequestError } from "@/shared/lib/api";
import { type LogEntry, type ApiLog, toLogEntry } from "@/shared/types/log";

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const { jobs } = await fetchJobs();
        const results = await Promise.all(
          jobs.map((job) =>
            fetchJobLogs(job.id).catch(() => ({ logs: [] as ApiLog[] })),
          ),
        );
        const merged = results
          .flatMap((r) => r.logs)
          .sort(
            (a, b) =>
              new Date(b.fired_at).getTime() - new Date(a.fired_at).getTime(),
          )
          .map(toLogEntry);
        if (!cancelled) setLogs(merged);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiRequestError
              ? err.message
              : "Failed to load logs",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <Header
        title="Logs"
        description="Inspect execution details and response behavior for every run."
      />
      {error ? <p className="mb-4 text-sm text-error">{error}</p> : null}
      {loading ? (
        <p className="text-sm text-muted">Loading logs…</p>
      ) : (
        <LogTable logs={logs} />
      )}
    </section>
  );
}
