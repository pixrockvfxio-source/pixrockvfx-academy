import type { Course } from '@/types/content';

/**
 * Course catalogue.
 *
 * This is the single source of truth for everything course-related: cards,
 * listing filters, detail pages, the enquiry form's dropdown and the sitemap.
 * Adding a course means appending one object here — no component changes, no
 * new routes. Keep `slug` stable once published; it is the public URL.
 */
export const courses: Course[] = [
  {
    slug: 'roto',
    title: 'Rotoscopy',
    track: 'Foundation',
    tagline: 'The craft that every visual effects shot passes through.',
    summary:
      'Build the precision, patience and shape-animation instincts that studios test for first. Roto is the fastest, most dependable entry point into a VFX pipeline.',
    overview: [
      'Rotoscopy is where most VFX careers begin, and where the habits that define a good artist are formed. You are separating an element from its plate frame by frame — hair, motion blur, semi-transparent edges — so that everyone downstream can do their job.',
      'This programme treats roto as a craft rather than a chore. You work on graded footage with real problems in it: fast motion, defocus, low contrast, occlusion. By the end you are not just drawing shapes, you are reading a plate and planning a spline hierarchy before you touch a single point.',
    ],
    duration: '6 weeks',
    commitment: '2 hours a day, 5 days a week',
    level: 'Beginner',
    format: 'Classroom & Online',
    software: ['Silhouette', 'Nuke', 'Mocha Pro'],
    outcomes: [
      'Read a plate and plan a shape hierarchy before animating',
      'Animate splines with clean, minimal keyframes that hold up under scrutiny',
      'Handle motion blur, defocus and semi-transparent edges convincingly',
      'Use planar tracking to drive shapes instead of animating everything by hand',
      'Deliver mattes in the formats and naming conventions studios expect',
      'Self-QC your work the way a lead would before it reaches a review',
    ],
    modules: [
      {
        title: 'Foundations of the frame',
        topics: [
          'How a VFX pipeline consumes roto',
          'Colour space, bit depth and why your viewer lies to you',
          'Frame ranges, slates and handles',
          'Shot breakdown and shape planning',
        ],
      },
      {
        title: 'Shape animation',
        topics: [
          'Bezier and B-spline behaviour',
          'Keyframe economy and interpolation',
          'Layer hierarchy, parenting and transforms',
          'Articulating organic forms — hands, faces, hair',
        ],
      },
      {
        title: 'Motion, blur and edges',
        topics: [
          'Matching motion blur to the plate',
          'Edge feather and per-point softness',
          'Defocus and depth cues',
          'Semi-transparent and fine-detail elements',
        ],
      },
      {
        title: 'Tracking-assisted roto',
        topics: [
          'Planar tracking fundamentals',
          'Driving shapes from tracked surfaces',
          'Stabilise-and-roto workflows',
          'When tracking helps and when it does not',
        ],
      },
      {
        title: 'Delivery and review',
        topics: [
          'Matte QC passes and common failure modes',
          'Naming conventions and version control',
          'Rendering mattes for compositing',
          'Taking notes in a supervised review',
        ],
      },
    ],
    eligibility: [
      'Open to anyone aged 17 and above',
      'No prior VFX or design experience required',
      'Comfortable using a computer for extended sessions',
      'Basic English reading and comprehension for briefs and reviews',
    ],
    methodology: [
      'Short demonstration, then supervised practice on the same footage',
      'Daily shot assignments with written feedback',
      'Weekly review in a studio-style dailies format',
      'Speed and accuracy benchmarks in the final two weeks',
    ],
    projects: [
      'Single-character full-body roto on a moving plate',
      'Hair and fine-detail extraction under motion blur',
      'Multi-element crowd separation with occlusion',
      'A timed delivery test mirroring a studio turnaround',
    ],
    careers: [
      'Junior Roto Artist',
      'Roto / Prep Artist',
      'Matte Preparation Artist',
      'Progression route into Paint, Matchmove or Compositing',
    ],
    faqs: [
      {
        question: 'Is roto a dead end?',
        answer:
          'No — it is a doorway. Roto is how most artists get their first studio credit, and the plate-reading skills you build transfer directly into paint, prep and compositing. Many supervisors started here.',
      },
      {
        question: 'Do I need a drawing background?',
        answer:
          'Not at all. Roto rewards observation and patience far more than drawing ability. If you can see the difference between two similar edges, you can learn this.',
      },
      {
        question: 'What hardware do I need for the online format?',
        answer:
          'A machine capable of running your assigned software comfortably, a stable internet connection and — strongly recommended — a pen tablet. We share detailed specifications during admission.',
      },
    ],
    featured: true,
    accent: 'signal',
  },
  {
    slug: 'paint-prep',
    title: 'Paint & Prep',
    track: 'Foundation',
    tagline: 'Make the impossible look like it was never there.',
    summary:
      'Rig removal, clean plates, wire and marker erasure, dust-busting. Prep work is invisible when it is done well — and painfully obvious when it is not.',
    overview: [
      'Every plate that arrives from set carries something that should not be in the final frame: a safety wire, a tracking marker, a camera rig, a crew reflection. Paint and prep artists remove it so cleanly that no one ever knows it was there.',
      'You learn to think in terms of source — where can this pixel legitimately come from? — rather than reaching for a brush. Clean plates, patch strategies, temporal consistency and grain matching are the core of the work.',
    ],
    duration: '6 weeks',
    commitment: '2 hours a day, 5 days a week',
    level: 'Beginner to Intermediate',
    format: 'Classroom & Online',
    software: ['Nuke', 'Silhouette', 'Adobe Photoshop', 'Mocha Pro'],
    outcomes: [
      'Build clean plates from surrounding frames rather than painting from imagination',
      'Remove wires, rigs, markers and unwanted objects without temporal flicker',
      'Match grain, noise and lens characteristics after a patch',
      'Use planar tracking and warping to move source pixels into place',
      'Handle parallax, occlusion and moving cameras in a patch',
      'Diagnose why a fix "boils" and fix the cause, not the symptom',
    ],
    modules: [
      {
        title: 'Prep fundamentals',
        topics: [
          'What arrives from set and what must go',
          'Plate anatomy: grain, gate weave, lens artefacts',
          'Non-destructive workflows',
          'Reference gathering and shot planning',
        ],
      },
      {
        title: 'Clean plate construction',
        topics: [
          'Sourcing pixels from adjacent frames',
          'Frame averaging and median techniques',
          'Perspective correction and warping',
          'Building a plate that survives the whole shot',
        ],
      },
      {
        title: 'Removal work',
        topics: [
          'Wire, rig and marker removal',
          'Object and crew removal with parallax',
          'Occlusion handling',
          'Reflections and interactive light',
        ],
      },
      {
        title: 'Restoration and cosmetics',
        topics: [
          'Dust-busting and damage repair',
          'Beauty and cosmetic clean-up',
          'Continuity fixes',
          'Split screens and frame surgery',
        ],
      },
      {
        title: 'Integration and delivery',
        topics: [
          'Grain matching and regraining',
          'Temporal QC on a loop',
          'Version management and notes',
          'Handover to compositing',
        ],
      },
    ],
    eligibility: [
      'Open to anyone aged 17 and above',
      'Roto experience is helpful but not mandatory',
      'A good eye for detail matters more than prior software knowledge',
    ],
    methodology: [
      'Reverse-engineering real prep problems from breakdown reels',
      'Guided builds followed by independent variations',
      'Loop-based QC discipline drilled from week one',
      'Peer review sessions before mentor review',
    ],
    projects: [
      'Wire removal across a stunt sequence',
      'Tracking marker removal on a moving camera plate',
      'Full crew and equipment removal from a location shot',
      'Cosmetic clean-up on a close-up performance take',
    ],
    careers: [
      'Prep Artist',
      'Paint Artist',
      'Clean-up / Restoration Artist',
      'Progression route into Compositing',
    ],
    faqs: [
      {
        question: 'How is this different from Photoshop retouching?',
        answer:
          'A still image only has to look right once. A prep artist has to make a fix hold across hundreds of frames while the camera moves, the light changes and the grain shifts. Temporal consistency is the whole discipline.',
      },
      {
        question: 'Can I take this alongside Rotoscopy?',
        answer:
          'Yes. Roto and prep are close cousins and many studios hire for a combined "roto/prep" role. Talk to our counsellor about combining both into a single schedule.',
      },
    ],
    featured: true,
    accent: 'ember',
  },
  {
    slug: 'matchmove',
    title: 'Matchmove & Tracking',
    track: '3D / Animation',
    tagline: 'Rebuild the camera that shot the plate.',
    summary:
      'Solve 3D cameras, track objects and reconstruct set geometry so that CG elements sit in the plate as if they were filmed there.',
    overview: [
      'Matchmove is the bridge between live action and CG. Before a single 3D element can be placed in a shot, someone has to work out exactly where the camera was, what lens it used and how it moved.',
      'This programme covers camera solving, object tracking, body tracking and set reconstruction — plus the survey data, lens distortion and scale problems that make real-world tracking harder than the tutorials suggest.',
    ],
    duration: '10 weeks',
    commitment: '2.5 hours a day, 5 days a week',
    level: 'Intermediate',
    format: 'Classroom & Online',
    software: ['3DEqualizer', 'PFTrack', 'Autodesk Maya', 'Nuke'],
    outcomes: [
      'Solve a 3D camera from a live-action plate and validate the solve',
      'Work with lens distortion, undistort and redistort correctly',
      'Track rigid objects and reconstruct their motion in 3D',
      'Rebuild set geometry from survey data and photographs',
      'Establish real-world scale, orientation and ground planes',
      'Deliver scenes that 3D and compositing teams can open without surprises',
    ],
    modules: [
      {
        title: 'Camera and lens theory',
        topics: [
          'Focal length, sensor size and field of view',
          'Lens distortion models',
          'Parallax and depth cues',
          'On-set data: survey, HDRI, lens grids',
        ],
      },
      {
        title: '2D tracking',
        topics: [
          'Feature selection and tracker placement',
          'Manual tracking discipline',
          'Handling occlusion and motion blur',
          'Track filtering and cleanup',
        ],
      },
      {
        title: 'Camera solving',
        topics: [
          'Automatic versus supervised solves',
          'Reading and reducing solve error',
          'Constraints, distance and coordinate systems',
          'Nodal, locked-off and free-moving cameras',
        ],
      },
      {
        title: 'Object and body track',
        topics: [
          'Rigid object tracking',
          'Vehicle and prop tracks',
          'Body matchmove and stand-in geometry',
          'Multi-element scenes',
        ],
      },
      {
        title: 'Set reconstruction and delivery',
        topics: [
          'Photogrammetry basics',
          'Modelling proxy geometry to plate',
          'Scene scale, up-axis and units',
          'Export pipelines to Maya and Nuke',
        ],
      },
    ],
    eligibility: [
      'Comfortable with basic 3D navigation, or completion of a foundation course',
      'Reasonable spatial reasoning and mathematics comfort',
      'Prior roto or prep experience is an advantage',
    ],
    methodology: [
      'Plate-first teaching: every concept is introduced on real footage',
      'Solve-error targets enforced on every assignment',
      'Cross-department handover exercises with compositing students',
      'Weekly technical review of scene hygiene, not just visual result',
    ],
    projects: [
      'Free-moving handheld camera solve with survey validation',
      'Vehicle object track integrated with a plate',
      'Body matchmove for a character replacement shot',
      'Set reconstruction from photographs and measurements',
    ],
    careers: [
      'Matchmove Artist',
      'Tracking Artist',
      'Layout Artist',
      'Progression route into Layout, Previs or Pipeline',
    ],
    faqs: [
      {
        question: 'Do I need to be good at maths?',
        answer:
          'You need to be comfortable with it, not exceptional. Understanding what a solve error actually means, and how scale and units propagate, matters more than being able to derive the equations.',
      },
      {
        question: 'Which tracking software will I actually use?',
        answer:
          'Core teaching is delivered on the tracking package assigned to your batch, with Maya and Nuke for validation and delivery. Tool availability is confirmed at admission — we never promise access to software a batch does not have.',
      },
    ],
    featured: true,
    accent: 'signal',
  },
  {
    slug: 'compositing',
    title: 'VFX Compositing',
    track: '2D / Compositing',
    tagline: 'Where every department’s work becomes one believable image.',
    summary:
      'The flagship 2D programme. Keying, integration, colour, light and the node-based thinking that turns a stack of renders into a shot an audience believes.',
    overview: [
      'Compositing is the last creative stop before a shot is delivered. Every render, plate, matte and element lands on your desk, and the audience only ever sees your version of it.',
      'This programme builds node-based compositing from first principles — linear workflow, premultiplication, merge maths — and then applies it to the problems that fill a real shot list: green screen, CG integration, set extension, atmosphere, damage and grade matching.',
      'You finish with a portfolio of finished shots and, more importantly, the ability to explain why each decision was made. That explanation is what gets you through a studio interview.',
    ],
    duration: '16 weeks',
    commitment: '3 hours a day, 5 days a week',
    level: 'Intermediate to Advanced',
    format: 'Classroom & Online',
    software: ['Nuke', 'Mocha Pro', 'Adobe Photoshop', 'Adobe After Effects'],
    outcomes: [
      'Work confidently in a linear, colour-managed pipeline',
      'Pull clean keys from difficult green and blue screen footage',
      'Integrate CG renders using AOVs, depth and light passes',
      'Match grain, colour, contrast and lens behaviour to the plate',
      'Build readable, efficient node graphs another artist can pick up',
      'Deliver a finished shot with breakdown, versioning and notes',
    ],
    modules: [
      {
        title: 'Compositing fundamentals',
        topics: [
          'Linear workflow and colour management',
          'Premultiplication and alpha maths',
          'Merge operations and channel logic',
          'Node graph structure and readability',
        ],
      },
      {
        title: 'Keying and extraction',
        topics: [
          'Green and blue screen keying strategies',
          'Despill and edge treatment',
          'Combining multiple keys and garbage mattes',
          'Difficult cases: hair, smoke, glass, motion blur',
        ],
      },
      {
        title: 'CG integration',
        topics: [
          'Render passes, AOVs and re-lighting in 2D',
          'Deep compositing concepts',
          'Shadow, reflection and occlusion contact',
          'Interactive light and colour bleed',
        ],
      },
      {
        title: '3D in the composite',
        topics: [
          'Camera projection and set extension',
          'Card-based environments',
          'Point clouds and depth from tracking data',
          'Sky replacement and horizon work',
        ],
      },
      {
        title: 'Atmosphere and finishing',
        topics: [
          'Atmospheric perspective, haze and volumetrics',
          'Lens artefacts: flare, bloom, chromatic aberration',
          'Grain matching and final regrain',
          'Shot finishing and delivery specs',
        ],
      },
      {
        title: 'Production practice',
        topics: [
          'Working to a shot brief and supervisor notes',
          'Scripting basics for repetitive tasks',
          'Template and gizmo hygiene',
          'Building a shot breakdown for your reel',
        ],
      },
    ],
    eligibility: [
      'Graduates of our Foundation track, or equivalent prior experience',
      'Working knowledge of digital imaging concepts',
      'Portfolio or assessment task reviewed before admission',
    ],
    methodology: [
      'Shot-based learning — every module ends in a finished frame sequence',
      'Dailies-style reviews where you present and defend your work',
      'Supervisor notes delivered in production language',
      'Final term run as a simulated shot production with deadlines',
    ],
    projects: [
      'Green screen character integration into a location plate',
      'Full CG element integration with matched lighting',
      'Set extension using camera projection',
      'A finished portfolio shot with a published breakdown',
    ],
    careers: [
      'Junior Compositor',
      'Compositing Artist',
      'Roto / Prep to Comp progression',
      'Longer-term routes into Lead Compositor and 2D Supervisor',
    ],
    faqs: [
      {
        question: 'Do I need to finish a foundation course first?',
        answer:
          'Not necessarily. If you already have plate-level experience or a portfolio, we will assess you directly. If you are starting from zero, the foundation track makes this programme far easier to absorb.',
      },
      {
        question: 'Will I learn scripting?',
        answer:
          'You will learn enough Python to automate repetitive setup, read an existing tool and understand what a pipeline team is doing. This is not a full software-development course.',
      },
      {
        question: 'What does the final portfolio look like?',
        answer:
          'Typically three to five finished shots with breakdowns, cut into a short reel. We prioritise a small number of genuinely finished shots over a long reel of half-solved ones.',
      },
    ],
    featured: true,
    accent: 'ember',
  },
  {
    slug: '3d-generalist',
    title: '3D for VFX',
    track: '3D / Animation',
    tagline: 'Model, texture, light and render elements that belong in the plate.',
    summary:
      'A broad 3D foundation built specifically for visual effects — asset creation, look development, lighting and rendering with integration as the goal from day one.',
    overview: [
      'A 3D artist working in VFX has a different job from one working in games or product visualisation: the render has to sit inside footage that already exists, under light that was already there.',
      'This programme covers modelling, UVs, texturing, shading, lighting and rendering, always in service of integration. You learn to light to an HDRI and a grey ball, to render the passes compositing actually needs, and to keep a scene organised enough for someone else to open it.',
    ],
    duration: '24 weeks',
    commitment: '3 hours a day, 5 days a week',
    level: 'Beginner to Intermediate',
    format: 'Classroom & Online',
    software: ['Autodesk Maya', 'Blender', 'Adobe Substance 3D Painter', 'Nuke'],
    outcomes: [
      'Model clean hard-surface and environment assets to a brief',
      'Lay out UVs and author PBR textures that hold up in close-up',
      'Build materials that respond correctly to varying light',
      'Light a CG element to match a plate using HDRI and reference',
      'Render layered passes and AOVs designed for compositing',
      'Keep scenes, naming and outputs organised to pipeline standards',
    ],
    modules: [
      {
        title: '3D foundations',
        topics: [
          'Viewport, transforms and scene hierarchy',
          'Units, scale and real-world measurement',
          'Polygon modelling fundamentals',
          'Working to reference and orthographic guides',
        ],
      },
      {
        title: 'Asset creation',
        topics: [
          'Hard-surface modelling',
          'Topology for deformation and detail',
          'UV layout and packing',
          'High-to-low detail transfer and baking',
        ],
      },
      {
        title: 'Texturing and look development',
        topics: [
          'PBR theory in practice',
          'Procedural and hand-authored texturing',
          'Material layering, wear and edge damage',
          'Look-dev turntables and neutral lighting setups',
        ],
      },
      {
        title: 'Lighting for integration',
        topics: [
          'Three-point lighting and its limits',
          'HDRI-based lighting from set reference',
          'Grey ball, chrome ball and colour chart workflow',
          'Shadow, bounce and contact behaviour',
        ],
      },
      {
        title: 'Rendering and output',
        topics: [
          'Sampling, noise and render optimisation',
          'Render layers and AOVs',
          'Cryptomatte and utility passes',
          'Output formats, colour space and handover',
        ],
      },
      {
        title: 'Environment and integration project',
        topics: [
          'Set extension geometry',
          'Camera-matched asset placement',
          'Working from a matchmove scene',
          'Delivering to a compositor',
        ],
      },
    ],
    eligibility: [
      'Open to beginners; no prior 3D experience required',
      'A computer capable of running 3D software (specifications shared at admission)',
      'Willingness to work from reference rather than memory',
    ],
    methodology: [
      'Reference-driven briefs — every asset starts with real-world imagery',
      'Weekly look-dev turntable reviews',
      'Integration checkpoints with a supplied plate and camera',
      'Cross-department final project with compositing students',
    ],
    projects: [
      'Hard-surface prop taken from block-out to final render',
      'Textured asset presented on a look-dev turntable',
      'CG element lit and integrated into a supplied plate',
      'Environment set extension delivered in passes',
    ],
    careers: [
      'Junior 3D Artist',
      'Modelling or Texturing Artist',
      'Lighting Artist',
      'Progression routes into Look Development and Environment',
    ],
    faqs: [
      {
        question: 'Maya or Blender?',
        answer:
          'Both appear in the programme. Maya remains the common language of most VFX facilities; Blender is taught because it is free, capable and increasingly present in smaller studios. The principles transfer either way.',
      },
      {
        question: 'Is this enough to become a specialist?',
        answer:
          'It is enough to make you employable as a junior and to reveal which specialism suits you. Depth in a single discipline comes next — usually through a focused portfolio push after the programme.',
      },
    ],
    featured: true,
    accent: 'signal',
  },
  {
    slug: 'animation',
    title: 'Animation for VFX',
    track: '3D / Animation',
    tagline: 'Weight, timing and performance that survive a live-action cut.',
    summary:
      'Principle-led character and creature animation, taught for shots that have to sit next to filmed performance and match a real camera.',
    overview: [
      'Animating for visual effects is a specific discipline. Your character shares the frame with a real actor, lit by a real light, seen through a real lens — and any error in weight, timing or contact reads instantly.',
      'You start with the fundamentals of movement, then move into body mechanics, creature locomotion and performance, always working against plates and matched cameras rather than in an empty grey room.',
    ],
    duration: '16 weeks',
    commitment: '3 hours a day, 5 days a week',
    level: 'Beginner to Intermediate',
    format: 'Classroom & Online',
    software: ['Autodesk Maya', 'Blender', 'Nuke'],
    outcomes: [
      'Apply the animation principles deliberately rather than decoratively',
      'Animate believable weight, balance and contact',
      'Work in a blocking → spline → polish workflow',
      'Animate to a matched camera and live-action plate',
      'Read and act on animation notes in production language',
      'Present shots in a playblast review with clear context',
    ],
    modules: [
      {
        title: 'Principles in motion',
        topics: [
          'Timing, spacing and arcs',
          'Anticipation, overlap and follow-through',
          'Bouncing ball to pendulum progressions',
          'Reading a graph editor fluently',
        ],
      },
      {
        title: 'Body mechanics',
        topics: [
          'Weight shift, balance and centre of gravity',
          'Walks, runs and directional change',
          'Jumps, landings and impact',
          'Lifting, pushing and physical effort',
        ],
      },
      {
        title: 'Creature and quadruped',
        topics: [
          'Quadruped gaits and locomotion cycles',
          'Anatomy-driven motion',
          'Flight and non-human movement',
          'Scale and mass perception',
        ],
      },
      {
        title: 'Performance',
        topics: [
          'Acting choices and intent',
          'Facial and body performance basics',
          'Working to dialogue or reference footage',
          'Subtlety and restraint in realistic shots',
        ],
      },
      {
        title: 'Integration shots',
        topics: [
          'Animating to a matched camera',
          'Interaction with live-action performers',
          'Ground contact and environment collision',
          'Playblast, review and iteration',
        ],
      },
    ],
    eligibility: [
      'Open to beginners with a strong interest in movement and observation',
      'Prior 3D navigation experience is useful but not required',
      'Access to a machine capable of running 3D animation software',
    ],
    methodology: [
      'Reference-first: every shot begins with filmed or sourced reference',
      'Blocking approval before splining, exactly as in a studio',
      'Weekly playblast reviews with structured notes',
      'Final term dedicated to two portfolio-grade shots',
    ],
    projects: [
      'Body mechanics shot demonstrating weight and impact',
      'Quadruped or creature locomotion cycle',
      'Acting shot with a clear intent and beat',
      'Integration shot animated to a live-action plate',
    ],
    careers: [
      'Junior Animator',
      'Creature or Body Mechanics Animator',
      'Previs Animator',
      'Progression routes into Layout and Previsualisation',
    ],
    faqs: [
      {
        question: 'How many shots will be on my reel?',
        answer:
          'Usually two to four, finished to a standard you can defend. Animation reels are judged on the weakest shot, so we prune aggressively.',
      },
      {
        question: 'Do you teach rigging?',
        answer:
          'You learn enough rig anatomy to animate confidently and to diagnose a rig problem. Full rigging is a separate specialism and is not the focus of this programme.',
      },
    ],
    featured: false,
    accent: 'signal',
  },
  {
    slug: 'vfx-production',
    title: 'VFX Production Programme',
    track: 'Production',
    tagline: 'A full pipeline, end to end, the way a facility actually runs it.',
    summary:
      'Our most comprehensive programme. Foundation craft, a chosen specialism and a supervised production term where you work a shot list to deadline.',
    overview: [
      'This is the long-form programme for artists who want more than a single skill. It begins with the foundation disciplines that every pipeline depends on, moves into a specialism you choose with your mentor, and ends in a supervised production term.',
      'In that final term you are not doing exercises. You receive a shot list, a schedule and a supervisor, and you deliver — with dailies, versioning, notes and handovers between departments. It is the closest thing to a studio floor that a classroom can honestly offer.',
    ],
    duration: '12 months',
    commitment: '4 hours a day, 5 days a week',
    level: 'Beginner to Intermediate',
    format: 'Classroom',
    software: ['Nuke', 'Autodesk Maya', 'Silhouette', 'Mocha Pro', 'Adobe Photoshop'],
    outcomes: [
      'Work fluently across roto, prep, tracking and compositing',
      'Specialise in one discipline to a portfolio-ready standard',
      'Understand how a shot moves through a facility and who depends on you',
      'Operate inside a versioned, note-driven production workflow',
      'Meet deadlines under supervision with realistic shot loads',
      'Leave with a curated reel, a breakdown and interview preparation',
    ],
    modules: [
      {
        title: 'Term 1 — Foundation',
        topics: [
          'Rotoscopy and matte craft',
          'Paint, prep and clean plates',
          'Imaging, colour and plate literacy',
          'Studio conventions and file discipline',
        ],
      },
      {
        title: 'Term 2 — Core pipeline',
        topics: [
          'Tracking and matchmove',
          'Compositing fundamentals',
          '3D fundamentals for VFX',
          'Cross-department handover practice',
        ],
      },
      {
        title: 'Term 3 — Specialisation',
        topics: [
          'Chosen track: compositing, 3D or animation',
          'Advanced problem sets in your discipline',
          'Mentor-guided portfolio planning',
          'Technical depth and speed building',
        ],
      },
      {
        title: 'Term 4 — Supervised production',
        topics: [
          'Assigned shot list with schedule',
          'Daily reviews and supervisor notes',
          'Version control and delivery',
          'Reel edit, breakdown and interview preparation',
        ],
      },
    ],
    eligibility: [
      'Open to beginners; commitment matters more than experience',
      'Interview and aptitude discussion before admission',
      'Full-time availability across the programme duration',
    ],
    methodology: [
      'Progressive structure: craft, then specialism, then production',
      'A named mentor throughout the programme',
      'Studio-format dailies from term two onward',
      'Final term run to a schedule with real deliverables',
    ],
    projects: [
      'Foundation shot set across roto, prep and tracking',
      'Specialisation portfolio built over term three',
      'Supervised shot list delivered under deadline',
      'Final showreel with breakdowns',
    ],
    careers: [
      'Junior roles across roto, prep, tracking and compositing',
      'Specialist junior positions in your chosen discipline',
      'Studio-ready portfolio and interview preparation',
      'Career guidance sessions with mentors from the industry',
    ],
    faqs: [
      {
        question: 'Can I change my specialisation?',
        answer:
          'Your specialisation is chosen at the end of term two, with your mentor, based on how your work has actually developed. That is usually more accurate than deciding on day one.',
      },
      {
        question: 'Do you guarantee a job?',
        answer:
          'No, and you should be cautious of anyone who does. What we commit to is portfolio quality, interview preparation, industry-standard working habits and honest guidance about where your work currently stands.',
      },
      {
        question: 'Is there a part-time version?',
        answer:
          'The production term needs sustained availability, so the full programme is offered full-time. Individual courses can be taken separately at a slower pace — speak to our counsellor about sequencing them.',
      },
    ],
    featured: true,
    accent: 'ember',
  },
  {
    slug: 'motion-graphics',
    title: 'Motion Graphics & Design',
    track: '2D / Compositing',
    tagline: 'Design that moves — titles, broadcast, explainers and screen graphics.',
    summary:
      'Design principles, typography and animation for title sequences, broadcast packages, screen graphics and social-first content.',
    overview: [
      'Motion graphics sits where graphic design meets animation. It is the fastest-growing commercial application of the skills taught in this academy, and it demands a designer’s eye as much as an animator’s timing.',
      'You work through composition, colour and typography before animating anything, then move into kinetic type, shape animation, 2.5D camera work and the screen-graphics language used in film and television.',
    ],
    duration: '12 weeks',
    commitment: '2.5 hours a day, 5 days a week',
    level: 'Beginner to Intermediate',
    format: 'Classroom & Online',
    software: ['Adobe After Effects', 'Adobe Illustrator', 'Adobe Photoshop', 'Blender'],
    outcomes: [
      'Apply layout, hierarchy and colour theory to moving design',
      'Animate typography with intent rather than presets',
      'Build shape and mask-based animation systems',
      'Work in 2.5D space with cameras, parallax and depth',
      'Design broadcast and screen-graphics packages to a brief',
      'Deliver in the formats and aspect ratios each platform requires',
    ],
    modules: [
      {
        title: 'Design foundations',
        topics: [
          'Composition, grid and hierarchy',
          'Colour theory for screen',
          'Typography fundamentals',
          'Building a visual language from a brief',
        ],
      },
      {
        title: 'Motion principles',
        topics: [
          'Easing, timing and rhythm',
          'Keyframe and graph editor control',
          'Transitions and continuity',
          'Sound-led timing',
        ],
      },
      {
        title: 'Kinetic typography and shapes',
        topics: [
          'Text animators and selectors',
          'Shape layer systems',
          'Masks, mattes and reveals',
          'Expression basics for repeatable motion',
        ],
      },
      {
        title: '2.5D and integration',
        topics: [
          'Cameras, parallax and depth',
          'Tracking graphics into live footage',
          'Simple 3D elements in a design context',
          'Screen replacement and UI graphics',
        ],
      },
      {
        title: 'Packages and delivery',
        topics: [
          'Title sequence design',
          'Broadcast and social package systems',
          'Aspect ratios and safe areas',
          'Export settings, codecs and handover',
        ],
      },
    ],
    eligibility: [
      'Open to beginners with an interest in design',
      'Prior graphic design exposure is helpful but not required',
      'A design sensibility can be built — bring curiosity',
    ],
    methodology: [
      'Brief-driven projects with defined constraints',
      'Design critique before animation begins',
      'Style-frame approval workflow, as agencies use',
      'Final term dedicated to a complete package build',
    ],
    projects: [
      'Kinetic typography piece cut to audio',
      'Animated logo and identity sting',
      'Screen-graphics package tracked into footage',
      'Complete title sequence with style frames',
    ],
    careers: [
      'Motion Graphics Artist',
      'Broadcast Design Artist',
      'Title and Screen Graphics Artist',
      'Freelance and agency motion design',
    ],
    faqs: [
      {
        question: 'Is motion graphics part of VFX?',
        answer:
          'They overlap heavily. Screen graphics, titles and heads-up displays in films are made by motion designers, and the compositing skills are shared. Many artists work across both.',
      },
      {
        question: 'Do I need to be able to draw?',
        answer:
          'No, but you do need to develop taste. We spend real time on design fundamentals before touching animation, because good motion cannot rescue a weak layout.',
      },
    ],
    featured: false,
    accent: 'signal',
  },
];

/** Courses shown on the home page grid. */
export const featuredCourses = courses.filter((course) => course.featured);

export function getCourseBySlug(slug: string | undefined): Course | undefined {
  if (!slug) return undefined;
  return courses.find((course) => course.slug === slug);
}

/** Distinct tracks, in catalogue order — drives the Courses page filter. */
export const courseTracks = Array.from(new Set(courses.map((course) => course.track)));

/** Options for the enquiry form's course dropdown. */
export const courseOptions = [
  ...courses.map((course) => ({ value: course.slug, label: course.title })),
  { value: 'not-sure', label: 'Not sure yet — please advise' },
];
