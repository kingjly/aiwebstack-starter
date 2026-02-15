"use client";

import { useState } from "react";
import { ErrorBoundary } from "@repo/ui";
import { Button } from "@repo/ui";

function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("这是一个模拟的错误！");
  }

  return (
    <div className="text-center py-8">
      <p className="text-gray-600 mb-4">点击按钮触发一个错误</p>
      <Button
        variant="destructive"
        onClick={() => setShouldThrow(true)}
      >
        触发错误
      </Button>
    </div>
  );
}

export default function ErrorBoundaryDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Error Boundary 示例</h1>
          <p className="mt-2 text-gray-600">
            使用 react-error-boundary 实现的错误边界
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">错误边界演示</h2>
          <ErrorBoundary>
            <BuggyComponent />
          </ErrorBoundary>
        </div>

        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">使用方法</h2>
          <pre className="text-sm bg-gray-900 text-gray-300 rounded-lg p-4 overflow-x-auto">
{`import { ErrorBoundary } from "@repo/ui";

function App() {
  return (
    <ErrorBoundary
      onError={(error, info) => {
        console.error("捕获到错误:", error);
        // 可以发送到错误监控服务
      }}
    >
      <MyComponent />
    </ErrorBoundary>
  );
}

// 自定义错误展示
<ErrorBoundary
  fallback={({ error, resetErrorBoundary }) => (
    <div>
      <p>出错了: {error.message}</p>
      <button onClick={resetErrorBoundary}>重试</button>
    </div>
  )}
>
  <MyComponent />
</ErrorBoundary>`}
          </pre>
        </div>

        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">注意事项</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>Error Boundary 只能捕获子组件渲染过程中的错误</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>无法捕获事件处理器、异步代码或服务端渲染中的错误</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>建议在路由级别或关键组件周围使用 Error Boundary</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>可以嵌套多个 Error Boundary 实现细粒度的错误处理</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
