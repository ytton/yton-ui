import { cn } from '@/utils/utils';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { TabsContext } from './context';
import { TabItemProps } from './types';

const tabItemClassName = cva('relative flex items-center gap-1 px-4 py-2 cursor-pointer hover:text-blue-500', {
  variants: {
    active: {
      true: 'text-blue-500'
    },
    disabled: {
      true: 'cursor-not-allowed hover:text-gray-300 text-gray-300'
    },
    card: {
      true: 'bg-gray-50 border border-gray-200 mb-[-1px] rounded-t-md'
    }
  },
  compoundVariants: [
    {
      active: true,
      card: true,
      className: 'bg-white border-b-white'
    }
  ],
  defaultVariants: {
    active: false
  }
});

function TabItem(props: TabItemProps) {
  const { label, icon, itemKey, disabled } = props;
  const { tabOnClick, activeTabKey, card, curTabUniqueId } = useContext(TabsContext);
  return (
    <div
      onClick={e => {
        if (disabled) return;
        tabOnClick(props, e);
      }}
      data-tab-key={itemKey}
      className={cn(tabItemClassName({ active: activeTabKey === itemKey, disabled, card }))}
    >
      {icon}
      {label}
      {!card && activeTabKey === itemKey && (
        <motion.div className="h-[2px] w-full bg-blue-500 absolute bottom-0 left-0 right-0" layoutId={curTabUniqueId} />
      )}
    </div>
  );
}

export default TabItem;
