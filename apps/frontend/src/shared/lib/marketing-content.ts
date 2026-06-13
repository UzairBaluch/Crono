import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BellRing,
  CalendarClock,
  Clock,
  CreditCard,
  Globe,
  KeyRound,
  Layers,
  Lock,
  Logs,
  MessageSquare,
  PauseCircle,
  Server,
  ShieldCheck,
  Terminal,
  Timer,
  Webhook,
  Zap,
} from "lucide-react";

export type FeatureCategory =
  | "all"
  | "scheduling"
  | "reliability"
  | "visibility"
  | "developer"
  | "security";

export type FeatureStatus = "live" | "soon";

export interface MarketingFeature {
  category: Exclude<FeatureCategory, "all">;
  status: FeatureStatus;
  title: string;
  description: string;
  icon: LucideIcon;
  demoHref?: string;
}

export const FEATURE_CATEGORIES: { key: FeatureCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "scheduling", label: "Scheduling" },
  { key: "reliability", label: "Reliability" },
  { key: "visibility", label: "Visibility" },
  { key: "developer", label: "Developer" },
  { key: "security", label: "Security" },
];

export const MARKETING_FEATURES: MarketingFeature[] = [
  {
    category: "scheduling",
    status: "live",
    title: "HTTP jobs (GET & POST)",
    description:
      "Call any public URL on a schedule with custom headers and JSON body.",
    icon: Globe,
    demoHref: "#api",
  },
  {
    category: "scheduling",
    status: "live",
    title: "Cron + per-job timezone",
    description:
      "Standard cron expressions with timezone support — e.g. America/New_York.",
    icon: CalendarClock,
    demoHref: "#cron",
  },
  {
    category: "scheduling",
    status: "live",
    title: "Pause & resume instantly",
    description:
      "Stop a job without deleting it. Resume from the dashboard or API.",
    icon: PauseCircle,
    demoHref: "#playground",
  },
  {
    category: "reliability",
    status: "soon",
    title: "Retries with exponential backoff",
    description: "3 attempts by default: 5s → 30s → 2min on transient failures.",
    icon: Zap,
    demoHref: "#reliability",
  },
  {
    category: "reliability",
    status: "soon",
    title: "30s hard timeout",
    description: "Outbound requests abort after 30s so workers never hang.",
    icon: Timer,
    demoHref: "#reliability",
  },
  {
    category: "reliability",
    status: "soon",
    title: "Separate worker process",
    description:
      "API and job execution scale independently — scheduler vs worker.",
    icon: Server,
  },
  {
    category: "reliability",
    status: "soon",
    title: "Missed-run alerts",
    description:
      "Dead man's switch — know when a job didn't fire, not only when it failed.",
    icon: Clock,
    demoHref: "#alerts",
  },
  {
    category: "visibility",
    status: "soon",
    title: "Execution logs",
    description:
      "Every run stored: status, HTTP code, duration, response snippet, errors.",
    icon: Logs,
    demoHref: "#logs-demo",
  },
  {
    category: "visibility",
    status: "soon",
    title: "Log retention by plan",
    description: "7 / 30 / 90 days on Free, Starter, and Pro.",
    icon: Layers,
    demoHref: "#pricing",
  },
  {
    category: "visibility",
    status: "live",
    title: "Health & readiness checks",
    description:
      "GET /api/v1/health — Postgres and Redis verified before traffic routes.",
    icon: Activity,
    demoHref: "#health",
  },
  {
    category: "reliability",
    status: "soon",
    title: "Email failure alerts",
    description: "Resend email when a job fails after all retries.",
    icon: BellRing,
    demoHref: "#alerts",
  },
  {
    category: "reliability",
    status: "soon",
    title: "Slack & Discord webhooks",
    description: "Route failures to the channels your team already monitors.",
    icon: MessageSquare,
    demoHref: "#alerts",
  },
  {
    category: "developer",
    status: "live",
    title: "REST API under /api/v1",
    description: "Full job CRUD — create, list, update, pause, delete.",
    icon: Terminal,
    demoHref: "#api",
  },
  {
    category: "developer",
    status: "live",
    title: "Dual auth: JWT + API keys",
    description:
      "Bearer tokens for the dashboard. cron_… keys for scripts and CI.",
    icon: KeyRound,
    demoHref: "#auth-demo",
  },
  {
    category: "developer",
    status: "live",
    title: "Plan limits enforced server-side",
    description: "3 / 50 / 500 active jobs on Free, Starter, Pro — returns 403.",
    icon: ShieldCheck,
    demoHref: "#plan-demo",
  },
  {
    category: "developer",
    status: "soon",
    title: "Stripe billing",
    description: "Checkout, customer portal, webhooks sync plan to Postgres.",
    icon: CreditCard,
    demoHref: "#pricing",
  },
  {
    category: "security",
    status: "live",
    title: "Tenant isolation",
    description: "Every job scoped to your account — no cross-user access.",
    icon: Lock,
    demoHref: "#playground",
  },
  {
    category: "security",
    status: "soon",
    title: "Signed outbound requests (HMAC)",
    description: "Optional headers so your API verifies calls came from Crono.",
    icon: Webhook,
  },
  {
    category: "security",
    status: "soon",
    title: "SSRF protections",
    description: "Block private IPs and metadata URLs on outbound requests.",
    icon: ShieldCheck,
  },
];

export const PAIN_POINTS = [
  "Broken cron on a VPS fails silently until users notice.",
  "Missed schedules create data drift and delayed workflows.",
  "No execution history means debugging is guesswork at 3am.",
  "Monitoring tools cost $200/mo for what should be a simple HTTP ping.",
];

export const HOW_IT_WORKS = [
  {
    id: "create",
    step: "01",
    title: "Create a job",
    desc: "Add URL, cron schedule, method, headers, and timezone via API or dashboard.",
    demoHref: "#api",
    demoLabel: "Create job demo",
    previewLabel: "POST /api/v1/jobs",
    preview: `curl -X POST http://localhost:4000/api/v1/jobs \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Daily report",
    "url": "https://yourapp.com/api/report",
    "schedule": "0 9 * * *",
    "timezone": "America/New_York"
  }'`,
    response: `{
  "success": true,
  "data": {
    "job": {
      "id": "8f7dd95d-…",
      "name": "Daily report",
      "status": "active"
    }
  }
}`,
  },
  {
    id: "schedule",
    step: "02",
    title: "Crono schedules it",
    desc: "BullMQ repeat jobs fire on time. Worker executes with retries and timeouts.",
    demoHref: "#cron",
    demoLabel: "Cron builder",
    previewLabel: "BullMQ repeat job",
    preview: `// Scheduler registers repeat job
{
  "schedule": "0 9 * * *",
  "timezone": "America/New_York",
  "bull_job_id": "repeat:abc123…"
}`,
    response: `{
  "success": true,
  "data": {
    "status": "active",
    "nextRun": "2026-06-14T09:00:00-04:00"
  }
}`,
  },
  {
    id: "inspect",
    step: "03",
    title: "Inspect & alert",
    desc: "Logs, failure emails, and Slack/Discord when something breaks.",
    demoHref: "#logs-demo",
    demoLabel: "Logs demo",
    previewLabel: "GET /api/v1/jobs/:id/logs",
    preview: `curl http://localhost:4000/api/v1/jobs/<jobId>/logs \\
  -H "Authorization: Bearer <token>"`,
    response: `{
  "success": true,
  "data": {
    "logs": [
      { "status": "success", "http_code": 200, "duration_ms": 143 }
    ]
  }
}`,
  },
];

export const PRICING_PLANS = [
  {
    name: "Free",
    slug: "free",
    tagline: "Try before you ship",
    bestFor: "Side projects & learning",
    priceMonthly: 0,
    priceYearly: 0,
    jobs: 3,
    logRetention: "7 days",
    retries: "3×",
    timeout: "30s",
    alerts: "—",
    apiAccess: true,
    highlights: [
      "3 active jobs",
      "REST API + dashboard",
      "JWT + API keys",
      "Cron validation",
      "7-day log retention",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Starter",
    slug: "starter",
    tagline: "Ship scheduled tasks",
    bestFor: "Indie SaaS & small teams",
    priceMonthly: 9,
    priceYearly: 7,
    jobs: 50,
    logRetention: "30 days",
    retries: "3×",
    timeout: "30s",
    alerts: "Email + webhooks",
    apiAccess: true,
    highlights: [
      "50 active jobs",
      "Email failure alerts",
      "Slack & Discord webhooks",
      "Missed-run alerts",
      "30-day log retention",
    ],
    cta: "Start Starter",
    featured: true,
  },
  {
    name: "Pro",
    slug: "pro",
    tagline: "Scale with confidence",
    bestFor: "Production workloads",
    priceMonthly: 29,
    priceYearly: 23,
    jobs: 500,
    logRetention: "90 days",
    retries: "5×",
    timeout: "30s",
    alerts: "All channels",
    apiAccess: true,
    highlights: [
      "500 active jobs",
      "Priority infrastructure",
      "HMAC signed requests",
      "5× retries",
      "90-day log retention",
    ],
    cta: "Go Pro",
    featured: false,
  },
];

export const PRICING_COMPARE_ROWS = [
  { label: "Active jobs", free: "3", starter: "50", pro: "500" },
  { label: "Log retention", free: "7 days", starter: "30 days", pro: "90 days" },
  { label: "Retries", free: "3×", starter: "3×", pro: "5×" },
  { label: "Email alerts", free: false, starter: true, pro: true },
  { label: "Slack / Discord", free: false, starter: true, pro: true },
  { label: "Missed-run alerts", free: false, starter: true, pro: true },
  { label: "HMAC signing", free: false, starter: false, pro: true },
  { label: "API access", free: true, starter: true, pro: true },
];

export const CRON_BUILDER_PRESETS = [
  { label: "Every minute", cron: "* * * * *", human: "Runs every minute", next: "in 42 sec" },
  { label: "Every 5 min", cron: "*/5 * * * *", human: "Runs every 5 minutes", next: "in 3 min" },
  { label: "Hourly", cron: "0 * * * *", human: "Runs at minute 0 every hour", next: "in 18 min" },
  { label: "Daily 9am", cron: "0 9 * * *", human: "Runs daily at 9:00 AM", next: "tomorrow 9:00" },
  { label: "Weekdays 9am", cron: "0 9 * * 1-5", human: "Mon–Fri at 9:00 AM", next: "Mon 9:00" },
  { label: "Monthly", cron: "0 0 1 * *", human: "1st of every month at midnight", next: "Jul 1" },
] as const;

export const AUTH_DEMO = {
  register: {
    endpoint: "POST /api/v1/auth/register → 201",
    request: `curl -X POST http://localhost:4000/api/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "you@startup.com",
    "password": "securepassword123"
  }'`,
    response: `{
  "success": true,
  "data": {
    "token": "eyJhbGci…",
    "user": {
      "email": "you@startup.com",
      "plan": "free",
      "api_key": "cron_live_…"
    }
  }
}`,
  },
  login: {
    endpoint: "POST /api/v1/auth/login → 200",
    request: `curl -X POST http://localhost:4000/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "you@startup.com",
    "password": "securepassword123"
  }'`,
    response: `{
  "success": true,
  "data": {
    "token": "eyJhbGci…",
    "user": {
      "email": "you@startup.com",
      "plan": "free"
    }
  }
}`,
  },
};

export const LOGS_DEMO_ENTRIES = [
  { id: "1", job: "billing-sync", status: "success" as const, code: 200, ms: 143, time: "2m ago" },
  { id: "2", job: "user-prune", status: "failed" as const, code: 504, ms: 30012, time: "7m ago" },
  { id: "3", job: "health-check", status: "success" as const, code: 200, ms: 86, time: "12m ago" },
  { id: "4", job: "weekly-report", status: "retrying" as const, code: 502, ms: 2100, time: "15m ago" },
  { id: "5", job: "sync-users", status: "success" as const, code: 201, ms: 221, time: "1h ago" },
];

export const VALUE_STATS = [
  {
    label: "Avg setup time",
    value: "< 2 min",
    hint: "Register → first job",
    href: "#auth-demo",
  },
  {
    label: "Free plan jobs",
    value: "3",
    hint: "No credit card",
    href: "#plan-demo",
  },
  {
    label: "API endpoints",
    value: "12+",
    hint: "Auth + jobs + health",
    href: "#api",
  },
  {
    label: "Retry attempts",
    value: "3×",
    hint: "Exponential backoff",
    href: "#reliability",
  },
];

export const FAQS = [
  {
    q: "What is Crono?",
    a: "Crono schedules HTTP jobs and gives you execution logs, retries, and failure alerts in one place — no VPS cron required.",
    category: "product" as const,
    related: { href: "#api", label: "Try create job demo" },
  },
  {
    q: "What's live today vs coming soon?",
    a: "Job CRUD, auth, plan limits, and cron validation are live. Scheduler, worker, logs, alerts, and billing ship in upcoming phases.",
    category: "product" as const,
    related: { href: "#features", label: "See feature grid" },
  },
  {
    q: "Can I use the API instead of the dashboard?",
    a: "Yes. Create and manage jobs with JWT (dashboard) or x-api-key (scripts/CI). Full REST API under /api/v1.",
    category: "api" as const,
    related: { href: "#auth-demo", label: "Auth demo" },
  },
  {
    q: "What happens when a job fails?",
    a: "Failures are logged with HTTP status and duration. After retries exhaust, email and webhook alerts fire (Starter+).",
    category: "api" as const,
    related: { href: "#reliability", label: "Retry simulator" },
  },
  {
    q: "How do plan limits work?",
    a: "Free plan allows 3 active jobs. Creating a 4th returns 403 Plan limit reached. Upgrade via Stripe when billing ships.",
    category: "billing" as const,
    related: { href: "#plan-demo", label: "Try plan limit demo" },
  },
  {
    q: "Do you support timezones?",
    a: "Yes. Each job accepts a timezone field (default UTC) so schedules run in your local business hours.",
    category: "api" as const,
    related: { href: "#cron", label: "Cron builder" },
  },
];

export type FaqCategory = "all" | "product" | "api" | "billing";

export const FAQ_CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "product", label: "Product" },
  { id: "api", label: "API" },
  { id: "billing", label: "Billing" },
];

export const SCHEDULE_PRESETS = [
  { label: "Every 5 min", cron: "*/5 * * * *" },
  { label: "Hourly", cron: "0 * * * *" },
  { label: "Daily 9am", cron: "0 9 * * *" },
] as const;

export const API_EXAMPLES = {
  jwt: `curl -X POST http://localhost:4000/api/v1/jobs \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Daily report",
    "url": "https://yourapp.com/api/report",
    "method": "POST",
    "schedule": "0 9 * * *",
    "timezone": "America/New_York"
  }'`,
  apiKey: `curl -X POST http://localhost:4000/api/v1/jobs \\
  -H "x-api-key: cron_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Sync users",
    "url": "https://yourapp.com/api/sync",
    "schedule": "*/15 * * * *"
  }'`,
};

export const API_RESPONSES = {
  "201": `{
  "success": true,
  "data": {
    "job": {
      "id": "8f7dd95d-4739-44a6-abd8-db1506d79a7c",
      "name": "Daily report",
      "status": "active",
      "schedule": "0 9 * * *"
    }
  }
}`,
  "403": `{
  "success": false,
  "message": "Plan limit reached"
}`,
  "400": `{
  "success": false,
  "message": "Invalid cron schedule"
}`,
};

export const CRUD_PLAYGROUND = {
  list: {
    endpoint: "GET /api/v1/jobs → 200",
    request: `curl http://localhost:4000/api/v1/jobs \\
  -H "Authorization: Bearer <token>"`,
    responses: {
      "200": `{
  "success": true,
  "data": {
    "jobs": [
      { "id": "…", "name": "Ping health", "status": "active" },
      { "id": "…", "name": "Sync users", "status": "paused" }
    ]
  }
}`,
    },
    statusCards: [
      { id: "200", code: "200", label: "Jobs list", tone: "success" as const },
    ],
  },
  pause: {
    endpoint: "PATCH /api/v1/jobs/:id → 200",
    request: `curl -X PATCH http://localhost:4000/api/v1/jobs/<jobId> \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{ "status": "paused" }'`,
    responses: {
      "200": `{
  "success": true,
  "data": {
    "job": {
      "id": "8f7dd95d-…",
      "name": "Ping health",
      "status": "paused"
    }
  }
}`,
      "404": `{
  "success": false,
  "message": "Job not found"
}`,
    },
    statusCards: [
      { id: "200", code: "200", label: "Job paused", tone: "success" as const },
      { id: "404", code: "404", label: "Not found", tone: "error" as const },
    ],
  },
  delete: {
    endpoint: "DELETE /api/v1/jobs/:id → 200",
    request: `curl -X DELETE http://localhost:4000/api/v1/jobs/<jobId> \\
  -H "Authorization: Bearer <token>"`,
    responses: {
      "200": `{
  "success": true,
  "data": { "deleted": true }
}`,
      "404": `{
  "success": false,
  "message": "Job not found"
}`,
    },
    statusCards: [
      { id: "200", code: "200", label: "Job deleted", tone: "success" as const },
      { id: "404", code: "404", label: "Not found", tone: "error" as const },
    ],
  },
};

export const RETRY_STEPS = [
  {
    id: "attempt1",
    label: "Attempt 1",
    endpoint: "POST /sync → failed",
    logs: [
      { text: "[09:00:00] POST https://api.app.com/sync", tone: "neutral" as const },
      { text: "[09:00:02] ← 502 Bad Gateway (2100ms)", tone: "error" as const },
      { text: "[09:00:02] Retry in 5s…", tone: "warning" as const },
    ],
  },
  {
    id: "attempt2",
    label: "Attempt 2",
    endpoint: "Retry after 5s",
    logs: [
      { text: "[09:00:07] Retry 2/3 — POST /sync", tone: "neutral" as const },
      { text: "[09:00:09] ← 504 Gateway Timeout", tone: "error" as const },
      { text: "[09:00:09] Retry in 30s…", tone: "warning" as const },
    ],
  },
  {
    id: "attempt3",
    label: "Attempt 3",
    endpoint: "Retry after 30s → success",
    logs: [
      { text: "[09:00:39] Retry 3/3 — POST /sync", tone: "neutral" as const },
      { text: "[09:00:39] ← 200 OK (124ms)", tone: "success" as const },
      { text: "[09:00:39] Run logged · alert skipped", tone: "success" as const },
    ],
  },
  {
    id: "exhausted",
    label: "All failed",
    endpoint: "Retries exhausted → alert",
    logs: [
      { text: "[09:01:00] All 3 attempts failed", tone: "error" as const },
      { text: "[09:01:00] Log saved · duration 62s", tone: "neutral" as const },
      { text: "[09:01:01] ✉ Email alert sent to you@team.com", tone: "warning" as const },
    ],
  },
];

export const ALERT_PREVIEWS = {
  email: {
    title: "Email alert",
    subject: "[Crono] Job failed: billing-sync",
    body: `Your job "billing-sync" failed after 3 retries.

Last error: 504 Gateway Timeout
Endpoint: POST https://api.app.com/billing/sync
Fired at: 2026-06-13 09:01 UTC

View logs → dashboard.crono.dev/logs`,
  },
  slack: {
    title: "Slack webhook",
    body: `🔴 *Job failed* — billing-sync
\`POST\` https://api.app.com/billing/sync
Status: 504 · Attempts: 3/3
<https://dashboard.crono.dev/logs|View logs>`,
  },
  discord: {
    title: "Discord webhook",
    body: `**Job Failed: billing-sync**
Method: POST
URL: https://api.app.com/billing/sync
HTTP: 504 Gateway Timeout
Retries: 3/3 exhausted`,
  },
};

