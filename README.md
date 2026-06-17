# Crono

Schedule HTTP jobs. Get logs. Get alerted when things break.

[About](#about) · [Quick Start](#quick-start) · [Features](#features) · [API](#api) · [Architecture](#architecture) · [Docs](./docs/README.md)

---

## About

Built to learn production backend architecture end to end — auth, job queues, background workers, multi-tenant data isolation, and layered service design. A learning project, not a commercial SaaS.

**Repo:** [github.com/UzairBaluch/Crono](https://github.com/UzairBaluch/Crono)

---

## The problem

Your app needs to hit an endpoint on a schedule — daily reports, cleanup tasks, webhook retries. You could run cron on a VPS, but then you're on the hook for silent failures, no history, and no alerts.

**Crono** is a cron-style HTTP job API: create jobs over REST or the dashboard, track runs, and get emailed when a run fails.

```bash
curl -X POST http://localhost:4000/api/v1/jobs \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Daily report",
    "url": "https://yourapp.com/api/send-report",
    "method": "POST",
    "schedule": "0 9 * * *",
    "timezone": "America/New_York"
  }'
```

---

## Features

| | |
|---|---|
| **REST API** | Job CRUD under `/api/v1` |
| **Auth** | Register, login, JWT, API keys (`cron_…`), forgot password |
| **Tenant isolation** | Every job and log scoped to your account |
| **Plan limits** | 3 / 50 / 500 active jobs enforced server-side |
| **Cron validation** | Invalid schedules rejected before save |
| **Layered backend** | Routes → controllers → services → repositories (TypeScript + Zod) |
| **Scheduler** | BullMQ repeat jobs on create / pause / delete |
| **Worker** | Separate process — `fetch` URL, write execution logs |
| **Execution logs** | `GET /jobs/:id/logs` + dashboard log UI |
| **Email alerts** | Resend email when a run fails (network errors) |
| **Dashboard** | Next.js — jobs CRUD, job detail, logs |

### Not included (by design)

No Stripe billing, no Slack/Discord, no hosted deploy required — run locally with Docker. `retry_count` is stored on jobs but full BullMQ retry/backoff is not wired yet.

---

## Architecture

```txt
Client (browser / curl)
    → Express API (auth, jobs, logs)
    → PostgreSQL (Prisma)
    → BullMQ scheduler → Redis
    → Worker (fetch URL, write Log, email on failure)
```

Monorepo:

```txt
Crono/
├── apps/backend/     Express API
├── apps/worker/      BullMQ consumer + executor
├── apps/frontend/    Next.js dashboard + landing
├── packages/db/      Prisma + Postgres
├── packages/queue/   BullMQ + Redis
└── packages/shared/  API keys, cron utils, plan limits
```

More detail: [docs/architecture.md](./docs/architecture.md)

---

## Tech stack

| Layer | Technology |
|---|---|
| API | Node.js · TypeScript · Express 5 |
| Queue | BullMQ · Redis |
| Database | PostgreSQL · Prisma |
| Frontend | Next.js · Tailwind |
| Email | Resend |

---

## Quick start

### Prerequisites

- Node.js 18+
- Docker (Postgres + Redis)

### 1. Clone and install

```bash
git clone https://github.com/UzairBaluch/Crono.git
cd Crono
npm install
```

### 2. Environment

```bash
cp .env.example .env
```

Edit `.env` — at minimum: `JWT_SECRET` (32+ chars), `DATABASE_URL` (port **5433**), `REDIS_URL`, `APP_URL`. Add `RESEND_API_KEY` for failure emails and password reset.

### 3. Infrastructure

```bash
docker compose up -d
npm run db:migrate -w @crono/db
```

### 4. Run

```bash
npm run dev -w backend    # :4000
npm run dev -w worker
npm run dev -w frontend   # :3000 (optional)
```

| Service | URL |
|---|---|
| API | http://localhost:4000 |
| Frontend | http://localhost:3000 |
| Health | http://localhost:4000/api/v1/health |

### 5. Smoke test

```bash
# Register
curl -s -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"password123"}'

# Create job (use token from response)
curl -s -X POST http://localhost:4000/api/v1/jobs \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Ping","url":"https://httpbin.org/get","schedule":"0 * * * *"}'
```

Create a job in the UI → wait for a run → check the Logs tab on the job detail page.

---

## API

Base URL: `/api/v1`

**Success**

```json
{ "success": true, "data": { ... } }
```

**Error**

```json
{ "success": false, "message": "..." }
```

### Authentication

| Method | Header | Use case |
|---|---|---|
| JWT | `Authorization: Bearer <token>` | Dashboard |
| API key | `x-api-key: cron_…` | Scripts *(auth routes; jobs use JWT today)* |

### Auth

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
GET  /api/v1/auth/me
```

### Jobs

```http
GET    /api/v1/jobs
POST   /api/v1/jobs
GET    /api/v1/jobs/:id
GET    /api/v1/jobs/:id/logs
PATCH  /api/v1/jobs/:id
DELETE /api/v1/jobs/:id
```

**Create job body**

| Field | Type | Required | Notes |
|---|---|:---:|---|
| `name` | string | ✓ | Display name |
| `url` | string | ✓ | Valid URL |
| `schedule` | string | ✓ | Cron expression |
| `method` | string | | `GET` or `POST` |
| `headers` | object | | Request headers |
| `body` | string | | POST body |
| `timezone` | string | | Default `UTC` |
| `retry_count` | number | | Stored; backoff not wired yet |

**Pause / resume:** `{ "status": "paused" }` or `{ "status": "active" }`

| Code | Meaning |
|:---:|---|
| `201` | Created |
| `200` | OK |
| `400` | Validation / invalid cron |
| `401` | Unauthorized |
| `403` | Plan limit reached |
| `404` | Not found |
| `409` | Email already registered |

### Health

```http
GET /api/v1/health
```

---

## Cron cheat sheet

```txt
┌──────── minute (0–59)
│ ┌────── hour (0–23)
│ │ ┌──── day of month (1–31)
│ │ │ ┌── month (1–12)
│ │ │ │ ┌ day of week (0–6, Sun=0)
* * * * *
```

| Expression | Runs |
|---|---|
| `*/5 * * * *` | Every 5 minutes |
| `0 * * * *` | Every hour |
| `0 9 * * *` | Daily at 9:00 |
| `0 9 * * 1-5` | Weekdays at 9:00 |

---

## Environment variables

Root `.env` (see `.env.example`):

| Variable | Required | Used for |
|---|---|---|
| `DATABASE_URL` | ✓ | Postgres (port **5433** locally) |
| `REDIS_URL` | ✓ | BullMQ |
| `JWT_SECRET` | ✓ | Auth (32+ characters) |
| `APP_URL` | ✓ | Frontend URL, email links |
| `PORT` | | API port (default `4000`) |
| `RESEND_API_KEY` | | Failure + password-reset emails |

---

## Scripts

```bash
docker compose up -d
npm run db:migrate -w @crono/db
npm run db:studio -w @crono/db
npm run build -w @crono/shared
npm run dev -w backend
npm run dev -w worker
npm run dev -w frontend
```

---

## What I learned building this

- Layered API design with Zod validation and consistent error responses
- Multi-tenant data access (every query scoped by `user_id`)
- Syncing Postgres state with BullMQ repeat jobs on create / pause / delete
- Running a separate worker process that shares DB + Redis with the API
- Transactional email (Resend) from both API and worker
- JWT auth, API keys, and password reset with signed tokens

---

## License

MIT

---

*Built to learn. Designed like it ships.*
