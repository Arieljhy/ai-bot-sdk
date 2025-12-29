import { ref } from 'vue'
import type { QuickQuestion } from '../types'

const DEFAULT_QUESTIONS: QuickQuestion[] = [
  { id: '1', text: '如何使用这个平台？' },
  { id: '2', text: '账号如何注册？' },
  { id: '3', text: '忘记密码怎么办？' },
  { id: '4', text: '如何联系人工客服？' },
  { id: '5', text: '平台支持哪些功能？' },
  { id: '6', text: '如何查看使用记录？' },
]

/**
 * 推荐问题管理 Hook
 */
export function useQuickQuestions(configuredQuestions: QuickQuestion[] = []) {
  const displayedQuestions = ref<QuickQuestion[]>([])  // 欢迎气泡显示的问题（每次2条）
  const allQuickQuestions = ref<QuickQuestion[]>([])    // 输入框上方显示的所有问题
  const allQuestionSets = ref<QuickQuestion[][]>([])
  const currentSetIndex = ref(0)

  // 初始化推荐问题
  const initializeQuestions = () => {
    // 如果没有配置问题，使用默认问题
    const allQuestions = configuredQuestions.length > 0 ? configuredQuestions : DEFAULT_QUESTIONS

    // 保存所有问题（用于输入框上方的横向滚动列表）
    allQuickQuestions.value = allQuestions

    // 将问题分成每组 2 条（用于欢迎气泡的分页显示）
    allQuestionSets.value = chunkArray(allQuestions, 2)

    // 显示第一组问题
    displayedQuestions.value = allQuestionSets.value[0] || []
    currentSetIndex.value = 0
  }

  // 将数组分块
  const chunkArray = <T,>(array: T[], size: number): T[][] => {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }

  // 刷新推荐问题（换一换）
  const refreshQuestions = () => {
    if (allQuestionSets.value.length === 0) return

    // 循环切换到下一组
    currentSetIndex.value = (currentSetIndex.value + 1) % allQuestionSets.value.length
    displayedQuestions.value = allQuestionSets.value[currentSetIndex.value] ?? []
  }

  // 初始化
  initializeQuestions()

  return {
    displayedQuestions,
    allQuickQuestions,
    refreshQuestions,
  }
}
