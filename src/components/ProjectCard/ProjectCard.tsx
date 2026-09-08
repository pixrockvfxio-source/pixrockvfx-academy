import { Play, Maximize2 } from 'lucide-react';
import type { Project } from '@/types/content';
import { media } from '@/config/media';
import { Media } from '@/components/ui/Media';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

type Props = {
  project: Project;
  onOpen: (project: Project) => void;
  className?: string;
};

export function ProjectCard({ project, onOpen, className }: Props) {
  const still = media.projects[project.id];
  const hasVideo = Boolean(project.videoUrl);

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-ink-700 bg-ink-900/70',
        'transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-ink-600 hover:shadow-lift',
        className,
      )}
    >
      <div className="relative overflow-hidden">
        {still ? (
          <Media
            media={still}
            aspect="aspect-video"
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw"
            className="transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="aspect-video bg-ink-850" />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-ink-950/90 via-ink-950/20 to-transparent"
        />

        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <span className="inline-flex size-14 items-center justify-center rounded-full border border-ember-400/60 bg-ink-950/70 text-ember-300 backdrop-blur-sm">
            {hasVideo ? <Play className="size-5 translate-x-0.5" /> : <Maximize2 className="size-5" />}
          </span>
        </span>

        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          <Badge tone="signal">{project.category}</Badge>
          <Badge>{project.year}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold tracking-tight text-chalk">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="text-left before:absolute before:inset-0 before:content-['']"
          >
            {project.title}
            <span className="sr-only"> — view project details</span>
          </button>
        </h3>
        <p className="mt-2 flex-1 text-sm/relaxed text-mist">{project.description}</p>
        <p className="mt-4 border-t border-ink-800 pt-3.5 text-xs text-slate-muted">
          {project.student} · {project.course}
        </p>
      </div>
    </article>
  );
}
