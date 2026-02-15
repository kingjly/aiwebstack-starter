"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@repo/ui";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">加载中...</div>
      </div>
    );
  }

  const stats = [
    { label: "总用户", value: "1,234", change: "+12%" },
    { label: "活跃用户", value: "891", change: "+5%" },
    { label: "收入", value: "¥12,345", change: "+23%" },
    { label: "订单", value: "567", change: "+8%" },
  ];

  const recentActivity = [
    { id: 1, action: "用户注册", user: "张三", time: "2 分钟前" },
    { id: 2, action: "订单完成", user: "李四", time: "15 分钟前" },
    { id: 3, action: "评论发布", user: "王五", time: "1 小时前" },
    { id: 4, action: "用户登录", user: "赵六", time: "2 小时前" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">概览</h1>
          <p className="text-gray-600 mt-1">
            欢迎回来，{session?.user?.name || session?.user?.email}
          </p>
        </div>
        <Link href="/demo/components">
          <Button variant="outline">查看组件库</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {stat.value}
            </div>
            <div className="text-sm text-green-600 mt-1">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">最近活动</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <div className="font-medium text-gray-900">
                    {activity.action}
                  </div>
                  <div className="text-sm text-gray-500">{activity.user}</div>
                </div>
                <div className="text-sm text-gray-400">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">用户信息</h2>
          <div className="space-y-3">
            <div className="flex">
              <span className="w-24 text-gray-500">ID:</span>
              <span className="text-gray-900 font-mono text-sm">
                {session?.user?.id}
              </span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-500">邮箱:</span>
              <span className="text-gray-900">{session?.user?.email}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-500">用户名:</span>
              <span className="text-gray-900">
                {session?.user?.name || "-"}
              </span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-500">角色:</span>
              <span className="text-gray-900">
                {session?.user?.role || "USER"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
