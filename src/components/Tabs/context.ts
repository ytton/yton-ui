import { TabItemProps, TabItemType } from './types';
import { createContext } from 'react';

export const TabsContext = createContext<{
  activeTabKey: string;
  tabs: TabItemType[];
  tabOnClick: (tab: TabItemProps, e: React.MouseEvent) => void;
  card: boolean;
  curTabUniqueId: string;
}>({
  activeTabKey: '',
  tabs: [],
  tabOnClick: () => {},
  card: false,
  curTabUniqueId: ''
});
