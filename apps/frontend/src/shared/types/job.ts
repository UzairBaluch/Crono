export type JobStatus = "active" | "paused";

export type ApiJob = {
  id: string;
  user_id: string;
  name: string;
  url: string;
  method: string;
  headers: Record<string, string> | object;
  body: string | null;
  schedule: string;
  timezone: string;
  status: string;
  retry_count: number;
  bull_job_id: string | null;
  created_at: string;
  updated_at: string;
};

export type JobRow = {
  id: string;
  name: string;
  url: string;
  method: "GET" | "POST";
  schedule: string;
  status: JobStatus;
};

export function toJobRow(job: ApiJob): JobRow {
  return {
    id: job.id,
    name: job.name,
    url: job.url,
    method: job.method === "POST" ? "POST" : "GET",
    schedule: job.schedule,
    status: job.status === "paused" ? "paused" : "active",
  };
}
