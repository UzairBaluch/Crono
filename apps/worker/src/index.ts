import { Worker } from "bullmq";
import { redisUrl } from "@crono/queue";
import { executeJob } from "./executor.js";

const worker = new Worker(
  "cron-jobs",
  async (job) => {
    const jobId = job.data?.jobId;
    if (!jobId || typeof jobId !== "string") {
      throw new Error("Missing jobId in job data");
    }
    await executeJob(jobId);
  },
  { connection: { url: redisUrl, maxRetriesPerRequest: null } },
);

worker.on("error", (error) => {
  console.error("Worker error:", error);
});

worker.on("closed", () => {
  console.log("Worker closed");
});

worker.on("failed", (job, error) => {
  console.error("Job failed:", job?.id, error);
});

worker.on("completed", (job) => {
  console.log("Job completed:", job.id);
});

console.log("Worker listening on cron-jobs");
