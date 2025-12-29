import type { Ref } from "vue";

// SSE 数据格式类型
export type SSEData =
  | string
  | {
      choices?: Array<{ delta?: { content?: string } }>;
      delta?: { text?: string };
      content?: string;
      [key: string]: any;
    };

export interface UseSSEOptions {
  /**
   * SSE 接口地址
   */
  url?: string;
  /**
   * 请求方法
   */
  method?: "GET" | "POST";
  /**
   * 请求头
   */
  headers?: Record<string, string>;
  /**
   * 请求体（POST 请求时使用）
   */
  body?: any;
  /**
   * 收到消息时的回调
   */
  onMessage?: (chunk: string) => void;
  /**
   * 完成时的回调
   */
  onComplete?: () => void;
  /**
   * 错误时的回调
   */
  onError?: (error: Error) => void;
}

export interface UseSSEReturn {
  /**
   * 当前累积的内容
   */
  content: Readonly<Ref<string>>;
  /**
   * 是否正在加载
   */
  isLoading: Readonly<Ref<boolean>>;
  /**
   * 错误信息
   */
  error: Readonly<Ref<Error | null>>;
  /**
   * 开始 SSE 连接
   */
  start: (options?: Partial<UseSSEOptions>) => Promise<void>;
  /**
   * 停止 SSE 连接
   */
  stop: () => void;
  /**
   * 重置状态
   */
  reset: () => void;
}
