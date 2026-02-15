"use client";

import * as React from "react";
import { Tooltip } from "@base-ui/react/tooltip";
import { cn } from "@repo/utils";

export const TooltipRoot = Tooltip.Root;
export const TooltipTrigger = Tooltip.Trigger;

export interface TooltipPopupProps
  extends React.ComponentPropsWithoutRef<typeof Tooltip.Popup> {}

export function TooltipPopup({ className, ...props }: TooltipPopupProps) {
  return (
    <Tooltip.Portal>
      <Tooltip.Positioner sideOffset={4}>
        <Tooltip.Popup
          className={cn(
            "z-50 overflow-hidden rounded-md bg-gray-900 px-3 py-1.5 text-xs text-gray-50",
            className
          )}
          {...props}
        />
      </Tooltip.Positioner>
    </Tooltip.Portal>
  );
}

export { TooltipRoot as Tooltip };
