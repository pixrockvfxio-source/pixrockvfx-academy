import { ArrowRight } from 'lucide-react';
import { Media } from '@/components/ui/Media';
import { media } from '@/config/media';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';

const pillars = [
  {
    label: 'Real shot types',
    detail: 'Exercises use anonymised shot types from completed PixRock projects, not generic tutorial footage.',
  },
  {
    label: 'Supervisor reviews',
    detail: 'Monthly gate reviews run by a PixRock supervisor who is on live production.',
  },
  {
    label: 'Two shifts',
    detail: 'Morning and evening batches, so a student studying for a degree does not have to choose.',
  },
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
We are a <span className="text-grade">studio first</span>
              </>
            }
            description={
              <>
                <p>
                  VFX is a skills industry, not a certificate industry. Nobody is hired on a marksheet — they are
                  hired on a portfolio, on a practical test, and on whether they can work to a deadline. That is why
                  so many students finish a course and still cannot find work: they were taught software, not the job.
                </p>
                <p className="mt-4">
                  PixRock Academy exists because we are a studio first. Every module maps to work this facility
                  actually ships, and the people teaching it are the people doing it.
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
