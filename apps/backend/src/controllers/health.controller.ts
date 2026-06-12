// JOB: HTTP adapter — read req, call health.service, send JSON response
// IMPORTS/EXPORTS:
//   - import type { Request, Response } from "express"
//   - import { getHealth } from "../services/health.service.js"
//   - import { success } from "../utils/ApiResponse.js"
//   - export const healthController = { get } or export function get(req, res)
// STEPS (you implement):
//   1. get(req, res) — call getHealth()
//   2. res.status(200).json(success(result))
//   3. no try/catch — asyncHandler + error.middleware handle errors
//   4. no business logic here — don't build timestamp in controller
// COMMON MISTAKES:
//   - Calling prisma or building { status, timestamp } directly in controller
//   - Forgetting success() wrapper — inconsistent API shape
// VERIFY: wired in routes later; curl GET /api/v1/health → 200 + success true
