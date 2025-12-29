<template>
  <!-- 聊天窗口 -->
  <ChatWindow
    :is-open="sdk.isOpen.value"
    :config="sdk.config"
    :messages="sdk.messages.value"
    :is-loading="sdk.isLoading.value"
    @close="sdk.close()"
    @send-message="sdk.handleSendMessage($event)"
    @ask-question="sdk.handleAskQuestion($event)"
    @feedback="(messageId, type) => sdk.handleFeedback({ messageId, type })"
    @streaming-complete="(messageId, content) => sdk.handleStreamingComplete(messageId, content)"
  />
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import ChatWindow from './components/ChatWindow.vue'
import type { ChatSDK } from './index'

defineProps({
  sdk: {
    type: Object as PropType<ChatSDK>,
    required: true,
  },
})
</script>

<style scoped>
/* Shadow DOM 内部全局样式 - 已在 index.ts 的 injectGlobalStyles 中处理 */
/* 这里只需要添加一些额外的辅助样式 */
</style>
