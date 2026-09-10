import { Check, Info } from 'lucide-react';
import { Seo } from '@/components/Seo/Seo';
import { PageHero } from '@/components/ui/PageHero';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { placementAssistance, learningJourney } from '@/data/academy';
import { publishedCourses } from '@/data/courses';
import { CTASection } from '@/components/CTASection/CTASection';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';

const roleMap = publishedCourses.map((course) => ({
  slug: course.slug,
  title: course.shortTitle,
  roles: course.careers.slice(0, 3),
}));

const careerFaqs = [
  {
    question: 'Is there really employment in this field, or is it just a hobby?',
    answer:
      'There is real employment. Indian studios handle post-production for international films, streaming series and advertising, and they hire continuously — particularly at junior level, where trained artists are consistently in short supply. It is not a large industry compared to IT, but the demand is steady and the skills are portable across studios and cities.',
  },
  {
    question: 'Do I still need a degree?',
    answer:
      'For a VFX job, no — studios hire on portfolio and practical test. But many of our students are studying for a degree alongside, using the evening batch, and we think that is a sensible choice. A degree keeps options open, which is why we run sessions from 6 to 9 pm: so nobody has to choose.',
  },
  {
    question: 'What does a studio actually assess?',
    answer:
      'Your portfolio, a practical test, and whether you can work to a deadline and take a note. Most Indian studios hire on a test shot, which is why test-shot preparation under time pressure is built into our career readiness sessions.',
  },
  {
    question: 'Is this the same as animation?',
    answer:
      'No, though they are related. Animation creates characters and movement from scratch. VFX works with real filmed footage — enhancing it, cleaning it, and combining it with digital elements. Most of the employment in India is in VFX rather than animation, which is one reason we teach it.',
  },
  {
    question: 'What if I fall behind?',
    answer:
      'Every student is reviewed monthly by a working PixRock supervisor. If you are falling behind we assign additional lab hours and tell you — and your family — at that review. We would rather have a difficult conversation in month two than an unhappy family at the end.',
  },
];

export default function Careers() {
  return (
    <>
      <Seo
        title="Careers & Placement Assistance"
        description="What placement assistance means at PixRock Academy, what it includes, the eligibility conditions, and an honest statement of where the academy stands before its first intake in April 2027."
        path="/careers"
      />

      <PageHero
        eyebrow="Careers"
        title={
          <>
            Placement assistance, <span className="text-grade">not a promise</span>
          </>
        }
        description="What we do to prepare you, what a studio actually assesses, and what we will not claim. Anyone who guarantees a job is not being straight with you."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Careers' }]}
        actions={
          <>
            <Button to="/enquiry">Talk to a counsellor</Button>
            <Button to="/courses" variant="secondary">
              See the courses
            </Button>
          </>
        }
      />

      {/* Honest position — deliberately first on the page. */}
      <section className="section pt-12 lg:pt-16" aria-labelledby="founding-heading">
        <div className="container-page">
          <Reveal className="rounded-panel border border-ember-500/30 bg-ember-500/5 p-6 sm:p-9">
            <div className="flex gap-4">
              <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-ember-400" />
              <div>
                <h2 id="founding-heading" className="font-display text-lg font-semibold text-chalk">
                  On our first batch
                </h2>
                <p className="mt-3 max-w-3xl text-base/relaxed text-mist">{placementAssistance.foundingBatch}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What assistance includes + eligibility */}
      <section className="section pt-0" aria-labelledby="assistance-heading">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h2 id="assistance-heading" className="text-title text-chalk">
              What placement assistance includes
            </h2>
            <p className="mt-4 text-base/relaxed text-mist">{placementAssistance.statement}</p>
            <ul className="mt-7 space-y-3.5">
              {placementAssistance.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3.5 rounded-card border border-ink-700 bg-ink-900/60 px-5 py-4 text-sm/relaxed text-mist"
                >
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="text-title text-chalk">Eligibility</h2>
            <p className="mt-4 text-base/relaxed text-mist">
              Assistance is earned, not automatic. These conditions appear in the enrollment agreement you sign, and
              we apply them consistently.
            </p>
            <ul className="mt-7 space-y-3.5">
              {placementAssistance.eligibility.map((item) => (
                <li
                  key={item}
                  className="flex gap-3.5 rounded-card border border-ink-700 bg-ink-900/60 px-5 py-4 text-sm/relaxed text-chalk"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-ember-500 ring-4 ring-ember-500/15"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs/relaxed text-slate-muted">{placementAssistance.eligibilityNote}</p>
          </Reveal>
        </div>
      </section>

      {/* Journey */}
      <section className="section border-y border-ink-800/80 bg-ink-900/40" aria-labelledby="path-heading">
        <div className="container-page">
          <SectionTitle
            id="path-heading"
            eyebrow="How you get there"
            title={
              <>
                Six stages, run in <span className="text-grade">order</span>
              </>
            }
            description="Craft, then speed, then judgement. The reel is the deliverable, and everything before it is preparation for the review that approves it."
          />

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {learningJourney.map((stage, index) => (
              <Reveal as="li" key={stage.step} index={index % 3}>
                <div className="h-full rounded-card border border-ink-700 bg-ink-950/60 p-6">
                  <span className="inline-flex size-11 items-center justify-center rounded-full border border-ink-600 bg-ink-950 font-display text-sm font-bold text-ember-400">
                    {stage.step}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-chalk">{stage.title}</h3>
                  <p className="mt-2 text-sm/relaxed text-mist">{stage.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Roles by course */}
      <section className="section" aria-labelledby="roles-heading">
        <div className="container-page">
          <SectionTitle
            id="roles-heading"
            eyebrow="Roles"
            title="Which course targets which job"
            description="Each course is built around a role studios actually staff. These are the positions the training prepares you to apply for."
          />

          <div className="mt-12 overflow-x-auto rounded-panel border border-ink-700">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <caption className="sr-only">Courses and the roles they prepare you for</caption>
              <thead>
                <tr className="bg-ink-850">
                  <th scope="col" className="px-5 py-4 font-display text-sm font-semibold text-chalk">
                    Course
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
            These are target roles, not offers. Hiring depends on your portfolio, the studio and the market at the
            time you apply.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-ink-800/80" aria-labelledby="career-faq-heading">
        <div className="container-page max-w-3xl">
          <SectionTitle id="career-faq-heading" eyebrow="Honest answers" title="Questions families actually ask" />
          <Reveal delay={0.08} className="mt-9">
            <Accordion items={careerFaqs} />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Come and see the facility"
        description="Bring your family, meet the faculty and ask the awkward questions. There is no obligation, and we would rather you saw the place before deciding."
        primaryLabel="Book a visit"
      />
    </>
  );
}
