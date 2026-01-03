/**
 * 智能 SDK 内部使用的 Toast 提示
 * 在组件内部居中显示，不影响全局
 */

import { ref, type Ref } from "vue";

export interface ToastOptions {
  message: string;
  duration?: number;
}

export interface UseToastReturn {
  toast: Ref<ToastOptions | null>;
  show: (message: string, duration?: number) => void;
  hide: () => void;
}

let toastTimer: ReturnType<typeof setTimeout> | null = null;

// 全局共享的 toast ref（组件和 API 层共用）
const globalToastRef = ref<ToastOptions | null>(null);

/**
 * 显示 Toast
 */
const show = (message: string, duration: number = 3000) => {
  // 清除之前的定时器
  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }

  // 更新全局 ref
  globalToastRef.value = { message, duration };

  // 自动隐藏
  if (duration > 0) {
    toastTimer = setTimeout(() => {
      hide();
    }, duration);
  }
};

/**
 * 隐藏 Toast
 */
const hide = () => {
  globalToastRef.value = null;
  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }
};

/**
 * Toast Hook - 组件和 API 层共用
 * @returns 全局 toast ref 和操作方法
 */
export const useToast = (): UseToastReturn => {
  return {
    toast: globalToastRef,
    show,
    hide
  };
};

// 导出全局 ref（用于 Toast 组件）
export { globalToastRef };

// 导出快捷方法（用于 API 层等非组件环境）
export const toast = {
  show
};
