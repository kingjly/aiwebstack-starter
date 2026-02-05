/**
 * tRPC 初始化配置
 *
 * AI 使用指南：
 * 1. 在 routers/ 目录下创建路由文件
 * 2. 在 root.ts 中合并路由
 * 3. 前端通过 createTRPCReact 导入 hooks
 */
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import type { Context } from './context';

/**
 * tRPC 实例
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof Error && error.cause.name === 'ZodError'
            ? (error.cause as unknown as { issues: unknown[] }).issues
            : null,
      },
    };
  },
});

/**
 * 中间件：确保用户已认证
 */
export const protectedProcedure = t.procedure.use(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

/**
 * 导出 tRPC 基础设施
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
