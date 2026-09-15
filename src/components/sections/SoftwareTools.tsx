import { tools, toolStatusLabels } from '@/data/tools';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

import type { Tool } from '@/types/content';

const statusStyles: Record<Tool['status'], string> = {
  core: 'border-ember-600/30 bg-ember-50 text-ember-700',
  supporting: 'border-signal-500/30 bg-signal-50 text-signal-600',
  onHold: 'border-line-strong bg-raised text-subtle',
};

export function SoftwareTools() {
  return (
    <section className="section" aria-labelledby="tools-heading">
      <div className="container-page">
        <SectionTitle
          id="tools-heading"
          eyebrow="Software & tools"
          title={
            <>
              The toolset, taught as <span className="text-grade">principles first</span>
            </>
          }
          description="Software changes; premultiplication, parallax and weight do not. Coverage differs by programme and batch, so we label it honestly."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <Reveal as="li" key={tool.name} index={index % 3}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface shadow-soft p-5 transition-colors duration-300 hover:border-line-strong hover:shadow-lift">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink">{tool.name}</h3>
                    <p className="mt-0.5 text-xs tracking-wide text-subtle uppercase">{tool.discipline}</p>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 rounded-full border px-2.5 py-1 text-[0.68rem] font-medium whitespace-nowrap',
                      statusStyles[tool.status],
                    )}
                  >
                    {toolStatusLabels[tool.status]}
                  </span>
                </div>
                <p className="mt-3 text-sm/relaxed text-body">{tool.note}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-xs/relaxed text-subtle">
            Tool availability is confirmed for your batch at admission. We list software as taught hands-on only where
            the programme genuinely provides teaching time for it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
