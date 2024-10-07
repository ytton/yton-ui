import { Icon } from '@iconify/react';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from 'docs/components/CodeBlock';
import CodeShow from 'docs/components/CodeShow';
import 'docs/fluent.less';
import 'highlight.js/styles/vs2015.css';
import { List } from 'yton-ui';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'; // 移除未使用的 Outlet
// 定义 MDX 组件
import TableOfContents from 'docs/components/TOC';
import { useEffect, useRef } from 'react';
import { useClipboard } from "use-clipboard-copy";
import { componentsRoutes, RouteItem } from 'docs/router';
const Components = () => {
  const location = useLocation();
  const curMeta = componentsRoutes.find(item => `/components/${item.path}` === location.pathname)?.meta;
  const mainRef = useRef<HTMLDivElement>(null);
  const clipboard = useClipboard();
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-1 overflow-y-auto">
      <aside className="w-64 h-full py-6 overflow-y-auto bg-white border-r border-gray-200">
        <div className="pr-6">
          <NavLink
            to="/components/overall"
            className={({ isActive }) =>
              `text-lg font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md px-6 py-2 cursor-pointer w-full inline-block ${
                isActive ? 'bg-gray-50 !text-blue-600' : ''
              }`
            }
          >
            组件总览
          </NavLink>
        </div>
        <nav className="mt-5">
          {Object.values(
            componentsRoutes.reduce((acc: Record<string, { name: string; children: RouteItem[] }>, item: RouteItem) => {
              if (!acc[item.group]) {
                acc[item.group] = { name: item.group, children: [] };
              }
              acc[item.group].children.push(item);
              return acc;
            }, {})
          ).map(group => (
            <div key={group.name} className="px-6 ">
              <h3 className="py-2 mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-200">
                {group.name}
              </h3>
              <ul>
                {group.children.map(item => (
                  <NavLink
                    to={`/components/${item.path}`}
                    key={item.path}
                    className={({ isActive }) =>
                      `block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md ${
                        isActive ? 'bg-gray-50 !text-blue-600' : ''
                      }`
                    }
                  >
                    {item.title || item.name}
                  </NavLink>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 h-full pl-16 overflow-y-auto py-7 pr-72" ref={mainRef}>
        {curMeta && (
          <div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">{curMeta.title}</h1>
            <h1 className="mt-2 text-sm">{curMeta.description}</h1>
            <div className="mt-2 mb-6 text-sm">
              <div className="flex items-center mb-1">
                <div className="text-gray-500 w-[4em]">使用</div>
                <div className="px-2 py-1 rounded-sm cursor-pointer" title='复制'>
                  <CodeBlock onClick={() => clipboard.copy(curMeta.use)} language="tsx">{curMeta.use}</CodeBlock>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-gray-500 w-[4em]">源码</div>
                <Link
                  className="flex items-center px-2 py-1 rounded-sm hover:underline hover:bg-gray-100"
                  to={curMeta.repo}
                  target="_blank"
                >
                  <Icon icon="mdi:github" className="mr-1" />
                  <span>components/{curMeta.name}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
        {curMeta?.toc !== false && <TableOfContents />}
        <div className="markdown-container">
          <MDXProvider
            components={{
              CodeShow,
              List
            }}
          >
            <Outlet />
          </MDXProvider>
        </div>
      </main>
    </div>
  );
};

export default Components;
