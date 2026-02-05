/**
 * FormCard 业务组件块
 *
 * 用于包裹表单，提供卡片样式
 *
 * AI 使用：import { FormCard } from '@repo/ui/blocks/form-card'
 */
import { cn } from '@repo/utils';

export interface FormCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormCard({ title, description, children, className }: FormCardProps) {
  return (
    <div className={cn('rounded-lg border border-border bg-background p-6 shadow-sm', className)}>
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
