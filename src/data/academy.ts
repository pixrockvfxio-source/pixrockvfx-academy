/**
 * Academy-level content, drawn from the Parent Brochure Copy v1.0 and
 * Curriculum v3.0.
 *
 * Every claim here is one the source documents permit. Claims marked [VERIFY]
 * in those documents — salary bands, EMI terms, named film credits, the — language-ok
 * Career Pro internship specifics — are deliberately absent.
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
  | 'building'
  | 'shield';

/** The four proof points from the brochure, §3. */
export const differentiators: Feature[] = [
  {
    title: 'A working studio, not a training centre',
    description:
      'PixRock delivers VFX for feature films, series and commercials from this facility, for major studios and streaming platforms. You train in the same building, to the same standards.',
    icon: 'building',
  },
  {
    title: 'Instructors who are still artists',
    description:
      'Our faculty are on live production this week — not people who left the industry years ago. You learn current practice, not what the industry looked like a decade ago.',
    icon: 'users',
  },
  {
    title: 'TPN Gold+ certified',
    description:
      'The content security standard international studios require before they will send work to a facility. Very few studios in India hold it, and it tells you what kind of operation this is.',
    icon: 'shield',
  },
  {
    title: 'We hire from our own students',
    description:
      'PixRock recruits artists continuously, and graduates of this academy are considered for our own teams first. That is not a promise of a job — it is an advantage no franchise institute can offer.',
    icon: 'clapperboard',
  },
];

/** How the training is actually run — the second block on the home page. */
export const trainingApproach: Feature[] = [
  {
    title: 'Built backwards from delivery',
    description:
      'Every module maps to work the studio actually ships. Exercises use anonymised shot types from completed projects, not generic tutorial footage.',
    icon: 'workflow',
  },
  {
    title: 'Reviewed by working supervisors',
    description:
      'Monthly gate reviews are run by a PixRock supervisor on live production, using the same standards applied on a show.',
    icon: 'compass',
  },
  {
    title: 'Portfolio is the deliverable',
    description:
      'Your exit artefact is a reel reviewed to studio standard. Nobody is hired on a marksheet — they are hired on a portfolio and a practical test.',
    icon: 'folder',
  },
  {
    title: 'Production discipline from week one',
    description:
      'Shot naming, versioning, WIP versus publish, submission checklists and dailies etiquette. The habits that make a junior artist easy to hire.',
    icon: 'layers',
  },
  {
    title: 'Two shifts, so a degree still fits',
    description:
      'Morning 9 am–12 pm and evening 6 pm–9 pm. Students studying for a degree alongside use the evening batch rather than choosing between the two.',
    icon: 'cpu',
  },
  {
    title: 'Told early if it is not working',
    description:
      'If a student is falling behind we assign extra lab hours and tell the family at the first monthly review — not at the end of the course.',
    icon: 'users',
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
      'Image, colour and pipeline literacy first, so you understand how a shot moves through a studio before you touch a tool.',
  },
  {
    step: '02',
    title: 'Practise',
    description:
      'Supervised repetition on anonymised shot types from completed projects — plates with real problems, not clean tutorial footage.',
  },
  {
    step: '03',
    title: 'Review',
    description:
      'Weekly submissions with faculty feedback, and a monthly gate review by a working PixRock supervisor against a five-point rubric.',
  },
  {
    step: '04',
    title: 'Deliver',
    description:
      'A final block of supervised shots cut to studio specification, with the naming, versioning and delivery discipline that goes with it.',
  },
  {
    step: '05',
    title: 'Build the reel',
    description:
      'A demo reel and a breakdown reel, edited and targeted at specific roles, approved by the review panel.',
  },
  {
    step: '06',
    title: 'Apply',
    description:
      'Test-shot preparation under time pressure, interview practice, and CV circulation through our placement assistance.',
  },
];

/** Placement assistance — brochure §5. This wording is deliberate. */
export const placementAssistance = {
  headline: 'What we do — and what we do not promise',
  statement:
    'We provide placement assistance. We do not guarantee employment, and we want to be completely clear about that, because you will encounter institutes that promise otherwise.',
  includes: [
    'Your portfolio and CV circulated to PixRock’s own hiring teams and to partner studios',
    'Interview and practical test preparation — most studios hire on a test, and we prepare you for that specific format',
    'Referrals to studios in Chennai, Hyderabad, Bengaluru, Mumbai and Pune',
    'Guidance on portfolio presentation and industry applications',
  ],
  eligibility: [
    'Maintain at least 80% attendance',
    'Clear every monthly review',
    'Complete a final portfolio approved by our review panel',
  ],
  eligibilityNote:
    'These conditions are stated in the enrollment agreement you sign, and we apply them consistently. A student who does not meet the standard does not receive assistance — and we say so well before that point is reached.',
  foundingBatch:
    'PixRock Academy opens in April 2027. Our studio has been placing and developing artists for years, but the academy itself has no graduate record yet, because it has had no graduates yet. We would rather tell you that plainly than show you numbers that belong to someone else.',
};

export const academyStory = {
  vision:
    'To train VFX artists the way a studio actually needs them — on real pipeline, to real standards — so that the artists entering the industry from this region arrive genuinely employable.',
  mission:
    'Teach the job, not the software. Every module maps to work PixRock ships, every review is run by a working supervisor, and every student leaves with a portfolio reviewed to studio standard.',
  story: [
    'VFX is a real industry with real employment. Indian studios do post-production for films, series and advertising watched around the world, and they hire steadily — particularly for roles like roto, prep and compositing, where demand for trained artists consistently exceeds supply.',
    'But it is a skills industry, not a certificate industry. Nobody is hired on a marksheet. They are hired on a portfolio, on a practical test, and on whether they can work to a deadline. That is why so many students finish a course and still cannot find work: they were taught software, not the job.',
    'PixRock Academy exists because we are a studio first. PixRock is a TPN Gold+ certified production facility in Coimbatore employing around 400 artists. Our instructors are working artists. Our students train on the same pipeline, the same review process and the same standards our production teams work to every day.',
    'We will be honest about two things. This is demanding work — students who do not put in the hours do not build a portfolio, and we will say so early. And we offer placement assistance, not a placement guarantee. Anyone who guarantees your child a job is not being straight with you.',
  ],
  philosophy: [
    {
      title: 'Built backwards from delivery',
      description:
        'Every module maps to work the studio actually ships. If it does not appear on a real shot, it does not take up teaching time.',
    },
    {
      title: 'Real plates, real problems',
      description:
        'Exercises use anonymised shot types from completed projects. Clean tutorial footage produces artists who freeze on a difficult plate.',
    },
    {
      title: 'Notes, not applause',
      description:
        'Monthly reviews are run by working supervisors to the standard they apply on a show. Comfortable praise prepares nobody.',
    },
    {
      title: 'Honesty over persuasion',
      description:
        'We have no graduate record yet, and we say so. We offer assistance, not guarantees, and we say that too.',
    },
  ],
};

/** Admissions — brochure §7. */
export const admissionSteps = [
  {
    step: '01',
    title: 'Visit us',
    description:
      'Come and see the facility. Bring your family. There is no obligation, and we would rather you saw the place first.',
  },
  {
    step: '02',
    title: 'Talk to a counsellor',
    description:
      'We explain the courses, the full fees including GST, and which option suits you. Ask us anything.',
  },
  {
    step: '03',
    title: 'Aptitude conversation',
    description:
      'For Career Pro, a short interview. We are looking for commitment, not existing skill.',
  },
  {
    step: '04',
    title: 'Enrol',
    description: 'Seats are limited and the April intake fills first.',
  },
];

/** Facts safe to state publicly. */
export const academyFacts = {
  firstIntake: 'April 2027',
  city: 'Coimbatore',
  studioArtists: '400',
  certification: 'TPN Gold+',
  shifts: [
    { label: 'Morning batch', time: '9:00 am – 12:00 pm' },
    { label: 'Evening batch', time: '6:00 pm – 9:00 pm' },
  ],
};
