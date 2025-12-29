export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  isStreaming?: boolean
  // 点赞点踩
  feedback?: 'like' | 'dislike' | null
}

export interface Conversation {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

export interface QuickQuestion {
  id: string
  text: string
  icon?: string
}

export interface ChatSDKConfig {
  // API 配置
  apiBaseUrl?: string
  apiEndpoint?: string

  // UI 配置
  title?: string
  placeholder?: string
  theme?: 'light' | 'dark'

  // 布局位置配置
  position?: 'left' | 'right'

  // 快捷问题配置
  quickQuestions?: QuickQuestion[]

  // 历史记录配置
  enableHistory?: boolean
  maxHistoryDays?: number

  // 其他配置
  welcomeMessage?: string
  avatar?: {
    user?: string
    assistant?: string
  }
}

export interface ChatSDKInstance {
  mount: (container?: string | HTMLElement) => void
  unmount: () => void
  open: () => void
  close: () => void
  isOpen: boolean
  sendMessage: (content: string) => Promise<void>
  on: (event: string, callback: Function) => void
  off: (event: string, callback: Function) => void
}

export type ChatMessageEvent = {
  type: 'message' | 'open' | 'close' | 'error'
  data?: any
}
