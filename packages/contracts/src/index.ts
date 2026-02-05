/**
 * 共享类型定义
 *
 * 跨包共享的 TypeScript 类型定义
 */

// ========================================
// 用户相关类型
// ========================================

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type Role = 'USER' | 'ADMIN';

export interface UserCreateInput {
  email: string;
  name?: string;
  role?: Role;
}

export interface UserUpdateInput {
  email?: string;
  name?: string;
  role?: Role;
  isActive?: boolean;
}

// ========================================
// 分页相关类型
// ========================================

export interface PaginationParams {
  limit?: number;
  cursor?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  nextCursor?: string;
}

// ========================================
// API 响应类型
// ========================================

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}
