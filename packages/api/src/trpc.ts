import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

interface Session {
  user: {
    id: string;
    email: string;
    name?: string | null;
    role: string;
  };
}

export interface Context {
  headers: Headers;
  prisma: unknown;
  session: Session | null;
}

export const createTRPCContext = async (opts: { headers: Headers; session?: Session | null }) => {
  return {
    ...opts,
  };
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createCallerFactory = t.createCallerFactory;
export const createRouter = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
