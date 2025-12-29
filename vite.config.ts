import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'
import { readFileSync as fsReadFileSync } from 'fs'

const execAsync = promisify(exec)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib' || mode === 'lib:es' || mode === 'lib:umd'
  const isESMode = mode === 'lib:es'
  const isUMDMode = mode === 'lib:umd'

  // 库模式：在构建前内联CSS
  if (isLib) {
    try {
      const cssPath = resolve(__dirname, 'dist/ai-bot-adk.css')
      const stylesTsPath = resolve(__dirname, 'src/styles.ts')

      // 尝试读取已存在的CSS文件
      try {
        const cssContent = fsReadFileSync(cssPath, 'utf-8')

        // 转义CSS内容为JS字符串
        const escapedCss = cssContent
          .replace(/\\/g, '\\\\')
          .replace(/`/g, '\\`')
          .replace(/\$/g, '\\$')
          .replace(/\n/g, '\\n')

        // 生成styles.ts内容
        const newStylesContent = `/**
 * 组件样式
 * 这个文件会在构建时自动生成，包含所有组件的CSS样式
 * ⚠️  请勿手动编辑此文件，它会在构建时自动生成
 */

export const COMPONENT_STYLES = \`${escapedCss}\`
`

        // 写入styles.ts文件
        writeFileSync(stylesTsPath, newStylesContent, 'utf-8')
        console.log('✓ CSS样式已预加载到 src/styles.ts')
      } catch (err) {
        // CSS文件不存在，将在构建后生成
        console.log('ℹ CSS文件尚未生成，将在构建后内联')
      }
    } catch (error) {
      console.error('预处理CSS失败:', error)
    }
  }

  return {
    plugins: [
      vue(),
      // 库模式：复制类型声明文件
      ...(isLib
        ? [
            {
              name: 'copy-types',
              writeBundle() {
                try {
                  const indexDts = readFileSync(resolve(__dirname, 'src/index.d.ts'), 'utf-8')
                  const typesDts = readFileSync(resolve(__dirname, 'src/types/index.ts'), 'utf-8')

                  const indexDtsPath = resolve(__dirname, 'dist/index.d.ts')
                  const typesDtsPath = resolve(__dirname, 'dist/types.d.ts')

                  writeFileSync(indexDtsPath, indexDts)
                  writeFileSync(typesDtsPath, typesDts)

                  console.log('✓ 类型声明文件已复制到 dist/')
                } catch (error) {
                  console.error('复制类型声明文件失败:', error)
                }
              },
            },
            {
              name: 'inline-css',
              async writeBundle() {
                try {
                  // 在构建完成后执行CSS内联脚本
                  console.log('正在内联CSS到JS文件...')
                  await execAsync('node scripts/inject-css.js')
                  console.log('✓ CSS内联完成（需要在下次构建时生效）')
                } catch (error) {
                  console.error('内联CSS失败:', error)
                  throw error
                }
              },
            },
          ]
        : []),
    ],

    // 路径解析配置
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },

    // 开发服务器配置
    server: {
      port: 5173,
      host: '0.0.0.0',
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    // 预览服务器配置
    preview: {
      port: 4173,
      host: '0.0.0.0',
      open: true,
    },

    // 构建优化配置
    build: {
      // 生成 sourcemap
      sourcemap: !isLib,
      // 压缩配置
      minify: 'terser',
    },

    // 库模式配置
    ...(isLib
      ? {
          build: {
            emptyOutDir: false, // 禁用自动清空，手动管理
            lib: {
              // ES和UMD都使用同一个入口，包含完整导出
              entry: resolve(__dirname, 'src/index.ts'),
              name: 'ChatSDK',
              formats: isESMode ? ['es'] : ['umd'],
              fileName: (format) => `chat-sdk.${format === 'es' ? 'es' : 'umd'}.js`,
            },
            rollupOptions: {
              // 外部化 Vue 依赖
              external: ['vue'],
              output: {
                // 在 UMD 构建模式下为外部化的依赖提供全局变量
                globals: {
                  vue: 'Vue',
                },
              },
            },
            // CSS 代码分割
            cssCodeSplit: false,
          },
        }
      : {}),
  }
})
