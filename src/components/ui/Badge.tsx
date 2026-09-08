import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  tone?: 'neutral' | 'ember' | 'signal';
  className?: string;
};

const tones = {
  neutral: 'border-ink-600 bg-ink-800/70 text-mist',
  ember: 'border-ember-500/35 bg-ember-500/10 text-ember-300',
  signal: 'border-signal-500/35 bg-signal-500/10 text-signal-300',
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
