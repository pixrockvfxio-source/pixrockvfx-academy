import { useParams, Navigate, Link } from 'react-router-dom';
import {
  Clock,
  Signal,
  Monitor,
  CheckCircle2,
  Briefcase,
  ClipboardList,
  ArrowRight,
  IndianRupee,
  Users,
} from 'lucide-react';
import { getCourseBySlug, publishedCourses, formatFee } from '@/data/courses';
import { media } from '@/config/media';
import { Seo } from '@/components/Seo/Seo';
import { Media } from '@/components/ui/Media';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { CourseCard } from '@/components/CourseCard/CourseCard';
import { EnquiryForm } from '@/components/ContactForm/EnquiryForm';
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
    {
      icon: IndianRupee,
      label: 'Fee (incl. GST)',
      value: formatFee(course.feeInclGst),
    },
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
      <section className="relative isolate overflow-hidden border-b border-ink-800">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Media
            media={media.courses[course.slug] ?? media.heroSecondary}
            aspect="aspect-auto"
            priority
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-ink-950/62" />
          <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/45 to-ink-950/80" />
        </div>

        <div className="container-page pt-32 pb-16 lg:pt-40 lg:pb-20">
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-muted">
              <li>
                <Link to="/" className="transition-colors hover:text-ember-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/courses" className="transition-colors hover:text-ember-300">
                  Courses
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-mist">
                {course.shortTitle}
              </li>
            </ol>
          </nav>

          <Reveal className="max-w-3xl">
            <Badge tone={course.accent}>{course.tierLabel}</Badge>
            <h1 className="mt-5 text-display text-chalk">{course.title}</h1>
            <p className="mt-4 text-lg/relaxed text-ember-300 sm:text-xl/relaxed">{course.tagline}</p>
            <p className="mt-5 max-w-2xl text-base/relaxed text-mist">{course.summary}</p>

            {course.cohortCap ? (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-ember-500/35 bg-ember-500/10 px-3.5 py-1.5 text-sm text-ember-200">
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
            <dl className="mt-12 grid gap-px overflow-hidden rounded-panel border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-ink-950/85 p-5 backdrop-blur-sm">
                  <dt className="flex items-center gap-2 text-xs tracking-wider text-slate-muted uppercase">
                    <fact.icon aria-hidden="true" className="size-3.5 text-ember-400" />
                    {fact.label}
                  </dt>
                  <dd className="mt-2 font-display text-sm font-semibold text-chalk sm:text-base">{fact.value}</dd>
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
              <h2 id="overview-heading" className="text-title text-chalk">
                Course overview
              </h2>
              <div className="mt-5 space-y-4 text-base/relaxed text-mist">
                {course.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.06} className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-card border border-ink-700 bg-ink-900/60 p-5">
                <h3 className="font-display text-sm font-semibold tracking-wide text-ember-400 uppercase">
                  Best for
                </h3>
                <p className="mt-2.5 text-sm/relaxed text-mist">{course.bestFor}</p>
              </div>
              <div className="rounded-card border border-ink-700 bg-ink-900/60 p-5">
                <h3 className="font-display text-sm font-semibold tracking-wide text-signal-400 uppercase">
                  What you leave with
                </h3>
                <p className="mt-2.5 text-sm/relaxed text-mist">{course.leavesWith}</p>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-12">
              <h2 className="text-title text-chalk">What you will learn</h2>
              <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
                {course.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-sm/relaxed text-mist">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal-400" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <div className="rounded-panel border border-ink-700 bg-ink-900/60 p-6 sm:p-7">
                <h2 className="font-display text-lg font-semibold text-chalk">Fee</h2>
                <p className="mt-3 font-display text-2xl font-bold text-chalk">
                  {formatFee(course.feeInclGst)}{' '}
                  <span className="text-sm font-medium text-slate-muted">inclusive of GST</span>
                </p>
                {course.feeNote ? <p className="mt-2 text-sm/relaxed text-ember-300">{course.feeNote}</p> : null}
                <p className="mt-2 text-xs/relaxed text-slate-muted">
                  Instalment options are available through our finance partner. Our counsellors will walk you through
                  the full cost, with no charges added later.
                </p>

                <h2 className="mt-8 font-display text-lg font-semibold text-chalk">Software you will use</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {course.software.map((item) => (
                    <li key={item}>
                      <Badge tone="neutral">
                        <Monitor aria-hidden="true" className="size-3.5 text-ember-400" />
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs/relaxed text-slate-muted">
                  Tool coverage is confirmed for your batch at admission.
                </p>

                <h2 className="mt-8 font-display text-lg font-semibold text-chalk">Eligibility</h2>
                <ul className="mt-4 space-y-2.5">
                  {course.eligibility.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm/relaxed text-mist">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-ember-500 ring-4 ring-ember-500/15"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <h2 className="mt-8 font-display text-lg font-semibold text-chalk">Training methodology</h2>
                <ul className="mt-4 space-y-2.5">
                  {course.methodology.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm/relaxed text-mist">
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
      <section className="section border-y border-ink-800/80 bg-ink-900/40" aria-labelledby="modules-heading">
        <div className="container-page">
          <Reveal>
            <h2 id="modules-heading" className="text-display text-chalk">
              Course modules
            </h2>
            <p className="mt-4 max-w-2xl text-base/relaxed text-mist">
              {course.modules.length} modules, taught in order. Each one ends in something you could show a supervisor.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-5 lg:grid-cols-2">
            {course.modules.map((module, index) => (
              <Reveal as="li" key={module.title} index={index % 2}>
                <div className="h-full rounded-card border border-ink-700 bg-ink-950/60 p-6 sm:p-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm font-bold text-ember-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-chalk">{module.title}</h3>
                      {module.meta ? (
                        <p className="mt-0.5 text-xs tracking-wide text-slate-muted">{module.meta}</p>
                      ) : null}
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {module.topics.map((topic) => (
                      <li key={topic} className="flex gap-2.5 text-sm/relaxed text-mist">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-ink-500" />
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
            <h2 id="projects-heading" className="text-title text-chalk">
              Practical projects
            </h2>
            <p className="mt-4 text-base/relaxed text-mist">
              Work you will actually produce during the programme — assigned as briefs, with constraints and deadlines.
            </p>
            <ul className="mt-7 space-y-3.5">
              {course.projects.map((project, index) => (
                <li
                  key={project}
                  className="flex gap-4 rounded-card border border-ink-700 bg-ink-900/60 px-5 py-4 text-sm/relaxed text-mist"
                >
                  <span className="font-display text-sm font-bold text-ember-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {project}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="text-title text-chalk">Career opportunities</h2>
            <p className="mt-4 text-base/relaxed text-mist">
              Roles this programme prepares you to apply for, and the routes they typically open next.
            </p>
            <ul className="mt-7 space-y-3.5">
              {course.careers.map((role) => (
                <li
                  key={role}
                  className="flex items-center gap-3.5 rounded-card border border-ink-700 bg-ink-900/60 px-5 py-4 text-sm text-chalk"
                >
                  <Briefcase aria-hidden="true" className="size-4 shrink-0 text-signal-400" />
                  {role}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs/relaxed text-slate-muted">
              These are the roles this training targets. We provide placement assistance — CV circulation, referrals
              and test preparation — and we are clear that this is not the same as a promise of employment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQs ---------- */}
      {course.faqs.length > 0 ? (
        <section className="section border-t border-ink-800/80" aria-labelledby="faq-heading">
          <div className="container-page max-w-3xl">
            <Reveal>
              <h2 id="faq-heading" className="text-display text-chalk">
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
      <section id="enquire" className="section border-t border-ink-800/80 bg-ink-900/40" aria-labelledby="enquire-heading">
        <div className="container-page max-w-3xl">
          <h2 id="enquire-heading" className="sr-only">
            Enquire about {course.title}
          </h2>
          <Reveal>
            <EnquiryForm defaultCourse={course.slug} title={`Enquire about ${course.title}`} />
          </Reveal>
        </div>
      </section>

      {/* ---------- Related ---------- */}
      {suggestions.length > 0 ? (
        <section className="section border-t border-ink-800/80" aria-labelledby="related-heading">
          <div className="container-page">
            <Reveal>
              <h2 id="related-heading" className="text-title text-chalk">
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
