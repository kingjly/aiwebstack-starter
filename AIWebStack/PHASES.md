# 开发阶段

本文档概述了使用 AIWebStack 构建项目的标准生命周期。

## 第一阶段：初始化与基础设施

**目标**：建立 Monorepo 结构和核心共享包。

1.  **搭建 Turborepo**: 使用 `pnpm` 初始化工作区。
2.  **设置共享配置**: 创建 `@repo/config` 用于 ESLint, TS, Tailwind。
3.  **数据库层**: 使用 Prisma 初始化 `@repo/db`。
    -   操作: `pnpm dlx prisma init`
    -   操作: 定义初始 `User` 模型。
4.  **API 层**: 使用 tRPC 初始化 `@repo/api`。
    -   操作: 设置 `trpc.ts` (initTRPC)。
    -   操作: 创建根路由 (root router)。

## 第二阶段：核心应用设置

**目标**：让 Next.js 应用运行起来并连接到后端。

1.  **前端设置**: 使用 Next.js 15 初始化 `apps/web`。
2.  **集成**:
    -   安装 `@repo/ui`, `@repo/db`, `@repo/api`。
    -   在 `next.config.js` 中配置 `transpilePackages`。
    -   在 `layout.tsx` 中设置 tRPC React Query 提供者 (Provider)。
3.  **身份验证**:
    -   安装 Auth 提供商 (Better Auth / NextAuth)。
    -   创建认证路由 (login, register)。
    -   在 tRPC 中实现 `protectedProcedure` 中间件。

## 第三阶段：功能开发循环

**目标**：使用“类型安全隧道”迭代构建功能。

1.  **Schema**: 使用新模型更新 `schema.prisma`。
    -   运行: `pnpm db:push`
2.  **后端**: 在 `@repo/api` 中创建/更新 tRPC 路由。
    -   定义输入验证 (Zod)。
    -   使用 Prisma 实现逻辑。
3.  **前端**: 在 `apps/web` 或 `@repo/ui` 中构建 UI 组件。
    -   使用 `trpc.useQuery` 或 `trpc.useMutation`。
    -   应用 Tailwind 样式。
4.  **验证**: 运行 `pnpm typecheck` 以确保端到端的类型安全。

## 第四阶段：生产与优化

**目标**：准备部署。

1.  **优化**:
    -   检查打包体积 (bundle size)。
    -   验证 `output: "standalone"`。
    -   配置图片优化。
2.  **测试**:
    -   单元测试: 使用 Vitest 测试工具函数。
    -   E2E 测试: 使用 Playwright 测试关键流程。
3.  **CI/CD**:
    -   设置 GitHub Actions (Lint, Test, Build)。
    -   连接到 Vercel/Neon。

## 第五阶段：维护

-   **更新**: 定期运行 `pnpm update` 更新依赖。
-   **监控**: 检查 Sentry 和 Vercel Analytics。
-   **迁移**: 对 Schema 变更使用 `prisma migrate deploy`。
