import { cn } from '@/utils/utils';
import { cva } from 'class-variance-authority';
import { forwardRef, useContext } from 'react';
import { MenuContext } from './context';
import { MenuItemProps } from './types';
import MenuItem from './MenuItem';
import Icon from '../Icon';
import clsx from 'clsx';

const subMenuClassName = cva('flex items-center gap-1 cursor-pointer m-0', {
  variants: {
    mode: {
      horizontal: 'border-b-2 py-2 border-transparent hover:border-blue-500 px-1',
      vertical: 'hover:bg-gray-200 rounded-sm p-2 w-full relative',
      inline: 'hover:bg-gray-200 rounded-sm p-2 w-full'
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
    }
  ],
  defaultVariants: {
    disabled: false
  }
});

const SubMenu = forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
  const { level, itemKey, label, icon, children, disabled, ...restProps } = props;
  const { mode, onSuMenuClick, openKeys, activeKeys } = useContext(MenuContext);
  const isOpen = openKeys.includes(itemKey);
  const isActive = activeKeys.lastIndexOf(itemKey) > -1;
  const getChildren = () => {
    if (!children) return;
    if (mode === 'horizontal') {
      return (
        <div
          className={cn('absolute z-10 pt-1.5 whitespace-nowrap top-100%', [
            {
              hidden: !isOpen
            },
            level > 0 && 'top-0 left-full'
          ])}
        >
          <ul className="flex flex-col gap-1 p-1 bg-white border border-gray-100 rounded-sm shadow-sm">
            {children.map(({ key, ...child }) => {
              return <MenuItem level={level + 1} parent={props} itemKey={key} key={key} {...child} />;
            })}
          </ul>
        </div>
      );
    }
    if (mode === 'vertical') {
      return (
        <div
          className={clsx('absolute left-full z-10 pl-1.5 whitespace-nowrap top-0', {
            hidden: !isOpen
          })}
        >
          <ul className="flex flex-col gap-1 p-1 bg-white border border-gray-100 rounded-sm shadow-sm">
            {children.map(({ key, ...child }) => {
              return <MenuItem level={level + 1} parent={props} itemKey={key} key={key} {...child} />;
            })}
          </ul>
        </div>
      );
    }
    return (
      <ul
        className={clsx('flex flex-col gap-1 transition overflow-hidden rounded-sm ', [
          isOpen ? 'h-full opacity-100 mt-1' : 'h-0 opacity-0 absolute',
          level === 0 && 'p-1',
          {
            'bg-gray-200/20': level === 0,
            'bg-gray-200/40': level === 1,
            'bg-gray-200/60': level === 2,
            'bg-gray-200/80': level === 3,
            'bg-gray-200/100': level === 4
          }
        ])}
      >
        {children.map(({ key, ...child }) => {
          return <MenuItem parent={props} level={level + 1} itemKey={key} key={key} {...child} />;
        })}
      </ul>
    );
  };
  const getItem = () => {
    if (mode === 'horizontal') {
      return (
        <li ref={ref} className="relative" {...restProps}>
          <div
            onClick={e => {
              e.stopPropagation();
              onSuMenuClick?.(itemKey);
            }}
            className={cn(subMenuClassName({ disabled, mode, active: isActive }))}
          >
            {icon}
            {label}
            <Icon
              icon={level === 0 ? 'mdi:menu-down' : 'mdi:menu-right'}
              className={clsx('ml-auto ease-in-out transition-transform')}
            />
          </div>
          {getChildren()}
        </li>
      );
    }
    if (mode === 'vertical') {
      return (
        <li ref={ref} {...restProps} className="relative w-full">
          <div
            onClick={e => {
              e.stopPropagation();
              onSuMenuClick?.(itemKey);
            }}
            className={cn(subMenuClassName({ disabled, mode, active: isActive }))}
          >
            {icon}
            {label}
            <Icon icon="mdi:menu-right" className={clsx('ml-auto ease-in-out transition-transform')} />
          </div>
          {getChildren()}
        </li>
      );
    }
    return (
      <li ref={ref} {...restProps}>
        <div
          onClick={e => {
            e.stopPropagation();
            onSuMenuClick?.(itemKey);
          }}
          className={cn(subMenuClassName({ disabled, mode, active: isActive }))}
        >
          <div style={{ width: level * 16 + 'px' }}></div>
          {icon}
          {label}
          <Icon
            icon="mdi:menu-down"
            className={clsx('ml-auto ease-in-out transition-transform', { 'rotate-180': isOpen })}
          />
        </div>
        {getChildren()}
      </li>
    );
  };
  return getItem();
});

export default SubMenu;
