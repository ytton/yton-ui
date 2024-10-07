import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utils';
import clsx from 'clsx';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none',
  {
    variants: {
      danger: {
        true: ''
      },
      type: {
        primary: 'bg-blue-500 text-white [&:not(:disabled)]:hover:bg-blue-400 [&:not(:disabled)]:active:bg-blue-600',
        default:
          'border border-gray-200  [&:not(:disabled)]:hover:border-primary [&:not(:disabled)]:hover:text-primary',
        text: 'text-gray-700 hover:bg-gray-100 ',
        link: 'text-primary hover:text-primary hover:underline'
      },
      block: {
        true: 'w-full'
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed'
      },
      size: {
        small: 'px-3 py-2',
        medium: 'px-4 py-2.5',
        large: 'px-5 py-3'
      },
      shape: {
        default: 'rounded-md',
        pill: 'rounded-full',
        square: 'w-auto aspect-square overflow-hidden',
        circle: 'rounded-full w-auto aspect-square overflow-hidden'
      }
    },
    compoundVariants: [
      {
        danger: true,
        type: 'primary',
        className: 'bg-red-500 [&:not(:disabled)]:hover:bg-red-400 [&:not(:disabled)]:active:bg-red-600'
      },
      {
        danger: true,
        type: 'default',
        className:
          'border text-red-500 border-red-500 [&:not(:disabled)]:hover:border-red-500 [&:not(:disabled)]:hover:text-red-500'
      },
      {
        danger: true,
        type: 'text',
        className: 'text-red-500 [&:not(:disabled)]:hover:bg-red-100'
      },
      {
        danger: true,
        type: 'link',
        className: 'text-red-500 hover:text-red-500'
      }
    ],
    defaultVariants: {
      danger: false,
      block: false,
      disabled: false,
      size: 'medium',
      type: 'default',
      shape: 'default'
    }
  }
);
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled'>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

function Button({
  children,
  danger,
  htmlType,
  disabled,
  type = 'default',
  block = false,
  size,
  shape,
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({
          type,
          size,
          danger,
          block,
          disabled,
          shape
        })
      )}
      type={htmlType}
      disabled={disabled as boolean}
      {...props}
    >
      {icon && <span className={clsx({ 'mr-0.5': children })}>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
