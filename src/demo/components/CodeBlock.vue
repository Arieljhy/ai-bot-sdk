<template>
  <div class="code-block">
    <pre><code>{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
interface Props {
  code: string
}

defineProps<Props>()
</script>

<style scoped lang="less">
@import '../../styles/variables.less';

.code-block {
  background: #f5f5f5;
  border-radius: @radius-md;
  padding: @spacing-lg;
  overflow-x: auto;

  pre {
    margin: 0;
    padding: 0;
    font-family: @font-family-mono;
    font-size: @font-size-sm;
    color: #333;
    line-height: 1.6;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  code {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: none;
    padding: 0;
  }
}
</style>
