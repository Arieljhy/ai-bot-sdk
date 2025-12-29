export { ChatSDK } from './core/ChatSDK'
export { createChatSDK } from './index'

export interface ChatSDKExports {
  ChatSDK: typeof import('./core/ChatSDK').ChatSDK
  createChatSDK: (config?: import('./core/ChatSDK').ChatSDKConfig) => import('./core/ChatSDK').ChatSDK
  default: typeof import('./core/ChatSDK').ChatSDK
}

declare const sdk: ChatSDKExports;
export default sdk
