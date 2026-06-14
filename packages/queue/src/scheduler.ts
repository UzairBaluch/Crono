import { cronJobsQueue } from "./cron-jobs-queue.js";

export type ScheduleJobPayload = {
  jobId: string;
};

export type ScheduleJobResult = {
  bullJobId: string;
};

export type ScheduleRepeatInput = ScheduleJobPayload & {
  schedule: string;
  timezone: string;
};

export async function scheduleRepeatJob(
  input: ScheduleRepeatInput,
): Promise<ScheduleJobResult> {
  const { jobId, schedule, timezone } = input;
  const repeatJobId = `repeat-${jobId}`;

  await cronJobsQueue.add(
    "execute-job",
    { jobId },
    {
      repeat: { pattern: schedule, tz: timezone },
      jobId: repeatJobId,
    },
  );

  return { bullJobId: repeatJobId };
}

export async function pauseRepeatJob(bullJobId: string): Promise<void> {
  await cronJobsQueue.removeJobScheduler(bullJobId);
}

export async function removeRepeatJob(
  bullJobId: string | null,
): Promise<void> {
  if (!bullJobId) {
    return;
  }
  await cronJobsQueue.removeJobScheduler(bullJobId);
}

export async function resumeRepeatJob(
  input: ScheduleRepeatInput,
): Promise<ScheduleJobResult> {
  return scheduleRepeatJob(input);
}
