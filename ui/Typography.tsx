import { twMerge } from 'tailwind-merge';
/** Supported HTML elements for typography components */
type HtmlElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'strong'
  | 'em'
  | 'small'
  | 'blockquote'
  | 'code'
  | 'pre'
  | 'label';

/** Text alignment options */
type Align =
  /** Left align */
  | 'left'
  /** Center align */
  | 'center'
  /** Right align */
  | 'right'
  /** Justify text */
  | 'justify';

/** Bottom margin spacing options */
type Margin =
  /** No margin */
  | 'none'
  /** Small margin (0.5rem) */
  | 'small'
  /** Medium margin (1rem) */
  | 'medium'
  /** Large margin (1.5rem) */
  | 'large'
  /** Extra large margin (2rem) */
  | 'xl'
  /** 2x large margin (3rem) */
  | '2xl';

/** Font weight options */
type Weight =
  /** Normal weight (400) */
  | 'normal'
  /** Medium weight (500) */
  | 'medium'
  /** Semi-bold weight (600) */
  | 'semibold'
  /** Bold weight (700) */
  | 'bold'
  /** Extra bold weight (800) */
  | 'extrabold';
/** Font size options with rem and pixel values */
type Size =
  /** Extra small: 0.75rem (12px) */
  | 'xs'
  /** Small: 0.875rem (14px) */
  | 'sm'
  /** Base: 1rem (16px) */
  | 'base'
  /** Large: 1.125rem (18px) */
  | 'lg'
  /** Extra large: 1.25rem (20px) */
  | 'xl'
  /** 2x large: 1.5rem (24px) */
  | '2xl'
  /** 3x large: 1.875rem (30px) */
  | '3xl'
  /** 4x large: 2.25rem (36px) */
  | '4xl'
  /** 5x large: 3rem (48px) */
  | '5xl'
  /** 6x large: 3.75rem (60px) */
  | '6xl';

interface BaseTypographyProps {
  /** Content to be rendered inside the typography component */
  children: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /**
   * Text alignment
   * @default 'left'
   */
  align?: Align;
  /**
   * Bottom margin spacing
   * @default 'none'
   */
  margin?: Margin;
  /**
   * Font weight
   * @default 'normal'
   */
  weight?: Weight;
  /**
   * Font size with pixel equivalents
   * @default 'base'
   * @example 'xs' // 0.75rem (12px)
   * @example 'sm' // 0.875rem (14px)
   * @example 'base' // 1rem (16px)
   * @example 'lg' // 1.125rem (18px)
   * @example 'xl' // 1.25rem (20px)
   * @example '2xl' // 1.5rem (24px)
   * @example '3xl' // 1.875rem (30px)
   * @example '4xl' // 2.25rem (36px)
   * @example '5xl' // 3rem (48px)
   * @example '6xl' // 3.75rem (60px)
   */
  size?: Size;
  /** Text color (Tailwind CSS class) */
  color?: string;
  /** HTML element to render as */
  as?: HtmlElement;
}

const Typography = ({
  children,
  className,
  align = 'left',
  margin = 'none',
  weight = 'normal',
  size = 'base',
  color = 'text-gray-800',
  as = 'p',
  ...props
}: BaseTypographyProps & React.HTMLAttributes<HTMLElement>) => {
  const Tag = as;

  const classes = twMerge(
    'block',
    align === 'center' && 'text-center',
    align === 'left' && 'text-left',
    align === 'right' && 'text-right',
    align === 'justify' && 'text-justify',
    weight === 'normal' && 'font-normal',
    weight === 'medium' && 'font-medium',
    weight === 'semibold' && 'font-semibold',
    weight === 'bold' && 'font-bold',
    weight === 'extrabold' && 'font-extrabold',
    size === 'xs' && 'text-xs',
    size === 'sm' && 'text-sm',
    size === 'base' && 'text-base',
    size === 'lg' && 'text-lg',
    size === 'xl' && 'text-xl',
    size === '2xl' && 'text-2xl',
    size === '3xl' && 'text-3xl',
    size === '4xl' && 'text-2xl md:text-4xl',
    size === '5xl' && 'text-5xl',
    size === '6xl' && 'text-6xl',
    margin === 'none' && 'mb-0',
    margin === 'small' && 'mb-2',
    margin === 'medium' && 'mb-4',
    margin === 'large' && 'mb-6',
    margin === 'xl' && 'mb-8',
    margin === '2xl' && 'mb-12',
    color,
    className,
  );

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};
interface HeadingProps extends Omit<BaseTypographyProps, 'as | size'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading = ({
  level = 1,
  weight = 'bold',
  margin = 'large',
  ...props
}: HeadingProps) => {
  const Tag = `h${level}` as HtmlElement;

  const defaultSize: Size = (() => {
    switch (level) {
      case 1:
        return '4xl' as Size;
      case 2:
        return '3xl' as Size;
      case 3:
        return '2xl' as Size;
      case 4:
        return 'xl' as Size;
      case 5:
        return 'lg' as Size;
      case 6:
        return 'base' as Size;
      default:
        return '4xl' as Size;
    }
  })();

  return (
    <Typography
      as={Tag}
      weight={weight}
      size={defaultSize}
      margin={margin}
      {...props}
    />
  );
};

const Paragraph = ({
  size = 'base',
  margin = 'medium',
  color = 'text-gray-600',
  ...props
}: Omit<BaseTypographyProps, 'as'>) => {
  return (
    <Typography as='p' size={size} margin={margin} color={color} {...props} />
  );
};

/**
 * Small text component with default styling
 * @param size - Font size (default: 'sm' = 0.875rem/14px)
 * @param margin - Bottom margin (default: 'small' = 0.5rem)
 * @param color - Text color (default: 'text-gray-500')
 */
const Small = ({
  size = 'sm',
  margin = 'small',
  color = 'text-gray-500',
  ...props
}: Omit<BaseTypographyProps, 'as'>) => {
  return (
    <Typography
      as='small'
      size={size}
      margin={margin}
      color={color}
      {...props}
    />
  );
};

const Strong = ({
  weight = 'bold',
  ...props
}: Omit<BaseTypographyProps, 'as'>) => {
  return <Typography as='strong' weight={weight} margin='none' {...props} />;
};

const Code = ({
  size = 'sm',
  color = 'text-red-600',
  className,
  ...props
}: Omit<BaseTypographyProps, 'as'>) => {
  return (
    <Typography
      as='code'
      size={size}
      margin='none'
      color={color}
      className={twMerge(
        'bg-gray-100 px-1 py-0.5 rounded font-mono',
        className,
      )}
      {...props}
    />
  );
};

export {
  Typography,
  Heading,
  Paragraph,
  Small,
  Strong,
  Code,
  type BaseTypographyProps,
  type HtmlElement,
  type Align,
  type Margin,
  type Weight,
  type Size,
};
