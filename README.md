# YTON UI

这是一个基于 **React**、**TypeScript**、**Tailwind CSS** 和 **Framer Motion** 的个人 UI 组件库，旨在帮助快速搭建现代化、响应式且具有动效的 Web 应用程序界面。本项目主要作为学习和练习使用，如果你发现任何问题或有任何建议，欢迎提 Issues 和 PRs！

## 预览

可以点击[演示地址](https://ytton.github.io/yton-ui/)查看效果

## 特性

- **React + TypeScript**：利用 React 构建组件，并通过 TypeScript 提供类型安全支持。
- **Tailwind CSS**：用于快速布局和样式调整，支持高度可定制化的设计。
- **Framer Motion**：用于添加动效，让组件更生动。
- **响应式设计**：支持多端适配，适合桌面和移动设备。

## 快速开始

### 先决条件

在开始之前，请确保你已经安装了以下工具：

- [Node.js](https://nodejs.org/)（建议使用最新稳定版本）
- [Yarn](https://yarnpkg.com/) 或 [npm](https://www.npmjs.com/)

### 克隆项目

```bash
git clone https://github.com/ytton/yton-ui.git
cd yton-ui
```

### 安装依赖

使用 Yarn 或 npm 安装项目依赖：

```bash
# 使用 Yarn
yarn install

# 使用 npm
npm install
```

### 启动项目

项目是自己封装的文档工具，直接启动`dev`即可

```bash
# 使用 npm
npm run dev
```

启动后，默认会在浏览器中打开，访问 [http://localhost:5173/](http://localhost:5173/) 可以查看组件的示例和文档。

## 使用方法

### 安装

可以通过以下命令将组件库添加到你的项目中：

```bash
npm install yton-ui
```

### 引入样式文件

在项目的入口文件（通常是 `main.tsx`）中引入样式文件：

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'yton-ui/dist/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### 引入组件

在你的项目中，可以使用以下方式引入并使用库中的组件：

```tsx
import { Button } from 'yton-ui';

const App = () => {
  return (
    <div className="p-4">
      <Button text="点击我" onClick={() => alert('Hello!')} />
    </div>
  );
};

export default App;
```

## 开发指南

### 创建新组件

1. 在 `src/components` 目录中创建一个新的文件夹，并命名为组件名称（例如 `Button`）。
2. 创建组件文件，例如 `Button.tsx`，并使用 React 和 TypeScript 定义组件。
3. 在 `Button.tsx` 文件中编写你的组件代码并使用 Tailwind CSS 来进行样式设计。
4. 为组件添加动画效果（可选），可以使用 Framer Motion 提供的 `motion.div` 等方法。
5. 在 `docs/pages/components` 目录中创建对应的 mdx 文件，如 `button/index.mdx`，用于组件的展示和文档编写。

### 构建项目

当项目完成后，你可以将其构建为发布包，项目已经配置了`prepublishOnly`脚本，在发布前会自动构建项目。

生成的打包文件将位于 `dist` 目录下，确保无误后可以发布到 npm 或其他包管理平台。

## 未来计划

- 增加更多常用 UI 组件
- 支持更多动画效果
- 提供更全面的文档和使用示例
- 完善测试和优化构建流程

## 贡献

欢迎对本项目的贡献！如果你有新的想法或发现了问题，请通过以下方式参与：

1. Fork 本项目。
2. 创建一个新的分支：`git checkout -b feature/your-feature`。
3. 提交你的更改：`git commit -m "增加新功能"`。
4. 推送到分支：`git push origin feature/your-feature`。
5. 提交 Pull Request。

## 许可证

该项目遵循 MIT 许可证。详情请参见 [LICENSE](./LICENSE)。
