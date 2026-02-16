"use client";

import { cn } from "@repo/utils";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

export function Page({ children, className }: PageProps) {
  return (
    <div className={cn("min-h-screen bg-background text-primary", className)}>
      {children}
    </div>
  );
}
