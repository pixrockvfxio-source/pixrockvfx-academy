/** Shared content models. Data files implement these; UI components consume them. */

export type CourseTrack = 'Foundation' | '2D / Compositing' | '3D / Animation' | 'Production';

export type CourseLevel =
  | 'Beginner'
  | 'Beginner to Intermediate'
  | 'Intermediate'
  | 'Intermediate to Advanced';

export type CourseFormat = 'Classroom' | 'Online (live)' | 'Classroom & Online';

export type CourseModule = {
  title: string;
  topics: string[];
};

export type Faq = {
  question: string;
  answer: string;
};

export type Course = {
  slug: string;
  title: string;
  track: CourseTrack;
  /** One-line hook used on cards and the course hero. */
  tagline: string;
  /** 1–2 sentence card description. */
  summary: string;
  /** Longer narrative for the detail page. */
  overview: string[];
  duration: string;
  commitment: string;
  level: CourseLevel;
  format: CourseFormat;
  software: string[];
  /** "What you will learn" bullets. */
  outcomes: string[];
  modules: CourseModule[];
  eligibility: string[];
  methodology: string[];
  projects: string[];
  careers: string[];
  faqs: Faq[];
  /** Surfaced on the home page when true. */
  featured: boolean;
  accent: 'ember' | 'signal';
};

export type Testimonial = {
  id: string;
  name: string;
  course: string;
  quote: string;
  /** Optional headshot; falls back to generated initials avatar. */
  avatar?: string;
  role?: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  student: string;
  course: string;
  description: string;
  /** Optional showreel/video URL — supports YouTube, Vimeo or a direct file. */
  videoUrl?: string;
  year: number;
};

export type ToolStatus = 'core' | 'elective' | 'exposure';

export type Tool = {
  name: string;
  discipline: string;
  status: ToolStatus;
  note: string;
};
