import { ArrowRight } from 'lucide-react';
import { Media } from '@/components/ui/Media';
import { media } from '@/config/media';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';

const pillars = [
  { label: 'Real plates', detail: 'Footage with genuine problems in it, not clean tutorial clips.' },
  { label: 'Studio reviews', detail: 'Dailies-format feedback in production language, every week.' },
  { label: 'Small batches', detail: 'Enough mentor time for your work to actually be looked at.' },
];

export function AboutIntro() {
  return (
    <section className="section border-t border-ink-800/80" aria-labelledby="about-intro-heading">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Layered visual */}
        <Reveal className="relative order-last lg:order-first">
          <div className="relative">
            <Media
              media={media.aboutStudio}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="rounded-panel border border-ink-700 shadow-lift"
            />
            <div className="absolute -right-4 -bottom-8 w-40 sm:-right-8 sm:w-52">
              <Media
                media={media.aboutCraft}
                aspect="aspect-square"
                sizes="200px"
                className="rounded-card border border-ink-600 shadow-lift"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute -top-6 -left-6 -z-10 size-40 rounded-full bg-ember-500/15 blur-3xl"
            />
          </div>
        </Reveal>

        <div>
          <SectionTitle
            id="about-intro-heading"
            eyebrow="About the academy"
            title={
              <>
                A VFX academy run like a <span className="text-grade">production floor</span>
              </>
            }
            description={
              <>
                <p>
                  PixRock VFX Academy exists to close a specific gap: plenty of graduates can follow a tutorial, and
                  very few can open a difficult plate, plan an approach and deliver it on a deadline.
                </p>
                <p className="mt-4">
                  So we teach in production context. Mentors who have worked to studio schedules, footage that
                  misbehaves, versioning and handovers from week one, and reviews where you present your shot and
                  defend your decisions.
                </p>
              </>
            }
          />

          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-4">
              {pillars.map((pillar) => (
                <li key={pillar.label} className="flex gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-ember-500 ring-4 ring-ember-500/15"
                  />
                  <p className="text-sm/relaxed text-mist">
                    <span className="font-semibold text-chalk">{pillar.label}.</span> {pillar.detail}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/about" variant="outline">
                Our story
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
              <Button to="/courses" variant="ghost">
                See the curriculum
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
