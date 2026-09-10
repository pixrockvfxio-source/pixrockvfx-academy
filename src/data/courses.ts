import type { Course } from '@/types/content';

/**
 * Course catalogue — PixRock Academy, from VFX & Real-Time Curriculum v3.0
 * and the Parent Brochure Copy v1.0.
 *
 * This is the single source of truth for cards, filters, detail pages, the
 * enquiry dropdown, the footer and the sitemap. Adding a course means adding
 * one object here.
 *
 * THREE RULES FROM THE BROCHURE APPLY TO EVERY LINE OF COPY BELOW. They are
 * policy, not style, and the brochure states they cover the website as well as
 * print, WhatsApp and counselling:
 *
 *   1. "Placement assistance" — never "placement guarantee", "100% placement"
 *      or "assured job". There is no exception. See scripts/check-language.mjs,
 *      which fails the build if such a phrase appears anywhere in the site.
 *   2. Every fee shown is GST-INCLUSIVE. Only `feeInclGst` is stored, so an
 *      ex-GST figure cannot reach a page by accident.
 *   3. The academy has no graduates yet — first intake April 2027. Nothing
 *      here may imply a placement record, salary outcome or alumni result.
 *
 * Deliberately NOT included, per [VERIFY] markers in the source documents:
 *   - EMI / monthly instalment figures (NBFC partner not signed) — language-ok
 *   - Starting salary ranges (must be substantiated against PixRock bands)
 *   - Named film or client credits (NDA — use "major studios and streaming
 *     platforms")
 *   - Career Pro internship specifics (pending the TPN auditor ruling)
 */
export const courses: Course[] = [
  {
    slug: 'roto',
    title: 'VFX Foundation — Roto Artist',
    shortTitle: 'Roto Artist',
    tier: 'Foundation',
    tierLabel: 'Tier 1 · Foundation',
    tagline: 'The shortest credible path from no experience to employable.',
    summary:
      'Rotoscoping is the foundation every VFX shot passes through, and where Indian studios hire in the largest numbers. Three months, no art background required.',
    overview: [
      'Rotoscoping is the precise, frame-by-frame separation of people and objects from a filmed plate. Everything downstream — paint, matchmove, CG, compositing — depends on it being done well.',
      'This is a craft course, not a software tour. You learn how a shot actually moves through a studio, then spend the bulk of your time on plates with real problems in them: heavy motion blur, defocus, low contrast, compression. Alongside that runs a production discipline module covering shot naming, versioning, submission checklists and dailies etiquette — the habits that make an artist easy to hire.',
      'Your final block is six to eight supervised shots cut to studio specification and reviewed by a PixRock prep supervisor.',
    ],
    duration: '3 months',
    weeks: 12,
    contactHours: 180,
    feeInclGst: 47200,
    level: 'Entry level',
    bestFor:
      'A student who has finished 12th and wants to enter the industry quickly, or a college student building a skill alongside a degree. No drawing background required.',
    leavesWith:
      'A portfolio of 6–8 completed shots reviewed to studio standard, and the skills for a Junior Roto Artist role.',
    software: ['Nuke', 'Silhouette', 'Mocha Pro', 'Adobe Photoshop'],
    outcomes: [
      'Read a plate and plan a shape hierarchy before animating anything',
      'Animate splines with disciplined point counts and clean tangents',
      'Handle motion blur, edge softness and garbage mattes convincingly',
      'Build articulated roto — a body rig made from shapes',
      'Drive shapes with planar and point tracking instead of animating everything by hand',
      'Hold consistency across a 40-shot sequence, and work to a studio quota',
    ],
    modules: [
      {
        title: 'Image and pipeline literacy',
        meta: 'Month 1 · 60 hrs',
        topics: [
          'How a shot moves through a studio: plate → prep → matchmove → CG → comp → DI',
          'Resolution, bit depth, colour space, linear vs log, sRGB vs Rec.709, ACES in plain English',
          'Production file formats: EXR and why, DPX, image sequences vs movies',
          'Photoshop for VFX: layers, masking, clone and heal, non-destructive habits',
          'Nuke interface and node graph: Read/Write, Merge, Transform, viewer processes',
        ],
      },
      {
        title: 'Core rotoscoping',
        meta: 'Month 2 · 60 hrs',
        topics: [
          'Shape theory: point count discipline, why fewer points animate better, tangent control',
          'Silhouette and Nuke roto — Silhouette for volume, Nuke for comp-integrated work',
          'Organic roto: faces, hair, hands, cloth',
          'Hard-surface roto: vehicles and props',
          'Articulated roto and hierarchy — building a body rig from shapes',
          'Motion blur matching, edge softness, garbage mattes',
        ],
      },
      {
        title: 'Advanced roto and delivery',
        meta: 'Month 3 · 60 hrs',
        topics: [
          'Tracker-assisted roto: planar tracking in Mocha, point tracking to drive shapes',
          'Difficult cases: heavy motion blur, defocus, low contrast, compressed plates',
          'Sequence-level consistency across 40 shots, not perfection on one',
          'Speed under deadline — timed exercises against studio quota expectations',
          'Final block: 6–8 supervised shots to studio spec, reviewed by a PixRock prep supervisor',
        ],
      },
      {
        title: 'Production discipline',
        meta: 'Runs across all 3 months',
        topics: [
          'Shot naming conventions',
          'Versioning, WIP versus publish',
          'Submission checklists',
          'Dailies etiquette and taking notes',
        ],
      },
    ],
    eligibility: [
      '12th pass',
      'Basic computer literacy',
      'No art or drawing background required',
    ],
    methodology: [
      'Exercises built from anonymised shot types drawn from completed PixRock projects, not generic tutorial footage',
      'Weekly submissions with faculty feedback',
      'Monthly gate review by a working PixRock supervisor',
      'Timed exercises against studio quota expectations in the final month',
    ],
    projects: [
      'Organic roto: faces, hair, hands and cloth on moving plates',
      'Hard-surface roto across vehicles and props',
      'Articulated full-body roto built as a shape hierarchy',
      'Final block of 6–8 supervised shots delivered to studio spec',
    ],
    careers: ['Junior Roto Artist', 'Progression into Prep, and from there into Compositing or Matchmove'],
    faqs: [
      {
        question: 'Is roto a dead end?',
        answer:
          'No — it is the entry point. Roto is where Indian service studios hire in the largest numbers, and the plate-reading skills transfer directly into prep and compositing. Our ladder is built so that the exit review of this course is the start of the conversation about the next one.',
      },
      {
        question: 'Do I need to be able to draw?',
        answer:
          'No. Roto rewards observation, patience and discipline far more than drawing ability. Students arrive here with no art background regularly.',
      },
      {
        question: 'Can I upgrade to the Prep Artist course afterwards?',
        answer:
          'Yes. Roto graduates enter the Prep Artist course at Month 3 and pay a bridge upgrade fee of ₹47,200 (incl. GST) rather than the full course fee.',
      },
    ],
    featured: true,
    published: true,
    accent: 'signal',
  },

  {
    slug: 'prep',
    title: 'VFX Foundation — Prep Artist',
    shortTitle: 'Prep Artist',
    tier: 'Foundation',
    tierLabel: 'Tier 1 · Foundation',
    tagline: 'Clean plate work — the cleanup craft studios value most highly.',
    summary:
      'Everything in the Roto course, plus wire and rig removal, beauty work and clean plate construction. A wider skill set and a higher starting band.',
    overview: [
      'Prep artists remove what should never have been in the frame — safety wires, rigs, tracking markers, crew, equipment — and rebuild what was hidden behind them.',
      'The heart of this course is clean plate construction, taught as a full multi-week block because it is the single most valuable prep skill and the one studios are most short of. You learn to think in terms of source: where can this pixel legitimately come from, and will the fix hold across the whole sequence?',
      'The course opens with a compressed version of the Roto syllabus. Roto Artist graduates skip that block and join at Month 3 on the bridge upgrade.',
    ],
    duration: '4 months',
    weeks: 16,
    contactHours: 240,
    feeInclGst: 88500,
    feeNote: 'Roto Artist graduates continue at a bridge upgrade fee of ₹47,200 (incl. GST).',
    level: 'Entry to intermediate',
    bestFor: 'A student who wants a stronger entry point and a wider skill set from the start.',
    leavesWith:
      'A broader portfolio spanning roto, paint and clean plate work, and entry at a higher starting band than a Roto graduate.',
    software: ['Nuke', 'Silhouette', 'Mocha Pro', 'Adobe Photoshop'],
    outcomes: [
      'Construct clean plates that hold across an entire sequence',
      'Remove wires, rigs and tracking markers without temporal flicker',
      'Repair dust, dead pixels and sensor artefacts',
      'Carry out beauty work: skin cleanup, scar and tattoo removal',
      'Use 2D and 2.5D projection cleanup for moving-camera removals',
      'Hand off correctly to matchmove, comp and CG — the right thing in the right format',
    ],
    modules: [
      {
        title: 'Roto foundation',
        meta: 'Months 1–2 · 120 hrs',
        topics: [
          'Compressed version of the full Roto Artist syllabus',
          'Image, colour and pipeline literacy',
          'Shape theory, organic and hard-surface roto, articulated roto',
          'Roto Artist graduates skip this block via the bridge upgrade',
        ],
      },
      {
        title: 'Paint and cleanup',
        meta: 'Month 3 · 60 hrs',
        topics: [
          'Wire removal, rig removal, tracking-marker removal',
          'Clean plate construction — taught as a full multi-week block',
          'Patch and projection cleanup; temporal consistency across a sequence',
          'Dust busting, dead pixel and sensor artefact repair',
          'Beauty work: skin cleanup, scar and tattoo removal',
          'Split-screen and stabilisation-based cleanup',
        ],
      },
      {
        title: 'Advanced prep and integration',
        meta: 'Month 4 · 60 hrs',
        topics: [
          '2D and 2.5D projection cleanup in Nuke; camera projection for moving-camera removals',
          'Basic tracking and stabilisation to support cleanup',
          'Set and crew removal from complex plates',
          'Prep handoff: what matchmove, comp and CG each need, and in what format',
          'Final block: 8–10 shots spanning roto, paint and clean plate, reviewed by a PixRock prep supervisor',
        ],
      },
    ],
    eligibility: [
      '12th pass',
      'No prior VFX experience required',
      'Roto Artist graduates enter at Month 3 via the bridge upgrade',
    ],
    methodology: [
      'Clean plate work taught as an extended block, not a single session',
      'Temporal QC on a loop drilled from the first week',
      'Monthly gate review by a working PixRock supervisor',
      'Cross-department handoff exercises against real downstream requirements',
    ],
    projects: [
      'Wire and rig removal across a moving-camera sequence',
      'Clean plate construction rebuilt from adjacent frames',
      'Set and crew removal from a complex plate',
      'Final block of 8–10 shots spanning roto, paint and clean plate',
    ],
    careers: ['Junior Prep Artist', 'Junior Paint / Cleanup Artist', 'Progression into Compositing'],
    faqs: [
      {
        question: 'How is this different from photo retouching?',
        answer:
          'A still image only has to look right once. A prep artist has to make a fix hold across hundreds of frames while the camera moves, the light changes and the grain shifts. Temporal consistency is the whole discipline.',
      },
      {
        question: 'I finished the Roto Artist course. Do I repeat the roto content?',
        answer:
          'No. You join at Month 3, straight into paint and cleanup, and pay the bridge upgrade fee of ₹47,200 (incl. GST) rather than the full ₹88,500.',
      },
    ],
    featured: true,
    published: true,
    accent: 'ember',
  },

  {
    slug: 'compositing',
    title: 'VFX Professional — Compositing (Nuke)',
    shortTitle: 'Compositing (Nuke)',
    tier: 'Professional',
    tierLabel: 'Tier 2 · Professional',
    tagline: 'The final assembly of a shot — and the most in-demand entry discipline.',
    summary:
      'Six months in Nuke, the compositor used by essentially every major studio: keying, CG integration, set extension and photorealistic finishing.',
    overview: [
      'Compositing is the last creative stop before a shot is delivered. Live footage, computer-generated elements and painted backgrounds are combined so convincingly that the audience never notices the work was done.',
      'The course opens with a four-week Shared Core taught alongside the Matchmove students — image science, colour management and ACES for real, camera fundamentals, on-set data, Nuke in depth and Maya orientation. A student who has chosen the wrong stream can still switch in week 4.',
      'The remaining twenty weeks are Nuke: keying and edge craft, multi-pass CG and deep compositing, 3D in Nuke, and the photorealism craft — grain, lens artefacts, atmospherics, black levels — that separates a shot that reads from one that does not. The digital matte painting and environment content sits inside this course as a four-week block.',
    ],
    duration: '6 months',
    weeks: 24,
    contactHours: 360,
    feeInclGst: 141600,
    level: 'Intermediate',
    bestFor:
      'A student who is serious about VFX as a long-term career, or a graduate of our Foundation courses moving up. It suits patience and an eye for detail.',
    leavesWith:
      'Six to eight finished shots across at least four shot types, and the skills for a Junior Compositor role.',
    software: ['Nuke', 'NukeX', 'Maya', 'Mocha Pro', 'Adobe Photoshop'],
    outcomes: [
      'Work fluently in a linear, colour-managed pipeline and in ACES',
      'Pull and combine keys — Keylight, Primatte, IBK — with despill, edge extension and light wrap',
      'Composite multi-pass CG: AOVs, beauty rebuilds, cryptomatte, per-object control',
      'Use deep compositing where it saves you, and recognise where it costs you',
      'Build set extensions, screen inserts and sky replacements with 3D in Nuke',
      'Match grain, lens artefacts, atmospherics and contact shadows to the plate',
      'Write expressions, gizmos and Python to automate repetitive setup',
    ],
    modules: [
      {
        title: 'Shared Core',
        meta: '4 weeks · 60 hrs · with the Matchmove stream',
        topics: [
          'Image science and linear workflow in depth; colour management and ACES for real',
          'Camera fundamentals: focal length, sensor size, FOV, depth of field, lens distortion, shutter angle',
          'On-set data: HDRIs, chrome and grey balls, survey, lens grids — and what breaks without them',
          'Nuke node graph in depth',
          'Maya orientation: viewport, transforms, cameras, scene scale, alembic in and out',
          'Reading supervisor notes and turning notes into versions',
        ],
      },
      {
        title: 'Keying and edge craft',
        meta: 'Weeks 5–9',
        topics: [
          'Keylight, Primatte, IBK and the multi-key approach',
          'Despill, edge extension, light wrap',
          'Difficult cases: hair, smoke, glass, motion blur',
          'Garbage mattes and roto-assisted extraction at scale',
        ],
      },
      {
        title: 'CG integration',
        meta: 'Weeks 10–14',
        topics: [
          'Multi-pass CG compositing: AOVs, rebuilding beauty, cryptomatte, per-object control',
          'Deep compositing: deep merges, holdouts, when it helps and when it hurts',
          'Matching lighting, colour, contrast and contact shadows to the plate',
          'Rotomation-assisted comps and clean plate reuse at scale',
        ],
      },
      {
        title: '3D in Nuke and environments',
        meta: 'Weeks 15–20',
        topics: [
          'Cards, camera projection, ScanlineRender',
          'Set extension, screen inserts, sky replacement',
          '2.5D projections',
          'Digital matte painting and environment integration — a full 4-week block',
        ],
      },
      {
        title: 'Photorealism and finishing',
        meta: 'Weeks 21–22',
        topics: [
          'Grain matching and regrain',
          'Lens artefacts, chromatic aberration, bloom',
          'Atmospherics and black levels',
          'Stereo and multi-format awareness (overview)',
        ],
      },
      {
        title: 'Automation and final block',
        meta: 'Weeks 23–24',
        topics: [
          'Expressions, gizmos and Python for Nuke',
          'Template and script hygiene another artist can pick up',
          'Final block: 6–8 finished shots across at least four shot types',
          'Breakdown reel construction',
        ],
      },
    ],
    eligibility: [
      '12th pass',
      'Foundation graduates progress directly',
      'Applicants without prior experience are assessed at admission',
    ],
    methodology: [
      'Shared Core taught to a combined cohort, with a stream switch still possible in week 4',
      'Shot-based learning — every module ends in a finished frame sequence',
      'Monthly gate review by a working PixRock supervisor',
      'Supervisor notes delivered in production language, turned into versions',
    ],
    projects: [
      'Green screen character integration into a location plate',
      'Multi-pass CG element integrated with matched lighting',
      'Set extension built with camera projection',
      'Final block of 6–8 finished shots across at least four shot types',
    ],
    careers: ['Junior Compositor', 'Progression into Lead Compositor and 2D Supervisor over time'],
    faqs: [
      {
        question: 'Do I need to complete a Foundation course first?',
        answer:
          'Not necessarily. Foundation graduates progress straight in; applicants coming from elsewhere are assessed at admission. If you are starting from zero, the Foundation courses make this programme considerably easier to absorb.',
      },
      {
        question: 'Will I learn scripting?',
        answer:
          'You will learn enough Python and expression work to automate repetitive setup and read an existing tool. This is not a software development course.',
      },
      {
        question: 'What happened to the separate matte painting course?',
        answer:
          'Digital matte painting and environment integration is taught inside this course as a four-week block, rather than as a separate programme.',
      },
    ],
    featured: true,
    published: true,
    accent: 'ember',
  },

  {
    slug: 'matchmove',
    title: 'VFX Professional — Matchmove & Layout',
    shortTitle: 'Matchmove & Layout',
    tier: 'Professional',
    tierLabel: 'Tier 2 · Professional',
    tagline: 'Rebuild the real camera inside the computer.',
    summary:
      'Camera solving, tracking, layout and rotomation. Less visible than compositing, needed on every project, and often less crowded at the hiring stage.',
    overview: [
      'Matchmove is the work of recreating the real camera’s movement inside a computer so that digital elements sit convincingly in the shot. Before any CG can be placed, someone has to work out where the camera was, what lens it used and how it moved.',
      'The course opens with the same four-week Shared Core as Compositing, then goes deep into camera solving in 3DEqualizer, lens distortion workflow, survey data, and object tracking. A large part of the second half is body track and rotomation in Maya — animating digital doubles to match real performers — because that is where matchmove artists add the most billable value.',
      'A two-week bridge module covers how a solve feeds a virtual camera pipeline in Unreal.',
    ],
    duration: '6 months',
    weeks: 24,
    contactHours: 360,
    feeInclGst: 141600,
    level: 'Intermediate',
    bestFor: 'A student who is technically minded and comfortable with spatial and mathematical thinking.',
    leavesWith:
      'A portfolio of 10–12 camera solves plus rotomation work, and the skills for a Junior Matchmove Artist role.',
    software: ['3DEqualizer', 'Maya', 'Nuke', 'Unreal Engine 5'],
    outcomes: [
      'Solve 3D cameras in 3DEqualizer and validate the solve before it ships',
      'Handle lens distortion properly: grid shooting, undistort and redistort',
      'Work from survey data and set measurement; use lidar and photogrammetry basics',
      'Track rigid and then articulated objects',
      'Body track and rotomate in Maya to match a real performer',
      'Assemble layout to plate: scale, units and coordinate alignment',
      'Deliver scenes anim, FX and comp can open without surprises',
    ],
    modules: [
      {
        title: 'Shared Core',
        meta: '4 weeks · 60 hrs · with the Compositing stream',
        topics: [
          'Image science and linear workflow; colour management and ACES',
          'Camera fundamentals: focal length, sensor size, FOV, depth of field, lens distortion, shutter angle',
          'On-set data: HDRIs, chrome and grey balls, survey, lens grids',
          'Nuke node graph in depth',
          'Maya orientation: viewport, transforms, cameras, scene scale, alembic in and out',
        ],
      },
      {
        title: 'Camera solving',
        meta: 'Weeks 5–10',
        topics: [
          'Camera solving in 3DEqualizer as the primary tool',
          'Nuke CameraTracker as the secondary route',
          'Lens distortion: grid shooting, undistort and redistort workflow',
          'Why comp rejects a bad solve, and how to read solve error',
        ],
      },
      {
        title: 'Survey and object tracking',
        meta: 'Weeks 11–14',
        topics: [
          'Survey data and set measurement',
          'Lidar and photogrammetry basics',
          'Rigid object tracking',
          'Articulated object tracking',
        ],
      },
      {
        title: 'Body track and rotomation',
        meta: 'Weeks 15–19 · extended block',
        topics: [
          'Body matchmove in Maya',
          'Rotomation to match a filmed performance',
          'Stand-in geometry and digital doubles',
          'Where rotomation adds the most billable value on a show',
        ],
      },
      {
        title: 'Layout and set modelling',
        meta: 'Weeks 20–22',
        topics: [
          'Scene assembly, scale, units, coordinate alignment with the plate',
          'Set modelling for layout — simple accurate geometry from survey and photographs',
          'Crowd and vehicle layout',
          'Multi-shot sequence continuity',
        ],
      },
      {
        title: 'Unreal bridge and final block',
        meta: 'Weeks 23–24',
        topics: [
          'How a solve feeds a virtual camera pipeline in Unreal',
          'Deliverables discipline: what anim, FX and comp each expect',
          'Final block: 10–12 solves across handheld, crane, drone, vehicle-mount and locked-off plates',
          'Plus 2 rotomation shots',
        ],
      },
    ],
    eligibility: [
      '12th pass',
      'Comfort with spatial and mathematical thinking',
      'Foundation graduates progress directly; others are assessed at admission',
    ],
    methodology: [
      'Shared Core taught with the Compositing cohort, stream switch possible in week 4',
      'Solve-error targets enforced on every assignment',
      'Cross-department handover exercises with compositing students',
      'Monthly gate review by a working PixRock supervisor',
    ],
    projects: [
      'Free-moving handheld camera solve validated against survey',
      'Vehicle and object tracks integrated with a plate',
      'Body track and rotomation matched to a filmed performer',
      'Final block of 10–12 solves plus 2 rotomation shots',
    ],
    careers: ['Junior Matchmove Artist', 'Layout Artist', 'Rotomation Artist', 'Progression into Previs and Virtual Production'],
    faqs: [
      {
        question: 'Do I need to be good at maths?',
        answer:
          'You need to be comfortable with it, not exceptional. Understanding what a solve error means, and how scale and units propagate, matters far more than being able to derive the equations.',
      },
      {
        question: 'Fewer students choose matchmove. Is that a problem?',
        answer:
          'It can be an advantage. Matchmove is less visible than compositing, so fewer students apply — but studios still need matchmove artists on every project, and competition for those roles is often lower.',
      },
      {
        question: 'Can I switch to Compositing if I change my mind?',
        answer:
          'Yes, up to week 4. Both streams share the same Core, taught to a combined batch, precisely so that a student who has picked wrong can still move.',
      },
    ],
    featured: true,
    published: true,
    accent: 'signal',
  },

  {
    slug: 'unreal',
    title: 'Unreal Engine — VFX & Game',
    shortTitle: 'Unreal Engine',
    tier: 'Real-Time',
    tierLabel: 'Tier 3 · Real-Time',
    tagline: 'Real-time production — the widest employer base of any course here.',
    summary:
      'A shared real-time core, then a split into cinematic and virtual production, or game development. Games studios, virtual production, archviz, automotive and simulation.',
    overview: [
      'Unreal Engine is the real-time technology behind modern games, and increasingly behind film and television production itself.',
      'All students take an eight-week real-time foundation — UE5 project structure, Blueprints from zero, materials and PBR, Nanite and Lumen, environment construction, lighting, the DCC-to-Unreal pipeline and performance discipline — before specialising.',
      'The cinematic and virtual production block covers Sequencer, Niagara, Chaos destruction, MetaHuman, Control Rig and Movie Render Queue, finishing with a 60–90 second rendered cinematic. The game development block covers the gameplay framework, animation Blueprints, AI, UMG, level design and packaging, finishing with a playable vertical slice.',
    ],
    duration: '6 months',
    weeks: 24,
    contactHours: 360,
    feeInclGst: 188800,
    level: 'Entry to intermediate',
    bestFor:
      'A student drawn to games as well as film, or one who wants the widest range of employers. Art, 3D or gaming literacy helps.',
    leavesWith:
      'A rendered cinematic sequence with a breakdown reel, or a packaged playable vertical slice, and the skills for a Junior Unreal Artist or Junior Game Developer role.',
    software: ['Unreal Engine 5', 'Maya', 'Blender', 'Quixel Megascans', 'Nuke'],
    outcomes: [
      'Build and light real-time environments with modular kits, landscape and World Partition',
      'Author materials from PBR theory through master materials and instances',
      'Script in Blueprints from zero — taught to non-programmers',
      'Move assets cleanly from Maya or Blender: FBX vs USD, alembic, LODs, optimisation',
      'Profile and optimise: draw calls, texture budgets, shipped-build performance',
      'Specialise into cinematic and virtual production, or into game development',
    ],
    modules: [
      {
        title: 'Real-time foundations',
        meta: 'Block 1 · 8 weeks · 120 hrs · all students',
        topics: [
          'UE5 project structure, viewport, actors, levels, content browser, source control basics',
          'Blueprints from zero: variables, flow control, functions, event graph',
          'Materials: PBR theory, material graph, master materials and instances, decals',
          'Nanite and Lumen — what they change, and where they still break',
          'Environment construction: modular kits, landscape, foliage, Quixel Megascans, World Partition',
          'Lighting: real-time lighting, exposure, post-process volumes, cinematic lighting principles',
          'DCC → Unreal pipeline: Maya/Blender export, FBX vs USD, alembic caches, LODs',
          'Performance discipline: profiling, draw calls, texture budgets — taught early',
        ],
      },
      {
        title: 'Cinematic & Virtual Production',
        meta: 'Block 2A · 16 weeks · 240 hrs',
        topics: [
          'Sequencer in depth: cameras, cuts, camera rigs, animation tracks',
          'Cinematic lighting and lookdev for narrative sequences',
          'Niagara: particles, GPU sims, real-time FX for cinematics',
          'Chaos destruction and real-time simulation',
          'MetaHuman: creation, customisation, facial animation, performance retarget',
          'Control Rig, animation retargeting and mocap ingest',
          'Movie Render Queue: high-quality output, AOVs, rendering for downstream comp in Nuke',
          'In-camera VFX vocabulary: LED volumes, nDisplay, Live Link, frustum management',
          'Capstone: a 60–90 second cinematic sequence with breakdown reel',
        ],
      },
      {
        title: 'Game Development',
        meta: 'Block 2B · 16 weeks · 240 hrs',
        topics: [
          'Gameplay framework: GameMode, PlayerController, Pawn, Character',
          'Blueprint scripting in depth: interfaces, components, data assets',
          'Character controller, input systems, camera systems',
          'Animation Blueprints: state machines, blend spaces, root motion, IK',
          'AI: behaviour trees, blackboards, navmesh, EQS',
          'UI with UMG: menus, HUD, widget architecture',
          'Level design: blockout, pacing, player guidance, playtesting',
          'Audio integration, Niagara VFX for gameplay, multiplayer basics',
          'Optimisation, packaging and platform builds',
          'Capstone: a playable vertical slice — one complete level, packaged and runnable',
        ],
      },
      {
        title: 'Career readiness',
        meta: 'Both blocks · ~20 hrs',
        topics: [
          'Reel and portfolio construction',
          'Playable build plus documented systems for game students',
          'ArtStation, itch.io and GitHub presence',
          'Studio communication in English',
          'Interview and art-test preparation under time pressure',
        ],
      },
    ],
    eligibility: [
      '12th pass',
      'Aptitude interview',
      'Art, 3D or gaming literacy is a strong advantage',
    ],
    methodology: [
      'Shared real-time core before specialisation, so students choose a block with real exposure behind the choice',
      'Performance and profiling discipline taught early rather than at the end',
      'Capstone delivered as a rendered sequence or a packaged playable build',
      'Monthly gate review',
    ],
    projects: [
      'Modular real-time environment, lit and optimised',
      'Material library built from master materials and instances',
      'Cinematic capstone: a 60–90 second sequence rendered from Unreal',
      'Game capstone: a packaged, playable vertical slice',
    ],
    careers: [
      'Junior Unreal Artist — environment, lighting, cinematics',
      'Junior Game Developer',
      'Virtual production, architectural visualisation, automotive and simulation',
    ],
    faqs: [
      {
        question: 'Do I need to know how to code?',
        answer:
          'No. Blueprints are taught from zero, specifically for non-programmers. Logical thinking helps far more than prior coding experience.',
      },
      {
        question: 'Cinematic or game development — which should I choose?',
        answer:
          'You do not choose on day one. Everyone takes the same eight-week real-time foundation first, so the decision is made with real exposure to both behind it.',
      },
    ],
    featured: false,
    // Not advertised or sold until the Unreal Faculty Lead contract is signed
    // (curriculum v3.0 §7, hard gate December). Flip to true only then.
    published: false,
    holdReason:
      'HOLD — do not publish until the Unreal Faculty Lead contract is signed. Curriculum v3.0 §7 and Brochure §4 both gate this course on that hire. If the hire slips, the course moves to the July intake.',
    accent: 'signal',
  },

  {
    slug: 'career-pro',
    title: 'Career Pro',
    shortTitle: 'Career Pro',
    tier: 'Flagship',
    tierLabel: 'Tier 4 · Flagship',
    tagline: 'Twelve months, one specialisation, and a live production block.',
    summary:
      'The Prep Artist foundation, a full specialisation in Compositing or Matchmove, then an Advanced and Production block run like a real studio job. Capped at 8 students.',
    overview: [
      'Career Pro is the serious-career option: a full year, built as three blocks. Four months of the complete Prep Artist foundation, six months specialising in Compositing or Matchmove & Layout, then a two-month Advanced and Production block.',
      'That final block is what the programme is really for. You work a supervised sequence of 15–20 shots run exactly like a studio job — brief, shot assignment, dailies, versions, supervisor notes and a hard delivery date — in assigned roles across disciplines, taught by a PixRock lead artist.',
      'It is capped at eight students per intake. The final block involves supervised work inside a certified production facility, and that cannot be delivered to a large batch.',
    ],
    duration: '12 months',
    weeks: 48,
    contactHours: 720,
    feeInclGst: 188800,
    level: 'Advanced',
    bestFor:
      'A student committed to VFX as a career, and a family able to support a full year of study.',
    leavesWith:
      'A full portfolio, documented live production experience and interview preparation — entering the job market at a stronger level than a six-month graduate.',
    software: ['Nuke', 'Maya', 'Silhouette', 'Mocha Pro', '3DEqualizer', 'Adobe Photoshop'],
    outcomes: [
      'Work fluently across roto, prep and your chosen specialisation',
      'Take a specialisation to portfolio-ready depth with a PixRock lead artist',
      'Operate inside a versioned, note-driven production workflow',
      'Deliver a 15–20 shot sequence to a hard date, in an assigned role',
      'Build a demo reel and a breakdown reel targeted at specific roles',
      'Handle a studio test shot under time pressure — how most Indian studios hire',
    ],
    modules: [
      {
        title: 'Block A — Prep Artist foundation',
        meta: '4 months · 240 hrs',
        topics: [
          'The complete Prep Artist syllabus',
          'Roto foundation, paint and cleanup, clean plate construction',
          'Advanced prep and integration',
          'Production discipline from week one',
        ],
      },
      {
        title: 'Block B — Specialisation',
        meta: '6 months · 360 hrs · choose one',
        topics: [
          'Compositing (Nuke) — the full Tier 2 syllabus',
          'or Matchmove & Layout — the full Tier 2 syllabus',
          'Including the four-week Shared Core',
          'Chosen with your mentor at the end of Block A',
        ],
      },
      {
        title: 'Block C — Advanced & Production',
        meta: '2 months · 120 hrs',
        topics: [
          'C1 · Advanced discipline (3 wks) — deep dive in your stream with a PixRock lead artist, on complex real-world problems',
          'C2 · Live production simulation (3 wks) — a supervised 15–20 shot sequence run as a studio job, with assigned roles, dailies and a hard delivery date',
          'C3 · Supervised studio block (2 wks) — working under production conditions',
          'C4 · Career readiness (~30 hrs) — reel and breakdown construction, reel-to-role targeting, CV, ArtStation and LinkedIn, mock test-shots under time pressure',
        ],
      },
    ],
    eligibility: [
      '12th pass',
      'Aptitude interview — we are looking for commitment, not existing skill',
      'Full-time availability across the twelve months',
      'Capped at 8 students per intake',
    ],
    methodology: [
      'Three blocks in sequence: foundation, then specialisation, then production',
      'Specialisation chosen at the end of Block A, with your mentor, based on how your work has actually developed',
      'Block C taught by a PixRock lead artist',
      'Live production simulation run to studio process end to end',
    ],
    projects: [
      'Full prep portfolio across roto, paint and clean plate',
      'Specialisation portfolio built across Block B',
      'A supervised 15–20 shot sequence delivered to a hard date',
      'Final demo reel and breakdown reel',
    ],
    careers: [
      'Junior to mid-junior roles in your chosen specialisation',
      'Compositing or Matchmove & Layout, depending on Block B',
      'Documented live production experience on your CV',
    ],
    faqs: [
      {
        question: 'Why is it capped at eight students?',
        answer:
          'The final block involves supervised work inside a certified production facility. That cannot be delivered to a large batch. If you are accepted, you will be one of eight.',
      },
      {
        question: 'When do I choose my specialisation?',
        answer:
          'At the end of Block A, with your mentor, based on how your work has actually developed over four months. That tends to be a more accurate decision than one made on day one.',
      },
      {
        question: 'Can I specialise in Unreal?',
        answer:
          'Not in the first year. Career Pro specialisation options are Compositing or Matchmove & Layout. Unreal is available as a separate six-month course.',
      },
      {
        question: 'What happens at the end — will I get a job?',
        answer:
          'No. We provide placement assistance, not a guarantee — and anyone who tells you otherwise is not being straight with you. What Career Pro gives you is a full portfolio, documented live production experience and genuine interview preparation.',
      },
    ],
    featured: true,
    published: true,
    cohortCap: 8,
    accent: 'ember',
  },
];

/** Only courses cleared for public listing. Every UI surface uses this. */
export const publishedCourses = courses.filter((course) => course.published);

/** Courses shown on the home page grid. */
export const featuredCourses = publishedCourses.filter((course) => course.featured);

export function getCourseBySlug(slug: string | undefined): Course | undefined {
  if (!slug) return undefined;
  return publishedCourses.find((course) => course.slug === slug);
}

/** Distinct tiers, in catalogue order — drives the Courses page filter. */
export const courseTiers = Array.from(new Set(publishedCourses.map((course) => course.tierLabel)));

/** Options for the enquiry form's course dropdown. */
export const courseOptions = [
  ...publishedCourses.map((course) => ({ value: course.slug, label: course.title })),
  { value: 'not-sure', label: 'Not sure yet — please advise' },
];

/** Formats a fee as a GST-inclusive rupee figure, e.g. "₹47,200". */
export function formatFee(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
