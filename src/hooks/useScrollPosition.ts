import { ref, watch, nextTick, type Ref } from 'vue'

/**
 * 滚动位置管理 Hook
 */
export function useScrollPosition(
  containerRef: Ref<HTMLElement | undefined>,
  streamingContent: Ref<string>
) {
  const savedScrollTop = ref(0)

  /**
   * 滚动到底部
   */
  const scrollToBottom = () => {
    nextTick(() => {
      if (containerRef.value) {
        containerRef.value.scrollTop = containerRef.value.scrollHeight
      }
    })
  }

  /**
   * 保存当前滚动位置
   */
  const saveScrollPosition = () => {
    // 只在非流式状态下保存滚动位置
    if (containerRef.value && !streamingContent.value) {
      savedScrollTop.value = containerRef.value.scrollTop
    }
  }

  /**
   * 恢复滚动位置
   */
  const restoreScrollPosition = () => {
    // 只在非流式状态下恢复滚动位置
    if (!streamingContent.value) {
      nextTick(() => {
        if (containerRef.value && savedScrollTop.value > 0) {
          containerRef.value.scrollTop = savedScrollTop.value
        }
      })
    }
  }

  /**
   * 重置滚动位置（流式完成后调用）
   */
  const resetScrollPosition = () => {
    savedScrollTop.value = 0
  }

  /**
   * 监听流式内容变化，自动滚动到底部
   */
  const watchStreamingContent = () => {
    watch(streamingContent, () => {
      nextTick(() => {
        if (containerRef.value) {
          containerRef.value.scrollTop = containerRef.value.scrollHeight
        }
      })
    })
  }

  return {
    savedScrollTop,
    scrollToBottom,
    saveScrollPosition,
    restoreScrollPosition,
    resetScrollPosition,
    watchStreamingContent,
  }
}
