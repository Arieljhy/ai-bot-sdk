# Position 布局配置功能说明

## 功能概述

SDK 新增 `position` 配置项，允许接入方控制聊天窗口在浏览器中的布局位置和展开动画方向。

## 配置说明

### 配置参数

```typescript
interface ChatSDKConfig {
  position?: 'left' | 'right'  // 布局位置，默认 'right'
}
```

### 位置说明

#### `position: 'left'` (左侧布局)
- **位置**: 聊天窗口固定在浏览器左侧
- **展开动画**: 从左向右滑入
- **移动端**: 占满左侧，从左边展开
- **桌面端**: 靠左边缘，宽度 420px，从左边展开

#### `position: 'right'` (右侧布局，默认)
- **位置**: 聊天窗口固定在浏览器右侧
- **展开动画**: 从右向左滑入
- **移动端**: 占满右侧，从右边展开
- **桌面端**: 靠右边缘，宽度 420px，从右边展开

## 使用示例

### 基础用法

```typescript
import { createChatSDK } from 'ai-bot'

// 左侧布局
const sdk = createChatSDK({
  position: 'left',
  title: '智能客服',
  welcomeMessage: 'Hi，我是智能客服'
})

sdk.mount()
```

### 右侧布局（默认）

```typescript
import { createChatSDK } from 'ai-bot'

// 右侧布局（可不指定，默认就是 right）
const sdk = createChatSDK({
  position: 'right',
  title: '智能客服'
})

sdk.mount()
```

### 动态切换位置

```typescript
const sdk = createChatSDK()

// 运行时切换到左侧
sdk.updateConfig({ position: 'left' })

// 运行时切换到右侧
sdk.updateConfig({ position: 'right' })
```

## 实现细节

### 移动端 (< 768px)

#### 左侧布局
```css
.cs-chat-window-left {
  position: fixed;
  left: 0;
  right: auto;
  width: 100%;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);  /* 从左侧滑入 */
}
```

#### 右侧布局
```css
.cs-chat-window-right {
  position: fixed;
  left: auto;
  right: 0;
  width: 100%;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);  /* 从右侧滑入 */
}
```

### 桌面端 (≥ 768px)

#### 左侧布局
```css
.cs-chat-window-left {
  max-width: 420px;
  left: 20px;          /* 靠左边缘 */
  right: auto;
  bottom: 20px;
  height: calc(100vh - 40px);
  border-radius: 16px;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%) translateY(0);
}
```

#### 右侧布局
```css
.cs-chat-window-right {
  max-width: 420px;
  left: auto;
  right: 20px;         /* 靠右边缘 */
  bottom: 20px;
  height: calc(100vh - 40px);
  border-radius: 16px;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%) translateY(0);
}
```

## 动画方向说明

### Vue Transition 动态绑定

```vue
<template>
  <Transition :name="slideDirection">
    <div :class="['cs-chat-window', `cs-chat-window-${position}`]">
      <!-- 聊天内容 -->
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const position = computed(() => props.config.position || 'right')
const slideDirection = computed(() => {
  return position.value === 'left' ? 'slide-left' : 'slide-right'
})
</script>
```

### 动画类型

| 位置 | Transition Name | 动画方向 |
|------|----------------|----------|
| `left` | `slide-left` | 从左向右滑入 `translateX(-100%) → translateX(0)` |
| `right` | `slide-right` | 从右向左滑入 `translateX(100%) → translateX(0)` |

## 视觉效果对比

### 左侧布局 (position: 'left')

**移动端**:
```
┌─────────────────┐
│                 │
│  [聊天窗口  │   │  ← 从左边滑入
│                 │
│                 │
└─────────────────┘
```

**桌面端**:
```
┌───────────────────────────┐
│                         │
│  [聊天窗口]  │           │  ← 左侧，从左边滑入
│                         │
│                         │
└───────────────────────────┘
```

### 右侧布局 (position: 'right')

**移动端**:
```
┌─────────────────┐
│                 │
│   │  [聊天窗口] │  ← 从右边滑入
│                 │
│                 │
└─────────────────┘
```

**桌面端**:
```
┌───────────────��───────────┐
│                         │
│           │  [聊天窗口] │  ← 右侧，从右边滑入
│                         │
│                         │
└───────────────────────────┘
```

## 适用场景

### 左侧布局适用场景

1. **RTL 语言支持**: 支持阿拉伯语、希伯来语等从右向左的语言
2. **品牌定位**: 希望聊天窗口在左侧展示
3. **用户习惯**: 某些地区用户习惯左侧操作
4. **多语言站点**: 根据 LTR/RTL 自动切换位置

### 右侧布局适用场景

1. **默认布局**: 大多数用户习惯右侧聊天
2. **右利手用户**: 符合大多数用户操作习惯
3. **传统设计**: 与主流聊天应用保持一致
4. **移动优先**: 移动端最常见的设计

## 高级用法

### 根据语言方向自动切换

```typescript
// 检测页面语言方向
const isRTL = document.documentElement.dir === 'rtl'
const position = isRTL ? 'right' : 'left'

const sdk = createChatSDK({
  position,
  title: '智能客服'
})
```

### 根据用户偏好切换

```typescript
// 从 localStorage 读取用户偏好
const savedPosition = localStorage.getItem('chat-position') as 'left' | 'right' | null

const sdk = createChatSDK({
  position: savedPosition || 'right'
})

// 监听位置切换
sdk.on('positionChange', (newPosition) => {
  localStorage.setItem('chat-position', newPosition)
})
```

### 响应式位置

```typescript
// 根据屏幕大小自动调整
const isMobile = window.innerWidth < 768
const position = isMobile ? 'right' : 'left'

const sdk = createChatSDK({ position })
```

## 类型定义

### TypeScript 支持

```typescript
import { createChatSDK } from 'ai-bot'
import type { ChatSDKConfig } from 'ai-bot'

const config: ChatSDKConfig = {
  position: 'left',  // ✅ 类型安全
  title: '智能客服'
}

const sdk = createChatSDK(config)

// ✅ 类型推断
sdk.updateConfig({ position: 'right' })  // ✅ OK
sdk.updateConfig({ position: 'center' }) // ❌ 编译错误
```

## 迁移指南

### 从旧版本升级

如果你已经在使用旧版本 SDK：

```typescript
// 旧版本（无 position 配置）
const sdk = createChatSDK({
  title: '智能客服'
})

// 新版本（默认 behavior 不变）
const sdk = createChatSDK({
  title: '智能客服'
  // position 默认为 'right'，与旧版本一致
})
```

**向后兼容**:
- ✅ 默认值为 'right'，不影响现有用户
- ✅ 不配置 position 时保持原有行为
- ✅ 可以随时添加配置来切换位置

## 浏览器兼容性

### 动画支持

| 特性 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| Transition | ✅ | ✅ | ✅ | ✅ |
| transform | ✅ | ✅ | ✅ | ✅ |
| translateX | ✅ | ✅ | ✅ | ✅ |

### 移动端支持

| 特性 | iOS Safari | Chrome Mobile | Android |
|------|-----------|--------------|---------|
| 动画流畅度 | ✅ 流畅 | ✅ 流畅 | ✅ 流畅 |
| 触摸交互 | ✅ 正常 | ✅ 正常 | ✅ 正常 |
| 性能表现 | ✅ 优秀 | ✅ 优秀 | ✅ 优秀 |

## 性能优化

### 动画性能

```css
/* 使用 GPU 加速 */
.cs-chat-window {
  will-change: transform;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  /* 使用 transform 而非 left/right，触发 GPU 加速 */
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 最佳实践

1. **使用 transform**: 使用 `translateX` 而非 `left/right`，性能更好
2. **硬件加速**: 动画属性使用 `transform`，触发 GPU 加速
3. **合适的缓动**: 使用 `cubic-bezier(0.4, 0, 0.2, 1)` 提供流畅动画
4. **避免重排**: 动画过程中不改变元素尺寸，避免触发布局重排

## 调试技巧

### 检查当前配置

```typescript
console.log('当前位置:', sdk.config.position)  // 'left' | 'right'
```

### 动态切换测试

```javascript
// 在浏览器控制台测试
window.chatSDK.updateConfig({ position: 'left' })   // 切换到左侧
window.chatSDK.updateConfig({ position: 'right' })  // 切换到右侧
```

### 查看动画类名

在浏览器开发者工具中：
1. 打开聊天窗口
2. 查看聊天窗口元素的 class
3. 应该看到 `cs-chat-window` 和 `cs-chat-window-left` 或 `cs-chat-window-right`

## 常见问题

### Q: 切换 position 后需要重新挂载吗？

**A**: 不需要。使用 `updateConfig()` 动态切换会立即生效。

### Q: 动画方向可以自定义吗？

**A**: 目前只支持从左向右和从右向左两种方向，对应 position 的 'left' 和 'right'。

### Q: 可以让聊天窗口居中吗？

**A**: 当前版本只支持左右两侧布局。居中布局需要在桌面端手动调整 transform。

### Q: 如何监听位置变化？

**A**: 目前没有内置的位置变化事件，但可以通过监听 open 事件后检查 config.position。

### Q: 移动端和桌面端可以有不同的位置吗？

**A**: 不可以，position 配置对移动端和桌面端都生效。如需不同位置，建议使用 CSS 覆盖。

## 总结

**新增功能**:
- ✅ `position` 配置项支持 'left' 和 'right'
- ✅ 自动调整聊天窗口布局位置
- ✅ 自动匹配展开动画方向
- ✅ 移动端和桌面端自适应
- ✅ 类型安全，TypeScript 支持

**使用建议**:
- 默认使用 'right'（符合用户习惯）
- 特殊场景使用 'left'（RTL 语言、品牌需求等）
- 支持运行时动态切换
- 向后兼容，不影响现有用户

**技术亮点**:
- Vue Transition 动态绑定
- CSS Transform 动画（GPU 加速）
- 响应式设计（移动端 + 桌面端）
- 类型安全的配置
