<template>
  <div class="cs-input-container">
    <div class="cs-input-wrapper">
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        class="cs-input"
        :placeholder="placeholder"
        :disabled="disabled"
        @keydown.enter="handleSend"
        @input="handleInput"
      />
      <button
        class="cs-send-btn"
        :class="{ 'cs-send-btn-active': canSend }"
        :disabled="disabled || !canSend"
        @click="handleSend"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

interface Props {
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '你可以问我任何平台相关的问题',
  disabled: false,
})

const emit = defineEmits<{
  send: [content: string]
}>()

const inputValue = ref('')
const inputRef = ref<HTMLInputElement>()

const canSend = computed(() => inputValue.value.trim().length > 0)

const handleInput = () => {
  // 输入逻辑
}

const handleSend = () => {
  const text = inputValue.value.trim()
  if (!text) return

  // 清空输入框
  inputValue.value = ''

  // 发送消息事件
  emit('send', text)
}

// 暴露 focus 方法
const focus = () => {
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// 暴露给父组件
defineExpose({
  focus
})
</script>

<style scoped lang="less">
@import '../styles/variables.less';

.cs-input-container {
  height: @input-height;
  padding: @spacing-md @spacing-lg;
  background-color: @bg-color;
  border-top: 1px solid @border-color;
  flex-shrink: 0;
}

.cs-input-wrapper {
  display: flex;
  align-items: center;
  gap: @spacing-md;
  height: 100%;
}

.cs-input {
  flex: 1;
  height: 46px;
  padding: 0 @spacing-lg;
  background: @bg-white;
  border: none;
  border-radius: 23px;
  font-size: @font-size-md;
  color: @text-primary;
  outline: none;
  transition: all @transition-duration-base @transition-timing-function;

  &::placeholder {
    color: @text-tertiary;
    font-size: @font-size-base;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
}

.cs-send-btn {
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 50%;
  background-color: #e5e7eb;
  color: @text-tertiary;
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all @transition-duration-base @transition-timing-function;
  flex-shrink: 0;

  svg {
    width: @font-size-3xl;
    height: @font-size-3xl;
  }

  &:disabled {
    cursor: not-allowed;
    transform: none;
  }
}

.cs-send-btn-active {
  background: @gradient-blue;
  color: @text-white;
  cursor: pointer;
  box-shadow: @shadow-primary-md;

  &:hover {
    box-shadow: @shadow-primary-lg;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

// 移动端适配
@media (max-width: @screen-xs) {
  .cs-input-container {
    padding: 10px @spacing-md;
  }

  .cs-input {
    height: 42px;
    font-size: @font-size-base;
  }

  .cs-send-btn {
    width: 42px;
    height: 42px;

    svg {
      width: 22px;
      height: 22px;
    }
  }
}
</style>
