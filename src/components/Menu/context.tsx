import { createContext } from 'react';
import { MenuItemProps } from './types';

export const MenuContext = createContext<{
  mode: 'horizontal' | 'vertical' | 'inline';
  activeKeys: string[];
  openKeys: string[];
  onItemClick?: (key: string, item: MenuItemProps) => void;
  onSuMenuClick?: (key: string) => void;
}>({
  mode: 'horizontal',
  activeKeys: [],
  openKeys: [],
  onItemClick: () => {},
  onSuMenuClick: () => {}
});
