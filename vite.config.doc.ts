/// <reference types="vitest" />
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';
// 实现代码高亮
import rehypeHighlight from 'rehype-highlight';
// 给代码块添加props 例如添加文件名
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import { resolve } from 'path';
import rehypeSlug from 'rehype-slug';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: 'meta' }]],
      rehypePlugins: [rehypeHighlight, rehypeMdxCodeProps, rehypeSlug],
      providerImportSource: '@mdx-js/react'
    })
  ],
  publicDir: 'docs/public',
  build: {
    outDir: 'docs/dist'
  },
  resolve: {
    alias: {
      docs: resolve(__dirname, 'docs'),
      'yton-ui': resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.mdx']
  }
});
