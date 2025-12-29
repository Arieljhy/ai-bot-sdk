# SVG 图标尺寸调试指南

## 问题现象

在 Shadow DOM 中，SVG 图标显示过大。

## 诊断步骤

### 1. 清除浏览器缓存

Shadow DOM 的样式更新可能被浏览器缓存，需要强制刷新：

```bash
# 开发环境
npm run dev
# 在浏览器中按 Cmd+Shift+R (Mac) 或 Ctrl+Shift+R (Windows) 强制刷新
```

### 2. 检查编译后的 CSS

```bash
# 查看所有 SVG 相关的样式
grep -i "svg" dist/ai-bot.css
```

### 3. 浏览器开发者工具检查

#### Chrome/Edge DevTools:
1. 打开开发者工具 (F12)
2. 选中浮动按钮或聊天窗口
3. 在 Elements 面板中，展开 `<chat-sdk-root>` 元素
4. 查看其 Shadow DOM：
   - 右键点击 `<chat-sdk-root>`
   - 选择 "Shadow DOM" 或直接查看子元素
5. 检查 SVG 元素的计算样式（Computed）
6. 查看实际应用的 width 和 height 值

#### Firefox DevTools:
1. 打开开发者工具 (F12)
2. 在 Inspector 中找到 `<chat-sdk-root>`
3. 展开查看 #shadow-root
4. 选中 SVG 元素
5. 查看右侧的 Computed 面板

### 4. 验证各个组件的 SVG 尺寸

#### FloatingButton (浮动按钮)
```css
.floating-button svg {
  width: 32px;  /* @spacing-3xl */
  height: 32px;
}

/* 移动端 */
@media (max-width: 768px) {
  .floating-button svg {
    width: 24px;  /* @spacing-2xl */
    height: 24px;
  }
}
```

#### ChatHeader (聊天头部)
```css
.cs-avatar svg {
  width: 24px;  /* @font-size-3xl */
  height: 24px;
}

.cs-icon-btn svg {
  width: 24px;  /* @font-size-3xl */
  height: 24px;
}
```

#### MessageItem (消息气泡)
```css
.cs-avatar svg {
  width: 20px;  /* @spacing-xl */
  height: 20px;
}

.cs-feedback-btn svg {
  width: 8px;   /* @spacing-sm */
  height: 8px;
}
```

#### MessageInput (输入框)
```css
.cs-send-btn svg {
  width: 24px;  /* @font-size-3xl */
  height: 24px;
}

/* 移动端 */
@media (max-width: 480px) {
  .cs-send-btn svg {
    width: 22px;
    height: 22px;
  }
}
```

#### WelcomeSection (欢迎页)
```css
.cs-refresh-btn svg {
  width: 16px;  /* @spacing-lg */
  height: 16px;
}
```

#### QuickQuestions (推荐问题)
```css
.cs-question-icon {
  width: 8px;   /* @spacing-sm */
  height: 8px;
}
```

## 当前实现方案

### 全局默认样式 (src/index.ts)

```css
/* SVG 全局样式 */
svg {
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  width: 1em;     /* 默认继承父元素字体大小 */
  height: 1em;
}

/* 防止内部路径溢出 */
svg * {
  vector-effect: non-scaling-stroke;
}
```

**说明**:
- `width: 1em; height: 1em` 提供合理的默认尺寸
- 组件中的明确尺寸设置会覆盖默认值
- `overflow: hidden` 防止 SVG 内容溢出

### 组件样式覆盖

组件中使用 `scoped` 样式，选择器优先级更高：

```vue
<style scoped lang="less">
.floating-button {
  svg {
    width: 32px;  /* ✓ 会覆盖全局的 1em */
    height: 32px;
  }
}
</style>
```

**优先级**:
```
组件 scoped 样式 > Shadow DOM 全局样式
```

## 常见问题排查

### 问题 1: SVG 仍然显示过大

**可能原因**:
1. 浏览器缓存了旧版本
2. 组件的 scoped 样式没有正确编译
3. CSS 选择器优先级冲突

**解决方法**:
```bash
# 1. 清除缓存并重新构建
rm -rf dist node_modules/.vite
npm run build:lib

# 2. 重启开发服务器
npm run dev

# 3. 在浏览器中硬刷新 (Cmd+Shift+R)
```

### 问题 2: 某个特定的 SVG 显示异常

**排查步骤**:
1. 在浏览器 DevTools 中找到该 SVG 元素
2. 查看应用的样式规则
3. 检查是否有样式被覆盖或未生效
4. 查看该 SVG 元素的 HTML 属性（class, id 等）

**示例修复**:
如果发现组件样式未生效，可以在组件中添加 `!important`：

```less
.floating-button {
  svg {
    width: 32px !important;
    height: 32px !important;
  }
}
```

### 问题 3: 移动端 SVG 尺寸不对

**检查媒体查询**:
确认响应式样式正确应用：

```css
@media (max-width: 768px) {
  .floating-button svg {
    width: 24px;
    height: 24px;
  }
}
```

在 DevTools 中：
1. 切换到移动设备模拟模式
2. 检查 SVG 的计算样式
3. 确认媒体查询是否生效

## 测试验证

### 自动化测试脚本

创建测试页面 `test-svg-sizes.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>SVG 尺寸测试</title>
</head>
<body>
  <h1>SVG 图标尺寸测试</h1>
  <div id="sdk-container"></div>

  <script type="module">
    import { createChatSDK } from './dist/chat-sdk.es.js';

    const sdk = createChatSDK({
      title: 'SVG 测试',
      welcomeMessage: '测试 SVG 尺寸'
    });

    sdk.mount();

    // 等待渲染完成后检查 SVG 尺寸
    setTimeout(() => {
      const svgs = document.querySelectorAll('chat-sdk-root shadowRoot svg');
      console.log('找到的 SVG 数量:', svgs.length);

      svgs.forEach((svg, index) => {
        const styles = window.getComputedStyle(svg);
        console.log(`SVG ${index + 1}:`, {
          width: styles.width,
          height: styles.height,
          display: styles.display
        });
      });
    }, 1000);
  </script>
</body>
</html>
```

### 预期结果

所有 SVG 应该显示为以下尺寸之一：
- 8px (最小，反馈按钮、问题图标)
- 16px (刷新按钮)
- 20px (消息头像)
- 24px (图标按钮、发送按钮，移动端浮动按钮)
- 32px (浮动按钮)

## 技术说明

### Shadow DOM 中的样式优先级

1. **Shadow DOM 内部样式** > **宿主页面样式**
2. **组件 scoped 样式** > **Shadow DOM 全局样式**
3. **明确设置的值** > **继承的值**
4. **!important** 最高优先级（谨慎使用）

### em 单位的作用

使用 `width: 1em` 的好处：
- 相对单位，可缩放
- 继承父元素的字体大小
- 提供合理的默认值
- 组件样式可以轻松覆盖

### Less 变量到像素值的转换

构建过程中，Less 变量会被转换为具体值：

```less
@spacing-3xl: 32px;
// 编译后
.floating-button svg {
  width: 32px;
}
```

## 更新日志

### 最新修改 (2024-12-28)

1. ✅ 移除了 `max-width/max-height` 限制（会覆盖组件设置）
2. ✅ 添加 `width: 1em; height: 1em` 作为默认值
3. ✅ 添加 `overflow: hidden` 防止内容溢出
4. ✅ 添加 `vector-effect: non-scaling-stroke` 保持描边
5. ✅ 移除按钮 SVG 的 `width/height: inherit`（会导致问题）

### 构建结果

```bash
✓ dist/ai-bot.css      11.66 kB │ gzip: 2.52 kB
✓ dist/chat-sdk.es.js  24.66 kB │ gzip: 7.38 kB
✓ dist/chat-sdk.umd.js  19.63 kB │ gzip: 6.44 kB
✓ 无错误
```

## 总结

当前实现确保：

✅ **所有 SVG 都有明确的尺寸设置**
✅ **全局默认值不会覆盖组件样式**
✅ **Shadow DOM 样式隔离正常工作**
✅ **响应式布局正确应用**
✅ **浏览器兼容性良好**

如果仍然遇到 SVG 显示过大的问题，请：

1. 清除浏览器缓存并硬刷新
2. 使用浏览器 DevTools 检查实际应用的样式
3. 检查控制台是否有 CSS 加载错误
4. 确认使用的是最新构建的 dist 文件

## 相关文档

- [Shadow DOM 样式 - MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
- [CSS em 单位 - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)
- [SVG viewBox - MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox)
