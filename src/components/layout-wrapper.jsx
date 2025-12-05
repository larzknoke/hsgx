"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Volleyball } from "lucide-react";

export function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Don't show sidebar on auth pages
  const isAuthPage =
    pathname === "/signin" || pathname === "/signup" || pathname === "/";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-6 bg-gray-50/20">{children}</main>
    </SidebarProvider>
  );
}
