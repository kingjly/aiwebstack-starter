"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@repo/ui";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">加载中...</div>
      </div>
    );
  }

  const stats = [
    { label: "总用户", value: "1,234", change: "+12%" },
    { label: "活跃用户", value: "891", change: "+5%" },
    { label: "月收入", value: "¥12,345", change: "+23%" },
    { label: "订单数", value: "567", change: "+8%" },
  ];

  const recentActivity = [
    { id: 1, action: "用户注册", user: "张三", time: "2 分钟前" },
    { id: 2, action: "订单完成", user: "李四", time: "15 分钟前" },
    { id: 3, action: "评论发布", user: "王五", time: "1 小时前" },
    { id: 4, action: "用户登录", user: "赵六", time: "2 小时前" },
  ];

  const quickActions = [
    { label: "新增用户", href: "/dashboard/users" },
    { label: "查看报表", href: "#" },
    { label: "系统设置", href: "/dashboard/settings" },
    { label: "组件库", href: "/demo/components" },
  ];

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-primary">概览</h1>
          <p className="text-sm text-muted-foreground mt-1">
            欢迎回来，<span className="font-medium text-primary">{session?.user?.name || session?.user?.email}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/demo/components">
            <Button variant="outline" size="sm">组件库</Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button size="sm">设置</Button>
          </Link>
        </div>
      </div>

      {/* 统计卡片 - 居中对齐 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface rounded-lg border border-border p-4 text-center"
          >
            <div className="text-xs text-muted-foreground">{stat.label}</div>
            <div className="text-2xl font-bold text-primary mt-2">{stat.value}</div>
            <div className="text-xs text-green-600 mt-1">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* 主内容区 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 最近活动 - 占 2/3 */}
        <div className="xl:col-span-2 bg-surface rounded-lg border border-border">
          <div className="px-5 py-3 border-b border-border">
            <h2 className="text-sm font-medium text-primary">最近活动</h2>
          </div>
          <div className="divide-y divide-border-muted">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-secondary shrink-0">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-primary truncate">{activity.action}</div>
                    <div className="text-xs text-muted-foreground truncate">{activity.user}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground shrink-0 ml-4">{activity.time}</div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-border text-center">
            <Link href="#" className="text-xs text-blue-600 hover:text-blue-700 hover:underline">查看全部活动</Link>
          </div>
        </div>

        {/* 右侧边栏 - 占 1/3 */}
        <div className="space-y-6">
          {/* 用户信息 */}
          <div className="bg-surface rounded-lg border border-border">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-sm font-medium text-primary">用户信息</h2>
            </div>
            <div className="p-5">
              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-b border-border-muted last:border-0">
                    <td className="py-2.5 text-muted-foreground w-16">ID</td>
                    <td className="py-2.5 text-primary text-right font-mono truncate">{session?.user?.id}</td>
                  </tr>
                  <tr className="border-b border-border-muted last:border-0">
                    <td className="py-2.5 text-muted-foreground">邮箱</td>
                    <td className="py-2.5 text-primary text-right truncate">{session?.user?.email}</td>
                  </tr>
                  <tr className="border-b border-border-muted last:border-0">
                    <td className="py-2.5 text-muted-foreground">用户名</td>
                    <td className="py-2.5 text-primary text-right">{session?.user?.name || "-"}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-muted-foreground">角色</td>
                    <td className="py-2.5 text-primary text-right">{session?.user?.role || "USER"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 快捷操作 */}
          <div className="bg-surface rounded-lg border border-border">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-sm font-medium text-primary">快捷操作</h2>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center justify-center h-9 px-3 rounded-lg bg-muted hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-xs font-medium text-primary">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
