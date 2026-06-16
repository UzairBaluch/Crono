import { prisma } from "@crono/db";

export const workerUserRepository = {
  findEmailById: async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { email: true },
    });
    return user?.email ?? null;
  },
};
