/**
 * 请求重试工具
 * 用于处理网络请求失败后的自动重试逻辑
 */

import type { CustomRequestConfig } from "../index";

/**
 * 重试配置
 */
export interface RetryConfig {
  retries: number; // 重试次数
  retryDelay: number; // 重试延迟（毫秒）
  retryCondition?: (error: Error & { response?: { status: number } }) => boolean; // 重试条件
  onRetry?: (retryCount: number, error: Error) => void; // 重试回调
}

/**
 * 默认重试配置
 */
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  retries: 3,
  retryDelay: 1000,
  retryCondition: (error: Error & { response?: { status: number } }) => {
    // 仅在网络错误、5xx 错误或超时时重试
    return (
      !error.response ||
      error.message.includes('timeout') ||
      error.message.includes('ECONNABORTED') ||
      error.message.includes('ETIMEDOUT') ||
      (error.response.status >= 500 && error.response.status <= 599)
    );
  }
};

/**
 * 延迟函数
 */
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * 指数退避算法计算重试延迟
 */
export const calculateRetryDelay = (
  retryCount: number,
  baseDelay: number,
  useExponentialBackoff = true
): number => {
  if (useExponentialBackoff) {
    // 指数退避：baseDelay * 2^retryCount + 随机抖动
    const exponentialDelay = baseDelay * Math.pow(2, retryCount);
    const jitter = Math.random() * 1000; // 0-1000ms 的随机抖动
    return exponentialDelay + jitter;
  }
  return baseDelay;
};

/**
 * 为请求配置添加重试能力
 */
export const addRetryCapability = (
  config: CustomRequestConfig,
  retryConfig: Partial<RetryConfig> = {}
): CustomRequestConfig => {
  const mergedConfig = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };

  return {
    ...config,
    __retryConfig: mergedConfig
  } as CustomRequestConfig & { __retryConfig: RetryConfig };
};

/**
 * 请求重试处理器
 * 在响应拦截器中使用
 */
export const handleRetry = async (
  error: Error & { config?: CustomRequestConfig },
  retryConfig: RetryConfig
): Promise<Error | any> => {
  const { retries, retryDelay, retryCondition, onRetry } = retryConfig;

  // 检查是否满足重试条件
  if (retryCondition && !retryCondition(error)) {
    return Promise.reject(error);
  }

  // 获取当前重试次数
  const config = error.config as any;
  const currentRetryCount = config.__retryCount || 0;

  // 超过最大重试次数
  if (currentRetryCount >= retries) {
    return Promise.reject(error);
  }

  // 增加重试计数
  config.__retryCount = currentRetryCount + 1;

  // 计算延迟时间
  const delayTime = calculateRetryDelay(currentRetryCount, retryDelay);

  // 触发重试回调
  if (onRetry) {
    onRetry(currentRetryCount + 1, error);
  }

  // 等待后重试
  await delay(delayTime);

  // 重新发起请求
  return new Promise((resolve, reject) => {
    // 使用原始的 fetch 配置重新发起请求
    (error.config as any).__isRetry = true;
    // 这里需要在拦截器外部处理，所以只返回配置
    resolve(error.config);
  });
};

/**
 * 检查错误是否可重试
 */
export const isRetryableError = (error: Error & { response?: { status: number } }): boolean => {
  if (!error.response) {
    // 网络错误或超时
    return true;
  }

  const status = error.response.status;
  return (
    (status >= 500 && status <= 599) || // 5xx 服务器错误
    status === 429 || // 429 Too Many Requests
    status === 408 // 408 Request Timeout
  );
};

/**
 * 创建带重试的 fetch 配置
 */
export const createRetryConfig = (
  customConfig?: Partial<RetryConfig>
): Partial<RetryConfig> => {
  return {
    ...DEFAULT_RETRY_CONFIG,
    ...customConfig
  };
};
