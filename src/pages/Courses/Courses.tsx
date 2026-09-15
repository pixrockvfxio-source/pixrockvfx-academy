import { useMemo, useState } from 'react';
import { Seo } from '@/components/Seo/Seo';
import { PageHero } from '@/components/ui/PageHero';
import { CourseGrid } from '@/components/CourseGrid/CourseGrid';
import { publishedCourses, courseTiers } from '@/data/courses';
import { admissionSteps } from '@/data/academy';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { CTASection } from '@/components/CTASection/CTASection';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/cn';

const ALL = 'All courses';

export default function Courses() {
  const [track, setTrack] = useState<string>(ALL);

  const filtered = useMemo(
    () => (track === ALL ? publishedCourses : publishedCourses.filter((course) => course.tierLabel === track)),
    [track],
  );

  const filters = [ALL, ...courseTiers];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Courses at PixRock VFX Academy',
    itemListElement: publishedCourses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: course.title,
      url: `${siteConfig.url.replace(/\/$/, '')}/courses/${course.slug}`,
    })),
  };

  return (
    <>
      <Seo
        title="VFX Courses & Programmes"
        description="Explore PixRock VFX Academy programmes — rotoscopy, paint and prep, matchmove, compositing, 3D, animation, motion graphics and the full VFX production programme."
        path="/courses"
        jsonLd={jsonLd}
      />

      <PageHero
        eyebrow="Programmes"
        title={
          <>
            Choose the craft you want to <span className="text-grade">be hired for</span>
          </>
        }
        description="Every programme maps to a role a facility actually staffs. Start with a foundation craft, specialise in a discipline, or take the full production programme end to end."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Courses' }]}
      />

      <section className="section pt-12 lg:pt-16" aria-labelledby="catalogue-heading">
        <div className="container-page">
          <h2 id="catalogue-heading" className="sr-only">
            Course catalogue
          </h2>

          <Reveal>
            <div
              role="group"
              aria-label="Filter courses by tier"
              className="flex flex-wrap gap-2.5 border-b border-line pb-6"
            >
              {filters.map((option) => {
                const active = track === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTrack(option)}
                    aria-pressed={active}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200',
                      active
                        ? 'border-ember-600/50 bg-ember-50 text-ember-700'
                        : 'border-line-strong text-body hover:border-line-strong hover:text-ink',
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <p className="mt-6 text-sm text-subtle" aria-live="polite">
            Showing {filtered.length} of {publishedCourses.length} courses
          </p>

          <CourseGrid
            courses={filtered}
            className="mt-8"
            emptyMessage="Nothing in that tier yet — select “All courses” to see the full catalogue."
          />
        </div>
      </section>

      {/* Admissions process */}
      <section className="section border-t border-line/80 bg-raised" aria-labelledby="admissions-heading">
        <div className="container-page">
          <SectionTitle
            id="admissions-heading"
            eyebrow="Admissions"
            title="How joining works"
            description="Four steps, no pressure, and an honest recommendation at the end of it."
          />

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {admissionSteps.map((step, index) => (
              <Reveal as="li" key={step.step} index={index}>
                <div className="h-full rounded-card border border-line bg-raised p-6">
                  <span className="font-display text-sm font-bold text-ember-700">{step.step}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm/relaxed text-body">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        title="Not sure which programme fits?"
        description="Send us your background and what you want to make. We will recommend a starting point — and say so plainly if you would be better served elsewhere."
        primaryLabel="Send an enquiry"
      />
    </>
  );
}
