/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'), // 组件库入口
      formats: ['es', 'cjs', 'umd'],
      name: 'ytonUI', // 组件库的全局名称
      fileName: format => `index.${format}.js` // 输出文件名格式
    },
    rollupOptions: {
      // 确保依赖的库不会被打包到组件库中
      external: ['react', 'react-dom'],

      output: {
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'style.css') {
            // 将原始的 `style.css` 重命名为 `index.css`
            return 'index.css';
          }
          // 保持其他静态资源的默认命名方式
          return 'assets/[name]-[hash][extname]';
        },
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  publicDir: false,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  test: {
    coverage: {
      include: ['src/**/*.test.tsx'],
      provider: 'v8',
      reporter: ['text']
    },
    globals: true,
    include: ['src/**/*.test.tsx'],
    environment: 'jsdom', // 使用 jsdom 模拟浏览器环境
    setupFiles: './src/test.setup.ts' // 设置测试环境文件
  }
});
