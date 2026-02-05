/**
 * Form 组件
 *
 * 基于 TanStack Form + Base UI 封装
 *
 * AI 使用：从 @repo/ui/components/form 导入
 */
import { FormProvider, useForm, type FormProps } from '@tanstack/react-form';
import type { ComponentProps } from 'react';

export interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  children: (props: {
    value: unknown;
    handleChange: (value: unknown) => void;
    onBlur: () => void;
  }) => React.ReactNode;
}

export function Form<TData>({ children, ...props }: FormProps<TData>) {
  return <FormProvider {...props}>{children}</FormProvider>;
}

export function useFormState<TData>(props: FormProps<TData>) {
  return useForm<TData>(props);
}
