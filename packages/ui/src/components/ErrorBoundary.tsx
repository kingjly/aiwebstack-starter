"use client";

import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from "react-error-boundary";
import { cn } from "@repo/utils";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">出现了一些问题</h2>
        <p className="text-gray-600 mb-4">
          {error.message || "发生了意外错误，请稍后重试"}
        </p>
        <div className="space-y-2">
          <button
            onClick={resetErrorBoundary}
            className={cn(
              "w-full px-4 py-2 text-sm font-medium text-white",
              "bg-blue-600 rounded-md hover:bg-blue-700",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            )}
          >
            重试
          </button>
          <button
            onClick={() => window.location.href = "/"}
            className={cn(
              "w-full px-4 py-2 text-sm font-medium text-gray-700",
              "bg-white border border-gray-300 rounded-md hover:bg-gray-50",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            )}
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

export function ErrorBoundary({ children, fallback, onError }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback || ErrorFallback}
      onError={onError}
    >
      {children}
    </ReactErrorBoundary>
  );
}
