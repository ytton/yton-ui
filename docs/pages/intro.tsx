import CodeBlock from 'docs/components/CodeBlock';

function Intro() {
  return (
    <main className="flex  flex-1 h-full py-6 ">
      <div className="mx-auto p-6 font-sans">
        <h1 className="text-3xl font-bold mb-6">安装和初始化</h1>
        <h2 className="text-2xl font-bold mt-8 mb-4">安装 YtonUI</h2>


        <p className="my-4">现在从 npm 或 yarn 或 pnpm 安装并引入 yton-ui。</p>

        <CodeBlock language='bash'>$ npm install yton-ui --save</CodeBlock>
        <h2 className="text-2xl font-bold mt-8 mb-4">添加css文件</h2>
        <p className="my-4">在src/main.ts中，引入 yton-ui 的样式文件。</p>

        <CodeBlock language='tsx'>
          {`import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'yton-ui/dist/index.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`}
        </CodeBlock>

        <h2 className="text-2xl font-bold mt-8 mb-4">使用 yton-ui 组件</h2>
        <p className="my-4">修改 src/App.js，引入 yton-ui 的按钮组件。</p>

        <CodeBlock language='tsx'>
          {`import React from 'react';
import { Button } from 'yton-ui';

const App = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default App;`}
        </CodeBlock>

        <p className="my-4">
          好了，现在你应该能看到页面上已经有了 yton-ui
          的蓝色按钮组件，接下来就可以继续选用其他组件开发应用了。我们现在已经成功地把 yton-ui
          组件运用到项目中初步开发了，开始你的开发之旅吧！
        </p>
      </div>
    </main>
  );
}

export default Intro;
