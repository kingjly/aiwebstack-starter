/**
 * tRPC 客户端配置
 */
import { createTRPCReact } from '@trpc/react-query';
import { type AppRouter } from '@repo/api';
import { transformer } from '@repo/api/src/transformer';

export const trpc = createTRPCReact<AppRouter>();

/**
 * tRPC 客户端配置（用于服务端组件）
 */
import { createTRPCUntypedClient } from '@trpc/client';
import { cache } from 'react';

const makeClient = () =>
  createTRPCUntypedClient({
    transformer,
    links: [
      () =>
        ({ op }) =>
        fetch({
          url: `http://localhost:3000/api/trpc/${op.path}`,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(op.input),
        }).then((res) => res.json()),
    ],
  });

export const getClient = cache(makeClient);
