import { Target, Eye, Film } from 'lucide-react';
import { Seo } from '@/components/Seo/Seo';
import { PageHero } from '@/components/ui/PageHero';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { Media } from '@/components/ui/Media';
import { media } from '@/config/media';
import { academyStory, differentiators } from '@/data/academy';
import { FeatureIcon } from '@/components/ui/FeatureIcon';
import { CTASection } from '@/components/CTASection/CTASection';
import { Button } from '@/components/ui/Button';

const experience = [
  {
    title: 'Taught by working artists',
    detail:
      'Our mentors have delivered shots to studio deadlines. They teach the compromises and shortcuts that only show up on a real schedule.',
  },
  {
    title: 'Pipeline-shaped curriculum',
    detail:
      'Each course maps to a role a facility actually staffs, and to the handovers that role depends on either side of it.',
  },
  {
    title: 'Reviewed like dailies',
    detail:
      'You present your shot, take notes and turn a version around. By graduation the review room holds no surprises.',
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About the Academy"
        description="PixRock VFX Academy trains visual effects artists in production context — real plates, studio-format reviews, small batches and mentors who have worked to facility deadlines."
        path="/about"
      />

      <PageHero
        eyebrow="About us"
        title={
          <>
            We teach VFX the way it is <span className="text-grade">practised</span>
          </>
        }
        description="Not the way it is demonstrated. There is a difference, and it is the whole reason this academy exists."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      {/* Story */}
      <section className="section" aria-labelledby="story-heading">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionTitle id="story-heading" eyebrow="Our story" title="Why PixRock exists" />
            <Reveal delay={0.08} className="mt-6 space-y-5 text-base/relaxed text-mist">
              {academyStory.story.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-5">
            <Media
              media={media.aboutMentors}
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 38vw, 92vw"
              className="rounded-panel border border-ink-700 shadow-lift"
            />
          </Reveal>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="section border-y border-ink-800/80 bg-ink-900/40" aria-labelledby="vision-heading">
        <div className="container-page">
          <h2 id="vision-heading" className="sr-only">
            Our vision and mission
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal className="rounded-panel border border-ink-700 bg-ink-950/60 p-8 sm:p-10">
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-ember-500/30 bg-ember-500/10 text-ember-400">
                <Eye aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-chalk">Our vision</h3>
              <p className="mt-3 text-base/relaxed text-mist">{academyStory.vision}</p>
            </Reveal>

            <Reveal index={1} className="rounded-panel border border-ink-700 bg-ink-950/60 p-8 sm:p-10">
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-signal-500/30 bg-signal-500/10 text-signal-400">
                <Target aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-chalk">Our mission</h3>
              <p className="mt-3 text-base/relaxed text-mist">{academyStory.mission}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Industry experience */}
      <section className="section" aria-labelledby="experience-heading">
        <div className="container-page">
          <SectionTitle
            id="experience-heading"
            eyebrow="Industry experience"
            title={
              <>
                Classroom hours that behave like <span className="text-grade">studio hours</span>
              </>
            }
            description="Three things separate a training exercise from a production shot. We build all three into the timetable."
          />

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {experience.map((item, index) => (
              <Reveal as="li" key={item.title} index={index}>
                <div className="h-full rounded-card border border-ink-700 bg-ink-900/60 p-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg border border-ink-600 bg-ink-850 text-ember-400">
                    <Film aria-hidden="true" className="size-4" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-chalk">{item.title}</h3>
                  <p className="mt-2.5 text-sm/relaxed text-mist">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Training philosophy */}
      <section className="section border-t border-ink-800/80" aria-labelledby="philosophy-heading">
        <div className="container-page">
          <SectionTitle
            id="philosophy-heading"
            eyebrow="Training philosophy"
            title="Four rules we do not bend"
          />

          <ol className="mt-12 grid gap-px overflow-hidden rounded-panel border border-ink-700 bg-ink-700 sm:grid-cols-2">
            {academyStory.philosophy.map((rule, index) => (
              <Reveal as="li" key={rule.title} index={index} className="bg-ink-900 p-7 sm:p-9">
                <span className="font-display text-sm font-bold text-ember-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-chalk">{rule.title}</h3>
                <p className="mt-2.5 text-sm/relaxed text-mist">{rule.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Why students choose us */}
      <section className="section border-t border-ink-800/80 bg-ink-900/40" aria-labelledby="choose-heading">
        <div className="container-page">
          <SectionTitle
            id="choose-heading"
            eyebrow="Why students choose us"
            title={
              <>
                Eight reasons, and none of them are a <span className="text-grade">placement promise</span>
              </>
            }
            description="We commit to the things that are genuinely within our control — and we are specific about them."
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((feature, index) => (
              <Reveal as="li" key={feature.title} index={index % 4}>
                <div className="h-full rounded-card border border-ink-700 bg-ink-950/60 p-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg border border-ink-600 bg-ink-850 text-signal-400">
                    <FeatureIcon name={feature.icon} className="size-4" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold text-chalk">{feature.title}</h3>
                  <p className="mt-2 text-sm/relaxed text-mist">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1} className="mt-10">
            <Button to="/courses" variant="outline">
              Browse the programmes
            </Button>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Admissions"
        title="Come and see how we teach"
        description="Talk to a counsellor about your background, look at what current students are producing, and decide from there."
      />
    </>
  );
}
