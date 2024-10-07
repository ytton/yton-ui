import { ReactNode, useState } from 'react';
import Icon from '../Icon';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface AlertProps {
  banner?: boolean;
  closable?: boolean;
  description?: ReactNode;
  icon?: ReactNode;
  message?: ReactNode;
  showIcon?: boolean;
  type?: 'success' | 'info' | 'warning' | 'error';
  onClose?: () => void;
}

const alertClassName = cva('flex border flex-col text-sm justify-between py-2 px-3 rounded-md', {
  variants: {
    banner: {
      true: 'border-0 rounded-none'
    },
    showDesc: {
      true: 'py-4 px-5 gap-2'
    },
    type: {
      success: 'border-green-300 bg-green-100/70',
      info: 'border-blue-300 bg-blue-100/70',
      warning: 'border-yellow-300 bg-yellow-100/70',
      error: 'border-red-300 bg-red-100/70'
    }
  }
});

function Alert(props: AlertProps) {
  const { banner, closable = false, description, icon, message, showIcon = false, type = 'success', onClose } = props;
  const [closed, setClosed] = useState(false);
  const defaultIconMap = {
    success: <Icon icon="mdi-check-circle" />,
    info: <Icon icon="mdi-information-circle" />,
    warning: <Icon icon="mdi-alert-circle" />,
    error: <Icon icon="mdi-close-circle" />
  };
  const colorMap = {
    success: 'text-green-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
    error: 'text-red-500'
  };
  const showDesc = !!description && !banner;
  const realIcon = icon || defaultIconMap[type];
  return (
    <AnimatePresence>
      {!closed && (
        <motion.div
          initial={{ height: 'auto', opacity: 1 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, margin: 0, padding: 0, opacity: 0, overflow: 'hidden' }}
          className={cn(alertClassName({ banner, type, showDesc }))}
        >
          <div className="flex items-center gap-2 text-base text-black/85">
            {showIcon && <span className={cn('text-xl', colorMap[type], { 'text-2xl': showDesc })}>{realIcon}</span>}
            {message}
            {closable && (
              <Icon
                onClick={() => {
                  setClosed(true);
                  onClose?.();
                }}
                className="ml-auto cursor-pointer hover:text-black/85 text-black/45"
                icon="mdi:close"
              />
            )}
          </div>
          {description && !banner && (
            <div className={cn('text-black/65', showIcon && realIcon && 'pl-2 ml-[1.5rem]')}>{description}</div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Alert;
