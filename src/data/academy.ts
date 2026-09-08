/**
 * Academy-level content: differentiators, the learning journey, career support
 * and the About page narrative. Kept out of components so copy can be edited
 * (or later served from a CMS) without touching UI code.
 */

export type Feature = {
  title: string;
  description: string;
  icon: FeatureIcon;
};

export type FeatureIcon =
  | 'clapperboard'
  | 'users'
  | 'layers'
  | 'workflow'
  | 'cpu'
  | 'compass'
  | 'folder'
  | 'building';

export const differentiators: Feature[] = [
  {
    title: 'Industry-oriented training',
    description:
      'Curriculum written around the shots a facility actually delivers — not around software menus. Every module ends in something you could show a supervisor.',
    icon: 'clapperboard',
  },
  {
    title: 'Experienced mentors',
    description:
      'Taught by artists who have worked to studio deadlines and given notes in dailies. Feedback comes in production language, not classroom language.',
    icon: 'users',
  },
  {
    title: 'Practical projects',
    description:
      'You work on plates with real problems in them: fast motion, defocus, awkward lighting, missing information. Clean tutorial footage teaches clean tutorial habits.',
    icon: 'layers',
  },
  {
    title: 'Production workflow',
    description:
      'Versioning, naming conventions, handovers, QC passes and delivery specs are taught from week one, because that is what makes an artist easy to hire.',
    icon: 'workflow',
  },
  {
    title: 'Modern VFX tools',
    description:
      'Node-based compositing, planar tracking, camera solving, PBR texturing and physically based lighting — the current toolset, taught as principles first.',
    icon: 'cpu',
  },
  {
    title: 'Career guidance',
    description:
      'Reel curation, breakdown writing, interview preparation and honest assessment of where your work stands against a junior hiring bar.',
    icon: 'compass',
  },
  {
    title: 'Portfolio development',
    description:
      'A small number of genuinely finished shots, edited and broken down properly, beats a long reel of half-solved ones. We prune aggressively.',
    icon: 'folder',
  },
  {
    title: 'Industry exposure',
    description:
      'Guest reviews, studio-format dailies and breakdown sessions on published work, so the standard you are aiming at is never abstract.',
    icon: 'building',
  },
];

export type JourneyStep = {
  step: string;
  title: string;
  description: string;
};

export const learningJourney: JourneyStep[] = [
  {
    step: '01',
    title: 'Learn',
    description:
      'Concepts taught against real footage, with the reasoning made explicit. You always know why a technique exists before you use it.',
  },
  {
    step: '02',
    title: 'Practice',
    description:
      'Supervised repetition on graded exercises until accuracy and speed both hold. Craft is built through volume, not through watching.',
  },
  {
    step: '03',
    title: 'Create',
    description:
      'Full shots assigned as briefs — with constraints, a deadline and a defined deliverable, exactly as a facility would issue them.',
  },
  {
    step: '04',
    title: 'Review',
    description:
      'Studio-format dailies. You present your shot, take notes in production language and turn the next version around.',
  },
  {
    step: '05',
    title: 'Build portfolio',
    description:
      'The strongest work is refined, edited into a reel and paired with breakdowns that explain your contribution precisely.',
  },
  {
    step: '06',
    title: 'Career',
    description:
      'Interview preparation, reel review, studio expectations and guidance on which roles your current work genuinely fits.',
  },
];

export const careerSupport: Feature[] = [
  {
    title: 'Skill development',
    description:
      'Structured progression from craft accuracy to speed to judgement — the three things a junior is assessed on.',
    icon: 'layers',
  },
  {
    title: 'Portfolio building',
    description:
      'Reel curation and breakdown writing, with an honest edit that removes anything that would weaken the whole.',
    icon: 'folder',
  },
  {
    title: 'Interview preparation',
    description:
      'Mock reviews, technical questions, and practice explaining your decisions the way a supervisor will ask you to.',
    icon: 'users',
  },
  {
    title: 'Industry workflow',
    description:
      'Naming, versioning, dailies etiquette and handover discipline, so your first week on a floor is not a shock.',
    icon: 'workflow',
  },
  {
    title: 'Career guidance',
    description:
      'A clear read on where your work stands, which roles to target first and what to strengthen before applying.',
    icon: 'compass',
  },
];

export const academyStory = {
  vision:
    'To make world-class visual effects training accessible to artists who are willing to do the work — and to raise the standard of the junior artists entering the industry from our region.',
  mission:
    'Teach visual effects the way it is practised: on real plates, under real constraints, with feedback that is specific, technical and honest.',
  story: [
    'PixRock VFX Academy grew out of a straightforward observation. Studios were interviewing plenty of graduates who could follow a tutorial, and very few who could open a difficult plate, plan an approach and deliver it on time.',
    'The gap was never talent. It was the absence of production context — no deadlines, no supervisor notes, no versioning, no handover to another department, and no honest assessment of whether a shot was actually finished.',
    'So we built the academy around that missing context. Small batches, mentors from the floor, footage with genuine problems in it, and a review format borrowed directly from studio dailies. What you present in class is what you would present to a supervisor.',
    'That is the whole idea. Learn the craft properly, practise it under pressure, and leave with work you can defend in a room full of people who make this for a living.',
  ],
  philosophy: [
    {
      title: 'Fundamentals before features',
      description:
        'Software changes; premultiplication, parallax and weight do not. We teach the principle first so the tool becomes interchangeable.',
    },
    {
      title: 'Real plates, real problems',
      description:
        'Clean tutorial footage produces artists who freeze when a plate is defocused, underexposed or moving fast. Ours are not clean.',
    },
    {
      title: 'Notes, not applause',
      description:
        'Feedback is specific and technical. Comfortable praise does not prepare anyone for a supervisor with fifty shots to review.',
    },
    {
      title: 'Finished beats plentiful',
      description:
        'One shot taken all the way to delivery teaches more — and hires better — than five abandoned at eighty percent.',
    },
  ],
};

export const admissionSteps = [
  {
    step: '01',
    title: 'Enquire',
    description: 'Send us your details and the discipline you are drawn to. No portfolio needed at this stage.',
  },
  {
    step: '02',
    title: 'Counselling call',
    description:
      'We talk through your background, your goals and which programme genuinely fits — including telling you when none of them do.',
  },
  {
    step: '03',
    title: 'Assessment',
    description:
      'Foundation courses need no prior work. Advanced programmes involve a short task or a portfolio review.',
  },
  {
    step: '04',
    title: 'Enrol & begin',
    description: 'Confirm your batch, receive your system requirements and joining pack, and start.',
  },
];
