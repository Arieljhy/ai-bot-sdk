/**
 * API 服务端口配置
 * 定义各个模块的基础路径
 */

// ==================== AI 客服 SDK 服务 ====================

// 对话服务（核心）
export const CHAT_BASE = "/api/chat";

// 会话管理服务
export const SESSION_BASE = "/api/session";

// 消息管理服务
export const MESSAGE_BASE = "/api/message";

// 文件上传服务
export const UPLOAD_BASE = "/api/upload";

// 配置管理服务
export const CONFIG_BASE = "/api/config";

// ==================== 兼容旧版本（可选保留）====================

// 后端微服务模块前缀
// export const PORT1 = "/geeker";
// export const PORT2 = "/hooks";
