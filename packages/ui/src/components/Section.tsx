"use client";

import { cn } from "@repo/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn("py-8", className)}>
      {children}
    </section>
  );
}

export function SectionHeader({ children, className }: SectionProps) {
  return (
    <div className={cn("mb-6", className)}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, className }: SectionProps) {
  return (
    <h2 className={cn("text-2xl font-bold text-primary", className)}>
      {children}
    </h2>
  );
}

export function SectionDescription({ children, className }: SectionProps) {
  return (
    <p className={cn("mt-2 text-secondary", className)}>
      {children}
    </p>
  );
}

export function SectionContent({ children, className }: SectionProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
