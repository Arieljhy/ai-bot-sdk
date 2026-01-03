/**
 * 对话模块 - AI客服核心API
 * 与 useSSE hook 配合实现流式对话
 */

import type { ResultData } from "@/api/interface/common";
import type {
  SendMessageParams,
  MessageResponse,
  Suggestion,
  RegenerateParams,
  StopGenerationParams
} from "@/api/interface/chat";
import { CHAT_BASE } from "@/api/config/servicePort";
import http from "@/api";

/**
 * 发送消息（非流式）
 * @param params 消息参数
 * @returns Promise<MessageResponse>
 */
export const sendMessage = (params: SendMessageParams): Promise<ResultData<MessageResponse>> => {
  return http.post<MessageResponse>(CHAT_BASE + `/chat/message`, params, { loading: false });
};

/**
 * 流式请求配置
 */
export interface StreamRequestConfig {
  url: string;
  method: "POST";
  headers: Record<string, string>;
  body: SendMessageParams;
}

/**
 * 发送消息（流式）
 * 返回用于 fetch/axios 的 URL 和配置，配合 useSSE 使用
 * @param params 消息参数
 * @returns 流式请求配置
 */
export const sendMessageStream = (params: SendMessageParams): StreamRequestConfig => {
  return {
    url: CHAT_BASE + `/chat/message/stream`,
    method: "POST" as const,
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream"
    },
    body: params
  };
};

/**
 * 停止生成
 * @param params 停止参数
 */
export const stopGeneration = (params: StopGenerationParams): Promise<ResultData<void>> => {
  return http.post<void>(CHAT_BASE + `/chat/stop`, params, { loading: false });
};

/**
 * 重新生成最后一条消息
 * @param params 重新生成参数
 * @returns Promise<ResultData<MessageResponse>>
 */
export const regenerate = (params: RegenerateParams): Promise<ResultData<MessageResponse>> => {
  return http.post<MessageResponse>(CHAT_BASE + `/chat/regenerate`, params, { loading: false });
};

/**
 * 获取对话建议（快捷问题）
 * @param context 上下文内容（可选）
 * @returns Promise<ResultData<Suggestion[]>>
 */
export const getSuggestions = (context?: string): Promise<ResultData<Suggestion[]>> => {
  return http.get<Suggestion[]>(
    CHAT_BASE + `/chat/suggestions`,
    context ? { context } : {},
    { loading: false, cancel: false }
  );
};

/**
 * 获取对话历史摘要
 * @param sessionId 会话ID
 * @returns Promise<ResultData<any>>
 */
export const getConversationSummary = (sessionId: string): Promise<ResultData<any>> => {
  return http.get<any>(CHAT_BASE + `/chat/summary/${sessionId}`, {}, { loading: false });
};

/**
 * 清空对话上下文
 * @param sessionId 会话ID
 * @returns Promise<ResultData<void>>
 */
export const clearConversation = (sessionId: string): Promise<ResultData<void>> => {
  return http.post<void>(CHAT_BASE + `/chat/clear`, { sessionId }, { loading: false });
};
