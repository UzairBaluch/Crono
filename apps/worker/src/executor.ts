import { JOB_STATUS } from "@crono/shared";
import { workerJobRepository } from "./repositories/job.repository.js";
import { workerLogRepository } from "./repositories/log.repository.js";

const MAX_RESPONSE_BODY_CHARS = 10_000;

export async function executeJob(jobId: string): Promise<void> {
  const job = await workerJobRepository.findById(jobId);
  if (!job || job.status !== JOB_STATUS.ACTIVE) {
    return;
  }

  const startedAt = Date.now();

  try {
    const response = await fetch(job.url, {
      method: job.method,
      headers: job.headers as Record<string, string>,
      body: job.method === "POST" ? (job.body ?? undefined) : undefined,
    });
    const responseBody = await response.text();
    const durationMs = Date.now() - startedAt;

    await workerLogRepository.insert({
      job_id: job.id,
      user_id: job.user_id,
      status: "success",
      http_status: response.status,
      duration_ms: durationMs,
      response_body: responseBody.slice(0, MAX_RESPONSE_BODY_CHARS),
    });
  } catch (err) {
    await workerLogRepository.insert({
      job_id: job.id,
      user_id: job.user_id,
      status: "failed",
      error_message: err instanceof Error ? err.message : String(err),
      duration_ms: Date.now() - startedAt,
    });
  }
}
