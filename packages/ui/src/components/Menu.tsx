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
            "z-50 min-w-32 overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-lg",
            "transition-all duration-150",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
            "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
            className
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  );
}

export interface MenuItemProps
  extends React.ComponentPropsWithoutRef<typeof Menu.Item> {}

export function MenuItem({ className, ...props }: MenuItemProps) {
  return (
    <Menu.Item
      className={cn(
        "cursor-pointer px-3 py-2 text-sm text-primary rounded-md",
        "hover:bg-muted focus:bg-muted focus:outline-none",
        "transition-colors duration-150",
        className
      )}
      {...props}
    />
  );
}

export { MenuRoot as Menu };
