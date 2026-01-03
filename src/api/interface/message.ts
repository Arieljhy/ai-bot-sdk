/**
 * 消息管理模块接口定义
 */
import type { MessageRole } from "./chat";

// 消息类型
export type MessageType = "text" | "image" | "file" | "audio" | "video";

// 消息状态
export type MessageStatus = "sending" | "sent" | "failed" | "pending";

// 完整消息结构
export interface Message {
  messageId: string;
  sessionId: string;
  conversationId: string;
  content: string;
  role: MessageRole;
  type: MessageType;
  status: MessageStatus;
  timestamp: number;
  model?: string;
  tokens?: number;
  parentId?: string;
  metadata?: MessageMetadata;
}

// 消息元数据
export interface MessageMetadata {
  feedback?: "like" | "dislike";
  regenerated?: boolean;
  edited?: boolean;
  attachments?: Attachment[];
}

// 附件信息
export interface Attachment {
  type: "image" | "file" | "audio" | "video";
  url: string;
  name: string;
  size: number;
  mimeType?: string;
}

// 获取历史消息请求
export interface GetHistoryParams {
  sessionId: string;
  pageNum?: number;
  pageSize?: number;
  beforeMessageId?: string; // 获取某条消息之前的消息
  afterMessageId?: string; // 获取某条消息之后的消息
}

// 消息评价请求
export interface RateMessageParams {
  messageId: string;
  rating: "like" | "dislike";
  reason?: string;
}

// 删除消息请求
export interface DeleteMessageParams {
  messageId: string;
  sessionId: string;
}

// 搜索消息请求
export interface SearchMessagesParams {
  sessionId?: string; // 不传则搜索所有会话
  keyword: string;
  pageNum?: number;
  pageSize?: number;
  startTime?: number;
  endTime?: number;
}
