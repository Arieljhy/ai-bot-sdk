# API 模块使用文档

## 📁 目录结构

```
src/api/
├── config/
│   └── servicePort.ts          # API 服务端口配置
├── helper/
│   ├── axiosCancel.ts          # Axios 请求取消工具
│   ├── checkStatus.ts          # HTTP 状态码检查
│   └── requestRetry.ts         # 请求重试机制
├── interface/
│   ├── common.ts               # 通用接口定义
│   ├── chat.ts                 # 对话模块接口
│   ├── session.ts              # 会话管理接口
│   ├── message.ts              # 消息管理接口
│   ├── config.ts               # 配置管理接口
│   └── index.ts                # 统一导出
├── modules/
│   ├── chat.ts                 # 对话模块（核心）
│   ├── session.ts              # 会话管理模块
│   ├── message.ts              # 消息管理���块
│   ├── upload.ts               # 文件上传模块
│   └── config.ts               # 配置管理模块
└── index.ts                    # Axios 实例封装
```

## 🚀 快速开始

### 1. 对话模块（核心）

```typescript
import { sendMessage, sendMessageStream } from "@/api/modules/chat";

// 非流式对话
const response = await sendMessage({
  content: "你好",
  model: "gpt-4",
  temperature: 0.7
});

// 流式对话（配合 useSSE hook）
const { url, method, headers, body } = sendMessageStream({
  content: "你好",
  stream: true
});
```

### 2. 会话管理

```typescript
import {
  createSession,
  getSessions,
  updateSessionTitle,
  deleteSession
} from "@/api/modules/session";

// 创建新会话
const session = await createSession({
  title: "新对话",
  model: "gpt-4"
});

// 获取会话列表
const sessions = await getSessions({
  status: "active",
  pageNum: 1,
  pageSize: 20
});

// 更新会话标题
await updateSessionTitle(sessionId, "新标题");

// 删除会话
await deleteSession(sessionId);
```

### 3. 消息管理

```typescript
import {
  getHistoryMessages,
  rateMessage,
  deleteMessage
} from "@/api/modules/message";

// 获取历史消息
const messages = await getHistoryMessages({
  sessionId: "xxx",
  pageNum: 1,
  pageSize: 50
});

// 消息评价
await rateMessage({
  messageId: "xxx",
  rating: "like",
  reason: "回答很有帮助"
});

// 删除消息
await deleteMessage({
  messageId: "xxx",
  sessionId: "xxx"
});
```

### 4. 文件上传（增强版）

```typescript
import {
  uploadImage,
  uploadDocument,
  getUploadLimits,
  validateFile,
  type UploadProgressCallback
} from "@/api/modules/upload";

// 上传图片（带进度）
const onProgress: UploadProgressCallback = (progress) => {
  console.log(`上传进度：${progress.percent}%`);
};
const result = await uploadImage(file, onProgress);

// 验证文件
const limits = await getUploadLimits();
const validation = validateFile(
  file,
  limits.data.allowedTypes,
  limits.data.maxSize
);
if (!validation.valid) {
  console.error(validation.error);
}

### 5. 配置管理

```typescript
import {
  getSDKConfig,
  getUserPreferences,
  updateUserPreferences
} from "@/api/modules/config";

// 获取 SDK 配置
const config = await getSDKConfig();

// 获取用户偏好
const preferences = await getUserPreferences();

// 更新用户偏好
await updateUserPreferences({
  theme: "dark",
  fontSize: "large",
  streamEnabled: true
});
```

## 🔗 与 useSSE Hook 集成

```typescript
import { useSSE } from "@/hooks/useSSE";
import { sendMessageStream } from "@/api/modules/chat";

const { content, isLoading, start, stop } = useSSE();

// 开始流式对话
const handleSend = async (message: string) => {
  const streamConfig = sendMessageStream({
    content: message,
    stream: true
  });

  await start(streamConfig);
};

// 停止生成
const handleStop = () => {
  stop();
};
```

## 📝 TypeScript 类型支持

所有 API 都有完整的 TypeScript 类型定义：

```typescript
import type {
  SendMessageParams,
  MessageResponse,
  Session,
  Message,
  UserPreferences
} from "@/api/interface";

// 使用类型
const params: SendMessageParams = {
  content: "Hello",
  model: "gpt-4"
};
```

## 🛠️ 自定义配置

### 修改 API 基础路径

编辑 `src/api/config/servicePort.ts`:

```typescript
export const CHAT_BASE = "/api/chat"; // 修改为你的实际路径
```

### 修改 Axios 配置

编辑 `src/api/index.ts`:

```typescript
const config = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  withCredentials: true
};
```

## 📦 API 模块说明

| 模块 | 说明 | 主要功能 |
|------|------|----------|
| **chat** | 对话模块 | 发送消息、停止生成、重新生成、获取建议 |
| **session** | 会话管理 | 创建/删除会话、获取会话列表、更新标题 |
| **message** | 消息管理 | 获取历史、评价、搜索、导出消息 |
| **upload** | 文件上传 | 图片、视频、文档上传，获取上传限制 |
| **config** | 配置管理 | SDK配置、用户偏好、模型列表 |

## ✅ 最佳实践

1. **流式对话优先**：推荐使用 `sendMessageStream` + `useSSE` 实现打字机效果
2. **错误处理**：所有 API 都应该用 try-catch 包裹
3. **加载状态**：非流式请求会自动显示 loading，可通过 `{ loading: false }` 关闭
4. **取消重复请求**：默认启用，可通过 `{ cancel: false }` 关闭

```typescript
try {
  const response = await sendMessage(params, { loading: false });
  // 处理成功响应
} catch (error) {
  // 处理错误
}
```

## 🆕 新增优化功能

### 1. 增强错误处理

更完善的 HTTP 状态码处理：

```typescript
import {
  checkStatus,
  isNetworkError,
  isTimeoutError,
  handleRequestError
} from "@/api/helper/checkStatus";

// 检查状态码
checkStatus(404); // 自动显示 "404 - 请求的资源不存在"

// 判断错误类型
if (isNetworkError(error)) {
  console.log("网络错误");
}
```

### 2. 多实例支持

创建多个独立的 Axios 实例：

```typescript
import { RequestHttp } from "@/api";

// 创建第二个实例
const secondHttp = new RequestHttp({
  baseURL: "https://api2.example.com",
  timeout: 15000
});
```

### 3. GET 请求防缓存

自动为 GET 请求添加时间戳参数：

```typescript
http.get("/api/data", { id: 1 });
// 实际请求：/api/data?id=1&_t=1703123456789
```

### 4. 动态更新配置

运行时更新实例配置：

```typescript
http.updateConfig({
  timeout: 30000,
  baseURL: "https://new-api.example.com"
});
```
