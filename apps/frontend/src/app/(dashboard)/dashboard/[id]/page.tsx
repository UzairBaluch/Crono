"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Header } from "@/shared/components/dashboard/header";
import { LogTable } from "@/shared/components/dashboard/log-table";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { fetchJob, updateJob } from "@/shared/lib/jobs-api";
import { ApiRequestError } from "@/shared/lib/api";
import type { ApiJob } from "@/shared/types/job";

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [job, setJob] = useState<ApiJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const { job: row } = await fetchJob(id);
        if (!cancelled) setJob(row);
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
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-foreground">
          Logs
        </h2>
        <LogTable logs={[]} />
        <p className="mt-2 text-xs text-muted">
          Runs are saved by the worker. Log API coming soon — check Prisma Studio
          for now.
        </p>
      </div>
    </section>
  );
}
