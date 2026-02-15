"use client";

import * as React from "react";
import { cn } from "@repo/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border px-3 py-2 text-sm",
          "bg-white text-gray-900 placeholder:text-gray-400",
          "border-gray-300",
          "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
