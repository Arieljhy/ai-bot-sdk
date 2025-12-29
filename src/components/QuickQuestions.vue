<template>
  <div v-if="quickQuestions.length > 0" class="cs-quick-questions">
    <div class="cs-questions-scroll" ref="scrollContainer">
      <div
        v-for="question in quickQuestions"
        :key="question.id"
        class="cs-question-chip"
        @click="$emit('askQuestion', question)"
      >
        <span class="cs-question-text">{{ question.text }}</span>
        <svg class="cs-question-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuickQuestion } from '../types'

interface Props {
  quickQuestions: QuickQuestion[]
}

withDefaults(defineProps<Props>(), {
  quickQuestions: () => [],
})

defineEmits<{
  askQuestion: [question: QuickQuestion]
}>()
</script>

<style scoped lang="less">
@import '../styles/variables.less';

.cs-quick-questions {
  padding: @spacing-md @spacing-lg;
  background: @bg-color;
  border-top: 1px solid @border-color;
}

.cs-questions-scroll {
  display: flex;
  gap: @spacing-sm;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.cs-question-chip {
  display: inline-flex;
  align-items: center;
  gap: @spacing-xs;
  padding: @spacing-sm @spacing-md;
  background: @bg-white;
  border: 1px solid @border-color-light;
  border-radius: @radius-full;
  white-space: nowrap;
  cursor: pointer;
  transition: all @transition-duration-base @transition-timing-function;
  flex-shrink: 0;

  &:hover {
    border-color: @primary-color;
    color: @primary-color;
    box-shadow: @shadow-primary-sm;
  }

  &:active {
    transform: scale(0.95);
  }
}

.cs-question-text {
  font-size: @font-size-sm;
  color: @text-primary;
}

.cs-question-icon {
  width: @spacing-sm;
  height: @spacing-sm;
  flex-shrink: 0;
  color: @text-tertiary;
}

.cs-question-chip:hover {
  .cs-question-icon {
    color: @primary-color;
  }
}
</style>
