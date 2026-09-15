import { trainingApproach } from '@/data/academy';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { FeatureIcon } from '@/components/ui/FeatureIcon';

/** How the teaching actually runs — the design principles from the curriculum. */
export function TrainingApproach() {
  return (
    <section className="section border-t border-line/80" aria-labelledby="approach-heading">
      <div className="container-page">
        <SectionTitle
          id="approach-heading"
          eyebrow="How we teach"
          title={
            <>
              Built backwards from what the studio <span className="text-grade">actually ships</span>
            </>
          }
          description="Six principles that shape every batch, every review and every shot you hand in."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trainingApproach.map((item, index) => (
            <Reveal as="li" key={item.title} index={index % 3}>
              <div className="group h-full rounded-card border border-line bg-surface shadow-soft p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-line-strong bg-raised text-signal-500 transition-colors duration-300 group-hover:border-signal-500/40">
                  <FeatureIcon name={item.icon} className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2.5 text-sm/relaxed text-body">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
