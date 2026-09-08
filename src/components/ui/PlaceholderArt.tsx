import { useMemo } from 'react';
import { seededRandom } from '@/lib/hash';
import type { MediaTone } from '@/config/media';
import { cn } from '@/lib/cn';

const palettes: Record<MediaTone, [string, string, string]> = {
  ember: ['#ff6a2b', '#c33c07', '#14c3b2'],
  signal: ['#2fdccb', '#0d9a8d', '#ff6a2b'],
  ink: ['#3a4252', '#1c212c', '#2fdccb'],
  mixed: ['#ff8b4d', '#14c3b2', '#7a4bd6'],
};

type Props = {
  seed: string;
  tone?: MediaTone;
  className?: string;
};

/**
 * Original, deterministic placeholder artwork.
 *
 * Rather than shipping licensed stock photography we generate an abstract
 * "render viewport" composition — perspective grid, light blooms and wireframe
 * geometry — from a seed. The same seed always produces the same image, so
 * layouts stay stable, nothing is fetched over the network, and every
 * placeholder can be swapped for a real photograph by setting `src` in
 * `src/config/media.ts`.
 */
export function PlaceholderArt({ seed, tone = 'mixed', className }: Props) {
  const art = useMemo(() => {
    const rand = seededRandom(seed);
    const [a, b, c] = palettes[tone];
    const id = `pa-${Math.floor(rand() * 1e9).toString(36)}`;

    const blooms = Array.from({ length: 3 }, (_, i) => ({
      cx: 180 + rand() * 1240,
      cy: 120 + rand() * 660,
      r: 260 + rand() * 320,
      fill: [a, b, c][i % 3],
      opacity: 0.32 - i * 0.07,
    }));

    // Wireframe: a ring of points connected to a shared centre, echoing the
    // look of geometry seen in a 3D viewport.
    const cx = 500 + rand() * 600;
    const cy = 340 + rand() * 220;
    const points = Array.from({ length: 7 }, (_, i) => {
      const angle = (i / 7) * Math.PI * 2 + rand() * 0.4;
      const radius = 130 + rand() * 190;
      return [cx + Math.cos(angle) * radius * 1.35, cy + Math.sin(angle) * radius * 0.8] as const;
    });

    const horizon = 520 + rand() * 90;

    return { id, blooms, points, horizon, a, b, c };
  }, [seed, tone]);

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={cn('h-full w-full', className)}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${art.id}-bloom`}>
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${art.id}-base`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#12151d" />
          <stop offset="100%" stopColor="#07080b" />
        </linearGradient>
        <linearGradient id={`${art.id}-wire`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={art.a} stopOpacity="0.85" />
          <stop offset="100%" stopColor={art.c} stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id={`${art.id}-vignette`} cx="0.5" cy="0.45" r="0.75">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.72" />
        </radialGradient>
        <pattern id={`${art.id}-dots`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill="#ffffff" fillOpacity="0.05" />
        </pattern>
      </defs>

      <rect width="1600" height="900" fill={`url(#${art.id}-base)`} />

      {/* Light blooms */}
      <g>
        {art.blooms.map((bloom, i) => (
          <circle
            key={i}
            cx={bloom.cx}
            cy={bloom.cy}
            r={bloom.r}
            fill={bloom.fill}
            opacity={bloom.opacity}
            style={{ filter: 'blur(60px)' }}
          />
        ))}
      </g>

      {/* Perspective floor grid */}
      <g stroke={art.c} strokeOpacity="0.18" strokeWidth="1">
        {Array.from({ length: 14 }, (_, i) => {
          const t = i / 13;
          const y = art.horizon + Math.pow(t, 2.1) * (900 - art.horizon);
          return <line key={`h${i}`} x1="0" y1={y} x2="1600" y2={y} />;
        })}
        {Array.from({ length: 19 }, (_, i) => {
          const x = (i / 18) * 1600;
          return <line key={`v${i}`} x1={x} y1="900" x2={800 + (x - 800) * 0.12} y2={art.horizon} />;
        })}
      </g>

      {/* Horizon glow */}
      <rect x="0" y={art.horizon - 2} width="1600" height="3" fill={art.a} opacity="0.5" />

      {/* Wireframe geometry */}
      <g stroke={`url(#${art.id}-wire)`} strokeWidth="1.4" fill="none">
        <polygon points={art.points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')} />
        {art.points.map(([x, y], i) => (
          <line
            key={`s${i}`}
            x1={x}
            y1={y}
            x2={art.points[(i + 3) % art.points.length][0]}
            y2={art.points[(i + 3) % art.points.length][1]}
            strokeOpacity="0.45"
          />
        ))}
      </g>
      <g fill={art.a}>
        {art.points.map(([x, y], i) => (
          <rect key={`p${i}`} x={x - 3} y={y - 3} width="6" height="6" opacity="0.9" />
        ))}
      </g>

      <rect width="1600" height="900" fill={`url(#${art.id}-dots)`} />
      <rect width="1600" height="900" fill={`url(#${art.id}-vignette)`} />
    </svg>
  );
}
