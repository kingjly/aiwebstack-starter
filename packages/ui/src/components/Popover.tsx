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
            "z-50 rounded-lg border border-gray-200 bg-white p-4 shadow-lg",
            className
          )}
          {...props}
        />
      </Popover.Positioner>
    </Popover.Portal>
  );
}

export { PopoverRoot as Popover };
