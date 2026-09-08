import { useState } from 'react';
import type { ReactNode } from 'react';
import type { MediaRef } from '@/config/media';
import { PlaceholderArt } from './PlaceholderArt';
import { cn } from '@/lib/cn';

type Props = {
  media: MediaRef;
  className?: string;
  /** Tailwind aspect utility, e.g. "aspect-video". */
  aspect?: string;
  /** Load eagerly for above-the-fold imagery only. */
  priority?: boolean;
  sizes?: string;
  /** Optional overlay rendered above the image (gradients, captions). */
  children?: ReactNode;
};

/**
 * Renders a real image when the media entry has a `src`, and original
 * generated artwork when it does not. Also falls back to the artwork if a real
 * image fails to load, so the layout can never show a broken image.
 */
export function Media({ media, className, aspect = 'aspect-video', priority = false, sizes, children }: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(media.src) && !failed;

  return (
    <div className={cn('relative overflow-hidden bg-ink-850', aspect, className)}>
      {showImage ? (
        <picture>
          {media.srcModern ? <source srcSet={media.srcModern} type="image/avif" /> : null}
          <img
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        </picture>
      ) : (
        <>
          <PlaceholderArt seed={media.seed} tone={media.tone} />
          <span className="sr-only">{media.alt}</span>
        </>
      )}
      {children}
    </div>
  );
}
