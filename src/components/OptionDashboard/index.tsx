import { clsx } from 'clsx';
import { Box, Layers, LayoutDashboard } from 'lucide-react';

interface ButtonProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  title: string;
  variant: 'dashboard' | 'products' | 'materials';
  icon?: string;
  active: boolean;
}

export const OptionDashboard = ({
  title,
  variant,
  className,
  active,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        'default-button',
        active
          ? 'bg-erp-brand hover:bg-none'
          : 'bg-none hover:bg-erp-brand-hover',
        'flex text-white',
        'mb-3.5',
        'max-w-52.5 w-full',
        'font-bold ',
        className,
      )}
    >
      {variant === 'dashboard' ? (
        <LayoutDashboard size={24} color="#ffffff" />
      ) : variant === 'products' ? (
        <Box size={24} color="#ffffff" />
      ) : (
        <Layers size={24} color="#ffffff" />
      )}

      <span className="ml-2">{title}</span>
    </button>
  );
};
