"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button, Input, Label } from "@repo/ui";

export default function TrpcDemoPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const { data: users, isLoading, refetch } = trpc.user.list.useQuery();

  const createUser = trpc.user.create.useMutation({
    onSuccess: () => {
      setEmail("");
      setName("");
      refetch();
    },
  });

  const handleCreate = () => {
    if (!email) return;
    createUser.mutate({ email, name: name || undefined });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">tRPC 数据示例</h1>
          <p className="mt-2 text-gray-600">
            类型安全的 API 调用，自动类型推导
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">创建用户</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">用户名（可选）</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="张三"
                />
              </div>
              <Button
                onClick={handleCreate}
                disabled={!email || createUser.isPending}
                className="w-full"
              >
                {createUser.isPending ? "创建中..." : "创建用户"}
              </Button>
              {createUser.error && (
                <p className="text-sm text-red-600">
                  {createUser.error.message}
                </p>
              )}
              {createUser.success && (
                <p className="text-sm text-green-600">用户创建成功！</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">用户列表</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => refetch()}
              >
                刷新
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-8 text-gray-500">加载中...</div>
            ) : users && users.length > 0 ? (
              <div className="space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.name || "未设置"}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {user.role}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                暂无用户数据
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">代码示例</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">服务端 Router</h3>
              <pre className="text-sm bg-gray-900 text-gray-300 rounded-lg p-4 overflow-x-auto">
{`// packages/api/src/routers/user.ts
export const userRouter = createRouter({
  list: publicProcedure.query(async () => {
    return prisma.user.findMany();
  }),

  create: publicProcedure
    .input(z.object({
      email: z.string().email(),
      name: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return prisma.user.create({ data: input });
    }),
});`}
              </pre>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">客户端调用</h3>
              <pre className="text-sm bg-gray-900 text-gray-300 rounded-lg p-4 overflow-x-auto">
{`// 客户端组件中
const { data, isLoading } = trpc.user.list.useQuery();

const createMutation = trpc.user.create.useMutation({
  onSuccess: () => refetch(),
});

// 调用 mutation
createMutation.mutate({ email: "test@example.com" });`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
