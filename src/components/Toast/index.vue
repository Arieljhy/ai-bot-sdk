<template>
  <Transition name="toast-fade">
    <div v-if="toast" class="cs-toast">
      <div class="cs-toast-content">
        <div class="cs-toast-message">{{ toast.message }}</div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { ToastOptions } from "@/hooks/useToast";

defineProps<{
  toast: ToastOptions | null;
}>();
</script>

<style scoped>
/* Toast 容器 - 绝对定位，相对于 ChatWindow 居中 */
.cs-toast {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  pointer-events: none;
}

/* Toast 内容 */
.cs-toast-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  min-width: 200px;
  max-width: 320px;
}

/* Toast 消息 */
.cs-toast-message {
  font-size: 15px;
  line-height: 1.5;
  color: #ffffff;
  word-break: break-word;
  text-align: center;
}

/* 过渡动画 */
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -40%);
}

.toast-fade-enter-to,
.toast-fade-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%);
}
</style>
