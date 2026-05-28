import { JobsTable } from "@/shared/components/dashboard/jobs-table";

export default function JobsPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Jobs</h2>
      <p className="text-sm text-muted">Manage scheduled HTTP jobs with status visibility and quick actions.</p>
      <JobsTable />
    </section>
  );
}
