import { Header } from "@/shared/components/dashboard/header";
import { LogTable } from "@/shared/components/dashboard/log-table";
import { logsByJobId } from "@/shared/components/dashboard/mock-data";
import { Card } from "@/shared/ui/card";

const allLogs = Object.values(logsByJobId).flat();

export default function LogsPage() {
  return (
    <section>
      <Header
        title="Logs"
        description="Inspect execution details and response behavior for every run."
      />
      <LogTable logs={allLogs} />
      <Card className="mt-4 rounded-2xl border-border/80 bg-card p-4">
        <p className="mb-2 text-sm font-medium text-foreground">
          Sample log detail
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-background/70 p-3 font-mono text-xs text-muted">
          {`request: POST /sync\nstatus: 504 timeout\nretry: 1/3\nresponse: gateway timeout`}
        </pre>
      </Card>
    </section>
  );
}
