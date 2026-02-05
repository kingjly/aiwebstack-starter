/**
 * Dialog 组件
 *
 * 基于 Base UI Dialog 封装 + Tailwind 样式
 *
 * AI 使用：从 @repo/ui/components/dialog 导入
 */
import { Dialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';

export interface DialogRootProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const DialogRoot = ({ open, onOpenChange, children }: DialogRootProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

export const DialogTrigger = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <Dialog.Trigger className={className}>{children}</Dialog.Trigger>;
};

export const DialogContent = ({ children, title, description }: { children: React.ReactNode; title?: string; description?: string }) => {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg">
        {title && (
          <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
            {title}
          </Dialog.Title>
        )}
        {description && (
          <Dialog.Description className="text-sm text-muted-foreground mt-1.5">
            {description}
          </Dialog.Description>
        )}
        <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">关闭</span>
        </Dialog.Close>
        <div className="mt-4">{children}</div>
      </Dialog.Popup>
    </Dialog.Portal>
  );
};

export const DialogClose = ({ children }: { children: React.ReactNode }) => {
  return <Dialog.Close>{children}</Dialog.Close>;
};
