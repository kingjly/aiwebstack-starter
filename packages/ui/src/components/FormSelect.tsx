"use client";

import { forwardRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@repo/utils";
import { FormError } from "./Form";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  name: string;
  label?: string;
  description?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ name, label, description, options, placeholder, className, ...props }, ref) => {
    const { control, formState: { errors } } = useFormContext();
    const error = errors[name]?.message as string | undefined;

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={name} className="block text-sm font-medium text-secondary">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <select
              {...field}
              {...props}
              ref={ref}
              id={name}
              className={cn(
                "block w-full h-10 px-3 py-2 rounded-lg border text-sm",
                "bg-surface text-primary",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                error ? "border-red-500" : "border-border",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
        {description && !error && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <FormError message={error} />
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

// Export as Select for simpler importing
export { FormSelect as Select };
