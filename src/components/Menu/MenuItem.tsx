import { cn } from '@/utils/utils';
import { cva } from 'class-variance-authority';
import { forwardRef, useContext } from 'react';
import { MenuContext } from './context';
import { MenuItemProps } from './types';
import SubMenu from './SubMenu';

const menuItemClassName = cva('group relative flex items-center gap-1 cursor-pointer m-0', {
  variants: {
    mode: {
      horizontal: 'border-b-2 py-2 border-transparent hover:border-blue-500 px-1',
      vertical: 'py-2 px-2 hover:bg-gray-200 rounded-sm',
      inline: 'py-2 px-2 hover:bg-gray-200 rounded-sm'
    },
    disabled: {
      true: 'text-gray-400 !border-transparent cursor-not-allowed !bg-transparent',
      false: 'text-gray-900'
    },
    active: {
      true: 'text-blue-500',
      false: ''
    }
  },
  compoundVariants: [
    {
      mode: 'horizontal',
      active: true,
      class: 'border-blue-500'
    },
    {
      mode: 'vertical',
      active: true,
      class: '!bg-blue-100'
    }
  ],
  defaultVariants: {
    disabled: false
  }
});
const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
  const { level, itemKey, label, icon, children, disabled, ...restProps } = props;
  const { mode, onItemClick, activeKeys } = useContext(MenuContext);
  const isActive = activeKeys.lastIndexOf(itemKey) > -1;
  if (children && children.length > 0) return <SubMenu {...props} ref={ref} />;

  return (
    <li
      ref={ref}
      onClick={e => {
        e.stopPropagation();
        if (disabled) return;
        onItemClick?.(itemKey, props);
      }}
      className={cn(menuItemClassName({ disabled, mode, active: isActive }))}
      {...restProps}
    >
      {mode === 'inline' && <div style={{ width: level * 16 + 'px' }}></div>}
      {icon}
      {label}
    </li>
  );
});

export default MenuItem;
