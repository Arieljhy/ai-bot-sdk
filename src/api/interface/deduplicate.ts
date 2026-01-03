/**
 * 防重复请求相关类型定义
 */

/**
 * 重复请求策略
 */
export const enum DuplicateStrategy {
  CANCEL = "cancel", // 取消之前的请求，发起新请求（默认）
  REUSE = "reuse",   // 复用正在进行的请求，返回同一个 Promise
  THROTTLE = "throttle" // 节流：在指定时间内只允许一次请求
}

/**
 * 请求去重配置
 */
export interface DeduplicateConfig {
  strategy: DuplicateStrategy;
  throttleTime?: number; // 节流时间（毫秒），仅 throttle 模式有效
  cacheTime?: number; // 缓存时间（毫秒），仅 reuse 模式有效
}

/**
 * 请求缓存项
 */
export interface CacheItem {
  promise: Promise<any>;
  timestamp: number;
}

/**
 * 请求去重统计信息
 */
export interface DeduplicateStats {
  pending: number;    // 正在进行的请求数
  cached: number;     // 缓存的请求数
  throttled: number;  // 被节流的请求数
}

// 导出 const enum 值
export const DUPLICATE_STRATEGY = {
  CANCEL: DuplicateStrategy.CANCEL,
  REUSE: DuplicateStrategy.REUSE,
  THROTTLE: DuplicateStrategy.THROTTLE
} as const;
