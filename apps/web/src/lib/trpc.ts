/**
 * tRPC 客户端配置
 */
import { createTRPCReact } from '@trpc/react-query';
import { type AppRouter } from '@repo/api/root';
import superjson from 'superjson';
import { httpBatchLink } from '@trpc/client';

export const trpc = createTRPCReact<AppRouter>();

/**
 * 获取 tRPC 客户端配置
 */
export const getConfig = () => ({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc`
        : 'http://localhost:3000/api/trpc',
      transformer: superjson,
    }),
  ],
});

/**
 * tRPC 客户端配置（用于服务端组件）
 */
import { createTRPCUntypedClient } from '@trpc/client';
import { cache } from 'react';

const makeClient = () =>
  createTRPCUntypedClient({
    links: [
      httpBatchLink({
        url: process.env.NEXT_PUBLIC_APP_URL
          ? `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc`
          : 'http://localhost:3000/api/trpc',
        transformer: superjson,
      }),
    ],
  });

export const getClient = cache(makeClient);
