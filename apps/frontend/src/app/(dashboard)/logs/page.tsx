import { Header } from "@/shared/components/dashboard/header";
import { LogTable } from "@/shared/components/dashboard/log-table";
import { Card } from "@/shared/ui/card";

export default function LogsPage() {
  return (
    <section>
      <Header
        title="Logs"
        description="Inspect execution details and response behavior for every run."
      />
      <LogTable logs={[]} />
      <Card className="mt-4 rounded-2xl border-border/80 bg-card p-4">
        <p className="text-sm text-muted">
          The worker writes logs to Postgres after each run. A read API is not
          wired yet — use Prisma Studio or Postman once{" "}
          <code className="text-foreground">GET /jobs/:id/logs</code> exists.
        </p>
      </Card>
    </section>
  );
}
