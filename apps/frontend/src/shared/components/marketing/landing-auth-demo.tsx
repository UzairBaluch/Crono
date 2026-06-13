"use client";

import { InteractivePanel } from "@/shared/components/marketing/interactive-panel";
import { AUTH_DEMO } from "@/shared/lib/marketing-content";

type AuthTab = "register" | "login";

interface LandingAuthDemoProps {
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
}

export function LandingAuthDemo({
  activeTab,
  onTabChange,
}: LandingAuthDemoProps) {
  const demo = AUTH_DEMO[activeTab];

  return (
    <section id="auth-demo" className="interactive-section">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
          Auth in one call — token + API key
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
          Register once, get a JWT for the dashboard and a{" "}
          <code className="rounded bg-accent-subtle/60 px-1 font-mono text-xs text-accent">
            cron_…
          </code>{" "}
          key for scripts. Both work on the same account.
        </p>
      </div>

      <div className="mt-8">
        <InteractivePanel
          tabs={[
            { id: "register", label: "Register" },
            { id: "login", label: "Login" },
          ]}
          activeTab={activeTab}
          onTabChange={(id) => onTabChange(id as AuthTab)}
          endpoint={demo.endpoint}
          request={demo.request}
          response={demo.response}
          responseTone="success"
        />
      </div>
    </section>
  );
}
