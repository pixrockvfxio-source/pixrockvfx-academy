import { ArrowRight } from 'lucide-react';
import { careerSupport } from '@/data/academy';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { FeatureIcon } from '@/components/ui/FeatureIcon';
import { Button } from '@/components/ui/Button';
import { Media } from '@/components/ui/Media';
import { media } from '@/config/media';

export function CareerSupport() {
  return (
    <section className="section border-t border-ink-800/80" aria-labelledby="career-heading">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionTitle
            id="career-heading"
            eyebrow="Careers"
            title={
              <>
                From training to <span className="text-grade">industry</span>
              </>
            }
            description="We do not promise placements. We prepare you so thoroughly that the interview is the easy part — and we tell you honestly when your work is not there yet."
          />

          <Reveal delay={0.1}>
            <Media
              media={media.careersFloor}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="mt-9 rounded-panel border border-ink-700"
            />
            <div className="mt-7">
              <Button to="/careers" variant="outline">
                Careers &amp; outcomes
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </Reveal>
        </div>

        <ul className="lg:col-span-7 lg:pt-4">
          {careerSupport.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              index={index}
              className="flex gap-5 border-b border-ink-800 py-6 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-ink-600 bg-ink-850 text-signal-400">
                <FeatureIcon name={item.icon} className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-chalk">{item.title}</h3>
                <p className="mt-1.5 text-sm/relaxed text-mist">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
