/**
 * tRPC API 路由处理器
 *
 * Next.js 15 App Router API Route
 */
import { fetchRequestHandler } from '@trpc/server/adapters/next';
import { appRouter } from '@repo/api/src/root';
import { createContext } from '@repo/api/src/context';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(),
    onError: ({ error, type }) => {
      if (type === 'query') {
        console.error('tRPC query error:', error);
      }
    },
  });

export { handler as GET, handler as POST };
