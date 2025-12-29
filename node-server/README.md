# SSE Server

智能客服 SDK 的 SSE 流式接口服务器，用于模拟 AI 模型的流式响应效果。

## 功能特性

- ✅ 支持 SSE (Server-Sent Events) 流式传输
- ✅ 模拟打字机效果（每次发送 0-6 个字符）
- ✅ 支持 GET 和 POST 请求
- ✅ 可配置发送间隔
- ✅ 完善的错误处理和连接管理

## 安装依赖

```bash
cd node-server
npm install
```

## 启动服务器

```bash
node sse-server.js
```

服务器将在 `http://localhost:3000` 启动。

## API 接口

### 1. GET /sse - 测试端点

用于测试 SSE 连接，通过查询参数传递消息。

**示例：**
```bash
# 基本请求
curl "http://localhost:3000/sse"

# 自定义消息
curl "http://localhost:3000/sse?message=你好"

# 自定义消息和发送间隔（毫秒）
curl "http://localhost:3000/sse?message=测试&interval=100"
```

**响应格式：**
```
event: connected
data: {"status": "connected", "message": "SSE连接成功"}

data: 这
data: 是
data: 一段
...

data: [DONE]
```

### 2. POST /sse - 主端点

SDK 使用的主要端点，通过请求体传递消息。

**请求格式：**
```bash
curl -X POST http://localhost:3000/sse \
  -H "Content-Type: application/json" \
  -d '{
    "message": "你好",
    "history": []
  }'
```

**请求参数：**
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| message | string | 是 | 用户消息内容 |
| history | array | 否 | 对话历史记录 |

**响应格式：**
```
event: connected
data: {"status": "connected", "message": "SSE连接成功"}

data: 收到
data: 你的
data: 消息
...

data: [DONE]
```

### 3. GET /send - 广播端点（可选）

向所有连接的客户端广播消息，用于多客户端测试。

**示例：**
```bash
curl "http://localhost:3000/send?msg=公告消息"
```

## 工作原理

1. **建立连接**：客户端连接到 SSE 端点
2. **发送连接确认**：服务器发送 `connected` 事件
3. **流式传输**：服务器按 0-6 个字符的块状形式发送数据
4. **发送完成**：发送 `[DONE]` 标记表示传输结束
5. **清理连接**：自动清理定时器和连接资源

## 流式传输细节

- **字符块大小**：每次随机发送 0-6 个字符
- **发送间隔**：默认 50ms（可配置）
- **延迟模拟**：随机到 0 个字符时跳过本次发送，模拟真实延迟
- **缓冲区管理**：处理缓冲区满的情况

## 错误处理

服务器会自动处理以下错误：
- 连接断开
- 发送失败
- 客户端异常关闭

## 日志输出

服务器会输出详细的运行日志：

```
Koa SSE 服务器运行在 http://localhost:3000
GET 请求示例: http://localhost:3000/sse?message=测试消息
POST 请求示例: POST http://localhost:3000/sse

[POST /sse] 收到请求:
  - 请求体: {"message":"你好","history":[]}
  - 用户消息: 你好
  - 历史记录数量: 0
[POST /sse] 已发送连接成功消息
[POST /sse] 开始发送回复，文本长度: 45
[POST /sse] 回复内容: 收到你的消息："你好"。这是一段模拟的AI回复...
[POST /sse] 已发送 10/45 个字符
[POST /sse] 已发送 20/45 个字符
...
[POST /sse] 发送完成，共发送 45 个字符
[POST /sse] 连接已正常关闭
SSE 连接已关闭
```

## 集成到 SDK

SDK 已默认配置使用此服务器：

```typescript
const sdk = createChatSDK({
  sseUrl: 'http://localhost:3000/sse',
  sseMethod: 'POST',
  // ... 其他配置
})
```

## 注意事项

1. **端口占用**：默认使用 3000 端口，如需修改请编辑 `sse-server.js` 中的 `PORT` 常量
2. **CORS**：已配置允许所有来源的跨域请求，生产环境建议限制具体域名
3. **生产环境**：当前是模拟数据，生产环境需替换为真实的 AI 模型 API（如 OpenAI、Claude 等）

## 扩展为真实 AI 接口

如需连接真实的 AI 模型，修改 POST /sse 路由中的 `responseText` 部分：

```javascript
// 替换这段代码
const responseText = `收到你的消息："${userMessage}"...`;

// 为真实的 AI 调用
const responseText = await callOpenAI(userMessage, history);
```

## 依赖项

- koa: ^3.1.1
- @koa/router: ^14.0.0
- @koa/cors: ^5.0.0
- koa-bodyparser: ^4.4.1

## 许可证

ISC
