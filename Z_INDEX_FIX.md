# 浮动按钮 Z-Index 修复说明

## 问题现象

Demo 页面中的浮动按钮不显示，被 SDK 的聊天窗口遮挡。

## 根本原因

### Z-Index 层级冲突

**SDK 容器** (src/index.ts):
```typescript
this.container.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999999;  // ❌ 非常高的 z-index
`
```

**Demo 浮动按钮** (修复前):
```css
.demo-floating-button {
  position: fixed;
  z-index: 9998;  // ❌ 远低于 SDK 容器
}
```

**层级关系**:
```
页面层级:
├─ z-index: 9998    ← Demo 浮动按钮 (被覆盖)
└─ z-index: 999999   ← SDK 容器 (覆盖所有)
```

## 解决方案

### 提高 Demo 浮动按钮的 z-index

**修复后** (src/demo/Demo.vue):
```css
.demo-floating-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  /* ... */
  z-index: 1000000;  /* ✅ 高于 SDK 容器的 999999 */
}
```

**新的层级关系**:
```
页面层级:
├─ z-index: 999999    ← SDK 容器 (聊天窗口)
└─ z-index: 1000000   ← Demo 浮动按钮 (在最上层) ✅
```

## Z-Index 层级规范

### SDK 内部层级

```
Shadow DOM 内部:
├─ z-index: 100   ← FloatingButton (已移除)
└─ z-index: 200   ← ChatWindow (聊天窗口)
```

### 页面整体层级

```
1. 普通页面内容: z-index: auto 或 0-999
2. SDK 容器: z-index: 999999
3. 接入方浮动按钮: z-index: 1000000+ (必须高于 SDK)
```

## 接入方实现指南

### 推荐的 Z-Index 设置

```css
/* ✅ 推荐：使用明显更高的 z-index */
.my-floating-button {
  z-index: 1000000;
}

/* ✅ 也可以：使用 CSS 变量 */
.my-floating-button {
  z-index: calc(var(--sdk-z-index, 999999) + 1);
}
```

### 不推荐的 Z-Index 设置

```css
/* ❌ 错误：太低，会被 SDK 覆盖 */
.my-floating-button {
  z-index: 9999;
}

/* ❌ 错误：使用负值，会被页面内容覆盖 */
.my-floating-button {
  z-index: -1;
}

/* ⚠️ 谨慎：紧挨着 SDK 容器的 z-index */
.my-floating-button {
  z-index: 1000000;  /* 只高 1，可能不够安全 */
}
```

## 完整的浮动按钮实现

```vue
<template>
  <button
    v-if="!sdk.isOpen.value"
    class="my-floating-button"
    @click="toggleChat"
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>
    <span v-if="unreadCount > 0" class="badge">
      {{ unreadCount > 99 ? '99+' : unreadCount }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { createChatSDK } from 'ai-bot'

const sdk = createChatSDK({
  title: '智能客服',
  welcomeMessage: 'Hi，我是智能客服'
})

const unreadCount = ref(0)

sdk.mount()

sdk.on('message', (message) => {
  if (message.role === 'assistant' && !sdk.isOpen.value) {
    unreadCount.value++
  }
})

sdk.on('open', () => {
  unreadCount.value = 0
})

const toggleChat = () => {
  if (sdk.isOpen.value) {
    sdk.close()
  } else {
    sdk.open()
  }
}
</script>

<style scoped>
.my-floating-button {
  /* 关键：z-index 必须高于 SDK 容器的 999999 */
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000000;  /* ⚠️ 重要：必须 > 999999 */
}

.my-floating-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.my-floating-button:active {
  transform: scale(0.95);
}

.my-floating-button svg {
  width: 32px;
  height: 32px;
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
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .my-floating-button {
    bottom: 16px;
    right: 16px;
    width: 52px;
    height: 52px;
  }

  .my-floating-button svg {
    width: 24px;
    height: 24px;
  }
}
</style>
```

## 调试技巧

### 1. 检查元素的层叠上下文

在浏览器开发者工具中：
1. 选中浮动按钮元素
2. 查看右侧的 Computed 面板
3. 搜索 "z-index"
4. 确认值是否 > 999999

### 2. 检查父元素的 z-index

```javascript
// 在浏览器控制台运行
function checkZIndex(element) {
  let current = element
  let zIndices = []

  while (current) {
    const style = window.getComputedStyle(current)
    const zIndex = style.zIndex
    if (zIndex !== 'auto') {
      zIndices.push({
        element: current.tagName,
        zIndex: parseInt(zIndex)
      })
    }
    current = current.parentElement
  }

  return zIndices
}

// 检查浮动按钮
const button = document.querySelector('.demo-floating-button')
console.log(checkZIndex(button))
```

### 3. 使用 3D 视图查看层级

Chrome DevTools:
1. 打开 DevTools
2. 按 Cmd+Shift+P (Mac) 或 Ctrl+Shift+P (Windows)
3. 输入 "Show 3D view"
4. 查看元素的层叠关系

## 常见问题

### Q: 为什么 SDK 容器需要这么高的 z-index？

**A**: SDK 使用 Shadow DOM 实现样式隔离，容器需要覆盖整个视口 (`position: fixed`)，并确保聊天窗口始终在页面内容之上。设置 999999 是为了避免与接入方的其他元素冲突。

### Q: 可以降低 SDK 容器的 z-index 吗？

**A**: 不建议。SDK 容器的 z-index 是经过设计的，降低后可能导致聊天窗口被其他元素覆盖。接入方应该确保自己的浮动按钮 z-index 更高。

### Q: 如何避免 z-index 冲突？

**A**:
1. 接入方的浮动按钮使用明确的、更高的 z-index（推荐 1000000）
2. 或使用 CSS 变量动态计算：`calc(var(--sdk-z-index) + 1)`
3. 避免使用负值或过低的 z-index

### Q: 多个浮动按钮怎么办？

**A**: 如果页面有多个浮动按钮，确保它们的 z-index 都高于 SDK，并且彼此之间有正确的层级关系。

## 修复验证

### 检查清单

- [x] Demo 浮动按钮的 z-index 提高到 1000000
- [x] 构建成功，无错误
- [x] 浮动按钮可以正常显示
- [x] 浮动按钮点击可以打开/关闭聊天窗口
- [x] 未读消息徽章正常显示

### 浏览器测试

在以下浏览器中测试确认：
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ 移动浏览器

## 总结

浮动按钮不显示的根本原因是 **z-index 层级冲突**：

- SDK 容器：`z-index: 999999`
- Demo 浮动按钮（修复前）：`z-index: 9998` ❌
- Demo 浮动按钮（修复后）：`z-index: 1000000` ✅

**关键要点**：
1. 接入方的浮动按钮 z-index 必须 > 999999
2. 推荐使用 1000000 或更高
3. 可以使用 CSS 变量动态计算以避免硬编码
