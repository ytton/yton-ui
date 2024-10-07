export interface MenuItemType extends Omit<MenuItemProps, 'itemKey' | 'mode' | 'children' | 'level'> {
  key: string;
  children?: MenuItemType[];
}

export interface MenuProps {
  mode?: 'horizontal' | 'vertical' | 'inline';
  items: MenuItemType[];
  defaultActiveKey?: string[];
  onSelect?: (key: string) => void;
  defaultOpenKeys?: string[];
  activeKey?: string[];
  openKeys?: string[];
}

export interface MenuItemProps {
  itemKey: string;
  label: string;
  level: number;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: MenuItemType[];
  parent?: MenuItemProps;
}
