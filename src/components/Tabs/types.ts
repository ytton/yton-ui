export interface TabsProps {
  items: TabItemType[];
  activeKey?: string;
  defaultActiveKey?: string;
  card?: boolean;
  onChange?: (key: string) => void;
}
export interface TabItemProps {
  itemKey: string;
  disabled?: boolean;
  label?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}
export interface TabItemType extends Omit<TabItemProps, 'itemKey'> {
  key: string;
}
