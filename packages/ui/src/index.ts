/**
 * @repo/ui 统一导出
 *
 * AI 使用指南：
 * - 组件: import { Button } from '@repo/ui/components/button'
 * - 样式: import '@repo/ui/styles'
 * - 业务块: import { PageHeader } from '@repo/ui/blocks/page-header'
 */

// 组件导出
export { Button } from './components/button';
export type { ButtonProps } from './components/button';

export { Input } from './components/input';
export type { InputProps } from './components/input';

export { DialogRoot, DialogTrigger, DialogContent, DialogClose } from './components/dialog';
export type { DialogRootProps } from './components/dialog';

export { Form, FormField, FormActions } from './components/form';
export type { FormProps, FormFieldProps, FormActionsProps } from './components/form';
