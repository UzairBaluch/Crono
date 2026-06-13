import { prisma } from "@crono/db";
export const userRepository = {
    findByEmail: async (email) => {
        return prisma.user.findUnique({ where: { email } });
    },
    findById: async (id) => {
        return prisma.user.findUnique({ where: { id } });
    },
    findByApiKey: async (apiKey) => {
        return prisma.user.findUnique({ where: { api_key: apiKey } });
    },
    insertUser: async (data) => {
        return prisma.user.create({ data });
    },
};
