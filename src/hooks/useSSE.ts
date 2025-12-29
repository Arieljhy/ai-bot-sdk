/**
 * 支持打字机效果的 SSE Hook
 * @param options SSE 配置选项
 * @returns SSE 相关的状态和方法
 */

import { ref, onUnmounted, type Ref } from "vue";
import type { SSEData, UseSSEOptions, UseSSEReturn } from "./interface";

export function useSSE(options: UseSSEOptions = {}): UseSSEReturn {
  const content = ref<string>("");
  const isLoading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  let controller: AbortController | null = null;
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  let defaultOptions = options;

  /**
   * 提取大模型返回的内容
   */
  const extractContent = (data: SSEData): string => {
    // OpenAI 格式
    if (typeof data === "object" && data !== null) {
      if ("choices" in data && data.choices?.[0]?.delta?.content) {
        return data.choices[0].delta.content;
      }
      // Claude 格式
      if ("delta" in data && data.delta?.text) {
        return data.delta.text;
      }
      // 通用格式
      if ("content" in data && typeof data.content === "string") {
        return data.content;
      }
    }

    // 纯文本格式
    if (typeof data === "string") {
      return data;
    }

    return "";
  };

  /**
   * 处理 SSE 数据
   */
  const processSSEData = (line: string, onMessage?: (chunk: string) => void): string => {
    if (!line.trim()) return "";

    // SSE 格式: data: {...} 或 data: text
    if (line.startsWith("data: ")) {
      const data = line.slice(6).trim();

      // 处理结束标记
      if (data === "[DONE]") {
        return "";
      }

      try {
        const parsed = JSON.parse(data);
        // 提取实际内容
        const chunk = extractContent(parsed);
        if (chunk) {
          // 累积内容（打字机效果的关键）
          content.value += chunk;
          onMessage?.(chunk);
        }
        return chunk;
      } catch (e) {
        // 非 JSON 格式,直接使用原始数据（单个字符或文本）
        if (data) {
          content.value += data;
          onMessage?.(data);
          return data;
        }
        return "";
      }
    }
    // 处理 event: 行（忽略）
    if (line.startsWith("event: ")) {
      return "";
    }
    return "";
  };

  /**
   * 开始 SSE 连接
   */
  const start = async (overrideOptions?: Partial<UseSSEOptions>): Promise<void> => {
    // 合并配置
    const finalOptions = { ...defaultOptions, ...overrideOptions };
    const {
      url = "http://localhost:3000/sse",
      method = "POST",
      headers = {},
      body,
      onMessage,
      onComplete,
      onError
    } = finalOptions;

    // 如果已经在加载中，先停止
    if (isLoading.value) {
      stop();
    }

    // 重置错误状态
    error.value = null;
    isLoading.value = true;

    // 创建 AbortController
    controller = new AbortController();

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 获取 ReadableStream
      if (!response.body) {
        throw new Error("无法获取 ReadableStream");
      }

      reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          // 处理剩余数据
          if (buffer.trim()) {
            const lines = buffer.split("\n");
            for (const line of lines) {
              processSSEData(line, onMessage);
            }
          }
          isLoading.value = false;
          onComplete?.();
          break;
        }

        // 解码数据并累积到 buffer
        const decoded = decoder.decode(value, { stream: true });
        buffer += decoded;

        // 按行处理数据
        const lines = buffer.split("\n");
        buffer = lines.pop() || ""; // 保留最后一行未完成的数据

        for (const line of lines) {
          if (line.trim()) {
            processSSEData(line, onMessage);
          }
        }
      }
    } catch (err: any) {
      // 忽略主动中止的错误
      if (err.name === "AbortError") {
        isLoading.value = false;
        return;
      }

      const errorObj = err instanceof Error ? err : new Error(String(err));
      error.value = errorObj;
      isLoading.value = false;
      onError?.(errorObj);
      throw errorObj;
    } finally {
      reader = null;
      controller = null;
    }
  };

  /**
   * 停止 SSE 连接
   */
  const stop = (): void => {
    if (controller) {
      controller.abort();
      controller = null;
    }

    if (reader) {
      reader.cancel();
      reader = null;
    }

    isLoading.value = false;
  };

  /**
   * 重置状态
   */
  const reset = (): void => {
    stop();
    content.value = "";
    error.value = null;
  };

  // 组件卸载时自动清理
  onUnmounted(() => {
    stop();
  });

  return {
    content: content as Readonly<Ref<string>>,
    isLoading: isLoading as Readonly<Ref<boolean>>,
    error: error as Readonly<Ref<Error | null>>,
    start,
    stop,
    reset
  };
}
