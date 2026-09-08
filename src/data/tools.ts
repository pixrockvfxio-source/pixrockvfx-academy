import type { Tool } from '@/types/content';

/**
 * Software taught across the academy.
 *
 * `status` is deliberate and should be kept accurate:
 *   core      — taught directly, hands-on, in at least one programme
 *   elective  — available in specific batches or as an optional module
 *   exposure  — introduced conceptually; not a full hands-on module
 *
 * Never promote a tool to `core` unless a batch genuinely has licences and
 * teaching time for it. The Software section renders this distinction to
 * visitors, so the page stays honest as the curriculum changes.
 */
export const tools: Tool[] = [
  {
    name: 'Nuke',
    discipline: 'Compositing',
    status: 'core',
    note: 'The node-based compositor used across the compositing and production programmes.',
  },
  {
    name: 'Silhouette',
    discipline: 'Roto & Paint',
    status: 'core',
    note: 'Primary tool for rotoscopy, paint and matte preparation work.',
  },
  {
    name: 'Mocha Pro',
    discipline: 'Planar Tracking',
    status: 'core',
    note: 'Planar tracking used to drive shapes, patches and screen replacements.',
  },
  {
    name: 'Autodesk Maya',
    discipline: '3D & Animation',
    status: 'core',
    note: 'Modelling, layout, animation and scene assembly for the 3D track.',
  },
  {
    name: 'Blender',
    discipline: '3D & Animation',
    status: 'core',
    note: 'Open-source 3D suite taught alongside Maya for modelling and rendering.',
  },
  {
    name: 'Adobe After Effects',
    discipline: 'Motion Graphics',
    status: 'core',
    note: 'Motion design, kinetic typography and 2.5D compositing.',
  },
  {
    name: 'Adobe Photoshop',
    discipline: 'Texturing & Paint',
    status: 'core',
    note: 'Matte painting elements, texture authoring and still clean-up.',
  },
  {
    name: 'Adobe Illustrator',
    discipline: 'Design',
    status: 'core',
    note: 'Vector design and asset preparation for the motion graphics track.',
  },
  {
    name: '3DEqualizer',
    discipline: 'Matchmove',
    status: 'elective',
    note: 'Camera solving and matchmove; availability confirmed per batch.',
  },
  {
    name: 'PFTrack',
    discipline: 'Matchmove',
    status: 'elective',
    note: 'Alternative tracking package offered in selected matchmove batches.',
  },
  {
    name: 'Substance 3D Painter',
    discipline: 'Texturing',
    status: 'elective',
    note: 'PBR texture authoring; offered as an optional module in the 3D track.',
  },
  {
    name: 'Houdini',
    discipline: 'FX & Simulation',
    status: 'exposure',
    note: 'Introduced conceptually so you understand FX handover — not a full hands-on module.',
  },
];

export const toolStatusLabels: Record<Tool['status'], string> = {
  core: 'Taught hands-on',
  elective: 'Batch-dependent',
  exposure: 'Introduced only',
};
