import { randomBytes } from "node:crypto";

export function generateApiKey(): string {
  return "cron_" + randomBytes(32).toString("hex");
}
