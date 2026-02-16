"use client";

import { trpc } from "@/lib/trpc";
import Link from "next/link";
import { Button, Input, Label, Badge, Dialog, DialogClose, StyledDialogPopup, Pagination } from "@repo/ui";
import { useState } from "react";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date | string;
}

export default function UsersPage() {
  const utils = trpc.useUtils();
  const { data: users, isPending } = trpc.user.list.useQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pageSize = 10;

  // 表单数据
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER" as "USER" | "ADMIN",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mutations
  const createMutation = trpc.user.create.useMutation({
    onSuccess: () => {
      utils.user.list.invalidate();
      setCreateDialogOpen(false);
      resetForm();
    },
    onSettled: () => setIsSubmitting(false),
  });

  const updateMutation = trpc.user.update.useMutation({
    onSuccess: () => {
      utils.user.list.invalidate();
      setEditDialogOpen(false);
      resetForm();
    },
    onSettled: () => setIsSubmitting(false),
  });

  const deleteMutation = trpc.user.delete.useMutation({
    onSuccess: () => {
      utils.user.list.invalidate();
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    },
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">加载中...</div>
      </div>
    );
  }

  const filteredUsers = (users ?? []).filter((user: User) => {
    const matchesSearch = !searchQuery ||
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all" ||
      (selectedStatus === "active" && user.email) ||
      (selectedStatus === "inactive" && !user.email);
    return matchesSearch && matchesRole && matchesStatus;
  }) ?? [];

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", role: "USER" });
    setErrors({});
    setSelectedUser(null);
  };

  const validateForm = (isEdit = false) => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "请输入用户名";
    if (!formData.email.trim()) newErrors.email = "请输入邮箱";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "邮箱格式不正确";
    if (!isEdit && !formData.password) newErrors.password = "请输入密码";
    else if (!isEdit && formData.password.length < 6) newErrors.password = "密码至少 6 位";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleCreate = () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    createMutation.mutate({
      name: formData.name,
      email: formData.email,
      role: formData.role,
    });
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email,
      password: "",
      role: user.role as "USER" | "ADMIN",
    });
    setEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!validateForm(true) || !selectedUser) return;
    setIsSubmitting(true);
    updateMutation.mutate({
      id: selectedUser.id,
      name: formData.name,
      email: formData.email,
      role: formData.role,
    });
  };

  const handleDelete = () => {
    if (!selectedUser) return;
    deleteMutation.mutate({ id: selectedUser.id });
  };

  const totalUsers = users?.length ?? 0;
  const adminCount = users?.filter((u: User) => u.role === "ADMIN").length ?? 0;
  const activeCount = users?.filter((u: User) => u.email).length ?? 0;

  const stats = [
    { label: "总用户", value: totalUsers, color: "text-blue-600" },
    { label: "管理员", value: adminCount, color: "text-purple-600" },
    { label: "活跃用户", value: activeCount, color: "text-green-600" },
  ];

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-primary">用户管理</h1>
          <p className="text-sm text-muted-foreground mt-1">管理系统用户和权限</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">返回概览</Button>
          </Link>
          <Button size="sm" onClick={() => setCreateDialogOpen(true)}>新增用户</Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface rounded-lg border border-border p-4"
          >
            <div className="text-xs text-muted-foreground">{stat.label}</div>
            <div className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* 主内容卡片 */}
      <div className="bg-surface rounded-lg border border-border">
        {/* 工具栏 */}
        <div className="px-5 py-4 border-b border-border">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px] max-w-sm">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <Input
                  placeholder="搜索用户名或邮箱..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="h-9 px-3 text-sm border border-border rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">全部角色</option>
                <option value="USER">普通用户</option>
                <option value="ADMIN">管理员</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-9 px-3 text-sm border border-border rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">全部状态</option>
                <option value="active">已激活</option>
                <option value="inactive">未激活</option>
              </select>
            </div>
          </div>
        </div>

        {/* 用户列表 */}
        <div className="divide-y divide-border">
          {paginatedUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-sm">暂无用户数据</p>
            </div>
          ) : (
            paginatedUsers.map((user: User) => (
              <div
                key={user.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-secondary text-sm font-medium shrink-0">
                    {user.name?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary truncate">
                        {user.name || "未设置姓名"}
                      </span>
                      {user.role === "ADMIN" && (
                        <Badge variant="info" className="text-[10px] px-1.5 py-0">管理员</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                  <Badge variant={user.email ? "success" : "default"}>
                    {user.email ? "已激活" : "未激活"}
                  </Badge>
                  <span className="hidden sm:block w-24">
                    {new Date(user.createdAt).toLocaleDateString("zh-CN")}
                  </span>
                </div>

                <div className="flex items-center gap-1 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-primary"
                    onClick={() => handleEdit(user)}
                  >
                    编辑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-error"
                    onClick={() => {
                      setSelectedUser(user);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    删除
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="px-5 py-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              显示 {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filteredUsers.length)} / 共 {filteredUsers.length} 位用户
            </span>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* 新增用户弹窗 */}
      <Dialog open={createDialogOpen} onOpenChange={(open) => { setCreateDialogOpen(open); if (!open) resetForm(); }}>
        <StyledDialogPopup className="max-w-md">
          <h3 className="text-base font-semibold text-primary mb-4">新增用户</h3>

          <div className="space-y-4">
            <div>
              <Label>用户名 <span className="text-error">*</span></Label>
              <Input
                placeholder="请输入用户名"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={errors.name ? "border-error" : ""}
              />
              {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label>邮箱 <span className="text-error">*</span></Label>
              <Input
                type="email"
                placeholder="请输入邮箱"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={errors.email ? "border-error" : ""}
              />
              {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label>密码 <span className="text-error">*</span></Label>
              <Input
                type="password"
                placeholder="请输入密码"
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
                className={errors.password ? "border-error" : ""}
              />
              {errors.password && <p className="text-xs text-error mt-1">{errors.password}</p>}
            </div>

            <div>
              <Label>角色</Label>
              <select
                value={formData.role}
                onChange={(e) => updateField("role", e.target.value)}
                className="w-full h-10 px-3 mt-1 text-sm border border-border rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="USER">普通用户</option>
                <option value="ADMIN">管理员</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <DialogClose render={<Button variant="outline" size="sm">取消</Button>} />
            <Button size="sm" onClick={handleCreate} disabled={isSubmitting}>
              {isSubmitting ? "创建中..." : "创建用户"}
            </Button>
          </div>
        </StyledDialogPopup>
      </Dialog>

      {/* 编辑用户弹窗 */}
      <Dialog open={editDialogOpen} onOpenChange={(open) => { setEditDialogOpen(open); if (!open) resetForm(); }}>
        <StyledDialogPopup className="max-w-md">
          <h3 className="text-base font-semibold text-primary mb-4">编辑用户</h3>

          <div className="space-y-4">
            <div>
              <Label>用户名 <span className="text-error">*</span></Label>
              <Input
                placeholder="请输入用户名"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={errors.name ? "border-error" : ""}
              />
              {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label>邮箱 <span className="text-error">*</span></Label>
              <Input
                type="email"
                placeholder="请输入邮箱"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={errors.email ? "border-error" : ""}
              />
              {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label>角色</Label>
              <select
                value={formData.role}
                onChange={(e) => updateField("role", e.target.value)}
                className="w-full h-10 px-3 mt-1 text-sm border border-border rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="USER">普通用户</option>
                <option value="ADMIN">管理员</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <DialogClose render={<Button variant="outline" size="sm">取消</Button>} />
            <Button size="sm" onClick={handleUpdate} disabled={isSubmitting}>
              {isSubmitting ? "保存中..." : "保存"}
            </Button>
          </div>
        </StyledDialogPopup>
      </Dialog>

      {/* 删除确认弹窗 */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <StyledDialogPopup className="max-w-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-primary">确认删除</h3>
              <p className="text-xs text-muted-foreground">此操作无法撤销</p>
            </div>
          </div>
          <p className="text-sm text-secondary">
            确定要删除用户 <span className="font-medium text-primary">{selectedUser?.name || selectedUser?.email}</span> 吗？
          </p>
          <div className="flex justify-end gap-2 mt-5">
            <DialogClose render={<Button variant="outline" size="sm">取消</Button>} />
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "删除中..." : "确认删除"}
            </Button>
          </div>
        </StyledDialogPopup>
      </Dialog>
    </div>
  );
}
