/**
 * 会话管理模块
 */

import type { ResultData, ResPage } from "@/api/interface/common";
import type {
  Session,
  SessionDetail,
  CreateSessionParams,
  UpdateSessionParams,
  GetSessionsParams
} from "@/api/interface/session";
import { SESSION_BASE } from "@/api/config/servicePort";
import http from "@/api";

/**
 * 创建新会话
 * @param params 会话参数
 * @returns Promise<ResultData<Session>>
 */
export const createSession = (params?: CreateSessionParams): Promise<ResultData<Session>> => {
  return http.post<Session>(SESSION_BASE + `/session/create`, params || {}, { loading: false });
};

/**
 * 获取会话列表
 * @param params 查询参数
 * @returns Promise<ResultData<ResPage<Session>>>
 */
export const getSessions = (params?: GetSessionsParams): Promise<ResultData<ResPage<Session>>> => {
  return http.post<ResPage<Session>>(SESSION_BASE + `/session/list`, params || {}, { loading: false });
};

/**
 * 获取会话详情
 * @param sessionId 会话ID
 * @returns Promise<ResultData<SessionDetail>>
 */
export const getSession = (sessionId: string): Promise<ResultData<SessionDetail>> => {
  return http.get<SessionDetail>(SESSION_BASE + `/session/detail/${sessionId}`, {}, { loading: false });
};

/**
 * 更新会话信息
 * @param params 更新参数
 * @returns Promise<ResultData<Session>>
 */
export const updateSession = (params: UpdateSessionParams): Promise<ResultData<Session>> => {
  return http.put<Session>(SESSION_BASE + `/session/update`, params, { loading: false });
};

/**
 * 删除会话
 * @param sessionId 会话ID
 * @returns Promise<ResultData<void>>
 */
export const deleteSession = (sessionId: string): Promise<ResultData<void>> => {
  return http.delete<void>(SESSION_BASE + `/session/delete/${sessionId}`, {}, { loading: false });
};

/**
 * 批量删除会话
 * @param sessionIds 会话ID数组
 * @returns Promise<ResultData<void>>
 */
export const batchDeleteSessions = (sessionIds: string[]): Promise<ResultData<void>> => {
  return http.post<void>(SESSION_BASE + `/session/batch-delete`, { sessionIds }, { loading: false });
};

/**
 * 归档会话
 * @param sessionId 会话ID
 * @returns Promise<ResultData<Session>>
 */
export const archiveSession = (sessionId: string): Promise<ResultData<Session>> => {
  return http.post<Session>(SESSION_BASE + `/session/archive`, { sessionId }, { loading: false });
};

/**
 * 恢复归档的会话
 * @param sessionId 会话ID
 * @returns Promise<ResultData<Session>>
 */
export const unarchiveSession = (sessionId: string): Promise<ResultData<Session>> => {
  return http.post<Session>(SESSION_BASE + `/session/unarchive`, { sessionId }, { loading: false });
};

/**
 * 更新会话标题
 * @param sessionId 会话ID
 * @param title 新标题
 * @returns Promise<ResultData<Session>>
 */
export const updateSessionTitle = (sessionId: string, title: string): Promise<ResultData<Session>> => {
  return http.put<Session>(SESSION_BASE + `/session/title`, { sessionId, title }, { loading: false });
};

/**
 * 获取所有会话（不分页，用于侧边栏展示）
 * @returns Promise<ResultData<Session[]>>
 */
export const getAllSessions = (): Promise<ResultData<Session[]>> => {
  return http.get<Session[]>(SESSION_BASE + `/session/all`, {}, { loading: false });
};
