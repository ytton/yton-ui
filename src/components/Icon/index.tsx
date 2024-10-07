import { Icon as IconifyIcon, type IconProps as IconifyIconProps } from '@iconify/react';

export interface IconProps extends IconifyIconProps {
  className?: string;
}
const Icon = (props: IconProps) => {
  return <IconifyIcon {...props}/>;
};

export default Icon;
