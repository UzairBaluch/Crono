import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CronAPI.dev",
  description: "Reliable cron jobs for modern apps",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
