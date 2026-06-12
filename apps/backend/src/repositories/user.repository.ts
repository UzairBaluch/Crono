import { prisma } from "@crono/db";

type InsertUserData = {
  email: string;
  password_hash: string;
  api_key: string;
  plan?: string;
};

export const userRepository = {
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },

  findById: async (id: string) => {
    return prisma.user.findUnique({ where: { id } });
  },

  findByApiKey: async (apiKey: string) => {
    return prisma.user.findUnique({ where: { api_key: apiKey } });
  },

  insertUser: async (data: InsertUserData) => {
    return prisma.user.create({ data });
  },
};
