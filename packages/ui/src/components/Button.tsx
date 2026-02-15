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
    "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
  secondary:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
  outline:
    "border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500",
  ghost: "bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
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
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
