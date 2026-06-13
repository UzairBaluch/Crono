export type JobStatus = "active" | "paused";
export type RunStatus = "success" | "failed" | "retrying";

export interface Job {
  id: string;
  name: string;
  url: string;
  method: "GET" | "POST";
  schedule: string;
  status: JobStatus;
  lastRun: RunStatus;
  lastRunAt: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  status: RunStatus;
  httpStatusCode: number;
  durationMs: number;
  message: string;
}

export const jobs: Job[] = [
  {
    id: "sync-users",
    name: "Sync Users",
    url: "https://api.crono.dev/sync/users",
    method: "POST",
    schedule: "*/5 * * * *",
    status: "active",
    lastRun: "success",
    lastRunAt: "2 min ago"
  },
  {
    id: "billing-reconcile",
    name: "Billing Reconcile",
    url: "https://api.crono.dev/billing/reconcile",
    method: "POST",
    schedule: "0 * * * *",
    status: "active",
    lastRun: "success",
    lastRunAt: "18 min ago"
  },
  {
    id: "cleanup-temp-files",
    name: "Cleanup Temp Files",
    url: "https://api.crono.dev/maintenance/cleanup",
    method: "POST",
    schedule: "0 2 * * *",
    status: "paused",
    lastRun: "failed",
    lastRunAt: "1 day ago"
  }
];

export const stats = {
  totalJobs: 12,
  activeJobs: 8,
  failedJobs: 1,
  lastRun: "2 min ago"
};

export const logsByJobId: Record<string, LogEntry[]> = {
  "sync-users": [
    {
      id: "l-1",
      timestamp: "2026-05-28 14:49:11",
      status: "success",
      httpStatusCode: 200,
      durationMs: 126,
      message: "Users synchronized successfully."
    },
    {
      id: "l-2",
      timestamp: "2026-05-28 14:44:11",
      status: "retrying",
      httpStatusCode: 502,
      durationMs: 2100,
      message: "Upstream timeout. Retry scheduled."
    },
    {
      id: "l-3",
      timestamp: "2026-05-28 14:39:11",
      status: "failed",
      httpStatusCode: 500,
      durationMs: 3000,
      message: "Unexpected server error from endpoint."
    }
  ],
  "billing-reconcile": [
    {
      id: "l-4",
      timestamp: "2026-05-28 14:00:00",
      status: "success",
      httpStatusCode: 200,
      durationMs: 221,
      message: "Billing ledger reconciled."
    }
  ],
  "cleanup-temp-files": [
    {
      id: "l-5",
      timestamp: "2026-05-27 02:00:00",
      status: "failed",
      httpStatusCode: 503,
      durationMs: 5000,
      message: "Maintenance endpoint unavailable."
    }
  ]
};

export const fakeApiKey = "cron_live_mock_dashboard_8f9c2a1d";
