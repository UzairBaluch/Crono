// JOB: Prisma queries for Job model only — no plan limits, no cron validation
// IMPORTS/EXPORTS:
//   - import { prisma } from "@crono/db"
//   - import type { Job } from "@crono/db" (or Prisma.Job if that's how db exports it)
//   - export const jobRepository = { ... }
//
// METHODS TO IMPLEMENT (all queries MUST filter by user_id — tenant isolation):
//
//   1. findManyByUserId(userId: string)
//      → prisma.job.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } })
//      Used by: GET /jobs (list)
//
//   2. countByUserId(userId: string)
//      → prisma.job.count({ where: { user_id: userId } })
//      Used by: job.service create — compare count vs PLAN_LIMITS before insert
//
//   3. findByIdAndUserId(id: string, userId: string)
//      → prisma.job.findFirst({ where: { id, user_id: userId } })
//      Used by: GET /jobs/:id, update, delete — returns null if not found OR wrong owner
//      WHY findFirst not findUnique: compound filter (id + user_id), not just id alone
//
//   4. insertJob(data: InsertJobData)
//      → prisma.job.create({ data })
//      InsertJobData = fields the service sends (user_id, name, url, schedule, + optional method/headers/body/timezone/retry_count)
//      Do NOT set bull_job_id here — Phase 7 scheduler does that
//
//   5. updateByIdAndUserId(id: string, userId: string, data: UpdateJobData)
//      → prisma.job.update({ where: { id, user_id: userId }, data })
//      NOTE: Prisma update where needs a unique constraint. Job only has id as @id.
//      OPTION A: findFirst to verify ownership, then update({ where: { id } })
//      OPTION B: use updateMany({ where: { id, user_id } }) and check count === 1
//      Pick one — both enforce tenant isolation
//
//   6. deleteByIdAndUserId(id: string, userId: string)
//      → same pattern as update — verify user owns job before delete
//
// COMMON MISTAKES:
//   - findUnique({ where: { id } }) without user_id → user A can touch user B's job
//   - Putting PLAN_LIMITS or isValidCron here — those belong in job.service
//   - Setting status to "paused" in repo — service decides status; repo just saves
//
// VERIFY (after service exists): npm run dev -w backend + create job via Postman
//   For now: npm run build -w backend — file should compile once methods have return types
import { prisma } from "@crono/db";
export const jobRepository = {
    findManyByUserId: async (_userId) => {
        return prisma.job.findMany({
            where: {
                user_id: _userId,
            },
            orderBy: {
                created_at: "desc",
            },
        });
    },
    countByUserId: async (_userId) => {
        // TODO: implement
        return prisma.job.count({
            where: {
                user_id: _userId,
            },
        });
    },
    findByIdAndUserId: async (_id, _userId) => {
        // TODO: implement
        return prisma.job.findFirst({
            where: {
                id: _id,
                user_id: _userId,
            },
        });
    },
    insertJob: async (_data) => {
        // TODO: implement
        return prisma.job.create({
            data: _data,
        });
    },
    updateByIdAndUserId: async (_id, _userId, _data) => {
        // TODO: implement
        return prisma.job.update({
            where: {
                id: _id,
                user_id: _userId,
            },
            data: _data,
        });
    },
    deleteByIdAndUserId: async (_id, _userId) => {
        // TODO: implement
        return prisma.job.delete({
            where: {
                id: _id,
                user_id: _userId,
            },
        });
    },
};
