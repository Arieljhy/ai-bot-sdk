/**
 * SDK配置管理接口定义
 */

import type { ResultData } from "./common";

// 用户偏好设置
export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  language: string;
  fontSize: "small" | "medium" | "large";
  streamEnabled: boolean; // 是否启用流式响应
  autoScroll: boolean; // 是否自动滚动
  soundEnabled: boolean; // 是否启用提示音
  model?: string; // 默认模型
  temperature?: number; // 默认温度
}

// SDK配置
export interface SDKConfig {
  appId: string;
  apiBaseUrl: string;
  defaultModel: string;
  supportedModels: ModelInfo[];
  features: FeatureConfig;
  limits: LimitConfig;
}

// 模型信息
export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  description?: string;
  maxTokens: number;
  supported: boolean;
}

// 功能配置
export interface FeatureConfig {
  fileUpload: boolean;
  voiceInput: boolean;
  streamResponse: boolean;
  multiSession: boolean;
  exportHistory: boolean;
  shareConversation: boolean;
}

// 限制配置
export interface LimitConfig {
  maxSessionsPerUser: number;
  maxMessagesPerSession: number;
  maxFileSize: number; // bytes
  maxDailyMessages: number;
}

// 获取SDK配置响应
export type GetSDKConfigResponse = ResultData<SDKConfig>;

// 获取用户偏好响应
export type GetUserPreferencesResponse = ResultData<UserPreferences>;

// 更新用户偏好请求
export type UpdateUserPreferencesParams = Partial<UserPreferences>;
