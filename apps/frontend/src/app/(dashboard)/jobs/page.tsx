"use client";

import { Header } from "@/shared/components/dashboard/header";
import { JobTable } from "@/shared/components/dashboard/job-table";
import { useJobs } from "@/shared/hooks/use-jobs";

export default function JobsPage() {
  const { jobs, loading, error } = useJobs();

  return (
    <section>
      <Header
        title="Jobs"
        description="Manage scheduled HTTP jobs with status visibility and quick actions."
        showCreateButton
      />
      {error ? <p className="mb-4 text-sm text-error">{error}</p> : null}
      {loading ? (
        <p className="text-sm text-muted">Loading jobs…</p>
      ) : (
        <JobTable jobs={jobs} readOnly />
      )}
    </section>
  );
}
