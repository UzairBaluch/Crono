import { Queue } from "bullmq";
import { redis, redisUrl } from "./redis.js";

export const cronJobsQueue = new Queue("cron-jobs", {
  connection: { url: redisUrl, maxRetriesPerRequest: null },
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 200,
  },
});

export { redis };
