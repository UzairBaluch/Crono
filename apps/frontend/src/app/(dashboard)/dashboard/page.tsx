"use client";

import { useMemo, useState } from "react";
import { Header } from "@/shared/components/dashboard/header";
import { JobTable } from "@/shared/components/dashboard/job-table";
import { StatCard } from "@/shared/components/dashboard/stat-card";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { useAuth } from "@/shared/components/auth/auth-provider";
import { useJobs } from "@/shared/hooks/use-jobs";
import { deleteJob, updateJob } from "@/shared/lib/jobs-api";
import { ApiRequestError } from "@/shared/lib/api";

export default function DashboardPage() {
  const { user } = useAuth();
  const { jobs, loading, error, reload } = useJobs();
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "paused">(
    "all",
  );
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesFilter =
        statusFilter === "all" ? true : job.status === statusFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        job.name.toLowerCase().includes(q) ||
        job.url.toLowerCase().includes(q) ||
        job.schedule.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [jobs, search, statusFilter]);

  const activeCount = jobs.filter((j) => j.status === "active").length;

  async function handlePause(id: string) {
    const job = jobs.find((j) => j.id === id);
    if (!job) return;
    setActionError(null);
    try {
      await updateJob(id, {
        status: job.status === "active" ? "paused" : "active",
      });
      await reload();
    } catch (err) {
      setActionError(
        err instanceof ApiRequestError ? err.message : "Failed to update job",
      );
    }
  }

  async function handleDelete(id: string) {
    setActionError(null);
    try {
      await deleteJob(id);
      await reload();
    } catch (err) {
      setActionError(
        err instanceof ApiRequestError ? err.message : "Failed to delete job",
      );
    }
  }

  async function handleCopyApiKey() {
    if (!user?.api_key) return;
    await navigator.clipboard.writeText(user.api_key);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <section>
      <Header
        title="Dashboard"
        description="Monitor scheduled jobs, inspect status, and manage execution health."
        showCreateButton
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Jobs" value={loading ? "…" : jobs.length} tone="accent" />
        <StatCard label="Active Jobs" value={loading ? "…" : activeCount} tone="success" />
        <StatCard label="Failed Jobs" value="—" tone="error" />
        <StatCard label="Last Run" value="—" />
      </div>

      {error ? (
        <p className="mt-4 text-sm text-error">{error}</p>
      ) : null}
      {actionError ? (
        <p className="mt-4 text-sm text-error">{actionError}</p>
      ) : null}

      <div className="mt-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="h-9 min-w-56 rounded-xl border border-border bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-blue-500/30"
          />
          {(["all", "active", "paused"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={`focus-ring rounded-xl border px-3 py-1.5 text-xs font-medium transition-all hover:scale-[1.02] ${
                statusFilter === filter ? "chip-active" : "chip-inactive"
              }`}
            >
              {filter[0].toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        {loading ? (
          <p className="text-sm text-muted">Loading jobs…</p>
        ) : (
          <JobTable
            jobs={filteredJobs}
            onPause={handlePause}
            onDelete={handleDelete}
          />
        )}
      </div>

      <Card
        id="api-key"
        className="panel-glow mt-6 rounded-2xl border-border/80 bg-card p-6 transition-colors hover:border-accent-muted/30"
      >
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Key
        </h2>
        <p className="mt-1 text-sm text-muted">
          Use this key for API-based job creation and automation.
        </p>
        <div className="mt-4 rounded-xl border border-accent-muted/20 bg-accent-subtle/30 px-3 py-2 font-mono text-sm text-foreground break-all">
          {user?.api_key ?? "—"}
        </div>
        {copied ? (
          <p className="mt-2 text-xs text-success animate-fade-tab">
            Copied to clipboard
          </p>
        ) : null}
        <div className="mt-4 flex gap-2">
          <Button
            variant="secondary"
            className="h-9 px-4"
            onClick={handleCopyApiKey}
            disabled={!user?.api_key}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </Card>
    </section>
  );
}
