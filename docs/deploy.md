# Deploy (Phase 13)

Ship Crono to production: **Railway** (API + worker + Postgres + Redis) and **Vercel** (frontend).

Do these in order. Check each box before moving on.

---

## Overview

```txt
Vercel (frontend)  ──HTTPS──▶  Railway (Express API)
                                    │
                                    ├── Postgres (Prisma)
                                    ├── Redis (BullMQ)
                                    └── Worker (separate Railway service)
```

| Service | Platform | Public URL? |
|---------|----------|-------------|
| Frontend | Vercel | Yes — `https://your-app.vercel.app` |
| Backend API | Railway | Yes — `https://api-xxx.up.railway.app` |
| Worker | Railway | No — background process only |
| Postgres | Railway plugin | No |
| Redis | Railway plugin | No |

---

## Step 1 — Railway project + data stores

1. [railway.app](https://railway.app) → New Project → **Deploy from GitHub** → select `Crono`
2. Add **PostgreSQL** plugin → copy `DATABASE_URL` from Variables
3. Add **Redis** plugin → copy `REDIS_URL` from Variables

**VERIFY:** Railway dashboard shows Postgres + Redis services with connection URLs.

---

## Step 2 — Backend service (Railway)

Create a **new service** from the same repo (or duplicate the GitHub service).

| Setting | Value |
|---------|--------|
| **Root directory** | `/` (repo root — monorepo) |
| **Build command** | `npm ci && npm run build:backend` |
| **Start command** | `npm run db:migrate:deploy && npm run start:backend` |
| **Watch paths** | `apps/backend/**`, `packages/**` |

**Environment variables** (Railway → Variables):

| Variable | Example / notes |
|----------|-----------------|
| `NODE_ENV` | `production` |
| `PORT` | Railway sets this automatically — keep `env.PORT` default |
| `DATABASE_URL` | From Postgres plugin |
| `REDIS_URL` | From Redis plugin |
| `JWT_SECRET` | New random 64+ char string (not your local one) |
| `APP_URL` | Vercel URL — set after Step 4, e.g. `https://crono.vercel.app` |
| `RESEND_API_KEY` | Your Resend key |

**VERIFY:**
```bash
curl https://YOUR-RAILWAY-API.up.railway.app/api/v1/health
# → { "success": true, "data": { "status": "ok", ... } }
```

---

## Step 3 — Worker service (Railway)

Another service, **same repo**, different start command.

| Setting | Value |
|---------|--------|
| **Build command** | `npm ci && npm run build:worker` |
| **Start command** | `npm run start:worker` |
| **Watch paths** | `apps/worker/**`, `packages/**` |

**Environment variables** — same as backend **except** no `PORT` needed:

| Variable | Required |
|----------|----------|
| `DATABASE_URL` | ✅ |
| `REDIS_URL` | ✅ |
| `RESEND_API_KEY` | ✅ (failure emails) |
| `APP_URL` | ✅ (links in emails) |
| `JWT_SECRET` | optional for worker |

Worker has **no HTTP port** — Railway may show "unexposed service"; that's correct.

**VERIFY:** Railway worker logs show `Worker listening on cron-jobs`.

---

## Step 4 — Vercel (frontend)

1. [vercel.com](https://vercel.com) → Import `Crono` from GitHub
2. **Root Directory:** `apps/frontend`
3. Framework: Next.js (auto-detected)

**Environment variable:**

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | `https://YOUR-RAILWAY-API.up.railway.app/api/v1` |

Deploy. Copy the Vercel URL (e.g. `https://crono.vercel.app`).

---

## Step 5 — Close the loop (CORS)

Go back to **Railway backend** → set:

```bash
APP_URL=https://your-vercel-url.vercel.app
```

Redeploy backend (and worker if you use `APP_URL` in emails).

**VERIFY:** Open Vercel URL → register → create job → logs appear.

---

## Step 6 — Smoke test (production)

- [ ] Register new account on live site
- [ ] Create job (`*/5 * * * *`, valid URL like `https://httpbin.org/get`)
- [ ] Wait for run → logs on job detail page
- [ ] Optional: bad URL job → failure email (Resend sandbox = signup email only)
- [ ] Forgot password → email → reset works

---

## Prod build commands (reference)

From repo root — same as Railway uses:

```bash
npm ci
npm run build:backend    # API
npm run build:worker     # worker
npm run db:migrate:deploy -w @crono/db   # run once per deploy with schema changes
npm run start:backend
npm run start:worker
```

---

## Common mistakes

| Problem | Fix |
|---------|-----|
| CORS error on login | `APP_URL` on Railway must match Vercel URL exactly (no trailing slash) |
| Frontend hits localhost | Set `NEXT_PUBLIC_API_URL` on Vercel, redeploy frontend |
| Worker not processing jobs | Worker service running? Same `REDIS_URL` as backend? |
| Prisma errors on start | `db:migrate:deploy` in backend start command |
| Emails not sending | `RESEND_API_KEY` on worker + backend; verify domain for non-sandbox recipients |

---

## After deploy

Add live demo URL to README:

```md
**Live demo:** https://your-app.vercel.app
```

Phase 14+ hardening (timeout, SSRF, CI) comes after this.
