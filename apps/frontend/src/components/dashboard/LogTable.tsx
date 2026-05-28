import { Card } from "@/shared/ui/card";
import { LogEntry } from "@/components/dashboard/mock-data";

function StatusDot({ status }: { status: LogEntry["status"] }) {
  const color = status === "success" ? "bg-green-500" : status === "failed" ? "bg-red-500" : "bg-amber-500";
  return <span className={`inline-block h-2 w-2 rounded-full ${color}`} />;
}

export function LogTable({ logs }: { logs: LogEntry[] }) {
  if (!logs.length) {
    return (
      <Card className="rounded-2xl border-border/80 bg-card p-8 text-center">
        <p className="text-base font-medium text-foreground">No execution logs yet</p>
        <p className="mt-2 text-sm text-muted">Logs will appear here when this job runs.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-x-auto rounded-2xl border-border/80 bg-card p-0">
      <table className="min-w-[860px] w-full text-left text-sm">
        <thead className="bg-card-secondary/60">
          <tr className="border-b border-border/80 text-muted">
            <th className="px-4 py-3 font-medium">Timestamp</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">HTTP Status Code</th>
            <th className="px-4 py-3 font-medium">Duration (ms)</th>
            <th className="px-4 py-3 font-medium">Message / Error</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b border-border/60 hover:bg-hover/50">
              <td className="px-4 py-3 font-mono text-xs text-foreground">{log.timestamp}</td>
              <td className="px-4 py-3 capitalize text-foreground">
                <span className="inline-flex items-center gap-2">
                  <StatusDot status={log.status} />
                  {log.status}
                </span>
              </td>
              <td className="px-4 py-3 text-foreground">{log.httpStatusCode}</td>
              <td className="px-4 py-3 text-foreground">{log.durationMs}</td>
              <td className="px-4 py-3 text-muted">{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
