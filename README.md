# AIWebStack Starter

> 专为 AI 辅助开发设计的全栈脚手架

## ✨ 特性

- **Next.js 15** - App Router + Server Components
- **Base UI** - 无头组件库，完全样式自由
- **tRPC** - 端到端类型安全 API
- **Prisma** - 类型安全的 ORM
- **Tailwind CSS v4** - 原子化样式 + CSS Variables 主题
- **Turborepo** - 高性能 Monorepo
- **TypeScript** - 严格模式

## 🚀 快速开始

### 前置要求

- Node.js 20+
- pnpm 9+

### 初始化项目

```bash
# 1. 克隆模板
git clone <your-repo> my-app
cd my-app

# 2. 安装依赖
pnpm install

# 3. 配置数据库
cp packages/db/.env.example packages/db/.env
# 编辑 DATABASE_URL

# 4. 同步数据库
pnpm --filter @repo/db db:push

# 5. 启动开发服务器
pnpm dev
```

访问 http://localhost:3000

## 📦 项目结构

```
├── apps/
│   └── web/                 # Next.js 主应用
├── packages/
│   ├── ui/                  # UI 组件库
│   ├── db/                  # Prisma 数据库
│   ├── api/                 # tRPC API
│   ├── config/              # 共享配置
│   └── utils/               # 工具函数
└── templates/               # AI 代码模板
```

## 🎨 组件使用

```tsx
// 从 @repo/ui 导入组件
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Dialog } from '@repo/ui/components/dialog';

// 业务组件块
import { PageHeader } from '@repo/ui/blocks/page-header';
import { FormCard } from '@repo/ui/blocks/form-card';
```

## 🔧 常用命令

```bash
# 开发
pnpm dev              # 启动所有服务
pnpm --filter @repo/web dev  # 仅启动 web

# 构建
pnpm build            # 构建所有包

# 数据库
pnpm --filter @repo/db db:push      # 同步 schema
pnpm --filter @repo/db db:migrate   # 运行迁移
pnpm --filter @repo/db db:studio    # 打开 Prisma Studio

# 类型检查
pnpm typecheck        # 检查所有包
```

## 🤖 AI 辅助开发

查看 [CLAUDE.md](./CLAUDE.md) 获取完整的 AI 上下文文档。

### AI 工作流示例

```
你: 创建一个文章管理功能

AI 将执行:
1. 更新 packages/db/prisma/schema.prisma
2. 创建 packages/api/src/routers/post.ts
3. 创建 apps/web/src/app/posts/page.tsx
4. 使用 @repo/ui 组件构建 UI
```

## 📄 许可证

MIT
