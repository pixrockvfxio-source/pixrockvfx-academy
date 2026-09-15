import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  tone?: 'neutral' | 'ember' | 'signal' | 'onMedia';
  className?: string;
};

/**
 * Badges appear in two very different places: on paper, and on top of dark
 * artwork. A single palette cannot serve both — tinted text that reads well on
 * white disappears over an image, and vice versa. `onMedia` is the variant for
 * anything sitting over a picture.
 */
const tones = {
  neutral: 'border-line bg-raised text-body',
  ember: 'border-ember-600/25 bg-ember-50 text-ember-700',
  signal: 'border-signal-500/25 bg-signal-50 text-signal-600',
  onMedia: 'border-white/25 bg-black/45 text-white backdrop-blur-sm',
};

export function Badge({ children, tone = 'neutral', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
