import { cn } from '@/lib/cn';

type Props = {
  className?: string;
  /** Hide the wordmark and show only the monogram. */
  compact?: boolean;
};

/** The PixRock wordmark. Pure SVG + text so it stays crisp at any size. */
export function Logo({ className, compact = false }: Props) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative inline-flex size-9 items-center justify-center overflow-hidden rounded-xl bg-ink-850 ring-1 ring-ink-600">
        <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="pixrock-mark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff8b4d" />
              <stop offset="55%" stopColor="#ff5f1f" />
              <stop offset="100%" stopColor="#14c3b2" />
            </linearGradient>
          </defs>
          <path
            d="M20 46V18h13.5c6.6 0 10.9 3.8 10.9 9.7 0 5.9-4.3 9.8-10.9 9.8H27.4V46H20Zm7.4-14.6h5.2c2.7 0 4.4-1.5 4.4-3.7 0-2.2-1.7-3.6-4.4-3.6h-5.2v7.3Z"
            fill="url(#pixrock-mark)"
          />
          <circle cx="44" cy="44" r="4" fill="#14c3b2" />
        </svg>
      </span>
      {compact ? null : (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.98rem] font-extrabold tracking-tight text-chalk">
            PixRock
          </span>
          <span className="mt-0.5 text-[0.6rem] font-semibold tracking-[0.28em] text-slate-muted uppercase">
            VFX Academy
          </span>
        </span>
      )}
    </span>
  );
}
