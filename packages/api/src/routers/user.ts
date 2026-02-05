/**
 * User tRPC 路由
 *
 * AI 参考示例：快速创建类似路由
 */
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { prisma } from '@repo/db';

export const userRouter = router({
  /**
   * 获取用户列表
   */
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { limit, cursor } = input;

      const items = await prisma.user.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: 'desc' },
      });

      let nextCursor: string | undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return { items, nextCursor };
    }),

  /**
   * 根据 ID 获取用户
   */
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { id: input.id },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      return user;
    }),

  /**
   * 创建用户（需要认证）
   */
  create: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1).optional(),
        role: z.enum(['USER', 'ADMIN']).default('USER'),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: input,
      });

      return user;
    }),

  /**
   * 更新用户
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string().email().optional(),
        name: z.string().min(1).optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      const user = await prisma.user.update({
        where: { id },
        data,
      });

      return user;
    }),

  /**
   * 删除用户
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.user.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
