import { ref, watch } from 'vue'
import { useSSE } from './useSSE'
import type { ChatSDKConfig } from '../types'

interface StreamingChatOptions {
  sseUrl?: string
  sseMethod?: 'GET' | 'POST'
  onComplete?: (messageId: string, content: string) => void
}

/**
 * 流式聊天管理 Hook
 */
export function useStreamingChat(config: ChatSDKConfig) {
  const streamingMessageId = ref<string>()
  const streamingContent = ref('')

  // 使用 useSSE 进行流式对话
  const { content: sseContent, start: startSSE, reset: resetSSE } = useSSE()

  // 追踪上次发送的内容长度，用于计算增量
  let lastSSEContentLength = 0

  // 监听 SSE 内容变化，更新流式内容
  watch(sseContent, (newContent) => {
    if (newContent && newContent.length > lastSSEContentLength) {
      const chunk = newContent.slice(lastSSEContentLength)
      streamingContent.value += chunk
      lastSSEContentLength = newContent.length
    }
  })

  /**
   * 启动流式对话
   */
  const startStreamingChat = async (userMessage: string, options?: StreamingChatOptions) => {
    // 重置状态
    resetSSE()
    lastSSEContentLength = 0
    streamingContent.value = ''

    // 创建新的 AI 消息 ID 用于流式传输
    streamingMessageId.value = Date.now().toString()

    // 开始流式请求
    try {
      await startSSE({
        url: options?.sseUrl || config.sseUrl || 'http://localhost:3000/sse',
        method: options?.sseMethod || config.sseMethod || 'POST',
        body: {
          message: userMessage,
          history: []
        },
        onComplete: () => {
          console.log('✅ 流式传输完成')
          if (streamingMessageId.value && streamingContent.value) {
            options?.onComplete?.(streamingMessageId.value, streamingContent.value)
          }
          handleComplete()
        },
        onError: (error: Error) => {
          console.error('❌ SSE 错误:', error)
          streamingContent.value += `错误：${error.message}`
          if (streamingMessageId.value && streamingContent.value) {
            options?.onComplete?.(streamingMessageId.value, streamingContent.value)
          }
          handleComplete()
        }
      })
    } catch (error) {
      console.error('❌ 启动 SSE 失败:', error)
      streamingContent.value += '网络错误，请检查连接'
      if (streamingMessageId.value && streamingContent.value) {
        options?.onComplete?.(streamingMessageId.value, streamingContent.value)
      }
      handleComplete()
    }
  }

  /**
   * 处理流式完成
   */
  const handleComplete = () => {
    // 清空流式状态
    streamingMessageId.value = undefined
    streamingContent.value = ''
  }

  /**
   * 获取当前是否正在流式传输
   */
  const isStreaming = () => {
    return !!streamingMessageId.value
  }

  return {
    streamingMessageId,
    streamingContent,
    startStreamingChat,
    isStreaming,
  }
}
