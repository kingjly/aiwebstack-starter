/**
 * Dialog 组件
 *
 * 基于 Base UI Dialog 封装 + Tailwind 样式
 *
 * AI 使用：从 @repo/ui/components/dialog 导入
 */
import {
  Dialog as BaseDialog,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogDescription,
} from '@base-ui-components/react/dialog';
import { forwardRef, type ComponentProps } from 'react';
import { X } from 'lucide-react';

export interface DialogProps extends ComponentProps<typeof BaseDialog> {
  title?: string;
  description?: string;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ children, title, description, ...props }, ref) => {
    return (
      <BaseDialog {...props}>
        <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        <DialogPopup
          ref={ref}
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg"
        >
          {title && (
            <DialogTitle className="text-lg font-semibold leading-none tracking-tight">
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription className="text-sm text-muted-foreground mt-1.5">
              {description}
            </DialogDescription>
          )}
          <BaseDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">关闭</span>
          </BaseDialog.Close>
          <div className="mt-4">{children}</div>
        </DialogPopup>
      </BaseDialog>
    );
  }
);

Dialog.displayName = 'Dialog';
