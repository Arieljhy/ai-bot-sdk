/**
 * 防重复请求工具函数
 */

import type { CustomRequestConfig } from "../index";
import qs from "qs";
import type { DeduplicateConfig } from "../interface/deduplicate";
import { DuplicateStrategy } from "../interface/deduplicate";

// 声明一个 Map 用于存储每个请求的标识和取消函数
export let pendingMap = new Map<string, AbortController>();

// 声明一个 Map 用于存储正在进行的请求（复用模式）
export let requestCacheMap = new Map<string, import("../interface/deduplicate").CacheItem>();

// 声明一个 Map 用于存储节流记录
export let throttleMap = new Map<string, number>();

// 默认配置
const defaultConfig: DeduplicateConfig = {
  strategy: DuplicateStrategy.CANCEL,
  throttleTime: 1000,
  cacheTime: 5000
};

// 当前配置
let currentConfig = { ...defaultConfig };

/**
 * 更新去重配置
 */
export const updateDeduplicateConfig = (config: Partial<DeduplicateConfig>) => {
  currentConfig = { ...currentConfig, ...config };
};

/**
 * 获取当前配置
 */
export const getDeduplicateConfig = () => currentConfig;

/**
 * 序列化参数，确保对象属性顺序一致
 */
export const sortedStringify = (obj: any) => {
  if (!obj) return "";
  return qs.stringify(obj, { arrayFormat: "repeat", sort: (a: string, b: any) => a.localeCompare(b) });
};

/**
 * 获取请求的唯一标识
 */
export const getRequestKey = (config: CustomRequestConfig & { url: string }): string => {
  const body = typeof config.body === 'string' ? config.body : sortedStringify(config.body);
  const params = sortedStringify(config.params);
  return [config.method || 'GET', config.url, body, params].join("&");
};

/**
 * 检查是否需要节流
 */
export const shouldThrottle = (key: string): boolean => {
  if (currentConfig.strategy !== DuplicateStrategy.THROTTLE) {
    return false;
  }

  const lastRequestTime = throttleMap.get(key);
  const now = Date.now();
  const throttleTime = currentConfig.throttleTime || 1000;

  if (lastRequestTime && now - lastRequestTime < throttleTime) {
    return true;
  }

  throttleMap.set(key, now);
  return false;
};

/**
 * 清理过期的缓存项
 */
export const cleanExpiredCache = () => {
  const now = Date.now();
  const cacheTime = currentConfig.cacheTime || 5000;

  requestCacheMap.forEach((item, key) => {
    if (now - item.timestamp > cacheTime) {
      requestCacheMap.delete(key);
    }
  });
};

/**
 * 清理过期的节流记录
 */
export const cleanExpiredThrottle = () => {
  const now = Date.now();
  const throttleTime = currentConfig.throttleTime || 1000;

  throttleMap.forEach((timestamp, key) => {
    if (now - timestamp > throttleTime) {
      throttleMap.delete(key);
    }
  });
};

// 定期清理过期缓存
const CLEANUP_INTERVAL = 10000; // 10 秒

export const startAutoCleanup = () => {
  return setInterval(() => {
    cleanExpiredCache();
    cleanExpiredThrottle();
  }, CLEANUP_INTERVAL);
};

// 启动自动清理
startAutoCleanup();
