import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

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
            lib: {
              entry: resolve(__dirname, 'src/index.ts'),
              name: 'ChatSDK',
              formats: ['es', 'umd'],
              fileName: (format) => `chat-sdk.${format}.js`,
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
