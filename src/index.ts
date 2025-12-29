import { ChatSDK } from './core/ChatSDK'
import type { ChatSDKConfig } from './types'

/**
 * 创建SDK实例的便捷函数
 */
export function createChatSDK(config?: ChatSDKConfig): ChatSDK {
  return new ChatSDK(config)
}

/**
 * 导出SDK主类
 */
export { ChatSDK } from './core/ChatSDK'

/**
 * 默认导出
 */
export default ChatSDK

/**
 * 导出类型定义
 */
export * from './types'
