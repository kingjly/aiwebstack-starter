"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Button, Input, Label, Switch, Textarea, Menu, MenuTrigger, MenuPopup, MenuItem } from "@repo/ui";

export default function SettingsPage() {
  const { data: session, isPending } = useSession();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("zh-CN");
  const [menuOpen, setMenuOpen] = useState(false);

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">加载中...</div>
      </div>
    );
  }

  const handleSave = () => {
    // TODO: 实现设置保存逻辑
    alert("设置已保存");
  };

  const handleSignOut = async () => {
    // TODO: 实现登出逻辑
    alert("已登出");
  };

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
          <p className="text-gray-600 mt-1">管理您的账户和系统偏好</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">返回仪表板</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 账户信息卡片 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">账户信息</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-700">用户名</span>
              <span className="text-sm text-gray-600">{session?.user?.name || "-"}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-700">邮箱</span>
              <span className="text-sm text-gray-600">{session?.user?.email}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-700">角色</span>
              <span className="text-sm text-gray-600">{(session?.user as any)?.role || "USER"}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-700">账户 ID</span>
              <span className="text-sm text-gray-600 font-mono">{session?.user?.id}</span>
            </div>
          </div>
        </div>

        {/* 通知设置 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">通知设置</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <span className="text-sm font-medium text-gray-700">启用通知</span>
                <p className="text-xs text-gray-500">接收系统消息和更新</p>
              </div>
              <Switch
                id="notif-toggle"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <span className="text-sm font-medium text-gray-700">邮件更新</span>
                <p className="text-xs text-gray-500">接收产品更新和新闻</p>
              </div>
              <Switch
                id="email-toggle"
                checked={emailUpdates}
                onCheckedChange={setEmailUpdates}
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-700">短信提醒</span>
              <Switch id="sms-toggle" />
            </div>
          </div>
        </div>

        {/* 外观设置 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">外观设置</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-700">界面语言</span>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-40 px-2 py-1 border rounded-md"
              >
                <option value="zh-CN">简体中文</option>
                <option value="en-US">English</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-700">主题模式</span>
              <select
                id="theme-select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-40 px-2 py-1 border rounded-md"
              >
                <option value="light">浅色</option>
                <option value="dark">深色</option>
                <option value="auto">跟随系统</option>
              </select>
            </div>
          </div>
        </div>

        {/* 个人资料 */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">个人资料</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="bio">个人简介</Label>
              <Textarea
                id="bio"
                placeholder="介绍一下自己..."
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-6">
            <Button onClick={handleSave} className="w-full">
              保存修改
            </Button>
          </div>
        </div>

        {/* 用户操作 */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200 shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">用户操作</h2>
          <div className="space-y-4">
            <Button variant="outline" onClick={handleSave} className="w-full">
              保存设置
            </Button>
            <Menu>
              <MenuTrigger render={<Button variant="ghost" className="w-full">更多操作</Button>} />
              <MenuPopup>
                <MenuItem onClick={() => alert("个人资料")}>📝 编辑资料</MenuItem>
                <MenuItem onClick={() => alert("修改密码")}>🔑 修改密码</MenuItem>
                <MenuItem onClick={() => alert("导出数据")}>📤 导出数据</MenuItem>
                <MenuItem onClick={handleSignOut}>🚪 退出登录</MenuItem>
              </MenuPopup>
            </Menu>
          </div>
        </div>,
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">取消</Button>
        <Button onClick={handleSave}>保存设置</Button>
      </div>
    </div>
  );
}
