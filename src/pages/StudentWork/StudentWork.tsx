import { useMemo, useState } from 'react';
import { Film, Clock } from 'lucide-react';
import type { Project } from '@/types/content';
import { projects, projectCategories } from '@/data/projects';
import { publishedCourses } from '@/data/courses';
import { Seo } from '@/components/Seo/Seo';
import { PageHero } from '@/components/ui/PageHero';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { ProjectDialog } from '@/components/ProjectCard/ProjectDialog';
import { Reveal } from '@/components/ui/Reveal';
import { CTASection } from '@/components/CTASection/CTASection';
import { Button } from '@/components/ui/Button';
import { academyFacts } from '@/data/academy';
import { cn } from '@/lib/cn';

const ALL = 'All work';

/**
 * Student work.
 *
 * Until the first cohort graduates this page states the position plainly and
 * shows what each course's students will actually deliver — which is real,
 * documented curriculum, not a claim about results. The gallery below it
 * appears automatically as soon as src/data/projects.ts has entries.
 */
export default function StudentWork() {
  const [category, setCategory] = useState(ALL);
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (category === ALL ? projects : projects.filter((project) => project.category === category)),
    [category],
  );

  const hasWork = projects.length > 0;

  return (
    <>
      <Seo
        title="Student Work"
        description={`What PixRock Academy students deliver on each course — the final blocks, portfolio shots and reels. The first intake begins ${academyFacts.firstIntake}.`}
        path="/student-work"
      />

      <PageHero
        eyebrow="Student work"
        title={
          <>
            The reel is the <span className="text-grade">deliverable</span>
          </>
        }
        description="Nobody is hired on a marksheet. Every course here ends in a final block of supervised shots, cut to studio specification and approved by a review panel."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Student Work' }]}
      />

      {!hasWork ? (
        <>
          {/* Honest position, stated before anything else. */}
          <section className="section pt-12 lg:pt-16" aria-labelledby="pending-heading">
            <div className="container-page">
              <Reveal className="relative overflow-hidden rounded-panel border border-line bg-surface">
                <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:gap-12">
                  <div>
                    <p className="inline-flex items-center gap-2 rounded-full border border-ember-500/35 bg-ember-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-ember-700 uppercase">
                      <Clock aria-hidden="true" className="size-3.5" />
                      First intake {academyFacts.firstIntake}
                    </p>
                    <h2 id="pending-heading" className="mt-5 text-title text-ink">
                      We have no student work to show yet
                    </h2>
                    <p className="mt-4 text-base/relaxed text-body">
                      The academy opens in {academyFacts.firstIntake}, so there are no graduates and no student reels
                      yet. We would rather say that plainly than fill this page with work that belongs to someone
                      else.
                    </p>
                    <p className="mt-4 text-sm/relaxed text-subtle">
                      What we can show you is exactly what each course requires you to deliver. That is set out below,
                      and it is the same specification our review panel will assess.
                    </p>
                    <div className="mt-8">
                      <Button to="/courses" variant="outline">
                        See what each course delivers
                      </Button>
                    </div>
                  </div>

                  <div className="relative flex aspect-video items-center justify-center rounded-card border border-dashed border-line-strong bg-raised">
                    <div aria-hidden="true" className="grid-lines absolute inset-0 rounded-card opacity-30" />
                    <div className="relative flex flex-col items-center gap-3 px-6 text-center">
                      <span className="inline-flex size-14 items-center justify-center rounded-full border border-line-strong bg-surface text-ember-600">
                        <Film aria-hidden="true" className="size-6" />
                      </span>
                      <p className="text-sm font-medium text-body">First reels expected from the {academyFacts.firstIntake} cohort</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* What students will produce — drawn from the curriculum. */}
          <section className="section border-t border-line/80 pt-14" aria-labelledby="deliverables-heading">
            <div className="container-page">
              <Reveal>
                <h2 id="deliverables-heading" className="text-display text-ink">
                  What you will produce
                </h2>
                <p className="mt-4 max-w-2xl text-base/relaxed text-body">
                  Every course ends in a supervised final block, reviewed by a working PixRock supervisor against the
                  standards used on a show.
                </p>
              </Reveal>

              <ul className="mt-12 grid gap-6 lg:grid-cols-2">
                {publishedCourses.map((course, index) => (
                  <Reveal as="li" key={course.slug} index={index % 2}>
                    <div className="h-full rounded-card border border-line bg-surface shadow-soft p-6 sm:p-7">
                      <p className="text-xs font-semibold tracking-[0.2em] text-ember-600 uppercase">
                        {course.tierLabel}
                      </p>
                      <h3 className="mt-3 font-display text-lg font-semibold text-ink">{course.shortTitle}</h3>
                      <p className="mt-2.5 text-sm/relaxed text-signal-600">{course.leavesWith}</p>
                      <ul className="mt-5 space-y-2.5 border-t border-line pt-4">
                        {course.projects.map((project) => (
                          <li key={project} className="flex gap-2.5 text-sm/relaxed text-body">
                            <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-line-strong" />
                            {project}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        </>
      ) : (
        <section className="section pt-12 lg:pt-16" aria-labelledby="gallery-heading">
          <div className="container-page">
            <h2 id="gallery-heading" className="sr-only">
              Student project gallery
            </h2>

            <Reveal>
              <div role="group" aria-label="Filter work by category" className="flex flex-wrap gap-2.5">
                {[ALL, ...projectCategories].map((option) => {
                  const isActive = category === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCategory(option)}
                      aria-pressed={isActive}
                      className={cn(
                        'rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200',
                        isActive
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
              Showing {filtered.length} of {projects.length} projects
            </p>

            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, index) => (
                <Reveal as="li" key={project.id} index={index % 3} className="h-full">
                  <ProjectCard project={project} onOpen={setActive} />
                </Reveal>
              ))}
            </ul>

            <p className="mt-10 max-w-2xl text-xs/relaxed text-subtle">
              Work is published with the artist’s permission. Shots covered by a client NDA are not shown.
            </p>
          </div>
        </section>
      )}

      <ProjectDialog project={active} onClose={() => setActive(null)} />

      <CTASection
        title="Your reel starts with one finished shot"
        description="Bring the commitment; we supply the plates, the supervisor notes and the deadline that turn it into work a studio will look at."
      />
    </>
  );
}
