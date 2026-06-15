import { prisma } from "@crono/db";

export const logRepository = {
  findManyByJobIdAndUserId: async (jobId: string, userId: string) => {
    return prisma.log.findMany({
      where: { job_id: jobId, user_id: userId },
      orderBy: { fired_at: "desc" },
    });
  },
};
