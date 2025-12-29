<template>
  <Transition :name="slideDirection">
    <div v-if="isOpen" :class="['cs-chat-window', `cs-chat-window-${position}`]">
      <!-- 头部 -->
      <ChatHeader
        :title="config.title || '智能客服'"
        :avatar="config.avatar?.assistant"
        @close="handleClose"
      />

      <!-- 消息区域 -->
      <div class="cs-messages-container" ref="messagesContainer">
        <!-- 欢迎消息和推荐问题 - 始终显示 -->
        <WelcomeSection
          :welcome-message="config.welcomeMessage || 'Hi，我是智能客服'"
          :quick-questions="displayedQuestions"
          :show-welcome="messages.length === 0"
          @ask-question="handleAskQuestion"
          @refresh-questions="handleRefreshQuestions"
        />

        <!-- 消息列表 -->
        <MessagesList
          v-if="messages.length > 0"
          :messages="messages"
          :config="config"
          :streaming-message-id="streamingMessageId"
          :streaming-content="streamingContent"
          @feedback="handleFeedback"
        />
      </div>

      <!-- 推荐问题 (有消息时显示在输入框上方) -->
      <QuickQuestions
        v-if="messages.length > 0"
        :quick-questions="allQuickQuestions"
        @ask-question="handleAskQuestion"
      />

      <!-- 输入框区域 -->
      <MessageInput
        :placeholder="config.placeholder || '你可以问我任何平台相关的问题'"
        :disabled="isLoading"
        @send="handleSendMessage"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import ChatHeader from './ChatHeader.vue'
import WelcomeSection from './WelcomeSection.vue'
import MessagesList from './MessagesList.vue'
import MessageInput from './MessageInput.vue'
import QuickQuestions from './QuickQuestions.vue'
import { useQuickQuestions } from '../composables/useQuickQuestions'
import { useStreamingChat } from '../composables/useStreamingChat'
import { useScrollPosition } from '../composables/useScrollPosition'
import type { ChatSDKConfig, ChatMessage, QuickQuestion } from '../types'

interface Props {
  isOpen: boolean
  config: ChatSDKConfig
  messages: ChatMessage[]
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

const emit = defineEmits<{
  close: []
  sendMessage: [content: string]
  askQuestion: [question: QuickQuestion]
  feedback: [messageId: string, type: 'like' | 'dislike' | null]
  streamingComplete: [messageId: string, content: string]
}>()

// 获取位置配置
const position = computed(() => props.config.position || 'right')

// 根据位置确定动画方向
const slideDirection = computed(() => {
  return position.value === 'left' ? 'slide-left' : 'slide-right'
})

// 消息容器引用
const messagesContainer = ref<HTMLElement>()

// 推荐问题管理
const {
  displayedQuestions,
  allQuickQuestions,
  refreshQuestions,
} = useQuickQuestions(props.config.quickQuestions || [])

// 流式聊天管理
const {
  streamingMessageId,
  streamingContent,
  startStreamingChat,
} = useStreamingChat(props.config)

// 滚动位置管理
const {
  saveScrollPosition,
  restoreScrollPosition,
  resetScrollPosition,
  scrollToBottom,
  watchStreamingContent,
} = useScrollPosition(messagesContainer, streamingContent)

// 监听流式内容变化，自动滚动到底部
watchStreamingContent()

// 监听消息变化，自动滚动到底部
watch(() => props.messages, scrollToBottom, { deep: true })

// 监听窗口打开/关闭，保存和恢复滚动位置
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    // 窗口打开时恢复滚动位置
    restoreScrollPosition()
  }
})

// 初始化
onMounted(() => {
  // 初始化推荐问题已在 useQuickQuestions 中处理
})

// 刷新推荐问题（换一换）
const handleRefreshQuestions = () => {
  refreshQuestions()
}

// 处理提问
const handleAskQuestion = (question: QuickQuestion) => {
  emit('askQuestion', question)
  startStreamingChat(question.text, {
    onComplete: (messageId, content) => {
      emit('streamingComplete', messageId, content)
      resetScrollPosition()
    }
  })
}

// 处理点赞点踩
const handleFeedback = (messageId: string, type: 'like' | 'dislike' | null) => {
  emit('feedback', messageId, type)
}

// 处理发送消息
const handleSendMessage = (content: string) => {
  emit('sendMessage', content)
  startStreamingChat(content, {
    onComplete: (messageId, content) => {
      emit('streamingComplete', messageId, content)
      resetScrollPosition()
    }
  })
}

// 处理关闭
const handleClose = () => {
  // 保存当前滚动位置
  saveScrollPosition()
  emit('close')
}
</script>

<style scoped lang="less">
@import '../styles/variables.less';

// 通用聊天窗口样式
.cs-chat-window {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background-color: @bg-color;
  display: flex;
  flex-direction: column;
  font-family: @font-family-base;
  z-index: 200;
}

// 左侧布局
.cs-chat-window-left {
  left: 0;
  right: auto;
}

// 右侧布局
.cs-chat-window-right {
  left: auto;
  right: 0;
}

.cs-messages-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: @spacing-xl @spacing-lg;
  -webkit-overflow-scrolling: touch;

  // 滚动条样式
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
}

.cs-messages-list {
  display: flex;
  flex-direction: column;
  gap: @spacing-md;
}

// 从右侧滑入动画 (默认)
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform @transition-duration-slow @transition-timing-function;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

// 从左侧滑入动画
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform @transition-duration-slow @transition-timing-function;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

// 桌面端适配
@media (min-width: @screen-md) {
  .cs-chat-window {
    max-width: 420px;
    bottom: @spacing-xl;
    height: calc(100vh - 40px);
    max-height: 800px;
    border-radius: @radius-xl;
    box-shadow: @shadow-lg;
  }

  // 左侧布局 - 桌面端
  .cs-chat-window-left {
    left: @spacing-xl;
    transform: none;
  }

  // 右侧布局 - 桌面端
  .cs-chat-window-right {
    right: @spacing-xl;
    left: auto;
  }

  // 左侧滑入动画 - 桌面端
  .slide-left-enter-from,
  .slide-left-leave-to {
    transform: translateX(-100%) translateY(0);
  }

  // 右侧滑入动画 - 桌面端
  .slide-right-enter-from,
  .slide-right-leave-to {
    transform: translateX(100%) translateY(0);
  }
}
</style>
