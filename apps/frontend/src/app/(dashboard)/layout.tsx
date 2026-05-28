"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background lg:flex">
      <Sidebar pathname={pathname} />
      <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
    </div>
  );
}
