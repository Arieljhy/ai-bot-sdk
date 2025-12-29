<template>
  <div class="cs-welcome-section">
    <!-- 欢迎消息 -->
    <div class="cs-welcome-card">
      <div class="cs-welcome-content">
        <div class="cs-welcome-title">{{ welcomeMessage }}</div>
        <div class="cs-welcome-subtitle">你可以试着问我：</div>
      </div>
      <button class="cs-refresh-btn" @click="$emit('refreshQuestions')">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
          />
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
        <button class="cs-ask-btn">提问</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuickQuestion } from '../types'

interface Props {
  welcomeMessage?: string
  quickQuestions: QuickQuestion[]
}

withDefaults(defineProps<Props>(), {
  welcomeMessage: 'Hi，我是智能客服',
  quickQuestions: () => [],
})

const emit = defineEmits<{
  askQuestion: [question: QuickQuestion]
  refreshQuestions: []
}>()

const handleQuestionClick = (question: QuickQuestion) => {
  emit('askQuestion', question)
}
</script>

<style lang="less">
@import '../styles/variables.less';

.cs-welcome-section {
  display: flex;
  flex-direction: column;
  gap: @spacing-md;
}

.cs-welcome-card {
  background: @bg-white;
  border-radius: 10px;
  padding: @spacing-xl @spacing-lg;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: @spacing-md;
  box-shadow: @shadow-sm;
}

.cs-welcome-content {
  flex: 1;
}

.cs-welcome-title {
  font-size: @font-size-xl;
  font-weight: @font-weight-semibold;
  color: @text-primary;
  line-height: 1.4;
  margin-bottom: @spacing-xs;
}

.cs-welcome-subtitle {
  font-size: @font-size-base;
  color: @text-tertiary;
  line-height: 1.5;
}

.cs-refresh-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: @spacing-xs;
  padding: @spacing-sm @spacing-md;
  background: transparent;
  border: none;
  border-radius: @radius-md;
  color: @primary-color;
  font-size: @font-size-base;
  cursor: pointer;
  transition: all @transition-duration-base @transition-timing-function;
  flex-shrink: 0;

  &:hover {
    background-color: rgba(59, 130, 246, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: @spacing-lg;
    height: @spacing-lg;
  }
}

.cs-questions-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cs-question-item {
  background: @bg-white;
  border-radius: @radius-md;
  padding: @spacing-lg;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: @spacing-md;
  box-shadow: @shadow-sm;
  cursor: pointer;
  transition: all @transition-duration-base @transition-timing-function;

  &:hover {
    box-shadow: @shadow-md;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

.cs-question-text {
  flex: 1;
  font-size: @font-size-lg;
  color: @text-primary;
  line-height: 1.5;
  word-break: break-word;
}

.cs-ask-btn {
  padding: @spacing-sm @spacing-xl;
  background-color: @primary-color;
  color: @text-white;
  border: none;
  border-radius: 6px;
  font-size: @font-size-base;
  font-weight: @font-weight-medium;
  cursor: pointer;
  white-space: nowrap;
  transition: all @transition-duration-base @transition-timing-function;
  flex-shrink: 0;

  &:hover {
    background-color: @primary-color-hover;
    box-shadow: @shadow-primary-md;
  }

  &:active {
    transform: scale(0.95);
  }
}

// 移动端适配
@media (max-width: @screen-xs) {
  .cs-question-text {
    font-size: @font-size-md;
  }

  .cs-ask-btn {
    padding: @spacing-sm @spacing-lg;
    font-size: @font-size-sm;
  }
}
</style>
