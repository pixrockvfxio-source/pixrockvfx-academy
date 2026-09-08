import { Seo } from '@/components/Seo/Seo';
import { PageHero } from '@/components/ui/PageHero';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { FeatureIcon } from '@/components/ui/FeatureIcon';
import { careerSupport, learningJourney } from '@/data/academy';
import { courses } from '@/data/courses';
import { CTASection } from '@/components/CTASection/CTASection';
import { Button } from '@/components/ui/Button';
import { Media } from '@/components/ui/Media';
import { media } from '@/config/media';
import { Accordion } from '@/components/ui/Accordion';

const roleMap = courses.map((course) => ({
  slug: course.slug,
  title: course.title,
  roles: course.careers.slice(0, 3),
}));

const hiringFaqs = [
  {
    question: 'Do you guarantee placement?',
    answer:
      'No. Any academy that guarantees a studio job is selling something it does not control. What we control is the quality of your portfolio, your working habits and your readiness for an interview — and we push hard on all three.',
  },
  {
    question: 'What does a studio actually assess?',
    answer:
      'For junior roles: the weakest shot on your reel, how cleanly you work, how you take a note, and whether you can explain a decision. Speed matters, but only once accuracy is already there.',
  },
  {
    question: 'How long does the first role usually take?',
    answer:
      'It varies with your discipline, your reel and the hiring cycle. Foundation roles such as roto and prep tend to open more frequently than specialist ones, which is one reason we recommend starting there.',
  },
  {
    question: 'Do you help after the programme ends?',
    answer:
      'Reel reviews and guidance continue after graduation. We would rather you came back for a second look at your reel than applied with something that was not ready.',
  },
];

export default function Careers() {
  return (
    <>
      <Seo
        title="Careers & Outcomes"
        description="How PixRock VFX Academy prepares artists for the visual effects industry — skill development, portfolio building, interview preparation, production workflow and honest career guidance."
        path="/careers"
      />

      <PageHero
        eyebrow="Careers"
        title={
          <>
            From training to <span className="text-grade">industry</span>
          </>
        }
        description="What we do to get you ready, what a studio actually looks at, and what we will not promise you."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Careers' }]}
        actions={
          <>
            <Button to="/enquiry">Talk about your goals</Button>
            <Button to="/student-work" variant="secondary">
              See student work
            </Button>
          </>
        }
      />

      {/* Support pillars */}
      <section className="section" aria-labelledby="support-heading">
        <div className="container-page">
          <SectionTitle
            id="support-heading"
            eyebrow="Career support"
            title="Five things we work on with every student"
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {careerSupport.map((item, index) => (
              <Reveal as="li" key={item.title} index={index}>
                <div className="h-full rounded-card border border-ink-700 bg-ink-900/60 p-6">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-ink-600 bg-ink-850 text-ember-400">
                    <FeatureIcon name={item.icon} className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold text-chalk">{item.title}</h3>
                  <p className="mt-2 text-sm/relaxed text-mist">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey recap */}
      <section className="section border-y border-ink-800/80 bg-ink-900/40" aria-labelledby="path-heading">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionTitle
              id="path-heading"
              eyebrow="The path"
              title={
                <>
                  Six stages, run in <span className="text-grade">order</span>
                </>
              }
              description="Craft, then speed, then judgement. Skipping a stage is the most common reason a promising reel stalls."
            />
            <Reveal delay={0.1}>
              <Media
                media={media.aboutMentors}
                aspect="aspect-[4/3]"
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="mt-9 rounded-panel border border-ink-700"
              />
            </Reveal>
          </div>

          <ol className="lg:col-span-7">
            {learningJourney.map((stage, index) => (
              <Reveal
                as="li"
                key={stage.step}
                index={index}
                className="flex gap-5 border-b border-ink-800 py-5 first:pt-0 last:border-b-0 last:pb-0"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-ink-600 bg-ink-950 font-display text-sm font-bold text-ember-400">
                  {stage.step}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-chalk">{stage.title}</h3>
                  <p className="mt-1.5 text-sm/relaxed text-mist">{stage.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Roles by programme */}
      <section className="section" aria-labelledby="roles-heading">
        <div className="container-page">
          <SectionTitle
            id="roles-heading"
            eyebrow="Roles"
            title="Which programme targets which job"
            description="Each course is built around a role a facility staffs. These are the positions the training prepares you to apply for."
          />

          <div className="mt-12 overflow-x-auto rounded-panel border border-ink-700">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <caption className="sr-only">Programmes and the roles they prepare you for</caption>
              <thead>
                <tr className="bg-ink-850">
                  <th scope="col" className="px-5 py-4 font-display text-sm font-semibold text-chalk">
                    Programme
                  </th>
                  <th scope="col" className="px-5 py-4 font-display text-sm font-semibold text-chalk">
                    Roles it targets
                  </th>
                </tr>
              </thead>
              <tbody>
                {roleMap.map((row) => (
                  <tr key={row.slug} className="border-t border-ink-800 transition-colors hover:bg-ink-900/70">
                    <th scope="row" className="px-5 py-4 align-top font-medium text-chalk">
                      <Button to={`/courses/${row.slug}`} variant="ghost" size="sm" className="-ml-3">
                        {row.title}
                      </Button>
                    </th>
                    <td className="px-5 py-4 align-top text-mist">{row.roles.join(' · ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-2xl text-xs/relaxed text-slate-muted">
            These are target roles, not offers. Hiring depends on your portfolio, the studio and the market at the time
            you apply.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-ink-800/80" aria-labelledby="career-faq-heading">
        <div className="container-page max-w-3xl">
          <SectionTitle id="career-faq-heading" eyebrow="Honest answers" title="What students ask us about jobs" />
          <Reveal delay={0.08} className="mt-9">
            <Accordion items={hiringFaqs} />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Let's talk about where you want to end up"
        description="Bring your goals and, if you have one, your current work. We will tell you what it needs and how long that realistically takes."
      />
    </>
  );
}
