// JOB: public entry point for @crono/shared — re-export helpers + constants only
// IMPORTS/EXPORTS:
//   - Re-export generateApiKey from ./apiKey.js
//   - Re-export isValidCron from ./cron.js
//   - Re-export PLAN_LIMITS, JOB_STATUS from ./constants.js
//   - Other packages import from "@crono/shared" (never deep paths like @crono/shared/src/cron)
// COMMON MISTAKES:
//   - Forgetting .js in relative paths (NodeNext ESM — TypeScript compiles .ts → .js)
//   - Adding DB, env, or HTTP imports here — this package stays pure
//   - Exporting new symbols without adding them to this file (barrel must stay in sync)
// VERIFY: npm run build -w @crono/shared

export { generateApiKey } from "./apiKey.js";
export { isValidCron } from "./cron.js";
export { PLAN_LIMITS, JOB_STATUS } from "./constants.js";
