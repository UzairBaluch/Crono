"use client";

import { BellRing, MessageSquare, Mail } from "lucide-react";
import { Card } from "@/shared/ui/card";
import { ALERT_PREVIEWS } from "@/shared/lib/marketing-content";
import { designTokens, themeClasses } from "@/shared/lib/theme";

type AlertChannel = keyof typeof ALERT_PREVIEWS;

interface LandingAlertsSectionProps {
  activeChannel: AlertChannel;
  onChannelChange: (channel: AlertChannel) => void;
}

const CHANNELS: {
  id: AlertChannel;
  label: string;
  icon: typeof Mail;
}[] = [
  { id: "email", label: "Email", icon: Mail },
  { id: "slack", label: "Slack", icon: MessageSquare },
  { id: "discord", label: "Discord", icon: BellRing },
];

export function LandingAlertsSection({
  activeChannel,
  onChannelChange,
}: LandingAlertsSectionProps) {
  const preview = ALERT_PREVIEWS[activeChannel];

  return (
    <section id="alerts" className="interactive-section">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
          Get notified your way
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
          Email on every plan. Slack and Discord webhooks on Starter+. Pick a
          channel to preview the alert.
        </p>
      </div>

      <div className="mt-8">
        <div className="mb-4 inline-flex rounded-xl border border-border bg-card p-1 text-xs">
          {CHANNELS.map((channel) => (
            <button
              key={channel.id}
              type="button"
              onClick={() => onChannelChange(channel.id)}
              className={`focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors ${
                activeChannel === channel.id
                  ? themeClasses.pricingToggle.active
                  : themeClasses.pricingToggle.inactive
              }`}
            >
              <channel.icon className="h-3.5 w-3.5" />
              {channel.label}
            </button>
          ))}
        </div>

        <Card className="panel-glow overflow-hidden" key={activeChannel}>
          <div className="border-b border-border/80 bg-card-secondary/50 px-4 py-3">
            <p className="text-xs font-medium text-muted">{preview.title}</p>
            {"subject" in preview && preview.subject ? (
              <p className="mt-1 text-sm font-medium text-foreground">
                {preview.subject}
              </p>
            ) : null}
          </div>
          <pre
            className={`whitespace-pre-wrap p-5 ${designTokens.typography.mono} text-[13px] leading-relaxed text-muted animate-fade-tab`}
          >
            {preview.body}
          </pre>
        </Card>
      </div>
    </section>
  );
}
