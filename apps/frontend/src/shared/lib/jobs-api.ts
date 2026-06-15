import { apiFetch } from "@/shared/lib/api";
import type { ApiJob } from "@/shared/types/job";

export type CreateJobInput = {
  name: string;
  url: string;
  schedule: string;
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: string;
  timezone?: string;
  retry_count?: number;
};

export type UpdateJobInput = Partial<CreateJobInput> & {
  status?: "active" | "paused";
};

export function fetchJobs() {
  return apiFetch<{ jobs: ApiJob[] }>("/jobs", { auth: true });
}

export function fetchJob(id: string) {
  return apiFetch<{ job: ApiJob }>(`/jobs/${id}`, { auth: true });
}

export function createJob(input: CreateJobInput) {
  return apiFetch<{ job: ApiJob }>("/jobs", {
    method: "POST",
    auth: true,
    body: JSON.stringify(input),
  });
}

export function updateJob(id: string, input: UpdateJobInput) {
  return apiFetch<{ job: ApiJob }>(`/jobs/${id}`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify(input),
  });
}

export function deleteJob(id: string) {
  return apiFetch<{ deleted: boolean }>(`/jobs/${id}`, {
    method: "DELETE",
    auth: true,
  });
}
