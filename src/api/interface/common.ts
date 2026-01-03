/**
 * 通用接口定义
 */

// 通用响应结构（不包含data）
export interface Result {
  code: string | number;
  msg: string;
}

// 通用响应结构（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

// 分页响应参数
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// 文件上传响应
export interface FileUploadResponse {
  fileUrl: string;
  fileName: string;
  fileSize: number;
}
