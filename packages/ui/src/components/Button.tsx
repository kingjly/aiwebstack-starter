"use client";

import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "@repo/utils";

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseButton> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-info text-white hover:bg-blue-700 focus-visible:ring-info dark:bg-blue-500 dark:hover:bg-blue-600",
  secondary:
    "bg-muted text-primary hover:bg-border focus-visible:ring-muted-foreground",
  outline:
    "border border-border bg-transparent text-primary hover:bg-muted focus-visible:ring-muted-foreground",
  ghost:
    "bg-transparent text-secondary hover:bg-muted focus-visible:ring-muted-foreground",
  destructive:
    "bg-error text-white hover:bg-red-700 focus-visible:ring-error dark:bg-red-500 dark:hover:bg-red-600",
};

const sizeStyles: Record<string, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:ring-offset-surface",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
