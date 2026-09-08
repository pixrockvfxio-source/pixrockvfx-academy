import { tools, toolStatusLabels } from '@/data/tools';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

const statusStyles: Record<string, string> = {
  core: 'border-ember-500/35 text-ember-300',
  elective: 'border-signal-500/35 text-signal-300',
  exposure: 'border-ink-600 text-slate-muted',
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
              <div className="flex h-full flex-col rounded-card border border-ink-700 bg-ink-900/60 p-5 transition-colors duration-300 hover:border-ink-600 hover:bg-ink-850">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base font-semibold text-chalk">{tool.name}</h3>
                    <p className="mt-0.5 text-xs tracking-wide text-slate-muted uppercase">{tool.discipline}</p>
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
                <p className="mt-3 text-sm/relaxed text-mist">{tool.note}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-xs/relaxed text-slate-muted">
            Tool availability is confirmed for your batch at admission. We list software as taught hands-on only where
            the programme genuinely provides teaching time for it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
