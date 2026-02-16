"use client";

import * as React from "react";
import { Tabs } from "@base-ui/react/tabs";
import { cn } from "@repo/utils";

export const TabsRoot = Tabs.Root;

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof Tabs.List> {}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <Tabs.List
      className={cn(
        "inline-flex items-center gap-1 rounded-lg bg-muted p-1",
        className
      )}
      {...props}
    />
  );
}

export interface TabsTabProps
  extends React.ComponentPropsWithoutRef<typeof Tabs.Tab> {}

export function TabsTab({ className, ...props }: TabsTabProps) {
  return (
    <Tabs.Tab
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium",
        "transition-colors duration-150 text-secondary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info",
        "data-[selected]:bg-surface data-[selected]:text-primary data-[selected]:shadow-sm",
        "data-[hover]:text-primary",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export interface TabsPanelProps
  extends React.ComponentPropsWithoutRef<typeof Tabs.Panel> {}

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return (
    <Tabs.Panel
      className={cn("mt-4 focus-visible:outline-none text-primary", className)}
      {...props}
    />
  );
}

export { TabsRoot as Tabs };
