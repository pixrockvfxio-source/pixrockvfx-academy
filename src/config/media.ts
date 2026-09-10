/**
 * Centralised media registry.
 *
 * Nothing in the UI hard-codes an image path. Every visual is referenced
 * through this file, so replacing the temporary artwork with real PixRock
 * photography is a one-line change per entry:
 *
 *   hero: { ...hero, src: '/media/hero-studio.webp' }
 *
 * While `src` is undefined the <Media> component renders an original,
 * deterministic cinematic placeholder (generated SVG — no external requests,
 * no stock-photo licensing, nothing to 404).
 *
 * Recommended replacements: WebP or AVIF, 16:9 for wide banners, 4:5 for
 * portraits, and always supply `width`/`height` so the layout never shifts.
 */

export type MediaTone = 'ember' | 'signal' | 'ink' | 'mixed';

export type MediaRef = {
  /** Real asset URL. Leave undefined to use the generated placeholder. */
  src?: string;
  /** Optional AVIF/WebP alternative served first when provided. */
  srcModern?: string;
  /** Always required — describes the image for screen readers and SEO. */
  alt: string;
  /** Seed for the generated placeholder; keep stable so art doesn't shuffle. */
  seed: string;
  tone?: MediaTone;
  width?: number;
  height?: number;
};

function ref(seed: string, alt: string, tone: MediaTone = 'mixed'): MediaRef {
  return { seed, alt, tone, width: 1600, height: 900 };
}

export const media = {
  heroPrimary: ref(
    'pixrock-hero-01',
    'Compositing artist reviewing a shot breakdown on a colour-calibrated studio display',
    'ember',
  ),
  heroSecondary: ref('pixrock-hero-02', 'Node graph of a live compositing script', 'signal'),

  aboutStudio: ref('pixrock-about-studio', 'PixRock VFX Academy training floor during a shot review', 'ember'),
  aboutMentors: ref('pixrock-about-mentors', 'Mentor giving feedback on a student roto pass', 'signal'),
  aboutCraft: ref('pixrock-about-craft', 'Close-up of a matchmove solve overlaid on plate footage', 'ink'),

  careersFloor: ref('pixrock-careers', 'Artists collaborating in a production review session', 'signal'),

  /** Course banners, keyed by course slug. */
  courses: {
    roto: ref('pixrock-course-roto', 'Rotoscoping shapes animated over a live-action plate', 'signal'),
    prep: ref('pixrock-course-prep', 'Clean plate paint work removing rigs from a frame', 'ember'),
    compositing: ref('pixrock-course-compositing', 'Multi-layer composite assembled in a Nuke node graph', 'ember'),
    matchmove: ref('pixrock-course-matchmove', '3D camera solve tracked to a filmed environment', 'signal'),
    unreal: ref('pixrock-course-unreal', 'Real-time environment lit inside an Unreal Engine viewport', 'mixed'),
    'career-pro': ref('pixrock-course-careerpro', 'Shot review session across a VFX production pipeline', 'ember'),
  } as Record<string, MediaRef>,

  /**
   * Student project stills, keyed by project id.
   *
   * Empty until there is real student work — see src/data/projects.ts. Add an
   * entry here with the same id as the project when you publish one.
   */
  projects: {} as Record<string, MediaRef>,
} as const;
