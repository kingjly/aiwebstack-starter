/**
 * PageHeader 业务组件块
 *
 * 用于页面头部，包含标题、描述和操作区
 *
 * AI 使用：import { PageHeader } from '@repo/ui/blocks/page-header'
 */
import { cn } from '@repo/utils';

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between py-4', className)}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
