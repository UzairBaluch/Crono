"use client";

import { Header } from "@/shared/components/dashboard/header";
import { JobTable } from "@/shared/components/dashboard/job-table";
import { jobs } from "@/shared/components/dashboard/mock-data";

export default function JobsPage() {
  return (
    <section>
      <Header
        title="Jobs"
        description="Manage scheduled HTTP jobs with status visibility and quick actions."
        showCreateButton
      />
      <JobTable jobs={jobs} readOnly />
    </section>
  );
}
