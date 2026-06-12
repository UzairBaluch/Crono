// JOB: mount /v1 under /api — top-level API router
// IMPORTS/EXPORTS:
//   - import { Router } from "express"
//   - import v1Router from "./v1/index.js"
//   - export default apiRouter
// STEPS (you implement):
//   1. const router = Router()
//   2. router.use("/v1", v1Router)
//   3. export default router
// COMMON MISTAKES:
//   - Mounting at "/" instead of "/v1" — breaks /api/v1/... prefix
//   - Importing health routes directly here — keep features in v1/index.ts
// VERIFY: app.use("/api", apiRoutes) in src/index.ts → full path /api/v1/health

import { Router } from "express";
import v1Router from "./v1/index.js";

const router = Router();

router.use("/v1", v1Router);

export default router;