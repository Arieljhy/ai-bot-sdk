# 贡献指南

感谢您对智能客服 SDK 的关注！我们欢迎任何形式的贡献。

## 🤝 如何贡献

### 报告问题

如果您发现了 bug 或有功能建议：

1. 检查 [Issues](https://github.com/your-repo/ai-bot/issues) 中是否已有相同问题
2. 如果没有，创建新的 Issue，提供详细的信息：
   - 问题描述
   - 复现步骤
   - 期望行为
   - 实际行为
   - 环境信息（浏览器、Node 版本等）
   - 截图或代码示例（如果适用）

### 提交代码

#### 开发环境设置

1. Fork 项目到您的 GitHub 账号
2. Clone 您的 fork：

```bash
git clone https://github.com/your-username/ai-bot.git
cd ai-bot
```

3. 安装依赖：

```bash
npm install
```

4. 启动开发服务器：

```bash
npm run dev
```

#### 分支管理

- `main` - 主分支，保持稳定
- `develop` - 开发分支
- `feature/*` - 新功能分支
- `fix/*` - 修复分支
- `docs/*` - 文档分支

#### 提交流程

1. 从 `main` 分支创建新的功能分支：

```bash
git checkout -b feature/your-feature-name
```

2. 进行开发和测试
3. 提交代码（遵循提交规范）：

```bash
git add .
git commit -m "feat: 添加XXX功能"
```

4. 推送到您的 fork：

```bash
git push origin feature/your-feature-name
```

5. 创建 Pull Request

#### 提交信息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` - 新功能
- `fix:` - 问题修复
- `docs:` - 文档更新
- `style:` - 代码格式调整
- `refactor:` - 代码重构
- `perf:` - 性能优化
- `test:` - 测试相关
- `chore:` - 构建/工具变更

示例：

```
feat: 添加深色主题支持
fix: 修复移动端滚动问题
docs: 更新 API 文档
```

#### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 配置
- 添加必要的注释和文档
- 确保类型定义完整
- 编写测试（如果适用）

#### Pull Request 检查清单

提交 PR 前请确认：

- [ ] 代码通过 TypeScript 类型检查
- [ ] 代码通过 ESLint 检查
- [ ] 代码格式��合 Prettier 规范
- [ ] 新功能已添加测试
- [ ] 文档已更新（README、API 文档等）
- [ ] PR 描述清晰，说明了变更内容和原因
- [ ] Commit messages 遵循规范

## 📝 编码风格

### TypeScript/Vue

```typescript
// 使用类型注解
interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

// 使用常量
const DEFAULT_CONFIG = {
  title: '智能客服',
  theme: 'light'
}

// 函数命名清晰
function sendMessage(content: string): Promise<void> {
  // ...
}
```

### Vue 组件

```vue
<script setup lang="ts">
// 使用 Composition API
import { ref, computed } from 'vue'

// Props 定义清晰
interface Props {
  title: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

// Emits 类型明确
const emit = defineEmits<{
  send: [content: string]
  close: []
}>()
</script>
```

## 🧪 测试

```bash
# 运行测试（待添加）
npm run test

# 类型检查
npm run type-check

# 代码检查
npm run lint
```

## 📖 文档

更新文档时请注意：

- 保持文档简洁明了
- 提供代码示例
- 更新相关 API 文档
- 添加必要的注释

## 💬 讨论

对于较大的功能或设计变更，建议先创建 Issue 进行讨论。

## 📄 许可

提交代码即表示您同意将代码以项目的许可证发布。

---

感谢您的贡献！🙏
