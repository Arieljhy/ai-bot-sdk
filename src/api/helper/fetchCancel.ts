/**
 * Fetch 请求取消和防重复处理
 */

import type { CustomRequestConfig } from "../index";
import type { DeduplicateConfig, CacheItem, DeduplicateStats } from "../interface/deduplicate";
import { DuplicateStrategy } from "../interface/deduplicate";
import {
  pendingMap,
  requestCacheMap,
  throttleMap,
  updateDeduplicateConfig,
  getDeduplicateConfig,
  getRequestKey,
  shouldThrottle
} from "../utils/deduplicateUtils";

// 导出类型和配置
export type { DeduplicateConfig, DuplicateStrategy, CacheItem, DeduplicateStats };
export { updateDeduplicateConfig, getDeduplicateConfig };

/**
 * 获取请求的唯一标识（保留用于兼容）
 */
export const getPendingUrl = getRequestKey;

export class FetchCanceler {
  /**
   * 添加请求（根据策略处理重复请求）
   */
  addPending(config: CustomRequestConfig & { url: string }): AbortController | null {
    const key = getRequestKey(config);
    const currentConfig = getDeduplicateConfig();

    // 检查节流
    if (shouldThrottle(key)) {
      return null;
    }

    // 根据策略处理
    switch (currentConfig.strategy) {
      case DuplicateStrategy.REUSE:
        // 复用模式：检查缓存
        const cached = requestCacheMap.get(key);
        if (cached && Date.now() - cached.timestamp < (currentConfig.cacheTime || 5000)) {
          return null; // 返回 null 表示应该复用缓存的 Promise
        }
        return this.createController(key, config);

      case DuplicateStrategy.THROTTLE:
        // 节流模式：已在 shouldThrottle 中处理
        return this.createController(key, config);

      case DuplicateStrategy.CANCEL:
      default:
        // 取消模式：取消之前的请求
        this.removePending(config);
        return this.createController(key, config);
    }
  }

  /**
   * 创建控制器并添加到 pending
   */
  private createController(key: string, config: CustomRequestConfig & { url: string }): AbortController {
    const controller = new AbortController();
    config.signal = controller.signal;
    pendingMap.set(key, controller);
    return controller;
  }

  /**
   * 缓存请求 Promise（复用模式）
   */
  cacheRequest(config: CustomRequestConfig & { url: string }, promise: Promise<any>): void {
    const key = getRequestKey(config);
    const currentConfig = getDeduplicateConfig();

    if (currentConfig.strategy === DuplicateStrategy.REUSE) {
      requestCacheMap.set(key, {
        promise,
        timestamp: Date.now()
      });

      // 请求完成后自动清理缓存
      promise.finally(() => {
        setTimeout(() => {
          const cached = requestCacheMap.get(key);
          if (cached && cached.promise === promise) {
            requestCacheMap.delete(key);
          }
        }, 100); // 短暂延迟，避免快速重复请求
      });
    }
  }

  /**
   * 获取缓存的请求（复用模式）
   */
  getCachedRequest(config: CustomRequestConfig & { url: string }): Promise<any> | null {
    const key = getRequestKey(config);
    const currentConfig = getDeduplicateConfig();

    if (currentConfig.strategy === DuplicateStrategy.REUSE) {
      const cached = requestCacheMap.get(key);
      if (cached && Date.now() - cached.timestamp < (currentConfig.cacheTime || 5000)) {
        return cached.promise;
      }
    }

    return null;
  }

  /**
   * 移除请求
   */
  removePending(config: CustomRequestConfig & { url: string }) {
    const key = getRequestKey(config);
    const controller = pendingMap.get(key);
    if (controller) {
      controller.abort();
      pendingMap.delete(key);
    }
  }

  /**
   * 清空所有 pending
   */
  removeAllPending() {
    pendingMap.forEach(controller => {
      controller && controller.abort();
    });
    pendingMap.clear();
  }

  /**
   * 清空所有缓存
   */
  clearCache() {
    requestCacheMap.clear();
  }

  /**
   * 清空所有（pending + cache + throttle）
   */
  clearAll() {
    this.removeAllPending();
    this.clearCache();
    throttleMap.clear();
  }

  /**
   * 获取统计信息
   */
  getStats(): DeduplicateStats {
    return {
      pending: pendingMap.size,
      cached: requestCacheMap.size,
      throttled: throttleMap.size
    };
  }
}

// 创建默认实例
export const fetchCanceler = new FetchCanceler();
