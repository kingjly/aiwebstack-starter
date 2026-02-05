/**
 * Post tRPC 路由
 *
 * AI 参考示例
 */
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { prisma } from '@repo/db';

export const postRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        authorId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { limit, authorId } = input;

      const items = await prisma.post.findMany({
        take: limit,
        where: authorId ? { authorId } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      return items;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const post = await prisma.post.findUnique({
        where: { id: input.id },
        include: { author: true },
      });

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        });
      }

      return post;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().optional(),
        published: z.boolean().default(false),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await prisma.post.create({
        data: {
          ...input,
          authorId: ctx.user!.id,
        },
      });

      return post;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        content: z.string().optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      const post = await prisma.post.update({
        where: { id },
        data,
      });

      return post;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.post.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
