import { Redis } from "ioredis";
import dotenv from "dotenv";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../../.env") });

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("REDIS_URL is not set");
}

export { redisUrl };
export const redis = new Redis(redisUrl);

redis.on("error", (err: Error) => {
  console.error("redis error", err);
});
