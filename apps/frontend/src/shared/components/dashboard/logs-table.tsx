import { Card } from "@/shared/ui/card";
import { StatusBadge } from "@/shared/ui/badge";

const logs = [
  { ts: "2026-05-28 14:08:52", job: "billing-sync", status: "Success", duration: "86ms", response: "200 OK" },
  { ts: "2026-05-28 14:05:12", job: "user-prune", status: "Failed", duration: "5000ms", response: "504 Timeout" },
  { ts: "2026-05-28 14:05:15", job: "user-prune", status: "Success", duration: "302ms", response: "200 OK" }
] as const;

export function LogsTable() {
  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted">
            {[
              "Timestamp",
              "Job",
              "Status",
              "Duration",
              "Response"
            ].map((column) => (
              <th key={column} className="px-4 py-3 font-medium">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map((row) => (
            <tr key={row.ts + row.job} className="cursor-pointer border-b border-border/60 hover:bg-hover/40">
              <td className="px-4 py-3 font-mono text-xs text-muted">{row.ts}</td>
              <td className="px-4 py-3">{row.job}</td>
              <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
              <td className="px-4 py-3 font-mono text-xs">{row.duration}</td>
              <td className="px-4 py-3 text-muted">{row.response}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
