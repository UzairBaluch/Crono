import { prisma } from "@crono/db";

type InsertLogData = {
  job_id: string;
  user_id: string;
  status: string;
  http_status?: number;
  duration_ms?: number;
  response_body?: string;
  error_message?: string;
  attempt?: number;
};

export const workerLogRepository = {
  insert: async (data: InsertLogData) => {
    return prisma.log.create({ data });
  },
};
