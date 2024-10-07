import { cn } from '@/utils/utils';
import { cva } from 'class-variance-authority';
import { useEffect, useRef, useState } from 'react';
import MenuItem from './MenuItem';
import { MenuContext } from './context';
import { MenuItemProps, MenuProps } from './types';

const menuClassNames = cva('flex relative ', {
  variants: {
    mode: {
      horizontal: 'flex-row border-b gap-5',
      vertical: 'flex-col border-r p-1 gap-1',
      inline: 'flex-col border-r p-1 gap-1'
    }
  },
  defaultVariants: {
    mode: 'horizontal'
  }
});

function Menu(props: MenuProps) {
  const {
    mode = 'horizontal',
    items = [],
    defaultActiveKey = [],
    onSelect,
    defaultOpenKeys = [],
    activeKey = [],
    openKeys = []
  } = props;
  const menuRef = useRef<HTMLUListElement>(null);
  const [activeKeysState, setActiveKeysState] = useState<string[]>(activeKey || defaultActiveKey);

  const [openKeysState, setOpenKeysState] = useState<string[]>(openKeys || defaultOpenKeys);
  const getAllKey = (item: MenuItemProps) => {
    let curItem = { ...item };
    const keys = [item.itemKey];
    while (curItem.parent) {
      curItem = curItem.parent;
      keys.push(curItem.itemKey);
    }
    return keys;
  };
  const onItemClick = (key: string, item: MenuItemProps) => {
    const keys = getAllKey(item);
    setActiveKeysState(keys);
    if (mode === 'vertical') setOpenKeysState([]);
    if (mode === 'horizontal') setOpenKeysState([]);
    if (onSelect) {
      onSelect(key);
    }
  };
  const onSuMenuClick = (key: string) => {
    setOpenKeysState(keys => {
      if (keys.includes(key)) {
        return keys.filter(item => item !== key);
      }
      return [...keys, key];
    });
  };
  useEffect(() => {
    if (mode === 'inline') return;
    const handleOnClick = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!menuRef.current?.contains(e.target)) {
          setOpenKeysState([]);
        }
      }
    };
    document.addEventListener('click', handleOnClick);
    return () => {
      document.removeEventListener('click', handleOnClick);
    };
  });
  return (
    <MenuContext.Provider
      value={{ mode, activeKeys: activeKeysState, openKeys: openKeysState, onItemClick, onSuMenuClick }}
    >
      <ul ref={menuRef} className={cn(menuClassNames({ mode }))}>
        {items.map(({ key, ...item }) => (
          <MenuItem level={0} key={key} itemKey={key} {...item} />
        ))}
      </ul>
    </MenuContext.Provider>
  );
}
export default Menu;

export type * from './types'
