"use client";

import { useForm, FormProvider, UseFormProps, FieldValues, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@repo/utils";

interface FormProps<T extends FieldValues> extends Omit<UseFormProps<T>, "resolver"> {
  schema?: z.ZodType<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export function Form<T extends FieldValues>({
  schema,
  onSubmit,
  children,
  className,
  ...formProps
}: FormProps<T>) {
  const methods = useForm<T>({
    ...formProps,
    ...(schema && { resolver: zodResolver(schema) }),
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField<T extends FieldValues>({
  name,
  label,
  description,
  required,
  children,
}: FormFieldProps<T>) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <p className="text-sm text-red-600 mt-1">{message}</p>
  );
}
