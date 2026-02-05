# AIWebStack 脚手架 - 环境配置文档

## 技术栈

**主要语言**: TypeScript 5.9.3
**框架**: Next.js 15, Turborepo 2
**数据库**: Prisma 7, PostgreSQL
**API**: tRPC 11
**UI**: Base UI 1.1.0, Tailwind CSS 4
**包管理**: pnpm 9

**开发工具**:
- Linter: ESLint 9
- Formatter: Prettier 3
- Type Checker: TypeScript 5.9.3

---

## 配置文件说明

### ESLint 配置

**根目录**: `eslint.config.mjs`
- ESLint 9 扁平配置格式
- 继承 `@repo/config/eslint-config.js`
- 自动排除：node_modules, dist, .next, build, coverage

**运行方式**:
```bash
pnpm lint              # 检查所有包
pnpm --filter @repo/web lint  # 检查 web 应用
```

### PostCSS 配置

**位置**: `apps/web/postcss.config.mjs`
- 配置 autoprefixer（自动添加浏览器前缀）
- 配置 tailwindcss（Tailwind CSS 4）

### Prettier 配置

**根目录**: `.prettierrc`
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100
}
```

**忽略规则**: `.prettierignore`
```
node_modules
dist
.next
build
coverage
pnpm-lock.yaml
```

### TypeScript 配置

**版本**: 统一为 5.9.3
**位置**: `packages/config/tsconfig.json`（共享配置）

### 环境变量

**根目录**: `.env.example`
```bash
# 应用 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# 数据库连接（详细配置见 packages/db/.env.example）
DATABASE_URL="postgresql://user:password@localhost:5432/aiwebstack?schema=public"
```

---

## 质量检查脚本

**位置**: `scripts/quality-check.ps1`

**检查项目**:
1. TypeScript 类型检查
2. ESLint 代码检查
3. 代码复杂度提示
4. TypeScript 版本一致性
5. 配置文件完整性

**运行方式**:
```powershell
.\scripts\quality-check.ps1
```

**退出码**:
- 0: 检查通过
- 1: 检查失败

---

## 代码质量规范

### 强制性规范

| 指标 | 限制 |
|------|------|
| 圈复杂度 | < 10 |
| 嵌套层级 | ≤ 3 |
| 文件行数 | < 500 |
| 函数长度 | < 50 行 |
| 参数数量 | ≤ 5 |

### TypeScript 严格模式

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noImplicitReturns: true`

### 禁止操作

- ❌ 禁止 `any` 类型
- ❌ 禁止在组件中直接导入 Prisma Client
- ❌ 禁止使用内联 style 属性
- ❌ 禁止跳过 tRPC 直接调用 API

---

## Git 仓库

**当前状态**: 已初始化
**远程仓库**: 无

**.gitignore 排除规则**:
```gitignore
node_modules/
dist/
.next/
build/
coverage/
*.log
.env
.env.local
```

---

## 常用命令

```bash
# 开发
pnpm dev              # 启动所有服务
pnpm --filter @repo/web dev  # 仅启动 web

# 构建
pnpm build            # 构建所有包

# 质量检查
pnpm lint             # ESLint 检查
pnpm typecheck        # TypeScript 类型检查
.\scripts\quality-check.ps1  # 完整质量检查

# 数据库
pnpm --filter @repo/db db:push      # 同步 schema
pnpm --filter @repo/db db:migrate   # 运行迁移
pnpm --filter @repo/db db:studio    # 打开 Prisma Studio
```
