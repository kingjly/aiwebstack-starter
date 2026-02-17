"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "@repo/utils";
import { Button } from "./Button";
import { Input } from "./Input";
import { Pagination } from "./Pagination";

// 类型定义
export type SortDirection = "asc" | "desc" | null;

export interface Column<T> {
  key: keyof T | string;
  title: string;
  width?: string;
  sortable?: boolean;
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFields?: (keyof T)[];
  pageSize?: number;
  pageSizeOptions?: number[];
  emptyText?: string;
  emptyIcon?: React.ReactNode;
  onRowClick?: (record: T) => void;
  className?: string;
}

interface SortState {
  key: string | null;
  direction: SortDirection;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  loading = false,
  searchable = true,
  searchPlaceholder = "搜索...",
  searchFields,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 20, 50],
  emptyText = "暂无数据",
  emptyIcon,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<SortState>({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // 处理排序
  const handleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (prev.key !== key) {
        return { key, direction: "asc" };
      }
      if (prev.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key: null, direction: null };
    });
    setCurrentPage(1);
  }, []);

  // 过滤数据
  const filteredData = useMemo(() => {
    if (!searchQuery || !searchFields?.length) return data;

    const query = searchQuery.toLowerCase();
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (value == null) return false;
        return String(value).toLowerCase().includes(query);
      })
    );
  }, [data, searchQuery, searchFields]);

  // 排序数据
  const sortedData = useMemo(() => {
    if (!sort.key || !sort.direction) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sort.key as keyof T];
      const bVal = b[sort.key as keyof T];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sort.direction === "asc" ? 1 : -1;
      if (bVal == null) return sort.direction === "asc" ? -1 : 1;

      const comparison = String(aVal).localeCompare(String(bVal), "zh-CN", {
        numeric: true,
        sensitivity: "base",
      });

      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sort]);

  // 分页数据
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // 获取单元格值
  const getCellValue = (record: T, key: keyof T | string): unknown => {
    if (typeof key === "string" && key.includes(".")) {
      const keys = key.split(".");
      let value: unknown = record;
      for (const k of keys) {
        value = (value as Record<string, unknown>)?.[k];
      }
      return value;
    }
    return record[key as keyof T];
  };

  // 渲染排序图标
  const renderSortIcon = (columnKey: string) => {
    if (sort.key !== columnKey) {
      return (
        <svg className="w-4 h-4 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    if (sort.direction === "asc") {
      return (
        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  // 渲染空状态
  const renderEmpty = () => (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
      {emptyIcon || (
        <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )}
      <p className="text-sm">{emptyText}</p>
    </div>
  );

  // 渲染加载状态
  const renderLoading = () => (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-2 text-muted-foreground">
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-sm">加载中...</span>
      </div>
    </div>
  );

  return (
    <div className={cn("bg-surface rounded-lg border border-border", className)}>
      {/* 工具栏 */}
      {searchable && (
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>每页</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-9 px-2 border border-border rounded-lg bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <span>条</span>
            </div>
          </div>
        </div>
      )}

      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "h-11 px-5 text-left text-xs font-medium text-muted-foreground",
                    column.sortable && "cursor-pointer select-none hover:text-primary transition-colors",
                    column.width && `w-[${column.width}]`
                  )}
                  style={column.width ? { width: column.width } : undefined}
                  onClick={column.sortable ? () => handleSort(String(column.key)) : undefined}
                >
                  <div className="flex items-center gap-1">
                    <span>{column.title}</span>
                    {column.sortable && renderSortIcon(String(column.key))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={columns.length}>{renderLoading()}</td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>{renderEmpty()}</td>
              </tr>
            ) : (
              paginatedData.map((record, index) => (
                <tr
                  key={String(record[keyField])}
                  className={cn(
                    "transition-colors",
                    onRowClick && "cursor-pointer hover:bg-muted/50"
                  )}
                  onClick={onRowClick ? () => onRowClick(record) : undefined}
                >
                  {columns.map((column) => {
                    const value = getCellValue(record, column.key);
                    return (
                      <td key={String(column.key)} className="px-5 py-3 text-sm text-primary">
                        {column.render
                          ? column.render(value as T[keyof T], record, (currentPage - 1) * pageSize + index)
                          : value != null ? String(value) : "-"}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 底部分页 */}
      {sortedData.length > 0 && (
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            显示 {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, sortedData.length)} / 共 {sortedData.length} 条
          </span>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}
    </div>
  );
}
