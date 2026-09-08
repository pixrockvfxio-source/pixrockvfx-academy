import { Quote } from 'lucide-react';
import type { Testimonial } from '@/types/content';
import { cn } from '@/lib/cn';

type Props = {
  testimonial: Testimonial;
  className?: string;
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase();
}

export function TestimonialCard({ testimonial, className }: Props) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col rounded-card border border-ink-700 bg-ink-900/70 p-6 transition-colors duration-300 hover:border-ink-600 sm:p-7',
        className,
      )}
    >
      <Quote aria-hidden="true" className="size-7 text-ember-500/70" />
      <blockquote className="mt-4 flex-1 text-sm/relaxed text-mist sm:text-base/relaxed">
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3.5 border-t border-ink-800 pt-5">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt=""
            width={44}
            height={44}
            loading="lazy"
            decoding="async"
            className="size-11 rounded-full object-cover ring-1 ring-ink-600"
          />
        ) : (
          <span
            aria-hidden="true"
            className="inline-flex size-11 items-center justify-center rounded-full bg-linear-to-br from-ember-500/25 to-signal-500/25 font-display text-sm font-bold text-chalk ring-1 ring-ink-600"
          >
            {initials(testimonial.name)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block truncate font-display text-sm font-semibold text-chalk">{testimonial.name}</span>
          <span className="block truncate text-xs text-slate-muted">{testimonial.course}</span>
        </span>
      </figcaption>
    </figure>
  );
}
