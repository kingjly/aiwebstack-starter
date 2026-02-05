/**
 * tRPC 根路由
 *
 * AI 使用指南：
 * 1. 在 routers/ 目录下创建新路由
 * 2. 在此处导入并合并到 appRouter
 */
import { router } from './trpc';
import { userRouter } from './routers/user';
import { postRouter } from './routers/post';

export const appRouter = router({
  user: userRouter,
  post: postRouter,
  // 在此添加新路由
});

export type AppRouter = typeof appRouter;
