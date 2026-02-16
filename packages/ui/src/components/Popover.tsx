"use client";

import * as React from "react";
import { Popover } from "@base-ui/react/popover";
import { cn } from "@repo/utils";

export const PopoverRoot = Popover.Root;
export const PopoverTrigger = Popover.Trigger;

export interface PopoverPopupProps
  extends React.ComponentPropsWithoutRef<typeof Popover.Popup> {}

export function PopoverPopup({ className, ...props }: PopoverPopupProps) {
  return (
    <Popover.Portal>
      <Popover.Positioner sideOffset={4}>
        <Popover.Popup
          className={cn(
            "z-50 rounded-lg border border-border bg-surface p-4 shadow-lg text-primary",
            "transition-all duration-150",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
            "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
            className
          )}
          {...props}
        />
      </Popover.Positioner>
    </Popover.Portal>
  );
}

export { PopoverRoot as Popover };
