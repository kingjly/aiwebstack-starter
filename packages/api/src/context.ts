/**
 * tRPC 上下文创建
 *
 * 每个请求都会创建一个新的上下文
 */
import type * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from '@repo/db';

/**
 * 上下文类型定义
 */
export type Context = {
  user?: {
    id: string;
    email: string;
    role: string;
  };
  prisma: typeof prisma;
};

/**
 * 创建上下文
 */
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  // TODO: 从 session/token 获取用户信息
  // const session = await getSession(opts?.req);

  return {
    user: null, // 暂未实现认证
    prisma,
  };
}
