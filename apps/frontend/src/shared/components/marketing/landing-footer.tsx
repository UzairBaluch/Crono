"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Mail,
  Radio,
} from "lucide-react";
import { CronoLogo } from "@/shared/components/crono-logo";
import { SCHEDULE_PRESETS } from "@/shared/lib/marketing-content";
import { cn } from "@/shared/lib/utils";

const FOOTER_COLUMNS = [
  {
    title: "Demos",
    links: [
      { href: "#api", label: "Create job" },
      { href: "#cron", label: "Cron builder" },
      { href: "#logs-demo", label: "Execution logs" },
      { href: "#plan-demo", label: "Plan limits" },
    ],
  },
  {
    title: "App",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/jobs", label: "Jobs" },
      { href: "/logs", label: "Logs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
      { href: "#contact", label: "Contact & feedback" },
    ],
  },
] as const;

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
    >
      <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
      <span className="transition-transform group-hover:translate-x-0.5">
        {label}
      </span>
    </Link>
  );
}

export function LandingFooter() {
  const [presetIndex, setPresetIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribeState, setSubscribeState] = useState<
    "idle" | "submitting" | "done"
  >("idle");
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPresetIndex((i) => (i + 1) % SCHEDULE_PRESETS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function onScroll() {
      setShowBackTop(window.scrollY > 600);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribeState("submitting");
    await new Promise((r) => setTimeout(r, 700));
    setSubscribeState("done");
  }

  const preset = SCHEDULE_PRESETS[presetIndex];

  return (
    <footer className="relative mt-28 overflow-hidden border-t border-border/70 bg-card/60 md:mt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-muted/40 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <CronoLogo size={32} showWordmark />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Reliable scheduled HTTP jobs for indie SaaS and backend teams.
              Explore the demos above — no signup required.
            </p>

            <Link
              href="#health"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/10 px-3 py-1.5 text-xs font-medium text-success transition-all hover:border-success/40 hover:bg-success/15 active:scale-95"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              All systems operational
              <Radio className="h-3 w-3 opacity-70" />
            </Link>

            <div className="mt-6 rounded-2xl border border-border/80 bg-background/50 p-4">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                Next run preview
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  key={preset.label}
                  className="animate-scale-in rounded-lg bg-accent-subtle/50 px-2.5 py-1 text-xs font-medium text-accent"
                >
                  {preset.label}
                </span>
                <code className="rounded-lg border border-border/80 bg-card/80 px-2.5 py-1 font-mono text-xs text-foreground transition-all">
                  {preset.cron}
                </code>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-background/40 p-5">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <p className="text-sm font-medium">Launch updates</p>
            </div>
            <p className="mt-1 text-xs text-muted">
              Get notified when scheduler, alerts, and billing ship.
            </p>

            {subscribeState === "done" ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-success/25 bg-success/10 px-3 py-3 text-sm text-success">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                You&apos;re on the list — demo only for now.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="focus-ring h-10 min-w-0 flex-1 rounded-xl border border-border/80 bg-card/80 px-3 text-sm placeholder:text-muted/60"
                />
                <button
                  type="submit"
                  disabled={subscribeState === "submitting"}
                  className="focus-ring btn-primary inline-flex h-10 shrink-0 items-center justify-center rounded-xl px-4 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                >
                  {subscribeState === "submitting" ? "…" : "Notify me"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3 md:gap-12">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-medium tracking-tight">{col.title}</p>
              <div className="mt-3 flex flex-col gap-2.5 text-sm">
                {col.links.map((link) => (
                  <FooterLink key={link.href} {...link} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-t border-border/70 px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <p>© 2026 Crono. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#contact" className="transition-colors hover:text-accent">
              Feedback
            </Link>
            <Link href="#pricing" className="transition-colors hover:text-accent">
              Pricing
            </Link>
            <Link href="/dashboard" className="transition-colors hover:text-accent">
              Open app
            </Link>
          </div>
        </div>

        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cn(
            "focus-ring fixed bottom-6 right-6 z-40 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-card/90 text-foreground shadow-lg backdrop-blur transition-all duration-300 hover:border-accent-muted/40 hover:bg-accent-subtle/50 hover:text-accent active:scale-95",
            showBackTop
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0",
          )}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
}
