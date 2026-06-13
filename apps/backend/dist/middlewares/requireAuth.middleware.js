export {};
// JOB: accept JWT OR x-api-key on the same route — used on /jobs in Phase 6
// IMPORTS/EXPORTS:
//   - import { authenticate } from "./authenticate.middleware.js"
//   - import { apiKey } from "./apiKey.middleware.js"
//   - export async function requireAuth(req, res, next)
// STEPS (you implement):
//   1. if Authorization Bearer header present → call authenticate logic (or call authenticate(req,res,next) — tricky double next)
//   2. else if x-api-key present → call apiKey logic
//   3. else → ApiError 401
// TIP: try apiKey first if x-api-key header exists, else try authenticate — avoid calling both
// COMMON MISTAKES:
//   - Calling both middlewares always — pick one based on which header client sent
//   - Duplicating all logic — OK to inline same pattern as authenticate/apiKey in one function
// VERIFY: GET /me with Bearer OR x-api-key both work once wired (replace separate /me and /me-key routes)
