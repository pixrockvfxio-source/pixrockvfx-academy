import { useParams, Navigate, Link } from 'react-router-dom';
import {
  Clock,
  Signal,
  Monitor,
  CheckCircle2,
  Briefcase,
  ClipboardList,
  ArrowRight,
  CalendarDays,
  Users,
} from 'lucide-react';
import { getCourseBySlug, publishedCourses } from '@/data/courses';
import { media } from '@/config/media';
import { Seo } from '@/components/Seo/Seo';
import { Media } from '@/components/ui/Media';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { CourseCard } from '@/components/CourseCard/CourseCard';
import { RegisterForm } from '@/components/RegisterForm/RegisterForm';
import { siteConfig } from '@/config/site';

export default function CourseDetails() {
  const { slug } = useParams<{ slug: string }>();
  const course = getCourseBySlug(slug);

  // Unknown slug → 404 rather than an empty shell.
  if (!course) return <Navigate to="/404" replace />;

  const related = publishedCourses
    .filter((item) => item.slug !== course.slug && item.tier === course.tier)
    .slice(0, 3);
  const fallbackRelated = publishedCourses.filter((item) => item.slug !== course.slug).slice(0, 3);
  const suggestions = related.length > 0 ? related : fallbackRelated;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.summary,
    provider: {
      '@type': 'EducationalOrganization',
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    ...(course.faqs.length > 0
      ? {
          hasPart: course.modules.map((module) => ({
            '@type': 'Syllabus',
            name: module.title,
          })),
        }
      : {}),
  };

  const facts = [
    { icon: Clock, label: 'Duration', value: course.duration },
    { icon: ClipboardList, label: 'Contact hours', value: `${course.contactHours} hrs` },
    { icon: Signal, label: 'Level', value: course.level },
    { icon: CalendarDays, label: 'Batches', value: 'Morning & evening' },
  ];

  return (
    <>
      <Seo
        title={`${course.title} Course`}
        description={course.summary}
        path={`/courses/${course.slug}`}
        type="article"
        jsonLd={jsonLd}
      />

      {/* ---------- Hero ---------- */}
      {/* Paper hero. The course banner appears as a framed panel in the
          overview below rather than washed out behind the text — a white scrim
          over dark artwork just produces grey. */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-canvas" />
          <div className="grid-lines absolute inset-0 opacity-40 mask-fade-b" />
          <div className="absolute -top-40 -left-32 size-[36rem] rounded-full bg-ember-100/60 blur-[120px]" />
          <div className="absolute -top-16 right-0 size-[28rem] rounded-full bg-signal-50 blur-[120px]" />
        </div>

        <div className="container-page pt-32 pb-16 lg:pt-40 lg:pb-20">
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-subtle">
              <li>
                <Link to="/" className="transition-colors hover:text-ember-700">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/courses" className="transition-colors hover:text-ember-700">
                  Courses
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-body">
                {course.shortTitle}
              </li>
            </ol>
          </nav>

          <Reveal className="max-w-3xl">
            <Badge tone={course.accent}>{course.tierLabel}</Badge>
            <h1 className="mt-5 text-display text-ink">{course.title}</h1>
            <p className="mt-4 max-w-2xl text-lg/relaxed font-medium text-ember-700 sm:text-xl/relaxed">{course.tagline}</p>
            <p className="mt-5 max-w-2xl text-base/relaxed text-body">{course.summary}</p>

            {course.cohortCap ? (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-ember-500/35 bg-ember-500/10 px-3.5 py-1.5 text-sm text-ember-700">
                <Users aria-hidden="true" className="size-4" />
                Limited to {course.cohortCap} students per intake
              </p>
            ) : null}

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="#enquire" size="lg">
                Enquire About This Course
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
              <Button to="/contact" variant="secondary" size="lg">
                Talk to a counsellor
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="mt-12 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-surface p-5">
                  <dt className="flex items-center gap-2 text-xs tracking-wider text-subtle uppercase">
                    <fact.icon aria-hidden="true" className="size-3.5 text-ember-600" />
                    {fact.label}
                  </dt>
                  <dd className="mt-2 font-display text-sm font-semibold text-ink sm:text-base">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------- Overview + sidebar ---------- */}
      <section className="section" aria-labelledby="overview-heading">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Media
                media={media.courses[course.slug] ?? media.heroSecondary}
                aspect="aspect-[16/9]"
                priority
                sizes="(min-width: 1024px) 58vw, 92vw"
                className="mb-10 rounded-panel border border-line shadow-lift"
              />
            </Reveal>

            <Reveal>
              <h2 id="overview-heading" className="text-title text-ink">
                Course overview
              </h2>
              <div className="mt-5 space-y-4 text-base/relaxed text-body">
                {course.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.06} className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-card border border-line bg-surface shadow-soft p-5">
                <h3 className="font-display text-sm font-semibold tracking-wide text-ember-600 uppercase">
                  Best for
                </h3>
                <p className="mt-2.5 text-sm/relaxed text-body">{course.bestFor}</p>
              </div>
              <div className="rounded-card border border-line bg-surface shadow-soft p-5">
                <h3 className="font-display text-sm font-semibold tracking-wide text-signal-500 uppercase">
                  What you leave with
                </h3>
                <p className="mt-2.5 text-sm/relaxed text-body">{course.leavesWith}</p>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-12">
              <h2 className="text-title text-ink">What you will learn</h2>
              <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
                {course.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-sm/relaxed text-body">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal-500" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <div className="rounded-panel border border-line bg-surface shadow-soft p-6 sm:p-7">
                <h2 className="font-display text-lg font-semibold text-ink">Fees</h2>
                <p className="mt-3 text-sm/relaxed text-body">
                  We discuss fees with you directly, so we can walk through the full cost including GST, any
                  instalment options, and what is included — with nothing added later.
                </p>
                <div className="mt-4">
                  <Button href="#enquire" variant="outline" size="sm">
                    Ask about fees
                  </Button>
                </div>

                <h2 className="mt-8 font-display text-lg font-semibold text-ink">Software you will use</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {course.software.map((item) => (
                    <li key={item}>
                      <Badge tone="neutral">
                        <Monitor aria-hidden="true" className="size-3.5 text-ember-600" />
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs/relaxed text-subtle">
                  Tool coverage is confirmed for your batch at admission.
                </p>

                <h2 className="mt-8 font-display text-lg font-semibold text-ink">Eligibility</h2>
                <ul className="mt-4 space-y-2.5">
                  {course.eligibility.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm/relaxed text-body">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-ember-500 ring-4 ring-ember-500/15"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <h2 className="mt-8 font-display text-lg font-semibold text-ink">Training methodology</h2>
                <ul className="mt-4 space-y-2.5">
                  {course.methodology.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm/relaxed text-body">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-signal-400 ring-4 ring-signal-400/15"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Modules ---------- */}
      <section className="section border-y border-line/80 bg-raised" aria-labelledby="modules-heading">
        <div className="container-page">
          <Reveal>
            <h2 id="modules-heading" className="text-display text-ink">
              Course modules
            </h2>
            <p className="mt-4 max-w-2xl text-base/relaxed text-body">
              {course.modules.length} modules, taught in order. Each one ends in something you could show a supervisor.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-5 lg:grid-cols-2">
            {course.modules.map((module, index) => (
              <Reveal as="li" key={module.title} index={index % 2}>
                <div className="h-full rounded-card border border-line bg-raised p-6 sm:p-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm font-bold text-ember-700">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">{module.title}</h3>
                      {module.meta ? (
                        <p className="mt-0.5 text-xs tracking-wide text-subtle">{module.meta}</p>
                      ) : null}
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {module.topics.map((topic) => (
                      <li key={topic} className="flex gap-2.5 text-sm/relaxed text-body">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-line-strong" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Projects & careers ---------- */}
      <section className="section" aria-labelledby="projects-heading">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 id="projects-heading" className="text-title text-ink">
              Practical projects
            </h2>
            <p className="mt-4 text-base/relaxed text-body">
              Work you will actually produce during the programme — assigned as briefs, with constraints and deadlines.
            </p>
            <ul className="mt-7 space-y-3.5">
              {course.projects.map((project, index) => (
                <li
                  key={project}
                  className="flex gap-4 rounded-card border border-line bg-surface shadow-soft px-5 py-4 text-sm/relaxed text-body"
                >
                  <span className="font-display text-sm font-bold text-ember-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {project}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="text-title text-ink">Career opportunities</h2>
            <p className="mt-4 text-base/relaxed text-body">
              Roles this programme prepares you to apply for, and the routes they typically open next.
            </p>
            <ul className="mt-7 space-y-3.5">
              {course.careers.map((role) => (
                <li
                  key={role}
                  className="flex items-center gap-3.5 rounded-card border border-line bg-surface shadow-soft px-5 py-4 text-sm text-ink"
                >
                  <Briefcase aria-hidden="true" className="size-4 shrink-0 text-signal-500" />
                  {role}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs/relaxed text-subtle">
              These are the roles this training targets. We provide placement assistance — CV circulation, referrals
              and test preparation — and we are clear that this is not the same as a promise of employment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQs ---------- */}
      {course.faqs.length > 0 ? (
        <section className="section border-t border-line/80" aria-labelledby="faq-heading">
          <div className="container-page max-w-3xl">
            <Reveal>
              <h2 id="faq-heading" className="text-display text-ink">
                Frequently asked questions
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-9">
              <Accordion items={course.faqs} />
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ---------- Enquiry ---------- */}
      <section id="enquire" className="section border-t border-line/80 bg-raised" aria-labelledby="enquire-heading">
        <div className="container-page max-w-3xl">
          <h2 id="enquire-heading" className="sr-only">
            Enquire about {course.title}
          </h2>
          <Reveal>
            <RegisterForm courseSlug={course.slug} title={`Register for ${course.shortTitle}`} />
          </Reveal>
        </div>
      </section>

      {/* ---------- Related ---------- */}
      {suggestions.length > 0 ? (
        <section className="section border-t border-line/80" aria-labelledby="related-heading">
          <div className="container-page">
            <Reveal>
              <h2 id="related-heading" className="text-title text-ink">
                You might also consider
              </h2>
            </Reveal>
            <ul className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((item, index) => (
                <Reveal as="li" key={item.slug} index={index} className="h-full">
                  <CourseCard course={item} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
