"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { JobTable } from "@/components/dashboard/JobTable";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Job, fakeApiKey, jobs, stats } from "@/components/dashboard/mock-data";

export default function DashboardPage() {
  const [jobRows, setJobRows] = useState<Job[]>(jobs);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "paused">("all");
  const [search, setSearch] = useState("");
  const [apiKey, setApiKey] = useState(fakeApiKey);
  const [copied, setCopied] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobRows.filter((job) => {
      const matchesFilter = statusFilter === "all" ? true : job.status === statusFilter;
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
          : job
      )
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
    setApiKey(`crn_live_51NCR0N0_dashboard_mock_${suffix}`);
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
        <StatCard label="Total Jobs" value={stats.totalJobs} />
        <StatCard label="Active Jobs" value={stats.activeJobs} />
        <StatCard label="Failed Jobs" value={stats.failedJobs} />
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
              className={`focus-ring rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === filter
                  ? "border-blue-500/40 bg-blue-500/10 text-blue-500"
                  : "border-border bg-card text-muted hover:bg-hover hover:text-foreground"
              }`}
            >
              {filter[0].toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        <JobTable jobs={filteredJobs} onPause={handlePause} onDelete={handleDelete} />
      </div>

      <Card id="api-key" className="mt-6 rounded-2xl border-border/80 bg-card p-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">API Key</h2>
        <p className="mt-1 text-sm text-muted">Use this key for API-based job creation and automation.</p>
        <div className="mt-4 rounded-xl border border-border bg-card-secondary px-3 py-2 font-mono text-sm text-foreground">
          {apiKey}
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" className="h-9 px-4" onClick={handleCopyApiKey}>
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button className="h-9 px-4" onClick={handleRegenerateApiKey}>Regenerate</Button>
        </div>
      </Card>
    </section>
  );
}
