<template>
  <div class="feature-list">
    <li v-for="(feature, index) in features" :key="index">
      <div class="feature-icon">{{ index + 1 }}</div>
      <div class="feature-text">
        <strong>{{ feature.title }}</strong>
        <span>{{ feature.description }}</span>
      </div>
    </li>
  </div>
</template>

<script setup lang="ts">
interface Feature {
  title: string
  description: string
}

const features: Feature[] = [
  {
    title: '移动端优先',
    description: '专为移动端H5设计，完美适配各种屏幕尺寸'
  },
  {
    title: '推荐问题',
    description: '智能推荐常见问题，支持"换一换"功能'
  },
  {
    title: '流式输出',
    description: '支持AI回复的流式输出，提升用户体验'
  },
  {
    title: '历史记录',
    description: '自动保存聊天历史，支持本地存储'
  },
  {
    title: '灵活配置',
    description: '丰富的配置选项，轻松定制样式和行为'
  }
]
</script>

<style scoped lang="less">
@import '../../styles/variables.less';

.feature-list {
  list-style: none;
  padding: 0;

  li {
    padding: @spacing-md 0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    gap: @spacing-md;

    &:last-child {
      border-bottom: none;
    }
  }
}

.feature-icon {
  width: @spacing-3xl;
  height: @spacing-3xl;
  background: @gradient-primary;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: @text-white;
  font-weight: @font-weight-bold;
  flex-shrink: 0;
}

.feature-text {
  flex: 1;

  strong {
    display: block;
    color: @text-primary;
    margin-bottom: @spacing-xs;
  }

  span {
    font-size: @font-size-sm;
    color: @text-secondary;
  }
}
</style>
