/** Shared content models. Data files implement these; UI components consume them. */

export type CourseTier = 'Foundation' | 'Professional' | 'Real-Time' | 'Flagship';

export type CourseLevel = 'Entry level' | 'Entry to intermediate' | 'Intermediate' | 'Advanced';

export type CourseModule = {
  title: string;
  /** e.g. "Month 1 · 60 hrs" */
  meta?: string;
  topics: string[];
};

export type Faq = {
  question: string;
  answer: string;
};

export type Course = {
  slug: string;
  /** Full catalogue name, e.g. "VFX Foundation — Roto Artist". */
  title: string;
  /** Short label for cards, breadcrumbs and dropdowns, e.g. "Roto Artist". */
  shortTitle: string;
  tier: CourseTier;
  tierLabel: string;

  tagline: string;
  summary: string;
  overview: string[];

  duration: string;
  weeks: number;
  contactHours: number;

  /**
   * Fee in rupees, GST INCLUSIVE. Only the inclusive figure is stored, so an
   * ex-GST number can never reach the page by accident — a hard rule from the
   * brochure: a parent who is quoted ₹40,000 and invoiced ₹47,200 loses trust.
   */
  feeInclGst: number;
  /** Extra fee context, e.g. the Roto → Prep bridge upgrade. */
  feeNote?: string;

  level: CourseLevel;
  /** Who the course suits, in the parent-facing wording. */
  bestFor: string;
  /** The exit artefact and the role it targets. */
  leavesWith: string;

  software: string[];
  outcomes: string[];
  modules: CourseModule[];
  eligibility: string[];
  methodology: string[];
  projects: string[];
  /** Roles the training targets. Never phrased as an outcome or promise. */
  careers: string[];
  faqs: Faq[];

  /** Shown on the home page when true. */
  featured: boolean;
  /**
   * false keeps a course out of every public listing, route and dropdown.
   * Used for courses that must not be advertised or sold yet — the Unreal
   * track is on hold until the faculty contract is signed.
   */
  published: boolean;
  /** Note explaining a hold, shown only in the data file. */
  holdReason?: string;
  /** Cohort cap, where one is part of the offer. */
  cohortCap?: number;
  accent: 'ember' | 'signal';
};

export type Testimonial = {
  id: string;
  name: string;
  course: string;
  quote: string;
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
  videoUrl?: string;
  year: number;
};

export type ToolStatus = 'core' | 'supporting' | 'onHold';

export type Tool = {
  name: string;
  discipline: string;
  status: ToolStatus;
  note: string;
};
