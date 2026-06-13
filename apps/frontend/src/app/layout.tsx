import type { Metadata } from "next";
import "./globals.css";
import { ThemeInit } from "@/shared/components/theme-init";

export const metadata: Metadata = {
  title: {
    default: "Crono — Scheduled HTTP jobs",
    template: "%s · Crono",
  },
  description:
    "Schedule HTTP jobs with cron, logs, retries, and alerts. Built for indie SaaS and backend teams.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}
