/**
 * Input 组件
 *
 * 基于 Base UI Input 封装 + Tailwind 样式
 *
 * AI 使用：从 @repo/ui/components/input 导入
 */
import { Input as BaseInput } from '@base-ui/react/input';
import { forwardRef, type ComponentProps } from 'react';

export interface InputProps extends ComponentProps<typeof BaseInput> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <BaseInput
          ref={ref}
          className={`flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-error' : ''} ${className}`}
          {...props}
        />
        {error && <span className="text-sm text-error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
