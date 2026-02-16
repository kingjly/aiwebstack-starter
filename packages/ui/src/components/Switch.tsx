"use client";

import * as React from "react";
import { Switch } from "@base-ui/react/switch";
import { cn } from "@repo/utils";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof Switch.Root> {}

export function SwitchComponent({ className, ...props }: SwitchProps) {
  return (
    <Switch.Root
      className={cn(
        // 容器尺寸和形状
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full",
        // 背景颜色 - 未选中状态
        "bg-muted",
        // 背景颜色 - 选中状态
        "data-[checked]:bg-blue-600",
        // 过渡动画
        "transition-all duration-200 ease-in-out",
        // 焦点状态
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        // 禁用状态
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <Switch.Thumb
        className={cn(
          // Thumb 尺寸和形状
          "pointer-events-none block h-4 w-4 rounded-full",
          // 垂直居中
          "my-auto",
          // 颜色和阴影
          "bg-white shadow-sm",
          // 过渡动画
          "transition-transform duration-200 ease-in-out",
          // 位置 - 未选中
          "translate-x-0.5",
          // 位置 - 选中
          "data-[checked]:translate-x-4"
        )}
      />
    </Switch.Root>
  );
}

export { SwitchComponent as Switch };
