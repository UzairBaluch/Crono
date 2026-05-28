import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Job } from "@/components/dashboard/mock-data";

function JobPill({ value, tone }: { value: string; tone: "green" | "zinc" | "red" | "amber" }) {
  const toneClass = {
    green: "bg-green-500/10 text-green-500 border-green-500/20",
    zinc: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
    red: "bg-red-500/10 text-red-500 border-red-500/20",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/20"
  };

  return <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${toneClass[tone]}`}>{value}</span>;
}

interface JobTableProps {
  jobs: Job[];
  onPause: (id: string) => void;
  onDelete: (id: string) => void;
}

export function JobTable({ jobs, onPause, onDelete }: JobTableProps) {
  if (!jobs.length) {
    return (
      <Card className="rounded-2xl border-border/80 bg-card p-8 text-center">
        <p className="text-base font-medium text-foreground">No jobs yet</p>
        <p className="mt-2 text-sm text-muted">Create your first scheduled HTTP job to get started.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-x-auto rounded-2xl border-border/80 bg-card p-0">
      <table className="min-w-[980px] w-full text-left text-sm">
        <thead className="bg-card-secondary/60">
          <tr className="border-b border-border/80 text-muted">
            <th className="px-4 py-3 font-medium">Job Name</th>
            <th className="px-4 py-3 font-medium">Endpoint URL</th>
            <th className="px-4 py-3 font-medium">Cron Schedule</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Last Run Result</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-b border-border/60 hover:bg-hover/50">
              <td className="px-4 py-3 font-medium text-foreground">{job.name}</td>
              <td className="px-4 py-3 text-muted">{job.url}</td>
              <td className="px-4 py-3 font-mono text-xs text-foreground">{job.schedule}</td>
              <td className="px-4 py-3">
                <JobPill value={job.status === "active" ? "Active" : "Paused"} tone={job.status === "active" ? "green" : "zinc"} />
              </td>
              <td className="px-4 py-3">
                <JobPill
                  value={job.lastRun === "success" ? "Success" : job.lastRun === "failed" ? "Failed" : "Retrying"}
                  tone={job.lastRun === "success" ? "green" : job.lastRun === "failed" ? "red" : "amber"}
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/${job.id}`}
                    className="focus-ring inline-flex h-8 items-center rounded-xl border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-hover"
                  >
                    View
                  </Link>
                  <Button
                    variant="secondary"
                    className="h-8 px-3 text-xs"
                    onClick={() => onPause(job.id)}
                  >
                    {job.status === "active" ? "Pause" : "Resume"}
                  </Button>
                  <Button
                    variant="danger"
                    className="h-8 px-3 text-xs"
                    onClick={() => onDelete(job.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
