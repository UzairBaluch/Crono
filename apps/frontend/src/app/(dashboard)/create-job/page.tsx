import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

export default function CreateJobPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Create Job</h2>
      <p className="text-sm text-muted">Complete setup in under 60 seconds with simple defaults.</p>

      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm text-muted">Job Name</span>
            <input className="focus-ring h-11 w-full rounded-xl border border-border bg-card-secondary px-3" placeholder="billing-sync" />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-muted">HTTP Method</span>
            <select className="focus-ring h-11 w-full rounded-xl border border-border bg-card-secondary px-3">
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </label>
        </div>

        <label className="space-y-1">
          <span className="text-sm text-muted">URL Endpoint</span>
          <input className="focus-ring h-11 w-full rounded-xl border border-border bg-card-secondary px-3 font-mono text-sm" placeholder="https://api.example.com/sync" />
        </label>

        <label className="space-y-1">
          <span className="text-sm text-muted">Cron Expression</span>
          <input className="focus-ring h-11 w-full rounded-xl border border-border bg-card-secondary px-3 font-mono text-sm" placeholder="0 * * * *" />
          <p className="text-xs text-muted">Next run: in 54 minutes</p>
        </label>

        <details className="rounded-xl border border-border bg-card-secondary p-3">
          <summary className="cursor-pointer text-sm">Optional Settings</summary>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input className="focus-ring h-10 rounded-xl border border-border bg-card px-3 text-sm" placeholder="Retries (e.g. 3)" />
            <input className="focus-ring h-10 rounded-xl border border-border bg-card px-3 text-sm" placeholder="Timeout ms (e.g. 5000)" />
          </div>
        </details>

        <Button>Create Job</Button>
      </Card>
    </section>
  );
}
