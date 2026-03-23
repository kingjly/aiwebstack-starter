"use client";

import {
  Button,
  Input,
  Label,
  Switch,
  Dialog,
  DialogTrigger,
  StyledDialogPopup as DialogPopup,
  DialogClose,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
  Menu,
  MenuTrigger,
  MenuPopup,
  MenuItem,
  Tooltip,
  TooltipTrigger,
  TooltipPopup,
  Popover,
  PopoverTrigger,
  PopoverPopup,
  Form,
  FormInput,
  FormSelect,
  Badge,
  Textarea,
} from "@repo/ui";
import { useState } from "react";
import Link from "next/link";

export default function PlaygroundPage() {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedOption, setSelectedOption] = useState("option1");
  const [menuOpen, setMenuOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(5);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">组件展示场</h1>
          <p className="text-secondary mt-2">
            展示所有 UI 组件的实际使用效果
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* 基础组件区 */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">基础组件</h2>

            {/* Button 组 */}
            <div className="bg-surface rounded-lg border-border shadow p-6">
              <h3 className="text-lg font-medium text-primary mb-4">Button 按钮</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>

            {/* Input 组 */}
            <div className="bg-surface rounded-lg border-border shadow p-6">
              <h3 className="text-lg font-medium text-primary mb-4">Input 输入框</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="input-basic">基础输入</Label>
                  <Input id="input-basic" placeholder="请输入内容..." />
                </div>
                <div>
                  <Label htmlFor="input-email">邮箱输入</Label>
                  <Input id="input-email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="input-disabled">禁用状态</Label>
                  <Input id="input-disabled" disabled value="禁用的输入框" />
                </div>
              </div>
            </div>

            {/* Switch 开关 */}
            <div className="bg-surface rounded-lg border-border shadow p-6">
              <h3 className="text-lg font-medium text-primary mb-4">Switch 开关</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Switch id="switch-default" />
                  <Label htmlFor="switch-default">默认开关</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="switch-checked" defaultChecked />
                  <Label htmlFor="switch-checked">开启状态</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="switch-disabled" disabled />
                  <Label htmlFor="switch-disabled">禁用状态</Label>
                </div>
              </div>
            </div>

            {/* Badge 徽章 */}
            <div className="bg-surface rounded-lg border-border shadow p-6">
              <h3 className="text-lg font-medium text-primary mb-4">Badge 徽章</h3>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-medium">
                  新消息
                  <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {badgeCount}
                  </span>
                </span>
                <span className="inline-flex items-center rounded-full bg-green-100 text-green-800 px-3 py-1 text-xs font-medium">
                  在线
                </span>
                <span className="inline-flex items-center rounded-full bg-muted text-secondary px-3 py-1 text-xs font-medium">
                  离线
                </span>
                <span className="inline-flex items-center rounded-full bg-red-100 text-red-800 px-3 py-1 text-xs font-medium">
                  忙碌
                </span>
                <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-800 px-3 py-1 text-xs font-medium">
                  待处理
                </span>
              </div>
            </div>
          </section>

          {/* 表单与反馈组件区 */}
          <section className="space-y-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-primary">表单与反馈</h2>

            {/* Dialog 对话框 */}
            <div className="bg-surface rounded-lg border-border shadow p-6">
              <h3 className="text-lg font-medium text-primary mb-4">Dialog 对话框</h3>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger render={<Button />}>
                  打开对话框
                </DialogTrigger>
                <DialogPopup>
                  <h3 className="text-lg font-semibold text-primary mb-2">对话框标题</h3>
                  <p className="text-sm text-secondary mb-4">
                    这是一个使用 Base UI + Tailwind CSS 构建的对话框组件。支持键盘导航和焦点管理。
                  </p>
                  <div className="flex justify-end gap-2 mt-4">
                    <DialogClose render={<Button variant="outline" />} onClick={() => setDialogOpen(false)}>
                      取消
                    </DialogClose>
                    <DialogClose render={<Button />} onClick={() => setDialogOpen(false)}>
                      确认
                    </DialogClose>
                  </div>
                </DialogPopup>
              </Dialog>
            </div>

            {/* Tabs 标签页 */}
            <div className="bg-surface rounded-lg border-border shadow p-6">
              <h3 className="text-lg font-medium text-primary mb-4">Tabs 标签页</h3>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTab value="tab1">概览</TabsTab>
                  <TabsTab value="tab2">设置</TabsTab>
                  <TabsTab value="tab3">关于</TabsTab>
                </TabsList>
                <TabsPanel value="tab1">
                  <div className="rounded-lg border-border-muted bg-muted p-4">
                    这是概览标签页的内容，展示主要统计数据和关键指标。
                  </div>
                </TabsPanel>
                <TabsPanel value="tab2">
                  <div className="rounded-lg border-border-muted bg-muted p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">启用通知</span>
                        <Switch id="tab2-switch1" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">邮件订阅</span>
                        <Switch id="tab2-switch2" defaultChecked />
                      </div>
                    </div>
                  </div>
                </TabsPanel>
                <TabsPanel value="tab3">
                  <div className="rounded-lg border-border-muted bg-muted p-4">
                    版本信息：v1.0.0
                  </div>
                </TabsPanel>
              </Tabs>
            </div>

            {/* Menu 菜单 */}
            <div className="bg-surface rounded-lg border-border shadow p-6">
              <h3 className="text-lg font-medium text-primary mb-4">Menu 菜单</h3>
              <Menu open={menuOpen} onOpenChange={setMenuOpen}>
                <MenuTrigger render={<Button />}>
                  打开菜单
                </MenuTrigger>
                <MenuPopup>
                  <MenuItem>📝 编辑</MenuItem>
                  <MenuItem>📋 复制</MenuItem>
                  <MenuItem>🗑️ 删除</MenuItem>
                </MenuPopup>
              </Menu>
            </div>

            {/* Tooltip 提示 */}
            <div className="bg-surface rounded-lg border-border shadow p-6">
              <h3 className="text-lg font-medium text-primary mb-4">Tooltip 提示</h3>
              <div className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" />}>
                    悬停查看
                  </TooltipTrigger>
                  <TooltipPopup>这是一个提示信息</TooltipPopup>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="ghost" />}>
                    另一个提示
                  </TooltipTrigger>
                  <TooltipPopup>支持任意内容</TooltipPopup>
                </Tooltip>
              </div>
            </div>

            {/* Popover 弹出框 */}
            <div className="bg-surface rounded-lg border-border shadow p-6">
              <h3 className="text-lg font-medium text-primary mb-4">Popover 弹出框</h3>
              <Popover>
                <PopoverTrigger render={<Button />}>
                  打开弹出框
                </PopoverTrigger>
                <PopoverPopup>
                  <div className="p-4">
                    <h4 className="font-semibold text-primary">弹出框标题</h4>
                    <p className="mt-2 text-sm text-secondary">
                      这是一个弹出框组件，可以包含更复杂的内容。
                    </p>
                  </div>
                </PopoverPopup>
              </Popover>
            </div>

            {/* Textarea 文本域 */}
            <div className="bg-surface rounded-lg border-border shadow p-6">
              <h3 className="text-lg font-medium text-primary mb-4">Textarea 文本域</h3>
              <div>
                <Label htmlFor="textarea-basic">多行文本输入</Label>
                <Textarea
                  id="textarea-basic"
                  placeholder="请输入详细描述..."
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>
          </section>

          {/* 表单组件区 */}
          <section className="space-y-6 lg:col-span-2 xl:col-span-3">
            <h2 className="text-xl font-semibold text-primary">表单组件</h2>

            {/* Form 表单 */}
            <div className="bg-surface rounded-lg border-border shadow p-6">
              <h3 className="text-lg font-medium text-primary mb-4">Form 表单</h3>
              <Form
                onSubmit={(data) => console.log("表单数据:", data)}
                className="space-y-4"
              >
                <FormInput
                  name="username"
                  label="用户名"
                  placeholder="请输入用户名"
                  required
                />
                <FormInput
                  name="email"
                  label="邮箱"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
                <FormSelect
                  name="role"
                  label="角色"
                  placeholder="请选择角色"
                  options={[
                    { value: "admin", label: "管理员" },
                    { value: "editor", label: "编辑" },
                    { value: "viewer", label: "访客" },
                  ]}
                  required
                />
                <div className="flex gap-3 pt-4">
                  <Button type="submit">提交表单</Button>
                  <Button type="reset" variant="outline">重置</Button>
                </div>
              </Form>
            </div>

            {/* Select 选择器 */}
            <div className="bg-surface rounded-lg border-border shadow p-6">
              <h3 className="text-lg font-medium text-primary mb-4">Select 选择器</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="select-plan">选择计划</Label>
                  <div className="relative">
                    <select
                      id="select-plan"
                      className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="free">免费计划</option>
                      <option value="pro">专业计划</option>
                      <option value="enterprise">企业计划</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 返回导航 */}
        <div className="mt-8 flex justify-center">
          <Link href="/demo/components" className="text-secondary hover:text-primary">
            ← 返回组件库列表
          </Link>
        </div>
      </div>
    </div>
  );
}
