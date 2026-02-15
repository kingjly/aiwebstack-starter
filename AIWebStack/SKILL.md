---
name: AIWebStack
description: "2026 AI 优化 Web 技术栈"（Next.js 15, Turborepo, Prisma 7, tRPC）的专家级架构师。适用于初始化项目、生成样板代码或在此特定的高性能、类型安全生态系统中实现功能。
---

# AIWebStack Skill

本 Skill 代表了一位专注于"2026 AI 优化 Web 技术栈"的全栈架构师专家。它基于一个经过验证的、稳定的、专为 AI 辅助开发设计的类型安全基础，提供指导、代码生成和架构决策。

## 核心技术栈 (方案 A - 推荐)

- **Monorepo**: Turborepo
- **前端框架**: Next.js 15 (App Router + Server Actions)
- **语言**: TypeScript 5.7+ (严格模式)
- **API 层**: tRPC v11 或 Server Actions
- **数据库**: PostgreSQL (Neon/Supabase)
- **ORM**: Prisma 7 (100% JS 引擎)
- **状态管理**: TanStack Query v5
- **UI 基础层**: Base UI (无样式组件 + 完整可访问性)
- **样式方案**: Tailwind CSS v4
- **鉴权**: Better Auth / NextAuth v5
- **部署**: Vercel (Standalone 输出)

## 核心能力

1.  **项目脚手架**: 生成配置完善的 Turborepo 工作区结构。
2.  **配置管理**: 提供针对 TypeScript, ESLint, Tailwind 和 Next.js 的优化配置。
3.  **功能实现**: 生成端到端的类型安全功能（Schema -> tRPC Router -> UI 组件）。
4.  **最佳实践强制**: 确保遵循架构规则（例如：“禁止在组件中直接调用数据库”）。

## 使用示例

### 1. 初始化项目结构
> "使用 AIWebStack 方案 A 初始化一个新的 Web 项目。"

### 2. 添加新功能
> "创建一个'博客文章'功能。我需要 Prisma 模型、用于 CRUD 操作的 tRPC 路由，以及一个列出文章的 Next.js 页面。"

### 3. 配置基础设施
> "生成针对此技术栈优化的 `turbo.json` 配置。"

### 4. 设置身份验证
> "根据此技术栈，我应该如何在 `apps/web/app/(auth)` 中构建认证路由？"

## 规则与约束

1.  **类型安全**: 所有代码必须严格类型化。禁止使用 `any`。返回类型必须显式声明。
2.  **单一真相源**: `schema.prisma` 是数据模型的唯一真相源。
3.  **API 边界**: 使用 `packages/api` 放置 tRPC 路由。不要将数据库逻辑泄露给客户端。
4.  **组件设计**: 优先使用服务端组件（Server Components）。仅在需要交互时使用 `"use client"`。
5.  **样式**: 使用 Tailwind CSS 原子类。避免内联样式。
6.  **UI 组件**: 使用 Base UI 作为无样式基础，通过 `slotProps` 应用 Tailwind 类名。封装到 `@repo/ui` 中复用。

## 相关文件
- [PHASES.md](./PHASES.md) - 开发工作流阶段。
- [REFERENCE.md](./REFERENCE.md) - 代码片段和配置参考。
- [RESOURCES.md](./RESOURCES.md) - 外部文档链接。
