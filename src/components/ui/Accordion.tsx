import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { Faq } from '@/types/content';

type Props = {
  items: Faq[];
  className?: string;
};

/**
 * Accessible FAQ accordion. Uses native buttons with aria-expanded and
 * aria-controls, and grid-template-rows for a transition that works without
 * measuring heights in JavaScript.
 */
export function Accordion({ items, className }: Props) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <div className={cn('divide-y divide-ink-700 overflow-hidden rounded-card border border-ink-700', className)}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question} className={cn('bg-ink-900/60 transition-colors', open && 'bg-ink-850')}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ink-800/60 sm:px-6 sm:py-5"
              >
                <span className="font-display text-base font-semibold text-chalk sm:text-lg">{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 size-5 shrink-0 text-ember-400 transition-transform duration-300',
                    open && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-out',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm/relaxed text-mist sm:px-6 sm:pb-6 sm:text-base/relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
