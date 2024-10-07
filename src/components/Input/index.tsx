import useControllableValue from '@/hooks/useControllableValue';
import { cn } from '@/utils/utils';
import { cva } from 'class-variance-authority';
import { ChangeEvent, ReactNode } from 'react';

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'prefix' | 'defaultChecked' | 'defaultValue' | 'value'
  > {
  size?: 'small' | 'medium' | 'large';
  prefix?: ReactNode;
  suffix?: ReactNode;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  value?: string;
  status?: 'default' | 'error' | 'warning';
  defaultValue?: string;
}
const inputInnerClassName = cva('inline-flex flex-1 py-2 px-3 border items-center rounded-md', {
  variants: {
    status: {
      default: 'border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100',
      error: 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100',
      warning: 'border-yellow-500 focus-within:border-yellow-500 focus-within:ring-2 focus-within:ring-yellow-100'
    },
    addonBefore: {
      true: 'rounded-l-none'
    },
    addonAfter: {
      true: 'rounded-r-none'
    },
    size: {
      medium: 'text-sm',
      small: 'text-sm py-1 px-2',
      large: 'text-base py-2 px-4'
    }
  },
  defaultVariants: {
    status: 'default',
    size: 'medium'
  }
});

const sizeClassNames = cva('', {
  variants: {
    size: {
      medium: 'text-sm',
      small: 'text-sm py-1 px-2',
      large: 'text-base py-2 px-4'
    }
  }
});
const inputOuterClassName = cva('inline-flex items-center rounded-md', {
  variants: {
    disabled: {
      true: 'bg-gray-100 cursor-not-allowed'
    }
  }
});
function Input(props: InputProps) {
  const {
    size = 'medium',
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    value,
    style,
    defaultValue,
    onChange,
    disabled,
    className,
    status = 'default',
    ...restProps
  } = props;
  const [state, setState] = useControllableValue<string | undefined>(undefined, {
    value: value,
    defaultValue: defaultValue
  });
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    setState(e.target.value);
    onChange?.(e);
  };
  const iconColorMap = {
    default: 'text-gray-500',
    warning: 'text-yellow-500',
    error: 'text-red-500'
  };
  return (
    <div className={cn(inputOuterClassName({ disabled }), className)} style={style}>
      {addonBefore && (
        <div
          className={cn(
            'px-3 py-2 border border-r-0 border-gray-300 bg-gray-100/80 rounded-l-md',
            { 'pointer-events-none': disabled },
            sizeClassNames({ size })
          )}
        >
          {addonBefore}
        </div>
      )}
      <div
        className={cn(
          inputInnerClassName({ addonBefore: !!addonBefore, addonAfter: !!addonAfter, status }),
          sizeClassNames({ size })
        )}
      >
        {prefix && (
          <span className={cn('mr-1', iconColorMap[status], { 'pointer-events-none': disabled })}>{prefix}</span>
        )}
        <input
          value={state}
          onChange={handleOnchange}
          type="text"
          disabled={disabled}
          className="w-full border-none outline-none focus-visible:outline-none disabled:bg-transparent disabled:cursor-not-allowed"
          {...restProps}
        />
        {suffix && (
          <span className={cn('ml-1', iconColorMap[status], { 'pointer-events-none': disabled })}>{suffix}</span>
        )}
      </div>
      {addonAfter && (
        <div
          className={cn(
            'px-3 py-2 border border-l-0 border-gray-300 bg-gray-100/80 rounded-r-md',
            { 'pointer-events-none': disabled },
            sizeClassNames({ size })
          )}
        >
          {addonAfter}
        </div>
      )}
    </div>
  );
}

export default Input;
