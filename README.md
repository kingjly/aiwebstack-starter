# AIWebStack Starter

一个现代化的全栈 Web 应用脚手架，集成了 AI 友好的技术栈，开箱即用。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 运行时 | React 19 + TypeScript |
| 样式 | Tailwind CSS 4 + 语义化颜色系统 |
| 组件 | Base UI + 自定义组件库 |
| 认证 | Better Auth |
| 数据库 | PostgreSQL + Prisma ORM |
| API | tRPC (端到端类型安全) |
| 包管理 | Turborepo + pnpm |

## 特性

- **暗色主题**：完整的浅色/暗色主题切换，语义化颜色系统
- **认证系统**：登录、注册、会话管理
- **用户管理**：完整的 CRUD 操作示例
- **组件库**：可复用的 UI 组件包
- **类型安全**：端到端 TypeScript 类型推导
- **响应式设计**：适配桌面和移动端

## 快速开始

### 环境要求

- Node.js 18+
- pnpm 8+
- PostgreSQL

### 安装

```bash
# 克隆仓库
git clone https://github.com/kingjly/aiwebstack-starter.git
cd aiwebstack-starter

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env
```

### 配置环境变量

```env
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/aiwebstack"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

### 数据库迁移

```bash
pnpm db:push
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

## 项目结构

```
aiwebstack-starter/
├── apps/
│   ├── web/          # Next.js 应用
│   └── api/          # API 服务 (可选独立部署)
├── packages/
│   ├── ui/           # 共享 UI 组件库
│   ├── api/          # tRPC 路由定义
│   ├── db/           # Prisma 数据库
│   ├── auth/         # 认证配置
│   └── utils/        # 工具函数
└── turbo.json        # Turborepo 配置
```

## 可用脚本

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建所有应用
pnpm lint         # 代码检查
pnpm db:push      # 推送数据库变更
pnpm db:studio    # 打开 Prisma Studio
```

## 组件库

包含以下可复用组件：

- `Button` - 按钮组件 (多种变体)
- `Input` / `Textarea` - 输入组件
- `Dialog` - 对话框
- `Badge` - 徽章
- `Table` - 表格
- `Pagination` - 分页
- `Switch` - 开关
- `Checkbox` - 复选框
- `Tabs` - 标签页
- `Menu` - 菜单
- `Tooltip` - 提示
- `Popover` - 弹出框
- 以及更多...

## 许可证

[MIT License](./LICENSE)

---

Built with ❤️ using AIWebStack
