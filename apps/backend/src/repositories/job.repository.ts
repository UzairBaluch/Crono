import { prisma } from "@crono/db";

type InsertJobData = {
  user_id: string;
  name: string;
  url: string;
  schedule: string;
  method?: string;
  headers?: object;
  body?: string | null;
  timezone?: string;
  retry_count?: number;
};

type UpdateJobData = Partial<Omit<InsertJobData, "user_id">> & {
  status?: string;
  bull_job_id?: string | null;
};

export const jobRepository = {
  findManyByUserId: async (userId: string) => {
    return prisma.job.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  },

  countByUserId: async (userId: string) => {
    return prisma.job.count({
      where: {
        user_id: userId,
      },
    });
  },

  findByIdAndUserId: async (id: string, userId: string) => {
    return prisma.job.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });
  },

  insertJob: async (data: InsertJobData) => {
    return prisma.job.create({
      data,
    });
  },

  updateByIdAndUserId: async (
    id: string,
    userId: string,
    data: UpdateJobData,
  ) => {
    return prisma.job.update({
      where: {
        id,
        user_id: userId,
      },
      data,
    });
  },

  deleteByIdAndUserId: async (id: string, userId: string) => {
    return prisma.job.delete({
      where: {
        id,
        user_id: userId,
      },
    });
  },
};
