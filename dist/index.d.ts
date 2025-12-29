export { ChatSDK } from './core/ChatSDK'
export { createChatSDK } from './index'

export interface ChatSDKExports {
  ChatSDK: typeof ChatSDK
  createChatSDK: (config?: ChatSDKConfig) => ChatSDK
  default: typeof ChatSDK
}

declare const sdk: ChatSDKExports
export default sdk
