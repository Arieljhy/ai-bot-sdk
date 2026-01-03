/**
 * 全局请求 Loading
 * 使用 antd-mobile 的 Toast 组件实现
 */

import { Toast } from "antd-mobile/es";
let needLoadingRequestCount = 0;

/**
 * 开启 Loading
 */
const startLoading = () => {
    Toast.show({
    icon: "loading",
    content: "加载中...",
    duration: 0
  });
};

/**
 * 结束 Loading
 */
const endLoading = () => {
    Toast.clear();
};

/**
 * 显示全屏加载
 * 支持多个请求同时进行时只显示一个 loading
 */
export const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};

/**
 * 隐藏全屏加载
 * 当所有请求都完成时才隐藏 loading
 */
export const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};

/**
 * 手动关闭所有 Loading
 */
export const clearAllLoading = () => {
  needLoadingRequestCount = 0;
  endLoading();
  Toast.clear();
};
