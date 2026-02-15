"use client";

import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { cn } from "@repo/utils";

export const MenuRoot = Menu.Root;
export const MenuTrigger = Menu.Trigger;

export interface MenuPopupProps
  extends React.ComponentPropsWithoutRef<typeof Menu.Popup> {}

export function MenuPopup({ className, ...props }: MenuPopupProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner sideOffset={4}>
        <Menu.Popup
          className={cn(
            "z-50 min-w-32 overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg",
            className
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  );
}

export const MenuItem = Menu.Item;

export { MenuRoot as Menu };
