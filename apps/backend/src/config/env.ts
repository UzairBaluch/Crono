// JOB: validate all required env vars at startup — fail fast before Express listens
// IMPORTS/EXPORTS:
//   - import z from "zod"
//   - load repo root .env via dotenv (path below)
//   - export const env — typed, parsed config used everywhere (never raw process.env)
// COMMON MISTAKES:
//   - Reading process.env.FOO! in random files — always import { env } from here
//   - Wrong dotenv path — this file is apps/backend/src/config → 4 levels up to repo root
//   - Making Stripe/Resend required in Phase 4 — keep optional until Phases 10–11
//   - Short JWT_SECRET — use min(32) now; rotate in prod later
// VERIFY: npx tsx -e "import { env } from './apps/backend/src/config/env.ts'; console.log(env.PORT)"
//         (run from repo root after npm install)

import dotenv from "dotenv";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../../../../.env") });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
  REDIS_URL: z.string().url().startsWith("redis://"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  APP_URL: z.string().url(),
  // Phase 10+ — optional until wired
  RESEND_API_KEY: z.string().optional(),
  // Phase 11+ — optional until wired
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_STARTER_PRICE_ID: z.string().optional(),
  STRIPE_PRO_PRICE_ID: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
