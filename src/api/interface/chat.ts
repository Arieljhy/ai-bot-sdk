/**
 * 对话模块接口定义
 */

import type { ResultData } from "./common";

// 消息角色
export type MessageRole = "user" | "assistant" | "system";

// 发送消息请求参数
export interface SendMessageParams {
  sessionId?: string; // 会话ID，首次创建可不传
  content: string; // 消息内容
  stream?: boolean; // 是否流式返回
  model?: string; // 模型名称
  temperature?: number; // 温度参数 0-1
  maxTokens?: number; // 最大token数
  conversationId?: string; // 对话ID
  parentId?: string; // 父消息ID（用于多轮对话）
}

// 消息响应
export interface MessageResponse {
  messageId: string;
  content: string;
  role: MessageRole;
  timestamp: number;
  sessionId: string;
  model?: string;
}

// SSE流式消息数据
export interface StreamMessageChunk {
  id: string;
  content: string;
  role: MessageRole;
  done: boolean;
  timestamp?: number;
}

// 快捷建议
export interface Suggestion {
  text: string;
  icon?: string;
  action?: "send" | "link";
  link?: string;
}

// 获取建议响应
export interface GetSuggestionsResponse {
  suggestions: Suggestion[];
}

// 重新生成请求
export interface RegenerateParams {
  messageId: string;
  sessionId: string;
}

// 停止生成请求
export interface StopGenerationParams {
  sessionId: string;
  messageId?: string;
}
