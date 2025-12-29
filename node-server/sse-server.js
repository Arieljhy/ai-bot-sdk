const Koa = require("koa");
const Router = require("@koa/router");
const cors = require("@koa/cors");

const app = new Koa();
const router = new Router();

// 存储连接的客户端，用于广播
const clients = new Set();
// 存储每个客户端对应的定时器和计数器
const clientTimers = new Map();

// SSE 路由 - 修复版本，支持流式传输（每次发送 0-6 个字符）
router.get("/sse", async ctx => {
  // 重要：告诉 Koa 不要自动处理响应，我们需要手动控制响应流
  ctx.respond = false;

  // 设置 SSE 必备的响应头
  ctx.res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no", // 禁用 Nginx 缓冲
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true"
  });

  // 获取查询参数
  const message = ctx.query.message || "你好，这是一条测试消息。";
  const interval = parseInt(ctx.query.interval) || 50; // 默认50ms间隔，实现打字机效果

  // 立即发送一个初始连接成功消息
  ctx.res.write("event: connected\n");
  ctx.res.write('data: {"status": "connected", "message": "SSE连接成功"}\n\n');

  // 将当前连接的 `ctx.res` 存入 clients
  const client = ctx.res;
  clients.add(client);

  // 模拟 AI 回复文本（实际使用时应该从 AI 模型获取）
  const responseText = `这是一段模拟的AI回复。你可以看到文字以块状流式传输的效果。${message}`;

  // 将文本转换为字符数组，支持 emoji 和特殊字符
  const chars = Array.from(responseText);
  let charIndex = 0;

  // 启动定时器，每次发送 0-6 个字符，实现流式传输效果
  const timer = setInterval(() => {
    // 检查连接是否仍然有效
    if (!client.writable || client.destroyed) {
      clearInterval(timer);
      clients.delete(client);
      clientTimers.delete(client);
      return;
    }

    // 如果所有字符都已发送
    if (charIndex >= chars.length) {
      // 发送结束标记
      try {
        ctx.res.write("data: [DONE]\n\n");
        clearInterval(timer);
        clients.delete(client);
        clientTimers.delete(client);
        // 关闭连接
        ctx.res.end();
      } catch (error) {
        console.error("发送结束标记时出错:", error);
        clearInterval(timer);
        clients.delete(client);
        clientTimers.delete(client);
      }
      return;
    }

    // 随机生成本次发送的字符数量（0-6个字符）
    const remainingChars = chars.length - charIndex;
    const maxChunkSize = Math.min(6, remainingChars);
    const chunkSize = Math.floor(Math.random() * (maxChunkSize + 1)); // 0 到 maxChunkSize 之间的随机数

    // 如果随机到0个字符，跳过本次发送（模拟实际场景中的延迟）
    if (chunkSize === 0) {
      return;
    }

    // 获取本次要发送的字符块
    const chunk = chars.slice(charIndex, charIndex + chunkSize).join('');
    charIndex += chunkSize;

    try {
      // 发送字符块（0-6个字符）
      ctx.res.write(`data: ${chunk}\n\n`);

      // 方案2：发送 JSON 格式，使用 content 字段（兼容前端 extractContent 函数）
      // const chunk = { content: char };
      // ctx.res.write(`data: ${JSON.stringify(chunk)}\n\n`);

      // 方案3：使用通用格式（如果需要更多信息）
      // const chunk = {
      //   content: char,
      //   index: charIndex,
      //   total: chars.length
      // };
      // ctx.res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    } catch (error) {
      console.error("发送数据时出错:", error);
      clearInterval(timer);
      clients.delete(client);
      clientTimers.delete(client);
    }
  }, interval);

  // 保存定时器引用，以便后续清理
  clientTimers.set(client, timer);

  // 客户端断开连接时的清理
  const cleanup = () => {
    if (clientTimers.has(client)) {
      clearInterval(clientTimers.get(client));
      clientTimers.delete(client);
    }
    clients.delete(client);
    console.log("SSE 连接已关闭，定时器已清理");
  };

  ctx.req.on("close", () => {
    cleanup();
  });

  ctx.req.on("end", () => {
    cleanup();
  });
});

// POST 路由 - 接收用户消息并返回流式回复
router.post("/sse", async ctx => {
  try {
    // 获取 POST 请求体中的消息（必须在设置响应头之前）
    const requestBody = ctx.request.body || {};
    const userMessage = requestBody.message || "你好";
    const history = requestBody.history || [];

    // 添加调试日志
    console.log("[POST /sse] 收到请求:");
    console.log("  - 请求体:", JSON.stringify(requestBody, null, 2));
    console.log("  - 用户消息:", userMessage);
    console.log("  - 历史记录数量:", history.length);

    // 重要：告诉 Koa 不要自动处理响应，我们需要手动控制响应流
    ctx.respond = false;

    // 设置 SSE 响应头
    ctx.res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true"
    });

    // 将当前连接的 `ctx.res` 存入 clients
    const client = ctx.res;
    clients.add(client);

    // 立即发送一个初始连接成功消息
    try {
      ctx.res.write("event: connected\n");
      ctx.res.write('data: {"status": "connected", "message": "SSE连接成功"}\n\n');
      console.log("[POST /sse] 已发送连接成功消息");
    } catch (error) {
      console.error("发送连接消息时出错:", error);
    }

    // 模拟 AI 回复（实际应该调用 AI 模型）
    const responseText = `收到你的消息："${userMessage}"。这是一段模拟的AI回复文本，展示了流式传输效果。文字会以 0-6 个字符的块状形式发送，模拟真实的 AI 模型响应。`;

    console.log("[POST /sse] 开始发送回复，文本长度:", responseText.length);
    console.log("[POST /sse] 回复内容:", responseText);

    // 将文本转换为字符数组
    const chars = Array.from(responseText);
    let charIndex = 0;
    const interval = 50; // 50ms 间隔
    let sentCount = 0;

    // 启动定时器，每次发送 0-6 个字符
    const timer = setInterval(() => {
      // 检查连接是否仍然有效
      if (!client.writable || client.destroyed) {
        console.log("[POST /sse] 连接已关闭，停止发送");
        clearInterval(timer);
        clients.delete(client);
        clientTimers.delete(client);
        return;
      }

      // 如果所有字符都已发送
      if (charIndex >= chars.length) {
        try {
          console.log(`[POST /sse] 发送完成，共发送 ${sentCount} 个字符`);
          ctx.res.write("data: [DONE]\n\n");
          clearInterval(timer);
          clients.delete(client);
          clientTimers.delete(client);
          ctx.res.end();
          console.log("[POST /sse] 连接已正常关闭");
        } catch (error) {
          console.error("[POST /sse] 发送结束标记时出错:", error);
          clearInterval(timer);
          clients.delete(client);
          clientTimers.delete(client);
        }
        return;
      }

      // 随机生成本次发送的字符数量（0-6个字符）
      const remainingChars = chars.length - charIndex;
      const maxChunkSize = Math.min(6, remainingChars);
      const chunkSize = Math.floor(Math.random() * (maxChunkSize + 1)); // 0 到 maxChunkSize 之间的随机数

      // 如果随机到0个字符，跳过本次发送（模拟实际场景中的延迟）
      if (chunkSize === 0) {
        return;
      }

      // 获取本次要发送的字符块
      const chunk = chars.slice(charIndex, charIndex + chunkSize).join('');
      charIndex += chunkSize;
      sentCount += chunkSize;

      try {
        // 发送字符块（0-6个字符），确保格式正确：data: <内容>\n\n
        const sseData = `data: ${chunk}\n\n`;
        const written = ctx.res.write(sseData);

        // 如果缓冲区满了，等待 drain 事件
        if (!written) {
          client.once("drain", () => {
            // 缓冲区已清空，可以继续写入
          });
        }

        // 每发送 10 个字符记录一次日志
        if (sentCount % 10 === 0) {
          console.log(`[POST /sse] 已发送 ${sentCount}/${chars.length} 个字符`);
        }
      } catch (error) {
        console.error(`[POST /sse] 发送数据时出错 (已发送: ${sentCount}/${chars.length} 个字符):`, error);
        clearInterval(timer);
        clients.delete(client);
        clientTimers.delete(client);
      }
    }, interval);

    clientTimers.set(client, timer);

    const cleanup = () => {
      if (clientTimers.has(client)) {
        clearInterval(clientTimers.get(client));
        clientTimers.delete(client);
      }
      clients.delete(client);
      console.log("SSE 连接已关闭");
    };

    ctx.req.on("close", cleanup);
    ctx.req.on("end", cleanup);
  } catch (error) {
    console.error("[POST /sse] 处理请求时出错:", error);
    // 如果还没有开始发送响应，尝试发送错误消息
    try {
      if (!ctx.res.headersSent) {
        ctx.set({
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache"
        });
        ctx.status = 200;
        ctx.res.write(`data: ${JSON.stringify({ error: "服务器处理请求时出错" })}\n\n`);
        ctx.res.write("data: [DONE]\n\n");
      }
      ctx.res.end();
    } catch (err) {
      console.error("[POST /sse] 发送错误消息时出错:", err);
    }
  }
});

// 提供一个触发消息的接口 (可选，用于演示)
router.get("/send", ctx => {
  const message = ctx.query.msg || "新消息";
  // 向所有连接的客户端广播消息
  clients.forEach(client => {
    if (client.writable && !client.destroyed) {
      try {
        client.write(`data: ${JSON.stringify({ msg: message, ts: new Date().toISOString() })}\n\n`);
      } catch (error) {
        console.error("广播消息时出错:", error);
      }
    }
  });
  ctx.body = `消息已发送: ${message}`;
});

// 启用 CORS（应在路由之前）
app.use(
  cors({
    origin: "*", // 生产环境应该指定具体域名
    credentials: true
  })
);

// 解析请求体（用于 POST 请求）
// 注意：bodyParser 需要在路由之前注册，但不会干扰 SSE 流式响应
const bodyParser = require("koa-bodyparser");
app.use(
  bodyParser({
    jsonLimit: "10mb", // 允许较大的 JSON 请求体
    enableTypes: ["json", "form"], // 只解析 JSON 和表单数据
    // 不设置 onError，让错误正常传播
    strict: true // 严格模式，只解析 Content-Type 匹配的请求
  })
);

app.use(router.routes()).use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Koa SSE 服务器运行在 http://localhost:${PORT}`);
  console.log(`GET 请求示例: http://localhost:${PORT}/sse?message=测试消息`);
  console.log(`POST 请求示例: POST http://localhost:${PORT}/sse`);
});
