# Roadmap

Public roadmap for the repo. Your working copy with checkboxes: `CRONO_BUILD_CHECKLIST.md` (local, gitignored).

**Strategy:** One deep project — polish every backend feature locally, **deploy last (Phase 37)**.

**Next:** Phase 13 — [30s fetch timeout](#phase-13--30s-fetch-timeout)

**Skip:** Stripe billing, Slack/Discord.

---

## Shipped ✅ (Phases 1–12)

DB, queue, shared, Express scaffold, auth, jobs CRUD, plan limits, BullMQ scheduler, worker, executor, logs API, dashboard UI, email failure alerts, forgot password.

---

## A — Reliability

| Phase | Feature | Concept |
|:-----:|---------|---------|
| 13 | 30s fetch timeout | `AbortSignal`, hung request handling |
| 14 | HTTP 4xx/5xx → failed | Executor semantics *(before retries)* |
| 15 | Retries + exponential backoff | BullMQ, `attempt`, backoff |
| 16 | Dashboard stats | Aggregating logs in API |

<details>
<summary>Phase details</summary>

### Phase 13 — 30s fetch timeout
- [ ] `AbortSignal.timeout(30_000)` on worker `fetch`
- [ ] Failed log + email on timeout

### Phase 14 — HTTP 4xx/5xx → failed
- [ ] `!response.ok` → failed status
- [ ] **Do before Phase 15** — retries need correct failure definition

### Phase 15 — Retries + exponential backoff
- [ ] `retry_count` → queue / executor
- [ ] Log each `attempt`

### Phase 16 — Dashboard stats
- [ ] Last run + failed count API + UI

</details>

---

## B — Distributed systems

| Phase | Feature | Concept |
|:-----:|---------|---------|
| 17 | Cursor pagination | Why offset breaks at scale |
| 18 | Idempotency keys | Exactly-once `POST /jobs` |
| 19 | Compensating transactions | Saga: Postgres + BullMQ |
| 20 | Audit / event log | Event-driven, append-only |

<details>
<summary>Phase details</summary>

### Phase 17 — Cursor pagination
- [ ] `GET /logs` with `cursor` + `limit`
- [ ] `nextCursor` / `hasMore` in response

### Phase 18 — Idempotency keys
- [ ] `Idempotency-Key` header on `POST /jobs`
- [ ] Dedupe within TTL

### Phase 19 — Compensating transactions
- [ ] Roll back DB if BullMQ schedule fails
- [ ] **Read transactional outbox pattern first** — production-safe saga

### Phase 20 — Audit / event log
- [ ] `AuditEvent` model + `GET /audit` (tenant-scoped)

</details>

---

## C — Real-time & webhooks

| Phase | Feature | Concept |
|:-----:|---------|---------|
| 21 | WebSockets + Redis pub/sub | Live logs, pub/sub |
| 22 | Signed inbound webhooks | HMAC verify, replay prevention |
| 23 | Outbound HMAC signing | Signed outbound HTTP |

---

## D — Security & data lifecycle

| Phase | Feature | Concept |
|:-----:|---------|---------|
| 24 | Log retention cleanup | Scheduled deletes by plan |
| 25 | SSRF protections | Block private IPs on fetch |
| 26 | Helmet + rate limits | API hardening |
| 27 | Missed-run alerts | Dead man's switch |

---

## E — Auth & search

| Phase | Feature | Concept |
|:-----:|---------|---------|
| 28 | OAuth (GitHub) | OAuth2, linked identities |
| 29 | Full-text search | Postgres `tsvector`, GIN indexes |

---

## F — Production ops

| Phase | Feature | Concept |
|:-----:|---------|---------|
| 30 | Readiness health + structured logs | Liveness vs readiness, `requestId` |
| 31 | Graceful shutdown | SIGTERM, drain workers |
| 32 | BullMQ dead-letter handling | Failed job visibility |
| 33 | Tests (Jest + Supertest + Testcontainers) | Unit, HTTP, real infra |
| 34 | CI/CD (GitHub Actions) | Automated build + test on every PR |

---

## G — Stretch (optional)

Skip 35–36 if motivation is low — **Phases 1–34 + deploy is already exceptional.**

| Phase | Feature | Concept |
|:-----:|---------|---------|
| 35 | File uploads (multipart) | Streams, memory limits |
| 36 | Read replica routing | Read/write split, lag |

---

## H — Deploy *(last)*

| Phase | Feature |
|:-----:|---------|
| 37 | Railway + Vercel + prod smoke test |

Step-by-step: [deploy.md](./deploy.md)

---

## Suggested pace

```txt
Month 1–2   → Phases 13–20 (reliability + distributed systems)
Month 2–3   → Phases 21–29 (real-time, security, auth depth)
Month 3+    → Phases 30–34 (ops + tests), then 37 deploy
Stretch     → 35–36 optional; deploy after 34 is fine
```

One phase at a time. Same repo, stronger CV story each month.
