# 浮动按钮移除说明

## 修改概述

将浮动按钮（FloatingButton）从 SDK 核心功能中移除，改为由接入方自行实现。SDK 现在只提供聊天窗口功能，更加灵活和轻量。

## 修改原因

1. **灵活性**：接入方可以根据自己的UI风格自定义浮动按钮
2. **轻量化**：减小 SDK 体积，只保留核心聊天功能
3. **可定制性**：接入方完全控制浮动按钮的位置、样式和行为
4. **职责分离**：SDK 专注于聊天功能，浮动按钮作为UI交互由接入方实现

## 修改内容

### 1. SDK 核心修改

#### src/SDKApp.vue
- ✅ 移除 `<FloatingButton>` 组件引用
- ✅ 移除浮动按钮相关的 props 和事件处理

#### src/index.ts
- ✅ 从 `DEFAULT_CONFIG` 中移除 `floatingButton` 配置
- ✅ 保留 `unreadCount` 状态（供接入方使用）

#### src/types/index.ts
- ✅ 从 `ChatSDKConfig` 接口中移除 `floatingButton` 配置项

### 2. Demo 示例实现

#### src/demo/Demo.vue
添加了完整的浮动按钮示例实现：

```vue
<!-- 浮动按钮示例 - 实际项目中由接入方实现 -->
<Transition name="fade">
  <button
    v-if="shouldShowFloatingButton"
    class="demo-floating-button"
    @click="toggleChat"
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>
    <!-- 未读消息提示 -->
    <span v-if="unreadCount > 0" class="demo-badge">
      {{ unreadCount > 99 ? '99+' : unreadCount }}
    </span>
  </button>
</Transition>
```

**关键功能**：
- 监听 SDK 的 `isOpen` 状态来控制显示/隐藏
- 监听 `message` 事件来更新未读数
- 监听 `open` 事件来清除未读数
- 响应式设计，移动端和桌面端自适应

### 3. 构建结果对比

#### 修改前
```
✓ 28 modules transformed
dist/ai-bot.css      11.66 kB │ gzip: 2.52 kB
dist/chat-sdk.es.js  24.66 kB │ gzip: 7.38 kB
dist/chat-sdk.umd.js  19.63 kB │ gzip: 6.44 kB
```

#### 修改后
```
✓ 25 modules transformed (-3 modules)
dist/ai-bot.css      10.23 kB │ gzip: 2.26 kB (-1.43 kB, -12%)
dist/chat-sdk.es.js  23.06 kB │ gzip: 7.00 kB (-1.60 kB, -6%)
dist/chat-sdk.umd.js  18.28 kB │ gzip: 6.10 kB (-1.35 kB, -7%)
```

**优化效果**：
- ✅ CSS 文件减少 1.43 kB (12%)
- ✅ ES 模块减少 1.60 kB (6%)
- ✅ UMD 模块减少 1.35 kB (7%)
- ✅ 少了 3 个模块的转换

## API 变更

### ChatSDKConfig 配置

#### 移除的配置项
```typescript
// ❌ 已移除
floatingButton?: {
  icon?: string
  position?: 'bottom-right' | 'bottom-left'
  size?: number
}
```

#### 保留的状态
```typescript
// ✅ 保留 - 供接入方使用
class ChatSDK {
  public readonly unreadCount: Ref<number>
  public readonly isOpen: Ref<boolean>
  // ...
}
```

### 事件监听

接入方可以监听以下事件来实现自己的浮动按钮：

```typescript
// 监听聊天窗口打开/关闭
sdk.on('open', () => {
  console.log('聊天窗口已打开')
  // 清除未读数
  unreadCount.value = 0
})

sdk.on('close', () => {
  console.log('聊天窗口已关闭')
})

// 监听新消息，更新未读数
sdk.on('message', (message) => {
  if (message.role === 'assistant' && !sdk.isOpen.value) {
    unreadCount.value++
  }
})
```

## 接入方实现指南

### 基础浮动按钮实现

```vue
<template>
  <button v-if="!sdk.isOpen.value" class="my-floating-button" @click="sdk.toggle()">
    <svg viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>
    <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createChatSDK } from 'ai-bot'

const sdk = createChatSDK({
  title: '智能客服',
  welcomeMessage: 'Hi，我是智能客服'
})

const unreadCount = ref(0)

sdk.mount()

// 监听消息事件
sdk.on('message', (message) => {
  if (message.role === 'assistant' && !sdk.isOpen.value) {
    unreadCount.value++
  }
})

// 监听打开事件，清除未读数
sdk.on('open', () => {
  unreadCount.value = 0
})
</script>

<style scoped>
.my-floating-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff4757;
  color: white;
  border-radius: 9px;
  padding: 0 5px;
  min-width: 18px;
  height: 18px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}
</style>
```

### 高级自定义示例

#### 1. 自定义位置
```css
/* 左下角 */
.button-left {
  right: auto;
  left: 24px;
}

/* 居中底部 */
.button-center {
  left: 50%;
  transform: translateX(-50%);
}
```

#### 2. 自定义样式
```css
/* 方形按钮 */
.button-square {
  border-radius: 12px;
}

/* 线性按钮 */
.button-outline {
  background: white;
  border: 2px solid #667eea;
  color: #667eea;
}
```

#### 3. 添加动画
```vue
<Transition name="bounce">
  <button v-if="!sdk.isOpen.value" class="floating-button">
    <!-- ... -->
  </button>
</Transition>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
```

## 迁移指南

### 从旧版本升级

如果你已经在使用旧版本的 SDK 并配置了浮动按钮：

#### 1. 移除浮动按钮配置
```typescript
// ❌ 旧代码
const sdk = createChatSDK({
  title: '智能客服',
  floatingButton: {
    position: 'bottom-right',
    size: 56
  }
})

// ✅ 新代码
const sdk = createChatSDK({
  title: '智能客服'
  // 浮动按钮配置已移除
})
```

#### 2. 添加自己的浮动按钮
参考上面的"接入方实现指南"，在你的应用中添加浮动按钮。

#### 3. 处理未读消息
```typescript
const unreadCount = ref(0)

sdk.on('message', (message) => {
  if (message.role === 'assistant' && !sdk.isOpen.value) {
    unreadCount.value++
  }
})

sdk.on('open', () => {
  unreadCount.value = 0
})
```

## 常见问题

### Q: SDK 是否还会自动创建浮动按钮？
**A**: 不会。SDK 只创建聊天窗口，浮动按钮需要接入方自行实现。

### Q: 如何获取未读消息数量？
**A**: 使用 `sdk.unreadCount.value` 或监听 `message` 事件自行计数。

### Q: 可以使用原有的 FloatingButton 组件吗？
**A**: 可以，但需要手动引入和集成。参考 Demo.vue 的实现。

### Q: 浮动按钮的样式如何自定义？
**A**: 完全由接入方控制，可以使用任何 CSS 样式和动画。

### Q: 支持多个浮动按钮吗？
**A**: SDK 不限制，接入方可以创建任意数量的触发按钮。

## 总结

这次修改使 SDK 更加：
- ✅ **轻量**：体积减小约 7-12%
- ✅ **灵活**：接入方完全控制浮动按钮
- ✅ **专注**：SDK 专注于聊天功能
- ✅ **解耦**：UI 交互与核心功能分离

SDK 现在是一个纯粹的聊天窗口组件，浮动按钮作为 UI 触发器由接入方根据需求自行实现。
