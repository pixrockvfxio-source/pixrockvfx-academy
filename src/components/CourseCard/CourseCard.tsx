import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Signal, Monitor } from 'lucide-react';
import type { Course } from '@/types/content';
import { media } from '@/config/media';
import { Media } from '@/components/ui/Media';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

type Props = {
  course: Course;
  className?: string;
};

export function CourseCard({ course, className }: Props) {
  const banner = media.courses[course.slug];
  const accent = course.accent === 'ember' ? 'ember' : 'signal';

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-ink-700 bg-ink-900/70',
        'transition-[transform,border-color,box-shadow] duration-300 ease-out',
        'hover:-translate-y-1 hover:border-ink-600 hover:shadow-lift focus-within:-translate-y-1 focus-within:border-ink-600',
        className,
      )}
    >
      <div className="relative overflow-hidden">
        {banner ? (
          <Media
            media={banner}
            aspect="aspect-[16/10]"
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
            className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="aspect-[16/10] bg-ink-850" />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-ink-900 via-ink-900/25 to-transparent"
        />
        <div className="absolute top-3.5 left-3.5">
          <Badge tone={accent}>{course.track}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold tracking-tight text-chalk">
          <Link to={`/courses/${course.slug}`} className="before:absolute before:inset-0 before:content-['']">
            {course.title}
          </Link>
        </h3>
        <p className="mt-2.5 flex-1 text-sm/relaxed text-mist">{course.summary}</p>

        <dl className="mt-5 grid grid-cols-1 gap-2.5 border-t border-ink-800 pt-4 text-xs text-slate-muted sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Clock aria-hidden="true" className="size-3.5 text-ember-400" />
            <dt className="sr-only">Duration</dt>
            <dd>{course.duration}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Signal aria-hidden="true" className="size-3.5 text-ember-400" />
            <dt className="sr-only">Level</dt>
            <dd>{course.level}</dd>
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <Monitor aria-hidden="true" className="size-3.5 text-ember-400" />
            <dt className="sr-only">Software</dt>
            <dd className="truncate">{course.software.slice(0, 3).join(' · ')}</dd>
          </div>
        </dl>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ember-400 transition-colors group-hover:text-ember-300">
          Learn more
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
