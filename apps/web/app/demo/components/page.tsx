"use client";

import {
  Button,
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  StyledDialogPopup,
  DialogClose,
  Input,
  Label,
  Switch,
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
} from "@repo/ui";

export default function ComponentsDemoPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">UI 组件库</h1>
          <p className="mt-2 text-secondary">
            基于 Base UI + Tailwind CSS v4 构建的组件库
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-surface border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Button 按钮</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </section>

          <section className="bg-surface border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Input 输入框</h2>
            <div className="max-w-sm space-y-4">
              <div className="space-y-2">
                <Label htmlFor="input1">默认输入框</Label>
                <Input id="input1" placeholder="请输入内容..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="input2">邮箱输入框</Label>
                <Input id="input2" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="input3">密码输入框</Label>
                <Input id="input3" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="input4">禁用状态</Label>
                <Input id="input4" disabled value="禁用的输入框" />
              </div>
            </div>
          </section>

          <section className="bg-surface border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Switch 开关</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Switch id="switch1" />
                <Label htmlFor="switch1">默认开关</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="switch2" defaultChecked />
                <Label htmlFor="switch2">开启状态</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="switch3" disabled />
                <Label htmlFor="switch3">禁用状态</Label>
              </div>
            </div>
          </section>

          <section className="bg-surface border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Dialog 对话框</h2>
            <Dialog>
              <DialogTrigger render={<Button>打开对话框</Button>} />
              <StyledDialogPopup>
                <DialogTitle className="text-lg font-semibold">对话框标题</DialogTitle>
                <DialogDescription className="mt-2 text-secondary">
                  这是一个使用 Base UI + Tailwind CSS 构建的对话框组件。
                  支持键盘导航和焦点管理。
                </DialogDescription>
                <div className="mt-4 flex justify-end gap-2">
                  <DialogClose render={<Button variant="outline">取消</Button>} />
                  <DialogClose render={<Button>确认</Button>} />
                </div>
              </StyledDialogPopup>
            </Dialog>
          </section>

          <section className="bg-surface border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Tabs 标签页</h2>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTab value="tab1">标签一</TabsTab>
                <TabsTab value="tab2">标签二</TabsTab>
                <TabsTab value="tab3">标签三</TabsTab>
              </TabsList>
              <TabsPanel value="tab1">
                <div className="rounded-lg border-border-muted bg-muted p-4 mt-2">
                  这是标签一的内容，可以放置任何组件。
                </div>
              </TabsPanel>
              <TabsPanel value="tab2">
                <div className="rounded-lg border-border-muted bg-muted p-4 mt-2">
                  这是标签二的内容，支持键盘导航。
                </div>
              </TabsPanel>
              <TabsPanel value="tab3">
                <div className="rounded-lg border-border-muted bg-muted p-4 mt-2">
                  这是标签三的内容，完全可定制样式。
                </div>
              </TabsPanel>
            </Tabs>
          </section>

          <section className="bg-surface border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Menu 菜单</h2>
            <Menu>
              <MenuTrigger render={<Button variant="outline">打开菜单</Button>} />
              <MenuPopup>
                <MenuItem className="cursor-pointer px-3 py-2 text-sm hover:bg-muted rounded">
                  📝 编辑
                </MenuItem>
                <MenuItem className="cursor-pointer px-3 py-2 text-sm hover:bg-muted rounded">
                  📋 复制
                </MenuItem>
                <MenuItem className="cursor-pointer px-3 py-2 text-sm hover:bg-muted rounded">
                  🗑️ 删除
                </MenuItem>
              </MenuPopup>
            </Menu>
          </section>

          <section className="bg-surface border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Tooltip 提示</h2>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger render={<Button variant="outline">悬停查看</Button>} />
                <TooltipPopup>这是一个提示信息</TooltipPopup>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger render={<Button variant="ghost">另一个提示</Button>} />
                <TooltipPopup>支持任意内容</TooltipPopup>
              </Tooltip>
            </div>
          </section>

          <section className="bg-surface border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Popover 弹出框</h2>
            <Popover>
              <PopoverTrigger render={<Button variant="outline">打开弹出框</Button>} />
              <PopoverPopup>
                <div className="p-4">
                  <h4 className="font-semibold">弹出框标题</h4>
                  <p className="mt-2 text-sm text-secondary">
                    这是一个弹出框组件，可以包含更复杂的内容。
                  </p>
                </div>
              </PopoverPopup>
            </Popover>
          </section>
        </div>
      </div>
    </div>
  );
}
