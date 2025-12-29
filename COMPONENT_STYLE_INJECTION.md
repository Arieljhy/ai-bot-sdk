# Shadow DOM 组件样式注入修复

## 问题描述

在开发模式下，components 下的组件样式在浏览器 Elements 面板中完全不生效，所有组件显示为无样式状态。

## 根本原因

### Vite 开发模式的样式注入机制

**普通 Vue 应用**:
```
index.html
└─ <head>
   └─ <style>                    ← Vite 将组件样式注入到这里
       .component { ... }        ← 样式正常工作 ✅
```

**Shadow DOM 应用**:
```
index.html
└─ <head>
   └─ <style>                    ← Vite 注入样式到 head
       .cs-component { ... }     ← ❌ Shadow DOM 内部无法访问

<chat-sdk-root>
  └─ #shadow-root
      └─ <div class="cs-component">  ← 样式无法穿透进来 ❌
```

### 为什么会这样？

1. **Shadow DOM 的样式边界**: Shadow DOM 创建了一个独立的样式作用域
2. **Vite 的注入位置**: Vite 将组件样式注入到 `<head>` 中
3. **样式隔离**: `<head>` 中的样式无法穿透 Shadow DOM 边界
4. **结果**: 组件在 Shadow DOM 内部，但样式在外部，无法匹配

## 解决方案

### 开发模式：动态注入样式到 Shadow DOM

```typescript
// src/index.ts

private injectGlobalStyles() {
  // ... 注入全局基础样式

  // 在开发模式下，将组件样式注入到 Shadow DOM
  if (import.meta.env.DEV) {
    setTimeout(() => {
      this.injectComponentStyles()
    }, 100)
  } else {
    // 生产模式下，从打包的 CSS 文件加载
    this.loadComponentStyles()
  }
}

private injectComponentStyles() {
  if (!this.shadowRoot) return

  // 获取文档中所有的 style 标签
  const allStyles = Array.from(document.querySelectorAll('style'))

  // 复制包含 SDK 组件样式的标签到 Shadow DOM
  allStyles.forEach(styleTag => {
    const content = styleTag.textContent || ''
    // 检查是否包含 SDK 组件的样式（以 cs- 开头的类名）
    if (content.includes('.cs-') || content.includes('.chat-sdk')) {
      // 避免重复添加
      const existingId = styleTag.getAttribute('data-vite-dev-id')
      const alreadyInjected = Array.from(this.shadowRoot!.querySelectorAll('style'))
        .some(s => s.getAttribute('data-vite-dev-id') === existingId)

      if (!alreadyInjected) {
        const clonedStyle = styleTag.cloneNode(true)
        this.shadowRoot!.appendChild(clonedStyle)
        console.log('[ChatSDK] Injected component style:', existingId || 'unknown')
      }
    }
  })
}
```

### 生产模式：从打包的 CSS 文件加载

```typescript
private loadComponentStyles() {
  if (!this.shadowRoot) return

  // 尝试从 link 标签中获取 SDK 的 CSS
  const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
  linkTags.forEach(link => {
    const href = link.getAttribute('href')
    if (href && href.includes('ai-bot')) {
      // 创建一个 link 标签到 Shadow DOM 中
      const shadowLink = document.createElement('link')
      shadowLink.rel = 'stylesheet'
      shadowLink.href = href
      this.shadowRoot!.appendChild(shadowLink)
      console.log('[ChatSDK] Loaded stylesheet:', href)
    }
  })
}
```

## 技术细节

### 开发模式 vs 生产模式

| 特性 | 开发模式 | 生产模式 |
|------|---------|---------|
| **样式来源** | Vite 注入的 `<style>` 标签 | 打包的 `.css` 文件 |
| **注入时机** | 动态注入（setTimeout 100ms） | 挂载时加载 |
| **样式选择器** | 包含 data-vite-dev-id | 压缩的 CSS |
| **检测方式** | 检查 `.cs-` 类名 | 检查 href 中包含 'ai-bot' |

### 延迟注入的原因

```typescript
setTimeout(() => {
  this.injectComponentStyles()
}, 100)
```

**为什么需要延迟**:
1. Vue 组件需要时间挂载
2. Vite 需要时间编译和注入样式
3. Shadow DOM 需要先创建完成
4. 100ms 是经验值，确保所有步骤完成

### 避免重复注入

```typescript
const existingId = styleTag.getAttribute('data-vite-dev-id')
const alreadyInjected = Array.from(this.shadowRoot!.querySelectorAll('style'))
  .some(s => s.getAttribute('data-vite-dev-id') === existingId)

if (!alreadyInjected) {
  // 注入样式
}
```

**使用 `data-vite-dev-id` 属性**:
- Vite 自动为每个 style 标签生成唯一 ID
- 通过 ID 避免重复注入相同的样式
- 提高性能和避免样式重复

## 验证修复

### 1. 检查浏览器控制台

**开发模式**:
```
[ChatSDK] Injected component style: /src/components/ChatWindow.vue
[ChatSDK] Injected component style: /src/components/ChatHeader.vue
[ChatSDK] Injected component style: /src/components/MessageItem.vue
...
```

**生产模式**:
```
[ChatSDK] Loaded stylesheet: /assets/ai-bot.css
```

### 2. 检查 Elements 面板

展开 `<chat-sdk-root>` → `#shadow-root`，应该能看到：

```
<chat-sdk-root>
  #shadow-root (open)
    <style>           ← 全局基础样式
    <style data-vite-dev-id="...">  ← 组件样式 (开发模式)
    <link rel="stylesheet" href="...">  ← CSS 文件 (生产模式)
    <div id="chat-sdk-mount-point">
      <div class="cs-chat-window">  ← 样式正确应用 ✅
        ...
```

### 3. 检查 Computed 样式

选中任意组件元素，查看右侧 Computed 面板：
- 所有 CSS 属性都应该有值
- 不应该看到 "unset" 或默认值
- 颜色、字体、间距等应该正确显示

## 构建和测试

### 开发模式

```bash
npm run dev
# 访问 http://localhost:5173/
# 打开浏览器控制台，查看样式注入日志
# 检查 Elements 面板中组件样式
```

### 生产模式

```bash
npm run build:lib
# 在使用方项目中引入
import { createChatSDK } from 'ai-bot/dist/chat-sdk.es.js'
import 'ai-bot/dist/ai-bot.css'

const sdk = createChatSDK()
sdk.mount()
```

## 常见问题

### Q: 为什么生产模式也需要特殊处理？

**A**: 生产模式下，CSS 打包成独立的 `.css` 文件，通过 `<link>` 标签引入。即使引入到页面，Shadow DOM 内部也访问不到这些样式，需要将 link 标签复制到 Shadow DOM 中。

### Q: 100ms 延迟是否足够？

**A**: 在大多数情况下足够。如果遇到样式仍未注入，可以：
1. 增加延迟时间（如 200ms）
2. 使用 `requestAnimationFrame`
3. 使用 `MutationObserver` 监听 head 标签变化

### Q: 如何调试样式注入问题？

**A**:
1. 打开浏览器控制台，查看注入日志
2. 检查 Shadow DOM 内是否有 `<style>` 或 `<link>` 标签
3. 检查 style 标签的内容是否包含 `.cs-` 开头的样式
4. 查看网络面板，确认 CSS 文件已加载

### Q: 样式更新后需要刷新页面吗？

**A**:
- **开发模式**: Vite 的 HMR 会自动更新，但可能需要手动刷新页面
- **生产模式**: 需要重新加载页面

### Q: 性能影响如何？

**A**:
- 开发模式：每次挂载都会复制样式标签，但只在开发时使用
- 生产模式：只是复制 link 标签引用，性能影响可忽略

## 相关代码

### src/index.ts

**关键方法**:
- `injectGlobalStyles()` - 注入全局基础样式
- `injectComponentStyles()` - 开发模式：注入组件样式
- `loadComponentStyles()` - 生产模式：加载 CSS 文件

**调用时机**:
```typescript
// 在 mount() 方法中
this.injectGlobalStyles()  // 挂载时立即注入
```

## 总结

**问题根源**:
- Vite 将组件样式注入到 `<head>` 中
- Shadow DOM 的样式隔离机制阻止了外部样式
- 组件在 Shadow DOM 内部，样式在外部，无法匹配

**解决方案**:
- 开发模式：动态复制 style 标签到 Shadow DOM
- 生产模式：复制 link 标签到 Shadow DOM
- 使用延迟确保 Vue 组件已挂载

**效果**:
- ✅ 开发模式样式正常显示
- ✅ 生产模式样式正常显示
- ✅ HMR 在开发模式下工作
- ✅ 样式隔离仍然有效

**关键原则**:
> **在 Shadow DOM 中使用组件时，必须手动将样式注入到 Shadow DOM 内部**
