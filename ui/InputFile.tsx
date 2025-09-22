import { twMerge } from 'tailwind-merge';
import { Variant } from './types';

interface InputFileProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept: string;
  required: boolean;
  id: string;
  name: string;
  variant?: Variant;
  className?: string;
  ref: React.RefObject<HTMLInputElement>;
}

export default function InputFile({
  onChange,
  accept,
  required,
  id,
  name,
  variant = 'primary',
  className,
  ref,
}: InputFileProps) {
  const variantClasses = twMerge(
    'block w-full text-sm text-gray-500',
    'file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-bold file:cursor-pointer',
    'file:bg-primary-2 file:text-primary-6 file:hover:bg-primary-100 file:transition file:duration-150 file:ease-in-out',
    variant === 'secondary' && 'file:bg-secondary-2 file:text-secondary-6',
    variant === 'tertiary' && 'file:bg-accent-2 file:text-accent-6',
    variant === 'success' && 'file:bg-success-2 file:text-success-6',
    variant === 'warning' && 'file:bg-warning-2 file:text-warning-6',
    variant === 'error' && 'file:bg-error-2 file:text-error-6',
    className,
  );
  return (
    <input
      id={id}
      name={name}
      type='file'
      accept={accept}
      onChange={onChange}
      className={variantClasses}
      required={required}
      ref={ref}
    />
  );
}

export type { InputFileProps };
