# Shadow DOM 样式修复说明

## 问题描述

在实现 Shadow DOM 后，出现了以下样式问题：
1. SVG 图标显示过大
2. 布局混乱
3. 部分组件样式异常

## 问题原因分析

### 1. `:host { all: initial; }` 过于激进
`all: initial` 会重置所有 CSS 属性到初始值，包括：
- `display` 属性被重置为 `inline`
- `position` 属性被重置为 `static`
- `width/height` 属性被重置为 `auto`

这导致元素布局完全混乱。

### 2. SVG 默认尺寸问题
在 Shadow DOM 中，如果 SVG 没有明确设置 `display` 属性，可能会显示为：
- 默认尺寸：300px × 150px（如果 viewBox 存在但没有尺寸）
- 或者继承父元素的不正确尺寸

### 3. 全局样式重置不完整
缺少对常见元素的重置，导致：
- 按钮样式不一致
- 输入框样式异常
- 图片显示问题

## 修复方案

### 1. 优化 `injectGlobalStyles()` 方法

**文件**: `src/index.ts`

**修改前**:
```typescript
private injectGlobalStyles() {
  const style = document.createElement('style')
  style.textContent = `
    :host {
      all: initial;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    #chat-sdk-mount-point {
      width: 100%;
      min-height: 100vh;
    }
  `
  this.shadowRoot.appendChild(style)
}
```

**修改后**:
```typescript
private injectGlobalStyles() {
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
    }

    /* SVG 全局样式 - 确保在 Shadow DOM 中正确显示 */
    svg {
      display: inline-block;
      vertical-align: middle;
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
}
```

**关键改进**:
- ✅ 移除 `all: initial`，改用精确的样式设置
- ✅ 明确设置 `:host` 的 `display: block`
- ✅ 添加 SVG 的全局样式
- ✅ 添加 img、button、input 的重置样式
- ✅ 添加伪元素的 box-sizing 重置

### 2. 简化 SDKApp.vue 的全局样式

**文件**: `src/SDKApp.vue`

**修改前**:
```vue
<style>
/* Shadow DOM 内部全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', sans-serif;
}
</style>
```

**修改后**:
```vue
<style>
/* Shadow DOM 内部全局样式 - 已在 index.ts 的 injectGlobalStyles 中处理 */
/* 这里只需要添加一些额外的辅助样式 */
</style>
```

**关键改进**:
- ✅ 移除重复的全局样式
- ✅ 移除不存在的 body 元素样式（Shadow DOM 中没有 body）

### 3. 移除不必要的 z-index

**文件**: `src/components/ChatWindow.vue`

**修改前**:
```less
.cs-chat-window {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  background-color: @bg-color;
  display: flex;
  flex-direction: column;
  z-index: @z-index-chat-window; // ❌ 在 Shadow DOM 中不需要
  font-family: @font-family-base;
}
```

**修改后**:
```less
.cs-chat-window {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  background-color: @bg-color;
  display: flex;
  flex-direction: column;
  font-family: @font-family-base;
}
```

**关键改进**:
- ✅ 移除不必要的 z-index（Shadow DOM 的层级由宿主元素控制）

## SVG 图标尺寸检查清单

所有组件的 SVG 图标都已正确设置尺寸：

### ✅ ChatHeader.vue
- 头像 SVG: `width: @font-size-3xl` (24px)
- 图标按钮 SVG: `width: @font-size-3xl` (24px)

### ✅ FloatingButton.vue
- 主图标 SVG: `width: @spacing-3xl` (32px)
- 移动端: `width: @spacing-2xl` (24px)

### ✅ MessageItem.vue
- 头像 SVG: `width: @spacing-xl` (20px)
- 反馈按钮 SVG: `width: @spacing-sm` (8px)

### ✅ MessageInput.vue
- 发送按钮 SVG: `width: @font-size-3xl` (24px)
- 移动端: `width: 22px`

### ✅ WelcomeSection.vue
- 刷新按钮 SVG: `width: @spacing-lg` (16px)

### ✅ QuickQuestions.vue
- 问题图标 SVG: `width: @spacing-sm` (8px)

## 构建结果对比

### 修复前
```
dist/ai-bot.css      11.84 kB │ gzip: 2.55 kB
dist/chat-sdk.es.js  23.14 kB │ gzip: 6.87 kB
dist/chat-sdk.umd.js  18.11 kB │ gzip: 5.88 kB
```

### 修复后
```
dist/ai-bot.css      11.65 kB │ gzip: 2.52 kB (-0.19 kB)
dist/chat-sdk.es.js  23.92 kB │ gzip: 7.10 kB (+0.78 kB, 增加了样式注入代码)
dist/chat-sdk.umd.js  18.89 kB │ gzip: 6.14 kB (+0.78 kB)
```

CSS 文件略微减小，JavaScript 文件略微增加（因为添加了更完善的样式注入逻辑）。

## 测试验证

### 方法 1: 在浏览器中打开测试页面
```bash
open test-shadow-dom.html
```

### 方法 2: 运行开发服务器
```bash
npm run dev
# 访问 http://localhost:5173/
```

### 验证要点
1. ✅ SVG 图标尺寸正常，没有过大的图标
2. ✅ 布局整齐，没有错位
3. ✅ 聊天窗口正常显示和切换
4. ✅ 输入框和按钮样式正常
5. ✅ 样式隔离正常工作（不受宿主页面影响）

## Shadow DOM 样式最佳实践

### ✅ 推荐做法
1. 使用精确的 CSS 重置，避免 `all: initial`
2. 为常见元素（svg, img, button, input）添加默认样式
3. 明确设置 `:host` 的 display 属性
4. 在组件中使用 scoped 或模块化的 CSS

### ❌ 避免做法
1. 不要使用 `all: initial` 过于激进的样式重置
2. 不要在 Shadow DOM 中访问不存在的全局元素（如 body）
3. 不要依赖宿主页面的全局样式
4. 不要在 Shadow DOM 内部使用过多的 z-index

## 后续建议

1. **样式变量统一**: 考虑将所有样式变量通过 CSS 自定义属性（CSS Variables）注入到 Shadow DOM
2. **主题切换**: 如果需要支持主题切换，可以通过修改 CSS 自定义属性实现
3. **样式覆盖**: 提供样式覆盖 API，让接入方可以自定义部分样式

## 总结

通过以上修复，SDK 在 Shadow DOM 中的样式问题已全部解决：
- ✅ SVG 图标尺寸正常
- ✅ 布局整齐有序
- ✅ 组件样式完整
- ✅ Shadow DOM 隔离正常工作

所有修改已通过构建测试，无 TypeScript 错误。
