import type { Tool } from '@/types/content';

/**
 * Software taught across the academy, from Curriculum v3.0 §10.
 *
 * `status` is deliberate and must stay accurate:
 *   core       — taught hands-on in at least one course
 *   supporting — used alongside the core tools, or free/included
 *   onHold     — belongs to a course that is not yet open for enrolment
 *
 * Houdini (FX) was removed from the lineup entirely — highest faculty and
 * hardware cost, narrowest local hiring base — and is not listed here.
 */
export const tools: Tool[] = [
  {
    name: 'Nuke / NukeX',
    discipline: 'Compositing',
    status: 'core',
    note: 'The node-based compositor used across every VFX tier, and by essentially every major studio.',
  },
  {
    name: 'Silhouette',
    discipline: 'Roto & Paint',
    status: 'core',
    note: 'Primary tool for rotoscopy and paint work — Silhouette for volume, Nuke for comp-integrated work.',
  },
  {
    name: 'Mocha Pro',
    discipline: 'Planar Tracking',
    status: 'core',
    note: 'Planar tracking used to drive roto shapes and support patch and projection cleanup.',
  },
  {
    name: 'Maya',
    discipline: '3D & Rotomation',
    status: 'core',
    note: 'Matchmove, layout and rotomation, and the DCC side of the Unreal pipeline.',
  },
  {
    name: '3DEqualizer',
    discipline: 'Matchmove',
    status: 'core',
    note: 'The primary camera-solving package on the Matchmove & Layout course.',
  },
  {
    name: 'Adobe Photoshop',
    discipline: 'Paint & Texturing',
    status: 'core',
    note: 'Image fundamentals, matte painting elements and still cleanup.',
  },
  {
    name: 'Adobe After Effects',
    discipline: 'Foundation & Reel',
    status: 'supporting',
    note: 'Used in the foundation block and for reel editing.',
  },
  {
    name: 'Adobe Premiere',
    discipline: 'Reel Edit',
    status: 'supporting',
    note: 'Cutting the demo reel and breakdown reel.',
  },
  {
    name: 'Blender',
    discipline: '3D',
    status: 'supporting',
    note: 'Free 3D suite used alongside Maya, particularly for the Unreal asset pipeline.',
  },
  {
    name: 'DaVinci Resolve',
    discipline: 'Colour & Finishing',
    status: 'supporting',
    note: 'Colour and finishing context for compositing students.',
  },
  {
    name: 'Unreal Engine 5',
    discipline: 'Real-Time',
    status: 'onHold',
    note: 'Core to the Unreal Engine course, which opens once faculty appointment is confirmed.',
  },
  {
    name: 'Quixel Megascans',
    discipline: 'Real-Time Assets',
    status: 'onHold',
    note: 'Environment library used on the Unreal course.',
  },
];

export const toolStatusLabels: Record<Tool['status'], string> = {
  core: 'Taught hands-on',
  supporting: 'Used alongside',
  onHold: 'With the Unreal course',
};
