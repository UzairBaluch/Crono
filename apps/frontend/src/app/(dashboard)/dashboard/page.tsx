"use client";

import { useMemo, useState } from "react";
import { Header } from "@/shared/components/dashboard/header";
import { JobTable } from "@/shared/components/dashboard/job-table";
import { StatCard } from "@/shared/components/dashboard/stat-card";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import {
  type Job,
  fakeApiKey,
  jobs,
  stats,
} from "@/shared/components/dashboard/mock-data";

export default function DashboardPage() {
  const [jobRows, setJobRows] = useState<Job[]>(jobs);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "paused">(
    "all",
  );
  const [search, setSearch] = useState("");
  const [apiKey, setApiKey] = useState(fakeApiKey);
  const [copied, setCopied] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobRows.filter((job) => {
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
  }, [jobRows, search, statusFilter]);

  function handlePause(id: string) {
    setJobRows((current) =>
      current.map((job) =>
        job.id === id
          ? { ...job, status: job.status === "active" ? "paused" : "active" }
          : job,
      ),
    );
  }

  function handleDelete(id: string) {
    setJobRows((current) => current.filter((job) => job.id !== id));
  }

  async function handleCopyApiKey() {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  function handleRegenerateApiKey() {
    const suffix = Math.random().toString(16).slice(2, 10);
    setApiKey(`cron_live_mock_${suffix}`);
    setCopied(false);
  }

  return (
    <section>
      <Header
        title="Dashboard"
        description="Monitor scheduled jobs, inspect status, and manage execution health."
        showCreateButton
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Jobs" value={stats.totalJobs} tone="accent" />
        <StatCard label="Active Jobs" value={stats.activeJobs} tone="success" />
        <StatCard label="Failed Jobs" value={stats.failedJobs} tone="error" />
        <StatCard label="Last Run" value={stats.lastRun} />
      </div>

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
                statusFilter === filter
                  ? "chip-active"
                  : "chip-inactive"
              }`}
            >
              {filter[0].toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        <JobTable
          jobs={filteredJobs}
          onPause={handlePause}
          onDelete={handleDelete}
        />
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
        <div className="mt-4 rounded-xl border border-accent-muted/20 bg-accent-subtle/30 px-3 py-2 font-mono text-sm text-foreground">
          {apiKey}
        </div>
        {copied ? (
          <p className="mt-2 text-xs text-success animate-fade-tab">
            Copied to clipboard
          </p>
        ) : null}
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" className="h-9 px-4" onClick={handleCopyApiKey}>
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button className="h-9 px-4" onClick={handleRegenerateApiKey}>
            Regenerate
          </Button>
        </div>
      </Card>
    </section>
  );
}
