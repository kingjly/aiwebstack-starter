# AIWebStack Starter

[![GitHub stars](https://img.shields.io/github/stars/kingjly/aiwebstack-starter?style=social)](https://github.com/kingjly/aiwebstack-starter)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)

专为 AI 辅助开发优化的现代全栈 Web 应用脚手架。基于 Next.js 16、tRPC、Prisma 和 Tailwind CSS 构建。

**[English](./README.md)**

## 特性

- ⚡ **Next.js 16** - App Router + React 19
- 🔒 **用户认证** - Better Auth 邮箱密码登录
- 🗄️ **数据库** - PostgreSQL + Prisma ORM
- 🔌 **API 层** - tRPC v11 端到端类型安全
- 🎨 **UI 组件** - Base UI + Tailwind CSS 4
- 🌓 **暗色模式** - 语义化颜色系统，自动适配
- 📦 **Monorepo** - Turborepo + pnpm 工作区
- 🃏 **数据表格** - 内置搜索、排序、分页

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | [Next.js](https://nextjs.org/) | 16.x |
| 运行时 | [React](https://react.dev/) | 19.x |
| 语言 | [TypeScript](https://www.typescriptlang.org/) | 5.9+ |
| 样式 | [Tailwind CSS](https://tailwindcss.com/) | v4 |
| 组件 | [Base UI](https://base-ui.com/) | 1.0-rc |
| API | [tRPC](https://trpc.io/) | v11 |
| 数据库 | [PostgreSQL](https://www.postgresql.org/) | - |
| ORM | [Prisma](https://www.prisma.io/) | 7.x |
| 认证 | [Better Auth](https://better-auth.com/) | 1.4+ |
| Monorepo | [Turborepo](https://turbo.build/) | 2.8+ |

## 快速开始

### 使用模板

点击页面顶部的 **"Use this template"** 按钮创建新仓库。

或使用 GitHub CLI：

```bash
gh repo create my-app --template kingjly/aiwebstack-starter
```

### 安装

```bash
# 克隆仓库
git clone https://github.com/kingjly/aiwebstack-starter.git
cd aiwebstack-starter

# 安装依赖
pnpm install

# 配置环境变量
cp apps/web/.env.example apps/web/.env
```

### 环境变量

```env
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-at-least-32-characters"
BETTER_AUTH_URL="http://localhost:3024"
```

### 数据库初始化

```bash
pnpm db:push
```

### 启动开发服务器

```bash
pnpm dev
```

浏览器访问 [http://localhost:3024](http://localhost:3024)

## 项目结构

```
aiwebstack-starter/
├── apps/
│   └── web/                 # Next.js 应用
│       ├── app/             # App Router 页面
│       ├── lib/             # 工具函数
│       └── components/      # 应用组件
├── packages/
│   ├── api/                 # tRPC 路由
│   ├── db/                  # Prisma Schema 和客户端
│   ├── ui/                  # 共享 UI 组件
│   ├── auth/                # 认证配置
│   └── utils/               # 共享工具
├── turbo.json
└── pnpm-workspace.yaml
```

## 常用命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建所有包和应用
pnpm lint         # ESLint 检查
pnpm typecheck    # TypeScript 类型检查

# 数据库
pnpm db:push      # 推送 Schema 到数据库
pnpm db:generate  # 生成 Prisma Client
pnpm db:studio    # 打开 Prisma Studio
```

## UI 组件库

`@repo/ui` 中可用的组件：

| 类别 | 组件 |
|------|------|
| **基础** | Button, Input, Label, Switch, Checkbox, Textarea |
| **表格** | Table, DataTable, TableHeader, TableBody, TableRow, TableCell |
| **弹窗** | Dialog, DialogTrigger, DialogPopup, DialogClose |
| **导航** | Menu, Tabs, Sidebar, Header |
| **浮层** | Popover, Tooltip |
| **布局** | Page, Card, Container, Section, DashboardLayout |
| **表单** | Form, FormField, FormInput, FormSelect |
| **其他** | Badge, Pagination, ErrorBoundary |

### DataTable 示例

```tsx
import { DataTable, Column } from "@repo/ui";

const columns: Column<User>[] = [
  { key: "name", title: "姓名", sortable: true },
  { key: "email", title: "邮箱", sortable: true },
  { key: "role", title: "角色", width: "100px", align: "center" },
];

<DataTable
  columns={columns}
  data={users}
  keyField="id"
  searchFields={["name", "email"]}
  searchPlaceholder="搜索用户..."
/>
```

## 语义化颜色系统

使用语义化颜色自动支持暗色模式：

```tsx
// ✅ 推荐 - 自动适配暗色模式
<div className="bg-surface text-primary border-border">

// ❌ 避免
<div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
```

| 变量 | 用途 |
|------|------|
| `bg-background` | 页面背景 |
| `bg-surface` | 卡片/容器背景 |
| `bg-muted` | 次要背景 |
| `text-primary` | 主要文字 |
| `text-secondary` | 次要文字 |
| `text-muted-foreground` | 辅助文字 |
| `border-border` | 主要边框 |

## 贡献

欢迎提交 Pull Request！

## 许可证

[MIT License](./LICENSE)

---

由 [kingjly](https://github.com/kingjly) 用 ❤️ 构建
