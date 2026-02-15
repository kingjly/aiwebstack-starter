# 故障排除

使用 AIWebStack 时的常见问题及解决方案。

## Prisma 问题

### 错误：`Prisma Client has not been initialized`
-   **原因**：从错误的位置导入了客户端，或者客户端未生成。
-   **解决方法**：在根目录运行 `pnpm db:generate`。确保从 `@repo/db` 导入。

### 错误：Schema 同步失败
-   **原因**：数据库漂移 (drift) 或连接问题。
-   **解决方法**：对于原型开发运行 `pnpm db:push`，对于版本化迁移运行 `pnpm prisma migrate dev`。

## Turborepo 与 Monorepo 问题

### 错误：找不到模块 `@repo/...`
-   **原因**：包未列在 `transpilePackages` 中，或 `package.json` 依赖缺失。
-   **解决方法**：
    1.  检查 `apps/web/package.json` 是否包含 `@repo/ui: "workspace:*"`。
    2.  检查 `next.config.js` 是否包含 `transpilePackages: ["@repo/ui"]`。
    3.  再次运行 `pnpm install`。

### 错误：缓存问题 (构建过时)
-   **解决方法**：运行 `pnpm build --no-cache` 或删除 `node_modules/.cache` 和 `.turbo` 目录。

## Next.js 与 tRPC 问题

### 错误：`TRPCClientError: fetch failed`
-   **原因**：服务端未运行或 URL 不匹配。
-   **解决方法**：检查 `NEXT_PUBLIC_API_URL` 环境变量。确保后端在预期端口上运行。

### 错误：序列化错误 (Date 对象)
-   **原因**：从服务端组件向客户端组件传递了不可序列化的数据。
-   **解决方法**：在 tRPC 配置中使用 `superjson` 转换器以自动处理 Date/Set/Map。

## 类型安全

### 错误：前端与后端类型不匹配
-   **原因**：`AppRouter` 类型定义已过时。
-   **解决方法**：重启 IDE 的 TS 服务。确保 `@repo/api` 构建成功。

## Windows 环境指南 (PowerShell)

### 环境变量设置
-   **问题**：Linux/Mac 使用 `export KEY=VAL`，PowerShell 会报错。
-   **解决方法**：
    -   临时设置：`$env:KEY="VAL"`
    -   推荐方式：使用 `.env` 文件，Next.js 和 Prisma 会自动读取，无需手动设置 shell 变量。
    -   跨平台脚本：在 `package.json` 中使用 `cross-env` (例如: `"build": "cross-env NODE_ENV=production next build"`)。

### 脚本执行策略
-   **问题**：运行 `pnpm` 或其他脚本时提示“在此系统上禁止运行脚本”。
-   **解决方法**：以管理员身份打开 PowerShell 并运行：
    ```powershell
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```

### 数据库运行
-   **建议**：
    -   **Docker Desktop**：如果安装了 Docker Desktop (WSL2)，可直接使用 `docker-compose up`。
    -   **原生 PostgreSQL**：如果不想用 Docker，请安装 Windows 版 PostgreSQL，并修改 `.env` 中的 `DATABASE_URL` 指向 `localhost:5432`。
    -   **云数据库 (推荐)**：直接使用 Neon 或 Supabase，免去本地配置烦恼，只需在 `.env` 中填入连接串。

## Base UI 问题

### 错误：`Module not found: Can't resolve '@base-ui-components/react'`
-   **原因**：使用了旧的包名。
-   **解决方法**：Base UI 正式版包名是 `@base-ui/react`，不是 `@base-ui-components/react`。
    ```bash
    pnpm add @base-ui/react
    ```

### 错误：`Element type is invalid... got: undefined`
-   **原因**：导入了不存在的导出，或使用了旧的 API。
-   **解决方法**：Base UI 1.0+ 使用命名空间模式：
    ```typescript
    // ❌ 旧 API
    import { Dialog, DialogTrigger } from '@base-ui/react/dialog';
    
    // ✅ 新 API
    import { Dialog } from '@base-ui/react/dialog';
    // 使用: Dialog.Root, Dialog.Trigger, Dialog.Popup 等
    ```

### 警告：`<button> cannot be a descendant of <button>`
-   **原因**：Trigger 组件默认渲染为 `<button>`，里面又放了 Button 组件。
-   **解决方法**：使用 `render` prop：
    ```tsx
    // ❌ 错误
    <DialogTrigger><Button>打开</Button></DialogTrigger>
    
    // ✅ 正确
    <DialogTrigger render={<Button>打开</Button>} />
    ```

### 错误：`FieldRootContext is missing`
-   **原因**：`Field.Label` 等组件必须在 `Field.Root` 内使用。
-   **解决方法**：如果只需要简单 label，使用原生 `<label>` 元素；如果需要 Field 的验证功能，确保包裹在 `Field.Root` 中。

## Tailwind CSS v4 问题

### 问题：样式完全不生效，页面显示裸 HTML
-   **原因**：缺少 PostCSS 配置文件。
-   **解决方法**：创建 `apps/web/postcss.config.mjs`：
    ```javascript
    export default {
      plugins: {
        "@tailwindcss/postcss": {},
      },
    };
    ```

### 问题：packages/ui 中的组件样式不生效
-   **原因**：Tailwind v4 默认只扫描当前项目的文件。
-   **解决方法**：在 `globals.css` 中添加 `@source` 指令：
    ```css
    @import "tailwindcss";
    @source "../../../packages/ui/src/**/*.{js,ts,jsx,tsx}";
    ```

### 问题：`@tailwindcss/postcss` 找不到
-   **原因**：未安装 Tailwind CSS v4 的 PostCSS 插件。
-   **解决方法**：
    ```bash
    pnpm add -D tailwindcss @tailwindcss/postcss
    ```
