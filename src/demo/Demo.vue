<template>
  <div class="demo-container">
    <DemoHeader />

    <div class="demo-section">
      <h2>📱 功能特性</h2>
      <FeatureList />
    </div>

    <div class="demo-section">
      <h2>🚀 快速开始</h2>
      <QuickStart @open-chat="openChat" @send-test="sendTest" />
    </div>

    <div class="demo-section">
      <h2>💻 使用示例</h2>
      <CodeExamples />
    </div>

    <!-- 浮动按钮示例 - 实际项目中由接入方实现 -->
    <FloatingButton
      :visible="isShowBtn"
      :unread-count="unreadCount"
      @click="toggleChat"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { createChatSDK } from '../index'
import type { ChatSDK } from '../index'
import DemoHeader from './components/DemoHeader.vue'
import FeatureList from './components/FeatureList.vue'
import QuickStart from './components/QuickStart.vue'
import CodeExamples from './components/CodeExamples.vue'
import FloatingButton from './components/FloatingButton.vue'

let sdk: ChatSDK | null = null
const unreadCount = ref(0)
const isShowBtn = ref(true)

// 监听聊天窗口开关状态，控制浮动按钮显隐
let stopWatch: (() => void) | null = null

const watchChatOpenState = () => {
  if (stopWatch) {
    stopWatch()
  }

  if (sdk) {
    // 先设置初始值
    isShowBtn.value = !sdk.isOpen.value

    // 监听 isOpen 变化
    stopWatch = watch(
      () => sdk!.isOpen.value,
      (isOpen) => {
        isShowBtn.value = !isOpen
      },
      { immediate: true }
    )
  } else {
    // sdk 未初始化时显示浮动按钮
    isShowBtn.value = true
  }
}

onMounted(() => {
  // 创建SDK实例（不包含浮动按钮配置）
  sdk = createChatSDK({
    title: '智能客服',
    placeholder: '你可以问我任何平台相关的问题',
    welcomeMessage: 'Hi，我是智能客服',
    sseUrl: 'http://localhost:3000/sse',  // SSE 流式接口地址
    sseMethod: 'POST',                       // SSE 请求方法
    quickQuestions: [
      { id: '1', text: '如何使用这个平台？' },
      { id: '2', text: '账号如何注册？' },
      { id: '3', text: '忘记密码怎么办？' },
      { id: '4', text: '如何联系人工客服？' },
      { id: '5', text: '平台支持哪些功能？' },
      { id: '6', text: '如何查看使用记录？' },
    ],
    enableHistory: true,
    maxHistoryDays: 7,
    position: 'right'
  });

  // 挂载SDK
  sdk.mount()

  // 挂载后启动监听聊天窗口开关状态
  watchChatOpenState()

  // 监听窗口打开事件，清除未读数
  sdk.on('open', () => {
    console.log('聊天窗口已打开')
    unreadCount.value = 0
  })

  sdk.on('close', () => {
    console.log('聊天窗口已关闭')
  })

  // 监听消息事件，更新未读数
  sdk.on('message', (message: any) => {
    if (message.role === 'assistant' && !sdk?.isOpen.value) {
      unreadCount.value++
    }
  })

  // 暴露到全局，方便调试
  ;(window as any).chatSDK = sdk
})

onUnmounted(() => {
  // 清理监听
  if (stopWatch) {
    stopWatch()
  }

  if (sdk) {
    sdk.unmount()
  }
})

const openChat = () => {
  sdk?.open()
}

const sendTest = () => {
  sdk?.open()
  setTimeout(() => {
    sdk?.sendMessage('这是一条测试消息')
  }, 500)
}

const toggleChat = () => {
  if (sdk) {
    if (sdk.isOpen.value) {
      sdk.close()
    } else {
      sdk.open()
    }
  }
}
</script>

<style lang="less">
// 全局样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  min-height: 100vh;
}
</style>

<style scoped lang="less">
@import '../styles/variables.less';

.demo-container {
  min-height: 100vh;
  background: @gradient-primary;
  padding: @spacing-xl;
}

.demo-section {
  background: @bg-white;
  border-radius: @radius-xl;
  padding: @spacing-2xl;
  margin-bottom: @spacing-xl;
  box-shadow: @shadow-md;

  h2 {
    font-size: @font-size-2xl;
    color: @text-primary;
    margin-bottom: @spacing-lg;
  }
}

// 移动端适配
@media (max-width: @screen-sm) {
  .demo-container {
    padding: @spacing-md;
  }

  .demo-section {
    padding: @spacing-lg;
  }
}
</style>
