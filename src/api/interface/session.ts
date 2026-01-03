/**
 * 会话管理模块接口定义
 */

// 会话状态
export type SessionStatus = "active" | "archived" | "deleted";

// 会话信息
export interface Session {
  sessionId: string;
  title: string;
  status: SessionStatus;
  messageCount: number;
  createdAt: number;
  updatedAt: number;
  lastMessageAt?: number;
  lastMessagePreview?: string;
  model?: string;
  avatar?: string;
}

// 创建会话请求
export interface CreateSessionParams {
  title?: string;
  model?: string;
  systemPrompt?: string;
}

// 更新会话请求
export interface UpdateSessionParams {
  sessionId: string;
  title?: string;
  status?: SessionStatus;
}

// 获取会话列表请求
export interface GetSessionsParams {
  status?: SessionStatus;
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
}

// 会话详情
export interface SessionDetail extends Session {
  messages: MessageSummary[];
}

// 消息摘要（用于会话列表）
export interface MessageSummary {
  messageId: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}
