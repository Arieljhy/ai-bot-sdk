# @ariel_jhy/ai-bot-adk

<div align="center">

**智能客服 SDK**

基于 Vue 3 的移动端 H5 智能客服组件库

[![npm version](https://badge.fury.io/js/%40ariel_jhy%2Fai-bot-adk.svg)](https://www.npmjs.com/package/@ariel_jhy/ai-bot-adk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883.svg)](https://vuejs.org/)

</div>

## ✨ 特性

- 📱 **移动端优先** - 专为移动端 H5 设计
- 💬 **智能推荐** - 支持推荐问题，一键"换一换"
- 🔄 **SSE 流式输出** - 内置 SSE 支持，实现流式输出
- 💾 **历史记录** - 自动保存聊天历史
- ⚙️ **灵活配置** - 丰富的配置选项
- 🎯 **TypeScript** - 完整的类型定义

## 📦 安装

```bash
npm install @ariel_jhy/ai-bot-adk
```

## 🚀 快速开始

```typescript
import { createChatSDK } from '@ariel_jhy/ai-bot-adk'

const sdk = createChatSDK({
  title: '智能客服',
  welcomeMessage: 'Hi，有什么可以帮您的吗？',

  // SSE 流式接口
  sseUrl: 'https://your-api.com/sse',
  sseMethod: 'POST',

  // 推荐问题
  quickQuestions: [
    { id: '1', text: '如何使用这个平台？' },
    { id: '2', text: '账号如何注册？' }
  ]
})

sdk.mount()
```

### CDN 引入

```html
<script src="https://unpkg.com/@ariel_jhy/ai-bot-adk/dist/chat-sdk.umd.js"></script>
<script>
  const SDKClass = ChatSDK.default || ChatSDK
  const sdk = new SDKClass({
    title: '智能客服',
    sseUrl: 'https://your-api.com/sse'
  })
  sdk.mount()
</script>
```

## ⚙️ 配置选项

```typescript
interface ChatSDKConfig {
  // API 配置
  sseUrl?: string              // SSE 接口地址
  sseMethod?: 'GET' | 'POST'   // 请求方法

  // UI 配置
  title?: string               // 标题
  welcomeMessage?: string      // 欢迎消息
  placeholder?: string         // 输入框占位符
  theme?: 'light' | 'dark'     // 主题模式
  position?: 'left' | 'right'  // 位置

  // 头像
  avatar?: {
    user?: string              // 用户头像
    assistant?: string         // 助手头像
  }

  // 推荐问题
  quickQuestions?: QuickQuestion[]

  // 历史记录
  enableHistory?: boolean      // 是否启用
  maxHistoryDays?: number      // 保存天数

  // 其他
  container?: string | HTMLElement  // 容器
  storageKey?: string          // 存储 key
}
```

## 📖 API

### 方法

| 方法 | 说明 |
|------|------|
| `mount()` | 挂载到页面 |
| `unmount()` | 卸载 |
| `open()` | 打开聊天窗口 |
| `close()` | 关闭聊天窗口 |
| `sendMessage(content)` | 发送消息 |
| `addMessage(message)` | 添加消息 |
| `clearMessages()` | 清空消息 |
| `on(event, callback)` | 监听事件 |
| `off(event, callback)` | 取消监听 |

### 事件

| 事件 | 说明 |
|------|------|
| `sendMessage` | 发送消息时 |
| `open` | 打开窗口时 |
| `close` | 关闭窗口时 |
| `message` | 添加消息时 |
| `streamingComplete` | 流式完成时 |

```typescript
sdk.on('sendMessage', (content) => {
  console.log('用户发送:', content)
})
```

## 🎨 自定义样式

通过 CSS 变量定制：

```css
:root {
  --cs-primary-color: #3B82F6;
  --cs-bg-color: #F0F5FF;
  --cs-text-primary: #1F2937;
  /* ... 更多变量 */
}
```

## 🔌 SSE 接口规范

### 请求

```bash
POST /sse
Content-Type: application/json

{
  "message": "用户的问题",
  "history": []
}
```

### 响应

```
event: connected
data: {"status": "connected"}

data: 收到
data: 你的
data: 消息

data: [DONE]
```

详见 [node-server/README.md](./node-server/README.md)

## 📝 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md)

## 📄 许可证

[MIT](./LICENSE)

---

**如有问题或建议，欢迎提交 Issue！**
