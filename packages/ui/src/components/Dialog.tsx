"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { cn } from "@repo/utils";

// 导出 Base UI Dialog 的所有子组件
export const DialogRoot = Dialog.Root;
export const DialogTrigger = Dialog.Trigger;
export const DialogPortal = Dialog.Portal;
export const DialogBackdrop = Dialog.Backdrop;
export const DialogPopup = Dialog.Popup;
export const DialogViewport = Dialog.Viewport;
export const DialogClose = Dialog.Close;
export const DialogTitle = Dialog.Title;
export const DialogDescription = Dialog.Description;

// 导出 DialogRoot 作为默认的 Dialog 组件
export { DialogRoot as Dialog };

// 预外提供一些预设样式的组件变体（可选）
export interface StyledDialogPopupProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Popup> {
  size?: "sm" | "md" | "lg";
}

const sizeStyles: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

// 带预设样式的 DialogPopup
export function StyledDialogPopup({
  className,
  size = "md",
  children,
  ...props
}: StyledDialogPopupProps) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-200" />
      <Dialog.Popup
        className={cn(
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "w-full p-6",
          "bg-surface rounded-xl shadow-2xl border border-border",
          "text-primary",
          "focus:outline-none",
          "transition-all duration-200",
          "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
          "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  );
}
