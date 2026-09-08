import { useMemo, useState } from 'react';
import { Film } from 'lucide-react';
import type { Project } from '@/types/content';
import { projects, projectCategories } from '@/data/projects';
import { Seo } from '@/components/Seo/Seo';
import { PageHero } from '@/components/ui/PageHero';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { ProjectDialog } from '@/components/ProjectCard/ProjectDialog';
import { Reveal } from '@/components/ui/Reveal';
import { EmptyState } from '@/components/ui/EmptyState';
import { CTASection } from '@/components/CTASection/CTASection';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const ALL = 'All work';

export default function StudentWork() {
  const [category, setCategory] = useState(ALL);
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (category === ALL ? projects : projects.filter((project) => project.category === category)),
    [category],
  );

  return (
    <>
      <Seo
        title="Student Work & Showreel"
        description="Finished shots produced by PixRock VFX Academy students — set extensions, creature integration, clean-up, environments, motion design and destruction work, with breakdowns."
        path="/student-work"
      />

      <PageHero
        eyebrow="Student work"
        title={
          <>
            Shots you can <span className="text-grade">defend in a review</span>
          </>
        }
        description="A small number of genuinely finished shots, each one taken to delivery with a breakdown behind it. That is what gets an artist hired."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Student Work' }]}
      />

      {/* Showreel placeholder */}
      <section className="section" aria-labelledby="showreel-heading">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-panel border border-ink-700 bg-ink-900">
            <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className="text-xs font-semibold tracking-[0.24em] text-ember-400 uppercase">Academy showreel</p>
                <h2 id="showreel-heading" className="mt-4 text-title text-chalk">
                  The 2025 reel is being cut
                </h2>
                <p className="mt-4 text-base/relaxed text-mist">
                  We publish one reel a year, edited from work students have finished to delivery standard. Rather than
                  fill this space with a placeholder video, we would rather leave it honest until the cut is done.
                </p>
                <p className="mt-4 text-sm text-slate-muted">
                  Individual project breakdowns are below — open any card to see the detail.
                </p>
              </div>

              <div className="relative flex aspect-video items-center justify-center rounded-card border border-dashed border-ink-600 bg-ink-950/60">
                <div aria-hidden="true" className="grid-lines absolute inset-0 rounded-card opacity-30" />
                <div className="relative flex flex-col items-center gap-3 text-center">
                  <span className="inline-flex size-14 items-center justify-center rounded-full border border-ink-600 bg-ink-900 text-ember-400">
                    <Film aria-hidden="true" className="size-6" />
                  </span>
                  <p className="text-sm font-medium text-mist">Showreel coming soon</p>
                  <p className="max-w-xs px-4 text-xs text-slate-muted">
                    Drop the video URL into <code className="text-mist">src/data/projects.ts</code> to enable playback.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="section border-t border-ink-800/80 pt-0" aria-labelledby="gallery-heading">
        <div className="container-page">
          <h2 id="gallery-heading" className="sr-only">
            Student project gallery
          </h2>

          <Reveal className="pt-14">
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
                        ? 'border-ember-500/60 bg-ember-500/12 text-ember-200'
                        : 'border-ink-600 text-mist hover:border-ink-500 hover:text-chalk',
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <p className="mt-6 text-sm text-slate-muted" aria-live="polite">
            Showing {filtered.length} of {projects.length} projects
          </p>

          {filtered.length > 0 ? (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, index) => (
                <Reveal as="li" key={project.id} index={index % 3} className="h-full">
                  <ProjectCard project={project} onOpen={setActive} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Nothing in that category yet"
              description="New student work is added at the end of every batch."
              action={
                <Button variant="secondary" size="sm" onClick={() => setCategory(ALL)}>
                  Show all work
                </Button>
              }
            />
          )}

          <p className="mt-10 max-w-2xl text-xs/relaxed text-slate-muted">
            Work shown is published with the artist’s permission. Names and stills on this page are placeholders until
            the current batch’s releases are confirmed.
          </p>
        </div>
      </section>

      <ProjectDialog project={active} onClose={() => setActive(null)} />

      <CTASection
        title="Your reel starts with one finished shot"
        description="Bring the ambition; we will supply the plates, the notes and the deadline that turn it into something a studio will look at."
      />
    </>
  );
}
