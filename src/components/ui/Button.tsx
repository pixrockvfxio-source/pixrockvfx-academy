import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-out ' +
  'disabled:pointer-events-none disabled:opacity-50 active:translate-y-px whitespace-nowrap';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-ember-500 text-ink-950 font-semibold shadow-soft hover:bg-ember-400 hover:shadow-glow',
  secondary:
    'bg-ink-800/80 text-chalk border border-ink-600 backdrop-blur-sm hover:bg-ink-700 hover:border-ink-500',
  outline:
    'border border-ember-500/45 text-ember-300 hover:border-ember-400 hover:bg-ember-500/10 hover:text-ember-100',
  ghost: 'text-mist hover:text-chalk hover:bg-ink-800/70',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-13 px-7 text-base',
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  /** Renders a react-router <Link>. */
  to?: string;
  /** Renders an <a>; external links get rel/target automatically. */
  href?: string;
  fullWidth?: boolean;
};

type ButtonProps = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

/**
 * The single button primitive for the whole site. Renders a <Link>, an <a> or
 * a <button> depending on the props given, so styling never has to be
 * duplicated across element types.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, to, href, fullWidth, ...rest },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:|^mailto:|^tel:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external && !href.startsWith('mailto:') && !href.startsWith('tel:')
          ? { target: '_blank', rel: 'noreferrer noopener' }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button ref={ref} type="button" className={classes} {...rest}>
      {children}
    </button>
  );
});
