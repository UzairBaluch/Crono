import { apiFetch } from "@/shared/lib/api";
import type { ApiLog } from "@/shared/types/log";

export function fetchJobLogs(jobId: string) {
  return apiFetch<{ logs: ApiLog[] }>(`/jobs/${jobId}/logs`, { auth: true });
}
