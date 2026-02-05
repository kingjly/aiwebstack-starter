/**
 * 类型声明文件
 *
 * 帮助 TypeScript 理解 package.json exports 中的通配符路径
 */
import type { ComponentType } from 'react';

declare module '@repo/ui/components/*' {
  const component: ComponentType;
  export { component as default };
}

declare module '@repo/ui/blocks/*' {
  const component: ComponentType;
  export { component as default };
}

declare module '@repo/ui/styles' {
  const content: string;
  export { content as default };
}
