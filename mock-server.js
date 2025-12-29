/**
 * 模拟 SSE 服务器
 * 用于测试前端流式对话功能
 *
 * 运行方式: node mock-server.js
 */

import http from 'http'

const PORT = 3001

const server = http.createServer((req, res) => {
  // 设置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  if (req.url === '/api/chat/stream' && req.method === 'POST') {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      try {
        const { messages } = JSON.parse(body)

        // 设置 SSE 响应头
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        })

        // 模拟 AI 响应
        const responses = [
          '这是一个基于 Vue3 + Vite + Pinia + TypeScript + SSE 构建的对话流问答系统。',
          '该系统支持实时流式响应，提供流畅的对话体验。',
          '您可以创建多个对话，并随时切换不同的对话历史。',
          '所有对话数据都存储在 Pinia 状态管理中，便于扩展和持久化。',
        ]

        const userMessage = messages[messages.length - 1]?.content || ''
        let responseText = ''

        // 根据用户输入生成简单响应
        if (userMessage.includes('你好') || userMessage.includes('hi')) {
          responseText = '你好！很高兴为您服务。有什么我可以帮助您的吗？'
        } else if (userMessage.includes('功能')) {
          responseText = responses.join('\n\n')
        } else if (userMessage.includes('天气')) {
          responseText = '很抱歉，我暂时无法获取实时天气信息。我是一个演示用的智能助手。'
        } else {
          responseText = `您说的是："${userMessage}"\n\n这是一个模拟的 AI 响应。在实际项目中，您需要连接真实的 AI 服务（如 OpenAI API、Claude API 等）来获得智能回复。`
        }

        // 模拟流式输出
        let index = 0
        const sendChunk = () => {
          if (index < responseText.length) {
            const chunk = responseText.slice(0, index + 1)
            const data = JSON.stringify({
              content: chunk,
              done: false,
            })

            const flushed = res.write(`data: ${data}\n\n`)
            if (flushed) {
              index++
              setTimeout(sendChunk, 30)
            } else {
              res.once('drain', () => {
                index++
                setTimeout(sendChunk, 30)
              })
            }
          } else {
            // 发送完成标记
            res.write(`data: ${JSON.stringify({ content: responseText, done: true })}\n\n`)
            res.write('data: [DONE]\n\n')
            res.end()
          }
        }

        // 开始发送
        setTimeout(sendChunk, 100)

        // 处理客户端断开连接
        res.on('close', () => {
          console.log('Client disconnected')
        })
      } catch (error) {
        console.error('Error:', error)
        res.writeHead(400)
        res.end('Invalid request')
      }
    })
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

server.listen(PORT, () => {
  console.log(`Mock SSE Server running at http://localhost:${PORT}`)
  console.log('API endpoint: http://localhost:3001/api/chat/stream')
  console.log('\n按 Ctrl+C 停止服务器\n')
})