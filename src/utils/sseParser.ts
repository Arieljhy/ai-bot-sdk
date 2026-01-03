/**
 * SSE 流式数据解析工具
 * 用于解析服务端发送的 Server-Sent Events (SSE) 流式数据
 * 支持多种 AI 服务商的数据格式（OpenAI、Claude、通用格式）
 */

// SSE 数据格式类型定义

// OpenAI 格式
export interface OpenAIFormat {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: {
      content?: string;
      role?: string;
    };
    finish_reason: string | null;
  }>;
}

// Claude 格式
export interface ClaudeFormat {
  type: string;
  index: number;
  delta: {
    type: string;
    text?: string;
    stop_reason?: string | null;
  };
}

// 通用格式
export interface GeneralFormat {
  content?: string;
}

export type SSEData = OpenAIFormat | ClaudeFormat | GeneralFormat | string;

/**
 * 从 SSE 数据中提取实际内容
 * 支持多种 AI 服务商的流式数据格式
 * @param data SSE 数据
 * @returns 提取的文本内容
 */
export const extractContent = (data: SSEData): string => {
  // OpenAI 格式
  if (typeof data === "object" && data !== null) {
    if ("choices" in data && data.choices?.[0]?.delta?.content) {
      return data.choices[0].delta.content;
    }
    // Claude 格式
    if ("delta" in data && data.delta?.text) {
      return data.delta.text;
    }
    // 自定义流式格式
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
 * 解析 SSE 数据行
 * 将 SSE 格式的数据行解析为 JavaScript 对象
 * @param line SSE 数据行（如 "data: {...}" 或 "data: text"）
 * @returns 解析后的数据对象或 null
 */
export const parseSSELine = (line: string): SSEData | null => {
  if (!line.trim()) return null;

  // SSE 格式: data: {...} 或 data: text
  if (line.startsWith("data: ")) {
    const data = line.slice(6).trim();

    // 处理结束标记
    if (data === "[DONE]") {
      return null;
    }

    try {
      return JSON.parse(data);
    } catch {
      // 非 JSON 格式，返回原始文本
      return data;
    }
  }

  // 处理 event: 行（忽略事件类型）
  if (line.startsWith("event: ")) {
    return null;
  }

  // 处理 id: 行
  if (line.startsWith("id: ")) {
    return null;
  }

  return null;
};
