/**
 * 支持 fetch 的 SSE Hook
 * 使用原生 fetch API 处理流式响应
 * 使用 requestAnimationFrame 优化渲染性能，减少重排
 * @param options SSE 配置选项
 * @returns SSE 相关的状态和方法
 */

import { ref, onUnmounted, type Ref } from "vue";
import type { UseSSEOptions, UseSSEReturn } from "./interface";
import { extractContent, parseSSELine } from "@/utils/sseParser";

export function useSSE(options: UseSSEOptions = {}): UseSSEReturn {
  const content = ref<string>("");
  const isLoading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  let controller: AbortController | null = null;
  let defaultOptions = options;

  /**
   * 开始 SSE 连接
   */
  const start = async (overrideOptions?: Partial<UseSSEOptions>): Promise<void> => {
    // 合并配置
    const finalOptions = { ...defaultOptions, ...overrideOptions };
    const {
      url = "",
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

    // 渲染优化：使用 requestAnimationFrame 批量更新
    let pendingContent = "";
    let rafId: number | null = null;
    let isUpdateScheduled = false;

    const scheduleUpdate = () => {
      if (!isUpdateScheduled) {
        isUpdateScheduled = true;
        rafId = requestAnimationFrame(() => {
          // 批量更新内容
          if (pendingContent) {
            content.value += pendingContent;
            pendingContent = "";
          }
          isUpdateScheduled = false;
          rafId = null;
        });
      }
    };

    try {
      // 使用原生 fetch API 发送请求
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

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          // 处理剩余数据
          if (buffer.trim()) {
            const lines = buffer.split("\n");
            for (const line of lines) {
              const parsed = parseSSELine(line);
              if (parsed) {
                const chunk = extractContent(parsed);
                if (chunk) {
                  // 累积到缓冲区
                  pendingContent += chunk;
                  onMessage?.(chunk);
                }
              }
            }
          }

          // 最后一次更新
          if (rafId) {
            cancelAnimationFrame(rafId);
          }
          if (pendingContent) {
            content.value += pendingContent;
            pendingContent = "";
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
            const parsed = parseSSELine(line);
            if (parsed) {
              // 检查是否是结束标记
              if (parsed === "[DONE]") {
                // 最后一次更新
                if (rafId) {
                  cancelAnimationFrame(rafId);
                }
                if (pendingContent) {
                  content.value += pendingContent;
                  pendingContent = "";
                }
                isLoading.value = false;
                onComplete?.();
                return;
              }

              // 提取实际内容
              const chunk = extractContent(parsed);
              if (chunk) {
                // 累积到缓冲区，等待 RAF 批量更新
                pendingContent += chunk;
                onMessage?.(chunk);
                scheduleUpdate();
              }
            }
          }
        }
      }
    } catch (err: any) {
      // 清理未执行的 RAF
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      // 忽略主动中止的错误
      if (err.name === "AbortError" || err.message?.includes("cancel")) {
        isLoading.value = false;
        return;
      }

      const errorObj = err instanceof Error ? err : new Error(String(err));
      error.value = errorObj;
      isLoading.value = false;
      onError?.(errorObj);
      throw errorObj;
    } finally {
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
