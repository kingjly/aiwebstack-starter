import { z } from "zod";
import { createRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@repo/db";

export const userRouter = createRouter({
  list: protectedProcedure.query(async () => {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.user.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: true,
          createdAt: true,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1).optional(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.user.create({
        data: {
          email: input.email,
          name: input.name ?? null,
        } as any,
      });
    }),
});
