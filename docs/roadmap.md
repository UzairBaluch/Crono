# Roadmap

**Next:** Phase 13 — deploy ([deploy guide](./deploy.md)).

---

## Phase 12 — Email ✅

- [x] `RESEND_API_KEY` in `.env`
- [x] `email.service.ts` (backend)
- [x] Worker failure alert
- [x] Forgot password + reset password

---

## Phase 13 — Deploy

- [ ] Railway — backend + worker + Postgres + Redis
- [ ] Vercel — frontend (`NEXT_PUBLIC_API_URL`)
- [ ] Prod env + CORS `APP_URL`
- [ ] README — live demo URL

See [deploy.md](./deploy.md) for step-by-step instructions.

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
