<template>
  <button
    v-if="visible"
    class="floating-button"
    @click="handleClick"
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>
    <!-- 未读消息提示 -->
    <span v-if="unreadCount > 0" class="badge">
      {{ unreadCount > 99 ? '99+' : unreadCount }}
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  visible?: boolean
  unreadCount?: number
}

interface Emits {
  (e: 'click'): void
}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
  unreadCount: 0
})

const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click')
}
</script>

<style scoped lang="less">
@import '../../styles/variables.less';

.floating-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: @gradient-primary;
  color: @text-white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: @shadow-primary-lg;
  transition: all @transition-duration-slow @transition-timing-function;
  /* z-index 必须高于 SDK 容器的 999999 */
  z-index: 1000000;

  svg {
    width: @spacing-2xl;
    height: @spacing-2xl;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #ff4757;
  color: @text-white;
  font-size: @font-size-xs;
  font-weight: @font-weight-semibold;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity @transition-duration-slow ease,
    transform @transition-duration-slow ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

// 移动端适配
@media (max-width: @screen-md) {
  .floating-button {
    bottom: 16px;
    right: 16px;
    width: 52px;
    height: 52px;

    svg {
      width: @spacing-2xl;
      height: @spacing-2xl;
    }
  }
}
</style>
