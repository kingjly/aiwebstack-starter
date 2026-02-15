"use client";

import * as React from "react";
import { cn } from "@repo/utils";

export interface CheckboxProps {
  id?: string;
  name?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({
  id,
  name,
  label,
  checked,
  defaultChecked,
  disabled,
  onChange,
  className,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  const isControlled = checked !== undefined;
  const isCheckedValue = isControlled ? checked : isChecked;

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={isCheckedValue}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleChange}
        className={cn(
          "h-4 w-4 rounded border-gray-300 text-blue-600",
          "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      />
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm text-gray-700",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}
