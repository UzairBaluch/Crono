import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crono — Scheduled HTTP jobs for modern SaaS",
  description:
    "Schedule HTTP endpoints with cron, execution logs, retries, and failure alerts. REST API + dashboard.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
