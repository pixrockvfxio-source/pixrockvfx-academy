import type { ReactNode } from 'react';
import { SearchX } from 'lucide-react';

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
};

/** Consistent treatment for "nothing to show here" across filters and lists. */
export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-card border border-dashed border-line-strong bg-raised px-6 py-16 text-center">
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-raised text-subtle">
        <SearchX aria-hidden="true" className="size-5" />
      </span>
      <div>
        <p className="font-display text-lg font-semibold text-ink">{title}</p>
        {description ? <p className="mt-1.5 max-w-sm text-sm text-body">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
