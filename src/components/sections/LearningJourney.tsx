import { learningJourney } from '@/data/academy';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';

/**
 * The six-stage learning path, drawn as a connected timeline: horizontal on
 * large screens, vertical on small ones, with the connector rendered as a
 * decorative element so screen readers only hear the list.
 */
export function LearningJourney() {
  return (
    <section className="section relative overflow-hidden border-y border-ink-800/80 bg-ink-900/40" aria-labelledby="journey-heading">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-20" />

      <div className="container-page relative">
        <SectionTitle
          id="journey-heading"
          align="center"
          eyebrow="The learning journey"
          title={
            <>
              From first frame to <span className="text-grade">first role</span>
            </>
          }
          description="Six stages, run in order, with no step skipped — because craft, speed and judgement are built in that sequence."
        />

        <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          {/* Connector line — decorative only. */}
          <span
            aria-hidden="true"
            className="absolute top-6 right-0 left-0 hidden h-px bg-linear-to-r from-ember-500/50 via-ink-600 to-signal-500/50 lg:block"
          />

          {learningJourney.map((stage, index) => (
            <Reveal as="li" key={stage.step} index={index} className="relative lg:pt-0">
              <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-full border border-ink-600 bg-ink-950 font-display text-sm font-bold text-ember-400">
                {stage.step}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-chalk">{stage.title}</h3>
              <p className="mt-2 text-sm/relaxed text-mist lg:text-[0.8125rem]/relaxed">{stage.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
