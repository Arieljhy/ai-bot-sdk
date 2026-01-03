/**
 * SDK配置管理模块
 */

import type { ResultData } from "@/api/interface/common";
import type {
  SDKConfig,
  UserPreferences,
  UpdateUserPreferencesParams
} from "@/api/interface/config";
import { CONFIG_BASE } from "@/api/config/servicePort";
import http from "@/api";

/**
 * 获取SDK配置
 * @returns Promise<ResultData<SDKConfig>>
 */
export const getSDKConfig = (): Promise<ResultData<SDKConfig>> => {
  return http.get<SDKConfig>(CONFIG_BASE + `/config/sdk`, {}, { loading: false, cancel: false });
};

/**
 * 获取用户偏好设置
 * @returns Promise<ResultData<UserPreferences>>
 */
export const getUserPreferences = (): Promise<ResultData<UserPreferences>> => {
  return http.get<UserPreferences>(CONFIG_BASE + `/config/preferences`, {}, {
    loading: false,
    cancel: false
  });
};

/**
 * 更新用户偏好设置
 * @param params 偏好设置参数
 * @returns Promise<ResultData<UserPreferences>>
 */
export const updateUserPreferences = (
  params: UpdateUserPreferencesParams
): Promise<ResultData<UserPreferences>> => {
  return http.put<UserPreferences>(CONFIG_BASE + `/config/preferences`, params, { loading: false });
};

/**
 * 重置用户偏好设置为默认值
 * @returns Promise<ResultData<UserPreferences>>
 */
export const resetUserPreferences = (): Promise<ResultData<UserPreferences>> => {
  return http.post<UserPreferences>(CONFIG_BASE + `/config/preferences/reset`, {}, { loading: false });
};

/**
 * 获取支持的模型列表
 * @returns Promise<ResultData<ModelInfo[]>>
 */
export const getSupportedModels = (): Promise<ResultData<SDKConfig["supportedModels"]>> => {
  return http.get<SDKConfig["supportedModels"]>(CONFIG_BASE + `/config/models`, {}, {
    loading: false,
    cancel: false
  });
};

/**
 * 验证API密钥
 * @param apiKey API密钥
 * @returns Promise<ResultData<{ valid: boolean; message?: string }>>
 */
export const validateApiKey = (apiKey: string): Promise<ResultData<{ valid: boolean; message?: string }>> => {
  return http.post<{ valid: boolean; message?: string }>(
    CONFIG_BASE + `/config/validate-key`,
    { apiKey },
    { loading: false }
  );
};

/**
 * 获取系统公告
 * @returns Promise<ResultData<{ title: string; content: string; date: string }[]>>
 */
export const getAnnouncements = (): Promise<
  ResultData<{ id: string; title: string; content: string; date: string; priority: "low" | "medium" | "high" }[]>
> => {
  return http.get<
    { id: string; title: string; content: string; date: string; priority: "low" | "medium" | "high" }[]
  >(CONFIG_BASE + `/config/announcements`, {}, { loading: false, cancel: false });
};
