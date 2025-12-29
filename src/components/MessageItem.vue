<template>
  <div :class="['cs-message-item', `cs-message-${message.role}`]">
    <!-- 头像 -->
    <div v-if="message.role === 'assistant'" class="cs-message-avatar">
      <div class="cs-avatar cs-avatar-assistant">
        <svg v-if="!avatar" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
        <img v-else :src="avatar" alt="智能客服" class="cs-avatar-img" />
      </div>
    </div>

    <div class="cs-message-wrapper">
      <!-- 消息气泡 -->
      <div :class="['cs-message-bubble', `cs-bubble-${message.role}`]">
        <div class="cs-message-content">{{ message.content }}</div>

        <!-- 流式输出加载动画 -->
        <div v-if="message.isStreaming" class="cs-streaming-indicator">
          <span class="cs-dot"></span>
          <span class="cs-dot"></span>
          <span class="cs-dot"></span>
        </div>
      </div>

      <!-- 点赞点踩按钮 (仅助手消息显示) -->
      <div v-if="message.role === 'assistant' && !message.isStreaming" class="cs-feedback-actions">
        <button
          :class="['cs-feedback-btn', { 'cs-feedback-btn-active': message.feedback === 'like' }]"
          @click="handleFeedback('like')"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path
              d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
            />
          </svg>
        </button>
        <button
          :class="['cs-feedback-btn', { 'cs-feedback-btn-active': message.feedback === 'dislike' }]"
          @click="handleFeedback('dislike')"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path
              d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 用户头像 -->
    <div v-if="message.role === 'user'" class="cs-message-avatar">
      <div class="cs-avatar cs-avatar-user">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '../types'

interface Props {
  message: ChatMessage
  avatar?: string
}

interface Emits {
  (e: 'feedback', messageId: string, type: 'like' | 'dislike'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleFeedback = (type: 'like' | 'dislike') => {
  // 如果已经点击过相同类型，则取消
  if (props.message.feedback === type) {
    emit('feedback', props.message.id, null as any)
  } else {
    emit('feedback', props.message.id, type)
  }
}
</script>

<style scoped lang="less">
@import '../styles/variables.less';

.cs-message-item {
  display: flex;
  gap: @spacing-sm;
  margin-bottom: @spacing-xs;
}

.cs-message-assistant {
  justify-content: flex-start;
}

.cs-message-user {
  justify-content: flex-end;
}

.cs-message-avatar {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
}

.cs-avatar {
  width: @avatar-size-sm;
  height: @avatar-size-sm;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;

  svg {
    width: @spacing-xl;
    height: @spacing-xl;
  }
}

.cs-avatar-assistant {
  background: @gradient-blue;
  color: @text-white;
}

.cs-avatar-user {
  background: @gradient-gray;
  color: @text-white;
}

.cs-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cs-message-wrapper {
  display: flex;
  flex-direction: column;
  gap: @spacing-xs;
  max-width: 75%;
}

.cs-message-bubble {
  padding: @spacing-md @spacing-lg;
  border-radius: @radius-lg;
  position: relative;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.cs-bubble-assistant {
  background: @bg-white;
  color: @text-primary;
  border-bottom-left-radius: @radius-sm;
  box-shadow: @shadow-sm;
}

.cs-bubble-user {
  background: @gradient-blue;
  color: @text-white;
  border-bottom-right-radius: @radius-sm;
  box-shadow: @shadow-primary-sm;
}

.cs-message-content {
  font-size: @font-size-md;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.cs-bubble-user {
  .cs-message-content {
    color: @text-white;
  }
}

.cs-streaming-indicator {
  display: inline-flex;
  align-items: center;
  gap: @spacing-xs;
  margin-left: @spacing-sm;
  vertical-align: middle;
}

.cs-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
  animation: dotBounce 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }

  &:nth-child(2) {
    animation-delay: -0.16s;
  }
}

@keyframes dotBounce {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

// 点赞点踩按钮
.cs-feedback-actions {
  display: flex;
  gap: @spacing-md;
  padding-left: @spacing-xs;
}

.cs-feedback-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid @border-color-light;
  background: @bg-white;
  border-radius: @radius-sm;
  color: @text-tertiary;
  cursor: pointer;
  transition: all @transition-duration-base @transition-timing-function;

  svg {
    width: @spacing-sm;
    height: @spacing-sm;
  }

  &:hover {
    border-color: @primary-color;
    color: @primary-color;
    background: rgba(59, 130, 246, 0.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

.cs-feedback-btn-active {
  background: @primary-color;
  border-color: @primary-color;
  color: @text-white;

  &:hover {
    background: @primary-color-hover;
    border-color: @primary-color-hover;
    color: @text-white;
  }
}

// 移动端适配
@media (max-width: @screen-xs) {
  .cs-message-wrapper {
    max-width: 80%;
  }

  .cs-message-content {
    font-size: @font-size-base;
  }
}
</style>
