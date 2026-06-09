// JOB: Export ONE shared Prisma client for the whole app. Repositories import this.
//       No feature queries here — only client setup.
// VERIFY: import { prisma } from '@crono/db'; await prisma.$queryRaw`SELECT 1`
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../../.env") });
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
