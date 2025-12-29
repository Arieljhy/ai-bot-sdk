import type { ChatSDKConfig } from './types'

/**
 * ChatSDK 类
 */
export class ChatSDK {
  constructor(config?: ChatSDKConfig)
  mount(selector?: string | HTMLElement): void
  unmount(): void
  open(): void
  close(): void
  toggle(): void
  sendMessage(content: string): Promise<void>
  addMessage(message: import('./types').ChatMessage): void
  appendMessageContent(messageId: string, content: string): void
  finishMessageStream(messageId: string): void
  clearMessages(): void
  on(event: string, callback: Function): void
  off(event: string, callback: Function): void
  updateConfig(config: Partial<ChatSDKConfig>): void
}

/**
 * 创建SDK实例的便捷函数
 */
export declare function createChatSDK(config?: ChatSDKConfig): ChatSDK

export type { ChatSDKConfig, ChatMessage, QuickQuestion } from './types'

/**
 * 默认导出
 */
export default ChatSDK
