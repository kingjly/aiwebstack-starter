"use client";

import { forwardRef } from "react";
import { useFormContext, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@repo/utils";
import { FormError } from "./Form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, description, className, ...props }, ref) => {
    const { control, formState: { errors } } = useFormContext();
    const error = errors[name]?.message as string | undefined;

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              {...props}
              ref={ref}
              id={name}
              className={cn(
                "block w-full px-3 py-2 border rounded-md shadow-sm",
                "placeholder-gray-400",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                error ? "border-red-300" : "border-gray-300",
                className
              )}
            />
          )}
        />
        {description && !error && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        <FormError message={error} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
