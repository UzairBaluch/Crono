"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  BellRing,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Clock,
  Globe,
  Logs,
  Menu,
  MessageSquare,
  Moon,
  ShieldCheck,
  Sun,
  Terminal,
  X,
  Zap
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { ExecutionPreviewLogs } from "@/shared/components/marketing/execution-preview-logs";
import { designTokens, themeClasses } from "@/lib/theme";

const features = [
  {
    category: "reliability",
    title: "Recover from transient failures automatically",
    description: "Retries with exponential backoff keep schedules reliable without manual reruns.",
    icon: Zap
  },
  {
    category: "visibility",
    title: "See exactly what happened on every run",
    description: "Execution logs include timestamps, status codes, retries, and response time.",
    icon: Logs
  },
  {
    category: "reliability",
    title: "Get alerted before incidents escalate",
    description: "Email on failure, optional Slack and Discord webhooks, and missed-run alerts if a job never fired.",
    icon: BellRing
  },
  {
    category: "reliability",
    title: "Missed-run alerts",
    description:
      "Dead man's switch — know when a job did not run on schedule, not only when an execution fails.",
    icon: Clock
  },
  {
    category: "scheduling",
    title: "Schedule with standard cron expressions",
    description: "Run hourly, daily, weekly, or custom schedules with familiar cron syntax.",
    icon: CalendarClock
  },
  {
    category: "developer",
    title: "Manage jobs through API or dashboard",
    description: "Create and maintain schedules programmatically when shipping from CI or code.",
    icon: Terminal
  },
  {
    category: "reliability",
    title: "Run on infrastructure built for consistency",
    description: "Distributed execution keeps jobs predictable across environments and regions.",
    icon: Globe
  },
  {
    category: "visibility",
    title: "Readiness checks for deploys",
    description:
      "Health endpoints verify Postgres and Redis so load balancers only route traffic when Crono can run jobs.",
    icon: Activity
  },
  {
    category: "developer",
    title: "Signed outbound requests",
    description: "Optional HMAC headers so your API can verify HTTP calls truly came from Crono.",
    icon: ShieldCheck
  },
  {
    category: "developer",
    title: "Slack and Discord alerts",
    description: "Send failure notifications to the channels your team already monitors.",
    icon: MessageSquare
  }
];

const faqs = [
  {
    q: "What is Crono?",
    a: "Crono schedules HTTP jobs and gives teams execution logs, retries, and failure visibility in one place."
  },
  {
    q: "How reliable is execution?",
    a: "Crono is built for production workloads with tracked runs, retry controls, and transparent execution history."
  },
  {
    q: "Can I use API instead of dashboard?",
    a: "Yes. You can create and manage jobs through API for automated workflows and CI-driven setup."
  },
  {
    q: "What happens if a job fails?",
    a: "Failures are recorded instantly, shown in logs, and can trigger alert channels for fast response."
  },
  {
    q: "Do you support retries?",
    a: "Yes. Crono supports retries with exponential backoff to recover from transient endpoint failures."
  },
  {
    q: "Is there a free tier?",
    a: "Yes. The Free plan includes up to 3 active jobs so teams can evaluate without a credit card."
  }
];

const schedulePresets = [
  { label: "Every 5 min", cron: "*/5 * * * *" },
  { label: "Hourly", cron: "0 * * * *" },
  { label: "Daily", cron: "0 0 * * *" }
] as const;

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [activePreset, setActivePreset] = useState(0);
  const [activeFeatureFilter, setActiveFeatureFilter] = useState<"all" | "reliability" | "developer" | "visibility" | "scheduling">("all");
  const [isYearly, setIsYearly] = useState(false);
  const [featureTransitionKey, setFeatureTransitionKey] = useState(0);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("crono-theme");
    const useLight = savedTheme === "light";
    setIsLight(useLight);
    document.documentElement.classList.toggle("theme-light", useLight);
  }, []);

  function toggleTheme() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("theme-light", next);
    window.localStorage.setItem("crono-theme", next ? "light" : "dark");
  }

  const filteredFeatures =
    activeFeatureFilter === "all"
      ? features
      : features.filter((feature) => feature.category === activeFeatureFilter);

  useEffect(() => {
    setFeatureTransitionKey((current) => current + 1);
  }, [activeFeatureFilter]);

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 md:px-6">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Crono
          </Link>
          <nav className="ml-8 hidden items-center gap-6 text-sm text-muted md:flex">
            <Link href="#" className="transition-colors duration-200 hover:text-foreground">
              Docs
            </Link>
            <Link href="#features" className="transition-colors duration-200 hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="transition-colors duration-200 hover:text-foreground">
              Pricing
            </Link>
            <Link href="#" className="transition-colors duration-200 hover:text-foreground">
              GitHub
            </Link>
          </nav>
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <button
              onClick={toggleTheme}
              className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 bg-card/60 text-muted transition-colors hover:bg-hover hover:text-foreground"
              aria-label="Theme"
            >
              {isLight ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
            </button>
            <Link
              href="/dashboard"
              className="focus-ring inline-flex h-9 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-hover"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="focus-ring inline-flex h-9 items-center justify-center rounded-xl bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              Sign Up
            </Link>
          </div>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="focus-ring ml-auto inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 bg-card/80 transition-colors hover:bg-hover md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-border/70 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2 text-sm">
              <Link href="#" className="rounded-xl px-3 py-2 text-muted transition-colors hover:bg-hover hover:text-foreground">
                Docs
              </Link>
              <Link href="#features" className="rounded-xl px-3 py-2 text-muted transition-colors hover:bg-hover hover:text-foreground">
                Features
              </Link>
              <Link href="#pricing" className="rounded-xl px-3 py-2 text-muted transition-colors hover:bg-hover hover:text-foreground">
                Pricing
              </Link>
              <Link href="#" className="rounded-xl px-3 py-2 text-muted transition-colors hover:bg-hover hover:text-foreground">
                GitHub
              </Link>
              <div className="mt-3 flex gap-2">
                <Link
                  href="/dashboard"
                  className="focus-ring inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-hover"
                >
                  Login
                </Link>
                <Link
                  href="/dashboard"
                  className="focus-ring inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <section className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex rounded-full border border-border/80 bg-card/60 px-3 py-1 text-xs font-medium text-muted">
              Infrastructure Scheduling
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-[3.35rem] md:leading-[1.03]">
              Reliable scheduling for production HTTP jobs.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-[1.06rem]">
              Run scheduled endpoints with retry controls, execution logs, and failure visibility your team can trust.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="focus-ring inline-flex h-10 min-w-28 items-center justify-center rounded-xl bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                Start Free
              </Link>
              <Link
                href="#"
                className="focus-ring inline-flex h-10 min-w-40 items-center justify-center rounded-2xl border border-border/80 bg-card/70 px-5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-hover"
              >
                View Documentation
              </Link>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs text-muted">Try a schedule preset</p>
              <div className="flex flex-wrap gap-2">
                {schedulePresets.map((preset, index) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setActivePreset(index)}
                    className={`${themeClasses.chip.base} ${
                      activePreset === index
                        ? themeClasses.chip.active
                        : themeClasses.chip.inactive
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <p className={`mt-2 ${designTokens.typography.mono} text-xs text-muted`}>
                cron: <span className="text-foreground">{schedulePresets[activePreset].cron}</span>
              </p>
            </div>
          </div>
          <ExecutionPreviewLogs />
        </section>

        <section className="mt-28 md:mt-32">
          <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">When cron runs quietly, failures ship loudly.</h2>
          <div className="mt-8 grid gap-3.5 md:grid-cols-2">
            {[
              "Broken cron jobs on servers are hard to detect before users notice.",
              "Missed scheduled tasks create data drift and delayed critical workflows.",
              "Silent failures in production leave teams debugging after incidents.",
              "Without logs and visibility, reliability becomes guesswork."
            ].map((pain) => (
              <Card key={pain} className="rounded-2xl border-border/80 bg-card/65 p-5 transition-colors duration-200 hover:bg-card-secondary/70">
                <div className="flex items-start gap-3.5">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-blue-400/90" />
                  <p className="text-sm leading-relaxed text-muted">{pain}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="features" className="mt-28 md:mt-32">
          <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">Built for production scheduling.</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { key: "all", label: "All" },
              { key: "reliability", label: "Reliability" },
              { key: "visibility", label: "Visibility" },
              { key: "scheduling", label: "Scheduling" },
              { key: "developer", label: "Developer UX" }
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveFeatureFilter(item.key as typeof activeFeatureFilter)}
                className={`${themeClasses.tabs.base} ${
                  activeFeatureFilter === item.key
                    ? themeClasses.tabs.active
                    : themeClasses.tabs.inactive
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div key={featureTransitionKey} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-[fadeTab_220ms_ease-out]">
            {filteredFeatures.map((feature) => (
              <Card
                key={feature.title}
                className="rounded-2xl border-border/80 bg-card/65 p-6 transition-colors duration-200 hover:bg-card-secondary/70"
              >
                <feature.icon className="h-4 w-4 text-blue-400/90" />
                <h3 className="mt-4 text-[1.02rem] font-medium leading-snug tracking-tight">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-28 md:mt-32">
          <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">How it works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { step: "01", title: "Create job", desc: "Add your endpoint URL and cron schedule in seconds." },
              { step: "02", title: "Crono executes", desc: "Jobs run automatically on schedule with reliable infrastructure." },
              { step: "03", title: "Inspect outcomes", desc: "Track logs, failures, retries, and response behavior instantly." }
            ].map((item) => (
              <Card
                key={item.step}
                className="rounded-2xl border-border/80 bg-card/65 p-6 transition-colors duration-200 hover:bg-card-secondary/70"
              >
                <p className="font-mono text-xs tracking-wide text-blue-400/90">{item.step}</p>
                <h3 className="mt-3 text-base font-medium tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="pricing" className="mt-28 md:mt-32">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">Simple pricing</h2>
            <div className={themeClasses.pricingToggle.wrapper}>
              <button
                type="button"
                onClick={() => setIsYearly(false)}
                className={`${designTokens.radius.lg} px-3 py-1.5 transition-colors ${
                  !isYearly ? themeClasses.pricingToggle.active : themeClasses.pricingToggle.inactive
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsYearly(true)}
                className={`${designTokens.radius.lg} px-3 py-1.5 transition-colors ${
                  isYearly ? themeClasses.pricingToggle.active : themeClasses.pricingToggle.inactive
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <Card className="rounded-2xl border-border/80 bg-card/65 p-6">
              <p className="text-sm font-medium tracking-tight">Free</p>
              <p className="mt-4 text-3xl font-medium tracking-tight">$0</p>
              <p className="mt-1 text-sm text-muted">3 jobs</p>
              <ul className="mt-5 space-y-2.5 text-sm text-muted">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-blue-400/90" />Basic logs</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-blue-400/90" />Dashboard access</li>
              </ul>
              <Button className="mt-7 h-10 w-full">Start Free</Button>
            </Card>
            <Card className="rounded-2xl border-blue-400/40 bg-card-secondary/80 p-6 shadow-[0_0_0_1px_rgba(59,130,246,0.15)]">
              <p className="inline-flex rounded-full border border-blue-400/35 bg-blue-500/5 px-2.5 py-1 text-xs text-blue-300">Most Popular</p>
              <p className="mt-4 text-sm font-medium tracking-tight">Starter</p>
              <p className="mt-4 text-3xl font-medium tracking-tight">
                ${isYearly ? "7" : "9"}<span className="ml-1 text-sm font-normal text-muted">/{isYearly ? "month (yearly)" : "month"}</span>
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-muted">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-blue-400/90" />Unlimited schedules</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-blue-400/90" />Retries + alerts</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-blue-400/90" />Webhook notifications</li>
              </ul>
              <Button className="mt-7 h-10 w-full">Upgrade</Button>
            </Card>
            <Card className="rounded-2xl border-border/80 bg-card/65 p-6">
              <p className="text-sm font-medium tracking-tight">Pro</p>
              <p className="mt-4 text-3xl font-medium tracking-tight">
                ${isYearly ? "23" : "29"}<span className="ml-1 text-sm font-normal text-muted">/{isYearly ? "month (yearly)" : "month"}</span>
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-muted">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-blue-400/90" />Team workspaces</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-blue-400/90" />Priority infrastructure</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-blue-400/90" />Advanced API limits</li>
              </ul>
              <Button variant="secondary" className="mt-7 h-10 w-full">Upgrade</Button>
            </Card>
          </div>
        </section>

        <section className="mt-28 md:mt-32">
          <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">FAQ</h2>
          <div className="mt-8 space-y-2.5">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-border/80 bg-card/65 p-5 transition-colors duration-200 hover:bg-card-secondary/70"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium tracking-tight">
                  {faq.q}
                  <ChevronDown className="h-4 w-4 text-muted transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3.5 max-w-3xl text-sm leading-relaxed text-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <footer className="border-t border-border/70 bg-card/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm md:grid-cols-4 md:gap-12 md:px-6">
          <div>
            <p className="font-medium tracking-tight">Crono</p>
            <p className="mt-2 max-w-52 text-muted">Reliable scheduling infrastructure for modern teams.</p>
          </div>
          <div>
            <p className="font-medium tracking-tight">Product</p>
            <div className="mt-3 space-y-1.5 text-muted">
              <p>Docs</p>
              <p>Pricing</p>
              <p>API</p>
            </div>
          </div>
          <div>
            <p className="font-medium tracking-tight">Company</p>
            <div className="mt-3 space-y-1.5 text-muted">
              <p>About</p>
              <p>GitHub</p>
              <p>Status</p>
            </div>
          </div>
          <div>
            <p className="font-medium tracking-tight">Resources</p>
            <div className="mt-3 space-y-1.5 text-muted">
              <p>Blog</p>
              <p>Support</p>
            </div>
          </div>
        </div>
        <div className="border-t border-border/70 px-4 py-4 text-center text-xs text-muted md:px-6">
          © 2026 Crono. All rights reserved.
        </div>
      </footer>
      <style jsx>{`
        @keyframes fadeTab {
          from {
            opacity: 0;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
