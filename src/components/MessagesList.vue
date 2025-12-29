<template>
  <div class="cs-messages-list">
    <MessageItem
      v-for="message in displayMessages"
      :key="message.id"
      :message="message"
      :avatar="getMessageAvatar(message)"
      @feedback="handleFeedback"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import MessageItem from './MessageItem.vue'
import type { ChatMessage, ChatSDKConfig } from '../types'

interface Props {
  messages: ChatMessage[]
  config: ChatSDKConfig
  streamingMessageId?: string  // 当前流式消息的 ID
  streamingContent?: string      // 流式内容
}

const props = withDefaults(defineProps<Props>(), {
  streamingMessageId: undefined,
  streamingContent: '',
})

const emit = defineEmits<{
  feedback: [messageId: string, type: 'like' | 'dislike' | null]
}>()

// 流式消息的完整内容（用于累加 chunks）
const streamingFullContent = ref('')

// 监听流式内容变化，累加到完整内容中
watch(() => props.streamingContent, (newContent) => {
  if (newContent) {
    streamingFullContent.value = newContent
  } else {
    streamingFullContent.value = ''
  }
}, { immediate: true })

// 监听流式消息 ID 变化，重置内容
watch(() => props.streamingMessageId, (newId, oldId) => {
  if (newId !== oldId) {
    streamingFullContent.value = ''
  }
})

// 计算要显示的消息列表（包括流式消息）
const displayMessages = computed(() => {
  const list = [...props.messages]

  // 如果有流式消息，添加或更新它
  if (props.streamingMessageId && streamingFullContent.value) {
    const existingIndex = list.findIndex(m => m.id === props.streamingMessageId)

    if (existingIndex >= 0) {
      // 更新现有消息内容
      const existingMsg = list[existingIndex]!
      list[existingIndex] = {
        id: existingMsg.id,
        role: existingMsg.role,
        content: streamingFullContent.value,
        isStreaming: true,
        timestamp: existingMsg.timestamp,
        feedback: existingMsg.feedback,
      }
    } else {
      // 添加新的流式消息
      list.push({
        id: props.streamingMessageId,
        role: 'assistant',
        content: streamingFullContent.value,
        isStreaming: true,
        timestamp: Date.now(),
      })
    }
  }

  return list
})

// 根据消息角色获取对应的头像
const getMessageAvatar = (message: ChatMessage) => {
  if (message.role === 'assistant') {
    return props.config.avatar?.assistant
  }
  if (message.role === 'user') {
    return props.config.avatar?.user
  }
  return undefined
}

// 处理点赞点踩事件
const handleFeedback = (messageId: string, type: 'like' | 'dislike' | null) => {
  emit('feedback', messageId, type)
}
</script>

<style scoped lang="less">
@import '../styles/variables.less';

.cs-messages-list {
  display: flex;
  flex-direction: column;
  gap: @spacing-md;
}
</style>
