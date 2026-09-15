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

/**
 * Contrast is the constraint here, not taste. The bright brand orange carries
 * only ~2.9:1 against white, so the solid button uses ember-600 (5.4:1 with
 * white text) and the outline variant puts its label in ember-700 (7.4:1 on
 * canvas). The bright tones stay for decoration.
 */
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ember-600 text-white font-semibold shadow-soft hover:bg-ember-700 hover:shadow-glow',
  secondary: 'bg-surface text-ink border border-line-strong shadow-soft hover:border-subtle hover:bg-raised',
  outline: 'border border-ember-600/40 text-ember-700 hover:border-ember-600 hover:bg-ember-50',
  ghost: 'text-body hover:text-ink hover:bg-raised',
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
