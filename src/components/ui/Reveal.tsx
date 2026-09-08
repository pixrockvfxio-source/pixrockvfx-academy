import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/cn';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger helper — multiplied by 60ms. */
  index?: number;
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
} & Omit<HTMLMotionProps<'div'>, 'children' | 'className'>;

/**
 * Scroll-triggered entrance animation.
 *
 * Animates once, only when the element enters the viewport, and collapses to a
 * plain fade-free render when the visitor prefers reduced motion.
 */
export function Reveal({ children, className, index = 0, delay = 0, y = 18, as = 'div', ...rest }: RevealProps) {
  const reduceMotion = useReducedMotion();
  // Cast keeps a single prop type for every element we render as.
  const Component = motion[as] as typeof motion.div;

  if (reduceMotion) {
    const Static = as;
    return <Static className={cn(className)}>{children}</Static>;
  }

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -60px 0px' }}
      transition={{
        duration: 0.55,
        delay: delay + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
