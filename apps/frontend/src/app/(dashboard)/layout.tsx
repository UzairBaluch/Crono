"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/shared/components/dashboard/sidebar";
import { DashboardTopbar } from "@/shared/components/dashboard/dashboard-topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background lg:flex">
      <Sidebar pathname={pathname} />
      <main className="flex-1 px-4 py-6 lg:px-8">
        <DashboardTopbar />
        {children}
      </main>
    </div>
  );
}
