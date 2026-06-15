import { prisma } from "@crono/db";

export const workerJobRepository = {
  findById: async (id: string) => {
    return prisma.job.findUnique({ where: { id } });
  },
};
