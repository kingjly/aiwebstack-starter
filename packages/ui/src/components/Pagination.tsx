"use client";

import { cn } from "@repo/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="p-2 rounded-md border border-border bg-surface hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-primary transition-colors"
        >
          ‹
        </button>
        <span className="text-sm text-secondary">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="p-2 rounded-md border border-border bg-surface hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-primary transition-colors"
        >
          ›
        </button>
      </div>
    </div>
  );
};
