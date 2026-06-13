"use client";

import { useEffect, useState } from "react";
import { LandingAlertsSection } from "@/shared/components/marketing/landing-alerts-section";
import { LandingApiSection } from "@/shared/components/marketing/landing-api-section";
import { LandingAuthDemo } from "@/shared/components/marketing/landing-auth-demo";
import { LandingContactSection } from "@/shared/components/marketing/landing-contact-section";
import type { ContactPrefill } from "@/shared/components/marketing/landing-contact-section";
import { LandingCronBuilder } from "@/shared/components/marketing/landing-cron-builder";
import { LandingCrudSection } from "@/shared/components/marketing/landing-crud-section";
import { LandingFaq } from "@/shared/components/marketing/landing-faq";
import { LandingFeatures } from "@/shared/components/marketing/landing-features";
import { LandingFooter } from "@/shared/components/marketing/landing-footer";
import { LandingHeader } from "@/shared/components/marketing/landing-header";
import { LandingHealthDemo } from "@/shared/components/marketing/landing-health-demo";
import { LandingHero } from "@/shared/components/marketing/landing-hero";
import { LandingInteractiveNav } from "@/shared/components/marketing/landing-interactive-nav";
import { LandingLogsDemo } from "@/shared/components/marketing/landing-logs-demo";
import { LandingPlanDemo } from "@/shared/components/marketing/landing-plan-demo";
import { LandingPricing } from "@/shared/components/marketing/landing-pricing";
import { LandingRetrySection } from "@/shared/components/marketing/landing-retry-section";
import { LandingStatsStrip } from "@/shared/components/marketing/landing-stats-strip";
import { API_RESPONSES } from "@/shared/lib/marketing-content";
import type { FeatureCategory } from "@/shared/lib/marketing-content";

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePreset, setActivePreset] = useState(0);
  const [activeFeatureFilter, setActiveFeatureFilter] =
    useState<FeatureCategory>("all");
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [featureTransitionKey, setFeatureTransitionKey] = useState(0);

  const [apiTab, setApiTab] = useState<"jwt" | "apiKey">("jwt");
  const [apiResponse, setApiResponse] =
    useState<keyof typeof API_RESPONSES>("201");

  const [crudTab, setCrudTab] = useState<"list" | "pause" | "delete">("list");
  const [crudStatus, setCrudStatus] = useState("200");

  const [cronIndex, setCronIndex] = useState(2);
  const [authTab, setAuthTab] = useState<"register" | "login">("register");

  const [logFilter, setLogFilter] = useState<
    "all" | "success" | "failed" | "retrying"
  >("all");
  const [selectedLogId, setSelectedLogId] = useState<string | null>("1");

  const [healthPinging, setHealthPinging] = useState(false);
  const [healthResponse, setHealthResponse] = useState(
    '// Click "Ping health" to check API + DB + Redis',
  );

  const [retryStep, setRetryStep] = useState("attempt1");
  const [alertChannel, setAlertChannel] = useState<
    "email" | "slack" | "discord"
  >("email");

  const [jobCount, setJobCount] = useState(0);
  const [planResponse, setPlanResponse] = useState<string | null>(null);
  const [contactPrefill, setContactPrefill] = useState<ContactPrefill | null>(
    null,
  );

  useEffect(() => {
    setFeatureTransitionKey((current) => current + 1);
  }, [activeFeatureFilter]);

  function handleCreateJobDemo() {
    const next = jobCount + 1;
    setJobCount(next);
    if (next > 3) {
      setPlanResponse(API_RESPONSES["403"]);
    } else {
      setPlanResponse(`{
  "success": true,
  "data": {
    "job": {
      "id": "job-${next}",
      "name": "Job ${next}",
      "status": "active"
    }
  }
}`);
    }
  }

  function handleResetPlanDemo() {
    setJobCount(0);
    setPlanResponse(null);
  }

  async function handleHealthPing() {
    setHealthPinging(true);
    setHealthResponse("// Checking postgres + redis…");
    await new Promise((r) => setTimeout(r, 700));
    setHealthResponse(`{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "${new Date().toISOString()}",
    "services": {
      "postgres": "connected",
      "redis": "connected"
    }
  }
}`);
    setHealthPinging(false);
  }

  function handleNotifyFeature(featureTitle: string) {
    setContactPrefill({
      topic: "feedback",
      message: `Notify me when "${featureTitle}" ships.`,
    });
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-background">
      <LandingHeader
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <LandingHero
          activePreset={activePreset}
          onPresetChange={setActivePreset}
        />

        <LandingInteractiveNav />
        <LandingStatsStrip />

        <LandingApiSection
          activeTab={apiTab}
          onTabChange={setApiTab}
          activeResponse={apiResponse}
          onResponseChange={setApiResponse}
        />

        <LandingCrudSection
          activeTab={crudTab}
          onTabChange={setCrudTab}
          activeStatus={crudStatus}
          onStatusChange={setCrudStatus}
        />

        <LandingCronBuilder activeIndex={cronIndex} onSelect={setCronIndex} />

        <LandingAuthDemo activeTab={authTab} onTabChange={setAuthTab} />

        <LandingLogsDemo
          activeFilter={logFilter}
          onFilterChange={setLogFilter}
          selectedId={selectedLogId}
          onSelect={setSelectedLogId}
        />

        <LandingHealthDemo
          pinging={healthPinging}
          response={healthResponse}
          onPing={handleHealthPing}
        />

        <LandingPlanDemo
          jobCount={jobCount}
          lastResponse={planResponse}
          onCreateJob={handleCreateJobDemo}
          onReset={handleResetPlanDemo}
        />

        <LandingRetrySection
          activeStep={retryStep}
          onStepChange={setRetryStep}
        />

        <LandingAlertsSection
          activeChannel={alertChannel}
          onChannelChange={setAlertChannel}
        />

        <LandingFeatures
          activeFilter={activeFeatureFilter}
          onFilterChange={setActiveFeatureFilter}
          transitionKey={featureTransitionKey}
          onNotifyFeature={handleNotifyFeature}
        />

        <LandingPricing
          isYearly={isYearly}
          onToggleYearly={setIsYearly}
          selectedPlan={selectedPlan}
          onSelectPlan={setSelectedPlan}
        />

        <LandingFaq />

        <LandingContactSection
          prefill={contactPrefill}
          onPrefillConsumed={() => setContactPrefill(null)}
        />
      </div>

      <LandingFooter />
    </main>
  );
}
