"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { Button, Label, Switch, Textarea } from "@repo/ui";

export default function SettingsPage() {
  const { data: session, isPending } = useSession();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [language, setLanguage] = useState("zh-CN");

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">加载中...</div>
      </div>
    );
  }

  const handleSave = () => {
    alert("设置已保存");
  };

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-primary">系统设置</h1>
          <p className="text-sm text-muted-foreground mt-1">管理您的账户和系统偏好</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline" size="sm">返回</Button>
        </Link>
      </div>

      {/* 两列布局 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 左侧主内容 */}
        <div className="xl:col-span-2 space-y-6">
          {/* 账户信息 */}
          <section className="bg-surface rounded-lg border border-border">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-sm font-medium text-primary">账户信息</h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">用户名</div>
                  <div className="text-sm text-primary">{session?.user?.name || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">邮箱</div>
                  <div className="text-sm text-primary">{session?.user?.email}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">角色</div>
                  <div className="text-sm text-primary">{(session?.user as any)?.role || "USER"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">账户 ID</div>
                  <div className="text-xs text-primary font-mono">{session?.user?.id}</div>
                </div>
              </div>
            </div>
          </section>

          {/* 通知设置 */}
          <section className="bg-surface rounded-lg border border-border">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-sm font-medium text-primary">通知设置</h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-primary">启用通知</div>
                    <div className="text-xs text-muted-foreground mt-0.5">接收系统消息和更新</div>
                  </div>
                  <Switch
                    id="notif-toggle"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-primary">邮件更新</div>
                    <div className="text-xs text-muted-foreground mt-0.5">接收产品更新和新闻</div>
                  </div>
                  <Switch
                    id="email-toggle"
                    checked={emailUpdates}
                    onCheckedChange={setEmailUpdates}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 个人资料 */}
          <section className="bg-surface rounded-lg border border-border">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-sm font-medium text-primary">个人资料</h2>
            </div>
            <div className="p-5">
              <div>
                <Label htmlFor="bio" className="text-xs">个人简介</Label>
                <Textarea
                  id="bio"
                  placeholder="介绍一下自己..."
                  rows={3}
                  className="mt-2 text-sm"
                />
              </div>
            </div>
          </section>
        </div>

        {/* 右侧边栏 */}
        <div className="space-y-6">
          {/* 外观设置 */}
          <section className="bg-surface rounded-lg border border-border">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-sm font-medium text-primary">外观设置</h2>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <Label htmlFor="theme-select" className="text-xs">主题模式</Label>
                <p className="text-xs text-muted-foreground mt-1 mb-2">
                  当前: {resolvedTheme === "dark" ? "深色" : "浅色"}
                </p>
                <select
                  id="theme-select"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as "light" | "dark" | "system")}
                  className="w-full h-9 px-3 text-sm border border-border rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">浅色</option>
                  <option value="dark">深色</option>
                  <option value="system">跟随系统</option>
                </select>
              </div>

              <div>
                <Label htmlFor="language-select" className="text-xs">界面语言</Label>
                <p className="text-xs text-muted-foreground mt-1 mb-2">选择应用显示的语言</p>
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full h-9 px-3 text-sm border border-border rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="zh-CN">简体中文</option>
                  <option value="en-US">English</option>
                </select>
              </div>
            </div>
          </section>

          {/* 颜色预览 */}
          <section className="bg-surface rounded-lg border border-border">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-sm font-medium text-primary">颜色预览</h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Background", class: "bg-background" },
                  { name: "Surface", class: "bg-surface" },
                  { name: "Muted", class: "bg-muted" },
                  { name: "Accent", class: "bg-accent" },
                  { name: "Primary", class: "bg-blue-600" },
                  { name: "Success", class: "bg-green-600" },
                ].map((color) => (
                  <div key={color.name} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded ${color.class} border border-border`}></div>
                    <span className="text-xs text-secondary">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 底部操作 */}
      <div className="flex justify-end gap-2">
        <Link href="/dashboard">
          <Button variant="outline" size="sm">取消</Button>
        </Link>
        <Button size="sm" onClick={handleSave}>保存设置</Button>
      </div>
    </div>
  );
}
