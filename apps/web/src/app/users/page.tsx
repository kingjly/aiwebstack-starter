/**
 * 用户管理页面
 *
 * 功能：用户列表展示、新增、编辑、删除
 * 使用：tRPC API + @repo/ui 组件
 */
'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import {
  DialogRoot,
  DialogContent,
} from '@repo/ui/components/dialog';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface UserForm {
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  isActive: boolean;
  createdAt: Date;
}

export default function UsersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserForm>({
    email: '',
    name: '',
    role: 'USER',
  });

  // tRPC queries
  const { data, refetch } = trpc.user.list.useQuery({ limit: 50 });
  const createUser = trpc.user.create.useMutation();
  const updateUser = trpc.user.update.useMutation();
  const deleteUser = trpc.user.delete.useMutation();

  const users = data?.items || [];

  // 打开新增对话框
  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ email: '', name: '', role: 'USER' });
    setIsDialogOpen(true);
  };

  // 打开编辑对话框
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      name: user.name || '',
      role: user.role as 'USER' | 'ADMIN',
    });
    setIsDialogOpen(true);
  };

  // 删除用户
  const handleDelete = async (id: string) => {
    if (confirm('确定要删除此用户吗？')) {
      await deleteUser.mutateAsync({ id });
      refetch();
    }
  };

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      // 更新用户
      await updateUser.mutateAsync({
        id: editingUser.id,
        ...formData,
      });
    } else {
      // 新增用户
      await createUser.mutateAsync(formData);
    }

    setIsDialogOpen(false);
    refetch();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页头 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">用户管理</h1>
          <p className="mt-2 text-muted-foreground">管理系统用户和权限</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          新增用户
        </Button>
      </div>

      {/* 用户列表 */}
      <div className="rounded-lg border border-border bg-background">
        <table className="w-full">
          <thead className="border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">姓名</th>
              <th className="px-4 py-3 text-left text-sm font-medium">邮箱</th>
              <th className="px-4 py-3 text-left text-sm font-medium">角色</th>
              <th className="px-4 py-3 text-left text-sm font-medium">状态</th>
              <th className="px-4 py-3 text-right text-sm font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  暂无用户数据
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-border">
                  <td className="px-4 py-3 text-sm">{user.name || '-'}</td>
                  <td className="px-4 py-3 text-sm">{user.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'ADMIN'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.role === 'ADMIN' ? '管理员' : '用户'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.isActive ? '激活' : '禁用'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-muted-foreground hover:text-foreground mr-3"
                      title="编辑"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-muted-foreground hover:text-error"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 新增/编辑对话框 */}
      <DialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          title={editingUser ? '编辑用户' : '新增用户'}
          description={editingUser ? '修改用户信息' : '填写用户信息'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="邮箱"
              type="email"
              placeholder="请输入邮箱"
              value={formData.email}
              onChange={(e: { target: { value: string } }) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="姓名"
              type="text"
              placeholder="请输入姓名"
              value={formData.name}
              onChange={(e: { target: { value: string } }) => setFormData({ ...formData, name: e.target.value })}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">角色</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value as 'USER' | 'ADMIN' })
                }
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="USER">用户</option>
                <option value="ADMIN">管理员</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsDialogOpen(false)}
              >
                取消
              </Button>
              <Button type="submit">
                {editingUser ? '保存' : '提交'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogRoot>
    </div>
  );
}
