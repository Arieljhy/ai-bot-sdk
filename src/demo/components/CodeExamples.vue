<template>
  <div class="code-examples">
    <!-- 基础用法 -->
    <h3>1️⃣ 基础用法</h3>
    <p>最简单的接入方式：</p>
    <CodeBlock :code="basicUsageCode" />

    <!-- 完整配置 -->
    <h3>2️⃣ 完整配置示例</h3>
    <p>所有可用的配置参数：</p>
    <CodeBlock :code="fullConfigCode" />

    <!-- 事件监听 -->
    <h3>3️⃣ 事件监听</h3>
    <p>监听 SDK 的各种事件：</p>
    <CodeBlock :code="eventListenersCode" />

    <!-- 方法调用 -->
    <h3>4️⃣ 方法调用</h3>
    <p>SDK 提供的常用方法：</p>
    <CodeBlock :code="methodsCode" />

    <!-- 流式输出示例 -->
    <h3>5️⃣ 流式输出示例</h3>
    <p>模拟 ChatGPT 的流式输出效果：</p>
    <CodeBlock :code="streamingCode" />

    <!-- 浮动按钮示例 -->
    <h3>6️⃣ 自定义浮动按钮</h3>
    <p>SDK 不提供浮动按钮，需要接入方自己实现：</p>
    <CodeBlock :code="customButtonCode" />

    <!-- TypeScript 支持 -->
    <h3>7️⃣ TypeScript 支持</h3>
    <p>完整的类型定义：</p>
    <CodeBlock :code="typescriptCode" />

    <!-- 实际应用示例 -->
    <h3>8️⃣ 完整的 AI 集成示例</h3>
    <p>接入真实的 AI API：</p>
    <CodeBlock :code="aiIntegrationCode" />
  </div>
</template>

<script setup lang="ts">
import CodeBlock from './CodeBlock.vue'

const basicUsageCode = `import { createChatSDK } from 'ai-bot'

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
sdk.close()`

const fullConfigCode = `import { createChatSDK } from 'ai-bot'

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

sdk.mount()`

const eventListenersCode = `// 监听消息发送事件
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
sdk.off('sendMessage', handler)`

const methodsCode = `// 窗口控制
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
sdk.unmount()`

const streamingCode = `import { createChatSDK } from 'ai-bot'

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
})`

const customButtonCode = `<template>
  <!-- 浮动按钮 -->
  <button
    v-if="isShowBtn"
    class="floating-button"
    @click="toggleChat"
  >
    💬
  </button>
</template>

<script setup>
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
<\/script>

<style>
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
<\/style>`

const typescriptCode = `import { createChatSDK } from 'ai-bot'
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
}`

const aiIntegrationCode = `import { createChatSDK } from 'ai-bot'

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
        'Authorization': \`Bearer \${API_KEY}\`
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
})`
</script>

<style scoped lang="less">
@import '../../styles/variables.less';

.code-examples {
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
</style>
