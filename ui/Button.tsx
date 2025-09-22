import { twMerge } from 'tailwind-merge';
import { Variant } from './types';

export default function Button({
  children,
  variant,
  className,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  className?: string;
  type?: 'submit' | 'button';
}) {
  const variantClasses = twMerge(
    'px-6 py-2 text-white font-semibold rounded-md shadow-sm transition duration-150 ease-in-out bg-primary-6 hover:bg-primary-7',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variant === 'primary' && 'bg-primary-6 hover:bg-primary-7',
    variant === 'secondary' && 'bg-secondary-6 hover:bg-secondary-7',
    variant === 'tertiary' && 'bg-accent-6 hover:bg-accent-7',
    variant === 'success' && 'bg-success-6 hover:bg-success-7',
    variant === 'warning' && 'bg-warning-6 hover:bg-warning-7',
    variant === 'error' && 'bg-error-6 hover:bg-error-7',
    className,
  );
  return (
    <button className={variantClasses} {...props}>
      {children}
    </button>
  );
}
