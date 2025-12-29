<template>
  <div class="demo-header">
    <h1>🤖 智能客服SDK</h1>
    <p>基于Vue 3的移动端H5智能客服组件</p>
  </div>
</template>

<script setup lang="ts">
// Header 组件 - 纯展示组件
</script>

<style scoped lang="less">
@import '../../styles/variables.less';

.demo-header {
  text-align: center;
  color: @text-white;
  margin-bottom: 40px;

  h1 {
    font-size: @font-size-4xl;
    font-weight: @font-weight-bold;
    margin-bottom: 10px;
  }

  p {
    font-size: @font-size-lg;
    opacity: 0.9;
  }
}
</style>
