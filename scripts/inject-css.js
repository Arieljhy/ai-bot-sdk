import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootDir = resolve(__dirname, '..')
const cssFilePath = resolve(rootDir, 'dist/ai-bot-adk.css')
const stylesTsPath = resolve(rootDir, 'src/styles.ts')

try {
  // 读取生成的CSS文件
  const cssContent = readFileSync(cssFilePath, 'utf-8')

  // 转义CSS内容为JS字符串
  const escapedCss = cssContent
    .replace(/\\/g, '\\\\')  // 转义反斜杠
    .replace(/`/g, '\\`')    // 转义反引号
    .replace(/\$/g, '\\$')   // 转义美元符号
    .replace(/\n/g, '\\n')   // 转义换行符

  // 生成新的styles.ts内容
  const newStylesContent = `/**
 * 组件样式
 * 这个文件会在构建时自动生成，包含所有组件的CSS样式
 * ⚠️  请勿手动编辑此文件，它会在构建时自动生成
 */

export const COMPONENT_STYLES = \`${escapedCss}\`
`

  // 写入styles.ts文件
  writeFileSync(stylesTsPath, newStylesContent, 'utf-8')

  console.log('✓ CSS样式已内联到 src/styles.ts')
} catch (error) {
  console.error('内联CSS失败:', error.message)
  process.exit(1)
}
