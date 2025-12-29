import { createApp, ref, reactive } from 'vue'
import main from '../components/ChatSDKApp.vue'
import type { ChatSDKConfig, ChatMessage, QuickQuestion } from '../types'
import { generateId, deepMerge } from '../utils'
import { COMPONENT_STYLES } from './styles'

const DEFAULT_CONFIG: ChatSDKConfig = {
  title: '智能客服',
  placeholder: '你可以问我任何平台相关的问题',
  theme: 'light',
  position: 'right', // 默认在右侧
  welcomeMessage: 'Hi，我是智能客服',
  quickQuestions: [],
  enableHistory: true,
  maxHistoryDays: 7,
  avatar: {
    assistant: '',
    user: '',
  },
}

export class ChatSDK {
  private app: any = null
  private container: HTMLElement | null = null
  private shadowRoot: ShadowRoot | null = null
  private eventListeners: Map<string, Set<Function>> = new Map()

  public isOpen = ref(false)
  public config = reactive<ChatSDKConfig>({})
  public messages = ref<ChatMessage[]>([])
  public isLoading = ref(false)
  public unreadCount = ref(0)

  constructor(config: ChatSDKConfig = {}) {
    Object.assign(this.config, deepMerge(DEFAULT_CONFIG, config))
    this.loadHistory()
  }

  /**
   * 挂载SDK到页面
   */
  mount(selector?: string | HTMLElement) {
    if (this.app) {
      console.warn('[ChatSDK] SDK already mounted')
      return
    }

    // 创建容器
    const parentContainer =
      typeof selector === 'string' ? document.querySelector(selector) : selector || document.body

    if (!parentContainer) {
      console.error('[ChatSDK] Container not found')
      return
    }

    // 创建宿主元素（固定定位，占满整个视口）
    this.container = document.createElement('chat-sdk-root')
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999999;
    `
    parentContainer.appendChild(this.container)

    // 创建 Shadow DOM
    this.shadowRoot = this.container.attachShadow({ mode: 'open' })

    // 创建全局样式注入到 Shadow DOM
    this.injectGlobalStyles()

    // 在 Shadow DOM 内部创建挂载点
    const mountPoint = document.createElement('div')
    mountPoint.id = 'chat-sdk-mount-point'
    this.shadowRoot.appendChild(mountPoint)

    // 创建Vue应用并挂载到 Shadow DOM 内部
    this.app = createApp(main, {
      sdk: this,
    })

    this.app.mount(mountPoint)

    this.emit('mounted')
  }

  /**
   * 卸载SDK
   */
  unmount() {
    if (this.app) {
      this.app.unmount()
      this.app = null
    }

    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container)
    }

    this.container = null
    this.shadowRoot = null
    this.emit('unmounted')
  }

  /**
   * 注入全局样式到 Shadow DOM
   */
  private injectGlobalStyles() {
    if (!this.shadowRoot) return

    const style = document.createElement('style')
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      #chat-sdk-mount-point {
        width: 100%;
        height: 100%;
        position: relative;
      }

      /* 恢复点击事件 - 容器设置了 pointer-events: none */
      #chat-sdk-mount-point > * {
        pointer-events: auto;
      }

      /* SVG 全局样式 - 确保在 Shadow DOM 中正确显示 */
      svg {
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
        /* 防止无尺寸限制时显示过大 */
        width: 1em;
        height: 1em;
      }

      /* 确保内部路径不会溢出 */
      svg * {
        vector-effect: non-scaling-stroke;
      }

      /* 确保图片正确显示 */
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }

      /* 按钮重置 */
      button {
        font: inherit;
        color: inherit;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
      }

      /* 按钮内的 SVG 不继承字体相关样式 */
      button svg {
        font: normal;
        width: inherit;
        height: inherit;
      }

      /* 输入框重置 */
      input {
        font: inherit;
        color: inherit;
        outline: none;
        border: none;
        background: none;
      }

      /* 伪元素重置 */
      ::before,
      ::after {
        box-sizing: border-box;
      }
    `
    this.shadowRoot.appendChild(style)

    // 注入组件样式
    this.injectComponentStyles()
  }

  /**
   * 注入组件样式到 Shadow DOM
   */
  private injectComponentStyles() {
    if (!this.shadowRoot) return

    // 检测是否为开发环境
    const isDev = import.meta.env?.DEV ?? false

    // 开发环境：从主文档复制 Vite 注入的样式，并移除 scoped 选择器
    if (isDev) {
      const allStyles = Array.from(document.querySelectorAll('style'))

      allStyles.forEach(styleTag => {
        const viteDevId = styleTag.getAttribute('data-vite-dev-id')
        if (viteDevId && !this.shadowRoot!.querySelector(`[data-vite-dev-id="${viteDevId}"]`)) {
          // 移除 scoped 属性选择器和类名
          let content = styleTag.textContent || ''
          content = content.replace(/\s*\[data-v-[a-f0-9]+\]/g, '')
          content = content.replace(/\.data-v-[a-f0-9]+/g, '')

          const newStyle = document.createElement('style')
          newStyle.setAttribute('data-vite-dev-id', viteDevId)
          newStyle.textContent = content
          this.shadowRoot!.appendChild(newStyle)
        }
      })

      return
    }

    // 生产环境：使用内联的CSS样式
    if (COMPONENT_STYLES && !COMPONENT_STYLES.includes('请在构建时自动注入')) {
      const style = document.createElement('style')
      style.textContent = COMPONENT_STYLES
      this.shadowRoot.appendChild(style)
    }
  }

  /**
   * 打开聊天窗口
   */
  open() {
    this.isOpen.value = true
    this.unreadCount.value = 0
    this.emit('open')
  }

  /**
   * 关闭聊天窗口
   */
  close() {
    this.isOpen.value = false
    this.emit('close')
  }

  /**
   * 切换聊天窗口状态
   */
  toggle() {
    if (this.isOpen.value) {
      this.close()
    } else {
      this.open()
    }
  }

  /**
   * 发送消息
   */
  async sendMessage(content: string): Promise<void> {
    if (!content.trim()) {
      return
    }

    // 添加用户消息
    this.addMessage({
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    })

    // 显示加载状态
    this.isLoading.value = true

    try {
      // 触发发送事件，由外部处理实际的API调用
      await this.emitAsync('sendMessage', content)
    } catch (error) {
      console.error('[ChatSDK] Send message error:', error)
      this.addMessage({
        id: generateId(),
        role: 'system',
        content: '发送消息失败，请稍后重试',
        timestamp: Date.now(),
      })
    } finally {
      this.isLoading.value = false
    }
  }

  /**
   * 添加消息到聊天记录
   */
  addMessage(message: ChatMessage) {
    this.messages.value.push(message)
    this.saveHistory()

    // 如果窗口关闭，增加未读数
    if (!this.isOpen.value && message.role === 'assistant') {
      this.unreadCount.value++
    }

    this.emit('message', message)
  }

  /**
   * 追加消息内容（用于流式输出）
   */
  appendMessageContent(messageId: string, content: string) {
    const message = this.messages.value.find(m => m.id === messageId)
    if (message) {
      message.content += content
      message.timestamp = Date.now()
      this.emit('messageUpdate', message)
    }
  }

  /**
   * 结束消息流式输出
   */
  finishMessageStream(messageId: string) {
    const message = this.messages.value.find(m => m.id === messageId)
    if (message) {
      message.isStreaming = false
      message.timestamp = Date.now()
      this.saveHistory()
      this.emit('messageComplete', message)
    }
  }

  /**
   * 清空消息
   */
  clearMessages() {
    this.messages.value = []
    this.saveHistory()
    this.emit('clear')
  }

  /**
   * 处理发送消息（由组件内部调用）
   */
  handleSendMessage(content: string) {
    return this.sendMessage(content)
  }

  /**
   * 处理点击推荐问题（由组件内部调用）
   */
  handleAskQuestion(question: QuickQuestion) {
    this.sendMessage(question.text)
  }

  /**
   * 处理点赞点踩反馈（由组件内部调用）
   */
  handleFeedback(payload: { messageId: string; type: 'like' | 'dislike' | null }) {
    const { messageId, type } = payload
    const message = this.messages.value.find(m => m.id === messageId)
    if (message && message.role === 'assistant') {
      message.feedback = type || undefined
      this.saveHistory()
      this.emit('feedback', message)
    }
  }

  /**
   * 处理流式消息完成（由组件内部调用）
   */
  handleStreamingComplete(messageId: string, content: string) {
    // 检查消息是否已存在
    const existingMessage = this.messages.value.find(m => m.id === messageId)

    if (existingMessage) {
      // 更新现有消息
      existingMessage.content = content
      existingMessage.isStreaming = false
      existingMessage.timestamp = Date.now()
    } else {
      // 添加新消息
      this.addMessage({
        id: messageId,
        role: 'assistant',
        content,
        isStreaming: false,
        timestamp: Date.now(),
      })
    }

    this.saveHistory()
  }

  /**
   * 加载历史记录
   */
  private loadHistory() {
    if (!this.config.enableHistory) {
      return
    }

    try {
      const history = localStorage.getItem('chat-sdk-history')
      if (history) {
        const data = JSON.parse(history)
        const now = Date.now()
        const maxAge = this.config.maxHistoryDays! * 24 * 60 * 60 * 1000

        // 过滤过期的消息
        this.messages.value = data.filter((msg: ChatMessage) => now - msg.timestamp < maxAge)
      }
    } catch (error) {
      console.error('[ChatSDK] Load history error:', error)
    }
  }

  /**
   * 保存历史记录
   */
  private saveHistory() {
    if (!this.config.enableHistory) {
      return
    }

    try {
      localStorage.setItem('chat-sdk-history', JSON.stringify(this.messages.value))
    } catch (error) {
      console.error('[ChatSDK] Save history error:', error)
    }
  }

  /**
   * 触发事件
   */
  private emit(event: string, data?: any) {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      listeners.forEach(callback => callback(data))
    }
  }

  /**
   * 异步触发事件并等待
   */
  private async emitAsync(event: string, data?: any): Promise<any> {
    const listeners = this.eventListeners.get(event)
    if (listeners && listeners.size > 0) {
      const promises = Array.from(listeners).map(callback => Promise.resolve(callback(data)))
      return Promise.all(promises)
    }
    return Promise.resolve()
  }

  /**
   * 监听事件
   */
  on(event: string, callback: Function) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set())
    }
    this.eventListeners.get(event)!.add(callback)
  }

  /**
   * 取消监听事件
   */
  off(event: string, callback: Function) {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      listeners.delete(callback)
    }
  }

  /**
   * 更新配置
   */
  updateConfig(config: Partial<ChatSDKConfig>) {
    Object.assign(this.config, deepMerge(this.config, config))
  }
}
