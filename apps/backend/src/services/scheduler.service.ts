import type { Job } from "@prisma/client";
import {
  pauseRepeatJob,
  removeRepeatJob,
  resumeRepeatJob,
  scheduleRepeatJob,
} from "@crono/queue";
import type { UpdateJobInput } from "../validations/job.validation.js";

export const schedulerService = {
  async syncOnCreate(job: Job): Promise<string> {
    const { id, schedule, timezone } = job;
    const result = await scheduleRepeatJob({ jobId: id, schedule, timezone });
    return result.bullJobId;
  },

  async syncOnUpdate(
    existing: Job,
    input: UpdateJobInput,
  ): Promise<string | null> {
    const schedule = input.schedule ?? existing.schedule;
    const timezone = input.timezone ?? existing.timezone;

    if (input.status === "paused") {
      if (existing.bull_job_id) {
        await pauseRepeatJob(existing.bull_job_id);
      }
      return null;
    }

    if (existing.status === "paused" && input.status === "active") {
      const result = await resumeRepeatJob({
        jobId: existing.id,
        schedule,
        timezone,
      });
      return result.bullJobId;
    }

    const scheduleChanged =
      input.schedule !== undefined && input.schedule !== existing.schedule;
    const timezoneChanged =
      input.timezone !== undefined && input.timezone !== existing.timezone;

    if (existing.status === "active" && (scheduleChanged || timezoneChanged)) {
      if (existing.bull_job_id) {
        await pauseRepeatJob(existing.bull_job_id);
      }
      const result = await scheduleRepeatJob({
        jobId: existing.id,
        schedule,
        timezone,
      });
      return result.bullJobId;
    }

    return null;
  },

  async syncOnDelete(job: Job): Promise<void> {
    await removeRepeatJob(job.bull_job_id);
  },
};
