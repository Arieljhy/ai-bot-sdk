/**
 * Fetch 请求封装 - 增强版
 * 统一处理 HTTP 请求、响应、错误拦截
 * 新增功能：请求重试、请求转换
 */

import { showFullScreenLoading, tryHideFullScreenLoading } from "@/components/Loading/fullScreen";
import { toast } from "@/hooks/useToast";
import type { ResultData } from "@/api/interface";
import { ResultEnum } from "@/enums/httpEnum";
import { handleRequestError } from "./helper/checkStatus";
import { fetchCanceler, updateDeduplicateConfig } from "./helper/fetchCancel";
import { DuplicateStrategy } from "@/api/interface/deduplicate";
import type { DeduplicateConfig } from "@/api/interface/deduplicate";

// 导出去重配置和策略，供外部使用
export { updateDeduplicateConfig, DuplicateStrategy };
export type { DeduplicateConfig };

/**
 * 请求配置接口
 */
export interface CustomRequestConfig extends RequestInit {
  url?: string; // 请求 URL（用于取消请求）
  loading?: boolean;
  cancel?: boolean;
  retry?: boolean; // 是否启用重试
  retryCount?: number; // 重试次数
  params?: Record<string, any>; // URL 查询参数
  timeout?: number; // 超时时间
  responseType?: 'json' | 'blob' | 'arraybuffer' | 'text'; // 响应类型
}

/**
 * 响应接口
 */
export interface FetchResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

/**
 * 默认配置
 */
const config = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number
};

/**
 * 序列化查询参数
 */
const serializeParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  return searchParams.toString();
};

/**
 * 构建完整 URL
 */
const buildUrl = (baseURL: string, url: string, params?: Record<string, any>): string => {
  let fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;

  if (params) {
    const queryString = serializeParams(params);
    // 添加时间戳防止缓存
    const timestamp = `_t=${Date.now()}`;
    fullUrl += `${fullUrl.includes('?') ? '&' : '?'}${queryString}&${timestamp}`;
  } else if (!fullUrl.includes('_t=')) {
    // 即使没有 params，也添加时间戳
    fullUrl += `${fullUrl.includes('?') ? '&' : '?'}_t=${Date.now()}`;
  }

  return fullUrl;
};

/**
 * 请求转换器 - 在请求发送前转换数据
 */
const requestTransformer = (data: any): any => {
  // 如果是 FormData，不做处理
  if (data instanceof FormData) {
    return data;
  }

  // 如果是 Blob，不做处理
  if (data instanceof Blob) {
    return data;
  }

  // 如果是字符串，尝试解析 JSON
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }

  return data;
};

/**
 * 创建超时 Promise
 */
const createTimeoutPromise = (timeout: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timeout after ${timeout}ms`));
    }, timeout);
  });
};

/**
 * 核心请求方法
 */
const fetchRequest = async <T = any>(
  url: string,
  options: CustomRequestConfig = {},
  baseURL: string = config.baseURL
): Promise<FetchResponse<T>> => {
  const {
    loading = true,
    cancel = true,
    params,
    timeout = config.timeout,
    ...fetchOptions
  } = options;

  // 构建完整的请求配置
  const requestConfig: CustomRequestConfig & { url: string } = {
    url,
    ...fetchOptions,
    params
  };

  // 检查是否有缓存的请求（复用模式）
  if (cancel) {
    const cachedPromise = fetchCanceler.getCachedRequest(requestConfig);
    if (cachedPromise) {
      return cachedPromise;
    }
  }

  // 显示 loading
  if (loading) {
    showFullScreenLoading();
  }

  // 处理请求取消和去重
  let controller: AbortController | undefined | null;
  let shouldAbort = false;

  if (cancel) {
    controller = fetchCanceler.addPending(requestConfig);
    if (!controller) {
      // 如果 addPending 返回 null，说明被节流或复用
      const cachedPromise = fetchCanceler.getCachedRequest(requestConfig);
      if (cachedPromise) {
        if (loading) {
          tryHideFullScreenLoading();
        }
        return cachedPromise;
      }
      // 节流模式：静默忽略
      if (loading) {
        tryHideFullScreenLoading();
      }
      throw new Error('Request throttled');
    }
    fetchOptions.signal = controller.signal;
  }

  // 构建 URL
  const fullUrl = buildUrl(baseURL, url, params);

  // 转换请求体
  if (fetchOptions.body) {
    fetchOptions.body = requestTransformer(fetchOptions.body);
  }

  // 设置默认 headers
  const headers = new Headers(fetchOptions.headers);
  if (!headers.has('Content-Type') && !(fetchOptions.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // 创建请求 Promise
  const requestPromise = (async () => {
    try {
      // 发起请求（带超时控制）
      const response = await Promise.race([
        fetch(fullUrl, { ...fetchOptions, headers }),
        createTimeoutPromise(timeout)
      ]) as Response;

      // 移除待处理请求
      if (cancel && !shouldAbort) {
        fetchCanceler.removePending(requestConfig);
      }

      // 隐藏 loading
      if (loading) {
        tryHideFullScreenLoading();
      }

      // 解析响应
      let data: any;
      const contentType = response.headers.get('content-type');

      if (response.status === 204) {
        data = null;
      } else if (contentType?.includes('application/json')) {
        data = await response.json();
      } else if (fetchOptions.responseType === 'blob' || fetchOptions.responseType === 'arraybuffer') {
        data = await response.blob();
      } else {
        data = await response.text();
      }

      // 处理业务错误码
      if (data?.code && data.code !== ResultEnum.SUCCESS) {
        toast.show(data.msg || "请求失败");
        throw data;
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      };
    } catch (error: any) {
      // 隐藏 loading
      if (loading) {
        tryHideFullScreenLoading();
      }

      // 移除待处理请求
      if (cancel && !shouldAbort) {
        fetchCanceler.removePending(requestConfig);
      }

      // 处理错误
      handleRequestError(error);
      throw error;
    }
  })();

  // 缓存请求 Promise（复用模式）
  if (cancel && !shouldAbort) {
    fetchCanceler.cacheRequest(requestConfig, requestPromise);
  }

  return requestPromise;
};

class RequestHttp {
  private baseURL: string;

  public constructor(config: { baseURL: string; timeout: number }) {
    this.baseURL = config.baseURL;
  }

  /**
   * GET 请求
   */
  async get<T>(url: string, params?: object, _object: Partial<CustomRequestConfig> = {}): Promise<ResultData<T>> {
    const response = await fetchRequest<ResultData<T>>(url, {
      method: 'GET',
      params,
      ..._object
    }, this.baseURL);
    return response.data as ResultData<T>;
  }

  /**
   * POST 请求
   */
  async post<T>(url: string, data?: object | string, _object: Partial<CustomRequestConfig> = {}): Promise<ResultData<T>> {
    const response = await fetchRequest<ResultData<T>>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ..._object
    }, this.baseURL);
    return response.data as ResultData<T>;
  }

  /**
   * PUT 请求
   */
  async put<T>(url: string, data?: object, _object: Partial<CustomRequestConfig> = {}): Promise<ResultData<T>> {
    const response = await fetchRequest<ResultData<T>>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ..._object
    }, this.baseURL);
    return response.data as ResultData<T>;
  }

  /**
   * DELETE 请求
   */
  async delete<T>(url: string, params?: any, _object: Partial<CustomRequestConfig> = {}): Promise<ResultData<T>> {
    const response = await fetchRequest<ResultData<T>>(url, {
      method: 'DELETE',
      params,
      ..._object
    }, this.baseURL);
    return response.data as ResultData<T>;
  }

  /**
   * 下载文件
   */
  async download(url: string, data?: object, _object: Partial<CustomRequestConfig> = {}): Promise<BlobPart> {
    const response = await fetchRequest(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      responseType: 'blob',
      ..._object
    }, this.baseURL);
    return response.data;
  }

  /**
   * 更新基础配置
   */
  public updateConfig(newConfig: Partial<{ baseURL: string }>): void {
    if (newConfig.baseURL) {
      this.baseURL = newConfig.baseURL;
    }
  }
}

// 创建默认实例
export default new RequestHttp(config);

// 导出类，允许创建多个实例
export { RequestHttp };
