# AIWebStack 脚手架 - 待办事项

## 建议改进（可选）

### 测试相关

1. **E2E 测试**
   - 为用户管理页面添加 E2E 测试
   - 使用 Playwright + @playwright/test
   - 验证完整的 CRUD 流程

2. **单元测试**
   - 为 tRPC 路由添加单元测试
   - 为 UI 组件添加单元测试
   - 使用 Vitest 或 Jest

### 功能增强

3. **Auth 包实现**
   - 集成 NextAuth.js 或 Clerk
   - 实现用户认证功能
   - 完善 protectedProcedure 使用

4. **更多 UI 组件**
   - Table 组件（替换用户列表中的原生 table）
   - Select 组件（替换角色选择的原生 select）
   - Form 组件增强（表单验证、错误提示）
   - Toast 通知组件

5. **API 错误处理**
   - 统一错误提示 UI
   - Toast 通知集成
   - Loading 状态处理

### 代码质量

6. **代码覆盖率**
   - 配置 istanbul 或 c8
   - 设置最低覆盖率目标

7. **CI/CD 配置**
   - GitHub Actions 配置
   - 自动运行测试和 lint

### 文档完善

8. **组件文档**
   - 使用 Storybook 展示 UI 组件
   - 添加使用示例

9. **API 文档**
   - 使用 tRPC 的 OpenAPI 集成
   - 自动生成 API 文档

### 性能优化

10. **构建优化**
    - 配置 bundle 分析
    - 优化包大小

11. **缓存策略**
    - React Query 缓存配置
    - Next.js ISR 配置
