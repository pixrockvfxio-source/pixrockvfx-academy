import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '@/types/content';
import { TestimonialCard } from './TestimonialCard';
import { cn } from '@/lib/cn';

type Props = {
  testimonials: Testimonial[];
};

/**
 * Scroll-snap testimonial carousel.
 *
 * Built on native overflow scrolling rather than a carousel library: it works
 * with touch, trackpad and keyboard out of the box, degrades gracefully and
 * adds no bundle weight. Arrow buttons scroll by one card and disable at the
 * ends; the track itself is focusable so keyboard users can arrow through it.
 */
export function TestimonialSlider({ testimonials }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const amount = card ? card.clientWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  if (testimonials.length === 0) return null;

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Student testimonials"
        className={cn(
          'flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        )}
      >
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.id}
            className="w-[85vw] max-w-sm shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]"
          >
            <TestimonialCard testimonial={testimonial} className="h-full" />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Previous testimonials"
          className="inline-flex size-11 items-center justify-center rounded-full border border-ink-600 text-chalk transition-colors hover:border-ember-500/50 hover:bg-ember-500/10 disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="Next testimonials"
          className="inline-flex size-11 items-center justify-center rounded-full border border-ink-600 text-chalk transition-colors hover:border-ember-500/50 hover:bg-ember-500/10 disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
        <p className="ml-1 text-xs text-slate-muted">Scroll or swipe for more</p>
      </div>
    </div>
  );
}
