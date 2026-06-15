# Development

## Prerequisites

- Node.js 18+
- Docker (Postgres + Redis)

## First-time setup

```bash
git clone https://github.com/UzairBaluch/Crono.git
cd Crono
npm install
cp .env.example .env
```

Edit `.env`:

| Variable | Local value |
|----------|-------------|
| `DATABASE_URL` | Postgres on port **5433** (see `docker-compose.yml`) |
| `REDIS_URL` | `redis://localhost:6379` |
| `JWT_SECRET` | 32+ random characters |
| `APP_URL` | `http://localhost:3000` |
| `PORT` | `4000` (optional) |

```bash
docker compose up -d
npm run db:migrate -w @crono/db
npm run build -w @crono/shared
```

## Run everything

Open three terminals:

```bash
npm run dev -w backend    # :4000
npm run dev -w worker     # queue consumer
npm run dev -w frontend   # :3000
```

## Useful commands

```bash
npm run db:studio -w @crono/db   # inspect User / Job / Log tables
npm run build -w backend
npm run build -w worker
```

## Workspaces

| Workspace | Package name | What it does |
|-----------|--------------|--------------|
| `apps/backend` | `backend` | Express API |
| `apps/worker` | `worker` | BullMQ worker |
| `apps/frontend` | `frontend` | Next.js UI |
| `packages/db` | `@crono/db` | Prisma |
| `packages/queue` | `@crono/queue` | BullMQ + Redis |
| `packages/shared` | `@crono/shared` | Shared constants + utils |

After changing `@crono/shared` or `@crono/db`, rebuild before running backend/worker:

```bash
npm run build -w @crono/shared
npm run build -w @crono/db
```

## Manual smoke test

1. `POST /api/v1/auth/register` → save `token`
2. `POST /api/v1/jobs` with Bearer token — use `*/5 * * * *` for a quick test
3. Confirm worker logs in terminal
4. `GET /api/v1/jobs/:id/logs` → rows with `status` + `http_status`
5. Dashboard: login → job appears → logs tab shows data

## Common issues

| Symptom | Check |
|---------|--------|
| Worker connects but no logs | Job `status` must be `active`; worker must be running |
| `Job completed` but no Log row | Orphan BullMQ job — job deleted from DB but repeat key still in Redis |
| DB connection error | Docker up? `DATABASE_URL` port **5433**? |
| CORS error from frontend | `APP_URL` matches frontend origin (`http://localhost:3000`) |
| Env not loaded in worker | Dev script uses `--env-file=../../.env` |

## Adding a new API feature

1. Zod schema in `validations/`
2. Repository method(s) in `repositories/`
3. Service rules in `services/`
4. Controller in `controllers/`
5. Route in `routes/v1/` — mount in `routes/v1/index.ts`

Prisma only in step 2.
