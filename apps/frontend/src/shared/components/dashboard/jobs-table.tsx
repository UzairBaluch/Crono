import { MoreHorizontal } from "lucide-react";
import { StatusBadge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";

const rows = [
  { job: "billing-sync", method: "POST", schedule: "0 * * * *", lastRun: "2m ago", status: "Success", nextRun: "58m" },
  { job: "user-prune", method: "DELETE", schedule: "*/15 * * * *", lastRun: "7m ago", status: "Failed", nextRun: "8m" },
  { job: "health-check", method: "GET", schedule: "*/5 * * * *", lastRun: "just now", status: "Running", nextRun: "4m" },
  { job: "weekly-report", method: "POST", schedule: "0 9 * * 1", lastRun: "1d ago", status: "Paused", nextRun: "Paused" }
] as const;

export function JobsTable() {
  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead className="sticky top-0 bg-card">
          <tr className="border-b border-border text-muted">
            {[
              "Job",
              "Method",
              "Schedule",
              "Last Run",
              "Status",
              "Next Run",
              "Actions"
            ].map((column) => (
              <th key={column} className="px-4 py-3 font-medium">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.job} className="group border-b border-border/60 hover:bg-hover/40">
              <td className="px-4 py-3">{row.job}</td>
              <td className="px-4 py-3 font-mono text-xs">{row.method}</td>
              <td className="px-4 py-3 font-mono text-xs">{row.schedule}</td>
              <td className="px-4 py-3 text-muted">{row.lastRun}</td>
              <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
              <td className="px-4 py-3 text-muted">{row.nextRun}</td>
              <td className="px-4 py-3">
                <button aria-label="Row actions" className="focus-ring rounded-lg p-1.5 opacity-0 transition hover:bg-card-secondary group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
