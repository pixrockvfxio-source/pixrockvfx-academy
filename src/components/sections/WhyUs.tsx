import { differentiators } from '@/data/academy';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { FeatureIcon } from '@/components/ui/FeatureIcon';

export function WhyUs() {
  return (
    <section className="section" aria-labelledby="why-heading">
      <div className="container-page">
        <SectionTitle
          id="why-heading"
          eyebrow="Why PixRock"
          title={
            <>
Four reasons this is <span className="text-grade">not a franchise</span>
            </>
          }
          description="What a studio can offer that a training centre cannot."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((feature, index) => (
            <Reveal as="li" key={feature.title} index={index % 4}>
              <div className="group relative h-full overflow-hidden rounded-card border border-line bg-surface shadow-soft p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift">
                <span
                  aria-hidden="true"
                  className="absolute -top-16 -right-10 size-32 rounded-full bg-ember-500/0 blur-2xl transition-colors duration-500 group-hover:bg-ember-500/15"
                />
                <span className="relative inline-flex size-11 items-center justify-center rounded-xl border border-line-strong bg-raised text-ember-600 transition-colors duration-300 group-hover:border-ember-500/40 group-hover:text-ember-700">
                  <FeatureIcon name={feature.icon} className="size-5" />
                </span>
                <h3 className="relative mt-5 font-display text-base font-semibold text-ink">{feature.title}</h3>
                <p className="relative mt-2.5 text-sm/relaxed text-body">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
