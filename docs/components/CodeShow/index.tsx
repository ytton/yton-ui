import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { themes } from 'prism-react-renderer';
import React, { ReactNode, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { useLocation } from 'react-router-dom';
import * as ytonUI from 'yton-ui';
import { useClipboard } from 'use-clipboard-copy';
import './index.less';
type CodeShowProps = {
  src?: string;
  code?: string;
  title?: string;
  desc?: ReactNode;
  className?: string;
  onlyPreview?: boolean;
  noStyle?: boolean;
};
const demoContext = import.meta.glob('docs/pages/components/**/demo/*.tsx', {
  eager: true,
  query: '?raw',
  import: 'default'
});
const demoModules = Object.keys(demoContext).reduce<Record<string, string>>((acc, path) => {
  const name = path.replace('/docs/pages/components/', '../');
  acc[name] = demoContext[path] as string;
  return acc;
}, {});
const CodeShow: React.FC<CodeShowProps> = ({ src = '', code: propCode, title, desc, className, onlyPreview }) => {
  const [code] = useState(demoModules[src] || propCode || '');
  const [codeVisible, setCodeVisible] = useState(false);
  const location = useLocation();
  const isActive = decodeURIComponent(location.hash) === `#${title}`;
  const clipboard = useClipboard();
  if (!code) return null;
  if (typeof desc === 'string') {
    desc = desc.replace(/`(.+?)`/g, '<code>$1</code>');
  }

  const otherContent = (
    <>
      <div className="relative p-4 border border-l-0 border-r-0">
        <div className="absolute -top-[0.75em] left-[1em] text-sm bg-white">{title}</div>
        {typeof desc === 'string' && <div dangerouslySetInnerHTML={{ __html: desc }}></div>}
        {typeof desc !== 'string' && <div>{desc}</div>}
      </div>
      <div className="flex justify-center px-2 py-2">
        <div
          onClick={() => setCodeVisible(!codeVisible)}
          title="展开代码"
          className="p-2 cursor-pointer hover:bg-gray-100"
        >
          <Icon icon="mdi-code-tags" />
        </div>
      </div>
      {/* 编辑器 */}
      <div
        className={clsx('border-y -mt-[1px] relative hover:border-primary leading-normal', {
          hidden: !codeVisible,
          'border-x': !isActive
        })}
      >
        <div
          title="复制"
          onClick={() => clipboard.copy(code)}
          className="absolute p-2 cursor-pointer top-2 right-2 hover:bg-gray-100"
        >
          <Icon icon="mdi-content-copy" />
        </div>
        <LiveEditor theme={themes.nightOwlLight} />
      </div>
      {codeVisible && (
        <div className="flex justify-center px-2 py-2 border border-t-0">
          <div onClick={() => setCodeVisible(false)} className="flex items-center cursor-pointer hover:text-primary">
            <Icon icon="mdi-chevron-up" />
            收起
          </div>
        </div>
      )}
      {/* 错误消息 */}
      <LiveError style={{ color: 'red', marginTop: '10px' }} />
    </>
  );

  return (
    <div
      className={clsx('code-show rounded-sm relative ', className, {
        'border-blue-500': isActive,
        border: !onlyPreview
      })}
    >
      <LiveProvider
        code={code}
        noInline={true}
        scope={{ ...ytonUI, ...React, React }}
        transformCode={code => {
          code = code.replace(/import .+(;?)/g, '');
          code = code.replace(/export default (\w+);?/, 'render(< $1/>)');
          return code;
        }}
      >
        {/* 预览区域 */}
        <div className="p-6">
          <h3 id={title} className="absolute opacity-0 !m-0 !text-sm pointer-events-none -top-4 left-0">
            {title}
          </h3>
          <LivePreview />
        </div>
        {!onlyPreview && otherContent}
      </LiveProvider>
    </div>
  );
};

export default CodeShow;
