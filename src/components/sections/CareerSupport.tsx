import { ArrowRight, Check } from 'lucide-react';
import { placementAssistance } from '@/data/academy';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

/**
 * Placement assistance.
 *
 * The brochure requires this section to be stated exactly: assistance, never a
 * guarantee, with the eligibility conditions shown alongside so the offer is
 * not read as unconditional. The founding-batch paragraph stays with it —
 * separating the two would leave an implied track record the academy does not
 * have.
 */
export function CareerSupport() {
  return (
    <section className="section border-t border-ink-800/80" aria-labelledby="career-heading">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionTitle
            id="career-heading"
            eyebrow="Placement assistance"
            title={
              <>
                What we do — and what we <span className="text-grade">do not promise</span>
              </>
            }
            description={placementAssistance.statement}
          />

          <Reveal delay={0.1}>
            <div className="mt-8 rounded-panel border border-ink-700 bg-ink-900/60 p-6">
              <h3 className="font-display text-sm font-semibold tracking-wide text-chalk uppercase">
                Our first batch
              </h3>
              <p className="mt-3 text-sm/relaxed text-mist">{placementAssistance.foundingBatch}</p>
            </div>

            <div className="mt-7">
              <Button to="/careers" variant="outline">
                Placement assistance in full
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-4">
          <Reveal>
            <h3 className="font-display text-lg font-semibold text-chalk">What placement assistance means here</h3>
            <ul className="mt-5 space-y-3.5">
              {placementAssistance.includes.map((item) => (
                <li key={item} className="flex gap-3.5 text-sm/relaxed text-mist">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 rounded-card border border-ink-700 bg-ink-950/60 p-6">
            <h3 className="font-display text-lg font-semibold text-chalk">To be eligible, a student must</h3>
            <ul className="mt-5 space-y-3">
              {placementAssistance.eligibility.map((item) => (
                <li key={item} className="flex gap-3 text-sm/relaxed text-mist">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-ember-500 ring-4 ring-ember-500/15"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-ink-800 pt-4 text-xs/relaxed text-slate-muted">
              {placementAssistance.eligibilityNote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
