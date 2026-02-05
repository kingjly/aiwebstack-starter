# AIWebStack Starter - AI 上下文文档

> 基于 Next.js 15, Turborepo, Prisma, Base UI 的 AI 优化全栈开发脚手架

## 🎯 项目定位

这是一个专为**AI 辅助开发**设计的全栈脚手架。所有架构决策都为了让 AI 更容易理解和生成代码。

### 核心设计理念

1. **约定优于配置** - 明确的文件结构约定，AI 可以准确预测代码位置
2. **类型安全优先** - tRPC + Prisma 实现端到端类型安全
3. **组件原子化** - Base UI 无头组件 + Tailwind CSS，AI 易于组合
4. **单一真相源** - Schema 驱动开发，AI 从 Prisma Schema 理解数据模型

## 📦 Monorepo 结构

```
aiwebstack-starter/
├── apps/
│   └── web/                 # Next.js 15 主应用
│       ├── app/             # App Router (RSC)
│       ├── components/      # 页面特定组件
│       └── lib/             # 客户端工具
│
├── packages/
│   ├── ui/                  # 🔑 核心：Base UI + Tailwind 组件库
│   │   ├── src/
│   │   │   ├── components/  # 基础组件 (button, input, dialog...)
│   │   │   ├── blocks/      # 业务组件块 (page-header, form-card...)
│   │   │   └── styles/      # Design Tokens + 全局样式
│   │   └── package.json
│   │
│   ├── db/                  # Prisma 数据库层
│   │   ├── prisma/
│   │   │   └── schema.prisma  # 🔥 数据模型单一真相源
│   │   └── src/
│   │       └── client.ts    # Prisma Client 导出
│   │
│   ├── api/                 # tRPC API 层
│   │   └── src/
│   │       ├── routers/     # tRPC 路由
│   │       └── trpc.ts      # tRPC 配置
│   │
│   ├── auth/                # 认证模块
│   ├── config/              # 共享配置 (ESLint, TS, Tailwind)
│   ├── contracts/           # 共享类型定义
│   └── utils/               # 共享工具函数
│
├── templates/               # AI 代码生成模板
└── turbo.json
```

## 🎨 Design System

### Design Tokens (CSS Variables)

```css
/* 浅色主题 */
:root {
  --color-primary: oklch(0.7 0.15 250);
  --color-success: oklch(0.7 0.15 150);
  --color-warning: oklch(0.8 0.15 80);
  --color-error: oklch(0.6 0.2 25);

  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */

  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;

  --font-sans: system-ui, sans-serif;
}

/* 深色主题 */
[data-theme="dark"] {
  --color-primary: oklch(0.7 0.15 250);
  /* ... */
}
```

### Tailwind 配置扩展

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        success: 'var(--color-success)',
        // ...
      },
      spacing: {
        1: 'var(--spacing-1)',
        2: 'var(--spacing-2)',
        // ...
      }
    }
  }
}
```

## 🔧 组件使用指南

### 基础组件 (@repo/ui/components)

AI 生成组件时，应从 `@repo/ui/components` 导入：

```tsx
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Dialog } from '@repo/ui/components/dialog';
import { Form, FormField } from '@repo/ui/components/form';
import { Table } from '@repo/ui/components/table';
```

### 业务组件块 (@repo/ui/blocks)

复杂页面应从 `@repo/ui/blocks` 组合：

```tsx
import { PageHeader } from '@repo/ui/blocks/page-header';
import { DataTable } from '@repo/ui/blocks/data-table';
import { FormCard } from '@repo/ui/blocks/form-card';
```

### 所有组件自动支持

- ✅ 深色模式 (通过 `data-theme="dark"` 切换)
- ✅ TypeScript 完整类型
- ✅ 可访问性 (Base UI 内置 A11y)

## 🚀 AI 开发工作流

### 1. 创建新功能

```
用户: 创建用户管理功能

AI 步骤:
1. 更新 packages/db/prisma/schema.prisma
   - 添加 User 模型定义

2. 运行 pnpm db:push 同步数据库

3. 在 packages/api/src/routers/ 创建 user.ts
   - 定义 tRPC 路由 (getById, list, create, update, delete)

4. 在 apps/web/app/users/ 创建页面
   - 从 @repo/ui/components 导入组件
   - 从 @repo/api 导入 tRPC hooks
```

### 2. AI 代码生成规则

| 场景 | 规则 |
|------|------|
| **创建组件** | 优先从 @repo/ui 导入，不重复造轮子 |
| **数据操作** | 必须通过 tRPC，禁止组件直接调用 Prisma |
| **样式** | 使用 Tailwind 原子类，禁止内联 style |
| **类型** | 显式声明返回类型，禁止 any |
| **服务端组件** | 默认使用 Server Components，仅交互时用 "use client" |

### 3. Schema 驱动开发示例

```prisma
// packages/db/prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```

AI 会基于此 Schema 自动生成：
- tRPC 路由的输入验证 (Zod schema)
- TypeScript 类型定义
- 表单组件的 field 定义

## 📋 核心技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 前端框架 | Next.js | 15 |
| UI 库 | Base UI | latest |
| 样式 | Tailwind CSS | 4 |
| 状态管理 | TanStack Query | 5 |
| 数据库 | PostgreSQL | - |
| ORM | Prisma | 7 |
| API | tRPC | 11 |
| 语言 | TypeScript | 5.7+ |
| Monorepo | Turborepo | 2 |
| 包管理 | pnpm | 9 |

## 🚦 重要约束

### 必须遵守

1. **数据流向**: UI → tRPC → Prisma → DB (单向)
2. **类型安全**: 禁止 `any`，所有 API 必须通过 tRPC
3. **组件导入**: UI 组件必须从 `@repo/ui` 导入
4. **Schema 真相**: 数据模型变更先改 `schema.prisma`

### 禁止操作

- ❌ 在组件中直接导入 Prisma Client
- ❌ 使用内联 style 属性
- ❌ 跳过 tRPC 直接调用 API Route
- ❌ 在 Server Components 中使用 useState 等 Hooks

## 🎯 快速参考

### 常用命令

```bash
# 开发
pnpm dev

# 构建
pnpm build

# 数据库
pnpm db:push      # 开发环境同步
pnpm db:migrate   # 生产环境迁移
pnpm db:studio    # 打开 Prisma Studio

# 类型检查
pnpm typecheck
```

### 环境变量模板

```env
# .env.example
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Next Auth (如使用)
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
```

---

**最后更新**: 2026-02
**维护**: AIWebStack Team
