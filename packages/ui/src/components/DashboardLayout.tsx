"use client";

import { useState } from "react";
import { Sidebar, type SidebarProps } from "./Sidebar";
import { Header, type HeaderProps } from "./Header";
import { cn } from "@repo/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarProps["items"];
  headerProps?: Omit<HeaderProps, "onSignOut">;
  onSignOut?: () => void;
}

export function DashboardLayout({
  children,
  sidebarItems,
  headerProps,
  onSignOut,
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar items={sidebarItems} collapsed={sidebarCollapsed} />
      <div className={cn("flex-1 flex flex-col min-h-screen")}>
        <Header {...headerProps} onSignOut={onSignOut} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className={cn(
          "fixed bottom-4 left-4 z-50 p-2 rounded-full",
          "bg-gray-900 text-white shadow-lg",
          "hover:bg-gray-800 transition-colors"
        )}
        aria-label={sidebarCollapsed ? "展开侧边栏" : "收起侧边栏"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={cn("w-5 h-5 transition-transform", sidebarCollapsed && "rotate-180")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  );
}
