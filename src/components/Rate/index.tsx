import React, { useState } from 'react';
import Icon from '../Icon';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/utils';
import useControllableValue from '@/hooks/useControllableValue';

export interface RateProps {
  className?: string;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  count?: number;
  half?: boolean;
  defaultValue?: number;
}

const starClassName = cva('inline-block cursor-pointer hover:scale-110', {
  variants: {
    status: {
      empty: 'text-gray-300',
      half: 'text-yellow-500',
      full: 'text-yellow-500'
    },
    size: {
      small: 'text-base',
      medium: 'text-xl',
      large: 'text-2xl'
    },
    disabled: {
      true: 'pointer-events-none'
    }
  },
  defaultVariants: {
    status: 'empty',
    size: 'medium',
    disabled: false
  }
});

function Rate(props: RateProps) {
  const { disabled, size, count = 5, half, className, onChange } = props;

  const [value, setValue] = useControllableValue(0, props);
  const [hoverValue, setHoverValue] = useState<null | number>(null);

  const handleOnClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, val: number) => {
    if (disabled) return;
    const { left, width } = (e.target as HTMLElement).getBoundingClientRect();
    const clickPosition = e.clientX - left;
    const isClickHalf = clickPosition < width / 2;
    const newValue = half && isClickHalf ? val - 0.5 : val;
    setValue(newValue);
    onChange?.(newValue);
  };

  const onMouseEnter = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, val: number) => {
    if (disabled) return;
    const { left, width } = (e.target as HTMLElement).getBoundingClientRect();
    const clickPosition = e.clientX - left;
    const isClickHalf = clickPosition < width / 2;
    const newValue = half && isClickHalf ? val - 0.5 : val;
    setHoverValue(newValue);
  };

  const getStatus = (val: number) => {
    const compareVal = hoverValue ?? value;
    if (val <= compareVal) return 'full';
    if (val === compareVal + 0.5 && half) return 'half';
    return 'empty';
  };
  const iconMap = {
    full: 'mdi:star',
    half: 'mdi:star-half-full',
    empty: 'mdi:star'
  };

  return (
    <div className={cn('flex items-center', className)}>
      {Array.from({ length: count || 5 }).map((_, i) => {
        const status = getStatus(i + 1);
        return (
          <Icon
            onMouseEnter={e => onMouseEnter(e, i + 1)}
            onMouseLeave={() => setHoverValue(null)}
            onMouseOver={e => onMouseEnter(e, i + 1)}
            className={starClassName({ status, size, disabled })}
            key={i}
            icon={iconMap[status]}
            onClick={e => handleOnClick(e, i + 1)}
          />
        );
      })}
    </div>
  );
}

export default Rate;
