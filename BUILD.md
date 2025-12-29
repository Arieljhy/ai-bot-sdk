📦 TypeScript 支持总结

  ✅ 已完成的配置

  1. 类型声明文件自动生成
    - dist/index.d.ts - 主要的SDK类型声明
    - dist/types.d.ts - 所有类型定义（ChatMessage、QuickQuestion等）
  2. package.json 配置
  {
    "types": "./dist/index.d.ts",
    "exports": {
      ".": {
        "types": "./dist/index.d.ts",
        "import": "./dist/chat-sdk.es.js",
        "require": "./dist/chat-sdk.umd.js"
      }
    }
  }
  3. 构建流程
    - 运行 npm run build:lib 自动打包并生成类型声明文件
    - 使用Vite插件自动复制类型声明文件到dist目录

  📝 使用示例

  在TypeScript项目中使用SDK时，会获得完整的类型提示：

  import { createChatSDK, type ChatSDKConfig, type ChatMessage } from 'ai-bot'

  const config: ChatSDKConfig = {
    title: '智能客服',
    welcomeMessage: 'Hi，我是智能客服'
  }

  const sdk = createChatSDK(config)

  // 完整的类型提示
  sdk.mount()
  sdk.open()
  sdk.on('sendMessage', (content: string) => {
    // content 自动推断为 string 类型
  })

  📦 构建产物

  - ✅ dist/chat-sdk.es.js - ES Module格式
  - ✅ dist/chat-sdk.umd.js - UMD格式
  - ✅ dist/index.d.ts - 主类型声明文件
  - ✅ dist/types.d.ts - 附加类型定义
  - ✅ dist/ai-bot.css - 样式文件

  SDK现在完全支持TypeScript，并提供了完整的类型定义！🎉