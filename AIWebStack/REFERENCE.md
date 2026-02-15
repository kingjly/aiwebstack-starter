# 参考架构与配置

本文档提供 AIWebStack 的标准配置和模式。

## 1. Turborepo 配置 (`turbo.json`)

针对 Next.js 和 Prisma 工作流进行了优化。

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "db:push": {
      "cache": false
    }
  }
}
```

## 2. Next.js 配置 (`next.config.js`)

针对 Vercel 和 Turborepo 进行了优化。

```javascript
/** @type {import('next').NextConfig} */
module.exports = {
  output: "standalone",
  transpilePackages: ["@repo/ui", "@repo/db", "@repo/api"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};
```

## 3. Prisma Schema 示例 (`packages/db/prisma/schema.prisma`)

使用带 JS 引擎的 Prisma 7。

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```

## 4. tRPC 路由示例 (`packages/api/src/routers/user.ts`)

带 Zod 验证的标准 CRUD 模式。

```typescript
import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";
import { prisma } from "@repo/db";

export const userRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.user.findUnique({
        where: { id: input.id },
      });
    }),

  update: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return prisma.user.update({
        where: { id: ctx.user.id },
        data: { name: input.name },
      });
    }),
});
```

## 5. API 响应格式 (`packages/contracts/src/api-response.ts`)

标准化的响应包装器。

```typescript
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    requestId: string;
  };
}
```

## 6. 目录结构

```
my-web-app/
├── apps/
│   ├── web/ (Next.js 主应用)
│   └── admin/ (可选：管理后台)
├── packages/
│   ├── ui/ (共享组件库 - 基于 Base UI + Tailwind)
│   ├── db/ (Prisma Schema 和 Client)
│   ├── api/ (tRPC 路由定义)
│   ├── contracts/ (共享类型定义)
│   ├── config/ (共享配置)
│   └── utils/ (共享工具函数)
└── turbo.json
```

## 7. Base UI 组件封装模式 (`packages/ui`)

Base UI 提供无样式组件和 hooks，使用命名空间模式组织组件。

### 核心原则

- **包名**: `@base-ui/react` (注意：不是 `@base-ui-components/react`)
- **封装位置**: `packages/ui/src/components/`
- **API 模式**: 命名空间模式，如 `Dialog.Root`, `Dialog.Trigger`, `Dialog.Popup`
- **样式方式**: 直接在子组件上使用 `className`，支持 `data-*` 属性选择器

### 封装模式

```typescript
// packages/ui/src/components/Dialog.tsx
"use client";

import { Dialog } from "@base-ui/react/dialog";
import { cn } from "@repo/utils";

// 导出 Root 作为默认组件
export const DialogRoot = Dialog.Root;
export const DialogTrigger = Dialog.Trigger;

export function DialogPopup({ className, children, ...props }) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 bg-black/50 z-40" />
      <Dialog.Popup
        className={cn(
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "bg-white rounded-xl shadow-2xl p-6",
          className
        )}
        {...props}
      >
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  );
}

export const DialogClose = Dialog.Close;
export { DialogRoot as Dialog };
```

### 状态样式 (data-* 属性)

Base UI 使用 `data-*` 属性表示状态，配合 Tailwind 使用：

```typescript
// Switch 组件示例
<Switch.Root
  className={cn(
    "relative inline-flex h-6 w-11 rounded-full cursor-pointer",
    "data-[checked]:bg-blue-600 bg-gray-200",  // 选中状态
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"  // 禁用状态
  )}
>
  <Switch.Thumb
    className={cn(
      "block h-5 w-5 rounded-full bg-white shadow",
      "data-[checked]:translate-x-5 translate-x-0.5"  // 选中时滑动
    )}
  />
</Switch.Root>
```

### render prop 避免嵌套问题

Trigger 组件默认渲染为 `<button>`，使用 `render` prop 避免嵌套：

```tsx
// ❌ 错误：button 嵌套 button
<DialogTrigger>
  <Button>打开</Button>
</DialogTrigger>

// ✅ 正确：使用 render prop
<DialogTrigger render={<Button>打开</Button>} />
```

### 常用组件

| 组件 | 导入路径 | 关键子组件 |
|------|----------|-----------|
| Dialog | `@base-ui/react/dialog` | Root, Trigger, Portal, Backdrop, Popup, Close, Title, Description |
| Menu | `@base-ui/react/menu` | Root, Trigger, Portal, Positioner, Popup, Item |
| Popover | `@base-ui/react/popover` | Root, Trigger, Portal, Positioner, Popup |
| Switch | `@base-ui/react/switch` | Root, Thumb |
| Tabs | `@base-ui/react/tabs` | Root, List, Tab, Panel |
| Tooltip | `@base-ui/react/tooltip` | Root, Trigger, Portal, Positioner, Popup |
| Button | `@base-ui/react/button` | Button (单组件) |
| Field | `@base-ui/react/field` | Root, Label, Description, Error, Control |

### 注意事项

- Base UI 组件需要客户端渲染，封装组件需添加 `"use client"`
- 使用 `clsx` 或 `tailwind-merge` 处理条件类名
- 导出时统一从 `packages/ui/src/index.ts` 导出
- Trigger 类组件默认渲染为 button，嵌套其他按钮组件时需使用 `render` prop

## 8. Tailwind CSS v4 配置

Tailwind CSS v4 使用新的配置方式，通过 CSS 指令而非 JS 配置文件。

### 必需文件

**`apps/web/postcss.config.mjs`** (必需):
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**`apps/web/app/globals.css`**:
```css
@import "tailwindcss";

/* 扫描 monorepo 中其他包的组件 */
@source "../../../packages/ui/src/**/*.{js,ts,jsx,tsx}";
```

### 依赖

```json
{
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0"
  }
}
```

### 注意事项

- Tailwind v4 不再使用 `tailwind.config.ts`，配置通过 CSS 指令完成
- `@source` 指令用于指定内容扫描路径，支持 monorepo 中的其他包
- 必须创建 `postcss.config.mjs` 否则 Tailwind 样式不会生效
