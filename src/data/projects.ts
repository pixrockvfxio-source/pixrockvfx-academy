import type { Project } from '@/types/content';

/**
 * INTENTIONALLY EMPTY.
 *
 * There is no student work to show yet — the first intake is April 2027. Per
 * the Parent Brochure Copy, nothing on this site may imply a track record the
 * academy does not have.
 *
 * The Student Work page handles an empty list deliberately: it states the
 * position plainly and shows what each course's graduates will actually
 * deliver, which is documented in the curriculum.
 *
 * When real work exists, add it here with the artist's permission. Add
 * `videoUrl` to enable the player (YouTube, Vimeo or a direct file), and a
 * matching still in `media.projects[id]` in src/config/media.ts. The gallery,
 * its filters and the home-page section all return automatically.
 *
 * Do not publish a shot that names a client or title covered by an NDA.
 */
export const projects: Project[] = [];

/** Distinct categories, in first-appearance order — drives the gallery filter. */
export const projectCategories = Array.from(new Set(projects.map((project) => project.category)));
