"use client";

import * as React from "react";
import { Switch } from "@base-ui/react/switch";
import { cn } from "@repo/utils";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof Switch.Root> {}

export function SwitchComponent({ className, ...props }: SwitchProps) {
  return (
    <Switch.Root
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full",
        "transition-colors duration-200 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "data-[checked]:bg-blue-600 bg-gray-200",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <Switch.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow ring-0",
          "transition-transform duration-200 ease-in-out",
          "data-[checked]:translate-x-5 translate-x-0.5"
        )}
      />
    </Switch.Root>
  );
}

export { SwitchComponent as Switch };
