import { ApiError } from "../utils/ApiError.js";
import { jobRepository } from "../repositories/job.repository.js";
import { logRepository } from "../repositories/log.repository.js";

export const logService = {
  listByJobId: async (userId: string, jobId: string) => {
    const job = await jobRepository.findByIdAndUserId(jobId, userId);
    if (!job) throw new ApiError("Job not found", 404);
    return logRepository.findManyByJobIdAndUserId(jobId, userId);
  },
};
