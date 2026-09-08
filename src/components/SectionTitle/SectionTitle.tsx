import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/ui/Reveal';

type Props = {
  /** Small label above the heading. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Heading level — keeps the document outline correct on every page. */
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  id?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
  className,
  id,
}: Props) {
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p className="mb-3 flex items-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-ember-400 uppercase">
          <span aria-hidden="true" className="h-px w-6 bg-ember-500/60" />
          {eyebrow}
        </p>
      ) : null}
      <Heading id={id} className="text-display text-chalk">
        {title}
      </Heading>
      {description ? <div className="mt-4 text-base/relaxed text-mist sm:text-lg/relaxed">{description}</div> : null}
    </Reveal>
  );
}
