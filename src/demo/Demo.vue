<template>
  <div class="demo-container">
    <div class="header">
      <h1>🤖 智能客服SDK</h1>
      <p>基于Vue 3的移动端H5智能客服组件</p>
    </div>

    <div class="demo-section">
      <h2>📱 功能特性</h2>
      <ul class="feature-list">
        <li>
          <div class="feature-icon">1</div>
          <div class="feature-text">
            <strong>移动端优先</strong>
            <span>专为移动端H5设计，完美适配各种屏幕尺寸</span>
          </div>
        </li>
        <li>
          <div class="feature-icon">2</div>
          <div class="feature-text">
            <strong>推荐问题</strong>
            <span>智能推荐常见问题，支持"换一换"功能</span>
          </div>
        </li>
        <li>
          <div class="feature-icon">3</div>
          <div class="feature-text">
            <strong>流式输出</strong>
            <span>支持AI回复的流式输出，提升用户体验</span>
          </div>
        </li>
        <li>
          <div class="feature-icon">4</div>
          <div class="feature-text">
            <strong>历史记录</strong>
            <span>自动保存聊天历史，支持本地存储</span>
          </div>
        </li>
        <li>
          <div class="feature-icon">5</div>
          <div class="feature-text">
            <strong>灵活配置</strong>
            <span>丰富的配置选项，轻松定制样式和行为</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="demo-section">
      <h2>🚀 快速开始</h2>
      <p>点击下方按钮测试SDK功能：</p>
      <div class="button-group">
        <button class="btn btn-primary" @click="openChat">打开聊天窗口</button>
        <button class="btn btn-secondary" @click="sendTest">发送测试消息</button>
      </div>
    </div>

    <div class="demo-section">
      <h2>💻 使用示例</h2>

      <!-- 基础用法 -->
      <h3>1️⃣ 基础用法</h3>
      <p>最简单的接入方式：</p>
      <div class="code-block">
        <pre><code>import { createChatSDK } from 'ai-bot'

// 创建 SDK 实例
const sdk = createChatSDK({
  title: '智能客服',
  welcomeMessage: 'Hi，我是智能客服',
  quickQuestions: [
    { id: '1', text: '如何使用这个平台？' },
    { id: '2', text: '账号如何注册？' }
  ]
})

// 挂载到页面
sdk.mount()

// 打开聊天窗口
sdk.open()

// 关闭聊天窗口
sdk.close()</code></pre>
      </div>

      <!-- 完整配置 -->
      <h3>2️⃣ 完整配置示例</h3>
      <p>所有可用的配置参数：</p>
      <div class="code-block">
        <pre><code>import { createChatSDK } from 'ai-bot'

const sdk = createChatSDK({
  // 基础配置
  title: '智能客服',
  placeholder: '你可以问我任何问题',
  welcomeMessage: 'Hi，我是智能客服，很高兴为您服务！',

  // 布局位置：'left' | 'right'（默认）
  position: 'right',

  // 主题：'light' | 'dark'（默认 light）
  theme: 'light',

  // 快捷问题配置
  quickQuestions: [
    { id: '1', text: '如何使用这个平台？' },
    { id: '2', text: '账号如何注册？' },
    { id: '3', text: '忘记密码怎么办？' },
    { id: '4', text: '如何联系人工客服？' }
  ],

  // 历史记录配置
  enableHistory: true,        // 启用历史记录
  maxHistoryDays: 7,          // 保留最近7天的记录

  // 头像配置
  avatar: {
    assistant: 'https://example.com/ai-avatar.png',
    user: 'https://example.com/user-avatar.png'
  },

  // API 配置（预留，可用于内置 API 调用）
  apiBaseUrl: 'https://api.example.com',
  apiEndpoint: '/chat'
})

sdk.mount()</code></pre>
      </div>

      <!-- 事件监听 -->
      <h3>3️⃣ 事件监听</h3>
      <p>监听 SDK 的各种事件：</p>
      <div class="code-block">
        <pre><code>// 监听消息发送事件
sdk.on('sendMessage', async (content) => {
  console.log('用户发送消息:', content)

  // 调用您的 AI API
  const response = await fetchAIResponse(content)

  // 添加 AI 回复
  sdk.addMessage({
    id: Date.now().toString(),
    role: 'assistant',
    content: response,
    timestamp: Date.now()
  })
})

// 监听窗口打开事件
sdk.on('open', () => {
  console.log('聊天窗口已打开')
})

// 监听窗口关闭事件
sdk.on('close', () => {
  console.log('聊天窗口已关闭')
})

// 监听消息添加事件
sdk.on('message', (message) => {
  console.log('新消息:', message)
})

// 监听消息更新事件（流式输出）
sdk.on('messageUpdate', (message) => {
  console.log('消息更新:', message)
})

// 监听消息完成事件
sdk.on('messageComplete', (message) => {
  console.log('消息完成:', message)
})

// 监听点赞点踩事件
sdk.on('feedback', (message) => {
  console.log('用户反馈:', message.feedback)
})

// 监听清除消息事件
sdk.on('clear', () => {
  console.log('消息已清空')
})

// 取消监听
const handler = (content) => console.log(content)
sdk.on('sendMessage', handler)
sdk.off('sendMessage', handler)</code></pre>
      </div>

      <!-- 方法调用 -->
      <h3>4️⃣ 方法调用</h3>
      <p>SDK 提供的常用方法：</p>
      <div class="code-block">
        <pre><code>// 窗口控制
sdk.open()              // 打开聊天窗口
sdk.close()             // 关闭聊天窗口
sdk.toggle()            // 切换聊天窗口状态
console.log(sdk.isOpen.value)  // 获取窗口开关状态

// 消息操作
sdk.sendMessage('你好')  // 发送消息（会触发 sendMessage 事件）

sdk.addMessage({        // 添加消息到聊天记录
  id: 'msg-001',
  role: 'assistant',
  content: '这是回复内容',
  timestamp: Date.now()
})

sdk.clearMessages()     // 清空所有消息

// 流式输出支持
sdk.appendMessageContent('msg-001', '追加内容')
sdk.finishMessageStream('msg-001')

// 配置更新
sdk.updateConfig({
  title: '新标题',
  position: 'left'
})

// 卸载 SDK
sdk.unmount()</code></pre>
      </div>

      <!-- 流式输出示例 -->
      <h3>5️⃣ 流式输出示例</h3>
      <p>模拟 ChatGPT 的流式输出效果：</p>
      <div class="code-block">
        <pre><code>import { createChatSDK } from 'ai-bot'

const sdk = createChatSDK()

sdk.on('sendMessage', async (content) => {
  // 创建一个 AI 消息
  const messageId = Date.now().toString()
  sdk.addMessage({
    id: messageId,
    role: 'assistant',
    content: '',
    isStreaming: true,
    timestamp: Date.now()
  })

  // 模拟流式输出
  const response = await fetchAIResponseStream(content)

  // 逐字追加内容
  for await (const chunk of response) {
    sdk.appendMessageContent(messageId, chunk)
  }

  // 完成流式输出
  sdk.finishMessageStream(messageId)
})</code></pre>
      </div>

      <!-- 浮动按钮示例 -->
      <h3>6️⃣ 自定义浮动按钮</h3>
      <p>SDK 不提供浮动按钮，需要接入方自己实现：</p>
      <div class="code-block">
        <pre><code>&lt;template&gt;
  &lt;!-- 浮动按钮 --&gt;
  &lt;button
    v-if="isShowBtn"
    class="floating-button"
    @click="toggleChat"
  &gt;
    💬
  &lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import { createChatSDK } from 'ai-bot'

const sdk = createChatSDK()
const isShowBtn = ref(true)

sdk.mount()

// 监听窗口状态，控制按钮显隐
sdk.on('open', () => { isShowBtn.value = false })
sdk.on('close', () => { isShowBtn.value = true })

const toggleChat = () => {
  sdk.isOpen.value ? sdk.close() : sdk.open()
}
&lt;/script&gt;

&lt;style&gt;
.floating-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  z-index: 1000000; /* 必须高于 SDK 的 999999 */
}
&lt;/style&gt;</code></pre>
      </div>

      <!-- TypeScript 支持 -->
      <h3>7️⃣ TypeScript 支持</h3>
      <p>完整的类型定义：</p>
      <div class="code-block">
        <pre><code>import { createChatSDK } from 'ai-bot'
import type { ChatSDK, ChatSDKConfig, ChatMessage, QuickQuestion } from 'ai-bot'

// 类型安全的配置
const config: ChatSDKConfig = {
  title: '智能客服',
  position: 'left',        // ✅ 类型安全
  // position: 'center',    // ❌ 编译错误
}

const sdk: ChatSDK = createChatSDK(config)

// 类型检查
const message: ChatMessage = {
  id: 'msg-001',
  role: 'assistant',       // ✅ 只能是 'user' | 'assistant' | 'system'
  content: '你好',
  timestamp: Date.now(),
  feedback: 'like'         // 可选的点赞点踩
}

const question: QuickQuestion = {
  id: '1',
  text: '如何使用？'
}</code></pre>
      </div>

      <!-- 实际应用示例 -->
      <h3>8️⃣ 完整的 AI 集成示例</h3>
      <p>接入真实的 AI API：</p>
      <div class="code-block">
        <pre><code>import { createChatSDK } from 'ai-bot'

const sdk = createChatSDK({
  title: 'AI 助手',
  enableHistory: true,
  maxHistoryDays: 30
})

sdk.mount()

// 监听消息发送
sdk.on('sendMessage', async (content) => {
  try {
    // 显示加载状态（SDK 内部处理）
    sdk.isLoading.value = true

    // 调用 AI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'user', content }
        ]
      })
    })

    const data = await response.json()

    // 添加 AI 回复
    sdk.addMessage({
      id: Date.now().toString(),
      role: 'assistant',
      content: data.choices[0].message.content,
      timestamp: Date.now()
    })
  } catch (error) {
    // 添加错误提示
    sdk.addMessage({
      id: Date.now().toString(),
      role: 'system',
      content: '抱歉，发生了错误，请稍后重试。',
      timestamp: Date.now()
    })
  } finally {
    sdk.isLoading.value = false
  }
})</code></pre>
      </div>
    </div>

    <!-- 浮动按钮示例 - 实际项目中由接入方实现 -->

      <button
        v-if="isShowBtn"
        class="demo-floating-button"
        @click="toggleChat"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <!-- 未读消息提示 -->
        <span v-if="unreadCount > 0" class="demo-badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
      </button>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { createChatSDK } from '../index'
import type { ChatSDK } from '../index'

let sdk: ChatSDK | null = null
const unreadCount = ref(0)
const isShowBtn = ref(true)

// 监听聊天窗口开关状态，控制浮动按钮显隐
let stopWatch: (() => void) | null = null

const watchChatOpenState = () => {
  if (stopWatch) {
    stopWatch()
  }

  if (sdk) {
    // 先设置初始值
    isShowBtn.value = !sdk.isOpen.value

    // 监听 isOpen 变化
    stopWatch = watch(
      () => sdk!.isOpen.value,
      (isOpen) => {
        isShowBtn.value = !isOpen
      },
      { immediate: true }
    )
  } else {
    // sdk 未初始化时显示浮动按钮
    isShowBtn.value = true
  }
}

onMounted(() => {
  // 创建SDK实例（不包含浮动按钮配置）
  sdk = createChatSDK({
    title: '智能客服',
    placeholder: '你可以问我任何平台相关的问题',
    welcomeMessage: 'Hi，我是智能客服',
    quickQuestions: [
      { id: '1', text: '如何使用这个平台？' },
      { id: '2', text: '账号如何注册？' },
      { id: '3', text: '忘记密码怎么办？' },
      { id: '4', text: '如何联系人工客服？' },
      { id: '5', text: '平台支持哪些功能？' },
      { id: '6', text: '如何查看使用记录？' },
    ],
    enableHistory: true,
    maxHistoryDays: 7,
    position: 'right'
  });

  // 挂载SDK
  sdk.mount()

  // 挂载后启动监听聊天窗口开关状态
  watchChatOpenState()

  // 监听消息发送事件
  sdk.on('sendMessage', async (content: string) => {
    console.log('用户发送消息:', content)

    // 模拟AI回复
    setTimeout(() => {
      const messageId = Date.now().toString()
      sdk?.addMessage({
        id: messageId,
        role: 'assistant',
        content: `您好！我是智能客服，很高兴为您服务。\n\n您的问题是：${content}\n\n这是一个示例回复。在实际使用中，您可以将此事件连接到您的AI服务API。`,
        timestamp: Date.now(),
      })
    }, 1000)
  })

  // 监听窗口打开事件，清除未读数
  sdk.on('open', () => {
    console.log('聊天窗口已打开')
    unreadCount.value = 0
  })

  sdk.on('close', () => {
    console.log('聊天窗口已关闭')
  })

  // 监听消息事件，更新未读数
  sdk.on('message', (message: any) => {
    if (message.role === 'assistant' && !sdk?.isOpen.value) {
      unreadCount.value++
    }
  })

  // 暴露到全局，方便调试
  ;(window as any).chatSDK = sdk
})

onUnmounted(() => {
  // 清理监听
  if (stopWatch) {
    stopWatch()
  }

  if (sdk) {
    sdk.unmount()
  }
})

const openChat = () => {
  sdk?.open()
}

const sendTest = () => {
  sdk?.open()
  setTimeout(() => {
    sdk?.sendMessage('这是一条测试消息')
  }, 500)
}

const toggleChat = () => {
  if (sdk) {
    if (sdk.isOpen.value) {
      sdk.close()
    } else {
      sdk.open()
    }
  }
}
</script>

<style lang="less">
// 全局样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  min-height: 100vh;
}
</style>

<style scoped lang="less">
@import '../styles/variables.less';

.demo-container {
  min-height: 100vh;
  background: @gradient-primary;
  padding: @spacing-xl;
}

.header {
  text-align: center;
  color: @text-white;
  margin-bottom: 40px;

  h1 {
    font-size: @font-size-4xl;
    font-weight: @font-weight-bold;
    margin-bottom: 10px;
  }

  p {
    font-size: @font-size-lg;
    opacity: 0.9;
  }
}

.demo-section {
  background: @bg-white;
  border-radius: @radius-xl;
  padding: @spacing-2xl;
  margin-bottom: @spacing-xl;
  box-shadow: @shadow-md;

  h2 {
    font-size: @font-size-2xl;
    color: @text-primary;
    margin-bottom: @spacing-lg;
  }

  h3 {
    font-size: @font-size-xl;
    color: @text-primary;
    margin-top: @spacing-2xl;
    margin-bottom: @spacing-md;
    padding-bottom: @spacing-sm;
    border-bottom: 2px solid #f0f0f0;
  }

  p {
    font-size: @font-size-base;
    color: @text-secondary;
    line-height: 1.6;
    margin-bottom: @spacing-lg;
  }
}

.code-block {
  background: #f5f5f5;
  border-radius: @radius-md;
  padding: @spacing-lg;
  overflow-x: auto;

  pre {
    margin: 0;
    padding: 0;
    font-family: @font-family-mono;
    font-size: @font-size-sm;
    color: #333;
    line-height: 1.6;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  code {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: none;
    padding: 0;
  }
}

.button-group {
  display: flex;
  gap: @spacing-md;
  flex-wrap: wrap;
}

.btn {
  padding: @spacing-md @spacing-2xl;
  border: none;
  border-radius: @radius-md;
  font-size: @font-size-base;
  font-weight: @font-weight-medium;
  cursor: pointer;
  transition: all @transition-duration-base @transition-timing-function;
}

.btn-primary {
  background: @gradient-primary;
  color: @text-white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: @shadow-primary-lg;
  }
}

.btn-secondary {
  background: #f5f5f5;
  color: #333;

  &:hover {
    background: #e5e5e5;
  }
}

.feature-list {
  list-style: none;
  padding: 0;

  li {
    padding: @spacing-md 0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    gap: @spacing-md;

    &:last-child {
      border-bottom: none;
    }
  }
}

.feature-icon {
  width: @spacing-3xl;
  height: @spacing-3xl;
  background: @gradient-primary;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: @text-white;
  font-weight: @font-weight-bold;
  flex-shrink: 0;
}

.feature-text {
  flex: 1;

  strong {
    display: block;
    color: @text-primary;
    margin-bottom: @spacing-xs;
  }

  span {
    font-size: @font-size-sm;
    color: @text-secondary;
  }
}

// 移动端适配
@media (max-width: @screen-sm) {
  .demo-container {
    padding: @spacing-md;
  }

  .header {
    h1 {
      font-size: @spacing-2xl;
    }
  }

  .demo-section {
    padding: @spacing-lg;
  }

  .button-group {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .code-block {
    pre {
      font-size: @font-size-xs;
    }
  }
}

// Demo 浮动按钮样式 - 示例实现
.demo-floating-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: @gradient-primary;
  color: @text-white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: @shadow-primary-lg;
  transition: all @transition-duration-slow @transition-timing-function;
  /* z-index 必须高于 SDK 容器的 999999 */
  z-index: 1000000;

  svg {
    width: @spacing-2xl;
    height: @spacing-2xl;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }
}

.demo-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #ff4757;
  color: @text-white;
  font-size: @font-size-xs;
  font-weight: @font-weight-semibold;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity @transition-duration-slow ease,
    transform @transition-duration-slow ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

// 移动端适配
@media (max-width: @screen-md) {
  .demo-floating-button {
    bottom: 16px;
    right: 16px;
    width: 52px;
    height: 52px;

    svg {
      width: @spacing-2xl;
      height: @spacing-2xl;
    }
  }
}
</style>
