"use client";

import { trpc } from "@/lib/trpc";
import Link from "next/link";
import { Button, Input, Label, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TableFooter, Badge, Dialog, DialogClose, StyledDialogPopup, Pagination } from "@repo/ui";
import { useState } from "react";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date | string;
}

export default function UsersPage() {
  const { data: users, isPending } = trpc.user.list.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">加载中...</div>
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

  const handleDelete = () => {
    if (selectedUser) {
      console.log("删除用户:", selectedUser.id);
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const totalUsers = users?.length ?? 0;
  const userCount = filteredUsers.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
          <p className="text-gray-600 mt-1">管理系统用户和权限</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">返回仪表板</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <Input
                id="search"
                placeholder="搜索用户名或邮箱..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="role-filter" className="text-sm">角色:</Label>
              <select
                id="role-filter"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-32 px-2 py-1 border rounded-md"
              >
                <option value="all">全部</option>
                <option value="USER">普通用户</option>
                <option value="ADMIN">管理员</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="status-filter" className="text-sm">状态:</Label>
              <select
                id="status-filter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-32 px-2 py-1 border rounded-md"
              >
                <option value="all">全部</option>
                <option value="active">已激活</option>
                <option value="inactive">未激活</option>
              </select>
            </div>

            <Button>新增用户</Button>
          </div>
        </div>

        <Table>
          <TableCaption>
            共 {totalUsers} 位用户，当前显示 {userCount} 位
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input type="checkbox" className="rounded border-gray-300" />
              </TableHead>
              <TableHead>姓名</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  暂无用户数据
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-medium">{user.name || "-"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={user.role === "ADMIN" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-600"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={user.email ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                      {user.email ? "已激活" : "未激活"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString("zh-CN")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">编辑</Button>
                      <Button variant="destructive" size="sm" onClick={() => { setSelectedUser(user); setDeleteDialogOpen(true); }}>删除</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <span className="text-sm text-gray-600">已选择 0 项</span>
              </TableCell>
              <TableCell colSpan={4} className="text-right">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <StyledDialogPopup>
          <h3 className="text-lg font-semibold text-gray-900">确认删除</h3>
          <p className="text-sm text-gray-600 mt-2">
            确定要删除用户 <span className="font-semibold">{selectedUser?.name}</span> 吗？此操作无法撤销。
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <DialogClose render={<Button variant="outline">取消</Button>} />
            <DialogClose render={<Button variant="destructive" onClick={handleDelete}>确认删除</Button>} />
          </div>
        </StyledDialogPopup>
      </Dialog>
    </div>
  );
}
