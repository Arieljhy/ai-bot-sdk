<template>
  <div class="quick-start">
    <p>点击下方按钮测试SDK功能：</p>
    <div class="button-group">
      <button class="btn btn-primary" @click="handleOpenChat">打开聊天窗口</button>
      <button class="btn btn-secondary" @click="handleSendTest">发送测试消息</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'openChat'): void
  (e: 'sendTest'): void
}

const emit = defineEmits<Emits>()

const handleOpenChat = () => {
  emit('openChat')
}

const handleSendTest = () => {
  emit('sendTest')
}
</script>

<style scoped lang="less">
@import '../../styles/variables.less';

.quick-start {
  p {
    font-size: @font-size-base;
    color: @text-secondary;
    line-height: 1.6;
    margin-bottom: @spacing-lg;
  }
}

.button-group {
  display: flex;
  gap: @spacing-md;
  flex-wrap: wrap;
}

.btn {
  padding: @spacing-md @spacing-2xl;
  border: none;
  border-radius: @radius-md;
  font-size: @font-size-base;
  font-weight: @font-weight-medium;
  cursor: pointer;
  transition: all @transition-duration-base @transition-timing-function;
}

.btn-primary {
  background: @gradient-primary;
  color: @text-white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: @shadow-primary-lg;
  }
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;

  &:hover {
    background: #e5e5e5;
  }
}
</style>
