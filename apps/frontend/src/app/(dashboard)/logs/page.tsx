import { LogsTable } from "@/shared/components/dashboard/logs-table";
import { Card } from "@/shared/ui/card";

export default function LogsPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Logs</h2>
      <p className="text-sm text-muted">Inspect execution details and response behavior for every run.</p>
      <LogsTable />
      <Card>
        <p className="mb-2 text-sm font-medium">Log Details</p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-black/30 p-3 font-mono text-xs text-muted">
{`request: POST /sync\nstatus: 504 timeout\nretry: 1/3\nresponse: gateway timeout`}
        </pre>
      </Card>
    </section>
  );
}
