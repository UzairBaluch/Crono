import { AlertCircle, CheckCircle2, Clock3, Workflow } from "lucide-react";
import { Card } from "@/shared/ui/card";

const stats = [
  { label: "Total Jobs", value: "24", icon: Workflow },
  { label: "Successful Runs", value: "1,283", icon: CheckCircle2 },
  { label: "Failed Runs", value: "19", icon: AlertCircle },
  { label: "Avg Response", value: "162ms", icon: Clock3 }
];

const activity = [
  { time: "2m ago", text: "billing-sync completed", duration: "92ms", type: "success" },
  { time: "7m ago", text: "user-prune failed", duration: "timeout", type: "failed" },
  { time: "8m ago", text: "user-prune retry succeeded", duration: "302ms", type: "retry" },
  { time: "11m ago", text: "daily-report paused", duration: "-", type: "paused" }
];

export function DashboardContent() {
  return (
    <section className="space-y-6">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label} className="hover:border-white/30">
            <p className="text-sm text-muted">{item.label}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-2xl font-semibold">{item.value}</p>
              <item.icon className="h-4 w-4 text-muted" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <Card>
          <h2 className="text-sm font-medium">Recent Activity</h2>
          <div className="mt-3 space-y-2">
            {activity.map((item) => (
              <div key={item.time + item.text} className="flex items-center justify-between rounded-lg border border-border bg-card-secondary px-3 py-2 text-sm">
                <div className="min-w-0">
                  <p className="truncate">{item.text}</p>
                  <p className="text-xs text-muted">{item.time}</p>
                </div>
                <p className="font-mono text-xs text-muted">{item.duration}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-medium">Quick Actions</h2>
          <div className="mt-3 grid gap-2">
            {[
              "Create Job",
              "Import Job",
              "View Logs",
              "Configure Alerts"
            ].map((action) => (
              <button key={action} className="focus-ring rounded-lg border border-border bg-card-secondary px-3 py-2 text-left text-sm transition hover:bg-hover">
                {action}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
