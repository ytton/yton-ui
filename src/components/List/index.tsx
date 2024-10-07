import clsx from 'clsx';
import { Children, ReactNode, useMemo, useRef } from 'react';

export interface ListProps<T> {
  items?: T[]; // 泛型的列表项
  columns?: number; // 瀑布流的列数
  renderItem?: (item: T, index: number) => React.ReactNode; // 渲染每个项的函数
  children?: React.ReactNode; // 支持 children 写法
  bordered?: boolean; // 是否显示边框
  gap?: [number, number]; // 间距
}

const List = <T,>({
  items = [],
  columns = 1,
  renderItem = item => item as ReactNode,
  bordered = false,
  gap = [16, 16],
  children
}: ListProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gapX, gapY] = gap;

  const columnEls: T[][] = useMemo(() => {
    const allChild = children ? Children.toArray(children) : items;
    const res = Array(columns);
    allChild.forEach((item, index) => {
      const column = index % columns;
      if (!res[column]) {
        res[column] = [];
      }
      res[column].push(item);
    });
    return res;
  }, [children, columns, items]);
  return (
    <div
      ref={containerRef}
      className="flex"
      style={{
        columnGap: gapX
      }}
    >
      {columnEls.map((children, ind) => (
        <div className="flex flex-col flex-1" style={{ rowGap: gapY }} key={`col-${ind}`}>
          {children.map((item, index) => (
            <div key={index} className={clsx({ 'border-b': bordered })}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default List;
