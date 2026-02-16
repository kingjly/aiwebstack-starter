"use client";

import { cn } from "@repo/utils";
import { forwardRef } from "react";

interface TextareaProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, name, label, placeholder, required, rows = 3, disabled, className = "" }, ref) => {
    const textareaClasses = cn(
      "w-full rounded-lg border border-border bg-surface text-primary placeholder:text-muted-foreground",
      "transition-colors duration-200",
      "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-secondary mb-1">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          id={id}
          name={name}
          ref={ref}
          rows={rows}
          className={textareaClasses}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
        />
      </div>
    );
  }
);
