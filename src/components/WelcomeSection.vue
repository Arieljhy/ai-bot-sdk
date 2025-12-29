<template>
  <div class="cs-welcome-section">
    <!-- 欢迎消息和推荐问题卡片 -->
    <div class="cs-welcome-card">
      <!-- 顶部：头像、欢迎语、换一换按钮 -->
      <div class="cs-welcome-header">
        <div class="cs-welcome-left">
          <div class="cs-avatar">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <div class="cs-welcome-text">
            <div class="cs-welcome-title">{{ welcomeMessage }}</div>
            <div v-if="showWelcome" class="cs-welcome-subtitle">你可以试着问我：</div>
          </div>
        </div>
        <button class="cs-refresh-btn" @click="handleRefresh">
          <svg viewBox="0 0 24 24" fill="currentColor" :class="{ 'rotate-animating': isAnimating }">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
          <span>换一换</span>
        </button>
      </div>

      <!-- 推荐问题列表 -->
      <div class="cs-questions-list">
        <div
          v-for="question in quickQuestions"
          :key="question.id"
          class="cs-question-item"
          @click="handleQuestionClick(question)"
        >
          <div class="cs-question-text">{{ question.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { QuickQuestion } from '../types'

interface Props {
  welcomeMessage?: string
  quickQuestions: QuickQuestion[]
  showWelcome?: boolean
}

withDefaults(defineProps<Props>(), {
  welcomeMessage: 'Hi，我是智能客服',
  quickQuestions: () => [],
  showWelcome: true,
})

const emit = defineEmits<{
  askQuestion: [question: QuickQuestion]
  refreshQuestions: []
}>()

const isAnimating = ref(false)

const handleQuestionClick = (question: QuickQuestion) => {
  emit('askQuestion', question)
}

const handleRefresh = () => {
  // 添加旋转动画
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, 500)

  emit('refreshQuestions')
}
</script>

<style scoped lang="less">
@import '../styles/variables.less';

.cs-welcome-section {
  padding: @spacing-lg;
}

.cs-welcome-card {
  background: @bg-white;
  border-radius: @radius-xl;
  padding: @spacing-lg;
  box-shadow: @shadow-md;
  display: flex;
  flex-direction: column;
  gap: @spacing-md;
}

// 顶部区域：头像、欢迎语、换一换按钮
.cs-welcome-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: @spacing-md;
  padding-bottom: @spacing-md;
  border-bottom: 1px solid @border-color-light;
}

.cs-welcome-left {
  display: flex;
  align-items: center;
  gap: @spacing-md;
  flex: 1;
  min-width: 0; // 防止文本溢出
}

.cs-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: @gradient-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: @text-white;
  box-shadow: @shadow-primary-sm;

  svg {
    width: 24px;
    height: 24px;
  }
}

.cs-welcome-text {
  flex: 1;
  min-width: 0;
}

.cs-welcome-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
  line-height: 1.4;
  margin-bottom: 2px;
}

.cs-welcome-subtitle {
  font-size: @font-size-sm;
  color: @text-tertiary;
  line-height: 1.4;
}

// 换一换按钮
.cs-refresh-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: @spacing-sm;
  background: transparent;
  border: none;
  border-radius: @radius-md;
  color: @primary-color;
  font-size: @font-size-xs;
  cursor: pointer;
  transition: all @transition-duration-base @transition-timing-function;
  flex-shrink: 0;
  white-space: nowrap;

  &:hover {
    background-color: rgba(59, 130, 246, 0.08);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 18px;
    height: 18px;
    transition: transform 0.5s ease;

    &.rotate-animating {
      animation: rotate 0.5s ease-in-out;
    }
  }

  span {
    font-size: 11px;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 问题列表
.cs-questions-list {
  display: flex;
  flex-direction: column;
  gap: @spacing-sm;
}

.cs-question-item {
  background: @bg-color;
  border-radius: @radius-lg;
  padding: @spacing-md @spacing-lg;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: @spacing-md;
  cursor: pointer;
  transition: all @transition-duration-base @transition-timing-function;

  &:hover {
    background: #f3f4f6;
  }

  &:active {
    transform: scale(0.98);
  }
}

.cs-question-text {
  flex: 1;
  font-size: @font-size-base;
  color: @text-primary;
  line-height: 1.5;
  word-break: break-word;
}

// 移动端适配
@media (max-width: @screen-xs) {
  .cs-welcome-section {
    padding: @spacing-md;
  }

  .cs-welcome-card {
    padding: @spacing-md;
  }

  .cs-welcome-title {
    font-size: @font-size-base;
  }

  .cs-welcome-subtitle {
    font-size: 12px;
  }

  .cs-question-text {
    font-size: @font-size-sm;
  }
}
</style>
