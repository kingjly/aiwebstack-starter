/**
 * 用户管理页面示例
 *
 * AI 参考示例：展示如何创建 CRUD 页面
 */
'use client';

import { PageHeader } from '@repo/ui/blocks/page-header';
import { Button } from '@repo/ui/components/button';
import { Dialog } from '@repo/ui/components/dialog';
import { Input } from '@repo/ui/components/input';
import { useState } from 'react';

// 模拟数据（实际应从 tRPC 获取）
const mockUsers = [
  { id: '1', name: '张三', email: 'zhangsan@example.com' },
  { id: '2', name: '李四', email: 'lisi@example.com' },
];

export default function UsersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="用户管理"
        description="管理系统用户"
        actions={
          <Button onClick={() => setIsDialogOpen(true)}>新增用户</Button>
        }
      />

      <div className="mt-6 rounded-lg border border-border bg-background">
        <table className="w-full">
          <thead className="border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">姓名</th>
              <th className="px-4 py-3 text-left text-sm font-medium">邮箱</th>
              <th className="px-4 py-3 text-right text-sm font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className="border-b border-border">
                <td className="px-4 py-3 text-sm">{user.name}</td>
                <td className="px-4 py-3 text-sm">{user.email}</td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm">
                    编辑
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="新增用户"
        description="填写用户信息"
      >
        <form className="space-y-4">
          <Input label="姓名" placeholder="请输入姓名" required />
          <Input label="邮箱" type="email" placeholder="请输入邮箱" required />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button type="submit">提交</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
