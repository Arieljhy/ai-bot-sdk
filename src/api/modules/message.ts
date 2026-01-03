/**
 * 消息管理模块
 */

import type { ResultData, ResPage } from "@/api/interface/common";
import type {
  Message,
  GetHistoryParams,
  RateMessageParams,
  DeleteMessageParams,
  SearchMessagesParams
} from "@/api/interface/message";
import { MESSAGE_BASE } from "@/api/config/servicePort";
import http from "@/api";

/**
 * 获取历史消息列表
 * @param params 查询参数
 * @returns Promise<ResultData<ResPage<Message>>>
 */
export const getHistoryMessages = (params: GetHistoryParams): Promise<ResultData<ResPage<Message>>> => {
  return http.post<ResPage<Message>>(MESSAGE_BASE + `/message/history`, params, { loading: false });
};

/**
 * 获取单条消息详情
 * @param messageId 消息ID
 * @returns Promise<ResultData<Message>>
 */
export const getMessage = (messageId: string): Promise<ResultData<Message>> => {
  return http.get<Message>(MESSAGE_BASE + `/message/detail/${messageId}`, {}, { loading: false });
};

/**
 * 删除消息
 * @param params 删除参数
 * @returns Promise<ResultData<void>>
 */
export const deleteMessage = (params: DeleteMessageParams): Promise<ResultData<void>> => {
  return http.post<void>(MESSAGE_BASE + `/message/delete`, params, { loading: false });
};

/**
 * 批量删除消息
 * @param messageIds 消息ID数组
 * @param sessionId 会话ID
 * @returns Promise<ResultData<void>>
 */
export const batchDeleteMessages = (messageIds: string[], sessionId: string): Promise<ResultData<void>> => {
  return http.post<void>(MESSAGE_BASE + `/message/batch-delete`, { messageIds, sessionId }, {
    loading: false
  });
};

/**
 * 消息评价（点赞/点踩）
 * @param params 评价参数
 * @returns Promise<ResultData<Message>>
 */
export const rateMessage = (params: RateMessageParams): Promise<ResultData<Message>> => {
  return http.post<Message>(MESSAGE_BASE + `/message/rate`, params, { loading: false });
};

/**
 * 搜索消息
 * @param params 搜索参数
 * @returns Promise<ResultData<ResPage<Message>>>
 */
export const searchMessages = (params: SearchMessagesParams): Promise<ResultData<ResPage<Message>>> => {
  return http.post<ResPage<Message>>(MESSAGE_BASE + `/message/search`, params, { loading: false });
};

/**
 * 复制消息内容
 * @param messageId 消息ID
 * @returns Promise<ResultData<{ content: string }>>
 */
export const copyMessage = (messageId: string): Promise<ResultData<{ content: string }>> => {
  return http.get<{ content: string }>(MESSAGE_BASE + `/message/copy/${messageId}`, {}, { loading: false });
};

/**
 * 重新生成消息（用于消息级别操作）
 * @param messageId 原消息ID
 * @returns Promise<ResultData<Message>>
 */
export const regenerateMessage = (messageId: string): Promise<ResultData<Message>> => {
  return http.post<Message>(MESSAGE_BASE + `/message/regenerate`, { messageId }, { loading: false });
};

/**
 * 编辑消息
 * @param messageId 消息ID
 * @param content 新内容
 * @returns Promise<ResultData<Message>>
 */
export const editMessage = (messageId: string, content: string): Promise<ResultData<Message>> => {
  return http.put<Message>(MESSAGE_BASE + `/message/edit`, { messageId, content }, { loading: false });
};

/**
 * 导出消息历史
 * @param sessionId 会话ID
 * @param format 导出格式 'json' | 'txt' | 'markdown'
 * @returns Promise<Blob>
 */
export const exportMessages = (sessionId: string, format: "json" | "txt" | "markdown" = "json") => {
  return http.download(MESSAGE_BASE + `/message/export`, { sessionId, format }, {});
};
