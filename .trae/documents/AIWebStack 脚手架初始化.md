## 脚手架结构

```
aiwebstack-starter/
├── apps/
│   └── web/                    # Next.js 16 主应用
│       ├── app/
│       │   ├── layout.tsx      # 根布局 + Providers
│       │   ├── page.tsx        # 首页
│       │   └── globals.css     # Tailwind 入口
│       ├── lib/trpc.ts         # tRPC 客户端
│       ├── next.config.ts
│       └── package.json
├── packages/
│   ├── ui/                     # Base UI + Tailwind 组件
│   │   ├── src/components/     # Button, Dialog, Input
│   │   └── package.json
│   ├── db/                     # Prisma 数据库层
│   │   ├── prisma/schema.prisma
│   │   └── package.json
│   ├── api/                    # tRPC 路由
│   │   ├── src/routers/
│   │   └── package.json
│   ├── contracts/              # 共享类型
│   ├── config/                 # TS/ESLint 配置
│   └── utils/                  # cn() 等工具
├── AIWebStack/                 # Skill 文档 (已存在)
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.json
└── .gitignore
```

## 执行步骤

1. **根目录配置** - package.json, pnpm-workspace.yaml, turbo.json, tsconfig.json
2. **packages/config** - 共享 TS/ESLint 配置
3. **packages/utils** - cn() 工具函数
4. **packages/db** - Prisma + User 模型
5. **packages/api** - tRPC 初始化 + user 路由
6. **packages/contracts** - 共享类型
7. **packages/ui** - Base UI 组件封装 (Button, Dialog, Input)
8. **apps/web** - Next.js 16 应用 + tRPC Provider

## 依赖版本

* Next.js 16.1.6 / React 19.2.4

* TypeScript 5.9.3

* Prisma 7.3.0

* tRPC 11.9.0

* Tailwind CSS 4.1.18

* Base UI 1.0.0-rc.0

* TanStack Query 5.90.20

* Better Auth 1.4.18

