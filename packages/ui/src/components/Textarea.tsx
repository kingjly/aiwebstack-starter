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
      "w-full rounded-md border border-gray-300 shadow-sm focus:border-transparent focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
      disabled && "cursor-not-allowed opacity-50",
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
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
