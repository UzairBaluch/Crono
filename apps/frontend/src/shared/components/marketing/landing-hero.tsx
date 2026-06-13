"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ExecutionPreviewLogs } from "@/shared/components/marketing/execution-preview-logs";
import { SCHEDULE_PRESETS } from "@/shared/lib/marketing-content";
import { designTokens, themeClasses } from "@/shared/lib/theme";

interface LandingHeroProps {
  activePreset: number;
  onPresetChange: (index: number) => void;
}

const TRUST_ITEMS = [
  "3 jobs free — no credit card",
  "JWT + API key auth",
  "Plan limits enforced in API",
];

function padTime(n: number) {
  return String(n).padStart(2, "0");
}

function nowStamp() {
  const d = new Date();
  return `${padTime(d.getHours())}:${padTime(d.getMinutes())}:${padTime(d.getSeconds())}`;
}

export function LandingHero({
  activePreset,
  onPresetChange,
}: LandingHeroProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [runMode, setRunMode] = useState(false);
  const [runLogs, setRunLogs] = useState<
    { id: string; text: string; tone: "default" | "success" | "error" | "warning" }[]
  >([]);

  const preset = SCHEDULE_PRESETS[activePreset];

  const handleRun = useCallback(async () => {
    setRunMode(true);
    setIsRunning(true);
    setRunLogs([]);

    const stepDefs = [
      { text: `Scheduled "${preset.label}" (${preset.cron})`, tone: "default" as const, delay: 0 },
      { text: "POST https://api.app.com/sync → firing…", tone: "default" as const, delay: 450 },
      { text: "← 502 Bad Gateway (2100ms)", tone: "error" as const, delay: 550 },
      { text: "Retry in 5s…", tone: "warning" as const, delay: 350 },
      { text: "Retry succeeded → 200 OK (124ms)", tone: "success" as const, delay: 700 },
    ];

    for (let i = 0; i < stepDefs.length; i++) {
      const step = stepDefs[i];
      if (step.delay > 0) {
        await new Promise((r) => setTimeout(r, step.delay));
      }
      setRunLogs((prev) => [
        ...prev,
        {
          id: String(i + 1),
          text: `[${nowStamp()}] ${step.text}`,
          tone: step.tone,
        },
      ]);
    }

    setIsRunning(false);
  }, [preset.cron, preset.label]);

  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3 py-1 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            Jobs CRUD live · Scheduler shipping next
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-[3.35rem] md:leading-[1.03]">
            Schedule HTTP jobs.
            <span className="block text-muted">Know when they fail.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-[1.06rem]">
            Crono runs your endpoints on cron, stores execution logs, retries
            failures, and alerts your team — without maintaining cron on a VPS.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/register"
              className="focus-ring btn-primary inline-flex h-10 min-w-28 items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95"
            >
              Start free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#api"
              className="focus-ring btn-secondary inline-flex h-10 min-w-36 items-center justify-center rounded-xl px-5 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95"
            >
              Try interactive demos
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {TRUST_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-xs text-muted"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="mb-2 text-xs text-muted">Try a schedule preset</p>
            <div className="flex flex-wrap gap-2">
              {SCHEDULE_PRESETS.map((p, index) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    onPresetChange(index);
                    setRunMode(false);
                    setRunLogs([]);
                  }}
                  className={`${themeClasses.chip.base} ${
                    activePreset === index
                      ? themeClasses.chip.active
                      : themeClasses.chip.inactive
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p
              className={`mt-2 ${designTokens.typography.mono} text-xs text-muted`}
            >
              cron:{" "}
              <span className="text-foreground">{preset.cron}</span>
            </p>
          </div>
        </div>
        <ExecutionPreviewLogs
          cron={preset.cron}
          presetLabel={preset.label}
          onRun={handleRun}
          isRunning={isRunning}
          runLogs={runLogs}
          runMode={runMode}
        />
      </div>
    </section>
  );
}
