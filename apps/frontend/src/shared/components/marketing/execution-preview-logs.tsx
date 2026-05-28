"use client";

import { useEffect, useState } from "react";
import { Card } from "@/shared/ui/card";
import { designTokens, themeClasses } from "@/lib/theme";

type LogTone = "default" | "success" | "error" | "warning";

interface LogLine {
  id: string;
  text: string;
  tone: LogTone;
}

const logLines: LogLine[] = [
  { id: "1", text: "[14:30:11] GET /health -> 200 (86ms)", tone: "success" },
  { id: "2", text: "[14:35:11] POST /sync -> 500 (timeout)", tone: "error" },
  { id: "3", text: "[14:35:13] Retry scheduled in 3s...", tone: "warning" },
  { id: "4", text: "[14:35:16] Retry succeeded -> 200 (124ms)", tone: "success" }
];

const toneClasses: Record<LogTone, string> = {
  default: themeClasses.log.neutral,
  success: themeClasses.log.success,
  error: themeClasses.log.error,
  warning: themeClasses.log.warning
};

export function ExecutionPreviewLogs() {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisibleCount((current) => {
        if (current >= logLines.length) {
          return 1;
        }
        return current + 1;
      });
    }, 950);

    return () => window.clearInterval(interval);
  }, []);

  const visibleLogs = logLines.slice(0, visibleCount);
  const isStreaming = visibleCount < logLines.length;

  return (
    <Card className={`${themeClasses.log.wrapper} p-4 ${designTokens.shadows.subtle}`}>
      <div className={`${themeClasses.log.inner} p-4`}>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium tracking-[0.14em] text-muted">Execution Preview</p>
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-muted">
            <span className={`h-1.5 w-1.5 rounded-full ${isStreaming ? "animate-pulse bg-emerald-500" : "bg-zinc-500"}`} />
            {isStreaming ? "Live" : "Idle"}
          </span>
        </div>

        <ul className={`space-y-2.5 ${designTokens.radius.lg} border border-border/70 bg-background/70 p-3 ${designTokens.typography.mono} text-[13px] leading-relaxed`}>
          {visibleLogs.map((line, index) => (
            <li
              key={line.id}
              className={`opacity-0 translate-y-1 animate-[fadeUp_280ms_ease-out_forwards] ${toneClasses[line.tone]}`}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              {line.text}
            </li>
          ))}
          {isStreaming ? (
            <li className="inline-flex h-5 items-center">
              <span className="h-4 w-1 animate-pulse rounded-sm bg-muted/80" />
            </li>
          ) : null}
        </ul>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Card>
  );
}
