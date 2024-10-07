import Layout from './layout';
import Home from './pages/home';
import Components from './pages/components';
import Intro from './pages/intro';
import Overall from './pages/components/overall';
import { createElement } from 'react';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { AnyType } from './types';

// 动态导入 MDX 组件
const componentContext = import.meta.glob('./pages/components/**/index.mdx', { eager: true });
export type RouteItem = RouteObject & {
  name: string;
  group: string;
  title: string;
  meta: Record<string, AnyType>;
}

// 生成动态路由
export const componentsRoutes: RouteItem[] = [];
Object.keys(componentContext).map(path => {
  const pathname = path.split('/')[3]; // 获取组件目录名
  const component = componentContext[path] as {
    meta: { name: string; group: string; title: string } & Record<string, AnyType>;
    default: React.ComponentType<AnyType> & { meta: Record<string, AnyType> };
  };
  component.default.meta = component.meta;
  componentsRoutes.push({
    title: component.meta.title,
    name: component.meta.name,
    group: component.meta.group,
    meta: component.meta,
    path: pathname,
    element: createElement(component.default, { })
  });
});
const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/intro',
        element: <Intro />
      },
      {
        path: '/components',
        element: <Components />,
        children: [
          {
            path: 'overall',
            element: <Overall />
          },
          ...componentsRoutes,
          {
            path: '/components',
            element: <Navigate to="/components/overall" />
          }
        ]
      },
      {
        path: '/',
        element: <Navigate to="/home" />
      }
    ]
  }
]);

export default appRouter;