import type {
  ChatSDKConfig,
  ChatMessage,
  QuickQuestion,
  ChatSDKInstance,
  ChatMessageEvent,
} from './types'
import { ChatSDK } from './ChatSDK'

export class ChatSDK {
  private app: any
  private container: HTMLElement | null
  private shadowRoot: ShadowRoot | null
  private eventListeners: Map<string, Set<Function>>
  public isOpen: import('vue').Ref<boolean>
  public config: import('vue').Reactive<ChatSDKConfig>
  public messages: import('vue').Ref<ChatMessage[]>
  public isLoading: import('vue').Ref<boolean>
  public unreadCount: import('vue').Ref<number>

  constructor(config?: ChatSDKConfig)

  mount(selector?: string | HTMLElement): void
  unmount(): void
  open(): void
  close(): void
  toggle(): void
  sendMessage(content: string): Promise<void>
  addMessage(message: ChatMessage): void
  appendMessageContent(messageId: string, content: string): void
  finishMessageStream(messageId: string): void
  clearMessages(): void
  handleSendMessage(content: string): Promise<void>
  handleAskQuestion(question: QuickQuestion): void
  handleFeedback(payload: { messageId: string; type: 'like' | 'dislike' | null }): void
  on(event: string, callback: Function): void
  off(event: string, callback: Function): void
  updateConfig(config: Partial<ChatSDKConfig>): void
}

export function createChatSDK(config?: ChatSDKConfig): ChatSDK

export default ChatSDK
export * from './types'
export * from './utils'
