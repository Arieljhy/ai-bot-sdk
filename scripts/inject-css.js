import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = resolve(__dirname, '..')

const cssContent = readFileSync(resolve(rootDir, 'dist/ai-bot-adk.css'), 'utf-8')

// 转义CSS内容��JS字符串
const escapedCss = cssContent
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$/g, '\\$')
  .replace(/\n/g, '\\n')

const content = `/**
 * 组件样式 - 构建时自动生成，请勿手动编辑
 */
export const COMPONENT_STYLES = \`${escapedCss}\`
`

writeFileSync(resolve(rootDir, 'src/styles.ts'), content, 'utf-8')
console.log('✓ CSS样式已内联到 src/styles.ts')
