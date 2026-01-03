/**
 * API 接口定义统一导出
 */

// ==================== 通用接口 ====================
export * from "./common";

// ==================== 对话模块接口 ====================
export * from "./chat";

// ==================== 会话管理接口 ====================
export * from "./session";

// ==================== 消息管理接口 ====================
export * from "./message";

// ==================== 配置管理接口 ====================
export * from "./config";

// ==================== 防重复请求接口 ====================
export * from "./deduplicate";

// ==================== 兼容旧版本（已弃用）====================
// 以下导出仅为兼容旧代码，建议迁移到新的接口定义
// import { Upload } from "@/api/interface/index";
// import { Login } from "@/api/interface/index";
// import { User } from "@/api/interface/index";
