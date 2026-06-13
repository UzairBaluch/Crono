<p align="center">
  <strong>Crono</strong>
</p>

<p align="center">
  Schedule HTTP jobs. Get logs. Get alerted when things break.
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> ·
  <a href="#features">Features</a> ·
  <a href="#pricing">Pricing</a> ·
  <a href="#api">API</a> ·
  <a href="#roadmap">Roadmap</a>
</p>

---

## The problem

Your app needs to hit an endpoint on a schedule — daily reports, cleanup tasks, webhook retries. You could run cron on a VPS, but then you're on the hook for silent failures, no history, and no alerts at 3am.

**Crono** is a hosted-style cron API: create jobs over REST, track runs, and get notified when something fails — without babysitting infrastructure.

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

## Who it's for

**Indie SaaS founders and backend developers** who need reliable scheduled HTTP calls — with retries, execution history, and failure alerts — managed through an API or dashboard.

---

## Features

### Shipped

| | |
|---|---|
| **REST API** | Full job CRUD under `/api/v1` |
| **Auth** | Register, login, JWT for dashboard, API keys (`cron_…`) for scripts |
| **Tenant isolation** | Every job scoped to your account — no cross-user access |
| **Plan limits** | Free / Starter / Pro enforced server-side (3 / 50 / 500 jobs) |
| **Cron validation** | Invalid schedules rejected before save |
| **Layered backend** | Routes → controllers → services → repositories (TypeScript + Zod) |
| **Dashboard UI** | Next.js marketing + dashboard shell (mock data — wiring in progress) |

### Coming soon

| | |
|---|---|
| **Scheduler** | BullMQ repeat jobs on create / pause / delete |
| **Worker** | Dedicated process that fires jobs on schedule |
| **Execution logs** | Status, HTTP code, duration, response snippet per run |
| **Failure alerts** | Email via Resend when a job fails after retries |
| **Stripe billing** | Checkout + webhooks to sync plan |
| **Missed-run alerts** | Dead man's switch if a job never fired |
| **Slack / Discord** | Route failures to chat |
| **Deploy** | Railway (API + worker) + Vercel (frontend) |

---

## Pricing

| | **Free** | **Starter** | **Pro** |
|---|:---:|:---:|:---:|
| Active jobs | 3 | 50 | 500 |
| Log retention | 7 days | 30 days | 90 days |
| Retries on failure | 3× | 3× | 5× |
| Email alerts | ✓ | ✓ | ✓ |
| API access | ✓ | ✓ | ✓ |
| **Price** | **$0** | **$9/mo** | **$29/mo** |

Limits are enforced in the API today. Billing integration ships in a later phase.

---

## Tech stack

| Layer | Technology |
|---|---|
| API | Node.js · TypeScript · Express 5 |
| Queue | BullMQ · Redis |
| Database | PostgreSQL · Prisma |
| Frontend | Next.js · Tailwind |
| Billing | Stripe *(planned)* |
| Email | Resend *(planned)* |
| Deploy | Railway + Vercel *(planned)* |

Monorepo workspaces: `apps/backend`, `apps/frontend`, `apps/worker`, `packages/db`, `packages/queue`, `packages/shared`.

---

## Quick start

### Prerequisites

- Node.js 18+
- Docker (Postgres + Redis)

### 1. Clone and install

```bash
git clone https://github.com/yourusername/crona.git
cd crona
npm install
```

### 2. Environment

```bash
cp .env.example .env
# Edit .env — JWT_SECRET, DATABASE_URL (port 5433), REDIS_URL
```

### 3. Start infrastructure

```bash
docker compose up -d
npm run db:migrate -w @crono/db
```

Postgres runs on **5433** (host). Redis on **6379**.

### 4. Run dev servers

```bash
# Terminal 1 — API
npm run dev -w backend

# Terminal 2 — Frontend (optional)
npm run dev -w frontend
```

| Service | URL |
|---|---|
| API | http://localhost:4000 |
| Frontend | http://localhost:3000 |
| Health | http://localhost:4000/api/v1/health |

### 5. Smoke test

```bash
# Register
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"password123"}'

# Create job (use token from register response)
curl -X POST http://localhost:4000/api/v1/jobs \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Ping","url":"https://httpbin.org/get","schedule":"0 * * * *"}'
```

---

## Repository structure

```txt
Crona/
├── apps/
│   ├── backend/          # Express API (auth, jobs, health)
│   ├── frontend/         # Next.js dashboard + landing
│   └── worker/           # BullMQ worker (Phase 8)
├── packages/
│   ├── db/               # Prisma + Postgres
│   ├── queue/            # BullMQ + Redis
│   └── shared/           # API keys, cron utils, plan constants
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## API

Base URL: `/api/v1`

All success responses:

```json
{ "success": true, "data": { ... } }
```

Errors:

```json
{ "success": false, "message": "..." }
```

### Authentication

| Method | Header | Use case |
|---|---|---|
| JWT | `Authorization: Bearer <token>` | Dashboard, browser |
| API key | `x-api-key: cron_…` | Scripts, CI *(jobs routes: JWT only for now)* |

### Auth

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me          # JWT required
```

**Register / login body**

```json
{ "email": "you@example.com", "password": "password123" }
```

**Response**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGci...",
    "user": {
      "id": "uuid",
      "email": "you@example.com",
      "plan": "free",
      "api_key": "cron_..."
    }
  }
}
```

### Jobs

```http
GET    /api/v1/jobs           # List jobs
POST   /api/v1/jobs           # Create job
GET    /api/v1/jobs/:id       # Get one job
PATCH  /api/v1/jobs/:id       # Update (incl. pause/resume)
DELETE /api/v1/jobs/:id       # Delete job
```

**Create job body**

| Field | Type | Required | Notes |
|---|---|:---:|---|
| `name` | string | ✓ | Display name |
| `url` | string | ✓ | Valid URL |
| `schedule` | string | ✓ | Cron expression |
| `method` | string | | `GET` or `POST` (default: `GET`) |
| `headers` | object | | Request headers |
| `body` | string | | JSON body for POST |
| `timezone` | string | | Default: `UTC` |
| `retry_count` | number | | Default: `3` |

**Pause / resume**

```json
{ "status": "paused" }
{ "status": "active" }
```

**Status codes**

| Code | Meaning |
|:---:|---|
| `201` | Job created |
| `200` | Success |
| `400` | Validation / invalid cron |
| `401` | Missing or invalid auth |
| `403` | Plan limit reached |
| `404` | Job not found |
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

Single root `.env` (see `.env.example`):

| Variable | Required | Used for |
|---|---|---|
| `DATABASE_URL` | ✓ | Postgres (port **5433** locally) |
| `REDIS_URL` | ✓ | BullMQ / queue |
| `JWT_SECRET` | ✓ | Auth tokens |
| `PORT` | | API port (default `4000`) |
| `APP_URL` | | Frontend URL for redirects |
| `RESEND_API_KEY` | | Failure emails *(Phase 10)* |
| `STRIPE_*` | | Billing *(Phase 11)* |

---

## Scripts

```bash
docker compose up -d
npm run db:migrate -w @crono/db
npm run db:studio -w @crono/db
npm run build -w @crono/shared
npm run dev -w backend
npm run dev -w frontend
npm run build -w backend
```

---

## Roadmap

| Phase | Feature | Status |
|:---:|---|:---:|
| 1 | Database (`@crono/db`) | ✅ |
| 2 | Queue (`@crono/queue`) | ✅ |
| 3 | Shared helpers | ✅ |
| 4 | Backend scaffold + health | ✅ |
| 5 | Auth (JWT + API keys) | ✅ |
| 6 | Jobs CRUD + plan limits | ✅ |
| 7 | BullMQ scheduler | ⬜ |
| 8 | Worker process | ⬜ |
| 9 | Executor + logs | ⬜ |
| 10 | Email alerts | ⬜ |
| 11 | Stripe billing | ⬜ |
| 12 | Manual E2E test | ⬜ |
| 13 | Deploy MVP | ⬜ |

Post-MVP: security hardening, monitoring, automated tests, missed-run alerts, Slack/Discord, HMAC signing.

---

## Deployment *(planned)*

**Railway** — API + worker + Postgres + Redis  
**Vercel** — Frontend  
**Stripe** — Webhook at `POST /api/v1/billing/webhook`

Details added when Phase 13 ships.

---

## License & access

Private SaaS repository. Internal development only — no public contributions without owner approval.

---

<p align="center">
  <sub>Built for teams who ship on a schedule.</sub>
</p>
