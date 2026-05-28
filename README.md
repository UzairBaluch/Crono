# 🐦 Crono

Private SaaS platform for reliable scheduled HTTP jobs.

[Quick Start](#quick-start) · [API Docs](#api-reference) · [Deployment](#deployment) · [Pricing](#pricing)

## What is Crono?

Crono lets you schedule HTTP jobs via a simple REST API or dashboard — with retries, logs, and failure alerts built in.
No VPS cron tab. No silent failures at 3am. No $200/mo monitoring bills.

```bash
# Schedule a job in one API call
curl -X POST https://api.crono.dev/jobs \
  -H "x-api-key: cron_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Daily report",
    "url": "https://yourapp.com/api/send-report",
    "method": "POST",
    "schedule": "0 9 * * *",
    "timezone": "America/New_York"
  }'
```

## Features

- Schedule any HTTP endpoint — GET or POST, any URL, any cron expression
- Auto-retry on failure — 3 retries with exponential backoff (5s → 30s → 2min)
- Execution logs — every run logged with status, duration, and response
- Failure alerts — instant email when a job fails
- API-first — full REST API with API key auth
- Beautiful dashboard — manage jobs, view logs, pause/resume with one click
- Indie pricing — starts free, scales to $29/mo

## Tech Stack

| Layer | Technology |
|---|---|
| API | Node.js + Express |
| Job Queue | BullMQ + Redis |
| Database | PostgreSQL |
| Frontend | Next.js |
| Billing | Stripe |
| Email | Resend |
| Deploy | Railway (API) + Vercel (Frontend) |

## Quick Start

### Prerequisites

- Node.js 18+
- Docker (for local Postgres + Redis)
- A Stripe account
- A Resend account (free)

### 1. Clone and install

```bash
git clone https://github.com/yourusername/crono.git
cd crono

# Install backend deps
cd backend && npm install

# Install frontend deps
cd ../frontend && npm install
```

### 2. Start local infrastructure

```bash
# From project root
docker-compose up -d
```

This starts PostgreSQL on port 5432 and Redis on port 6379.

### 3. Set up environment variables

```bash
# Backend
cp backend/.env.example backend/.env
# Fill in your values (see Environment Variables section)

# Frontend
cp frontend/.env.example frontend/.env.local
```

### 4. Run database migrations

```bash
cd backend && npm run migrate
```

### 5. Start the development servers

```bash
# Terminal 1 — API server
cd backend && npm run dev

# Terminal 2 — Background worker
cd backend && npm run worker

# Terminal 3 — Frontend
cd frontend && npm run dev
```

App is running at:

- Frontend: http://localhost:3000
- API: http://localhost:4000

## Repository Structure

```txt
crono/
├── backend/
│   ├── src/
│   │   ├── index.js          # Express entry point
│   │   ├── worker.js         # BullMQ worker
│   │   ├── config/
│   │   │   ├── db.js         # PostgreSQL pool
│   │   │   ├── redis.js      # Redis connection
│   │   │   └── queue.js      # BullMQ queue
│   │   ├── middleware/
│   │   │   ├── auth.js       # JWT middleware
│   │   │   └── apiKey.js     # API key middleware
│   │   ├── routes/
│   │   │   ├── auth.js       # Register / login
│   │   │   ├── jobs.js       # Job CRUD
│   │   │   ├── logs.js       # Execution logs
│   │   │   └── billing.js    # Stripe billing
│   │   ├── services/
│   │   │   ├── scheduler.js  # BullMQ schedule/unschedule
│   │   │   ├── executor.js   # HTTP request + log result
│   │   │   └── alerts.js     # Failure email
│   │   └── utils/
│   │       ├── apiKey.js     # API key generator
│   │       └── cron.js       # Cron expression validator
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── page.js           # Landing page
│   │   ├── dashboard/        # Job list + detail
│   │   ├── login/
│   │   ├── register/
│   │   └── billing/
│   ├── components/
│   └── lib/api.js            # API fetch wrapper
│
├── docker-compose.yml
└── README.md
```

## Environment Variables

### backend/.env

```env
NODE_ENV=development
PORT=4000

# PostgreSQL
DATABASE_URL=postgresql://postgres:password@localhost:5432/crono

# Redis
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=change_this_to_a_long_random_string

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...

# Email (Resend)
RESEND_API_KEY=re_...

# App URL (for Stripe redirect)
APP_URL=http://localhost:3000
```

### frontend/.env.local

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## API Reference

### Authentication

All API routes accept either a JWT token (dashboard) or an API key (programmatic access).

```bash
# JWT — pass in Authorization header
Authorization: Bearer <token>

# API key — pass in x-api-key header
x-api-key: cron_your_api_key
```

### Auth

#### Register

```http
POST /auth/register
Content-Type: application/json

{
  "email": "you@example.com",
  "password": "yourpassword"
}
```

Response

```json
{
  "token": "eyJhbGci...",
  "user": {
    "id": "uuid",
    "email": "you@example.com",
    "plan": "free",
    "api_key": "cron_abc123..."
  }
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "you@example.com",
  "password": "yourpassword"
}
```

### Jobs

#### List all jobs

```http
GET /jobs
Authorization: Bearer <token>
```

Response

```json
[
  {
    "id": "uuid",
    "name": "Daily report",
    "url": "https://yourapp.com/api/send-report",
    "method": "POST",
    "schedule": "0 9 * * *",
    "timezone": "UTC",
    "status": "active",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

#### Create a job

```http
POST /jobs
x-api-key: cron_your_api_key
Content-Type: application/json

{
  "name": "Daily report",
  "url": "https://yourapp.com/api/send-report",
  "method": "POST",
  "headers": { "Authorization": "Bearer secret" },
  "body": "{\"type\": \"daily\"}",
  "schedule": "0 9 * * *",
  "timezone": "America/New_York"
}
```

Fields

| Field | Type | Required | Description |
|---|---|---|---|
| name | string | yes | Human-readable job name |
| url | string | yes | Endpoint to call |
| method | string | no | GET or POST (default: GET) |
| headers | object | no | Request headers |
| body | string | no | Request body (JSON string) |
| schedule | string | yes | Cron expression |
| timezone | string | no | Timezone (default: UTC) |

Response — 201 Created

```json
{
  "id": "uuid",
  "name": "Daily report",
  "url": "https://yourapp.com/api/send-report",
  "status": "active"
}
```

#### Update a job

```http
PATCH /jobs/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "paused"
}
```

Any field from create can be updated. To pause a job send `{ "status": "paused" }`. To resume send `{ "status": "active" }`.

#### Delete a job

```http
DELETE /jobs/:id
Authorization: Bearer <token>
```

Response — 200 OK

```json
{ "success": true }
```

### Logs

#### Get logs for a job

```http
GET /logs/:jobId
Authorization: Bearer <token>
```

Response

```json
[
  {
    "id": "uuid",
    "job_id": "uuid",
    "status": "success",
    "http_status": 200,
    "duration_ms": 143,
    "response_body": "{\"ok\":true}",
    "error_message": null,
    "attempt": 1,
    "fired_at": "2024-01-01T09:00:00Z"
  },
  {
    "id": "uuid",
    "job_id": "uuid",
    "status": "failed",
    "http_status": 500,
    "duration_ms": 30012,
    "response_body": null,
    "error_message": "Request timeout",
    "attempt": 3,
    "fired_at": "2024-01-01T08:00:00Z"
  }
]
```

### Billing

#### Create checkout session

```http
POST /billing/checkout
Authorization: Bearer <token>
Content-Type: application/json

{
  "plan": "starter"
}
```

Response

```json
{
  "url": "https://checkout.stripe.com/..."
}
```

Redirect the user to `url` to complete payment.

## Cron Expression Reference

```txt
┌─────────── minute (0–59)
│ ┌───────── hour (0–23)
│ │ ┌─────── day of month (1–31)
│ │ │ ┌───── month (1–12)
│ │ │ │ ┌─── day of week (0–6, Sunday=0)
│ │ │ │ │
* * * * *
```

Common examples

| Expression | Meaning |
|---|---|
| `* * * * *` | Every minute |
| `*/5 * * * *` | Every 5 minutes |
| `0 * * * *` | Every hour |
| `0 9 * * *` | Every day at 9am |
| `0 9 * * 1` | Every Monday at 9am |
| `0 0 1 * *` | First day of every month |
| `0 9,17 * * 1-5` | 9am and 5pm, weekdays only |

## Pricing

| Plan | Free | Starter | Pro |
|---|---|---|---|
| Jobs | 3 | 50 | 500 |
| Log retention | 7 days | 30 days | 90 days |
| Retry on failure | 3x | 3x | 5x |
| Email alerts | yes | yes | yes |
| API access | yes | yes | yes |
| Price | $0/mo | $9/mo | $29/mo |

## Deployment

### Railway (recommended)

Railway runs your API server, worker, Postgres, and Redis in one place.

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create new project
railway new

# Add plugins
railway add postgresql
railway add redis

# Deploy backend
cd backend
railway up

# Set environment variables
railway variables set JWT_SECRET=... STRIPE_SECRET_KEY=... RESEND_API_KEY=...
```

Set the worker as a separate service with start command `node src/worker.js`.

### Vercel (frontend)

```bash
# Install Vercel CLI
npm install -g vercel

cd frontend
vercel

# Set env vars
vercel env add NEXT_PUBLIC_API_URL
```

### Stripe webhook setup

1. Go to Stripe Dashboard → Webhooks → Add endpoint
2. URL: `https://your-api.railway.app/billing/webhook`
3. Events to listen for:
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the signing secret → set as `STRIPE_WEBHOOK_SECRET`

## Local Development with Docker

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: crono
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
```

```bash
docker-compose up -d     # start
docker-compose down      # stop
docker-compose down -v   # stop + wipe data
```

## Scripts

```bash
# Backend
npm run dev        # Start API with nodemon
npm run start      # Start API (production)
npm run worker     # Start BullMQ worker
npm run migrate    # Run database migrations

# Frontend
npm run dev        # Start Next.js dev server
npm run build      # Build for production
npm run start      # Start production server
```

## Roadmap

- [x] Core scheduling engine
- [x] Execution logs
- [x] Email failure alerts
- [x] Stripe billing
- [ ] Slack / Discord alerts
- [ ] Custom retry config per job
- [ ] Job groups / tags
- [ ] Public status page per user
- [ ] Team accounts
- [ ] Webhook trigger (run job on event, not schedule)

## Repository Policy

This is a private SaaS repository.

- Internal development only
- No public contributions accepted
- Distribution and reuse require explicit owner approval

<p align="center">Built by a solo founder. For modern SaaS teams.</p>
