export { ChatSDK } from './core/ChatSDK'
export { createChatSDK } from './index'
export type { ChatSDKConfig } from './types'

export interface ChatSDKExports {
  ChatSDK: typeof import('./core/ChatSDK').ChatSDK
  createChatSDK: (config?: import('./types').ChatSDKConfig) => import('./core/ChatSDK').ChatSDK
  default: typeof import('./core/ChatSDK').ChatSDK
}

declare const sdk: ChatSDKExports
export default sdk
