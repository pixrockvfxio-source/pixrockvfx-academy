import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

export type Crumb = { label: string; to?: string };

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/**
 * Shared inner-page header. Clears the fixed navigation, carries the
 * breadcrumb trail and keeps the h1 treatment consistent across pages.
 */
export function PageHero({ eyebrow, title, description, crumbs, actions, children, className }: Props) {
  return (
    <section className={cn('relative isolate overflow-hidden border-b border-ink-800', className)}>
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 opacity-25 mask-fade-b" />
        <div className="absolute -top-32 left-1/4 size-[28rem] rounded-full bg-ember-600/12 blur-[120px]" />
        <div className="absolute -right-24 -bottom-24 size-80 rounded-full bg-signal-600/10 blur-[120px]" />
      </div>

      <div className="container-page pt-32 pb-14 lg:pt-40 lg:pb-20">
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-muted">
              {crumbs.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-ember-300">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-mist">
                      {crumb.label}
                    </span>
                  )}
                  {index < crumbs.length - 1 ? (
                    <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-4 text-xs font-semibold tracking-[0.24em] text-ember-400 uppercase">{eyebrow}</p>
          ) : null}
          <h1 className="text-display text-chalk">{title}</h1>
          {description ? (
            <div className="mt-5 text-base/relaxed text-mist sm:text-lg/relaxed">{description}</div>
          ) : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </Reveal>

        {children}
      </div>
    </section>
  );
}
