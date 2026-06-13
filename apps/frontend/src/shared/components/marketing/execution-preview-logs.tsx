"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Play } from "lucide-react";
import { Card } from "@/shared/ui/card";
import { designTokens, themeClasses } from "@/shared/lib/theme";

type LogTone = "default" | "success" | "error" | "warning";

interface LogLine {
  id: string;
  text: string;
  tone: LogTone;
}

const idleLogLines: LogLine[] = [
  { id: "1", text: "[14:30:11] GET /health → 200 (86ms)", tone: "success" },
  { id: "2", text: "[14:35:11] POST /sync → 500 (timeout)", tone: "error" },
  { id: "3", text: "[14:35:13] Retry scheduled in 5s…", tone: "warning" },
  { id: "4", text: "[14:35:18] Retry succeeded → 200 (124ms)", tone: "success" },
];

const toneClasses: Record<LogTone, string> = {
  default: themeClasses.log.neutral,
  success: themeClasses.log.success,
  error: themeClasses.log.error,
  warning: themeClasses.log.warning,
};

interface ExecutionPreviewLogsProps {
  cron: string;
  presetLabel: string;
  onRun: () => void;
  isRunning: boolean;
  runLogs: LogLine[];
  runMode: boolean;
}

export function ExecutionPreviewLogs({
  cron,
  presetLabel,
  onRun,
  isRunning,
  runLogs,
  runMode,
}: ExecutionPreviewLogsProps) {
  const [idleVisibleCount, setIdleVisibleCount] = useState(1);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (runMode) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setIdleVisibleCount((current) =>
        current >= idleLogLines.length ? 1 : current + 1,
      );
    }, 950);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [runMode]);

  const displayLogs = runMode ? runLogs : idleLogLines.slice(0, idleVisibleCount);
  const isStreaming = runMode
    ? isRunning
    : idleVisibleCount < idleLogLines.length;

  return (
    <Card className={`${themeClasses.log.wrapper} p-4`}>
      <div className={`${themeClasses.log.inner} p-4`}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-medium tracking-[0.14em] text-muted">
            Execution preview
          </p>
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-muted">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isStreaming || isRunning
                  ? "animate-pulse bg-emerald-500"
                  : "bg-zinc-500"
              }`}
            />
            {isRunning ? "Running" : isStreaming ? "Live" : "Idle"}
          </span>
        </div>

        <div className="mb-3 flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted">
              Schedule
            </p>
            <p className="truncate text-xs font-medium">{presetLabel}</p>
            <p className={`${designTokens.typography.mono} text-[11px] text-muted`}>
              {cron}
            </p>
          </div>
          <button
            type="button"
            onClick={onRun}
            disabled={isRunning}
            className="focus-ring btn-primary inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-60"
          >
            {isRunning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
            {isRunning ? "Running…" : "Run now"}
          </button>
        </div>

        <ul
          className={`space-y-2.5 ${themeClasses.log.stream} p-3 ${designTokens.typography.mono} text-[13px] leading-relaxed`}
        >
          {displayLogs.map((line, index) => (
            <li
              key={line.id}
              className={`animate-fade-up opacity-0 ${toneClasses[line.tone]}`}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              {line.text}
            </li>
          ))}
          {isStreaming || isRunning ? (
            <li className="inline-flex h-5 items-center">
              <span className="h-4 w-1 animate-pulse rounded-sm bg-muted/80" />
            </li>
          ) : null}
        </ul>
      </div>
    </Card>
  );
}
