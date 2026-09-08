import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Project } from '@/types/content';
import { media } from '@/config/media';
import { Media } from '@/components/ui/Media';
import { Badge } from '@/components/ui/Badge';

type Props = {
  project: Project | null;
  onClose: () => void;
};

/** Converts a YouTube or Vimeo watch URL into its embeddable equivalent. */
function toEmbedUrl(url: string): { kind: 'iframe' | 'file'; src: string } {
  const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
  if (youtube) return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${youtube[1]}` };

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return { kind: 'iframe', src: `https://player.vimeo.com/video/${vimeo[1]}` };

  return { kind: 'file', src: url };
}

/**
 * Project viewer. Rendered in a portal, closes on Escape or backdrop click,
 * moves focus into the dialog on open and restores it on close.
 */
export function ProjectDialog({ project, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [project, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto bg-ink-950/85 p-4 backdrop-blur-md sm:p-8"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? {} : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="glass my-auto w-full max-w-3xl overflow-hidden rounded-panel shadow-lift outline-none"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? {} : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {project.videoUrl ? (
                (() => {
                  const embed = toEmbedUrl(project.videoUrl);
                  return embed.kind === 'iframe' ? (
                    <iframe
                      src={embed.src}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="aspect-video w-full border-0"
                    />
                  ) : (
                    <video src={embed.src} controls playsInline preload="metadata" className="aspect-video w-full">
                      <track kind="captions" />
                    </video>
                  );
                })()
              ) : (
                <Media media={media.projects[project.id]} aspect="aspect-video" priority />
              )}

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project"
                className="absolute top-3 right-3 inline-flex size-10 items-center justify-center rounded-full border border-ink-600 bg-ink-950/80 text-chalk transition-colors hover:bg-ink-800"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                <Badge tone="signal">{project.category}</Badge>
                <Badge>{project.year}</Badge>
              </div>
              <h2 id="project-dialog-title" className="mt-4 text-title text-chalk">
                {project.title}
              </h2>
              <p className="mt-3 text-sm/relaxed text-mist sm:text-base/relaxed">{project.description}</p>
              <dl className="mt-6 grid gap-4 border-t border-ink-700 pt-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs tracking-wider text-slate-muted uppercase">Artist</dt>
                  <dd className="mt-1 text-chalk">{project.student}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-wider text-slate-muted uppercase">Programme</dt>
                  <dd className="mt-1 text-chalk">{project.course}</dd>
                </div>
              </dl>
              {!project.videoUrl ? (
                <p className="mt-5 text-xs text-slate-muted">
                  Showreel video for this project will be published shortly.
                </p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
