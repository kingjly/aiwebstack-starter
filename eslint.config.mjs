/**
 * ESLint 9 Flat Config - AIWebStack Starter
 *
 * 使用 ESLint 9 新的扁平配置格式
 * 继承 @repo/config 的配置
 */

import repoConfig from '@repo/config/eslint.config.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 继承 repo 配置
  ...repoConfig,

  // 项目特定配置
  {
    rules: {
      // 可以在这里覆盖或添加特定规则
    },
  },

  // 忽略模式（ESLint 9 使用 ignorePatterns 或配置文件）
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/build/**',
      '**/coverage/**',
      '**/*.min.js',
      '**/*.min.css',
      '**/packages/ui/dist/**',
      '**/.turbo/**',
    ],
  },
];
