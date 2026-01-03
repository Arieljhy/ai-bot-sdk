/**
 * HTTP 状态码检查工具
 * 用于处理不同 HTTP 状态码对应的错误信息
 */

import { toast } from "@/hooks/useToast";

/**
 * HTTP 错误信息配置
 */
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: "请求参数错误，请检查输入",
  401: "登录已过期，请重新登录",
  402: "付费服务，请先订阅",
  403: "没有权限访问该资源",
  404: "请求的资源不存在",
  405: "请求方法不允许",
  406: "请求格式不可接受",
  407: "需要代理身份验证",
  408: "请求超时，请稍后重试",
  409: "请求冲突，资源已存在",
  410: "资源已被永久删除",
  411: "需要有效长度",
  412: "前置条件失败",
  413: "请求实体过大",
  414: "请求 URI 过长",
  415: "不支持的媒体类型",
  416: "请求范围不满足",
  417: "期望失败",
  418: "我是一个茶壶（愚人节玩笑）",
  422: "请求格式正确，但语义错误",
  423: "当前资源被锁定",
  425: "太早了",
  426: "需要升级协议",
  428: "需要前置条件",
  429: "请求过于频繁，请稍后再试",
  431: "请求头字段过大",
  451: "因法律原因不可用",
  // 5xx 服务器错误
  500: "服务器内部错误",
  501: "服务器不支持该功能",
  502: "网关错误，请稍后重试",
  503: "服务暂时不可用",
  504: "网关超时，请稍后重试",
  505: "不支持的 HTTP 版本",
  506: "变体协商",
  507: "存储不足",
  508: "检测到循环",
  510: "未扩展",
  511: "需要网络认证"
};

/**
 * 状态码分类
 */
export const StatusCodeType = {
  SUCCESS: "success", // 2xx
  REDIRECT: "redirect", // 3xx
  CLIENT_ERROR: "client_error", // 4xx
  SERVER_ERROR: "server_error", // 5xx
  UNKNOWN: "unknown"
} as const;

export type StatusCodeType = typeof StatusCodeType[keyof typeof StatusCodeType];

/**
 * 获取状态码类型
 */
export const getStatusType = (status: number): StatusCodeType => {
  if (status >= 200 && status < 300) return StatusCodeType.SUCCESS;
  if (status >= 300 && status < 400) return StatusCodeType.REDIRECT;
  if (status >= 400 && status < 500) return StatusCodeType.CLIENT_ERROR;
  if (status >= 500 && status < 600) return StatusCodeType.SERVER_ERROR;
  return StatusCodeType.UNKNOWN;
};

/**
 * 获取状态码对应的错误信息
 */
export const getStatusMessage = (status: number, customMessage?: string): string => {
  return customMessage || HTTP_ERROR_MESSAGES[status] || "未知错误，请稍后重试";
};

/**
 * 检查状态码并显示错误信息
 * @param status HTTP 状态码
 * @param customMessage 自定义错误信息
 * @returns 错误信息字符串
 */
export const checkStatus = (
  status: number,
  customMessage?: string
): string => {
  return getStatusMessage(status, customMessage);
};

/**
 * 检查响应对象
 */
export const checkResponse = (response: Response): string => {
  return checkStatus(response.status);
};

/**
 * 是否为网络错误
 */
export const isNetworkError = (error: Error): boolean => {
  return (
    error.message.includes("Network Error") ||
    error.message.includes("ERR_NETWORK") ||
    error.message.includes("ERR_INTERNET_DISCONNECTED")
  );
};

/**
 * 是否为超时错误
 */
export const isTimeoutError = (error: Error): boolean => {
  return (
    error.message.includes("timeout") ||
    error.message.includes("ETIMEDOUT") ||
    error.message.includes("ECONNABORTED")
  );
};

/**
 * 是否为请求被取消
 */
export const isCancelError = (error: Error): boolean => {
  return (
    error.message.includes("cancel") ||
    error.name === "CanceledError" ||
    error.name === "CancellationError"
  );
};

/**
 * 处理请求错误
 */
export const handleRequestError = (error: any): string => {
  // 请求被取消，不显示 toast
  if (isCancelError(error)) {
    return "请求已取消";
  }

  // 网络错误
  if (isNetworkError(error)) {
    const message = "网络连接失败，请检查网络设置";
    toast.show(message);
    return message;
  }

  // 超时错误
  if (isTimeoutError(error)) {
    const message = "请求超时，请稍后重试";
    toast.show(message);
    return message;
  }

  // HTTP 错误
  if (error.response) {
    const status = error.response.status;
    const message = checkStatus(status);

    toast.show(`${status} - ${message}`);
    return message;
  }

  // 其他错误
  const message = error.message || "未知错误";
  toast.show(message);
  return message;
};

/**
 * 获取状态码的详细信息
 */
export const getStatusDetail = (status: number): { type: StatusCodeType; message: string; description: string } => {
  const type = getStatusType(status);
  const message = HTTP_ERROR_MESSAGES[status] || "未知状态码";

  let description = "";
  switch (type) {
    case StatusCodeType.SUCCESS:
      description = "请求成功";
      break;
    case StatusCodeType.REDIRECT:
      description = "需要进一步操作";
      break;
    case StatusCodeType.CLIENT_ERROR:
      description = "客户端请求错误";
      break;
    case StatusCodeType.SERVER_ERROR:
      description = "服务器处理错误";
      break;
    default:
      description = "未知类型";
  }

  return { type, message, description };
};

export default checkStatus;
