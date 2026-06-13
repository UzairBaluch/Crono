import { z } from "zod";

export const createJobSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  schedule: z.string().min(1),
  method: z.enum(["GET", "POST"]).default("GET"),
  headers: z.record(z.string()).optional(),
  body: z.string().optional(),
  timezone: z.string().default("UTC"),
  retry_count: z.number().min(0).max(10).default(3),
});

export const updateJobSchema = z.object({
  name: z.string().min(1).optional(),
  url: z.string().url().optional(),
  schedule: z.string().min(1).optional(),
  method: z.enum(["GET", "POST"]).default("GET").optional(),
  headers: z.record(z.string()).optional(),
  body: z.string().optional(),
  timezone: z.string().default("UTC").optional(),
  retry_count: z.number().min(0).max(10).default(3).optional(),
  status: z.enum(["active", "paused"]).default("active").optional(),

});

export const jobIdParamSchema = z.object({
  id: z.string().uuid(),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type JobIdParam = z.infer<typeof jobIdParamSchema>;
