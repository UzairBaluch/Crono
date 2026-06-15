# Roadmap

Learning project — backend features only. Stripe / Slack skipped.

**Next:** Phase 12 — email (Resend) + forgot password.

---

## Phase 12 — Email

- [ ] `RESEND_API_KEY` in `.env`
- [ ] `apps/backend/src/services/email.service.ts`
- [ ] Worker `executor.ts` — email on `status: failed`
- [ ] Forgot password — token + `POST /auth/forgot-password` + `POST /auth/reset-password`
- [ ] Wire `/forgot-password` page

**Verify:** bad URL job → email · reset link works

---

## Phase 13 — Deploy

- [ ] Railway — backend + worker + Postgres + Redis
- [ ] Vercel — frontend (`NEXT_PUBLIC_API_URL`)
- [ ] Prod env + CORS `APP_URL`
- [ ] README — live demo URL

---

## Phase 14+ — Backend hardening (after deploy)

- [ ] 30s fetch timeout
- [ ] Retries + exponential backoff
- [ ] Log retention cleanup (7 / 30 / 90 days)
- [ ] SSRF protections
- [ ] Helmet + rate limits
- [ ] Missed-run alerts
- [ ] HMAC signed requests
- [ ] Dashboard stats (last run / failed count)
- [ ] Automated tests + CI

---

## Shipped (reference)

Auth, jobs CRUD, plan limits, BullMQ scheduler, worker executor, logs API, dashboard UI.
