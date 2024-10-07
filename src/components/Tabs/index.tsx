import useControllableValue from '@/hooks/useControllableValue';
import { cn } from '@/utils/utils';
import { useMemo, useState } from 'react';
import { TabsContext } from './context';
import TabItem from './TabItem';
import { TabItemProps, TabsProps } from './types';

function Tabs({ items, activeKey, defaultActiveKey, onChange, card = false }: TabsProps) {
  const [active, setActive] = useControllableValue(items[0]?.key || '', {
    value: activeKey,
    defaultValue: defaultActiveKey
  });
  const [uniqueId] = useState(() => `${Date.now().toString(36).slice(2, 9)}-${Math.random().toString(36).slice(2, 9)}`);
  const tabContent = useMemo(() => {
    return items.find(item => item.key === active)?.content;
  }, [active, items]);

  const handleTabOnClick = (tab: TabItemProps) => {
    setActive(tab.itemKey);
    onChange?.(tab.itemKey);
  };

  return (
    <TabsContext.Provider
      value={{ activeTabKey: active, tabs: items, tabOnClick: handleTabOnClick, card, curTabUniqueId: uniqueId }}
    >
      <div>
        <div className={cn('relative flex items-center border-b border-gray-200', { 'gap-1': card })}>
          {items.map(({ key, ...item }) => (
            <TabItem itemKey={key} key={key} {...item} />
          ))}
        </div>
        {tabContent && <div className="mt-2">{tabContent}</div>}
      </div>
    </TabsContext.Provider>
  );
}

export default Tabs;

export type * from './types'