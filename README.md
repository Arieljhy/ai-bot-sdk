# 智能客服 SDK

基于 Vue 3 的移动端H5智能客服组件库，提供开箱即用的客服聊天界面。

## ✨ 特性

- 📱 **移动端优先** - 专为移动端H5设计，完美适配各种屏幕尺寸
- 🎨 **精美UI** - 遵循设计稿，提供优雅的聊天界面
- 💬 **智能推荐** - 支持推荐问题功能，一键"换一换"
- 🔄 **流式输出** - 支持AI回复的流式输出，提升用户体验
- 💾 **历史记录** - 自动保存聊天历史，支持本地存储
- ⚙️ **灵活配置** - 丰富的配置选项，轻松定制样式和行为
- 🎯 **TypeScript** - 完整的类型定义，开发体验更佳
- 📦 **多种格式** - 支持 ES Module、UMD、IIFE 格式

## 📦 安装

```bash
npm install ai-bot
# 或
pnpm add ai-bot
# 或
yarn add ai-bot
```

## 🚀 快速开始

### 基础使用

```typescript
import { createChatSDK } from 'ai-bot'

// 创建SDK实例
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

// 监听消息发送事件
sdk.on('sendMessage', async (content) => {
  // 调用您的AI API
  const response = await fetchAIResponse(content)

  // 添加AI回复
  sdk.addMessage({
    id: Date.now().toString(),
    role: 'assistant',
    content: response,
    timestamp: Date.now()
  })
})
```

### CDN 引入

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/ai-bot/dist/chat-sdk.iife.js"></script>
<script>
  const sdk = new ChatSDK({
    title: '智能客服'
  })
  sdk.mount()
</script>
```

## ⚙️ 配置选项

```typescript
interface ChatSDKConfig {
  // API 配置
  apiBaseUrl?: string
  apiEndpoint?: string

  // UI 配置
  title?: string              // 标题，默认 '智能客服'
  placeholder?: string        // 输入框占位符
  theme?: 'light' | 'dark'    // 主题

  // 浮动按钮配置
  floatingButton?: {
    icon?: string
    position?: 'bottom-right' | 'bottom-left'
    size?: number
  }

  // 快捷问题配置
  quickQuestions?: QuickQuestion[]

  // 历史记录配置
  enableHistory?: boolean
  maxHistoryDays?: number

  // 其他配置
  welcomeMessage?: string     // 欢迎消息
  avatar?: {
    user?: string
    assistant?: string
  }
}
```

## 📖 API 文档

### 实例方法

#### `mount(container?)`
挂载SDK到页面

```typescript
sdk.mount() // 挂载到 body
sdk.mount('#app') // 挂载到指定元素
```

#### `unmount()`
卸载SDK

```typescript
sdk.unmount()
```

#### `open()`
打开聊天窗口

```typescript
sdk.open()
```

#### `close()`
关闭聊天窗口

```typescript
sdk.close()
```

#### `sendMessage(content)`
发送消息

```typescript
await sdk.sendMessage('你好')
```

#### `addMessage(message)`
添加消息到聊天记录

```typescript
sdk.addMessage({
  id: '1',
  role: 'assistant',
  content: '您好！',
  timestamp: Date.now()
})
```

#### `on(event, callback)`
监听事件

支持的事件：
- `sendMessage` - 发送消息时触发
- `open` - 打开聊天窗口时触发
- `close` - 关闭聊天窗口时触发
- `message` - 添加消息时触发
- `messageUpdate` - 消息更新时触发
- `messageComplete` - 消息完成时触发

```typescript
sdk.on('sendMessage', (content) => {
  console.log('用户发送:', content)
})
```

#### `off(event, callback)`
取消监听事件

```typescript
sdk.off('sendMessage', callback)
```

## 🎨 自定义样式

SDK 使用 CSS 变量进行样式定制，您可以覆盖这些变量：

```css
:root {
  --cs-primary-color: #3B82F6;
  --cs-bg-color: #F0F5FF;
  --cs-header-height: 60px;
  --cs-input-height: 70px;
}
```

## 🛠️ 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建库

```bash
npm run build:lib
```

构建产物将在 `dist` 目录中生成。

## 📁 项目结构

```
ai-bot/
├── src/
│   ├── components/           # SDK 组件
│   │   ├── ChatWindow.vue    # 聊天窗口
│   │   ├── ChatHeader.vue    # 聊天头部
│   │   ├── WelcomeSection.vue # 欢迎区域
│   │   ├── MessageItem.vue   # 消息项
│   │   ├── MessageInput.vue  # 输入框
│   │   └── FloatingButton.vue # 浮动按钮
│   ├── types/                # 类型定义
│   ├── utils/                # 工具函数
│   ├── demo/                 # 演示页面
│   │   ├── Demo.vue
│   │   └── index.ts
│   ├── SDKApp.vue            # SDK 根组件
│   ├── index.ts              # SDK 入口
│   └── index.d.ts            # 类型声明
├── dist/                     # 构建产物
├── public/                   # 静态资源
├── index.html                # 入口 HTML
├── vite.config.ts            # Vite 配置
├── tsconfig.json             # TypeScript 配置
└── package.json              # 项目配置
```

## 🌟 功能演示

### 推荐问题

支持配置快捷问题，用户可以快速点击提问，还可以"换一换"切换不同的推荐问题。

### 流式输出

支持 AI 回复的流式输出，提供更好的用户体验。

```typescript
// 创建流式消息
const messageId = Date.now().toString()
sdk.addMessage({
  id: messageId,
  role: 'assistant',
  content: '',
  isStreaming: true,
  timestamp: Date.now()
})

// 追加内容
sdk.appendMessageContent(messageId, '部分内容')

// 完成流式输出
sdk.finishMessageStream(messageId)
```

### 历史记录

自动保存聊天历史到本地存储，下次打开时自动加载。

## 🔗 连接真实 AI 服务

### 示例：连接 OpenAI API

```typescript
sdk.on('sendMessage', async (content) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content }]
    })
  })

  const data = await response.json()
  const reply = data.choices[0].message.content

  sdk.addMessage({
    id: Date.now().toString(),
    role: 'assistant',
    content: reply,
    timestamp: Date.now()
  })
})
```

## 📝 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
