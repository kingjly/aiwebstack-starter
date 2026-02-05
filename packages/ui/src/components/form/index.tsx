/**
 * Form 组件
 *
 * 简单的表单容器组件，配合 HTML form 使用
 *
 * AI 使用：从 @repo/ui/components/form 导入
 */
import type { ComponentProps, ReactNode } from 'react';

export interface FormProps extends ComponentProps<'form'> {
  children: ReactNode;
}

export function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>;
}

export interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, required, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <span className="text-sm text-error">{error}</span>}
    </div>
  );
}

export interface FormActionsProps {
  children: ReactNode;
}

export function FormActions({ children }: FormActionsProps) {
  return <div className="flex gap-2 mt-4">{children}</div>;
}
