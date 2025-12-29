<template>
  <div class="cs-header">
    <div class="cs-header-left">
      <!-- 智能客服头像 -->
      <div class="cs-avatar">
        <svg viewBox="0 0 24 24" fill="currentColor" v-if="!avatar">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
        <img v-else :src="avatar" alt="智能客服" class="cs-avatar-img" />
      </div>
      <span class="cs-title">{{ title }}</span>
    </div>

    <div class="cs-header-right">
      <!-- 菜单按钮 -->
      <button class="cs-icon-btn" @click="$emit('menu')">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>

      <!-- 关闭按钮 -->
      <button class="cs-icon-btn cs-close-btn" @click="$emit('close')">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  avatar?: string
}

withDefaults(defineProps<Props>(), {
  title: '智能客服',
})

defineEmits<{
  close: []
  menu: []
}>()
</script>

<style lang="less">
@import '../styles/variables.less';

.cs-header {
  height: @header-height;
  padding: 0 @spacing-lg;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: @bg-color;
  border-bottom: 1px solid @border-color;
  flex-shrink: 0;
}

.cs-header-left {
  display: flex;
  align-items: center;
  gap: @spacing-md;
}

.cs-avatar {
  width: @avatar-size;
  height: @avatar-size;
  border-radius: 50%;
  background: @gradient-blue;
  color: @text-white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;

  svg {
    width: @font-size-3xl;
    height: @font-size-3xl;
  }
}

.cs-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cs-title {
  font-size: @font-size-xl;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.cs-header-right {
  display: flex;
  align-items: center;
  gap: @spacing-sm;
}

.cs-icon-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 50%;
  color: @text-tertiary;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all @transition-duration-base @transition-timing-function;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: @text-primary;
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: @font-size-3xl;
    height: @font-size-3xl;
  }
}

.cs-close-btn {
  color: @text-tertiary;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: @text-primary;
  }
}
</style>
