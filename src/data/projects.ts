import type { Project } from '@/types/content';

/**
 * PLACEHOLDER CONTENT.
 *
 * Student work shown in the Student Work gallery. Replace with real student
 * shots (with permission) and add `videoUrl` to enable the showreel player —
 * YouTube, Vimeo and direct video files are all supported. Stills come from
 * `media.projects[id]` in `src/config/media.ts`.
 */
export const projects: Project[] = [
  {
    id: 'p-01',
    title: 'Rooftop Skyline Extension',
    category: 'Compositing',
    student: 'Student Name',
    course: 'VFX Compositing',
    description:
      'A rooftop plate extended into a full future skyline using camera projection, matched atmosphere and a rebuilt horizon line.',
    year: 2025,
  },
  {
    id: 'p-02',
    title: 'Creature Integration Study',
    category: 'Lighting & Compositing',
    student: 'Student Name',
    course: '3D for VFX',
    description:
      'A CG creature lit from on-set HDRI reference and integrated with contact shadows, interactive light and matched grain.',
    year: 2025,
  },
  {
    id: 'p-03',
    title: 'Abandoned Terminal',
    category: 'Environment',
    student: 'Student Name',
    course: '3D for VFX',
    description:
      'A full CG environment fly-through built from photographic reference, with layered look development and rendered utility passes.',
    year: 2025,
  },
  {
    id: 'p-04',
    title: 'Stunt Wire Removal Breakdown',
    category: 'Paint & Prep',
    student: 'Student Name',
    course: 'Paint & Prep',
    description:
      'Wire and rig removal across a moving-camera stunt sequence, with clean plates rebuilt from adjacent frames and regrained to match.',
    year: 2024,
  },
  {
    id: 'p-05',
    title: 'Anthology Title Sequence',
    category: 'Motion Design',
    student: 'Student Name',
    course: 'Motion Graphics & Design',
    description:
      'A title sequence combining kinetic typography, tracked screen graphics and live-action footage, cut to an original sound design pass.',
    year: 2025,
  },
  {
    id: 'p-06',
    title: 'Street-Level Destruction',
    category: 'FX & Compositing',
    student: 'Student Name',
    course: 'VFX Production Programme',
    description:
      'A vehicle destruction sequence composited into a street plate, with debris interaction, dust atmosphere and matched lens artefacts.',
    year: 2024,
  },
];

/** Distinct categories, in first-appearance order — drives the gallery filter. */
export const projectCategories = Array.from(new Set(projects.map((project) => project.category)));
