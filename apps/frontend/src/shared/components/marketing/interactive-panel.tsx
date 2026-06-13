"use client";

import { Card } from "@/shared/ui/card";
import { designTokens, themeClasses } from "@/shared/lib/theme";

export interface InteractiveTab {
  id: string;
  label: string;
}

export interface StatusCard {
  id: string;
  code: string;
  label: string;
  tone?: "success" | "error" | "warning" | "neutral";
}

interface InteractivePanelProps {
  tabs?: InteractiveTab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  endpoint: string;
  requestLabel?: string;
  request: string;
  responseLabel?: string;
  response: string;
  responseTone?: "success" | "error" | "warning" | "neutral";
  statusCards?: StatusCard[];
  activeStatus?: string;
  onStatusChange?: (id: string) => void;
}

const toneStyles = {
  success: "border-success/30 bg-success/5 ring-success/20",
  error: "border-error/30 bg-error/5 ring-error/20",
  warning: "border-warning/30 bg-warning/5 ring-warning/20",
  neutral: "border-border/80 bg-card/60 ring-accent-muted/30",
};

const responseToneClass = {
  success: "text-success",
  error: "text-error",
  warning: "text-warning",
  neutral: "text-muted",
};

export function InteractivePanel({
  tabs,
  activeTab,
  onTabChange,
  endpoint,
  requestLabel = "Request",
  request,
  responseLabel = "Response",
  response,
  responseTone = "success",
  statusCards,
  activeStatus,
  onStatusChange,
}: InteractivePanelProps) {
  return (
    <div className="space-y-4">
      <Card className="panel-glow overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-card-secondary/50 px-4 py-3">
          {tabs && tabs.length > 0 && onTabChange ? (
            <div className={themeClasses.pricingToggle.wrapper}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 py-1.5 transition-colors ${
                    activeTab === tab.id
                      ? themeClasses.pricingToggle.active
                      : themeClasses.pricingToggle.inactive
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ) : (
            <span className="text-xs font-medium text-muted">
              {requestLabel}
            </span>
          )}
          <span className="font-mono text-xs text-muted">{endpoint}</span>
        </div>
        <pre
          className={`overflow-x-auto border-b border-border/50 p-5 ${designTokens.typography.mono} text-[13px] leading-relaxed text-muted`}
        >
          {request}
        </pre>
        <div className="bg-accent-subtle/20 px-4 py-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-accent">
            {responseLabel}
          </span>
        </div>
        <pre
          className={`overflow-x-auto p-5 ${designTokens.typography.mono} text-[13px] leading-relaxed animate-fade-tab ${responseToneClass[responseTone]}`}
          key={response}
        >
          {response}
        </pre>
      </Card>

      {statusCards && statusCards.length > 0 && onStatusChange ? (
        <div className="grid gap-3 sm:grid-cols-3">
          {statusCards.map((card) => {
            const isActive = activeStatus === card.id;
            const tone = card.tone ?? "neutral";
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onStatusChange(card.id)}
                className={`focus-ring rounded-xl border px-4 py-3 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  isActive
                    ? `${toneStyles[tone]} ring-1`
                    : "border-border/80 bg-card/60 hover:border-accent-muted/30 hover:bg-accent-subtle/30"
                }`}
              >
                <p className="font-mono text-sm font-medium text-foreground">
                  {card.code}
                </p>
                <p className="mt-1 text-xs text-muted">{card.label}</p>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
