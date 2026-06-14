import { isValidCron, PLAN_LIMITS } from "@crono/shared";
import { ApiError } from "../utils/ApiError.js";
import { jobRepository } from "../repositories/job.repository.js";
import { schedulerService } from "../services/scheduler.service.js";
import type {
  CreateJobInput,
  UpdateJobInput,
} from "../validations/job.validation.js";

export const jobService = {
  async list(userId: string) {
    return jobRepository.findManyByUserId(userId);
  },

  async getById(userId: string, jobId: string) {
    const job = await jobRepository.findByIdAndUserId(jobId, userId);
    if (!job) {
      throw new ApiError("Job not found", 404);
    }
    return job;
  },

  async create(userId: string, userPlan: string, input: CreateJobInput) {
    if (!isValidCron(input.schedule)) {
      throw new ApiError("Invalid cron schedule", 400);
    }
    const count = await jobRepository.countByUserId(userId);
    const limit =
      PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS] ?? PLAN_LIMITS.free;
    if (count >= limit) {
      throw new ApiError("Plan limit reached", 403);
    }

    const job = await jobRepository.insertJob({ ...input, user_id: userId });
    const bullJobId = await schedulerService.syncOnCreate(job);
    return jobRepository.updateByIdAndUserId(job.id, userId, {
      bull_job_id: bullJobId,
    });
  },

  async update(userId: string, jobId: string, input: UpdateJobInput) {
    if (input.schedule && !isValidCron(input.schedule)) {
      throw new ApiError("Invalid cron schedule", 400);
    }
    const existing = await jobRepository.findByIdAndUserId(jobId, userId);
    if (!existing) {
      throw new ApiError("Job not found", 404);
    }

    const newBullJobId = await schedulerService.syncOnUpdate(existing, input);
    const data: UpdateJobInput & { bull_job_id?: string } = { ...input };
    if (newBullJobId) {
      data.bull_job_id = newBullJobId;
    }

    return jobRepository.updateByIdAndUserId(jobId, userId, data);
  },

  async remove(userId: string, jobId: string) {
    const existing = await jobRepository.findByIdAndUserId(jobId, userId);
    if (!existing) {
      throw new ApiError("Job not found", 404);
    }

    await schedulerService.syncOnDelete(existing);
    await jobRepository.deleteByIdAndUserId(jobId, userId);
    return { deleted: true };
  },
};
